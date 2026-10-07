import { SITE } from '@/site.config';

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString(SITE.locale, {
    year: 'numeric',
    month: style === 'long' ? 'long' : '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

/** Month and day only, used in the archive timeline. */
export function formatMonthDay(date: Date): string {
  return date.toLocaleDateString(SITE.locale, { month: '2-digit', day: '2-digit', timeZone: 'UTC' });
}
