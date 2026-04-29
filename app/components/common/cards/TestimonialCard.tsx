import Image from 'next/image';
import { getImageUrl } from '@/lib/normalizer';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}: TestimonialCardProps) => {
  return (
    <div className='group p-4 mt-6 flex gap-4'>
      <div className='bg-gray-300 group-hover:bg-blue-700 h-auto w-0.5 rounded-full transition-colors ease-in-out duration-300 shrink-0'></div>

      <div className='flex-1'>
        <p className='italic text-tertiary py-3 text-lg leading-relaxed'>
          &#34;{testimonial.quote}&#34;
        </p>
        <div className='flex items-center gap-3'>
          <Image
            src={getImageUrl(testimonial.photo) || '/user-placeholder.svg'}
            alt={testimonial.role_or_company}
            width={40}
            height={40}
            className='rounded-full object-cover'
          />
          <div>
            <span className='font-semibold text-primary'>
              {testimonial.name}
            </span>
            <br />
            <span className='text-tertiary text-sm'>
              {testimonial.role_or_company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
