import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getServerEnv, requireServerEnvValue } from "@/lib/env/server";

export async function createSupabaseServerClient() {
  const env = getServerEnv();
  const url = requireServerEnvValue(
    "NEXT_PUBLIC_SUPABASE_URL",
    env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const anonKey = requireServerEnvValue(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Cookie mutation is not available in some Server Component contexts.
        }
      },
    },
  });
}
