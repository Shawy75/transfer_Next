// Builds the Pagefind search index after `astro build`.
// Pagefind normally splits the index by page language, which hides Chinese posts from an
// English search page (and vice versa). If any page is Chinese, index everything as one
// Chinese-segmented language so mixed sites search across all posts; English-only sites
// keep English stemming.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import * as pagefind from 'pagefind';

const dist = 'dist';
const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) htmlFiles.push(path);
  }
};
walk(dist);

const hasChinese = htmlFiles.some((f) => /<html[^>]*\slang="zh/i.test(readFileSync(f, 'utf8').slice(0, 500)));
const { index, errors } = await pagefind.createIndex(hasChinese ? { forceLanguage: 'zh-cn' } : {});
if (!index) throw new Error(`Pagefind failed: ${errors.join(', ')}`);

const { page_count: pages, errors: addErrors } = await index.addDirectory({ path: dist });
if (addErrors.length) throw new Error(`Pagefind failed: ${addErrors.join(', ')}`);
await index.writeFiles({ outputPath: join(dist, 'pagefind') });
await pagefind.close();

console.log(`Search index built from ${pages} pages${hasChinese ? ' (Chinese word segmentation on)' : ''}.`);
