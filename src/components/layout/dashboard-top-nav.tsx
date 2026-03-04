'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { BellIcon, PanelLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function generateBreadcrumbs(pathname: string) {
  const segments = pathname
    .replace('/dashboard', '')
    .split('/')
    .filter(Boolean);

  const crumbs: { label: string; href?: string }[] = [
    { label: 'Overview', href: '/dashboard' },
  ];

  if (segments.length === 0) {
    crumbs.push({ label: 'Dashboard' });
  } else {
    segments.forEach((seg, i) => {
      const label = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const isLast = i === segments.length - 1;
      crumbs.push({
        label,
        href: isLast
          ? undefined
          : `/dashboard/${segments.slice(0, i + 1).join('/')}`,
      });
    });
  }

  return crumbs;
}

interface DashboardTopNavProps {
  onMobileMenuToggle?: () => void;
}

export function DashboardTopNav({ onMobileMenuToggle }: DashboardTopNavProps) {
  const pathname = usePathname();
  const crumbs = generateBreadcrumbs(pathname);

  return (
    <header className="flex h-12 items-center justify-between border-b border-border/60 px-4">
      <div className="flex items-center gap-2">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          aria-label="Toggle sidebar"
          onClick={onMobileMenuToggle}
        >
          <PanelLeftIcon className="size-4" />
        </Button>

        <Separator orientation="vertical" className="mr-1 h-4 lg:hidden" />

        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, i) => (
              <Fragment key={`${crumb.href ?? 'current'}-${crumb.label}`}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href} className="text-[12px]">
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-[12px] font-medium">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
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
