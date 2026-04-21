import { getHomePage } from '@/lib/services/home';
import { getGlobalSettings } from '@/lib/services/global';
import Navbar from './components/Navbar';
import Hero from './components/sections/HeroSection';
import Service from './components/sections/ServiceSection';
import Footer from './components/Footer';
import Gallery from './components/sections/GallerySection';
import Testimonial from './components/sections/TestimonialSection';

export default async function Home() {
  const [home, globals] = await Promise.all([
    getHomePage(),
    getGlobalSettings(),
  ]);

  const navbarProps = {
    navigation_links: globals.navigation_links,
  };

  const heroProps = {
    hero_title: home.hero_title,
    hero_subtitle: home.hero_subtitle,
    hero_cta_label: home.hero_cta_label,
    hero_background_image: home.hero_background_image,
  };

  const serviceProps = {
    services_section_title: home.services_section_title,
    services_section_description: home.services_section_description,
  };

  const galleryProps = {
    gallery_section_title: home.gallery_section_title,
  };

  const testimonialProps = {
    testimonials_section_title: home.testimonials_section_title,
  };

  const footerProps = {
    navigation_links: globals.navigation_links,
    social_links: globals.social_links,
    site_name: globals.site_name,
    footer_description: globals.footer_description,
    contact_email: globals.contact_email,
    contact_text: globals.contact_text,
  };

  return (
    <div>
      <Navbar {...navbarProps} />
      <Hero {...heroProps} />
      <Service {...serviceProps} />
      <Gallery {...galleryProps} />
      <Testimonial {...testimonialProps} />
      <Footer {...footerProps} />
    </div>
  );
}
