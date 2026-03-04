import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getStripeServerClient } from '@/lib/stripe/server';
import { STRIPE_PLANS, type PlanKey } from '@/lib/stripe/plans';
import { getServerEnv } from '@/lib/env/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CheckoutRequest {
  plan: PlanKey;
}

interface CheckoutSuccess {
  url: string;
}

interface CheckoutError {
  error: string;
}

type CheckoutResponse = CheckoutSuccess | CheckoutError;

export async function POST(
  request: Request,
): Promise<NextResponse<CheckoutResponse>> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required.' },
      { status: 401 },
    );
  }

  let body: CheckoutRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const { plan } = body;
  const planConfig = STRIPE_PLANS[plan];

  if (!planConfig || !planConfig.priceId) {
    return NextResponse.json(
      { error: 'Invalid plan selected.' },
      { status: 400 },
    );
  }

  const env = getServerEnv();
  const appUrl = env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const stripe = getStripeServerClient();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
        plan,
      },
      success_url: `${appUrl}/dashboard/billing?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Stripe checkout failed.';
    console.error({ error }, 'Checkout session creation failed');
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
