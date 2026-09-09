import useSeo from '../hooks/useSeo.js';
import { ROUTE_META } from '../seo.js';
import Hero from '../components/Hero.jsx';
import RunGallery from '../components/RunGallery.jsx';
import Tiles from '../components/Tiles.jsx';
import Pairs from '../components/Pairs.jsx';
import WithAgent from '../components/WithAgent.jsx';
import NeonRule from '../components/NeonRule.jsx';
import ByHand from '../components/ByHand.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  useSeo(ROUTE_META['/']);
  return (
    <main>
      <Hero />
      <RunGallery />
      <Tiles />
      <Pairs />
      <WithAgent />
      <NeonRule />
      <ByHand />
      <Footer />
    </main>
  );
}
