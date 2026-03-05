import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { getPostBySlug } from '@/lib/sanity/queries';
import type { SanityBlock } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import { PortableText } from '@/components/sanity/portable-text';
import { JsonLd } from '@/components/seo/json-ld';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} — AinzStack`,
    description: post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ainzstack.dev';

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt ?? '',
          datePublished: post.publishedAt ?? undefined,
          author: post.author
            ? { '@type': 'Person', name: post.author.name }
            : undefined,
          url: `${baseUrl}/blog/${post.slug}`,
          publisher: {
            '@type': 'Organization',
            name: 'AinzStack',
            url: baseUrl,
          },
        }}
      />
      <article className="mx-auto max-w-2xl px-4 py-12">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3" />
          Back to Blog
        </Link>

        <h1 className="mb-2 font-heading text-2xl font-semibold tracking-tight">
          {post.title}
        </h1>

        <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
          {post.author && (
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
          )}
          {post.publishedAt && (
            <time>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
        </div>

        {post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={urlForImage(post.coverImage)
                .width(800)
                .height(450)
                .auto('format')
                .url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.body && (
          <PortableText
            value={post.body.filter(
              (block: SanityBlock) =>
                !(block._type === 'block' && block.style === 'h1'),
            )}
          />
        )}
      </article>
    </>
  );
}
