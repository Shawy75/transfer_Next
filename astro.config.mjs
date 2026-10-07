// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSumi from './src/utils/rehype-sumi.mjs';
import { SITE } from './src/site.config.ts';

export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    // Keep utility pages out of the sitemap.
    sitemap({ filter: (page) => !/\/(search|404)\/?$/.test(page) }),
  ],
  markdown: {
    // The unified (remark/rehype) pipeline lets you add any remark or rehype plugin here.
    // MDX files inherit the same processor.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, [rehypeSumi, { base: SITE.base }]],
    }),
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
      wrap: false,
    },
  },
});
