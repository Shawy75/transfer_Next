---
title: Code Highlighting
description: Syntax highlighting that follows light and dark mode, with copy buttons and language labels.
date: 2026-09-10
category: Reference
tags: [Code, Astro, Shiki]
---

Code blocks are highlighted at build time by [Shiki](https://shiki.style), so readers
download no extra JavaScript for colours. Every block switches between a light and a dark
palette along with the rest of the site. Hover over a block to copy it.

## TypeScript

```ts
interface Post {
  title: string;
  date: Date;
  tags: string[];
}

export function latest(posts: Post[], count = 5): Post[] {
  return [...posts].sort((a, b) => b.date.valueOf() - a.date.valueOf()).slice(0, count);
}
```

## Python

```python
from collections import Counter

def top_tags(posts, n=10):
    """Return the n most common tags across all posts."""
    counts = Counter(tag for post in posts for tag in post["tags"])
    return counts.most_common(n)
```

## Shell

```bash
npm run build && npx serve dist
```

## CSS

```css
:root {
  --accent: #b8372b;
}

a:hover {
  color: var(--accent);
}
```

## Long lines

Long lines scroll horizontally rather than wrapping, so indentation stays readable:

```js
const message = 'This line is deliberately long so you can see how horizontal scrolling behaves inside a code block on narrow screens.';
```

## Changing the colours

Pick any [Shiki theme](https://shiki.style/themes) in `astro.config.mjs`:

```js
shikiConfig: {
  themes: { light: 'github-light', dark: 'github-dark' },
},
```
