'use client';

import { BellIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export function DashboardTopNav() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border/60 px-4">
      <div className="flex items-center gap-2">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <BellIcon className="size-3.5" />
        </Button>
      </div>
    </header>
  );
}
