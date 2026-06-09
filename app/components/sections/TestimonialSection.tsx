'use client';

import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/normalizer';
import type { HomePage, Testimonial } from '@/lib/types';

type TestimonialProps = Pick<HomePage, 'testimonials_section_title'> & {
  testimonials: Testimonial[];
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 15 },
  },
};

export default function Testimonial({
  testimonials_section_title,
  testimonials,
}: TestimonialProps) {
  return (
    <section className='py-24 bg-surface-container-low overflow-hidden'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-3xl font-extrabold text-primary mb-8'
            >
              {testimonials_section_title}
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              className='space-y-12'
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className='relative pl-8 border-l-2 border-secondary'
                >
                  <p className='text-xl italic text-primary leading-relaxed mb-4'>
                    &#34;{testimonial.quote}&#34;
                  </p>
                  <div className='flex items-center gap-4'>
                    <div className='relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200 border border-slate-200/50 shadow-sm'>
                      {testimonial.photo ? (
                        <Image
                          src={getImageUrl(testimonial.photo)!}
                          alt={testimonial.name}
                          fill
                          className='object-cover'
                          sizes='40px'
                        />
                      ) : (
                        <div className='flex items-center justify-center h-full w-full bg-secondary/10 text-secondary text-xs font-bold uppercase'>
                          {testimonial.name.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className='font-bold text-primary'>
                        {testimonial.name}
                      </div>
                      <div className='text-sm text-on-surface-variant'>
                        {testimonial.role_or_company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Graphic Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
            className='hidden md:flex justify-center'
          >
            <div className='relative w-80 h-80'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className='absolute inset-0 border-[0.5px] border-outline-variant/60 rotate-45 rounded-2xl'
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className='absolute inset-4 border-[0.5px] border-secondary/20 -rotate-12 rounded-xl'
              ></motion.div>
              <div className='absolute inset-0 flex items-center justify-center text-secondary/10'>
                <MdVerified size={128} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
