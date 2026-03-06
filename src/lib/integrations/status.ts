import { getServerEnv } from "@/lib/env/server";

export type IntegrationStatus = "configured" | "missing";
export type AppHealthStatus = "ok" | "degraded";

export interface IntegrationState {
  name: string;
  status: IntegrationStatus;
  summary: string;
  requiredEnv: string[];
}

export interface IntegrationSummary {
  status: AppHealthStatus;
  checkedAt: string;
  configuredCount: number;
  totalCount: number;
  services: {
    supabase: IntegrationState;
    stripe: IntegrationState;
    sanity: IntegrationState;
    resend: IntegrationState;
  };
}

export function getIntegrationSummary(): IntegrationSummary {
  const env = getServerEnv();

  const services = {
    supabase:
      env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? {
            name: "Supabase",
            status: "configured" as const,
            summary: "Auth and database are configured.",
            requiredEnv: [
              "NEXT_PUBLIC_SUPABASE_URL",
              "NEXT_PUBLIC_SUPABASE_ANON_KEY",
            ],
          }
        : {
            name: "Supabase",
            status: "missing" as const,
            summary: "Configure Supabase URL and anon key to enable auth and database access.",
            requiredEnv: [
              "NEXT_PUBLIC_SUPABASE_URL",
              "NEXT_PUBLIC_SUPABASE_ANON_KEY",
            ],
          },
    stripe:
      env.STRIPE_SECRET_KEY &&
      env.STRIPE_WEBHOOK_SECRET &&
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        ? {
            name: "Stripe",
            status: "configured" as const,
            summary: "Checkout, billing, and webhook secrets are configured.",
            requiredEnv: [
              "STRIPE_SECRET_KEY",
              "STRIPE_WEBHOOK_SECRET",
              "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
            ],
          }
        : {
            name: "Stripe",
            status: "missing" as const,
            summary: "Configure Stripe keys to enable checkout and billing workflows.",
            requiredEnv: [
              "STRIPE_SECRET_KEY",
              "STRIPE_WEBHOOK_SECRET",
              "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
            ],
          },
    sanity: env.SANITY_PROJECT_ID
      ? {
          name: "Sanity",
          status: "configured" as const,
          summary: "Sanity content fetching is configured.",
          requiredEnv: ["SANITY_PROJECT_ID", "SANITY_DATASET"],
        }
      : {
          name: "Sanity",
          status: "missing" as const,
          summary: "Configure Sanity project settings to enable CMS-backed content.",
          requiredEnv: ["SANITY_PROJECT_ID", "SANITY_DATASET"],
        },
    resend: env.RESEND_API_KEY && env.SUPPORT_EMAIL
      ? {
          name: "Resend",
          status: "configured" as const,
          summary: "Transactional email delivery and support inbox are configured.",
          requiredEnv: ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "SUPPORT_EMAIL"],
        }
      : {
          name: "Resend",
          status: "missing" as const,
          summary: "Configure Resend and a support inbox to send transactional and contact emails.",
          requiredEnv: ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "SUPPORT_EMAIL"],
        },
  };

  const totalCount = Object.values(services).length;
  const configuredCount = Object.values(services).filter(
    (service) => service.status === "configured",
  ).length;

  return {
    status: configuredCount === totalCount ? "ok" : "degraded",
    checkedAt: new Date().toISOString(),
    configuredCount,
    totalCount,
    services,
  };
}
