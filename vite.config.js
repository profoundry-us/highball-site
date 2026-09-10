import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The version the prerendered navbar shows: whatever npm is serving at build
// time. The page refreshes it from the registry once loaded (Navbar.jsx), so
// this only has to be right as of the build. No fallback on purpose: the
// build already needs the registry for `npm ci`, and a wrong version
// rendered confidently is worse than a failed build.
const PACKAGE = '@profoundry-us/highball';
const registry = await fetch(`https://registry.npmjs.org/${PACKAGE}/latest`);
if (!registry.ok) throw new Error(`npm registry answered ${registry.status} for ${PACKAGE}`);
const { version } = await registry.json();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __HIGHBALL_VERSION__: JSON.stringify(version) },
});
