---
title: Light, Dark, and Everything Between
description: How Sumi picks a colour scheme, remembers the reader's choice, and lets you change the accent colour.
date: 2026-08-14
category: Design
tags: [Design, Dark Mode, CSS]
---

Sumi ships with a warm paper-white light scheme and a soft charcoal dark scheme. The
moon/sun button in the header switches between them.

## How the scheme is chosen

1. If the reader has pressed the toggle before, their choice is remembered.
2. Otherwise `defaultTheme` in `site.config.ts` decides: `'auto'` follows the operating
   system, while `'light'` or `'dark'` force one scheme.

The choice is applied by a tiny inline script before the page paints, so there is no
flash of the wrong colours.

## Changing the accent colour

The accent is used for links, the ink that spreads under post titles, and the
red "seal" in the logo. Set a different colour for each scheme:

```ts
accent: { light: '#2563eb', dark: '#60a5fa' },
```

Pick a dark-mode accent that is a little lighter than the light-mode one so it keeps
enough contrast against the dark background.

## Going further

All colours are CSS custom properties at the top of `src/styles/global.css`. Change
`--bg`, `--surface` and `--text` to create a completely different mood without touching
any component.
