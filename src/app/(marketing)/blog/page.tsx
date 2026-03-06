import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { urlForImage } from '@/lib/sanity/image';
import { getSafePosts } from '@/lib/sanity/safe-queries';

export const revalidate = 300;

export const metadata = {
  title: 'Blog',
  description: 'Latest articles, tutorials, and updates from AinzStack.',
};

export default async function BlogPage() {
  const posts = await getSafePosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Blog
        </p>
        <h1 className="mt-1 font-heading text-xl font-bold tracking-tight">
          Latest Articles
        </h1>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Tutorials, updates, and insights from the AinzStack team.
        </p>
      </div>

      <Separator className="mb-8 opacity-60" />

      {posts.length === 0 ? (
        <p className="text-[12px] text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-colors duration-150 hover:border-foreground/10">
                {post.coverImage ? (
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={urlForImage(post.coverImage)
                        .width(600)
                        .height(338)
                        .auto('format')
                        .url()}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <CardHeader className="pb-2">
                  <CardTitle className="text-[13px]">{post.title}</CardTitle>
                  {post.publishedAt ? (
                    <CardDescription className="text-[10px]">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </CardDescription>
                  ) : null}
                </CardHeader>
                {post.excerpt ? (
                  <CardContent className="pt-0">
                    <p className="line-clamp-2 text-[11px] text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </CardContent>
                ) : null}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
