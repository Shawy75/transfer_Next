---
title: Markdown Style Guide
description: A tour of every element Sumi styles — headings, lists, quotes, tables, footnotes and more.
date: 2026-09-18
category: Reference
tags: [Markdown, Typography]
---

This post shows how common Markdown renders in Sumi. Use it as a reference while writing,
or as a quick check after customising the styles.

## Headings

Use `##` for sections and `###` for sub-sections. Each heading gets an anchor link — hover
over one to see the `#`.

### A third-level heading

#### A fourth-level heading

## Paragraphs and emphasis

Text can be **bold**, *italic*, ***both***, ~~struck through~~, or `inline code`.
Links look [like this](https://astro.build). Keyboard shortcuts use <kbd>Ctrl</kbd> +
<kbd>K</kbd>, and you can <mark>highlight</mark> a phrase with the `<mark>` element.

## Blockquotes

> Simplicity is not the goal. It is the by-product of a good idea and modest expectations.
>
> — Paul Rand

## Lists

1. Ordered lists number themselves.
2. They can nest:
   - Unordered items
   - Inside ordered ones
3. And continue afterwards.

- [x] Task lists work too
- [ ] Unchecked items stay open

## Tables

| Element    | Markdown            | Notes                         |
| ---------- | ------------------- | ----------------------------- |
| Bold       | `**text**`          | Use sparingly.                |
| Link       | `[text](url)`       | External links open in place. |
| Image      | `![alt](src)`       | Always write alt text.        |
| Footnote   | `[^1]`              | Collected at the end.         |

Wide tables scroll sideways on small screens instead of breaking the layout.

## Images

![An abstract ink circle with a red seal](/avatar.svg)

## Footnotes

Footnotes are useful for asides that would interrupt the flow.[^aside] They are gathered at
the bottom of the post with links back to where they were used.

[^aside]: Like this one.

## Horizontal rules

A rule marks a change of topic.

---

That's everything. Happy writing.
