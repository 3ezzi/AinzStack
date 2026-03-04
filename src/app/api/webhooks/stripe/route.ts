import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerEnv } from '@/lib/env/server';
import { getStripeServerClient } from '@/lib/stripe/server';
import type Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface StripeWebhookSuccess {
  received: true;
}

interface StripeWebhookError {
  received: false;
  error: string;
}

type StripeWebhookResponse = StripeWebhookSuccess | StripeWebhookError;

/**
 * Create a Supabase admin client (service role) for webhook mutations.
 * This bypasses RLS so the webhook can insert/update purchases.
 */
function createSupabaseAdmin() {
  const env = getServerEnv();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase env vars for admin client');
  }

  return createClient(url, serviceKey);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createSupabaseAdmin();
  const userId = session.client_reference_id;
  const plan = session.metadata?.plan;

  if (!userId || !plan) {
    console.error(
      { session: session.id },
      'Missing user_id or plan in session metadata',
    );
    return;
  }

  const { error } = await supabase.from('purchases').upsert(
    {
      user_id: userId,
      stripe_customer_id:
        typeof session.customer === 'string'
          ? session.customer
          : (session.customer?.id ?? null),
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : (session.payment_intent?.id ?? null),
      plan,
      amount_cents: session.amount_total ?? 0,
      status: 'succeeded',
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_checkout_session_id' },
  );

  if (error) {
    console.error({ error, session: session.id }, 'Failed to upsert purchase');
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const supabase = createSupabaseAdmin();
  const paymentIntentId =
    typeof charge.payment_intent === 'string'
      ? charge.payment_intent
      : charge.payment_intent?.id;

  if (!paymentIntentId) return;

  const { error } = await supabase
    .from('purchases')
    .update({ status: 'refunded', updated_at: new Date().toISOString() })
    .eq('stripe_payment_intent_id', paymentIntentId);

  if (error) {
    console.error(
      { error, charge: charge.id },
      'Failed to update purchase to refunded',
    );
  }
}

export async function POST(
  request: Request,
): Promise<NextResponse<StripeWebhookResponse>> {
  const env = getServerEnv();
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { received: false, error: 'Missing stripe-signature header.' },
      { status: 400 },
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { received: false, error: 'STRIPE_WEBHOOK_SECRET is not configured.' },
      { status: 503 },
    );
  }

  const payload = await request.text();
  const stripe = getStripeServerClient();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      default:
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error({ error: err }, 'Webhook processing failed');
    return NextResponse.json(
      { received: false, error: message },
      { status: 400 },
    );
  }

  return NextResponse.json({ received: true });
}
