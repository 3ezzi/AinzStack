import { getSanityClient } from './client';

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  author->{ name, "slug": slug.current, avatar }
`;

export async function getPosts() {
  const client = getSanityClient();
  return client.fetch<Post[]>(
    /* groq */ `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`,
  );
}

export async function getPostBySlug(slug: string) {
  const client = getSanityClient();
  return client.fetch<PostDetail | null>(
    /* groq */ `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
    { slug },
  );
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function getPageBySlug(slug: string) {
  const client = getSanityClient();
  return client.fetch<PageContent | null>(
    /* groq */ `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      body,
      seoTitle,
      seoDescription
    }`,
    { slug },
  );
}

// ---------------------------------------------------------------------------
// Docs
// ---------------------------------------------------------------------------

export async function getDocCategories() {
  const client = getSanityClient();
  return client.fetch<
    DocCategoryWithArticles[]
  >(/* groq */ `*[_type == "docCategory"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      "articles": *[_type == "docArticle" && references(^._id)] | order(order asc) {
        _id,
        title,
        "slug": slug.current
      }
    }`);
}

export async function getDocArticleBySlug(slug: string) {
  const client = getSanityClient();
  return client.fetch<DocArticleContent | null>(
    /* groq */ `*[_type == "docArticle" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      body,
      category->{ title, "slug": slug.current }
    }`,
    { slug },
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Author {
  name: string;
  slug: string;
  avatar?: SanityImage;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  author?: Author;
}

export interface PostDetail extends Post {
  body?: SanityBlock[];
}

export interface PageContent {
  _id: string;
  title: string;
  slug: string;
  body?: SanityBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface DocArticleSummary {
  _id: string;
  title: string;
  slug: string;
}

export interface DocCategoryWithArticles {
  _id: string;
  title: string;
  slug: string;
  articles: DocArticleSummary[];
}

export interface DocArticleContent {
  _id: string;
  title: string;
  slug: string;
  body?: SanityBlock[];
  category?: { title: string; slug: string };
}

// Sanity primitives
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityBlock = any;

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; width: number; height: number };
}
