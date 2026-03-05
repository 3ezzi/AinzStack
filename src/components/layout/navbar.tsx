'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MenuIcon, XIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { signOut } from '@/lib/auth/actions';

const navLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth
      .getUser()
      .then(({ data }: { data: { user: { email?: string } | null } }) => {
        setUser(data.user);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: { email?: string } | null } | null) => {
        setUser(session?.user ?? null);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="AinzStack Logo"
            width={24}
            height={24}
            className="rounded-md"
            priority
          />
          <span className="font-heading text-[14px] font-semibold tracking-tight">
            AinzStack
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-150',
                pathname === link.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth CTA */}
        <div className="hidden items-center gap-1.5 md:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="text-[12px]" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <form action={signOut}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="text-[12px]"
                >
                  <LogOutIcon className="size-3" />
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-[12px]" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" className="text-[12px]" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="min-h-[44px] min-w-[44px] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <XIcon className="size-4" aria-hidden="true" />
          ) : (
            <MenuIcon className="size-4" aria-hidden="true" />
          )}
        </Button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}

            <Separator className="my-2 opacity-60" />

            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[12px]"
                    asChild
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Button>
                  <form action={signOut}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="w-full text-[12px]"
                    >
                      <LogOutIcon className="size-3" />
                      Sign out
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[12px]"
                    asChild
                  >
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button size="sm" className="text-[12px]" asChild>
                    <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
