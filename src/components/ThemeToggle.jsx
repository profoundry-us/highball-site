/*
 * Two-state light/dark toggle. The icon shown is decided by CSS from the
 * resolved theme (see .icon-sun / .icon-moon in index.css), so the server
 * markup and the client never disagree; the click handler is the only JS.
 * First visit follows the OS; a click sets an explicit choice that beats it.
 */
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const explicit = root.getAttribute("data-theme");
    const isDark = explicit
      ? explicit === "highball-dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", `highball-${next}`);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just doesn't persist */
    }
  }

  // The tooltip text follows the same CSS rules as the icon, so it always
  // names the theme you are about to switch to.
  return (
    <div className="tooltip tooltip-bottom">
      <div className="tooltip-content">
        <span className="icon-sun">Switch to light mode</span>
        <span className="icon-moon">Switch to dark mode</span>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="btn btn-sm btn-ghost btn-square"
        aria-label="Toggle light and dark theme"
      >
        <svg
          className="icon-sun size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg
          className="icon-moon size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>
  );
}
