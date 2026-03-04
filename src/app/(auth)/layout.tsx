import Link from 'next/link';
import { PageTransition } from '@/components/providers/page-transition';

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
            <div className="flex size-7 items-center justify-center rounded-md bg-foreground">
              <span className="text-[11px] font-bold text-background">A</span>
            </div>
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
