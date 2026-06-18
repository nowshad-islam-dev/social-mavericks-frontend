'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RichTextBody } from '@components/common/ui/RichTextBody';
import type { Service, FaqItem } from '@/lib/types';

interface ServiceDetailContentProps {
  service: Service;
}

function AnimatedFaqItem({ faq, isOpen, onToggle }: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
        isOpen
          ? 'border-secondary/40 bg-surface-container-lowest shadow-sm shadow-secondary/8'
          : 'border-outline-variant bg-surface-container-lowest hover:border-outline'
      }`}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left'
        aria-expanded={isOpen}
      >
        <span className='font-headline text-sm font-semibold text-on-surface'>
          {faq.question}
        </span>

        {/* Animated +/× icon */}
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            isOpen
              ? 'bg-secondary text-on-primary'
              : 'bg-surface-container-high text-outline'
          }`}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className='flex items-center justify-center font-label text-base font-bold leading-none'
          >
            +
          </motion.span>
        </span>
      </button>

      {/* Animated answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='answer'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <div className='border-t border-outline-variant px-5 pb-5 pt-4'>
              <p className='font-body text-sm leading-relaxed text-on-surface-variant'>
                {faq.answer || 'No answer provided.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatedFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (!faqs?.length) return null;

  return (
    <section className='mb-12'>
      {/* Section header */}
      <div className='mb-6 flex items-center justify-between'>
        <p className='font-label text-xs font-semibold uppercase tracking-widest text-outline'>
          Frequently asked questions
        </p>
        <span className='inline-flex items-center rounded-full bg-surface-container px-2.5 py-0.5 font-label text-xs font-medium text-on-surface-variant'>
          {faqs.length} {faqs.length === 1 ? 'question' : 'questions'}
        </span>
      </div>

      <div className='flex flex-col gap-2.5'>
        {faqs.map((faq) => (
          <AnimatedFaqItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}
      </div>
    </section>
  );
}

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const hasFaqs = service.faqs?.length > 0;

  return (
    <div id='content'>
      {/* Rich text body */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className='mb-12 prose-section'
      >
        <RichTextBody content={service.long_description} />
      </motion.section>

      {/* Divider */}
      {hasFaqs && (
        <div className='mb-12 h-px bg-gradient-to-r from-outline-variant via-outline-variant/50 to-transparent' />
      )}

      {/* Animated FAQ */}
      {hasFaqs && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <AnimatedFaqAccordion faqs={service.faqs} />
        </motion.div>
      )}
    </div>
  );
}
