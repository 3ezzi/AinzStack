import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardTopNav } from '@/components/layout/dashboard-top-nav';
import { PageTransition } from '@/components/providers/page-transition';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardTopNav />
        <main id="main-content" className="flex-1 p-4 lg:p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
