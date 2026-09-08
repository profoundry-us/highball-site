import { GITHUB, NPM, ONBOARDING, EXT } from './Navbar.jsx';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1180px] px-5 md:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-5 pt-6 border-t line text-[13px] text-base-content/70">
        <span>© 2026 Profoundry. All rights reserved. Highball is MIT licensed.</span>
        <div className="flex gap-5">
          <a href={GITHUB} {...EXT} className="hover:text-base-content">GitHub</a>
          <a href={NPM} {...EXT} className="hover:text-base-content">npm</a>
          <a href={ONBOARDING} {...EXT} className="hover:text-base-content">Onboarding</a>
        </div>
        <span>
          Hero photo:{' '}
          <a
            href="https://unsplash.com/photos/misty-mountains-shrouded-in-blue-twilight-fog-kzH-sVU5pqs"
            {...EXT}
            className="hover:text-base-content"
          >
            志远 杨 on Unsplash
          </a>
        </span>
      </div>
    </footer>
  );
}
