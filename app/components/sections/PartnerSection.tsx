'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/normalizer';
import type { Partner } from '@/lib/types';

type PartnerProps = {
  partners: Partner[];
};

export default function Partners({ partners }: PartnerProps) {
  if (!partners || partners.length === 0) return null;

  // Duplicate the list to ensure a continuous infinite loop
  let displayPartners = partners;
  if (partners.length > 0 && partners.length < 6) {
    displayPartners = [...partners, ...partners, ...partners];
  }

  // Helper function to render each partner card
  const renderPartnerCard = (partner: Partner, keySuffix: string) => {
    const cardContent = (
      <div className='flex items-center justify-center w-56 h-28 bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/30 rounded-2xl transition-all duration-300 hover:border-secondary/40 hover:bg-surface-container hover:shadow-lg hover:shadow-secondary/5 group/card relative overflow-hidden shrink-0'>
        <div className='relative w-36 h-14'>
          {partner.logo ? (
            <Image
              src={getImageUrl(partner.logo)!}
              alt={partner.name}
              fill
              className='object-contain grayscale opacity-80 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-300'
              sizes='160px'
            />
          ) : (
            <span className='font-bold text-on-surface-variant text-sm'>{partner.name}</span>
          )}
        </div>
      </div>
    );

    if (partner.website) {
      return (
        <Link
          href={partner.website}
          key={`${partner.id}-${keySuffix}`}
          target='_blank'
          rel='noopener noreferrer'
          className='block shrink-0'
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div key={`${partner.id}-${keySuffix}`} className='block shrink-0'>
        {cardContent}
      </div>
    );
  };

  return (
    <section className='py-20 bg-surface overflow-hidden relative border-y border-outline-variant/20'>
      <div className='max-w-7xl mx-auto px-8 mb-12 text-center'>
        <p className='text-sm font-bold text-secondary uppercase tracking-widest mb-3'>
          Trusted Collaborations
        </p>
        <h2 className='text-2xl font-extrabold text-primary md:text-3xl tracking-tight'>
          Powering growth for companies worldwide
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className='relative w-full flex overflow-hidden py-4'>
        {/* Edge Gradient Mask overlays for smooth fade edges */}
        <div className='absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none' />

        {/* Marquee Track (Double Rendered for Seamless Loop) using Framer Motion */}
        <motion.div
          className='flex gap-8 shrink-0 min-w-full justify-around pr-8'
          animate={{ x: [0, '-100%'] }}
          transition={{
            ease: 'linear',
            duration: 30,
            repeat: Infinity,
          }}
        >
          {displayPartners.map((partner, index) => renderPartnerCard(partner, `first-${index}`))}
        </motion.div>
        <motion.div
          className='flex gap-8 shrink-0 min-w-full justify-around pr-8'
          aria-hidden='true'
          animate={{ x: [0, '-100%'] }}
          transition={{
            ease: 'linear',
            duration: 30,
            repeat: Infinity,
          }}
        >
          {displayPartners.map((partner, index) => renderPartnerCard(partner, `second-${index}`))}
        </motion.div>
      </div>
    </section>
  );
}
