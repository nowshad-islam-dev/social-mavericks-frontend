'use client';

import { motion } from 'framer-motion';
import { ServiceCard } from '@components/common/cards/ServiceCard';
import type { Service } from '@/lib/types';
import { EmptyState } from '@components/EmptyState';

interface ServiceCardGridProps {
  services: Service[];
  isGrowth: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 16 },
  },
};

export function ServiceCardGrid({ services, isGrowth }: ServiceCardGridProps) {
  if (!services?.length) {
    return <EmptyState message='No services listed yet.' />;
  }

  return (
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
  );
}
