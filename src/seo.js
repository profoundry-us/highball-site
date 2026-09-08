/*
 * Single source of truth for per-route SEO metadata.
 * Used by useSeo (client-side navigation) and scripts/prerender.mjs
 * (build-time static HTML generation).
 */

// TODO: confirm the production hostname before the first deploy — this
// feeds every canonical URL, og:url, the sitemap and robots.txt.
export const SITE_URL = 'https://highball.profoundry.us';

export const ROUTE_META = {
  '/': {
    title: 'Highball — Local CI for AI Coding Agents',
    description:
      "Highball runs your repo's own checks after every agent edit and the full checks at turn end. A failure blocks the agent and hands it the output. One YAML file, no account, no server.",
    path: '/',
  },
  '/404': {
    title: 'Page Not Found — Highball',
    description: 'The page you were looking for could not be found.',
    noindex: true,
  },
};
