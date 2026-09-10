import { Fragment } from 'react';
import { Ok, Bad, Dim, Mut, Acc, K, S, N } from './Term.jsx';

// A code fragment inside a tile: same dark-theme scoping as Term, tile-sized.
function Frag({ lines }) {
  return (
    <div data-theme="highball-dark" className="term flex-1 rounded-field border line bg-neutral text-neutral-content/80 px-3.5 py-3 overflow-hidden">
      <pre className="text-xs">
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && '\n'}
          </Fragment>
        ))}
      </pre>
    </div>
  );
}

function Tile({ span = 2, title, children, lines }) {
  const cols = span === 3 ? 'md:col-span-3' : 'md:col-span-2';
  return (
    <div className={`${cols} rounded-box border line bg-base-200 p-[18px] flex flex-col gap-3.5 min-h-[250px]`}>
      <Frag lines={lines} />
      <h3 className="text-[17px] font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-base-content/70">{children}</p>
    </div>
  );
}

const Mono = ({ children }) => <span className="font-mono">{children}</span>;

/*
 * Clerk-style band: dark in both themes (a second dark island, like the
 * reference), angled notches top-right and bottom-left, an indigo glow.
 */
export default function Tiles() {
  return (
    <section id="features" data-theme="highball-dark" className="notched relative overflow-hidden bg-neutral text-base-content py-28 md:py-32 mt-6">
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-[220px] w-[900px] h-[520px] -translate-x-1/2 rounded-full pointer-events-none bg-[radial-gradient(closest-side,rgba(143,133,255,.22),rgba(143,133,255,0))]"
      />
      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-3.5 max-w-[640px]">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">What the hook contract allows</span>
          <h2 className="heading text-3xl md:text-[40px] font-bold">Enforcement is local. Everything else is optional.</h2>
          <p className="text-[17px] text-base-content/70 max-w-[54ch]">
            Two hooks, one YAML file, and an exit code Claude Code already respects. Nothing here needs a login.
          </p>
        </div>

        <div className="grid md:grid-cols-6 gap-3.5">
          <Tile
            title="Fast checks on every edit"
            lines={[
              <Dim>// .claude/settings.json</Dim>,
              <><K>"PostToolUse"</K>: [{'{'}</>,
              <>  <K>"matcher"</K>: <S>"Write|Edit|Bash"</S>,</>,
              <>  <K>"command"</K>: <S>"npx @profoundry-us/highball</S></>,
              <>            <S>run --fast --if-changed"</S></>,
              '}]',
            ]}
          >
            Checks marked <Mono>fast: true</Mono> run after every Write, Edit — and Bash, because agents in auto mode
            edit through the shell.
          </Tile>

          <Tile
            title="Full checks at turn end"
            lines={[
              <><K>"Stop"</K>: [{'{'}</>,
              <>  <K>"command"</K>: <S>"npx @profoundry-us/highball run"</S>,</>,
              <>  <K>"timeout"</K>: <N>900</N></>,
              '}]',
              '',
              <><Dim>→ 12 checks · 41.6s · </Dim><Ok>passed</Ok></>,
            ]}
          >
            The Stop hook runs every check in the file. The turn can't end until all of them pass.
          </Tile>

          <Tile
            title="Blocking exit codes"
            lines={[
              <Bad>### Unit tests (unit-tests) failed.</Bad>,
              <Bad>Fix before finishing:</Bad>,
              'Failures:',
              "  1) journal keeps every rule's output",
              '     expected 3, got 2',
              '',
              <><Dim>$?</Dim> <Bad>2</Bad></>,
            ]}
          >
            Exit 2 is the Claude Code hook contract: it stops the agent and hands stderr back as its next instruction.
            No dashboard to ignore.
          </Tile>

          <Tile
            span={3}
            title="Change detection"
            lines={[
              <><Dim>$</Dim> highball run --fast --if-changed</>,
              <Mut>highball: no changes since the last run — skipped</Mut>,
              '',
              <><Dim>fingerprint</Dim>  HEAD <Acc>8981d5b</Acc> + dirty paths (size, mtime)</>,
              <><Dim>stamp</Dim>        ~/.highball/stamps/webtree-<Acc>3f9a2c</Acc></>,
              <><Dim>cost</Dim>         <Ok>11ms</Ok> · no checks spawned</>,
            ]}
          >
            <Mono>--if-changed</Mono> fingerprints the working tree and exits in milliseconds when nothing has moved.
            That is what keeps a Bash hook free: it fires after every command, and most commands are reads. Per
            checkout, so worktrees never share a skip.
          </Tile>

          <Tile
            span={3}
            title="Three off switches"
            lines={[
              <><Acc>.highball/disabled</Acc>     this checkout   gitignored   next run</>,
              <><Acc>enabled: false</Acc>         the whole team  committed    next run</>,
              <><Acc>HIGHBALL_DISABLED=1</Acc>    this machine    env          next session</>,
              '',
              <Mut>highball: disabled by .highball/disabled</Mut>,
              <Mut>  (bisecting a flaky test) — no checks run</Mut>,
            ]}
          >
            This checkout, the whole team, or this machine. Each one announces itself on every run, with the reason
            you left in the file — a guardrail that stopped guarding should never read green.
          </Tile>

          <Tile
            title="Rubric-based AI judgements"
            lines={[
              <Dim># .highball/checks.yml</Dim>,
              <>- <K>id</K>: no-new-todos</>,
              <>  <K>name</K>: No new TODOs in the diff</>,
              <>  <K>rubric</K>: .highball/rubrics/no-new-todos.md</>,
              '',
              <Dim>judged by claude · turn end only</Dim>,
            ]}
          >
            A check can be a markdown rubric instead of a command. Claude judges the diff against it at turn end —
            never on the fast path, where latency and cost would be paid on every edit.
          </Tile>

          <Tile
            title="Container-aware execution"
            lines={[
              <><K>exec</K>:</>,
              <>  <K>via</K>: docker compose exec -T app</>,
              '',
              <>- <K>id</K>: rspec</>,
              <>  <K>run</K>: bundle exec rspec</>,
              <>- <K>id</K>: gitleaks</>,
              <>  <K>run</K>: gitleaks detect</>,
              <>  <K>exec</K>: host</>,
            ]}
          >
            Declare <Mono>exec.via</Mono> once and every check runs inside your container. Checks that belong on the
            host opt out with <Mono>exec: host</Mono>.
          </Tile>

          <Tile
            title="Telemetry via your own PostHog"
            lines={[
              <Dim>reported 3 events to us.i.posthog.com</Dim>,
              '',
              <><K>highball_run</K>    status, duration_ms,</>,
              '                rules_run, failed_rules',
              <><K>highball_check</K>  rule_id, status, summary</>,
              '',
              <Dim>never code · never logs · key is write-only</Dim>,
            ]}
          >
            Check ids, pass/fail, durations, and a one-line failure summary, sent to a PostHog project you own. Never
            code, never logs — and an unreachable endpoint never blocks a check.
          </Tile>
        </div>
      </div>
    </section>
  );
}
