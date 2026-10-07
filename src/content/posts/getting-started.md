---
title: Getting Started with Sumi
description: Install the theme, set your site details in one file, write your first post, and deploy — in about ten minutes.
date: 2026-09-28
category: Guide
tags: [Sumi, Astro, Setup]
pinned: true
---

Sumi is a calm, two-column blog theme for [Astro](https://astro.build). This post walks
through everything you need to go from a fresh download to a live site.

## Requirements

- **Node.js 22.12 or newer.** Check with `node -v`. If you use [nvm](https://github.com/nvm-sh/nvm),
  run `nvm install` in the project folder — the included `.nvmrc` picks the right version.
- A text editor. Any will do.

## Install

```bash
npm install
npm run dev
```

Open <http://localhost:4321> and you should see this very post.

## Make it yours

Almost everything lives in a single file, `src/site.config.ts`:

```ts
export const SITE: SiteConfig = {
  url: 'https://your-domain.com',
  title: 'My Blog',
  subtitle: 'Notes on things I care about',
  locale: 'en', // or 'zh-CN'
  author: {
    name: 'Your Name',
    avatar: '/avatar.png',
    bio: 'One line about you.',
  },
  // …
};
```

Replace `public/avatar.svg` and `public/favicon.svg` with your own images, then run
`node scripts/generate-og.mjs` to regenerate the default social share image with your
site title.

## Write a post

Create a Markdown file in `src/content/posts/`. The file name becomes the URL:
`my-first-post.md` is served at `/posts/my-first-post/`.

```markdown
---
title: My First Post
description: Shown on the home page and in search results.
date: 2026-10-01
category: Notes
tags: [hello, writing]
---

Your words here.
```

See [Writing Posts](/posts/writing-posts/) for every frontmatter option.

## Deploy

```bash
npm run build
```

The finished site is in `dist/`. Upload it anywhere that serves static files. Netlify,
Vercel and Cloudflare Pages all detect Astro automatically — connect your repository and
accept the defaults.
