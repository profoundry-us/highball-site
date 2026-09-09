import Navbar, { ONBOARDING, EXT } from './Navbar.jsx';
import Term, { Window, Ok, Bad, Todo, Dim } from './Term.jsx';
import CopyButton from './CopyButton.jsx';

export const PROMPT = 'Run npx @profoundry-us/highball onboard and follow the instructions.';

/*
 * The first thing on the page: the prompt to hand your agent, drawn as the
 * input line of a coding agent (chevron, live caret) rather than a terminal
 * window. It is also the #get-started target, so every "Get started" lands
 * here. Copy takes the whole sentence — it is a prompt, not a command.
 */
function PromptLine() {
  return (
    <div id="get-started" className="w-full max-w-[560px] scroll-mt-24 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1 font-mono text-[11px] text-neutral-content/60">
        <span>claude code · cursor · codex</span>
        <CopyButton text={PROMPT} label="Copy the prompt for your agent" />
      </div>
      <div
        className="flex items-baseline gap-3 px-4 py-3.5 rounded-field border line bg-neutral font-mono text-sm leading-relaxed shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]"
      >
        <span className="text-primary select-none" aria-hidden="true">&gt;</span>
        <p className="m-0 text-neutral-content">
          {PROMPT}
          <span className="caret" aria-hidden="true" />
        </p>
      </div>
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
          {/* Two columns from lg: the words on the left, the prompt and its buttons on the right,
              vertically centred against the text block. */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-12 lg:items-center">
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
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <PromptLine />
              <div className="flex flex-wrap items-center gap-3">
                <a href="#by-hand" className="btn btn-ghost">Set it up manually</a>
                <a href={ONBOARDING} {...EXT} className="btn btn-outline">Read the onboarding guide</a>
              </div>
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
