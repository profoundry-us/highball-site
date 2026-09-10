import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import { SiNpm } from 'react-icons/si';
import ThemeToggle from './ThemeToggle.jsx';

export const GITHUB = 'https://github.com/profoundry-us/highball';
export const NPM = 'https://www.npmjs.com/package/@profoundry-us/highball';
export const ONBOARDING = 'https://github.com/profoundry-us/highball/blob/main/ONBOARDING.md';
export const RELEASES = 'https://github.com/profoundry-us/highball/releases';
export const REGISTRY = 'https://registry.npmjs.org/@profoundry-us/highball/latest';

// The version as of the last site build (vite.config.js). It is what the
// prerendered HTML says, and what the navbar starts from.
export const VERSION = __HIGHBALL_VERSION__;

// Then the navbar asks the registry for the current one, so a release
// shows here without a site deploy — the package repo never has to know
// this site exists. The registry allows the cross-origin read and the
// document is a few kilobytes. Any failure leaves the build-time value.
function useLatestVersion() {
  const [version, setVersion] = useState(VERSION);
  useEffect(() => {
    const controller = new AbortController();
    fetch(REGISTRY, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((pkg) => {
        if (typeof pkg?.version === 'string') setVersion(pkg.version);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return version;
}

// Every off-site link opens in a new tab; the homepage stays put.
export const EXT = { target: '_blank', rel: 'noopener noreferrer' };

export function Mark({ className = 'size-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h12l-1.2 17.2A1 1 0 0 1 15.8 21H8.2a1 1 0 0 1-1-.8L6 3z" />
      {/* the liquid: one S-wave across the glass, well above the ice */}
      <path d="M6.6 9.6c1.8-1.7 3.7-1.7 5.5 0s3.7 1.7 5.4 0" />
      {/* ice: thinner stroke so the squares read as squares, tilted so they float */}
      <g strokeWidth="1.25">
        <rect x="9" y="13.4" width="3.3" height="3.3" rx="0.5" transform="rotate(-14 10.65 15.05)" />
        <rect x="12.9" y="15.3" width="2.9" height="2.9" rx="0.5" transform="rotate(17 14.35 16.75)" />
      </g>
    </svg>
  );
}

export default function Navbar() {
  const version = useLatestVersion();
  return (
    <header className="relative z-10">
      <nav className="mx-auto max-w-[1180px] px-5 md:px-8 h-[72px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 text-base-content" aria-label="Highball home">
            <Mark />
            <span className="heading text-xl font-bold tracking-tight">Highball</span>
          </Link>
          <a
            href={RELEASES}
            {...EXT}
            className="font-mono text-xs text-base-content/60 hover:text-base-content transition-colors"
            aria-label={`Version ${version}, release notes on GitHub`}
          >
            {`v${version}`}
          </a>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-base-content/70">
          <a href="/#runs" className="hover:text-base-content">How it works</a>
          <a href="/#features" className="hover:text-base-content">Features</a>
          <a href="/#telemetry" className="hover:text-base-content">Telemetry</a>
          <a href="/#getting-started" className="hover:text-base-content">Getting started</a>
        </div>
        {/* Icon controls, each with a DaisyUI tooltip underneath saying where it goes. */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="tooltip tooltip-bottom" data-tip="Source on GitHub">
            <a href={GITHUB} {...EXT} className="btn btn-ghost btn-sm btn-square" aria-label="Source on GitHub">
              <FaGithub className="size-5" aria-hidden="true" />
            </a>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Package on npm">
            <a href={NPM} {...EXT} className="btn btn-ghost btn-sm btn-square" aria-label="Package on npm">
              <SiNpm className="size-5 text-[#cb3837]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
