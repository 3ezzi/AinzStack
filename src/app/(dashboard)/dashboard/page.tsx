import type { Metadata } from 'next';
import { DashboardContent } from '@/components/dashboard/dashboard-content';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of your application metrics and recent activity.',
};

export default function DashboardPage() {
  return <DashboardContent />;
}
