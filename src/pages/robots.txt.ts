import type { APIContext } from 'astro';
import { SITE } from '@/site.config';
import { withBase } from '@/utils/url';

export function GET(context: APIContext) {
  const sitemap = new URL(withBase('/sitemap-index.xml'), context.site ?? SITE.url);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
