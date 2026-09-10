import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import ThemeToggle from './ThemeToggle.jsx';

export const GITHUB = 'https://github.com/profoundry-us/highball';
export const NPM = 'https://www.npmjs.com/package/@profoundry-us/highball';
export const ONBOARDING = 'https://github.com/profoundry-us/highball/blob/main/ONBOARDING.md';

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

// Font Awesome's npm wordmark, but with the viewBox cropped to the glyph itself
// (the original leaves 37% of its height empty above and below), so at h-5 it
// stands as tall as the GitHub mark beside it instead of reading as a sliver.
function NpmMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 160 576 192" fill="currentColor" aria-hidden="true">
      <path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto max-w-[1180px] px-5 md:px-8 h-[72px] flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 text-base-content" aria-label="Highball home">
          <Mark />
          <span className="heading text-xl font-bold tracking-tight">Highball</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-base-content/70">
          <a href="/#runs" className="hover:text-base-content">How it works</a>
          <a href="/#features" className="hover:text-base-content">Features</a>
          <a href="/#telemetry" className="hover:text-base-content">Telemetry</a>
          <a href="/#getting-started" className="hover:text-base-content">Getting started</a>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a href={GITHUB} {...EXT} className="btn btn-ghost btn-sm btn-square" aria-label="Highball on GitHub">
            <FaGithub className="size-5" aria-hidden="true" />
          </a>
          <a href={NPM} {...EXT} className="btn btn-ghost btn-sm px-2" aria-label="Highball on npm">
            <NpmMark className="h-5 w-auto" />
          </a>
        </div>
      </nav>
    </header>
  );
}
