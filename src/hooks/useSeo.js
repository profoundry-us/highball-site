import { useEffect } from 'react';
import { SITE_URL } from '../seo.js';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/*
 * Per-route SEO: title, description, canonical, and Open Graph tags.
 * The static defaults for the homepage live in index.html; this keeps
 * them in sync as the router navigates. Pages call useSeo(ROUTE_META['/path']).
 */
export default function useSeo({ title, description, path, noindex = false }) {
  useEffect(() => {
    document.title = title;
    upsertMeta('property', 'og:title', title);

    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
    }

    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    upsertMeta('property', 'og:url', url);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex');
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, path, noindex]);
}
