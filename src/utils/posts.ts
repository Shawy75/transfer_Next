import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './url';

export type Post = CollectionEntry<'posts'>;

/** All published posts, newest first. Drafts are included only in dev. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Posts ordered for the home page: pinned first, then newest first. */
export function sortForHome(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => Number(b.data.pinned) - Number(a.data.pinned));
}

export function postUrl(post: Post): string {
  return withBase(`/posts/${post.id}/`);
}

/**
 * URL-safe slug for a taxonomy term. Keeps non-Latin characters (e.g. Chinese)
 * so terms stay readable; only whitespace and URL-reserved characters are replaced.
 */
export function slugify(term: string): string {
  return term
    .trim()
    .toLowerCase()
    .replace(/[\s/?#%\\&+]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface Term {
  name: string;
  slug: string;
  posts: Post[];
}

function collectTerms(posts: Post[], pick: (post: Post) => string[]): Term[] {
  const map = new Map<string, Term>();
  for (const post of posts) {
    for (const name of pick(post)) {
      const slug = slugify(name);
      if (!slug) continue;
      const term = map.get(slug) ?? { name, slug, posts: [] };
      term.posts.push(post);
      map.set(slug, term);
    }
  }
  return [...map.values()].sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
}

export function getCategories(posts: Post[]): Term[] {
  return collectTerms(posts, (p) => (p.data.category ? [p.data.category] : []));
}

export function getTags(posts: Post[]): Term[] {
  return collectTerms(posts, (p) => p.data.tags);
}

/** Posts grouped by year, newest year first. */
export function groupByYear(posts: Post[]): [number, Post[]][] {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힯]/g;

/** Strips Markdown/MDX syntax well enough for word counts and excerpts. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^(import|export)\s.*$/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Word count that treats each CJK character as one word. */
export function countWords(markdown: string): number {
  const text = toPlainText(markdown);
  const cjk = text.match(CJK)?.length ?? 0;
  const latin = text.replace(CJK, ' ').split(/\s+/).filter(Boolean).length;
  return cjk + latin;
}

/** Reading time in minutes, assuming 220 Latin words or 400 CJK characters per minute. */
export function readingTime(markdown: string): number {
  const text = toPlainText(markdown);
  const cjk = text.match(CJK)?.length ?? 0;
  const latin = text.replace(CJK, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(latin / 220 + cjk / 400));
}

/**
 * Language of a post: its `lang` frontmatter, otherwise 'zh-CN' when CJK characters
 * outnumber Latin words, otherwise undefined (the site locale applies).
 * Search uses this to split Chinese text into words correctly.
 */
export function postLang(post: Post): string | undefined {
  if (post.data.lang) return post.data.lang;
  const text = toPlainText(post.body ?? '');
  const cjk = text.match(CJK)?.length ?? 0;
  const latin = text.replace(CJK, ' ').split(/\s+/).filter(Boolean).length;
  return cjk > latin ? 'zh-CN' : undefined;
}

export function excerpt(post: Post, length = 160): string {
  if (post.data.description) return post.data.description;
  const text = toPlainText(post.body ?? '');
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

/* ---------- Item box helpers ---------- */

export type ReadingBucket = 'quick' | 'long' | 'deep';

/** Reading-time bucket: under 5 minutes, 5–15 minutes, over 15 minutes. */
export function readingBucket(post: Post): ReadingBucket {
  const minutes = readingTime(post.body ?? '');
  return minutes < 5 ? 'quick' : minutes <= 15 ? 'long' : 'deep';
}

/** Rarity tier shown on the potion icon for each reading bucket. */
export const BUCKET_TIER = { quick: 0, long: 1, deep: 3 } as const;

/** Number of fenced code blocks in a post. */
export function codeBlockCount(post: Post): number {
  const fences = (post.body ?? '').match(/^\s*(```|~~~)/gm)?.length ?? 0;
  return Math.floor(fences / 2);
}
