import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { getClientEnv, requireClientEnvValue } from "@/lib/env/client";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripeClient() {
  if (stripePromise) {
    return stripePromise;
  }

  const env = getClientEnv();
  const publishableKey = requireClientEnvValue(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );

  stripePromise = loadStripe(publishableKey);
  return stripePromise;
}
