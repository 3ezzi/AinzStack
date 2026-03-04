'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboardIcon,
  SettingsIcon,
  CreditCardIcon,
  BarChart3Icon,
  LinkIcon,
  KeyRoundIcon,
  SearchIcon,
  ChevronsUpDownIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3Icon },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/dashboard/billing', label: 'Billing', icon: CreditCardIcon },
      { href: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        href: '/dashboard/integrations',
        label: 'Integrations',
        icon: LinkIcon,
      },
      { href: '/dashboard/api-keys', label: 'API Keys', icon: KeyRoundIcon },
    ],
  },
];

interface DashboardSidebarProps {
  userName?: string;
  userEmail?: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function DashboardSidebar({
  userName = 'User',
  userEmail = 'user@example.com',
  mobile = false,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className={cn(
        'w-56 shrink-0 border-r border-border/60 bg-sidebar',
        mobile ? 'flex flex-col h-full' : 'hidden lg:flex lg:flex-col',
      )}
    >
      {/* Brand */}
      <div className="flex h-12 items-center border-b border-border/60 px-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-foreground">
            <span className="text-[10px] font-bold text-background">A</span>
          </div>
          <div className="leading-none">
            <span className="text-[13px] font-semibold tracking-tight">
              AinzStack
            </span>
            <span className="block text-[10px] text-muted-foreground">
              Enterprise
            </span>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-2.5 size-3 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="h-7 pl-7 text-[12px]" />
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {navGroups.map((group, gi) => (
          <div key={group.label} className={cn(gi > 0 && 'mt-4')}>
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                    )}
                  >
                    <item.icon className="size-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <Separator className="opacity-60" />
      <div className="p-3">
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent">
          <Avatar className="size-7">
            <AvatarFallback className="text-[10px] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium leading-tight">
              {userName}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {userEmail}
            </p>
          </div>
          <ChevronsUpDownIcon className="size-3 shrink-0 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}
