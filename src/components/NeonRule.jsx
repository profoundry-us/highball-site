// A partial-width neon hairline with a soft glow, for separating two
// blocks that belong together (styles in index.css under .neon-rule).
// `tone` picks the theme token it glows in; `inline` drops the page-width
// wrapper for use inside a section that already has one.
export default function NeonRule({ tone = 'primary', inline = false, className = '' }) {
  const rule = <div className={`neon-rule neon-rule-${tone} mx-auto w-4/5 ${inline ? className : ''}`} />;
  if (inline) return <div aria-hidden="true">{rule}</div>;
  return (
    <div className={`mx-auto max-w-[1180px] px-5 md:px-8 ${className}`} aria-hidden="true">
      {rule}
    </div>
  );
}
