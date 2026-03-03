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

const PlaygroundSection = dynamic(
  () =>
    import('@/components/playground/playground-section').then(
      (mod) => mod.PlaygroundSection,
    ),
  { ssr: false },
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
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
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="mb-4">
              Open Source Boilerplate
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ship Your SaaS
            <br />
            <span className="text-muted-foreground">in Days, Not Months</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-lg text-[15px] text-muted-foreground"
          >
            Production-ready Next.js 16 boilerplate with auth, payments, email,
            and CMS. Stop rebuilding the same infrastructure — start building
            what matters.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-3"
          >
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get Started
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-[11px] text-muted-foreground"
          >
            Free and open source. No credit card required.
          </motion.p>
        </motion.div>
      </section>

      {/* Tech Stack Badges */}
      <section className="border-y border-border/60 bg-secondary/30 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-4">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-[11px]">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-2xl font-bold tracking-tight"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm text-muted-foreground"
          >
            Pre-built integrations that save 220+ hours of development time.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <Card className="h-full transition-colors duration-150 hover:border-foreground/10">
                <CardContent className="flex flex-col gap-2">
                  <feature.icon className="size-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
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
      <section className="border-t border-border/60 bg-secondary/30 py-16 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            Ready to Build?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clone the repo, configure your keys, and ship your first feature
            today.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Start Building
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
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
