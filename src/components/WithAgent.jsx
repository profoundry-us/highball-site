import PromptLine from './PromptLine.jsx';
import { ONBOARDING, EXT } from './Navbar.jsx';

/*
 * The suggested way in, restated at the end of the page right above the
 * manual route, so the two sit side by side and nobody picks "manual"
 * only because the prompt at the top went by too fast.
 */
export default function WithAgent() {
  return (
    <section id="with-agent" className="pt-16 pb-16 scroll-mt-8">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 md:justify-self-end">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">The suggested way</span>
          <h3 className="heading text-3xl md:text-4xl font-bold">Hand it to your agent</h3>
          <p className="text-base-content/70 max-w-[48ch]">
            One prompt, pasted into whatever agent already works in your repo. It installs the package, reads the{' '}
            <a href={ONBOARDING} {...EXT} className="link text-base-content">
              onboarding guide
            </a>
            , surveys your toolchain, writes checks from what CI already trusts, and proves that a failure
            blocks. You review the YAML it produced.
          </p>
        </div>
        {/* Prompt first on desktop so this section mirrors the manual one below; words first on phones. */}
        <PromptLine className="md:order-first" />
      </div>
    </section>
  );
}
