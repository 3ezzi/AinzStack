import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { LoadingScreen } from '@/components/providers/loading-screen';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://ainzstack.dev',
  ),
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
    url: '/',
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
      <body
        className={`${poppins.variable} ${inter.variable} min-h-dvh font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-primary focus:px-3 focus:py-1.5 focus:text-[13px] focus:text-primary-foreground focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <LoadingScreen />
            {children}
            <Toaster position="bottom-right" richColors closeButton />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
