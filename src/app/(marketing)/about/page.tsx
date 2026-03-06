import { PortableText } from '@/components/sanity/portable-text';
import { Separator } from '@/components/ui/separator';
import { getSafePageBySlug } from '@/lib/sanity/safe-queries';

export const revalidate = 300;

export async function generateMetadata() {
  const page = await getSafePageBySlug('about');

  return {
    title: page?.seoTitle ?? 'About - AinzStack',
    description:
      page?.seoDescription ??
      'Learn about AinzStack - the production-ready Next.js boilerplate.',
  };
}

export default async function AboutPage() {
  const page = await getSafePageBySlug('about');

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          About
        </p>
        <h1 className="mt-1 font-heading text-xl font-bold tracking-tight">
          {page?.title ?? 'About AinzStack'}
        </h1>
      </div>

      <Separator className="mb-8 opacity-60" />

      {page?.body ? (
        <PortableText value={page.body} />
      ) : (
        <div className="space-y-3 text-[12px] leading-relaxed text-muted-foreground">
          <p>
            AinzStack is a production-ready, open-source Next.js boilerplate
            designed for indie developers and startups to rapidly launch SaaS,
            AI, or web apps.
          </p>
          <p>
            It includes authentication, billing, email, and CMS integrations so
            teams can start from an operational baseline instead of rebuilding
            the same platform concerns from scratch.
          </p>
        </div>
      )}
    </section>
  );
}
