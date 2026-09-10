import { Fragment } from 'react';

/*
 * A terminal / code panel. Always renders in the dark theme, whatever the
 * page is set to — a light terminal reads as a text box — so it wraps
 * itself in data-theme and takes every color from the dark token set.
 *
 * `lines` is an array of React nodes, one per line ('' for a blank line).
 * JSX collapses literal newlines, so the join happens here instead.
 */
export default function Term({ bar, right, lines, className = '', themed = false }) {
  // `themed` follows the page theme (white in light mode); the default is
  // the dark panel, whatever the page is set to.
  const skin = themed ? 'bg-base-100 text-base-content' : 'bg-neutral text-neutral-content';
  return (
    <div
      {...(themed ? {} : { 'data-theme': 'highball-dark' })}
      className={`term rounded-box border line overflow-hidden ${skin} ${className}`}
    >
      {bar && (
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b line font-mono text-xs">
          <Dots />
          <span className="ml-2 opacity-70">{bar}</span>
          {right && <span className="ml-auto">{right}</span>}
        </div>
      )}
      <pre className="px-4 py-4">
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

export function Dots() {
  return (
    <>
      <span className="size-2.5 rounded-full bg-current opacity-15" />
      <span className="size-2.5 rounded-full bg-current opacity-15" />
      <span className="size-2.5 rounded-full bg-current opacity-15" />
    </>
  );
}

// A framed app window around a screenshot, same chrome as the terminals.
export function Window({ title, children, className = '', themed = false }) {
  return (
    <div
      {...(themed ? {} : { 'data-theme': 'highball-dark' })}
      className={`rounded-box border line bg-base-100 text-base-content overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 h-9 px-3 border-b line bg-base-200 font-mono text-[11px]">
        <Dots />
        <span className="ml-2 opacity-70">{title}</span>
      </div>
      {children}
    </div>
  );
}

// Syntax-color helpers: semantic tokens (and opacity for the quiet ones), so they
// resolve correctly in the dark panel and in a themed one alike.
export const Ok = ({ children }) => <span className="text-success">{children}</span>;
export const Bad = ({ children }) => <span className="text-error">{children}</span>;
export const Todo = ({ children }) => <span className="text-warning">{children}</span>;
export const Dim = ({ children }) => <span className="opacity-60">{children}</span>;
export const Mut = ({ children }) => <span className="opacity-70">{children}</span>;
export const Acc = ({ children }) => <span className="text-primary">{children}</span>;
export const K = ({ children }) => <span className="text-primary">{children}</span>;
export const S = ({ children }) => <span className="text-success">{children}</span>;
export const N = ({ children }) => <span className="text-warning">{children}</span>;
