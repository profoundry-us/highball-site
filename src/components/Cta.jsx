import { useState } from 'react';
import Term, { Acc, Dim } from './Term.jsx';
import { ONBOARDING, EXT } from './Navbar.jsx';

const ONBOARD = 'npx @profoundry-us/highball onboard';

function CopyButton() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(ONBOARD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="font-mono text-xs text-neutral-content/60 hover:text-neutral-content w-12 text-right"
      aria-label="Copy the onboard command"
    >
      {copied ? 'copied' : 'copy'}
    </button>
  );
}

/*
 * The destination for every "Get started" on the page: the preferred setup
 * path is to hand the repo's own agent one command and let it work through
 * the guide. scroll-mt keeps the heading clear of the top edge on arrival.
 */
export default function Cta() {
  return (
    <section id="get-started" className="border-t line pt-24 pb-6 scroll-mt-8">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">One command</span>
          <h2 className="heading text-3xl md:text-4xl font-bold">Ask your agent to install and onboard today!</h2>
          <p className="text-base-content/70 max-w-[48ch]">
            Highball is set up by the agent it will check. The onboarding guide walks it through the repo's real
            toolchain, writes checks that reflect what the repo already trusts, and proves that exit 2 actually
            blocks.
          </p>
          <p className="text-sm text-base-content/70">
            Prefer to see the steps first?{' '}
            <a href={ONBOARDING} {...EXT} className="link link-hover text-base-content">
              Read the onboarding guide
            </a>
            .
          </p>
        </div>
        <Term
          bar="tell your agent"
          right={<CopyButton />}
          lines={[
            <><Dim>›</Dim> Run <Acc>{ONBOARD}</Acc></>,
            '  and follow the instructions.',
          ]}
        />
      </div>
    </section>
  );
}
