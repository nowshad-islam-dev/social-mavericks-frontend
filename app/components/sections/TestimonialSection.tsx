import { getTestimonials } from '@/lib/services/testimonials';
import { TestimonialCard } from '@/app/components/common/TestimonialCard';
import type { HomePage } from '@/lib/types';
import { FaRegSun } from 'react-icons/fa6';

type TestimonialProps = Pick<HomePage, 'testimonials_section_title'>;

export default async function Testimonial({
  testimonials_section_title,
}: TestimonialProps) {
  const testimonials = (await getTestimonials()).slice(0, 3);

  return (
    <section className='bg-linear-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <h3 className='title'>{testimonials_section_title}</h3>

        {testimonials.length > 0 && (
          <div className='flex flex-col lg:flex-row items-center gap-8 mt-8'>
            <div className='w-full lg:max-w-2xl'>
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>

            <div className='hidden lg:flex shrink-0 items-center justify-center'>
              <div className='border border-gray-300 w-60 h-60 rotate-45 relative'>
                <div className='border border-blue-200 relative w-55 h-55 -rotate-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <FaRegSun
                    size={90}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
