'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  MailIcon,
  DatabaseIcon,
  CodeIcon,
  ZapIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fadeUp, stagger } from '@/lib/motion';

const PlaygroundSection = dynamic(
  () =>
    import('@/components/playground/playground-section').then(
      (mod) => mod.PlaygroundSection,
    ),
  { ssr: false, loading: () => <div className="h-64" /> },
);

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Authentication',
    description:
      'Supabase Auth with email, password, and Google OAuth. Session management via proxy.ts.',
  },
  {
    icon: CreditCardIcon,
    title: 'Payments',
    description:
      'Stripe subscriptions, checkout sessions, customer portal, and webhook handling.',
  },
  {
    icon: MailIcon,
    title: 'Transactional Email',
    description:
      'Resend integration with templates, logging, and delivery tracking.',
  },
  {
    icon: DatabaseIcon,
    title: 'Sanity CMS',
    description:
      'Structured content backend with real-time previews and typed schemas.',
  },
  {
    icon: CodeIcon,
    title: 'Full TypeScript',
    description:
      'Strict mode, path aliases, exhaustive type checking, and Zod validation.',
  },
  {
    icon: ZapIcon,
    title: 'Turbopack',
    description:
      'Next.js 16 with Turbopack for instant dev starts and blazing-fast builds.',
  },
];

const techStack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind v4',
  'shadcn/ui',
  'Supabase',
  'Stripe',
  'Sanity',
  'Framer Motion',
  'Vitest',
  'Playwright',
];

export function HomepageContent() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger()}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="mb-4 text-[10px]">
              Open Source Boilerplate
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Ship Your SaaS
            <br />
            <span className="text-muted-foreground">in Days, Not Months</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground"
          >
            Production-ready Next.js 16 boilerplate with auth, payments, email,
            and CMS. Stop rebuilding the same infrastructure — start building
            what matters.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex items-center gap-2"
          >
            <Button size="sm" asChild>
              <Link href="/sign-up">
                Get Started
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-2.5 text-[10px] text-muted-foreground"
          >
            Free and open source. No credit card required.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground"
          >
            <span>
              Built by{' '}
              <a
                href="https://github.com/JCFcodex"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                JCFcodex
              </a>
            </span>
            <span className="text-border">·</span>
            <a
              href="https://github.com/JCFcodex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/jcfcodex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Facebook"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="border-y border-border/60 bg-muted/30 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-1.5 px-4">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[10px] font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger()}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70"
          >
            Features
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-1.5 font-heading text-xl font-bold tracking-tight"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-1.5 text-[12px] text-muted-foreground"
          >
            Pre-built integrations that save 220+ hours of development time.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger()}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <Card className="h-full transition-colors duration-150 hover:border-foreground/10">
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                    <feature.icon className="size-3.5 text-foreground" />
                  </div>
                  <h3 className="text-[13px] font-semibold">{feature.title}</h3>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Playground */}
      <PlaygroundSection />

      {/* Final CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Get Started
          </p>
          <h2 className="mt-1.5 font-heading text-xl font-bold tracking-tight">
            Ready to Build?
          </h2>
          <p className="mt-1.5 text-[12px] text-muted-foreground">
            Clone the repo, configure your keys, and ship your first feature
            today.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <Button size="sm" asChild>
              <Link href="/sign-up">
                Start Building
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/JCFcodex/AinzStack"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
