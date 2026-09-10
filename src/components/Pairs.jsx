import Term, { K, S, N } from './Term.jsx';
import Section from './Section.jsx';

function RunRow({ status, when, kind, branch, time, tally }) {
  const chip = status === 'failed' ? 'badge-error' : 'badge-success';
  const glyph = status === 'failed' ? '✗' : '✓';
  return (
    <div className="flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-field border line bg-base-200 font-mono text-[13px]">
      <span className={`badge badge-soft ${chip} font-mono text-xs`}>{glyph} {status}</span>
      <span className="text-base-content/70">{when}</span>
      <span className="text-base-content/70">{kind}</span>
      <span>{branch}</span>
      <span className="flex-1" />
      <span className="text-base-content/70">{time}</span>
      <span className="text-base-content/70">{tally}</span>
    </div>
  );
}

/*
 * Resend-style pairs: a claim, the literal payload, and a small piece of UI.
 * Enforcement on the left, telemetry on the right.
 */
export default function Pairs() {
  return (
    <Section id="telemetry"
      eyebrow="Two halves"
      title="Enforcement, then witness."
      lead="Enforcement runs on your machine and can stop the agent. Telemetry is optional and best-effort, sent only to a PostHog project you own."
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-10">
        <div className="flex flex-col gap-4.5">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-error">Enforcement · exit 2</span>
          <h3 className="heading text-2xl md:text-[26px] font-bold">Blocked, with the output in hand</h3>
          <p className="text-base-content/70 max-w-[46ch]">
            When a check fails the agent doesn't get a red X to scroll past. It gets the failing output as its next
            instruction, and the turn can't end until the check passes.
          </p>

          <Term
            bar="stdin · Stop hook payload"
            right="JSON"
            lines={[
              '{',
              <>  <K>"session_id"</K>: <S>"8f2c1a…41ab"</S>,</>,
              <>  <K>"hook_event_name"</K>: <S>"Stop"</S>,</>,
              <>  <K>"transcript_path"</K>: <S>"~/.claude/projects/…/8f2c1a…41ab.jsonl"</S>,</>,
              <>  <K>"cwd"</K>: <S>"/Users/you/src/webtree"</S></>,
              '}',
            ]}
          />

          <div className="rounded-box border line bg-base-200 p-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <span className="badge badge-soft badge-error font-mono text-xs">Stop hook blocked</span>
              <span className="font-mono text-xs text-base-content/70">exit 2 · 14.2s</span>
            </div>
            <p className="font-mono text-[13px] leading-relaxed text-base-content/80">
              lib/ types hold (lib-types) failed. Fix before finishing: lib/locations.js(248,3): error TS2339: Property
              'moved' does not exist…
            </p>
            <div className="flex gap-2.5 items-start pt-2.5 border-t line">
              <span className="size-[22px] rounded-md bg-primary shrink-0" aria-hidden="true" />
              <p className="text-sm">
                Adding <span className="font-mono">moved</span> to the location type, then re-running the checks
                before I finish.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4.5">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-success">Witness · PostHog</span>
          <h3 className="heading text-2xl md:text-[26px] font-bold">Every run, recorded in your own PostHog</h3>
          <p className="text-base-content/70 max-w-[46ch]">
            Telemetry is best-effort and goes to a PostHog project you own. If the endpoint is down, checks still run
            and still block — they just aren't recorded.
          </p>

          <Term
            bar="POST /batch · highball_run"
            right="JSON"
            lines={[
              '{',
              <>  <K>"event"</K>: <S>"highball_run"</S>,</>,
              <>  <K>"properties"</K>: {'{'}</>,
              <>    <K>"project"</K>: <S>"webtree"</S>,</>,
              <>    <K>"trigger"</K>: <S>"stop"</S>,</>,
              <>    <K>"branch"</K>: <S>"main"</S>,</>,
              <>    <K>"status"</K>: <S>"failed"</S>,</>,
              <>    <K>"duration_ms"</K>: <N>14200</N>,</>,
              <>    <K>"rules_run"</K>: [<S>"lint"</S>, <S>"lib-types"</S>, <S>"coverage-ratchet"</S>],</>,
              <>    <K>"failed_rules"</K>: [<S>"lib-types"</S>]</>,
              '  }',
              '}',
            ]}
          />

          <div className="flex flex-col gap-2">
            <RunRow status="failed" when="2m ago" kind="full" branch="main" time="14.2s" tally="2✓ 1✗" />
            <RunRow status="passed" when="9h ago" kind="full" branch="main" time="8.2s" tally="3✓" />
            <RunRow status="passed" when="4d ago" kind="fast" branch="release-0.6.0" time="7.8s" tally="1✓" />
          </div>
        </div>
      </div>
    </Section>
  );
}
