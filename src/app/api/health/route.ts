import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env/server";
import type { IntegrationStatus } from "@/types/domain";

interface HealthResponse {
  status: "ok";
  timestamp: string;
  services: {
    supabase: IntegrationStatus;
    stripe: IntegrationStatus;
    sanity: IntegrationStatus;
    resend: IntegrationStatus;
  };
}

function statusFromConfig(configured: boolean): IntegrationStatus {
  return configured ? "unknown" : "error";
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const env = getServerEnv();

  const response: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      supabase: statusFromConfig(
        Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      ),
      stripe: statusFromConfig(
        Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
      ),
      sanity: statusFromConfig(Boolean(env.SANITY_PROJECT_ID)),
      resend: statusFromConfig(Boolean(env.RESEND_API_KEY)),
    },
  };

  return NextResponse.json(response);
}
