import CopyButton from './CopyButton.jsx';

const CMD = 'npx @profoundry-us/highball onboard';
export const PROMPT = `Run \`${CMD}\` and follow the instructions.`;

/*
 * The prompt to hand your agent, drawn as a coding agent's input line —
 * chevron, the sentence, a live caret — rather than a terminal window.
 * The input row is painted with the page-level tokens (--page-*, set on
 * <html> in index.css) so it follows the light/dark toggle even inside the
 * hero's dark island; the label row above it takes whatever surrounds it.
 * `elevated` adds the hero's deep shadow and the aura sweep. Copy takes the
 * whole sentence, backticks included: it is a prompt, not a command.
 */
export default function PromptLine({ id, elevated = false, className = '' }) {
  return (
    <div id={id} className={`w-full max-w-[560px] scroll-mt-24 flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between px-1 font-mono text-[11px] opacity-70">
        <span>claude code · cursor · codex</span>
        <CopyButton text={PROMPT} label="Copy the prompt for your agent" className="hover:opacity-100" />
      </div>
      <div
        className={
          elevated
            ? 'aura aura-sm block w-full text-(--page-primary) duration-[9s] [--aura-radius:var(--radius-field)]'
            : undefined
        }
      >
        <div
          className={`flex items-baseline gap-3 px-4 py-3.5 rounded-field border border-(--page-line) bg-(--page-bg) text-(--page-fg) font-mono text-sm leading-relaxed ${
            elevated ? 'shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)]' : 'shadow-[0_16px_40px_-20px_rgba(0,0,0,.4)]'
          }`}
        >
          <span className="text-(--page-primary) select-none" aria-hidden="true">&gt;</span>
          <p className="m-0">
            Run <span className="text-(--page-primary)">`{CMD}`</span> and follow the instructions.
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  );
}
