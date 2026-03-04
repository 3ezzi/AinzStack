import Link from 'next/link';
import { getDocCategories } from '@/lib/sanity/queries';
import { BookOpenIcon, ChevronRightIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Docs — AinzStack',
  description: 'Documentation and guides for AinzStack.',
};

export default async function DocsPage() {
  const categories = await getDocCategories();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-2xl font-semibold tracking-tight">
        Documentation
      </h1>
      <p className="mb-8 text-[13px] text-muted-foreground">
        Everything you need to get started with AinzStack.
      </p>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <BookOpenIcon className="size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            Documentation coming soon.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category._id}>
              <h2 className="mb-3 font-heading text-sm font-semibold tracking-tight">
                {category.title}
              </h2>
              <div className="space-y-1">
                {category.articles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/docs/${article.slug}`}
                    className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2.5 text-[13px] transition-colors hover:bg-accent"
                  >
                    <span>{article.title}</span>
                    <ChevronRightIcon className="size-3.5 text-muted-foreground" />
                  </Link>
                ))}
                {category.articles.length === 0 && (
                  <p className="px-3 py-2 text-xs text-muted-foreground">
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
