import Term, { Acc, Dim } from './Term.jsx';

export default function Cta() {
  return (
    <section className="border-t line pt-24 pb-6">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">One command</span>
          <h2 className="heading text-3xl md:text-4xl font-bold">Ask your agent to install and onboard today!</h2>
          <p className="text-base-content/70 max-w-[48ch]">
            Highball is set up by the agent it will check. The onboarding guide walks it through the repo's real
            toolchain, writes checks that reflect what the repo already trusts, and proves that exit 2 actually
            blocks.
          </p>
        </div>
        <Term
          bar="tell your agent"
          lines={[
            <><Dim>›</Dim> Run <Acc>npx @profoundry-us/highball onboard</Acc></>,
            '  and follow the instructions.',
          ]}
        />
      </div>
    </section>
  );
}
