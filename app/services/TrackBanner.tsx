'use client';

import { motion } from 'framer-motion';
import {
  FaCode,
  FaCogs,
  FaDatabase,
  FaLayerGroup,
  FaServer,
  FaMobileAlt,
  FaSearchDollar,
  FaShoppingCart,
} from 'react-icons/fa';
import {
  FaChartLine,
  FaRobot,
  FaBullhorn,
  FaMagnifyingGlassChart,
} from 'react-icons/fa6';
import type { Track } from '@/lib/types';
import { ServiceCardGrid } from './ServiceCardGrid';

interface TrackBannerProps {
  track: Track;
  index: number;
}

const buildIcons = [
  FaCode,
  FaCogs,
  FaDatabase,
  FaLayerGroup,
  FaServer,
  FaMobileAlt,
];
const growthIcons = [
  FaChartLine,
  FaRobot,
  FaSearchDollar,
  FaBullhorn,
  FaShoppingCart,
  FaMagnifyingGlassChart,
];

function IconComposition({ isGrowth }: { isGrowth: boolean }) {
  const icons = isGrowth ? growthIcons : buildIcons;

  const positions = [
    { top: '10%', left: '15%' },
    { top: '8%', right: '20%' },
    { top: '50%', left: '5%' },
    { top: '50%', right: '8%' },
    { bottom: '12%', left: '20%' },
    { bottom: '10%', right: '15%' },
  ];

  return (
    <div aria-hidden className='relative h-48 w-full'>
      {/* Central decorative blob */}
      <div
        className={`absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${
          isGrowth ? 'bg-secondary/30' : 'bg-primary-fixed-dim/20'
        }`}
      />

      {/* Center icon */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-xl ${
          isGrowth
            ? 'bg-secondary text-on-primary shadow-secondary/40'
            : 'bg-primary-fixed-dim text-primary shadow-primary-fixed-dim/40'
        }`}
      >
        {isGrowth ? <FaChartLine size={24} /> : <FaCode size={24} />}
      </motion.div>

      {/* Orbiting icon pills */}
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border shadow-md ${
            isGrowth
              ? 'border-secondary/30 bg-surface-container-lowest/90 text-secondary'
              : 'border-primary-fixed-dim/30 bg-surface-container-lowest/90 text-on-primary-container'
          }`}
          style={positions[i] as React.CSSProperties}
        >
          <Icon size={16} />
        </motion.div>
      ))}

      {/* Connecting lines (decorative) */}
      <svg
        className='absolute inset-0 h-full w-full opacity-10'
        viewBox='0 0 200 100'
        preserveAspectRatio='none'
      >
        <line
          x1='50'
          y1='50'
          x2='30'
          y2='20'
          stroke='currentColor'
          strokeWidth='0.5'
        />
        <line
          x1='50'
          y1='50'
          x2='75'
          y2='15'
          stroke='currentColor'
          strokeWidth='0.5'
        />
        <line
          x1='50'
          y1='50'
          x2='15'
          y2='50'
          stroke='currentColor'
          strokeWidth='0.5'
        />
        <line
          x1='50'
          y1='50'
          x2='85'
          y2='55'
          stroke='currentColor'
          strokeWidth='0.5'
        />
        <line
          x1='50'
          y1='50'
          x2='30'
          y2='82'
          stroke='currentColor'
          strokeWidth='0.5'
        />
        <line
          x1='50'
          y1='50'
          x2='72'
          y2='85'
          stroke='currentColor'
          strokeWidth='0.5'
        />
      </svg>
    </div>
  );
}

export function TrackBanner({ track, index }: TrackBannerProps) {
  const isGrowth = track.slug === 'growth';

  return (
    <motion.section
      id={`track-${track.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.1 }}
      className='mb-16'
    >
      {/* Track Banner Header */}
      <div
        className={`relative overflow-hidden rounded-2xl p-8 md:p-10 ${
          isGrowth
            ? 'bg-gradient-to-br from-secondary-container to-secondary'
            : 'bg-gradient-to-br from-primary-container to-primary'
        }`}
      >
        {/* Background texture */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-5'
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className='relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
          {/* Left: Text content */}
          <div className='flex-1 max-w-lg'>
            {/* Track label pill */}
            <span
              className={`mb-4 inline-flex items-center rounded-full px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest ${
                isGrowth
                  ? 'bg-on-primary/15 text-on-primary'
                  : 'bg-primary-fixed-dim/15 text-primary-fixed-dim'
              }`}
            >
              {track.label}
            </span>

            <h2
              className={`mb-3 font-headline text-2xl font-extrabold leading-tight md:text-3xl ${
                isGrowth ? 'text-on-primary' : 'text-primary-fixed-dim'
              }`}
            >
              {track.tagline}
            </h2>

            <p
              className={`mb-4 font-body text-sm leading-relaxed ${
                isGrowth ? 'text-on-primary/80' : 'text-on-primary-container'
              }`}
            >
              {track.description}
            </p>

            {/* Badge pill */}
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 font-label text-xs font-medium ${
                isGrowth
                  ? 'border-on-primary/20 bg-on-primary/10 text-on-primary/90'
                  : 'border-primary-fixed-dim/20 bg-primary-fixed-dim/10 text-primary-fixed-dim'
              }`}
            >
              {track.badge}
            </span>
          </div>

          {/* Right: Icon composition */}
          <div className='w-full flex-shrink-0 md:w-64'>
            <IconComposition isGrowth={isGrowth} />
          </div>
        </div>
      </div>

      {/* Services grid below banner */}
      <div className='mt-6'>
        <ServiceCardGrid services={track.services} isGrowth={isGrowth} />
      </div>
    </motion.section>
  );
}
