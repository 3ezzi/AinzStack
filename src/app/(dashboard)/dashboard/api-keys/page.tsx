import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/copy-button';
import { getServerEnv } from '@/lib/env/server';

export const metadata: Metadata = {
  title: 'API Keys',
  description: 'Review configured public endpoints and secret-key readiness.',
};

function maskSecret(value: string | undefined): string {
  if (!value) {
    return 'Missing';
  }

  if (value.length <= 8) {
    return 'Configured';
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

export default function ApiKeysPage() {
  const env = getServerEnv();

  const publicValues = [
    {
      label: 'Application URL',
      value: env.NEXT_PUBLIC_APP_URL,
      description: 'Primary public origin used for auth callbacks and metadata.',
    },
    {
      label: 'Supabase URL',
      value: env.NEXT_PUBLIC_SUPABASE_URL ?? 'Missing',
      description: 'Public endpoint for Supabase auth and client requests.',
    },
    {
      label: 'Stripe Publishable Key',
      value: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? 'Missing',
      description: 'Client-side Stripe key used for safe browser integrations.',
    },
    {
      label: 'Sanity Project',
      value: env.SANITY_PROJECT_ID
        ? `${env.SANITY_PROJECT_ID}/${env.SANITY_DATASET}`
        : 'Missing',
      description: 'Sanity project and dataset currently used by the app.',
    },
  ];

  const secretStatuses = [
    {
      label: 'Supabase Service Role',
      value: maskSecret(env.SUPABASE_SERVICE_ROLE_KEY),
    },
    {
      label: 'Stripe Secret Key',
      value: maskSecret(env.STRIPE_SECRET_KEY),
    },
    {
      label: 'Stripe Webhook Secret',
      value: maskSecret(env.STRIPE_WEBHOOK_SECRET),
    },
    {
      label: 'Resend API Key',
      value: maskSecret(env.RESEND_API_KEY),
    },
    {
      label: 'Support Inbox',
      value: env.SUPPORT_EMAIL ?? 'Missing',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold tracking-tight">
          API Keys
        </h1>
        <p className="text-[12px] text-muted-foreground">
          This view exposes safe public values and secret-key readiness without leaking private credentials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Public Configuration</CardTitle>
          <CardDescription>
            Values that are intentionally safe to expose to the browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {publicValues.map((entry) => (
            <div
              key={entry.label}
              className="rounded-md border border-border/60 px-3 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[13px] font-medium">{entry.label}</p>
                  <p className="break-all text-[11px] text-muted-foreground">
                    {entry.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground/80">
                    {entry.description}
                  </p>
                </div>
                <CopyButton text={entry.value} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Secret Key Readiness</CardTitle>
          <CardDescription>
            Presence checks for server-only credentials. Values stay masked.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {secretStatuses.map((entry) => (
            <div
              key={entry.label}
              className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2.5"
            >
              <div>
                <p className="text-[13px] font-medium">{entry.label}</p>
                <p className="text-[11px] text-muted-foreground">{entry.value}</p>
              </div>
              <Badge
                variant={entry.value === 'Missing' ? 'outline' : 'success'}
              >
                {entry.value === 'Missing' ? 'Missing' : 'Configured'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
