import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AinzStack.',
};

const termsSections = [
  {
    title: 'License Scope',
    body: 'AinzStack is provided under the repository license. You may use, modify, and distribute the code according to that license, but you remain responsible for legal, operational, and security compliance in your own deployment.',
  },
  {
    title: 'No Warranty',
    body: 'The boilerplate is delivered as-is. Integration code, sample flows, and operational defaults are provided without guarantees of merchantability, fitness for a particular purpose, or uninterrupted availability.',
  },
  {
    title: 'Deployment Obligations',
    body: 'Before serving end users, you must configure environment variables, enforce data-access controls, publish your own legal terms where required, and validate that payment, email, and authentication flows meet your business and regulatory requirements.',
  },
  {
    title: 'Third-Party Services',
    body: 'Your use of Supabase, Stripe, Sanity, Resend, Google OAuth, and hosting providers is governed by those providers. You are responsible for fees, support, and compliance arising from those services.',
  },
  {
    title: 'Acceptable Use',
    body: 'Do not use AinzStack to violate law, abuse infrastructure, distribute malware, or collect data without authorization. Remove or replace starter content that does not apply to your product before launch.',
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Legal
        </p>
        <h1 className="mt-1 font-heading text-xl font-bold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Baseline terms for shipping and operating applications built on AinzStack.
        </p>
      </div>

      <Separator className="mb-8 opacity-60" />

      <div className="space-y-8">
        {termsSections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              {section.title}
            </h2>
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </section>
  );
}
