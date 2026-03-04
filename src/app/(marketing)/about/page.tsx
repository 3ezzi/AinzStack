import { getPageBySlug } from '@/lib/sanity/queries';
import { PortableText } from '@/components/sanity/portable-text';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const page = await getPageBySlug('about');
  return {
    title: page?.seoTitle ?? 'About — AinzStack',
    description:
      page?.seoDescription ??
      'Learn about AinzStack — the production-ready Next.js boilerplate.',
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 font-heading text-2xl font-semibold tracking-tight">
        {page?.title ?? 'About'}
      </h1>

      {page?.body ? (
        <PortableText value={page.body} />
      ) : (
        <div className="space-y-3 text-[13px] text-muted-foreground">
          <p>
            AinzStack is a production-ready, open-source Next.js boilerplate
            designed for indie developers and startups to rapidly launch SaaS,
            AI, or web apps.
          </p>
          <p>
            It features pre-built authentication, payments, email, and Sanity as
            the powerful backend CMS — saving 220+ hours of development time.
          </p>
        </div>
      )}
    </section>
  );
}
