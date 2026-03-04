import type { Metadata } from 'next';
import { ComingSoon } from '@/components/shared/coming-soon';

export const metadata: Metadata = {
  title: 'API Keys',
  description: 'Manage your API keys — coming soon.',
};

export default function ApiKeysPage() {
  return (
    <ComingSoon
      title="API Keys"
      description="Generate, rotate, and manage API keys for secure programmatic access to your workspace resources."
    />
  );
}
