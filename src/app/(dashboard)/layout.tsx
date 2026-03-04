import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardTopNav } from '@/components/layout/dashboard-top-nav';
import { PageTransition } from '@/components/providers/page-transition';

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
    <div className="flex min-h-dvh">
      <DashboardSidebar userName={userName} userEmail={userEmail} />
      <div className="flex flex-1 flex-col">
        <DashboardTopNav />
        <main id="main-content" className="flex-1 bg-muted/30 p-4 lg:p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
