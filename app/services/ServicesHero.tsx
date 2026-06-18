'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaChartLine,
  FaRobot,
  FaShoppingCart,
  FaCogs,
  FaSearchDollar,
} from 'react-icons/fa';
import { MdRocketLaunch } from 'react-icons/md';
import { FaArrowDown } from 'react-icons/fa6';

const floatingIcons = [
  {
    icon: FaCode,
    top: '10%',
    left: '8%',
    size: 28,
    delay: 0,
    color: 'text-secondary-fixed',
  },
  {
    icon: FaRobot,
    top: '18%',
    right: '12%',
    size: 36,
    delay: 0.3,
    color: 'text-primary-fixed-dim',
  },
  {
    icon: FaChartLine,
    top: '55%',
    left: '5%',
    size: 24,
    delay: 0.6,
    color: 'text-secondary-fixed',
  },
  {
    icon: FaShoppingCart,
    top: '70%',
    right: '8%',
    size: 28,
    delay: 0.2,
    color: 'text-primary-fixed-dim',
  },
  {
    icon: FaCogs,
    top: '38%',
    right: '4%',
    size: 20,
    delay: 0.8,
    color: 'text-outline',
  },
  {
    icon: FaSearchDollar,
    top: '42%',
    left: '2%',
    size: 22,
    delay: 0.5,
    color: 'text-outline',
  },
  {
    icon: MdRocketLaunch,
    top: '80%',
    left: '15%',
    size: 20,
    delay: 1.0,
    color: 'text-primary-fixed-dim',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' } as const,
  },
};

export function ServicesHero() {
  return (
    <section className='relative overflow-hidden bg-primary min-h-[60vh] flex items-center'>
      {/* Radial background glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,89,186,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Floating icons — decorative */}
      {floatingIcons.map(({ icon: Icon, size, delay, color, ...pos }, i) => (
        <motion.div
          aria-hidden
          key={i}
          className={`pointer-events-none absolute opacity-20 ${color}`}
          style={pos as React.CSSProperties}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay,
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      <div className='relative mx-auto max-w-5xl w-full px-6 py-24 lg:px-8'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='max-w-2xl'
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary-fixed-dim/30 bg-primary-fixed-dim/10 px-4 py-1.5 font-label text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim'
          >
            What we do
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className='mb-6 font-headline text-4xl font-extrabold leading-tight text-on-primary sm:text-5xl lg:text-6xl'
          >
            We build and grow{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, #acc7ff 0%, #0059ba 60%, #bcc7de 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              digital businesses
            </span>{' '}
            —{' '}
            <span className='text-primary-fixed-dim'>with AI at the core.</span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            variants={itemVariants}
            className='mb-10 max-w-lg font-body text-base leading-relaxed text-on-primary-container'
          >
            Whether you need a system built from scratch or your existing
            business scaled faster, we handle both ends — and connect them. Most
            agencies do one or the other.{' '}
            <span className='font-semibold text-on-primary'>We do both.</span>
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={itemVariants}
            className='flex flex-wrap items-center gap-4'
          >
            <Link
              href='#tracks'
              className='group inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-label text-sm font-semibold text-on-primary transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-secondary/30'
            >
              Explore our services
              <FaArrowDown className='transition-transform duration-300 group-hover:translate-y-1' />
            </Link>
            <Link
              href='/gallery'
              className='inline-flex items-center gap-2 rounded-lg border border-primary-fixed-dim/30 px-6 py-3 font-label text-sm font-semibold text-primary-fixed-dim transition-all duration-200 hover:border-primary-fixed-dim/60 hover:bg-primary-fixed-dim/10'
            >
              See our work
            </Link>
          </motion.div>
        </motion.div>

        {/* Right side icon composition — large decorative */}
        <div
          aria-hidden
          className='pointer-events-none absolute right-0 top-0 h-full w-1/3 hidden lg:flex items-center justify-center'
        >
          <div className='relative w-72 h-72'>
            {/* Central glow ring */}
            <div
              className='absolute inset-0 rounded-full'
              style={{
                background:
                  'radial-gradient(circle, rgba(0,89,186,0.25) 0%, transparent 70%)',
              }}
            />
            {/* Icon cluster */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className='absolute inset-0'
            >
              {[
                FaCode,
                FaRobot,
                FaChartLine,
                FaShoppingCart,
                FaCogs,
                MdRocketLaunch,
              ].map((Icon, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const r = 110;
                const x = `${(50 + (Math.cos(angle) * r) / 2.88).toFixed(2)}%`;
                const y = `${(50 + (Math.sin(angle) * r) / 2.88).toFixed(2)}%`;
                return (
                  <div
                    key={i}
                    className='absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-primary-fixed-dim/20 bg-primary-container/60 text-primary-fixed-dim shadow-lg'
                    style={{ left: x, top: y }}
                  >
                    <Icon size={20} />
                  </div>
                );
              })}
            </motion.div>
            {/* Center icon */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-on-primary shadow-xl shadow-secondary/40'>
                <MdRocketLaunch size={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
