import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AinzStack.',
};

const privacySections = [
  {
    title: 'Information We Process',
    body: 'AinzStack processes account details, authentication metadata, billing identifiers, CMS content, and support communications strictly to operate the product. You are responsible for the data you store in Supabase, Sanity, Stripe, and any downstream integrations.',
  },
  {
    title: 'How Data Is Used',
    body: 'We use collected data to authenticate users, fulfill purchases, deliver transactional email, render content, and provide operational support. We do not sell personal information or use customer data for unrelated advertising.',
  },
  {
    title: 'Infrastructure Providers',
    body: 'Production deployments may rely on Supabase, Stripe, Sanity, Resend, and hosting providers such as Vercel. Each provider processes data according to its own terms and privacy commitments.',
  },
  {
    title: 'Security Responsibilities',
    body: 'This boilerplate includes security defaults, but deployers remain responsible for configuring secrets, enforcing Supabase RLS, setting lawful retention policies, and meeting regional compliance obligations for their own applications.',
  },
  {
    title: 'Contact',
    body: 'Questions about privacy practices should be sent to the support email configured for your deployment. If you distribute AinzStack commercially, publish a privacy contact that matches your operating entity.',
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Legal
        </p>
        <h1 className="mt-1 font-heading text-xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Baseline privacy terms for AinzStack deployments.
        </p>
      </div>

      <Separator className="mb-8 opacity-60" />

      <div className="space-y-8">
        {privacySections.map((section) => (
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
