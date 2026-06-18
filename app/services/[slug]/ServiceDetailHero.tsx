'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';
import { TrackBreadcrumb } from '@components/common/ui/Breadcrumb';
import { Tag, PricingBadge } from '@components/common/ui/Badge';
import { getImageUrl } from '@/lib/normalizer';
import type { Service } from '@/lib/types';

interface ServiceDetailHeroProps {
  service: Service;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' } as const,
  },
};

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const isGrowth = service.track?.slug === 'growth';

  return (
    <section className='relative overflow-hidden bg-primary pt-32 pb-0'>
      {/* Background radial glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,89,186,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Background dot grid */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.035]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className='relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16'>
          {/* ── Left: Text content ── */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='flex-1 pb-12 lg:pb-20'
          >
            {/* Breadcrumb */}
            <motion.div variants={itemVariants} className='mb-6'>
              <TrackBreadcrumb track={service.track} />
            </motion.div>

            {/* Differentiator badge */}
            {service.is_differentiator && (
              <motion.div variants={itemVariants} className='mb-3'>
                <span className='inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-label text-xs font-semibold text-on-primary'>
                  <FaStar size={10} />
                  Differentiator
                </span>
              </motion.div>
            )}

            {/* Track label pill */}
            <motion.div variants={itemVariants} className='mb-4'>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 font-label text-xs font-bold uppercase tracking-widest ${
                  isGrowth
                    ? 'bg-secondary/20 text-secondary-fixed-dim'
                    : 'bg-primary-fixed-dim/15 text-primary-fixed-dim'
                }`}
              >
                {service.track?.label}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className='mb-4 font-headline text-3xl font-extrabold leading-tight text-on-primary sm:text-4xl lg:text-5xl'
            >
              {service.title}
            </motion.h1>

            {/* Short description */}
            <motion.p
              variants={itemVariants}
              className='mb-6 max-w-lg font-body text-base leading-relaxed text-on-primary-container'
            >
              {service.short_description}
            </motion.p>

            {/* Pricing + tags */}
            <motion.div
              variants={itemVariants}
              className='flex flex-wrap items-center gap-2'
            >
              <PricingBadge pricing={service.pricing} />
              {service.tags?.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </motion.div>

            {/* Mobile CTA */}
            <motion.div
              variants={itemVariants}
              className='mt-8 flex flex-wrap gap-3 lg:hidden'
            >
              <Link
                href='#content'
                className='inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-label text-sm font-semibold text-on-primary hover:opacity-90'
              >
                Read more ↓
              </Link>
              <Link
                href='/services'
                className='inline-flex items-center gap-2 rounded-lg border border-primary-fixed-dim/30 px-5 py-2.5 font-label text-sm font-medium text-primary-fixed-dim hover:border-primary-fixed-dim/60'
              >
                All services
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: Cover image ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.25 }}
            className='relative w-full lg:w-[480px] lg:shrink-0'
          >
            {/* Decorative glow behind image */}
            <div
              aria-hidden
              className='absolute -inset-4 rounded-3xl blur-2xl'
              style={{
                background: isGrowth
                  ? 'radial-gradient(ellipse, rgba(0,89,186,0.35) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse, rgba(188,199,222,0.15) 0%, transparent 70%)',
              }}
            />

            <div className='relative overflow-hidden rounded-2xl shadow-2xl shadow-black/30'>
              {/* Gradient overlay at bottom */}
              <div className='absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-primary/60 to-transparent' />

              <Image
                src={getImageUrl(service.cover_photo)!}
                alt={`Cover image for ${service.title}`}
                width={1200}
                height={630}
                className='h-auto w-full object-cover'
                priority
              />
            </div>

            {/* Bottom tab that merges into content below */}
            <div
              className='h-8 w-full bg-background'
              style={{ marginTop: '-1px' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Smooth transition to content background */}
      <div className='absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background' />
    </section>
  );
}
