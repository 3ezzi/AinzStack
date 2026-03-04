/**
 * Stripe product/price configuration.
 * Maps plan names to Stripe price IDs for checkout.
 *
 * These IDs correspond to one-time prices created in our Stripe account.
 * Update these when switching from test to live mode.
 */
export const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    priceId: null, // Free tier — no checkout needed
    amount: 0,
  },
  pro: {
    name: 'Pro',
    priceId: 'price_1T762KL0iUZWk1fMiQC4k5dd',
    amount: 4900,
  },
  team: {
    name: 'Team',
    priceId: 'price_1T762dL0iUZWk1fM9r1cwn5A',
    amount: 14900,
  },
} as const;

export type PlanKey = keyof typeof STRIPE_PLANS;
