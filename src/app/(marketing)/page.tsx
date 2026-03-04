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
import { Separator } from '@/components/ui/separator';

const PlaygroundSection = dynamic(
  () =>
    import('@/components/playground/playground-section').then(
      (mod) => mod.PlaygroundSection,
    ),
  { ssr: false },
);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
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
          variants={stagger}
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
          variants={stagger}
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
