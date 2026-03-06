import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageTransition } from '@/components/providers/page-transition';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <main id="main-content" className="w-full max-w-[380px]">
        {/* Brand */}
        <div className="mb-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AinzStack Logo"
              width={28}
              height={28}
              className="rounded-md"
              priority
            />
            <span className="font-heading text-[15px] font-semibold tracking-tight">
              AinzStack
            </span>
          </Link>
        </div>

        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
