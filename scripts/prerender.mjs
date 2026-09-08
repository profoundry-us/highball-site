/*
 * Build-time prerendering: renders every route to static HTML with the
 * correct head tags, so crawlers get full content without JavaScript.
 * Runs after the client + SSR builds (see the "build" script) — plain
 * ReactDOM renderToString, no headless browser required.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { render, ROUTE_META, SITE_URL } = await import(
  path.join(root, 'dist-ssr/entry-server.js')
);

const template = readFileSync(path.join(root, 'dist/index.html'), 'utf8');

const replaceTag = (html, pattern, replacement) =>
  html.replace(pattern, () => replacement);

for (const [route, meta] of Object.entries(ROUTE_META)) {
  const is404 = route === '/404';
  const appHtml = render(is404 ? '/__not_found__' : route);
  const canonical = SITE_URL + (meta.path ?? route);

  let html = replaceTag(template, '<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${meta.description}"`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${meta.title}"`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${meta.description}"`
  );

  if (is404) {
    // No canonical for the 404 page, and keep it out of the index
    html = replaceTag(html, /\s*<link rel="canonical" href="[^"]*" \/>/, '');
    html = replaceTag(html, /\s*<meta property="og:url" content="[^"]*" \/>/, '');
    html = replaceTag(html, '</head>', '  <meta name="robots" content="noindex" />\n  </head>');
  } else {
    html = replaceTag(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
    html = replaceTag(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`);
  }

  // Flat files (dist/about.html) so nginx serves /about directly,
  // without the trailing-slash 301 that directories would cause.
  const outFile = is404
    ? path.join(root, 'dist/404.html')
    : route === '/'
      ? path.join(root, 'dist/index.html')
      : path.join(root, `dist${route}.html`);
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`prerendered ${route} -> ${path.relative(root, outFile)}`);
}

rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('cleaned dist-ssr');
