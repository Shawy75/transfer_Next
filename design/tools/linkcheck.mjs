// Checks every internal href/src in dist resolves to a built file. Usage: node linkcheck.mjs <dist> [base]
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
const [dist, base = '/'] = process.argv.slice(2);
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(dist);
const bad = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"#?]*)[^"]*"/g)) {
    let u = m[1];
    if (!u || /^(https?:|mailto:|data:|\/\/)/.test(u)) continue;
    if (!u.startsWith('/')) continue;
    if (!u.startsWith(base)) { bad.set(`${u}  (missing base, in ${f.slice(dist.length)})`, 1); continue; }
    let p = decodeURIComponent(u.slice(base.length - 1));
    const target = join(dist, p);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok && !existsSync(target + '.html')) bad.set(`${u}  (in ${f.slice(dist.length)})`, 1);
  }
}
console.log(`${files.length} pages checked; ${bad.size} broken`);
[...bad.keys()].slice(0, 30).forEach((b) => console.log('  ' + b));
