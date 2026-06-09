'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/normalizer';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { CalendlyButton } from '@components/common/ui/Button';
import type { HomePage } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

type HeroProps = Pick<
  HomePage,
  | 'hero_title_first'
  | 'hero_title_second'
  | 'hero_subtitle'
  | 'hero_cta_label'
  | 'hero_background_image'
>;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } as const,
  },
};

export default function Hero({
  hero_title_first,
  hero_title_second,
  hero_subtitle,
  hero_cta_label,
  hero_background_image,
}: HeroProps) {
  return (
    <section className='relative pt-32 pb-24 mt-8 overflow-hidden bg-background'>
      {/* Decorative Background Blob */}
      <div className='absolute -top-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute top-20 right-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none' />

      <div className='max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 relative z-10'>
        {/* Left Side: Staggered Content */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='w-full md:w-3/5 space-y-8'
        >
          {/* Tag badge */}
          <motion.div
            variants={fadeUpVariants}
            className='inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-container text-on-primary-container text-xs font-bold tracking-widest uppercase rounded-lg border border-slate-700/35 shadow-sm'
          >
            <span className='w-2 h-2 bg-secondary rounded-full animate-pulse' />
            Engineering Performance
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUpVariants}
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary capitalize leading-[1.1] tracking-tight'
          >
            {hero_title_first}{' '}
            <span className='text-secondary relative inline-block'>
              {hero_title_second}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                className='absolute bottom-1 left-0 h-1 bg-secondary/20 rounded-full'
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className='text-lg text-on-surface-variant max-w-xl leading-relaxed font-body'
          >
            {hero_subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className='flex flex-wrap items-center gap-6 pt-4'
          >
            <CalendlyButton label={hero_cta_label} />
            <motion.button 
              whileHover={{ x: 4 }}
              className='flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors duration-200'
            >
              <Link href='/services'>Explore Services</Link>
              <FaLongArrowAltRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side: Layered Graphic */}
        <div className='w-full md:w-2/5 flex justify-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className='relative w-full aspect-square max-w-[420px]'
          >
            {/* Main Image container with border glow */}
            <div className='relative bg-surface-container-high aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 group'>
              <Image
                alt='Hero Background'
                className='object-cover mix-blend-overlay opacity-70 group-hover:scale-105 transition-transform duration-700'
                fill
                sizes='(max-width: 1200px) 40vw, 420px'
                src={getImageUrl(hero_background_image)!}
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10' />
            </div>

            {/* Floating system card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 70 }}
              className='absolute -bottom-6 -left-6 right-6 bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200/40'
            >
              <div className='text-[10px] font-mono text-secondary mb-2 tracking-widest uppercase flex justify-between items-center'>
                <span>system_status_v4.2</span>
                <span className='h-2 w-2 rounded-full bg-emerald-500 animate-ping' />
              </div>
              <div className='flex justify-between items-end'>
                <div className='text-3xl font-extrabold text-primary tracking-tight'>99.9%</div>
                <div className='w-24 h-8 bg-surface-container-low/60 rounded flex items-end gap-1 px-2.5 py-1.5 border border-slate-100'>
                  <motion.div animate={{ height: ['30%', '80%', '30%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className='w-2 bg-secondary rounded-sm' />
                  <motion.div animate={{ height: ['50%', '95%', '50%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} className='w-2 bg-secondary rounded-sm' />
                  <motion.div animate={{ height: ['20%', '60%', '20%'] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className='w-2 bg-secondary rounded-sm' />
                  <motion.div animate={{ height: ['40%', '90%', '40%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }} className='w-2 bg-secondary rounded-sm' />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
