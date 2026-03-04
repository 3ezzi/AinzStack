import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  SANITY_PROJECT_ID: z.string().min(1).optional(),
  SANITY_DATASET: z.string().min(1).default('production'),
  SANITY_API_VERSION: z.string().default('2026-03-03'),
  SANITY_READ_TOKEN: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().default('no-reply@example.com'),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  cachedServerEnv = serverEnvSchema.parse(process.env);
  return cachedServerEnv;
}

export function requireServerEnvValue(
  name: keyof ServerEnv,
  value: string | undefined,
): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${String(name)}`);
  }

  return value;
}
