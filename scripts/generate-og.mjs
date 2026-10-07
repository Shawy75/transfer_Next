// Regenerates public/og-default.png from the site title and subtitle.
// Usage: node scripts/generate-og.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const config = await readFile(new URL('../src/site.config.ts', import.meta.url), 'utf8');
const pick = (key) => config.match(new RegExp(`\\n  ${key}: '([^']*)'`))?.[1] ?? '';
const escape = (s) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const title = escape(pick('title'));
const subtitle = escape(pick('subtitle'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f3f2ee"/>
  <rect x="60" y="60" width="1080" height="510" rx="16" fill="#ffffff" stroke="#e6e3dc" stroke-width="2"/>
  <rect x="60" y="60" width="16" height="510" rx="8" fill="#1d1c1a"/>
  <rect x="980" y="400" width="96" height="96" rx="10" fill="#b8372b" transform="rotate(8 1028 448)"/>
  <text x="140" y="300" font-family="Georgia, 'Noto Serif CJK SC', serif" font-size="96" font-weight="600" fill="#1d1c1a">${title}</text>
  <text x="142" y="380" font-family="Helvetica, Arial, 'Noto Sans CJK SC', sans-serif" font-size="38" fill="#8a867f">${subtitle}</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-default.png', import.meta.url).pathname);
console.log('Wrote public/og-default.png');
