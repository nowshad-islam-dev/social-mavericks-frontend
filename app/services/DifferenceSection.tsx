'use client';

import { motion } from 'framer-motion';
import { DifferencePointCard } from '@components/common/cards/DifferencePointCard';
import type { DifferencePoint } from '@/lib/types';

interface DifferenceSectionProps {
  points: DifferencePoint[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 16 },
  },
};

export function DifferenceSection({ points }: DifferenceSectionProps) {
  if (!points?.length) return null;

  return (
    <section className='mb-20'>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className='mb-10'
      >
        <p className='mb-2 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
          Why this matters
        </p>
        <h2 className='font-headline text-2xl font-bold text-on-background sm:text-3xl'>
          What makes us{' '}
          <span className='text-secondary'>different</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-60px' }}
        className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
      >
        {points.map((point, index) => (
          <motion.div key={point.id} variants={cardVariants}>
            <DifferencePointCard point={point} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
