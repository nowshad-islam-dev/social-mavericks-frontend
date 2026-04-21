import Image from 'next/image';
import { getImageUrl } from '@/lib/normalizer';
import type { HomePage } from '@/lib/types';

type HeroProps = Pick<
  HomePage,
  'hero_title' | 'hero_subtitle' | 'hero_cta_label' | 'hero_background_image'
>;

export default function Hero({
  hero_title,
  hero_subtitle,
  hero_cta_label,
  hero_background_image,
}: HeroProps) {
  return (
    <section className='flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-8 px-8 py-16 md:py-24 max-w-7xl mx-auto'>
      <div className='flex-1 space-y-6'>
        <h1 className='title'>{hero_title}</h1>
        <p className='subtitle'>{hero_subtitle}</p>
        <button className='btn-primary px-8 py-3 shadow-md hover:shadow-lg '>
          {hero_cta_label}
        </button>
      </div>
      <div className='flex-1'>
        <Image
          src={getImageUrl(hero_background_image)!}
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
