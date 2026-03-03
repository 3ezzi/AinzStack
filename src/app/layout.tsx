import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AinzStack — Ship Your SaaS in Days, Not Months',
    template: '%s | AinzStack',
  },
  description:
    'Production-ready Next.js 16 boilerplate for indie developers and startups. Pre-built auth, payments, email, and Sanity CMS. Ship 10x faster.',
  keywords: [
    'Next.js boilerplate',
    'SaaS starter',
    'Next.js 16',
    'Supabase',
    'Stripe',
    'shadcn/ui',
    'Tailwind CSS',
    'TypeScript',
    'Sanity CMS',
  ],
  authors: [{ name: 'JCFcodex' }],
  creator: 'JCFcodex',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ainzstack.dev',
    siteName: 'AinzStack',
    title: 'AinzStack — Ship Your SaaS in Days, Not Months',
    description:
      'Production-ready Next.js 16 boilerplate with auth, payments, email, and CMS. Built for speed.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AinzStack — Ship Your SaaS in Days, Not Months',
    description:
      'Production-ready Next.js 16 boilerplate with auth, payments, email, and CMS.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
