import type { Metadata } from 'next';
import { ComingSoon } from '@/components/shared/coming-soon';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Manage your integrations — coming soon.',
};

export default function IntegrationsPage() {
  return (
    <ComingSoon
      title="Integrations"
      description="Connect your favorite tools and services. Manage webhooks, third-party APIs, and automation workflows from a single hub."
    />
  );
}
