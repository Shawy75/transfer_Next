# Sumi — a minimal blog theme for Astro

Sumi (墨, "ink") is a calm, two-column blog theme for [Astro](https://astro.build): warm paper
tones, a sidebar with your profile and a live table of contents, and typography that works
equally well for English and Chinese.

[中文说明见下方](#中文说明)

## Features

- **Fast and static** — zero client-side framework; a few kilobytes of vanilla JS for small interactions.
- **Light and dark mode** — follows the OS by default, remembers the reader's choice, no flash on load.
- **Sidebar table of contents** with scroll-spy, plus a collapsible inline TOC on phones.
- **Home page pagination**, pinned posts, drafts.
- **Archives** (year timeline), **categories**, and a **tag cloud**.
- **Full-text search** powered by [Pagefind](https://pagefind.app) — no external service.
- **Code highlighting** with Shiki (dual light/dark themes), copy buttons and language labels.
- **Math** with KaTeX, rendered at build time.
- **SEO** — canonical URLs, Open Graph and Twitter cards, JSON-LD, sitemap, robots.txt, RSS.
- **Markdown and MDX** posts with type-checked frontmatter.
- **English and Chinese UI** out of the box; add more languages in one file.
- **Accessible** — semantic HTML, keyboard navigation, skip link, reduced-motion support.
- **One config file** — `src/site.config.ts`.

## Quick start

Requires **Node.js 22.12+** (`node -v` to check; `nvm install` uses the bundled `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command           | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Start the dev server with live reload.                        |
| `npm run build`   | Type-check, build the site into `dist/`, and build the search index. |
| `npm run preview` | Serve the production build locally (search works here).       |
| `npm run check`   | Type-check only.                                              |

## Configuration

Open `src/site.config.ts`. Every option is commented. The ones to change first:

| Option          | Description                                               |
| --------------- | --------------------------------------------------------- |
| `url`           | Your final domain, e.g. `https://example.com`.            |
| `title`, `subtitle`, `description` | Site name and summary.                 |
| `locale`        | `'en'` or `'zh-CN'`.                                      |
| `author`        | Name, avatar path and a one-line bio.                     |
| `accent`        | Accent colour for light and dark mode.                    |
| `nav`, `social` | Sidebar menu and social links.                            |
| `postsPerPage`  | Posts per home page.                                      |
| `postLicense`   | Licence notice under each post, or `false` to hide it.    |

Then replace the images in `public/`:

- `avatar.svg` — your avatar (any format; update `author.avatar` if you change the file name).
- `favicon.svg` — the browser tab icon.
- `og-default.png` — the default social share image. Run `node scripts/generate-og.mjs` to
  regenerate it from your title and subtitle, or drop in your own 1200×630 image.

Finally edit `src/pages/about.md`.

## Writing posts

Add `.md` or `.mdx` files to `src/content/posts/`. The file name is the URL slug.

```markdown
---
title: My First Post
date: 2026-10-01
description: Optional summary for the home page, search engines and social cards.
category: Notes
tags: [hello, writing]
draft: false      # true = visible in dev only
pinned: false     # true = always first on the home page
image: ./cover.png # optional share image
toc: true         # false = hide the table of contents
---
```

The sample posts in `src/content/posts/` demonstrate every feature — delete them when you are ready.

## Customising

- **Colours** — CSS variables at the top of `src/styles/global.css`.
- **Code theme** — `shikiConfig.themes` in `astro.config.mjs` (any [Shiki theme](https://shiki.style/themes)).
- **Markdown plugins** — add remark/rehype plugins to `unified({...})` in `astro.config.mjs`.
- **UI text / new languages** — `src/i18n.ts`.
- **Icons** — `src/components/icons.ts`.

## Deploying

`npm run build` writes a fully static site to `dist/`.

- **Netlify** — import the repository; `netlify.toml` is already set up.
- **Vercel** — import the repository; the Astro preset is detected automatically.
- **Cloudflare Pages** — framework preset *Astro*, build command `npm run build`, output `dist`,
  and set the environment variable `NODE_VERSION=22`.
- **GitHub Pages** — use the official [Astro GitHub Pages action](https://docs.astro.build/en/guides/deploy/github/).

Remember to set `url` in `site.config.ts` to your real domain before deploying.

## Project structure

```
public/                 static files (avatar, favicon, share image)
scripts/generate-og.mjs regenerates the default share image
src/
  site.config.ts        ← your settings
  i18n.ts               UI strings
  content.config.ts     post frontmatter schema
  content/posts/        your posts
  components/           UI pieces (Header, Sidebar, TOC, PostCard…)
  layouts/              page shells
  pages/                routes (home, posts, archives, categories, tags, search, RSS)
  styles/global.css     colours, typography, prose styles
  utils/                post helpers, date formatting
```

---

## 中文说明

Sumi 是一个简洁的 Astro 双栏博客主题：左侧是站点信息与目录，右侧是文章卡片，支持暗色模式、站内搜索、代码高亮、数学公式，中英文界面开箱即用。

**环境要求**：Node.js 22.12 及以上。

```bash
npm install
npm run dev        # 打开 http://localhost:4321
npm run build      # 构建到 dist/ 并生成搜索索引
npm run preview    # 本地预览构建结果（搜索功能在这里可用）
```

**改成你自己的站点**

1. 编辑 `src/site.config.ts`：站点地址 `url`、标题、作者信息、导航、社交链接；把 `locale` 改成 `'zh-CN'` 即可切换为中文界面。
2. 替换 `public/` 下的头像 `avatar.svg`、网站图标 `favicon.svg`；运行 `node scripts/generate-og.mjs` 重新生成分享图。
3. 编辑 `src/pages/about.md`（关于页面）。
4. 在 `src/content/posts/` 中写文章（`.md` 或 `.mdx`），字段说明见上方 *Writing posts*。示例文章可直接删除。

**部署**：Netlify、Vercel 直接导入仓库即可；Cloudflare Pages 选择 Astro 预设，并设置环境变量 `NODE_VERSION=22`。
