import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog — AinzStack',
  description: 'Latest articles, tutorials, and updates from AinzStack.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-2xl font-semibold tracking-tight">
        Blog
      </h1>
      <p className="mb-8 text-[13px] text-muted-foreground">
        Latest articles, tutorials, and updates.
      </p>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                    <Image
                      src={urlForImage(post.coverImage)
                        .width(600)
                        .height(338)
                        .auto('format')
                        .url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{post.title}</CardTitle>
                  {post.publishedAt && (
                    <CardDescription className="text-[11px]">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </CardDescription>
                  )}
                </CardHeader>
                {post.excerpt && (
                  <CardContent className="pt-0">
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
