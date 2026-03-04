import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  product: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Documentation' },
    { href: '/blog', label: 'Blog' },
  ],
  resources: [
    { href: '/about', label: 'About' },
    { href: 'https://github.com/JCFcodex/AinzStack', label: 'GitHub' },
    { href: '/docs', label: 'Changelog' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-foreground">
                <span className="text-[10px] font-bold text-background">A</span>
              </div>
              <span className="font-heading text-[14px] font-semibold tracking-tight">
                AinzStack
              </span>
            </Link>
            <p className="mt-3 max-w-[200px] text-[11px] leading-relaxed text-muted-foreground">
              Production-ready Next.js 16 boilerplate. Ship your SaaS in days,
              not months.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Product
            </p>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Resources
            </p>
            <ul className="mt-3 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Legal
            </p>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <Separator className="my-6 opacity-60" />

        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} AinzStack. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/JCFcodex/AinzStack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
