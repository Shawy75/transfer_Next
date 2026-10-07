# Sumi — a minimal blog theme for Astro

Sumi (墨, "ink") is a calm blog theme for [Astro](https://astro.build): rice-paper tones,
a game-style **item bar** on the home page built from your real content, black-and-white
item icons, an ink-in-water hover on post titles, and typography that works equally well
for English and Chinese.

[中文说明见下方](#中文说明)

## Features

- **Fast and static** — zero client-side framework; a few kilobytes of vanilla JS for small interactions.
- **Light and dark mode** — follows the OS by default, remembers the reader's choice, no flash on load.
- **Item bar** — ten slots for the blog's sections. Post, year, category, tag and code-block counts
  and reading-time buckets are computed from your posts at build time; hover a slot for its card,
  click to open it.
- **Ten black-and-white item icons** with four rarity fills (blank, dots, hatching, solid ink).
- **Ink-in-water title hover** in your accent colour.
- **Table of contents** beside each post with scroll-spy, plus a collapsible inline TOC on narrow screens.
- **Self-hosted fonts** (Source Serif 4, Source Sans 3, IBM Plex Mono) — no Google requests.
- **Home page pagination**, pinned posts, drafts.
- **Archives** (year timeline), **categories**, and a **tag cloud**.
- **Full-text search** powered by [Pagefind](https://pagefind.app) — no external service, and Chinese posts are word-segmented so mixed-language blogs search correctly.
- **Code highlighting** with Shiki (dual light/dark themes), copy buttons and language labels.
- **Math** with KaTeX, rendered at build time.
- **SEO** — canonical URLs, Open Graph and Twitter cards, JSON-LD, sitemap, robots.txt, RSS.
- **Markdown and MDX** posts with type-checked frontmatter.
- **English and Chinese UI** out of the box; add more languages in one file.
- **Accessible** — passes an axe-core WCAG 2 AA audit in light and dark mode; keyboard navigation, skip link, reduced-motion support.
- **Deploys anywhere** — domain root or a sub-path (GitHub Pages project sites) with one setting.
- **One config file** — `src/site.config.ts`.

## Quick start

Requires **Node.js 22.12+** (`node -v` to check; `nvm install` uses the bundled `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command                     | What it does                                                         |
| --------------------------- | -------------------------------------------------------------------- |
| `npm run dev`               | Start the dev server with live reload.                               |
| `npm run new -- "My Title"` | Create a new draft post with frontmatter filled in.                  |
| `npm run build`             | Type-check, build the site into `dist/`, and build the search index. |
| `npm run preview`           | Serve the production build locally (search works here).              |
| `npm run og`                | Regenerate the default share image from your title and subtitle.     |
| `npm run check`             | Type-check only.                                                     |

## Configuration

Open `src/site.config.ts`. Every option is commented. The ones to change first:

| Option          | Description                                               |
| --------------- | --------------------------------------------------------- |
| `url`           | Your final domain, e.g. `https://example.com`.            |
| `base`          | `'/'`, or `'/repo-name'` for a GitHub Pages project site. |
| `title`, `subtitle`, `description` | Site name and summary.                 |
| `locale`        | `'en'` or `'zh-CN'`.                                      |
| `author`        | Name, avatar path and a one-line bio.                     |
| `accent`        | Accent colour for light and dark mode.                    |
| `intro`, `seal` | Home page introduction and the text on the red seal.      |
| `nav`, `social` | Menu (with item icons) and footer social links.           |
| `categoryIcons` | Item icon and rarity for each category.                   |
| `postsPerPage`  | Posts per home page.                                      |
| `postLicense`   | Licence notice under each post, or `false` to hide it.    |
| `showThemeCredit` | The "Powered by Astro · Theme Sumi" footer line.       |

Then replace the images in `public/`:

- `avatar.svg` — your avatar (any format; update `author.avatar` if you change the file name).
- `favicon.svg` — the browser tab icon.
- `og-default.png` — the default social share image. Run `npm run og` to
  regenerate it from your title and subtitle, or drop in your own 1200×630 image.

Finally edit `src/pages/about.md`.

## Writing posts

Run `npm run new -- "My First Post"`, or add `.md` / `.mdx` files to `src/content/posts/` yourself.
The file name is the URL slug.

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
lang: zh-CN       # optional; detected automatically for Chinese posts
---
```

Links and images that start with `/` are adjusted for `base` automatically, so
`[see this post](/posts/other-post/)` keeps working on a sub-path deployment.

The sample posts in `src/content/posts/` demonstrate every feature — delete them when you are ready.

## Customising

- **Colours** — CSS variables at the top of `src/styles/global.css`.
- **Code theme** — `shikiConfig.themes` in `astro.config.mjs` (any [Shiki theme](https://shiki.style/themes)).
- **Markdown plugins** — add remark/rehype plugins to `unified({...})` in `astro.config.mjs`.
- **UI text / new languages** — `src/i18n.ts`.
- **Item icons** — `src/components/item-icons.ts` (rules in the sample post *Designing the Item Bar*).
- **Line icons** (footer, post meta) — `src/components/icons.ts`.

## Deploying

`npm run build` writes a fully static site to `dist/`.

- **Netlify** — import the repository; `netlify.toml` is already set up.
- **Vercel** — import the repository; the Astro preset is detected automatically.
- **Cloudflare Pages** — framework preset *Astro*, build command `npm run build`, output `dist`,
  and set the environment variable `NODE_VERSION=22`.
- **GitHub Pages** — use the official [Astro GitHub Pages action](https://docs.astro.build/en/guides/deploy/github/).
  For a project site (`https://user.github.io/my-blog/`) set `base: '/my-blog'` in `site.config.ts`.

Remember to set `url` in `site.config.ts` to your real domain before deploying.

## Project structure

```
public/                 static files (avatar, favicon, share image)
scripts/               share-image generator, new-post helper, search indexer
src/
  site.config.ts        ← your settings
  i18n.ts               UI strings
  content.config.ts     post frontmatter schema
  content/posts/        your posts
  components/           UI pieces (Masthead, Nav, ItemBar, PostRow, TOC…)
  components/item-icons.ts  the item icon set — add your own here
  layouts/              page shells
  pages/                routes (home, posts, archives, categories, tags, search, RSS)
  styles/global.css     colours, typography, prose styles
  utils/                post helpers, date formatting
```

---

## 中文说明

Sumi 是一个水墨风格的 Astro 博客主题：首页有一排游戏道具风格的**道具栏**（10 格），文章数、分类、标签、阅读时长、代码块数量都从你的文章自动统计；配一套黑白道具图标、标题悬停时的「墨入水」效果，支持暗色模式、站内搜索、代码高亮、数学公式，中英文界面开箱即用。

**环境要求**：Node.js 22.12 及以上。

```bash
npm install
npm run dev        # 打开 http://localhost:4321
npm run new -- "文章标题"   # 新建一篇草稿
npm run build      # 构建到 dist/ 并生成搜索索引
npm run preview    # 本地预览构建结果（搜索功能在这里可用）
```

**改成你自己的站点**

1. 编辑 `src/site.config.ts`：站点地址 `url`、标题、作者信息、导航、社交链接；把 `locale` 改成 `'zh-CN'` 即可切换为中文界面。
2. 替换 `public/` 下的头像 `avatar.svg`、网站图标 `favicon.svg`；运行 `npm run og` 重新生成分享图。
3. 编辑 `src/pages/about.md`（关于页面）。
4. 在 `src/content/posts/` 中写文章（`.md` 或 `.mdx`），字段说明见上方 *Writing posts*。示例文章可直接删除。

**搜索**：中文文章会自动识别并按中文分词，中英文混合的博客也能正常搜索。

**部署**：Netlify、Vercel 直接导入仓库即可；Cloudflare Pages 选择 Astro 预设，并设置环境变量 `NODE_VERSION=22`。部署到 GitHub Pages 项目页（`https://用户名.github.io/仓库名/`）时，在 `site.config.ts` 里把 `base` 设为 `'/仓库名'`。
