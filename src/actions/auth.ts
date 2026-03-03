"use server";

import { notImplementedAction, type ActionResult } from "@/types/actions";

export interface SignInInput {
  email: string;
  password: string;
}

export interface PasswordResetInput {
  email: string;
}

export async function signIn(_input: SignInInput): Promise<ActionResult<never>> {
  void _input;
  return notImplementedAction("signIn is scaffolded but not implemented.");
}

export async function signOut(): Promise<ActionResult<{ signedOut: true }>> {
  return notImplementedAction("signOut is scaffolded but not implemented.");
}

export async function requestPasswordReset(
  _input: PasswordResetInput,
): Promise<ActionResult<never>> {
  void _input;
  return notImplementedAction(
    "requestPasswordReset is scaffolded but not implemented.",
  );
}
