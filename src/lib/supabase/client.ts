import { createBrowserClient } from "@supabase/ssr";
import { getClientEnv, requireClientEnvValue } from "@/lib/env/client";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const env = getClientEnv();
  const url = requireClientEnvValue(
    "NEXT_PUBLIC_SUPABASE_URL",
    env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const anonKey = requireClientEnvValue(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  browserClient = createBrowserClient(url, anonKey);
  return browserClient;
}
