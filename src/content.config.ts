import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** Drafts are visible in `npm run dev` but excluded from production builds. */
      draft: z.boolean().default(false),
      /** Pinned posts are listed first on the home page. */
      pinned: z.boolean().default(false),
      /** Social share image. A local image (relative path) or an absolute URL. */
      image: z.union([image(), z.string()]).optional(),
      /** Set to false to hide the table of contents on this post. */
      toc: z.boolean().default(true),
      /** Language of this post, e.g. 'en' or 'zh-CN'. Detected from the text when omitted. */
      lang: z.string().optional(),
    }),
});

export const collections = { posts };
