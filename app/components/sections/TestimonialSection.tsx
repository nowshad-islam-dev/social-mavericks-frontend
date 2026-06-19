'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/normalizer';
import type { HomePage, Testimonial } from '@/lib/types';

type TestimonialProps = Pick<HomePage, 'testimonials_section_title'> & {
  testimonials: Testimonial[];
};

export default function Testimonial({
  testimonials_section_title,
  testimonials,
}: TestimonialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

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

            <div className='relative min-h-[220px] md:min-h-[180px] flex flex-col justify-between'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className='relative pl-8 border-l-2 border-secondary'
                >
                  <p className='text-xl italic text-primary leading-relaxed mb-4'>
                    &#34;{testimonials[currentIndex].quote}&#34;
                  </p>
                  <div className='flex items-center gap-4'>
                    <div className='relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200 border border-slate-200/50 shadow-sm'>
                      {testimonials[currentIndex].photo ? (
                        <Image
                          src={getImageUrl(testimonials[currentIndex].photo)!}
                          alt={testimonials[currentIndex].name}
                          fill
                          className='object-cover'
                          sizes='40px'
                        />
                      ) : (
                        <div className='flex items-center justify-center h-full w-full bg-secondary/10 text-secondary text-xs font-bold uppercase'>
                          {testimonials[currentIndex].name.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className='font-bold text-primary'>
                        {testimonials[currentIndex].name}
                      </div>
                      <div className='text-sm text-on-surface-variant'>
                        {testimonials[currentIndex].role_or_company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Indicators */}
              {testimonials.length > 1 && (
                <div className='flex items-center gap-2 mt-8 pl-8'>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? 'bg-secondary w-6'
                          : 'bg-outline-variant hover:bg-secondary/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
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
