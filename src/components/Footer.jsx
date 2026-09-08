import { GITHUB, NPM, ONBOARDING } from './Navbar.jsx';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1180px] px-5 md:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-5 pt-6 border-t line text-[13px] text-base-content/70">
        <span>© Profoundry · MIT license</span>
        <div className="flex gap-5">
          <a href={GITHUB} className="hover:text-base-content">GitHub</a>
          <a href={NPM} className="hover:text-base-content">npm</a>
          <a href={ONBOARDING} className="hover:text-base-content">Onboarding</a>
        </div>
        <span>
          Hero photo:{' '}
          <a
            href="https://unsplash.com/photos/misty-mountains-shrouded-in-blue-twilight-fog-kzH-sVU5pqs"
            className="hover:text-base-content"
          >
            志远 杨 on Unsplash
          </a>
        </span>
      </div>
    </footer>
  );
}
