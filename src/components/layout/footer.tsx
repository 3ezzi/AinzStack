import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  product: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Documentation' },
    { href: '/about', label: 'About' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-heading text-[15px] font-semibold tracking-tight"
            >
              AinzStack
            </Link>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">
              Production-ready Next.js 16 boilerplate. Ship your SaaS in days,
              not months.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Product
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Legal
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-[11px] text-muted-foreground">
          &copy; {new Date().getFullYear()} AinzStack. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
