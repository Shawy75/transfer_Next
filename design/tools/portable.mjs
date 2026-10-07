// Copies an Astro dist/ into <out>/site/ with every root-absolute link made relative
// and directory links pointing at index.html, so the site works from any sub-folder host.
import { cpSync, readdirSync, readFileSync, writeFileSync, statSync, rmSync, mkdirSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
const [dist, out] = process.argv.slice(2);
const site = join(out, 'site');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(dist, site, { recursive: true });
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(site);
// KaTeX lists woff2 first; the older formats are never fetched by current browsers.
for (const f of files) if (/\.(ttf|woff)$/.test(f)) rmSync(f);

const toRel = (fromFile, url) => {
  const [path, hash = ''] = url.split('#');
  let target = path.replace(/^\//, '');
  if (target === '' || target.endsWith('/')) target += 'index.html';
  const rel = posix.relative(dirname(relative(site, fromFile)).split('\\').join('/') || '.', target) || 'index.html';
  return rel + (hash ? '#' + hash : '');
};
// Navigations to a directory URL created at runtime (search results) get index.html appended.
const fixer = `<script>document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var u=new URL(a.href,location.href);if(u.origin===location.origin&&/\\/$/.test(u.pathname)&&!a.target){e.preventDefault();location.href=u.pathname+'index.html'+u.search+u.hash;}},true);</script>`;
for (const f of files.filter((f) => /\.(html|css)$/.test(f))) {
  let s = readFileSync(f, 'utf8');
  if (f.endsWith('.html')) {
    s = s.replace(/(\s(?:href|src)=")(\/(?!\/)[^"]*)"/g, (_, a, u) => `${a}${toRel(f, u)}"`);
    s = s.replace(/data-base="\/"/g, () => `data-base="${posix.relative(dirname(relative(site, f)), '.') || '.'}/"`);
    s = s.replace('</head>', fixer + '</head>');
  } else {
    s = s.replace(/url\((["']?)\/(?!\/)([^)"']+)\1\)/g, (_, q, u) => `url(${q}${toRel(f, '/' + u)}${q})`);
  }
  writeFileSync(f, s);
}
// Hosts that only serve standard web types: give Pagefind's binary files served extensions.
const SUFFIX = { pf_meta: '.wasm', pf_index: '.wasm', pf_fragment: '.wasm', pagefind: '.wasm' };
const all = [];
const walk2 = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk2(p) : all.push(p); });
walk2(join(site, 'pagefind'));
for (const f of all) {
  const ext = f.split('.').pop();
  if (SUFFIX[ext]) cpSync(f, f + SUFFIX[ext]), rmSync(f);
  if (/pagefind(-worker)?\.js$/.test(f)) {
    let s = readFileSync(f, 'utf8');
    for (const [ext, add] of Object.entries(SUFFIX)) s = s.split(`.${ext}\``).join(`.${ext}${add}\``);
    writeFileSync(f, s);
  }
}
console.log('done');
