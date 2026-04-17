import Image from 'next/image';
import { getImageUrl } from '@/lib/normalizer';
import { HomePage } from '@/lib/types';

interface HeroProps {
  home: HomePage;
}

export default function Hero({ home }: HeroProps) {
  const heroImage = getImageUrl(home.hero_background_image);
  return (
    <section className='flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-8 px-8 py-16 md:py-24 max-w-7xl mx-auto'>
      <div className='flex-1 space-y-6'>
        <h1 className='title'>{home.hero_title}</h1>
        <p className='subtitle'>{home.hero_subtitle}</p>
        <button className='btn-primary px-8 py-3 shadow-md hover:shadow-lg '>
          {home.hero_cta_label}
        </button>
      </div>
      <div className='flex-1'>
        <Image
          src={heroImage!}
          width={600}
          height={500}
          alt='hero-image'
          className='rounded-2xl shadow-xl w-full h-auto object-cover'
          priority
        />
      </div>
    </section>
  );
}
