# Design tools

Helper scripts used during development. They are not part of the theme build.

- `portable.mjs` — copies `dist/` into `<out>/site/` with every root-absolute link made
  relative (and directory links pointing at `index.html`), and renames Pagefind's binary
  files to `.wasm`. Used to host the demo as a claude.ai Artifact.
  `node design/tools/portable.mjs dist /tmp/demo`
- `linkcheck.mjs` — checks that every internal `href`/`src` in a built site resolves to a file.
  `node design/tools/linkcheck.mjs dist /` (second argument is the `base` path, e.g. `/blog/`).
