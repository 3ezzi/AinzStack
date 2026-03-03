"use server";

import { notImplementedAction, type ActionResult } from "@/types/actions";

export interface CheckoutInput {
  plan: "free" | "pro" | "enterprise";
  userId: string;
}

export interface BillingPortalInput {
  userId: string;
}

export async function createCheckoutSession(
  _input: CheckoutInput,
): Promise<ActionResult<{ url: string }>> {
  void _input;
  return notImplementedAction(
    "createCheckoutSession is scaffolded but not implemented.",
  );
}

export async function createBillingPortalSession(
  _input: BillingPortalInput,
): Promise<ActionResult<{ url: string }>> {
  void _input;
  return notImplementedAction(
    "createBillingPortalSession is scaffolded but not implemented.",
  );
}
