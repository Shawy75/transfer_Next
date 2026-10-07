/**
 * Black-and-white "item" icons on a 48×48 grid, in the style of a game item box.
 * Rarity is shown by the fill instead of colour:
 *   0 Common (blank) · 1 Rare (dots) · 2 Epic (hatching) · 3 Legendary (solid ink)
 * The dot and hatch patterns live in InkDefs.astro, rendered once per page.
 */
export type Tier = 0 | 1 | 2 | 3;

const FILL = ['fl', 'fd', 'fh', 'fs'] as const;
const shadow = '<ellipse class="sh" cx="25" cy="44" rx="14" ry="2.6"/>';

export const itemIcons = {
  scroll: (t: Tier) => `${shadow}
    <rect class="o ${FILL[t]}" x="10" y="12" width="28" height="24"/>
    <path class="ln" d="M16 19h16M16 24h11M16 29h14"/>
    <rect class="o fs" x="6" y="7" width="36" height="7" rx="3.5"/>
    <rect class="o fs" x="6" y="34" width="36" height="7" rx="3.5"/>
    <path class="hi" d="M10 10h8"/>`,
  chest: (t: Tier) => `${shadow}
    <rect class="o ${FILL[t]}" x="7" y="21" width="34" height="19" rx="2"/>
    <path class="o fl" d="M7 22v-5c0-4 3.5-7 8-7h18c4.5 0 8 3 8 7v5z"/>
    <rect class="o fs" x="20.5" y="16" width="7" height="13" rx="1.5"/>
    <circle class="dot" cx="24" cy="23.5" r="1.6"/>
    <path class="hi" d="M12 14.5c1-1.6 2.4-2.3 4-2.3"/>`,
  pouch: (t: Tier) => `${shadow}
    <path class="o ${FILL[t]}" d="M18 11h12l-2.5 6c7 2.6 11.5 9 11.5 15.5C39 39 33 42 24 42S9 39 9 32.5C9 26 13.5 19.6 20.5 17z"/>
    <path class="o fs" d="M17.5 15.5h13" style="stroke-width:5"/>
    <circle class="o fs" cx="30" cy="20" r="2.4"/>
    <path class="ln" d="M30 22.5l2 6"/>`,
  tag: (t: Tier) => `${shadow}
    <path class="ln" d="M24 17L17 5M24 17l7-12"/>
    <path class="o ${FILL[t]}" d="M13 15h22v24a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3z"/>
    <circle class="o fs" cx="24" cy="20" r="2.6"/>
    <path class="ln" d="M19 28h10M19 33h7"/>`,
  brush: (t: Tier) => `${shadow}
    <g transform="rotate(-38 24 24)">
      <rect class="o ${FILL[t]}" x="20.5" y="2" width="7" height="27" rx="2"/>
      <rect class="o fs" x="19.5" y="28" width="9" height="4.5" rx="1"/>
      <path class="o fs" d="M19.5 32.5h9c0 6-2 10.5-4.5 14-2.5-3.5-4.5-8-4.5-14z"/>
      <path class="hi" d="M23 6v8"/>
    </g>`,
  spyglass: (t: Tier) => `${shadow}
    <g transform="rotate(-24 24 24)">
      <rect class="o fs" x="3" y="19" width="12" height="10" rx="1.5"/>
      <rect class="o fl" x="15" y="17" width="13" height="14" rx="1.5"/>
      <rect class="o ${FILL[t]}" x="28" y="14" width="16" height="20" rx="2.5"/>
      <path class="hi" d="M32 18h7"/>
    </g>`,
  potion: (t: Tier) => `${shadow}
    <path class="o ${FILL[t]}" d="M19.5 9h9v7.5c6.5 2.2 10.5 7.6 10.5 14.3C39 38 33.5 42 24 42S9 38 9 30.8c0-6.7 4-12.1 10.5-14.3z"/>
    <rect class="o fs" x="18" y="4" width="12" height="6.5" rx="1.5"/>
    <path class="${t === 3 ? 'hi' : 'ln'}" d="M14.5 29c.3-4.2 2.6-7.3 6-8.6" style="opacity:.9"/>`,
  ore: (t: Tier) => `${shadow}
    <path class="o ${FILL[t]}" d="M7 32l6.5-15L24 10l12.5 5L41 29l-8 12H15z"/>
    <path class="ln" d="M13.5 17L22 26l14.5-11M22 26l-3.5 15M22 26l19 3"/>
    <path class="o fl" d="M24 10l-2 16-8.5-9z"/>`,
  lantern: (t: Tier) => `${shadow}
    <path class="ln" d="M24 3v5"/>
    <rect class="o fs" x="17" y="7.5" width="14" height="5" rx="1.5"/>
    <ellipse class="o ${FILL[t]}" cx="24" cy="25.5" rx="13.5" ry="13"/>
    <path class="ln" d="M24 12.5v26M17.5 14c-3.6 6.6-3.6 16.4 0 23M30.5 14c3.6 6.6 3.6 16.4 0 23"/>
    <rect class="o fs" x="17" y="37.5" width="14" height="5" rx="1.5"/>
    <path class="ln" d="M24 42.5v4"/>`,
  horn: (t: Tier) => `${shadow}
    <path class="o ${FILL[t]}" d="M6 19.5c9 1 18-2 27-10.5l2.5 1V38L33 39c-9-8-18-10.5-27-9.5z"/>
    <ellipse class="o fl" cx="35" cy="24" rx="5.5" ry="14.5"/>
    <rect class="o fs" x="3" y="18" width="6" height="13" rx="2"/>
    <path class="ln" d="M15 21v6.5M21 19.5v9"/>`,
} satisfies Record<string, (t: Tier) => string>;

export type ItemIconName = keyof typeof itemIcons;

export function itemIconSvg(name: ItemIconName, tier: Tier = 0, className = ''): string {
  return `<svg class="item-icon ${className}" viewBox="0 0 48 48" aria-hidden="true">${itemIcons[name](tier)}</svg>`;
}
