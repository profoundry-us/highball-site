import { useState } from 'react';
import Navbar, { ONBOARDING, EXT } from './Navbar.jsx';
import Term, { Window, Ok, Bad, Todo, Dim } from './Term.jsx';

// yarn first: yarn 1 treats a repo's own `engines` field as a hard error, so
// people who hit that wall are the ones who most need to see their command.
const INSTALLS = [
  { id: 'yarn', label: 'yarn', cmd: 'yarn add -D @profoundry-us/highball' },
  { id: 'npm', label: 'npm', cmd: 'npm i -D @profoundry-us/highball' },
];

function InstallBox() {
  const [pm, setPm] = useState(INSTALLS[0]);
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(pm.cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  }
  return (
    <div className="w-full sm:w-auto rounded-field border line bg-neutral/80 text-neutral-content overflow-hidden">
      <div role="tablist" aria-label="Package manager" className="tabs tabs-border tabs-sm px-2 border-b line">
        {INSTALLS.map((i) => (
          <button
            key={i.id}
            type="button"
            role="tab"
            aria-selected={pm.id === i.id}
            onClick={() => {
              setPm(i);
              setCopied(false);
            }}
            className={`tab font-mono text-xs ${pm.id === i.id ? 'tab-active' : 'text-neutral-content/60'}`}
          >
            {i.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={copy}
        className="flex w-full items-center gap-3 h-11 px-4 text-left font-mono text-sm"
        aria-label={`Copy the ${pm.label} install command`}
      >
        <span className="text-neutral-content/45">$</span>
        <span className="flex-1 whitespace-nowrap">{pm.cmd}</span>
        <span className="text-neutral-content/60 text-xs w-12 text-right">{copied ? 'copied' : 'copy'}</span>
      </button>
    </div>
  );
}

/*
 * The hero is a dark island: it keeps the twilight photo and the dark
 * product window in both themes (data-theme on the section), and the
 * light page begins below it.
 */
export default function Hero() {
  return (
    <section data-theme="highball-dark" className="relative overflow-hidden bg-base-100 text-base-content">
      {/* "Misty mountains shrouded in blue twilight fog" by 志远 杨 on Unsplash */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/img/hero.webp"
          alt=""
          width="1920"
          height="1280"
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[center_38%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent via-base-100/80 to-base-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1024]/70 via-[#0e1024]/35 to-transparent to-60%" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 pt-16 md:pt-24">
          <div className="max-w-[760px] flex flex-col gap-5">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">
              Custom Turn-Based Checks + Telemetry
            </span>
            <h1 className="heading text-[42px] md:text-[66px] font-bold text-white">
              Local CI for AI Coding Agents
            </h1>
            <p className="text-lg md:text-[19px] leading-relaxed text-base-content/85 max-w-[58ch]">
              Highball runs your repo's own checks after every agent edit, and the full checks when the turn ends.
              A failure blocks the agent and hands it the output. One YAML file. No account, no server.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <InstallBox />
              <a href={ONBOARDING} {...EXT} className="btn btn-primary">Read the onboarding guide</a>
            </div>
          </div>

          {/* Product canvas: the MCP widget, with the blocking terminal overlapping its corner */}
          <div className="relative mt-12 md:mt-[72px] pb-16 md:pb-24">
            <Window title="Claude Desktop · webtree › list_runs" className="max-w-[940px] shadow-[0_40px_100px_-30px_rgba(0,0,0,.9)]">
              <img
                src="/img/widget-webtree.webp"
                alt="Highball run history widget in Claude Desktop: recent runs for the webtree project, each with status, trigger, branch, duration and check counts"
                width="1640"
                height="1050"
                className="block w-full h-auto"
              />
            </Window>

            <Term
              bar="Stop hook · highball run"
              className="mt-4 md:mt-0 md:absolute md:right-0 md:bottom-10 md:w-[520px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.95)]"
              lines={[
                <><Dim>$</Dim> npx @profoundry-us/highball run</>,
                <>→ Lint &amp; formatting ... <Ok>passed</Ok> <Dim>(2.1s)</Dim></>,
                <>→ lib/ types hold ... <Bad>FAILED</Bad> <Dim>(4.8s)</Dim></>,
                <>→ Coverage never decreases ... <Todo>todo</Todo> <Dim>(not implemented yet)</Dim></>,
                <Dim>reported 3 events to us.i.posthog.com</Dim>,
                '',
                <Bad>### lib/ types hold (lib-types) failed. Fix before finishing:</Bad>,
                <>lib/locations.js(248,3): <Bad>error TS2339</Bad>: Property 'moved'</>,
                <>  does not exist on type '{'{'} id: string; root: string; ... {'}'}'.</>,
                <Dim>exit 2 — the agent gets this back as its next instruction</Dim>,
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
