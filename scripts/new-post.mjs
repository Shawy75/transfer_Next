// Creates a new post with frontmatter filled in.
// Usage: npm run new -- "My Post Title"
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My Post Title"');
  process.exit(1);
}

// Latin titles become kebab-case; other scripts (e.g. Chinese) fall back to a date-based name.
const slug =
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `post-${Date.now().toString(36)}`;

const dir = new URL('../src/content/posts/', import.meta.url);
const file = new URL(`${slug}.md`, dir);
if (existsSync(file)) {
  console.error(`src/content/posts/${slug}.md already exists.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
mkdirSync(dir, { recursive: true });
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: ""
date: ${today}
category: ""
tags: []
draft: true
---

Start writing here.
`,
);
console.log(`Created src/content/posts/${slug}.md (draft: true — set it to false to publish).`);
