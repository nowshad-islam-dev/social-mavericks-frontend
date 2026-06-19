'use client';

import { motion } from 'framer-motion';
import { ServiceCard } from '@components/common/cards/ServiceCard';
import type { Service } from '@/lib/types';

interface RelatedServicesProps {
  services: Service[];
  isGrowth: boolean;
  trackLabel: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 16 },
  },
};

export function RelatedServices({ services, isGrowth, trackLabel }: RelatedServicesProps) {
  if (!services.length) return null;

  return (
    <section className='mb-16'>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='mb-8 flex items-end justify-between gap-4'
      >
        <div>
          <p className='mb-1 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
            More from {trackLabel}
          </p>
          <h2 className='font-headline text-xl font-bold text-on-surface sm:text-2xl'>
            Related services
          </h2>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-60px' }}
        className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
      >
        {services.map((service) => (
          <motion.div key={service.documentId} variants={cardVariants}>
            <ServiceCard service={service} isGrowth={isGrowth} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
