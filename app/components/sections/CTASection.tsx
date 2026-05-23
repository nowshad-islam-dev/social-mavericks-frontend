import Link from 'next/link';
import type { HomePage } from '@/lib/types';

type CTAprops = Pick<
  HomePage,
  'cta_title' | 'cta_button_label' | 'cta_description' | 'cta_link'
>;

export default function CTA({
  cta_title,
  cta_description,
  cta_button_label,
  cta_link,
}: CTAprops) {
  return (
    <section className='py-24'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='bg-primary rounded-lg p-16 relative overflow-hidden'>
          <div className='relative z-10 max-w-2xl'>
            <h2 className='text-4xl md:text-5xl font-extrabold text-on-primary mb-6'>
              {cta_title}
            </h2>
            <p className='text-on-primary-container text-lg mb-10 leading-relaxed'>
              {cta_description}
            </p>
            <Link
              href={cta_link || '#'}
              className='inline-block mb-4 md:mb-0 mr-4'
            >
              <button className='bg-secondary text-on-secondary px-10 py-5 rounded-lg font-bold text-xl hover:scale-[1.02] transition-transform active:scale-95 duration-100 shadow-xl shadow-black/20'>
                {cta_button_label}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
