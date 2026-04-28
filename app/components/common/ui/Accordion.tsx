import { FaChevronUp } from 'react-icons/fa';
import type { FaqItem } from '@/lib/types';

export const FaqAccordion = ({ faqs }: { faqs: FaqItem[] }) => {
  if (faqs.length === 0) return null;

  return (
    <div className='flex flex-col divide-y divide-outline-variant rounded-xl border border-outline-variant bg-surface-container-lowest'>
      {faqs.map((faq) => (
        <details key={faq.id} className='group px-5 py-1'>
          <summary className='flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-headline text-sm font-semibold text-on-surface marker:hidden'>
            {faq.question}
            {/* Chevron — rotates via CSS group-open */}
            <span className='flex h-5 w-5 shrink-0 items-center justify-center text-outline transition-transform duration-200 group-open:rotate-180'>
              <FaChevronUp size={16} />
            </span>
          </summary>
          <p className='pb-4 font-body text-sm leading-relaxed text-on-surface-variant'>
            {faq.answer || 'No answer provided.'}
          </p>
        </details>
      ))}
    </div>
  );
};
