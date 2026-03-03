import { PageTransition } from '@/components/providers/page-transition';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary/30 px-4">
      <main id="main-content" className="w-full max-w-sm">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
