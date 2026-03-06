import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { PortableText } from '@/components/sanity/portable-text';
import type { SanityBlock } from '@/lib/sanity/queries';
import {
  getSafeDocArticleBySlug,
  getSafeDocCategories,
} from '@/lib/sanity/safe-queries';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getSafeDocArticleBySlug(slug);

  if (!article) {
    return { title: 'Not Found' };
  }

  return {
    title: `${article.title} - Docs - AinzStack`,
  };
}

export async function generateStaticParams() {
  const categories = await getSafeDocCategories();
  return categories.flatMap((category) =>
    category.articles.map((article) => ({ slug: article.slug })),
  );
}

export default async function DocArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getSafeDocArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/docs"
        className="mb-6 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3" />
        Back to Docs
      </Link>

      {article.category ? (
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {article.category.title}
        </p>
      ) : null}

      <h1 className="mb-6 font-heading text-2xl font-semibold tracking-tight">
        {article.title}
      </h1>

      {article.body ? (
        <PortableText
          value={article.body.filter(
            (block: SanityBlock) =>
              !(block._type === 'block' && block.style === 'h1'),
          )}
        />
      ) : null}
    </article>
  );
}
