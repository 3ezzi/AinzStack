import {
  getDocArticleBySlug,
  getDocCategories,
  getPageBySlug,
  getPostBySlug,
  getPosts,
  type DocArticleContent,
  type DocCategoryWithArticles,
  type PageContent,
  type Post,
  type PostDetail,
} from '@/lib/sanity/queries';

async function withSanityFallback<T>(
  operation: string,
  fallback: T,
  loader: () => Promise<T>,
): Promise<T> {
  try {
    return await loader();
  } catch (error) {
    console.error({ error }, `Sanity query failed: ${operation}`);
    return fallback;
  }
}

export function getSafePageBySlug(slug: string): Promise<PageContent | null> {
  return withSanityFallback(`getPageBySlug(${slug})`, null, () =>
    getPageBySlug(slug),
  );
}

export function getSafePosts(): Promise<Post[]> {
  return withSanityFallback('getPosts()', [], () => getPosts());
}

export function getSafePostBySlug(slug: string): Promise<PostDetail | null> {
  return withSanityFallback(`getPostBySlug(${slug})`, null, () =>
    getPostBySlug(slug),
  );
}

export function getSafeDocCategories(): Promise<DocCategoryWithArticles[]> {
  return withSanityFallback('getDocCategories()', [], () => getDocCategories());
}

export function getSafeDocArticleBySlug(
  slug: string,
): Promise<DocArticleContent | null> {
  return withSanityFallback(`getDocArticleBySlug(${slug})`, null, () =>
    getDocArticleBySlug(slug),
  );
}
