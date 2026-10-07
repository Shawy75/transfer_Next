/**
 * Small rehype plugin applied to every Markdown/MDX post:
 * - makes horizontally scrollable blocks (tables, display math) keyboard-focusable;
 * - prefixes site-relative links and images with the configured `base` path.
 * @param {{ base?: string }} [options]
 */
export default function rehypeSumi(options = {}) {
  const prefix = (options.base ?? '/').replace(/\/$/, '');
  const needsBase = (url) =>
    prefix && typeof url === 'string' && url.startsWith('/') && !url.startsWith('//') && url !== prefix && !url.startsWith(`${prefix}/`);

  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element') {
        const props = (node.properties ??= {});
        const classes = Array.isArray(props.className) ? props.className : [];
        if (node.tagName === 'table' || classes.includes('katex-display')) props.tabIndex = 0;
        if (node.tagName === 'a' && needsBase(props.href)) props.href = prefix + props.href;
        if (node.tagName === 'img' && needsBase(props.src)) props.src = prefix + props.src;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
