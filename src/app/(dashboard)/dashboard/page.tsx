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
import { getDashboardSnapshot } from '@/lib/dashboard/data';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of your application metrics and recent activity.',
};

function formatCurrency(amountCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amountCents / 100);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot();
  const checklist = [
    {
      label: 'Authentication active',
      complete: Boolean(snapshot.user),
      detail: snapshot.user
        ? `Signed in as ${snapshot.user.email}`
        : 'User session is missing.',
    },
    {
      label: 'Billing configured',
      complete: snapshot.integrationSummary.services.stripe.status === 'configured',
      detail:
        snapshot.activePurchase?.status === 'succeeded'
          ? `Latest purchase: ${snapshot.plan.name}`
          : 'No completed purchase recorded yet.',
    },
    {
      label: 'CMS connected',
      complete: snapshot.integrationSummary.services.sanity.status === 'configured',
      detail: `${snapshot.cmsSummary.postCount} blog posts and ${snapshot.cmsSummary.docArticleCount} docs articles available.`,
    },
    {
      label: 'Transactional email ready',
      complete: snapshot.integrationSummary.services.resend.status === 'configured',
      detail: snapshot.integrationSummary.services.resend.summary,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-[12px] text-muted-foreground">
            Operational overview for the current workspace and deployment setup.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href="/dashboard/integrations">Review Integrations</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/settings">Manage Account</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Latest successful purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold tracking-tight">
              {snapshot.activePurchase
                ? formatCurrency(snapshot.activePurchase.amountCents)
                : 'Free'}
            </p>
            <p className="text-[12px] text-muted-foreground">
              {snapshot.plan.name} plan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configured Services</CardTitle>
            <CardDescription>Environment-backed integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold tracking-tight">
              {snapshot.integrationSummary.configuredCount}/
              {snapshot.integrationSummary.totalCount}
            </p>
            <p className="text-[12px] text-muted-foreground">
              {snapshot.integrationSummary.status === 'ok'
                ? 'All core integrations configured.'
                : 'Some integrations still need environment setup.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Inventory</CardTitle>
            <CardDescription>Sanity-backed content counts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-2xl font-bold tracking-tight">
              {snapshot.cmsSummary.postCount + snapshot.cmsSummary.docArticleCount}
            </p>
            <p className="text-[12px] text-muted-foreground">
              {snapshot.cmsSummary.postCount} posts, {snapshot.cmsSummary.docArticleCount} docs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Authenticated workspace owner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="truncate text-sm font-semibold">{snapshot.user?.fullName}</p>
            <p className="truncate text-[12px] text-muted-foreground">
              {snapshot.user?.email}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Launch Checklist</CardTitle>
            <CardDescription>
              Concrete readiness checks based on the currently configured services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between gap-4 rounded-md border border-border/60 px-3 py-3"
              >
                <div className="space-y-1">
                  <p className="text-[13px] font-medium">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.detail}</p>
                </div>
                <Badge variant={item.complete ? 'success' : 'outline'}>
                  {item.complete ? 'Ready' : 'Pending'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Billing Activity</CardTitle>
            <CardDescription>Latest purchase records for this account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {snapshot.purchases.length === 0 ? (
              <div className="space-y-3 rounded-md border border-dashed border-border/70 px-3 py-4">
                <p className="text-[12px] text-muted-foreground">
                  No purchase records yet. Visit pricing to test the checkout flow.
                </p>
                <Button size="sm" asChild>
                  <Link href="/pricing">Open Pricing</Link>
                </Button>
              </div>
            ) : (
              snapshot.purchases.slice(0, 3).map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2.5"
                >
                  <div>
                    <p className="text-[13px] font-medium capitalize">
                      {purchase.plan} plan
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {formatDate(purchase.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-medium">
                      {formatCurrency(purchase.amountCents)}
                    </p>
                    <Badge
                      variant={
                        purchase.status === 'succeeded' ? 'success' : 'secondary'
                      }
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
