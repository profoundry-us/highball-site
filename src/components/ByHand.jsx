import { useState } from 'react';
import Term, { Dim, Ok } from './Term.jsx';
import CopyButton from './CopyButton.jsx';
import { ONBOARDING, EXT } from './Navbar.jsx';

// yarn first: yarn 1 treats a repo's own `engines` field as a hard error, so
// people who hit that wall are the ones who most need to see their command.
const INSTALLS = [
  { id: 'yarn', label: 'yarn', cmd: 'yarn add -D @profoundry-us/highball' },
  { id: 'npm', label: 'npm', cmd: 'npm i -D @profoundry-us/highball' },
];

function InstallTabs() {
  const [pm, setPm] = useState(INSTALLS[0]);
  return (
    <div data-theme="highball-dark" className="rounded-box border line bg-neutral text-neutral-content overflow-hidden">
      <div role="tablist" aria-label="Package manager" className="tabs tabs-border tabs-sm px-2 border-b line">
        {INSTALLS.map((i) => (
          <button
            key={i.id}
            type="button"
            role="tab"
            aria-selected={pm.id === i.id}
            onClick={() => setPm(i)}
            className={`tab font-mono text-xs ${pm.id === i.id ? 'tab-active' : 'text-neutral-content/60'}`}
          >
            {i.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 min-h-11 py-2 px-4 font-mono text-sm">
        <span className="text-neutral-content/45">$</span>
        <span className="flex-1 min-w-0 break-words">{pm.cmd}</span>
        <CopyButton key={pm.id} text={pm.cmd} label={`Copy the ${pm.label} install command`} />
      </div>
    </div>
  );
}

/*
 * The other way in: install the package, scaffold the config, write the
 * checks yourself. Same runner and hooks as the agent path.
 */
export default function ByHand() {
  return (
    <section id="by-hand" className="pt-16 pb-6 scroll-mt-8">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 min-w-0">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">The manual way</span>
          <h2 className="heading text-3xl md:text-4xl font-bold">Set it up manually</h2>
          <p className="text-base-content/70 max-w-[48ch]">
            Same runner, same hooks, every step yours. Install the package, scaffold the config, and write the
            checks from what your repo already runs in CI. The{' '}
            <a href={ONBOARDING} {...EXT} className="link link-hover text-base-content">
              onboarding guide
            </a>{' '}
            doubles as a checklist for that survey.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-w-0">
          <InstallTabs />
          <Term
            bar="then scaffold"
            right={<CopyButton text="npx @profoundry-us/highball init" label="Copy the init command" />}
            lines={[
              <><Dim>$</Dim> npx @profoundry-us/highball init</>,
              <><Ok>created</Ok> .highball/checks.yml <Dim>(project: webtree) — add your rules</Dim></>,
              <><Ok>created</Ok> .highball/.gitignore <Dim>(ignores the `disabled` marker)</Dim></>,
              <><Ok>created</Ok> .claude/settings.json <Dim>(fast on edit, full at turn end)</Dim></>,
              '',
              <Dim>next: fill in .highball/checks.yml</Dim>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
