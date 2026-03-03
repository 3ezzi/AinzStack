import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env/server";
import { getStripeServerClient } from "@/lib/stripe/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface StripeWebhookSuccess {
  received: true;
}

interface StripeWebhookError {
  received: false;
  error: string;
}

type StripeWebhookResponse = StripeWebhookSuccess | StripeWebhookError;

export async function POST(
  request: Request,
): Promise<NextResponse<StripeWebhookResponse>> {
  const env = getServerEnv();
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { received: false, error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { received: false, error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 503 },
    );
  }

  const payload = await request.text();
  const stripe = getStripeServerClient();

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    switch (event.type) {
      default:
        break;
    }
  } catch {
    return NextResponse.json(
      { received: false, error: "Invalid Stripe webhook signature." },
      { status: 400 },
    );
  }

  return NextResponse.json({ received: true });
}
