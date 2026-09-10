import Term, { Window, Bad } from './Term.jsx';
import NeonRule from './NeonRule.jsx';
import Section from './Section.jsx';

function Shot({ kind, stat, title, src, width, height, alt, note }) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2.5">
        <span className="badge badge-ghost font-mono text-xs">{kind}</span>
        <span className="font-mono text-xs text-base-content/70">{stat}</span>
      </div>
      <Window title={title} className="shadow-[0_30px_70px_-30px_rgba(0,0,0,.6)]">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" className="block w-full h-auto" />
      </Window>
      <p className="text-sm text-base-content/70 max-w-[44ch]">{note}</p>
    </div>
  );
}

export default function RunGallery() {
  return (
    <Section
      id="runs"
      eyebrow="Two kinds of run"
      title="Cheap after every edit. Everything at turn end. Loud when it fails."
      lead="Fast checks are the ones you'd happily run a hundred times a session. The full checks are the ones that decide whether the turn is over."
    >
      <div className="grid md:grid-cols-2 gap-7 items-start">
        <Shot
          kind="fast"
          stat="after an edit · 11 checks · 1.0s"
          title="webtree › get_run #1"
          src="/img/run-fast.webp"
          width="1640"
          height="1082"
          alt="A fast run in the widget: eleven checks, each passed in about a tenth of a second"
          note={
            <>
              Every check here is a file-scoped script or a grep. They fire after each Write, Edit and Bash call,
              and <span className="font-mono">--if-changed</span> keeps the misses free.
            </>
          }
        />
        <Shot
          kind="full"
          stat="turn end · 15 checks + 1 todo · 21.1s"
          title="webtree › get_run #2"
          src="/img/run-full.webp"
          width="1640"
          height="1764"
          alt="A full run in the widget: RSpec at 18 seconds, two AI-judged checks, a todo check, and one check expanded to show its command and output"
          note={
            <>
              The suite, two AI-judged rubrics, and a <span className="font-mono">todo</span> check that's tracked but
              can't fail. Any check opens to the exact command and its captured output.
            </>
          }
        />
      </div>

      <NeonRule tone="secondary" inline className="mt-6 mb-6" />

      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="badge badge-soft badge-error font-mono text-xs">✗ failed</span>
            <span className="font-mono text-xs text-base-content/70">after an edit · 13 checks · 2 failed · 19.9s</span>
          </div>
          <h3 className="heading text-2xl md:text-[26px] font-bold">When one fails, the agent is told exactly which, and why</h3>
          <p className="text-base-content/70 max-w-[44ch]">
            Failed checks open on their own, command and output first. The same text goes back to the agent on stderr
            with exit 2 — it doesn't get to finish the turn until both are green.
          </p>
          <Term
            bar="stderr · what the agent receives"
            right="exit 2"
            lines={[
              <Bad>### The blueprint lints (blueprint-lint) failed. Fix before finishing:</Bad>,
              'ERRORS',
              '  ✗ [coverage] status.spec.steps-are-required: a check references',
              '    this rule id, but no such rule exists',
              '✗ 137 rules, 7 screens, 57 anchors — 1 error(s), 6 warning(s)',
              '',
              <Bad>### Unit tests (unit-tests) failed. Fix before finishing:</Bad>,
              <>tests 316 · pass 315 · <Bad>fail 1</Bad></>,
              '  ✖ failing tests: test/delivery.test.js:80:1',
            ]}
          />
        </div>
        <Window title="walkdown › get_run #6" className="md:col-span-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,.6)]">
          <img
            src="/img/run-failed.webp"
            alt="A failed run in the widget: the blueprint lint check expanded to its command and error output, eleven passing checks, and a failed unit tests check"
            width="1640"
            height="2366"
            loading="lazy"
            className="block w-full h-auto"
          />
        </Window>
      </div>
    </Section>
  );
}
