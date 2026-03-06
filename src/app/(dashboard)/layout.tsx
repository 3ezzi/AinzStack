import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardShell } from '@/components/layout/dashboard-shell';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const userName =
    user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User';
  const userEmail = user.email ?? 'user@example.com';

  return (
    <DashboardShell userName={userName} userEmail={userEmail}>
      {children}
    </DashboardShell>
  );
}
