import { CheckIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { STRIPE_PLANS } from '@/lib/stripe/plans';

interface Purchase {
  id: string;
  plan: string;
  amount_cents: number;
  status: string;
  created_at: string;
}

async function getUserPurchases(): Promise<Purchase[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
      .from('purchases')
      .select('id, plan, amount_cents, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error({ error }, 'Failed to fetch purchases');
      return [];
    }

    return (data ?? []) as Purchase[];
  } catch {
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatAmount(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

const statusColors: Record<string, string> = {
  succeeded: 'success',
  pending: 'secondary',
  failed: 'destructive',
  refunded: 'outline',
};

export default async function BillingPage() {
  const purchases = await getUserPurchases();
  const activePurchase = purchases.find((p) => p.status === 'succeeded');
  const planConfig = activePurchase
    ? STRIPE_PLANS[activePurchase.plan as keyof typeof STRIPE_PLANS]
    : STRIPE_PLANS.starter;
  const planFeatures =
    activePurchase?.plan === 'team'
      ? [
          'Everything in Pro',
          'Multi-seat license',
          'Custom components',
          'CI/CD workflows',
          'Slack support',
          'White-label ready',
        ]
      : activePurchase?.plan === 'pro'
        ? [
            'All boilerplate code',
            'Stripe payments',
            'Resend email',
            'Sanity CMS',
            'Dashboard template',
            'Priority support',
          ]
        : [
            'All boilerplate code',
            'Community support',
            'Supabase integration',
            'Basic auth',
          ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold tracking-tight">
          Billing
        </h1>
        <p className="text-[12px] text-muted-foreground">
          Manage your plan and view purchase history.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are on the {planConfig?.name ?? 'Starter'} plan.
            </CardDescription>
          </div>
          <Badge variant={activePurchase ? 'success' : 'secondary'}>
            {activePurchase ? 'Active' : 'Free'}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-2xl font-bold tracking-tight">
              {activePurchase
                ? formatAmount(activePurchase.amount_cents)
                : 'Free'}
            </span>
            {activePurchase && (
              <span className="text-[12px] text-muted-foreground">
                /one-time
              </span>
            )}
          </div>
          <ul className="mt-4 space-y-1.5">
            {planFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-[12px] text-muted-foreground"
              >
                <CheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>Your payment records.</CardDescription>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <div className="flex h-20 items-center justify-center text-[12px] text-muted-foreground">
              No purchases yet. Visit the pricing page to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-[13px] font-medium capitalize">
                        {purchase.plan} Plan
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {formatDate(purchase.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium">
                      {formatAmount(purchase.amount_cents)}
                    </span>
                    <Badge
                      variant={
                        (statusColors[purchase.status] as
                          | 'success'
                          | 'secondary'
                          | 'destructive'
                          | 'outline') ?? 'secondary'
                      }
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
