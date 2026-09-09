import WithAgent from './WithAgent.jsx';
import NeonRule from './NeonRule.jsx';
import ByHand from './ByHand.jsx';

/*
 * The "Get started" destination: a centred header, then the two routes in —
 * the suggested one first, the manual one under the neon divider.
 */
export default function GettingStarted() {
  return (
    <section id="getting-started" className="border-t line pt-24 scroll-mt-8">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 flex flex-col items-center text-center gap-3.5">
        <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">Two ways in</span>
        <h2 className="heading text-3xl md:text-[40px] font-bold">Getting started</h2>
        <p className="text-[17px] text-base-content/70 max-w-[54ch]">
          Hand one prompt to the agent that already works in your repo, or do the steps yourself. Same runner
          either way.
        </p>
      </div>
      <WithAgent />
      <NeonRule />
      <ByHand />
    </section>
  );
}
