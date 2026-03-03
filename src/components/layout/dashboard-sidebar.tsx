'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  SettingsIcon,
  CreditCardIcon,
  FileTextIcon,
  UsersIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboardIcon },
  { href: '/dashboard/users', label: 'Users', icon: UsersIcon },
  { href: '/dashboard/content', label: 'Content', icon: FileTextIcon },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCardIcon },
  { href: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-52 shrink-0 border-r border-border/60 bg-sidebar lg:block">
      <div className="flex h-12 items-center border-b border-border/60 px-4">
        <Link
          href="/"
          className="font-heading text-[13px] font-semibold tracking-tight"
        >
          AinzStack
        </Link>
      </div>

      <nav className="space-y-0.5 p-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              )}
            >
              <link.icon className="size-3.5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
