import { getHomePage } from '@/lib/services/home';
import { getGlobalSettings } from '@/lib/services/global';
import Navbar from './components/Navbar';
import Hero from './components/sections/HeroSection';
import Service from './components/sections/ServiceSection';
import Footer from './components/Footer';

export default async function Home() {
  const [home, globals] = await Promise.all([
    getHomePage(),
    getGlobalSettings(),
  ]);

  return (
    <div>
      <Navbar globals={globals} />
      <Hero home={home} />
      <Service home={home} />
      <Footer globals={globals} />
    </div>
  );
}
