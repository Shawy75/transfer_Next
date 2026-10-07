/**
 * Sumi — site configuration.
 *
 * This is the only file you need to edit to make the theme your own.
 * Every option is documented inline; see README.md for a full walkthrough.
 */
import type { IconName } from './components/icons';
import type { ItemIconName, Tier } from './components/item-icons';
import type { Locale } from './i18n';

export interface NavItem {
  text: string;
  href: string;
  /** Item icon shown next to the label. See src/components/item-icons.ts. */
  icon?: ItemIconName;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: IconName;
}

export interface SiteConfig {
  /** Final deployed URL, without a trailing slash. Used for canonical URLs, RSS and the sitemap. */
  url: string;
  /**
   * Sub-path the site is served from. Keep '/' for a site at the domain root.
   * For a GitHub Pages project site (https://user.github.io/my-blog/) use '/my-blog'.
   */
  base: string;
  title: string;
  /** Short line under the title, shown in small capitals. */
  subtitle: string;
  /** One or two sentences introducing the blog, shown under the title on the home page. */
  intro: string;
  /** Up to four characters printed on the red seal above the title, e.g. 'SUMI' or '墨迹'. */
  seal: string;
  /** Default meta description for pages that don't provide their own. */
  description: string;
  /** UI language. Built-in: 'en', 'zh-CN'. Add more in src/i18n.ts. */
  locale: Locale;
  author: {
    name: string;
    /** Path under /public or an absolute URL. */
    avatar: string;
    bio: string;
  };
  /** Accent colour used for links, buttons and highlights. Any CSS colour. */
  accent: { light: string; dark: string };
  /** Default colour scheme for first-time visitors. 'auto' follows the OS setting. */
  defaultTheme: 'auto' | 'light' | 'dark';
  /** Number of posts on each page of the home page. */
  postsPerPage: number;
  nav: NavItem[];
  social: SocialLink[];
  /**
   * Item icon (and rarity fill) for each category, used in post lists.
   * Categories not listed here use `default`.
   */
  categoryIcons: Record<string, { icon: ItemIconName; tier: Tier }> & { default: { icon: ItemIconName; tier: Tier } };
  toc: {
    enable: boolean;
    /** Smallest heading level included (2 = h2). */
    minDepth: number;
    /** Largest heading level included. */
    maxDepth: number;
  };
  /** Default social share image (1200×630 PNG or JPG). Posts can override with `image:` in frontmatter. */
  ogImage: string;
  /** Optional Twitter / X handle, e.g. '@sumi'. */
  twitterHandle?: string;
  /** Year shown in the footer copyright line. */
  since: number;
  /** License notice appended to each post. Set to false to hide it. */
  postLicense: { name: string; url: string } | false;
  /** Show the small "Powered by Astro · Theme Sumi" line in the footer. */
  showThemeCredit: boolean;
}

export const SITE: SiteConfig = {
  url: 'https://sumi-demo.example.com',
  base: '/',
  title: 'Sumi',
  subtitle: 'Ink · Cloud · Notes',
  intro: 'Notes on front-end craft, small tools, and the occasional landscape sketch. Updated slowly, written carefully.',
  seal: 'SUMI',
  description: 'A clean, minimal blog built with the Sumi theme for Astro.',
  locale: 'en',
  author: {
    name: 'Ada Ink',
    avatar: '/avatar.svg',
    bio: 'Writer, developer, and collector of small ideas.',
  },
  accent: { light: '#b3261e', dark: '#e66a5e' },
  defaultTheme: 'auto',
  postsPerPage: 6,
  nav: [
    { text: 'Posts', href: '/', icon: 'scroll' },
    { text: 'Archives', href: '/archives/', icon: 'chest' },
    { text: 'Categories', href: '/categories/', icon: 'pouch' },
    { text: 'Tags', href: '/tags/', icon: 'tag' },
    { text: 'About', href: '/about/', icon: 'brush' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { name: 'X', href: 'https://x.com/', icon: 'x' },
    { name: 'Email', href: 'mailto:hello@example.com', icon: 'mail' },
    { name: 'RSS', href: '/rss.xml', icon: 'rss' },
  ],
  categoryIcons: {
    Guide: { icon: 'scroll', tier: 0 },
    Reference: { icon: 'ore', tier: 2 },
    Design: { icon: 'brush', tier: 2 },
    设计: { icon: 'brush', tier: 1 },
    Essays: { icon: 'pouch', tier: 1 },
    default: { icon: 'scroll', tier: 0 },
  },
  toc: { enable: true, minDepth: 2, maxDepth: 3 },
  ogImage: '/og-default.png',
  since: 2025,
  postLicense: {
    name: 'CC BY-NC-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  showThemeCredit: true,
};
