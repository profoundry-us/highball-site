import { useState } from 'react';

// A quiet "copy" affordance for a command. Sits in a Term bar or beside a
// command line; the text stays selectable if the clipboard is blocked.
export default function CopyButton({ text, label, className = 'text-neutral-content/60 hover:text-neutral-content' }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`font-mono text-xs w-12 text-right ${className}`}
      aria-label={label}
    >
      {copied ? 'copied' : 'copy'}
    </button>
  );
}
