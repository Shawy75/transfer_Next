/**
 * Prefixes a site-relative path with the configured `base`, so the site works when
 * deployed to a sub-path such as https://user.github.io/blog/. External URLs pass through.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) return path;
  return `${BASE}${path}`;
}
