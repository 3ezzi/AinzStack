import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getIntegrationSummary } from '@/lib/integrations/status';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Review integration readiness across Supabase, Stripe, Sanity, and Resend.',
};

export default function IntegrationsPage() {
  const summary = getIntegrationSummary();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tight">
            Integrations
          </h1>
          <p className="text-[12px] text-muted-foreground">
            Service readiness based on the environment variables currently loaded by the app.
          </p>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link href="/api/health">Open Health Endpoint</Link>
        </Button>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {Object.values(summary.services).map((service) => (
          <Card key={service.name}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </div>
                <Badge
                  variant={service.status === 'configured' ? 'success' : 'outline'}
                >
                  {service.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                Required Variables
              </p>
              <ul className="space-y-1 text-[12px] text-muted-foreground">
                {service.requiredEnv.map((envName) => (
                  <li key={envName} className="rounded-md border border-border/60 px-3 py-2">
                    {envName}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
