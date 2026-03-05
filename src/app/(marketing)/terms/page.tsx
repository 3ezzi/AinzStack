import { ComingSoon } from '@/components/shared/coming-soon';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AinzStack',
};

export default function TermsPage() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <ComingSoon />
    </div>
  );
}
