'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const plans = [
  {
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
    variant: 'outline' as const,
    popular: false,
  },
  {
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
    variant: 'default' as const,
    popular: true,
  },
  {
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
    cta: 'Contact Us',
    variant: 'outline' as const,
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-sm text-muted-foreground"
        >
          One-time payment. Lifetime access. No subscriptions.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
        className="mt-10 grid gap-4 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={fadeUp}>
            <Card
              className={cn(
                'relative h-full transition-colors duration-150',
                plan.popular && 'border-foreground',
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 left-4">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-sm">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <CheckIcon className="size-3 text-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.variant}
                  size="sm"
                  className="mt-6 w-full"
                  asChild
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
