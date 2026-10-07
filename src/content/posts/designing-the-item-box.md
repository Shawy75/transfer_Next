---
title: Designing the Item Box
description: How Sumi turns a blog's sections into a game-style item box, and the rules that keep ten black-and-white icons readable without a single colour.
date: 2026-10-02
category: Design
tags: [Design, Sumi, Icons]
---

Most blog themes open with a hero image and a list of posts. Sumi opens with an item box.
Every section of the site is an item you can pick up: the articles are a scroll, the
archive is a chest, tags are small wooden tags, search is a spyglass. Each slot shows how
many you own, and hovering one shows its card. This post explains why it works that way and
the rules behind the icons, so you can extend the set without breaking it.

## Why an item box

A blog's home page has two jobs. It has to show what is new, and it has to show what is
there. The first job is easy; a list of recent posts does it. The second job usually ends
up in a sidebar full of counters and tag clouds that nobody reads.

An item box does the second job in a form people already know how to read. Anyone who has
played a game with an inventory understands a grid of slots with a number in the corner.
They know that hovering a slot shows a description, that rarer things look different, and
that a full box means a well-stocked player. The metaphor carries the information with
very little explanation.

It also changes the tone. A grid of potions and scrolls says that the person behind the
blog enjoys what they do. That matters more than it sounds: the first impression of a
personal site is mostly about the person.

## Every number is real

The item box would be a gimmick if the numbers were decoration. They are not. Each count
is computed from your posts when the site is built:

- **Articles** counts published posts and totals their words.
- **Archive** counts the years you have been writing and finds your busiest one.
- **Categories** and **Tags** count distinct terms and show the most used.
- **Quick Read**, **Long Read** and **Deep Read** sort posts by reading time: under five
  minutes, five to fifteen, and over fifteen.
- **Code Ore** counts fenced code blocks across every post.

Nothing needs to be maintained by hand. Write a post and the box updates on the next
build. Each card ends with a link to the matching page, and the three potions and the ore
open their own lists, so the box doubles as navigation.

## Rarity without colour

Games usually show rarity with colour: grey for common, blue for rare, purple for epic,
orange for legendary. Sumi is an ink theme, so colour was not available. The icons had to
say the same thing in black and white.

The answer was to borrow from printmaking. Each icon has one main shape, and that shape
gets one of four fills:

| Rarity    | Fill          | Reads as                          |
| --------- | ------------- | --------------------------------- |
| Common    | Blank paper   | Light, everyday, plentiful        |
| Rare      | Dots          | Slightly denser, worth a look     |
| Epic      | Hatching      | Clearly marked, a little special  |
| Legendary | Solid ink     | Heavy, deliberate, the real thing |

The order follows how much ink each fill uses. Your eye already ranks darker as weightier,
so the ranking needs no legend. Look at the three potions side by side: the quick read is
an empty bottle, the long read is speckled, and the deep read is filled with ink. You can
tell which one is the serious commitment before you read a word.

## The rules for every icon

Ten icons is a small set, but small sets fall apart quickly if each one is drawn
differently. These are the rules every Sumi icon follows.

### One grid, one weight

Every icon sits on a 48 by 48 grid with about three units of padding. Outlines are 2.4
units wide with rounded joins, and inner details are 2 units. When the icons shrink to 22
pixels in the navigation bar, those weights still hold up; any thinner and the hatching
turns to mush.

### One silhouette

An icon should be recognisable as a solid black blob. If you fill the shape completely and
it still reads as a bottle or a chest, the silhouette is doing its job. Details like the
lines on the scroll or the lock on the chest are there for flavour, not for recognition.

### One fill, one accent

Each icon has a single main shape that carries the rarity fill. Everything else is either
solid ink (caps, bands, handles) or blank paper. Mixing two patterned fills in one icon
makes it impossible to read the rarity at a glance, so it is never done.

### A highlight and a shadow

A short light stroke near the top left suggests a shine, and a soft ellipse under each icon
grounds it on the shelf. Both are subtle. Together they are what makes the icons look like
objects in a box rather than symbols on a page.

## Light and dark

All of the icon colours come from the page palette. On paper, outlines are ink and fills
are a warm off-white. In dark mode the palette flips: outlines become pale and the solid
legendary fill becomes the brightest thing in the box. The ranking survives the flip,
because legendary items are still the ones with the most "ink", even when that ink is
light.

The dot and hatch patterns are defined once per page and reference the same colour
tokens, so switching schemes updates every icon at once without any extra code.

## Ink in water

Hover a post title on the home page and a drop of cinnabar ink lands at the start of the
line, then drifts to the right like ink spreading through water. It is built from a few
soft radial gradients pushed around by an SVG turbulence filter, revealed from left to
right with a mask. The colour comes from the accent setting, so it matches the seal above
the site title.

Two details keep it from looking cheap. The ink layer is much larger than the title, so
the drifting wisps never hit a hard edge and get clipped. And the shapes are blurred both
before and after they are distorted, which keeps the edges soft instead of spiky.

## Adding your own items

Icons live in `src/components/item-icons.ts`. Each one is a small function that takes a
rarity tier and returns SVG markup on the 48 by 48 grid. To add one, copy an existing icon,
change the shapes, and keep to the rules above: one silhouette, one filled main shape, ink
for the solid parts, a highlight and a shadow.

Categories can use any icon. In `site.config.ts`, map a category name to an icon and a
tier, and every post in that category shows it on the home page and the categories page:

```ts
categoryIcons: {
  Guide: { icon: 'scroll', tier: 0 },
  Reference: { icon: 'ore', tier: 2 },
  default: { icon: 'scroll', tier: 0 },
},
```

## What it is not

The item box is not a game. There are no points, no streaks, and nothing to collect for
its own sake. It is a table of contents dressed as an inventory, and every slot leads
somewhere useful. If a section of your site is not worth a slot, leave it out of the box.
A half-empty inventory that is honest beats a full one stuffed with filler.
