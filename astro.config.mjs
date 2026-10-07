// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { SITE } from './src/site.config.ts';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  markdown: {
    // The unified (remark/rehype) pipeline lets you add any remark or rehype plugin here.
    // MDX files inherit the same processor.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
});
