'use client';

import { CheckIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold tracking-tight">
          Billing
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage your subscription and payment methods.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are on the Pro plan.</CardDescription>
          </div>
          <Badge variant="success">Active</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-2xl font-bold tracking-tight">
              $49
            </span>
            <span className="text-xs text-muted-foreground">/one-time</span>
          </div>
          <ul className="mt-4 space-y-1.5">
            {[
              'All boilerplate code',
              'Stripe payments',
              'Resend email',
              'Sanity CMS',
              'Dashboard template',
              'Priority support',
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <Button size="sm" variant="outline">
              Manage Subscription
            </Button>
            <Button size="sm" variant="outline">
              Update Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Download past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-20 items-center justify-center text-xs text-muted-foreground">
            Invoices will appear here when connected to Stripe.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
