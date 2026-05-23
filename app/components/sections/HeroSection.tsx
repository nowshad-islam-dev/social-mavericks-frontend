import Image from 'next/image';
import { getImageUrl } from '@/lib/normalizer';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { CalendlyButton } from '@components/common/ui/Button';
import type { HomePage } from '@/lib/types';
import Link from 'next/link';

type HeroProps = Pick<
  HomePage,
  | 'hero_title_first'
  | 'hero_title_second'
  | 'hero_subtitle'
  | 'hero_cta_label'
  | 'hero_background_image'
>;

export default function Hero({
  hero_title_first,
  hero_title_second,
  hero_subtitle,
  hero_cta_label,
  hero_background_image,
}: HeroProps) {
  console.log(hero_background_image);
  return (
    <section className='relative pt-32 pb-24 mt-8 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16'>
        <div className='w-full md:w-3/5 space-y-8'>
          <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary-container text-xs font-bold tracking-widest uppercase rounded'>
            <span className='w-2 h-2 bg-secondary rounded-full'></span>
            Engineering Performance
          </div>
          <h1 className='text-5xl md:text-7xl font-extrabold text-primary capitalize leading-[1.1] tracking-tight'>
            {hero_title_first}{' '}
            <span className='text-secondary'>{hero_title_second}</span>
          </h1>
          <p className='text-lg text-on-surface-variant max-w-xl leading-relaxed'>
            {hero_subtitle}
          </p>
          <div className='flex items-center gap-6 pt-4'>
            <CalendlyButton label={hero_cta_label} />
            <button className='flex items-center gap-2 text-primary font-bold hover:underline'>
              <Link href='/services'>Explore Services</Link>
              <FaLongArrowAltRight size={24} />
            </button>
          </div>
        </div>

        <div className='w-full md:w-2/5'>
          <div className='relative bg-surface-container-high aspect-square rounded-xl overflow-hidden shadow-2xl'>
            <Image
              alt='Technical engineering office'
              className='w-full h-full object-cover mix-blend-overlay opacity-60'
              fill
              src={getImageUrl(hero_background_image)!}
            />
            <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent'></div>

            {/* Decorative Technical Element */}
            <div className='absolute bottom-8 left-8 right-8 bg-surface-container-lowest p-6 rounded shadow-sm border-l-4 border-secondary'>
              <div className='text-[10px] font-mono text-secondary mb-2 tracking-tighter uppercase'>
                system_status_v4.2
              </div>
              <div className='flex justify-between items-end'>
                <div className='text-2xl font-bold text-primary'>99.9%</div>
                <div className='w-24 h-8 bg-surface-container-low flex items-end gap-1 px-2 py-1'>
                  <div className='w-2 h-3 bg-secondary'></div>
                  <div className='w-2 h-5 bg-secondary'></div>
                  <div className='w-2 h-2 bg-secondary'></div>
                  <div className='w-2 h-6 bg-secondary'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
