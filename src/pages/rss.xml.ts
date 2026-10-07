import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@/site.config';
import { excerpt, getPosts, postUrl } from '@/utils/posts';
import { withBase } from '@/utils/url';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(withBase('/'), context.site ?? SITE.url).href,
    items: posts
      .filter((post) => !post.data.draft)
      .map((post) => ({
        title: post.data.title,
        description: excerpt(post, 300),
        pubDate: post.data.date,
        link: postUrl(post),
        categories: [post.data.category, ...post.data.tags].filter((c): c is string => Boolean(c)),
      })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
