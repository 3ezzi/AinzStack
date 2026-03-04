'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardTopNav } from '@/components/layout/dashboard-top-nav';
import { PageTransition } from '@/components/providers/page-transition';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';

interface DashboardShellProps {
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}

export function DashboardShell({
  userName,
  userEmail,
  children,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <DashboardSidebar userName={userName} userEmail={userEmail} />

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-56 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <DashboardSidebar
            userName={userName}
            userEmail={userEmail}
            mobile
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col">
        <DashboardTopNav onMobileMenuToggle={() => setMobileOpen(true)} />
        <main id="main-content" className="flex-1 bg-muted/30 p-4 lg:p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
