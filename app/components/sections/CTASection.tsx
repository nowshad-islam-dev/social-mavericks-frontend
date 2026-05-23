import { CalendlyButton } from '@components/common/ui/Button';
import type { HomePage } from '@/lib/types';

type CTAprops = Pick<
  HomePage,
  'cta_title' | 'cta_button_label' | 'cta_description'
>;

export default function CTA({
  cta_title,
  cta_description,
  cta_button_label,
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
            <CalendlyButton label={cta_button_label} />
          </div>
        </div>
      </div>
    </section>
  );
}
