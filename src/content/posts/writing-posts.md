---
title: Writing Posts
description: Every frontmatter field Sumi understands, plus drafts, pinned posts, and per-post share images.
date: 2026-09-24
updated: 2026-10-02
category: Guide
tags: [Sumi, Markdown, Writing]
---

Posts are Markdown (`.md`) or MDX (`.mdx`) files in `src/content/posts/`. You can organise
them into sub-folders; the folder becomes part of the URL.

## Frontmatter reference

| Field         | Required | Description                                                     |
| ------------- | -------- | --------------------------------------------------------------- |
| `title`       | yes      | Post title.                                                     |
| `date`        | yes      | Publish date, e.g. `2026-10-01`.                                |
| `description` | no       | Summary for the home page, search engines and social cards.     |
| `updated`     | no       | Last-updated date, shown on the post page.                      |
| `category`    | no       | A single category.                                              |
| `tags`        | no       | A list of tags.                                                 |
| `draft`       | no       | `true` hides the post from production builds.                   |
| `pinned`      | no       | `true` keeps the post at the top of the home page.              |
| `image`       | no       | Social share image: a relative path to a local image, or a URL. |
| `toc`         | no       | `false` hides the table of contents for this post.              |

If you leave out `description`, Sumi uses the first 160 characters of the post instead.

## Drafts

Set `draft: true` while you work. Drafts appear in `npm run dev` with a small *draft*
badge so you can preview them, but are left out of `npm run build`, the RSS feed, and the
sitemap.

## Pinned posts

`pinned: true` lifts a post above everything else on the home page — handy for a welcome
post or an announcement. The rest of the list stays in date order.

## Share images

Each post can set its own social card:

```yaml
image: ./cover.png          # an image next to the post file
image: https://…/cover.jpg  # or any absolute URL
```

Without one, the site-wide `ogImage` from `site.config.ts` is used.

## Table of contents

Headings from `##` to `###` appear in the sidebar's **Contents** tab, and the entry for the
section you are reading is highlighted as you scroll. Change the depth with `toc.minDepth`
and `toc.maxDepth` in the config, or turn the TOC off entirely with `toc.enable: false`.

### On small screens

Phones and tablets get a collapsible contents block at the top of the post instead.
