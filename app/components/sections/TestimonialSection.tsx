import { getTestimonials } from '@/lib/services/testimonials';
import { MdVerified } from 'react-icons/md';
import type { HomePage } from '@/lib/types';

type TestimonialProps = Pick<HomePage, 'testimonials_section_title'>;

export default async function Testimonial({
  testimonials_section_title,
}: TestimonialProps) {
  const testimonials = (await getTestimonials()).slice(0, 2) || [];

  return (
    <section className='py-24 bg-surface-container-low'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-extrabold text-primary mb-8'>
              {testimonials_section_title}
            </h2>

            <div className='space-y-12'>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className='relative pl-8 border-l-2 border-secondary'
                >
                  <p className='text-xl italic text-primary leading-relaxed mb-4'>
                    &#34;{testimonial.quote}&#34;
                  </p>
                  <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 rounded bg-slate-200'></div>
                    <div>
                      <div className='font-bold text-primary'>
                        {testimonial.name}
                      </div>
                      <div className='text-sm text-on-surface-variant'>
                        {testimonial.role_or_company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='hidden md:flex justify-center'>
            <div className='relative w-80 h-80'>
              <div className='absolute inset-0 border-[0.5px] border-outline-variant rotate-45'></div>
              <div className='absolute inset-4 border-[0.5px] border-secondary/30 -rotate-12'></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='material-symbols-outlined text-[8rem] text-secondary/10'>
                  <MdVerified />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
