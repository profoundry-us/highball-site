import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo.js';
import { ROUTE_META } from '../seo.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function NotFound() {
  useSeo(ROUTE_META['/404']);
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center">
        <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8 py-24 flex flex-col gap-5">
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-secondary">exit 404</span>
          <h1 className="heading text-4xl md:text-6xl font-bold">No such page.</h1>
          <p className="text-base-content/70 max-w-[52ch]">
            Nothing lives at this address. The homepage has everything Highball currently says about itself.
          </p>
          <div>
            <Link to="/" className="btn btn-primary">Back to the homepage</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
