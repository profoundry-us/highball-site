import Navbar, { ONBOARDING, EXT } from './Navbar.jsx';
import Term, { Window, Ok, Bad, Todo, Dim } from './Term.jsx';
import PromptLine from './PromptLine.jsx';

/*
 * The hero keeps its twilight photo and light-on-dark words in both themes
 * (the dark token set is scoped to the words + navbar, not the section), so
 * the product canvas underneath — widget window, blocking terminal, and the
 * prompt's input row — follows the page theme and the toggle visibly does
 * something above the fold.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#111118]">
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
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent via-[#111118]/80 to-[#111118]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1024]/70 via-[#0e1024]/35 to-transparent to-60%" />
      </div>

      <div className="relative z-10">
        {/* Dark island: navbar + words. bg-transparent keeps the photo showing through. */}
        <div data-theme="highball-dark" className="bg-transparent text-base-content">
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
                <PromptLine elevated />
                <div className="flex flex-wrap items-center gap-3">
                  <a href="/#getting-started" className="btn btn-primary">Get started</a>
                  <a href="/#by-hand" className="btn btn-outline">Set it up manually</a>
                </div>
                <p className="text-sm text-base-content/70 max-w-[46ch] lg:text-right">
                  The prompt points your agent at a step-by-step guide written for it.{' '}
                  <a href={ONBOARDING} {...EXT} className="link text-base-content">
                    Read the agent onboarding guide
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product canvas, in the page theme: the MCP widget with the blocking terminal overlapping its corner */}
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="relative mt-12 md:mt-[72px] pb-16 md:pb-24">
            <Window themed title="Claude Desktop · webtree › list_runs" className="max-w-[940px] shadow-[0_40px_100px_-30px_rgba(0,0,0,.9)]">
              {/* Light/dark capture chosen by CSS (.shot-widget) so only one file loads; the
                  head script preloads the right one. */}
              <div
                role="img"
                aria-label="Highball run history widget in Claude Desktop: recent runs for the webtree project, each with status, trigger, branch, duration and check counts"
                className="shot-widget block w-full aspect-[1640/1050] bg-cover bg-top"
              />
            </Window>

            <Term
              themed
              bar="Stop hook · highball run"
              className="mt-4 md:mt-0 md:absolute md:right-0 md:bottom-10 md:w-[520px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)]"
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
