// A partial-width neon hairline with a soft glow, for separating two
// sections that belong together (styles in index.css under .neon-rule).
export default function NeonRule({ className = '' }) {
  return (
    <div className={`mx-auto max-w-[1180px] px-5 md:px-8 ${className}`} aria-hidden="true">
      <div className="neon-rule mx-auto w-3/5 md:w-1/2" />
    </div>
  );
}
