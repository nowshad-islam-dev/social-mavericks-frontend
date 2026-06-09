'use client';

import Image from 'next/image';
import { IoMdCart, IoMdAnalytics } from 'react-icons/io';
import { ImDatabase } from 'react-icons/im';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { motion } from 'framer-motion';
import type { HomePage } from '@/lib/types';

type ServiceProps = Pick<
  HomePage,
  'services_section_title' | 'services_section_description'
>;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
  },
};

export default function Service({
  services_section_title,
  services_section_description,
}: ServiceProps) {
  return (
    <section className='py-24 bg-surface-container-low overflow-hidden'>
      <div className='max-w-7xl mx-auto px-8'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col md:flex-row justify-between items-end mb-16 gap-8'
        >
          <div className='max-w-2xl'>
            <h2 className='text-3xl md:text-5xl font-extrabold text-primary mb-6'>
              {services_section_title}
            </h2>
            <p className='text-on-surface-variant text-lg'>
              {services_section_description}
            </p>
          </div>
          <div className='hidden md:block w-32 h-px bg-outline-variant/30 mb-4'></div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-12 gap-6'
        >
          {/* E-commerce */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,89,186,0.12)' }}
            className='md:col-span-8 bg-surface-container-lowest p-12 rounded-xl flex flex-col md:flex-row gap-8 items-center border border-outline-variant/30 hover:border-secondary/20 transition-all duration-300'
          >
            <div className='w-full md:w-1/2 space-y-4 shrink-0'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed text-secondary text-2xl'>
                <IoMdCart />
              </div>
              <h3 className='text-2xl font-bold text-primary'>
                High-Performance E-commerce
              </h3>
              <p className='text-on-surface-variant leading-relaxed'>
                Headless commerce solutions that prioritize lightning-fast load
                times and conversion engineering for global retail brands.
              </p>
            </div>
            <div className='relative w-full md:w-1/2 aspect-video p-4 rounded-lg overflow-hidden bg-surface-container-low/50 flex items-center justify-center'>
              <Image
                alt='E-commerce data'
                className='rounded shadow-sm object-contain'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                src='/ecommerce-data.svg'
              />
            </div>
          </motion.div>

          {/* Automation */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)' }}
            className='md:col-span-4 bg-primary text-on-primary p-12 rounded-xl flex flex-col justify-between border border-transparent transition-all duration-300'
          >
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-on-secondary text-2xl'>
              <MdOutlineSettingsSuggest />
            </div>
            <div className='mt-12'>
              <h3 className='text-2xl font-bold mb-4'>
                Intelligent Automation
              </h3>
              <p className='text-on-primary-container text-sm leading-relaxed'>
                Eliminate bottlenecks with custom workflow logic and
                machine-learning integrations.
              </p>
            </div>
          </motion.div>

          {/* ERP */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,89,186,0.12)' }}
            className='md:col-span-4 bg-surface-container-lowest p-12 rounded-xl border border-outline-variant/30 hover:border-secondary/20 transition-all duration-300 flex flex-col justify-between'
          >
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed text-secondary text-2xl'>
              <ImDatabase />
            </div>
            <div className='mt-12'>
              <h3 className='text-2xl font-bold text-primary mb-4'>
                Enterprise Resource Planning
              </h3>
              <p className='text-on-surface-variant text-sm leading-relaxed'>
                Centralized technical architecture for complex organizational
                logistics and data ledgering.
              </p>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,89,186,0.12)' }}
            className='md:col-span-8 bg-surface-container-highest p-12 rounded-xl flex items-center justify-between overflow-hidden border border-outline-variant/30 hover:border-secondary/20 transition-all duration-300'
          >
            <div className='max-w-xs space-y-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed text-secondary text-2xl'>
                <IoMdAnalytics />
              </div>
              <h3 className='text-2xl font-bold text-primary mb-4'>
                Precision Analytics
              </h3>
              <p className='text-on-surface-variant text-sm leading-relaxed'>
                Deep-dive reporting that treats data like a blueprint, ensuring
                every insight is actionable and verified.
              </p>
            </div>
            <div className='w-48 h-48 rotate-12 opacity-15 text-primary flex items-center justify-center shrink-0'>
              <IoMdAnalytics size={160} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
