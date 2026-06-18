'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCpu, FiTrendingUp, FiLayers } from 'react-icons/fi';
import { getImageUrl } from '@/lib/normalizer';
import { RichTextBody } from '@components/common/ui/RichTextBody';
import type { AboutPage } from '@/lib/types';
import FoundersSection from './FoundersSection';

type AboutClientProps = {
  about: AboutPage;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 15 } as const,
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutClient({ about }: AboutClientProps) {
  return (
    <main className='min-h-screen pt-32 pb-24 bg-background overflow-x-hidden text-on-surface'>
      {/* ── HERO SECTION ── */}
      <section className='relative max-w-7xl mx-auto px-8 py-12 md:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
          <motion.div
            className='lg:col-span-7'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <span className='inline-block px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary uppercase tracking-widest mb-6'>
              {about.title}
            </span>
            <h1 className='text-4xl md:text-6xl font-extrabold text-primary leading-tight tracking-tight mb-8'>
              {about.headline}
            </h1>
            <div className='h-1.5 w-24 bg-secondary rounded-full mb-8' />
            <div className='text-lg leading-relaxed text-on-surface-variant max-w-2xl font-body'>
              <RichTextBody content={about.description} />
            </div>
          </motion.div>

          <motion.div
            className='lg:col-span-5 relative h-[360px] flex items-center justify-center'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Card 1: AI Operations */}
            <motion.div
              className='absolute w-64 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xl z-20 backdrop-blur-md'
              style={{ x: -40, y: -40 }}
              animate={{ y: [-48, -32, -48] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className='flex items-center gap-3 mb-4'>
                <span className='p-2 rounded-lg bg-secondary/10 text-secondary'>
                  <FiCpu size={20} />
                </span>
                <span className='font-bold text-primary text-sm'>
                  AI Core Systems
                </span>
              </div>
              <p className='text-xs text-on-surface-variant leading-relaxed'>
                Autonomous agent integration mapping workflows and database
                connectors.
              </p>
            </motion.div>

            {/* Card 2: Custom Engineering */}
            <motion.div
              className='absolute w-64 p-6 rounded-2xl bg-primary border border-outline-variant/10 shadow-2xl z-10 text-on-primary'
              style={{ x: 50, y: 20 }}
              animate={{ y: [12, 28, 12] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: 'easeInOut',
              }}
            >
              <div className='flex items-center gap-3 mb-4'>
                <span className='p-2 rounded-lg bg-on-primary/10 text-on-primary'>
                  <FiLayers size={20} />
                </span>
                <span className='font-bold text-sm'>Custom Engineering</span>
              </div>
              <p className='text-xs text-on-primary-container leading-relaxed'>
                Robust full-stack systems, headless stores, and fast backend
                scaling.
              </p>
            </motion.div>

            {/* Card 3: Commercial Growth */}
            <motion.div
              className='absolute w-60 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-lg z-0'
              style={{ x: -100, y: 100 }}
              animate={{ y: [92, 108, 92] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
              <div className='flex items-center gap-2 mb-3'>
                <span className='p-1.5 rounded-lg bg-secondary/10 text-secondary'>
                  <FiTrendingUp size={16} />
                </span>
                <span className='font-bold text-primary text-xs'>
                  Revenue Ops
                </span>
              </div>
              <p className='text-[11px] text-on-surface-variant leading-relaxed'>
                Driving real revenue growth through strategic marketing.
              </p>
            </motion.div>

            <div className='absolute inset-0 bg-[radial-gradient(#0059ba_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none' />
          </motion.div>
        </div>
      </section>

      {/* ── METRICS / STATS SECTION ── */}
      <section className='bg-primary text-on-primary py-20 border-y border-outline-variant/10 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent pointer-events-none' />

        <div className='max-w-7xl mx-auto px-8 relative z-10'>
          <motion.div
            className='grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12'
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
          >
            {about.stats.map((stat, i) => (
              <motion.div
                key={i}
                className='text-center p-6 border-r last:border-0 border-on-primary/10'
                variants={fadeInUp}
              >
                <div className='text-4xl md:text-5xl font-extrabold text-on-primary mb-3 bg-clip-text bg-gradient-to-r from-on-primary to-primary-fixed-dim'>
                  {stat.value}
                </div>
                <div className='font-semibold text-sm text-secondary-fixed mb-1'>
                  {stat.label}
                </div>
                <div className='text-xs text-on-primary-container'>
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY / WHAT MAKES US DIFFERENT ── */}
      <section className='py-24 max-w-7xl mx-auto px-8'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className='text-xs font-bold text-secondary uppercase tracking-widest mb-3 block'>
            {about.philosophy_title}
          </span>
          <h2 className='text-3xl md:text-4xl font-extrabold text-primary tracking-tight'>
            {about.philosophy_heading}
          </h2>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-3'>
          {about.difference_points?.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='rounded-2xl border border-outline-variant/30 bg-surface-container-low/50 p-8 hover:border-secondary/40 hover:bg-surface-container hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300'
            >
              <div className='w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 font-bold text-lg'>
                {index + 1}
              </div>
              <h3 className='font-headline text-lg font-bold text-primary mb-3'>
                {point.title}
              </h3>
              <p className='font-body text-sm leading-relaxed text-on-surface-variant'>
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE STORY TIMELINE SECTION ── */}
      <section className='py-24 bg-surface-container-low/40 border-y border-outline-variant/20 relative'>
        <div className='max-w-7xl mx-auto px-8'>
          <motion.div
            className='text-center mb-20'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className='text-xs font-bold text-secondary uppercase tracking-widest mb-3 block'>
              {about.timeline_title}
            </span>
            <h2 className='text-3xl md:text-4xl font-extrabold text-primary tracking-tight'>
              {about.timeline_heading}
            </h2>
          </motion.div>

          <div className='relative max-w-4xl mx-auto'>
            <div className='absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[2px] bg-outline-variant/40 hidden md:block' />

            <div className='space-y-12 md:space-y-20 relative'>
              {about.milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    <motion.div
                      className='w-full md:w-1/2 flex justify-center'
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className='w-full max-w-md bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-md relative group hover:border-secondary/30 transition-colors duration-300'>
                        <span className='text-4xl font-black text-secondary/20 group-hover:text-secondary/40 transition-colors duration-300 absolute top-4 right-6'>
                          {milestone.year}
                        </span>
                        <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary mb-4'>
                          {milestone.year} Milestone
                        </span>
                        <h4 className='text-xl font-bold text-primary mb-3'>
                          {milestone.title}
                        </h4>
                        <p className='text-sm text-on-surface-variant leading-relaxed'>
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>

                    <div className='absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background z-10 hidden md:block' />
                    <div className='w-full md:w-1/2 hidden md:block' />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR METHOD / WORKFLOW STEP CARDS ── */}
      <section className='py-24 max-w-7xl mx-auto px-8'>
        <motion.div
          className='text-center mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className='text-xs font-bold text-secondary uppercase tracking-widest mb-3 block'>
            {about.method_title}
          </span>
          <h2 className='text-3xl md:text-4xl font-extrabold text-primary tracking-tight'>
            {about.method_heading}
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {about.workflow_steps.map((step, i) => (
            <motion.div
              key={i}
              className='relative p-8 rounded-2xl bg-surface-container-low/40 border border-outline-variant/30 flex flex-col items-start hover:border-secondary/40 hover:bg-surface-container transition-all duration-300 group'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className='absolute top-4 right-6 font-bold text-3xl text-outline-variant/30 group-hover:text-secondary/10 transition-colors duration-300'>
                {step.num}
              </span>
              <div className='p-3 bg-secondary/10 rounded-xl mb-6 group-hover:bg-secondary group-hover:text-on-secondary text-secondary transition-all duration-300'>
                <Image
                  src={getImageUrl(step.icon)!}
                  alt={step.title}
                  height={18}
                  width={18}
                />
              </div>
              <h4 className='text-lg font-bold text-primary mb-3'>
                {step.title}
              </h4>
              <p className='text-xs text-on-surface-variant leading-relaxed'>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MEET THE FOUNDERS SECTION ── */}
      <FoundersSection
        founders={about.founders}
        title={about.founders_title}
        heading={about.founders_heading}
        description={about.founders_description}
      />

      {/* ── ELEVATED GRADIENT CTA SECTION ── */}
      <section className='py-20 max-w-7xl mx-auto px-8'>
        <motion.div
          className='bg-gradient-to-br from-primary via-primary to-tertiary-container rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl border border-outline-variant/10'
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Radial decorative background grids */}
          <div className='absolute inset-0 bg-[radial-gradient(#0059ba_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-10 pointer-events-none' />

          <div className='relative z-10 max-w-3xl'>
            <span className='inline-block px-3 py-1 rounded-full text-xs font-bold bg-secondary/70 text-on-primary-fixed mb-6 uppercase tracking-widest'>
              {about.gradient_cta_title}
            </span>
            <h2 className='text-4xl md:text-5xl font-extrabold text-on-primary mb-6 leading-tight tracking-tight'>
              {about.gradient_cta_heading}
            </h2>
            <p className='text-on-primary-container text-lg mb-10 leading-relaxed font-body'>
              {about.gradient_cta_description}
            </p>

            <div className='flex flex-wrap gap-4'>
              <Link
                href='/contact'
                className='group inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3.5 font-semibold text-sm text-on-primary transition-all duration-300 hover:bg-secondary-container hover:shadow-lg hover:shadow-secondary/20'
              >
                Get in touch
                <FiArrowRight className='group-hover:translate-x-1 transition-transform' />
              </Link>
              <Link
                href='/services'
                className='inline-flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-on-primary/5 px-6 py-3.5 font-semibold text-sm text-on-primary hover:bg-on-primary/10 transition-colors duration-300'
              >
                View our services
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
