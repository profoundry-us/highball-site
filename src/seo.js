/*
 * Single source of truth for per-route SEO metadata.
 * Used by useSeo (client-side navigation) and scripts/prerender.mjs
 * (build-time static HTML generation).
 */

// Production origin, no trailing slash. Feeds every canonical URL and og:url;
// public/robots.txt, public/sitemap.xml and nginx.conf carry it by hand.
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
