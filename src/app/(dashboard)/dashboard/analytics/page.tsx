import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDashboardSnapshot } from '@/lib/dashboard/data';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Operational metrics derived from the configured boilerplate services.',
};

export default async function AnalyticsPage() {
  const snapshot = await getDashboardSnapshot();
  const totalContent = snapshot.cmsSummary.postCount + snapshot.cmsSummary.docArticleCount;
  const integrationCoverage = Math.round(
    (snapshot.integrationSummary.configuredCount /
      snapshot.integrationSummary.totalCount) *
      100,
  );
  const successfulPurchases = snapshot.purchases.filter(
    (purchase) => purchase.status === 'succeeded',
  ).length;

  const insightCards = [
    {
      title: 'Integration Coverage',
      value: `${integrationCoverage}%`,
      detail: `${snapshot.integrationSummary.configuredCount} of ${snapshot.integrationSummary.totalCount} core services configured`,
    },
    {
      title: 'Content Published',
      value: String(totalContent),
      detail: `${snapshot.cmsSummary.postCount} blog posts and ${snapshot.cmsSummary.docArticleCount} documentation articles`,
    },
    {
      title: 'Purchase Records',
      value: String(snapshot.purchases.length),
      detail: `${successfulPurchases} successful payments captured by the webhook flow`,
    },
    {
      title: 'Docs Taxonomy',
      value: String(snapshot.cmsSummary.docCategoryCount),
      detail: 'Documentation categories available in Sanity',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold tracking-tight">
          Analytics
        </h1>
        <p className="text-[12px] text-muted-foreground">
          Real metrics available from the integrations currently implemented by the boilerplate.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {insightCards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.detail}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tracking-tight">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Breakdown</CardTitle>
          <CardDescription>
            This route intentionally reports only metrics the current stack can verify without synthetic placeholder data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.values(snapshot.integrationSummary.services).map((service) => (
            <div
              key={service.name}
              className="flex items-start justify-between gap-4 rounded-md border border-border/60 px-3 py-3"
            >
              <div className="space-y-1">
                <p className="text-[13px] font-medium">{service.name}</p>
                <p className="text-[11px] text-muted-foreground">{service.summary}</p>
              </div>
              <Badge
                variant={service.status === 'configured' ? 'success' : 'outline'}
              >
                {service.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
