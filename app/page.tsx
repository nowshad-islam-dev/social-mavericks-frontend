import { getHomePage } from '@/lib/services/home';
import { getProjects } from '@/lib/services/projects';
import { getTestimonials } from '@/lib/services/testimonials';
import { getPartners } from '@/lib/services/partners';
import { normalizeCollection } from '@/lib/normalizer';
import Hero from './components/sections/HeroSection';
import Service from './components/sections/ServiceSection';
import Gallery from './components/sections/GallerySection';
import Testimonial from './components/sections/TestimonialSection';
import CTA from './components/sections/CTASection';
import Partners from './components/sections/PartnerSection';

export default async function Home() {
  const [home, rawProjects, rawTestimonials, rawPartners] = await Promise.all([
    getHomePage(),
    getProjects(),
    getTestimonials(),
    getPartners()
  ]);

  const projects = normalizeCollection(rawProjects);
  const testimonials = normalizeCollection(rawTestimonials).slice(0, 5);
  const partners = normalizeCollection(rawPartners);

  const heroProps = {
    hero_title_first: home.hero_title_first,
    hero_title_second: home.hero_title_second,
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
    projects,
  };

  const testimonialProps = {
    testimonials_section_title: home.testimonials_section_title,
    testimonials,
  };

  const partnerProps = {
    partners,
  };

  const ctaProps = {
    cta_title: home.cta_title,
    cta_description: home.cta_description,
    cta_button_label: home.cta_button_label,
    cta_link: home.cta_link,
  };

  return (
    <div>
      <Hero {...heroProps} />
      <Service {...serviceProps} />
      <Partners {...partnerProps} />
      <Gallery {...galleryProps} />
      <Testimonial {...testimonialProps} />
      <CTA {...ctaProps} />
    </div>
  );
}
