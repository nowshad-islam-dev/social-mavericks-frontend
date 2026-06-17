'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { getImageUrl } from '@/lib/normalizer';
import type { Founder } from '@/lib/types';

type FoundersSectionProps = {
  founders: Founder[];
  title: string;
  heading: string;
  description: string;
};

export default function FoundersSection({
  founders,
  title,
  heading,
  description,
}: FoundersSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!founders || founders.length === 0) return null;

  // Render a founder profile picture
  const renderProfilePhoto = (founder: Founder) => {
    const photoUrl = founder.profile_photo ? getImageUrl(founder.profile_photo) : null;

    return (
      <div className='w-20 h-20 rounded-2xl border-2 border-outline-variant/30 overflow-hidden bg-surface-container-low shrink-0 relative shadow-inner'>
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={founder.name}
            fill
            className='object-cover'
            sizes='80px'
          />
        ) : (
          <div className='flex items-center justify-center h-full w-full bg-secondary/10 text-secondary text-2xl font-black uppercase'>
            {founder.initials || founder.name.slice(0, 2)}
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 pointer-events-none' />
      </div>
    );
  };

  // Render social links
  const renderSocials = (founder: Founder, isRightAligned = false) => {
    return (
      <div className={`flex items-center gap-4 ${isRightAligned ? 'justify-end' : 'justify-start'}`}>
        {founder.github && (
          <Link
            href={founder.github}
            target='_blank'
            rel='noopener noreferrer'
            className='text-on-surface-variant hover:text-primary transition-colors p-1'
            aria-label={`${founder.name} GitHub`}
          >
            <FiGithub size={16} />
          </Link>
        )}
        {founder.linkedin && (
          <Link
            href={founder.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='text-on-surface-variant hover:text-secondary transition-colors p-1'
            aria-label={`${founder.name} LinkedIn`}
          >
            <FiLinkedin size={16} />
          </Link>
        )}
        {founder.twitter && (
          <Link
            href={founder.twitter}
            target='_blank'
            rel='noopener noreferrer'
            className='text-on-surface-variant hover:text-secondary transition-colors p-1'
            aria-label={`${founder.name} Twitter`}
          >
            <FiTwitter size={16} />
          </Link>
        )}
        {founder.email && (
          <Link
            href={founder.email.startsWith('mailto:') ? founder.email : `mailto:${founder.email}`}
            className='text-on-surface-variant hover:text-error transition-colors p-1'
            aria-label={`Email ${founder.name}`}
          >
            <FiMail size={16} />
          </Link>
        )}
      </div>
    );
  };

  // Border colors for diagonal hover
  const getBorderStroke = (index: number) => {
    if (hoveredIndex !== index) return 'rgba(197, 198, 205, 0.3)'; // Inactive outline-variant color
    return index === 0 ? '#0059ba' : '#0171e8'; // Founder 1 (Deep Blue), Founder 2 (Vibrant Blue)
  };

  return (
    <section className='py-24 bg-surface-container-low/50 border-t border-outline-variant/20'>
      <div className='max-w-7xl mx-auto px-8'>
        
        {/* Header Block */}
        <motion.div
          className='text-center mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className='text-xs font-bold text-secondary uppercase tracking-widest mb-3 block'>
            {title}
          </span>
          <h2 className='text-3xl md:text-4xl font-extrabold text-primary tracking-tight'>
            {heading}
          </h2>
          {description && (
            <p className='mt-4 text-on-surface-variant max-w-xl mx-auto text-sm leading-relaxed'>
              {description}
            </p>
          )}
        </motion.div>

        {/* ── DESKTOP DIAGONAL SPLIT CARD ── */}
        <div className='hidden md:block relative w-full aspect-square max-w-[580px] mx-auto bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20'>
          
          {/* Card 1: Top-Left Founder */}
          <div
            className='absolute inset-0 w-full h-full cursor-pointer z-10 transition-all duration-500'
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              backgroundColor: hoveredIndex === 0 ? 'var(--surface-container-low)' : 'transparent',
            }}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Top-Left Content container */}
            <div className='absolute top-0 left-0 w-full h-full p-10 pr-28 pb-28 flex flex-col justify-start items-start text-left select-none'>
              <div className='mb-4'>
                {renderProfilePhoto(founders[0])}
              </div>
              <h3 className='text-xl font-bold text-primary mb-1'>{founders[0].name}</h3>
              <p className='text-xs text-secondary font-bold uppercase tracking-wider mb-3'>{founders[0].role}</p>
              <p className='text-xs text-on-surface-variant leading-relaxed mb-4 max-w-[280px] font-body'>
                {founders[0].bio}
              </p>
              <div className='flex flex-wrap gap-1.5 mb-5 max-w-[280px]'>
                {founders[0].tags?.map((tag, i) => (
                  <span key={i} className='px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface border border-outline-variant/20 text-on-surface-variant'>
                    {tag}
                  </span>
                ))}
              </div>
              {renderSocials(founders[0], false)}
            </div>
          </div>

          {/* Card 2: Bottom-Right Founder */}
          {founders.length > 1 && (
            <div
              className='absolute inset-0 w-full h-full cursor-pointer z-10 transition-all duration-500'
              style={{
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                backgroundColor: hoveredIndex === 1 ? 'var(--surface-container-low)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Bottom-Right Content container */}
              <div className='absolute bottom-0 right-0 w-full h-full p-10 pl-28 pt-28 flex flex-col justify-end items-end text-right select-none'>
                <div className='mb-4'>
                  {renderProfilePhoto(founders[1])}
                </div>
                <h3 className='text-xl font-bold text-primary mb-1'>{founders[1].name}</h3>
                <p className='text-xs text-secondary font-bold uppercase tracking-wider mb-3'>{founders[1].role}</p>
                <p className='text-xs text-on-surface-variant leading-relaxed mb-4 max-w-[280px] font-body'>
                  {founders[1].bio}
                </p>
                <div className='flex flex-wrap gap-1.5 mb-5 justify-end max-w-[280px]'>
                  {founders[1].tags?.map((tag, i) => (
                    <span key={i} className='px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface border border-outline-variant/20 text-on-surface-variant'>
                      {tag}
                    </span>
                  ))}
                </div>
                {renderSocials(founders[1], true)}
              </div>
            </div>
          )}

          {/* SVG Border Overlay */}
          <svg
            className='absolute inset-0 w-full h-full pointer-events-none z-20'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
          >
            {/* Top-Left Outline */}
            <path
              d='M 0.5,0.5 L 99.5,0.5 L 0.5,99.5 Z'
              fill='none'
              stroke={getBorderStroke(0)}
              strokeWidth={hoveredIndex === 0 ? 1.5 : 0.5}
              className='transition-all duration-300'
            />
            {/* Bottom-Right Outline */}
            {founders.length > 1 && (
              <path
                d='M 99.5,0.5 L 99.5,99.5 L 0.5,99.5 Z'
                fill='none'
                stroke={getBorderStroke(1)}
                strokeWidth={hoveredIndex === 1 ? 1.5 : 0.5}
                className='transition-all duration-300'
              />
            )}
          </svg>
        </div>

        {/* ── MOBILE VIEW STACKED CARDS ── */}
        <div className='grid md:hidden grid-cols-1 gap-6 max-w-md mx-auto'>
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              className='flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-md transition-all duration-300'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className='p-6 flex-1'>
                <div className='flex items-center gap-4 mb-4'>
                  {renderProfilePhoto(founder)}
                  <div>
                    <h3 className='text-lg font-bold text-primary'>{founder.name}</h3>
                    <p className='text-xs text-secondary font-semibold'>{founder.role}</p>
                  </div>
                </div>

                <p className='text-xs text-on-surface-variant leading-relaxed mb-4 font-body'>
                  {founder.bio}
                </p>

                <div className='flex flex-wrap gap-1.5 mb-4'>
                  {founder.tags?.map((tag, i) => (
                    <span key={i} className='px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-container border border-outline-variant/20 text-on-surface-variant'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className='border-t border-outline-variant/20 px-6 py-3 bg-surface-container-low/30'>
                {renderSocials(founder, false)}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
