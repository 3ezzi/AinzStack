import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getServerEnv } from '@/lib/env/server';
import { cookies } from 'next/headers';

/**
 * Auth callback handler for Supabase OAuth and magic links.
 * Exchanges the auth code for a session and redirects.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/dashboard';

  if (!code) {
    return NextResponse.redirect(
      new URL('/sign-in?error=missing_code', url.origin),
    );
  }

  const env = getServerEnv();
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(new URL('/sign-in?error=config', url.origin));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
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
          // Cookie mutation may not be available in all contexts
        }
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL('/sign-in?error=auth_failed', url.origin),
    );
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
