import { Resend } from "resend";
import { getServerEnv, requireServerEnvValue } from "@/lib/env/server";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (resendClient) {
    return resendClient;
  }

  const env = getServerEnv();
  const apiKey = requireServerEnvValue("RESEND_API_KEY", env.RESEND_API_KEY);

  resendClient = new Resend(apiKey);
  return resendClient;
}
