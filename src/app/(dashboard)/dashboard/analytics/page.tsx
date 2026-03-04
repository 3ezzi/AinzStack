import type { Metadata } from 'next';
import { ComingSoon } from '@/components/shared/coming-soon';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Analytics dashboard — coming soon.',
};

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Analytics"
      description="Track your usage, monitor performance metrics, and gain insights into your application — all in one place."
    />
  );
}
