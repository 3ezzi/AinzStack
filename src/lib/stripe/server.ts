import Stripe from "stripe";
import { getServerEnv, requireServerEnvValue } from "@/lib/env/server";

let stripeClient: Stripe | null = null;

export function getStripeServerClient(): Stripe {
  if (stripeClient) {
    return stripeClient;
  }

  const env = getServerEnv();
  const secretKey = requireServerEnvValue("STRIPE_SECRET_KEY", env.STRIPE_SECRET_KEY);

  stripeClient = new Stripe(secretKey);
  return stripeClient;
}
