'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendlyButton } from '@components/common/ui/Button';
import { MdRocketLaunch } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';

export function ServicesCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div
        className='relative overflow-hidden rounded-2xl p-10 md:p-14'
        style={{
          background:
            'linear-gradient(135deg, #091426 0%, #1e293b 40%, #0059ba 100%)',
        }}
      >
        {/* Radial glow blob */}
        <div
          aria-hidden
          className='pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full'
          style={{
            background:
              'radial-gradient(circle, rgba(0,89,186,0.5) 0%, transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full'
          style={{
            background:
              'radial-gradient(circle, rgba(188,199,222,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Background dot grid */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.04]'
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className='relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
          {/* Left — text */}
          <div className='max-w-lg'>
            {/* Icon */}
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shadow-lg shadow-secondary/30'>
              <MdRocketLaunch size={22} className='text-on-primary' />
            </div>

            <h2 className='mb-3 font-headline text-2xl font-extrabold leading-tight text-on-primary md:text-3xl'>
              Not sure which track fits you?
            </h2>
            <p className='font-body text-sm leading-relaxed text-on-primary-container'>
              Tell us your problem. We&apos;ll tell you what makes sense —{' '}
              <span className='font-medium text-primary-fixed-dim'>
                no pitch, no pressure.
              </span>{' '}
              Just a clear, honest conversation about your goals.
            </p>
          </div>

          {/* Right — buttons */}
          <div className='flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center'>
            <CalendlyButton />
            <Link
              href='/gallery'
              className='group inline-flex items-center gap-2 rounded-lg border border-primary-fixed-dim/30 px-6 py-2.5 font-label text-sm font-medium text-primary-fixed-dim transition-all duration-200 hover:border-primary-fixed-dim/60 hover:bg-primary-fixed-dim/10'
            >
              See our work
              <FaArrowRight className='transition-transform duration-200 group-hover:translate-x-1' size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
