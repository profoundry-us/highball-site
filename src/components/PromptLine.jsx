import CopyButton from './CopyButton.jsx';

export const PROMPT = 'Run npx @profoundry-us/highball onboard and follow the instructions.';

/*
 * The prompt to hand your agent, drawn as a coding agent's input line —
 * chevron, the sentence, a live caret — rather than a terminal window.
 * Only the input row is forced onto the dark token set (like the
 * terminals); the label row above it reads in whatever theme the page is
 * in. `elevated` adds the hero's deep shadow, which is too heavy on a light
 * page background.
 */
export default function PromptLine({ id, elevated = false, className = '' }) {
  return (
    <div id={id} className={`w-full max-w-[560px] scroll-mt-24 flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between px-1 font-mono text-[11px] text-base-content/60">
        <span>claude code · cursor · codex</span>
        <CopyButton
          text={PROMPT}
          label="Copy the prompt for your agent"
          className="text-base-content/60 hover:text-base-content"
        />
      </div>
      {/* In the hero the row wears DaisyUI's aura: a thin conic sweep of primary
          circling the border with a soft glow behind it (slows under reduced motion). */}
      <div
        className={
          elevated
            ? 'aura aura-sm block w-full text-primary duration-[9s] [--aura-radius:var(--radius-field)]'
            : undefined
        }
      >
        <div
          data-theme="highball-dark"
          className={`flex items-baseline gap-3 px-4 py-3.5 rounded-field border line bg-neutral font-mono text-sm leading-relaxed ${
            elevated ? 'shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]' : 'shadow-[0_16px_40px_-20px_rgba(0,0,0,.5)]'
          }`}
        >
          <span className="text-primary select-none" aria-hidden="true">&gt;</span>
          <p className="m-0 text-neutral-content">
            {PROMPT}
            <span className="caret" aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  );
}
