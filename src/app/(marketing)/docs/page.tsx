import Link from 'next/link';
import { getDocCategories } from '@/lib/sanity/queries';
import { BookOpenIcon, ChevronRightIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Docs — AinzStack',
  description: 'Documentation and guides for AinzStack.',
};

export default async function DocsPage() {
  const categories = await getDocCategories();

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Documentation
        </p>
        <h1 className="mt-1 font-heading text-xl font-bold tracking-tight">
          Guides &amp; Reference
        </h1>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Everything you need to get started with AinzStack.
        </p>
      </div>

      <Separator className="mb-8 opacity-60" />

      {categories.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <BookOpenIcon className="size-6 text-muted-foreground/40" />
          <p className="text-[12px] text-muted-foreground">
            Documentation coming soon.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category._id}>
              <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {category.title}
              </h2>
              <div className="space-y-1">
                {category.articles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/docs/${article.slug}`}
                    className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-[12px] font-medium transition-colors hover:bg-accent"
                  >
                    <span>{article.title}</span>
                    <ChevronRightIcon className="size-3 text-muted-foreground" />
                  </Link>
                ))}
                {category.articles.length === 0 && (
                  <p className="px-3 py-2 text-[11px] text-muted-foreground">
                    No articles yet.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
