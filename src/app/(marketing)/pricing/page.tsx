'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon, LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type PlanKey } from '@/lib/stripe/plans';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const plans: Array<{
  key: PlanKey;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  variant: 'outline' | 'default';
  popular: boolean;
  checkoutEnabled: boolean;
}> = [
  {
    key: 'starter',
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for side projects and learning.',
    features: [
      'All boilerplate code',
      'Community support',
      'Supabase integration',
      'Basic auth',
    ],
    cta: 'Get Started',
    variant: 'outline',
    popular: false,
    checkoutEnabled: false,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/one-time',
    description: 'For indie developers shipping real products.',
    features: [
      'Everything in Starter',
      'Stripe payments',
      'Resend email',
      'Sanity CMS',
      'Dashboard template',
      'Priority support',
    ],
    cta: 'Buy Now',
    variant: 'default',
    popular: true,
    checkoutEnabled: true,
  },
  {
    key: 'team',
    name: 'Team',
    price: '$149',
    period: '/one-time',
    description: 'For teams building production apps.',
    features: [
      'Everything in Pro',
      'Multi-seat license',
      'Custom components',
      'CI/CD workflows',
      'Slack support',
      'White-label ready',
    ],
    cta: 'Buy Now',
    variant: 'outline',
    popular: false,
    checkoutEnabled: true,
  },
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null);

  async function handleCheckout(plan: PlanKey) {
    setLoadingPlan(plan);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/sign-up';
          return;
        }
        console.error({ error: data.error }, 'Checkout failed');
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error({ error }, 'Checkout request failed');
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70"
        >
          Pricing
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-1.5 font-heading text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-1.5 text-[12px] text-muted-foreground"
        >
          One-time payment. Lifetime access. No subscriptions.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
        className="mt-8 grid gap-3 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div key={plan.key} variants={fadeUp}>
            <Card
              className={cn(
                'relative flex h-full flex-col transition-colors duration-150',
                plan.popular && 'border-foreground',
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 left-4 text-[10px]">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="pb-3">
                <CardTitle className="text-[13px]">{plan.name}</CardTitle>
                <CardDescription className="text-[11px]">
                  {plan.description}
                </CardDescription>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-2xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[11px] text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <Separator className="mx-4 w-auto opacity-60" />

              <CardContent className="flex flex-1 flex-col pt-3">
                <ul className="flex-1 space-y-1.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[11px] text-muted-foreground"
                    >
                      <CheckIcon className="size-3 shrink-0 text-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.checkoutEnabled ? (
                  <Button
                    variant={plan.variant}
                    size="sm"
                    className="mt-5 w-full text-[12px]"
                    disabled={loadingPlan !== null}
                    onClick={() => handleCheckout(plan.key)}
                  >
                    {loadingPlan === plan.key ? (
                      <>
                        <LoaderIcon className="size-3 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                ) : (
                  <Button
                    variant={plan.variant}
                    size="sm"
                    className="mt-5 w-full text-[12px]"
                    asChild
                  >
                    <Link href="/sign-up">{plan.cta}</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
