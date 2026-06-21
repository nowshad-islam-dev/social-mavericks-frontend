'use client';

import Link from 'next/link';
import { TfiEmail } from 'react-icons/tfi';
import {
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaLink,
  FaMapMarkerAlt,
  FaArrowUp,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { GlobalSettings } from '@/lib/types';

type FooterProps = Pick<
  GlobalSettings,
  | 'navigation_links'
  | 'social_links'
  | 'site_name'
  | 'footer_description'
  | 'contact_email'
  | 'contact_text'
  | 'address'
  | 'google_map_link'
>;

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <FaFacebook className='w-4 h-4' />;
    case 'instagram':
      return <FaInstagram className='w-4 h-4' />;
    case 'linkedin':
      return <FaLinkedin className='w-4 h-4' />;
    case 'twitter':
    case 'x':
      return <FaTwitter className='w-4 h-4' />;
    case 'github':
      return <FaGithub className='w-4 h-4' />;
    case 'youtube':
      return <FaYoutube className='w-4 h-4' />;
    default:
      return <FaLink className='w-4 h-4' />;
  }
}

function getSocialHoverClass(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return 'hover:bg-[#1877f2] hover:border-[#1877f2] hover:shadow-[#1877f2]/30';
    case 'instagram':
      return 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:shadow-[#ee2a7b]/30';
    case 'linkedin':
      return 'hover:bg-[#0077b5] hover:border-[#0077b5] hover:shadow-[#0077b5]/30';
    case 'twitter':
    case 'x':
      return 'hover:bg-black hover:border-slate-800 hover:shadow-white/10';
    case 'github':
      return 'hover:bg-[#24292e] hover:border-[#24292e] hover:shadow-[#24292e]/30';
    case 'youtube':
      return 'hover:bg-[#ff0000] hover:border-[#ff0000] hover:shadow-[#ff0000]/30';
    default:
      return 'hover:bg-[#0059ba] hover:border-[#0059ba] hover:shadow-[#0059ba]/30';
  }
}

export default function Footer({
  navigation_links,
  social_links,
  site_name,
  footer_description,
  contact_email,
  contact_text,
  address,
  google_map_link,
}: FooterProps) {
  const navigationLinks = navigation_links || [];
  const socialLinks = social_links || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className='relative bg-[#091426] border-t border-slate-900 overflow-hidden py-16 md:py-24'
    >
      {/* Background Mesh Glow Effects */}
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none' />

      <div className='relative z-10 max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8'>
          {/* Brand Column */}
          <motion.div
            variants={itemVariants}
            className='lg:col-span-2 space-y-4'
          >
            <h3 className='text-2xl font-headline font-bold tracking-tight'>
              <span className='bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent'>
                {site_name}
              </span>
            </h3>
            <p className='text-sm text-slate-300 leading-relaxed max-w-sm'>
              {footer_description}
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h4 className='font-semibold text-white tracking-wider text-xs uppercase'>
              Company
            </h4>
            <ul className='space-y-3'>
              {navigationLinks.map((link) => (
                <motion.li
                  key={link.id}
                  whileHover={{ x: 4 }}
                  className='transition-transform duration-200'
                >
                  <Link
                    href={link.url}
                    className='text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-200' />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h4 className='font-semibold text-white tracking-wider text-xs uppercase'>
              Legal
            </h4>
            <ul className='space-y-3'>
              <motion.li
                whileHover={{ x: 4 }}
                className='transition-transform duration-200'
              >
                <Link
                  href='/terms'
                  className='text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-200' />
                  Terms of Service
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 4 }}
                className='transition-transform duration-200'
              >
                <Link
                  href='/privacy'
                  className='text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group'
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-200' />
                  Privacy Policy
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h4 className='font-semibold text-white tracking-wider text-xs uppercase'>
              Connect
            </h4>
            <div className='flex flex-col gap-3'>
              <a
                href={`mailto:${contact_email}`}
                className='group text-sm text-slate-400 hover:text-white flex items-center gap-3 transition-colors duration-200'
              >
                <span className='w-8 h-8 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-200'>
                  <TfiEmail className='w-3.5 h-3.5' />
                </span>
                <span className='break-all'>{contact_email}</span>
              </a>
              <a
                href={`tel:${contact_text}`}
                className='group text-sm text-slate-400 hover:text-white flex items-center gap-3 transition-colors duration-200'
              >
                <span className='w-8 h-8 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-200'>
                  <FaPhoneAlt className='w-3.5 h-3.5' />
                </span>
                <span>{contact_text}</span>
              </a>
              {address && (
                <span className='group text-sm text-slate-400 hover:text-white flex items-start gap-3 transition-colors duration-200'>
                  <span className='w-8 h-8 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 shrink-0 transition-all duration-200'>
                    <FaMapMarkerAlt className='w-3.5 h-3.5' />
                  </span>
                  <span className='leading-relaxed'>{address}</span>
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-slate-800/60 to-transparent mt-16 mb-8' />

        {/* Copyright & Social/Top-Scroll */}
        <motion.div
          variants={itemVariants}
          className='flex flex-col md:flex-row justify-between items-center gap-6'
        >
          <p className='text-xs text-slate-500 text-center md:text-left'>
            &copy; {new Date().getFullYear()} {site_name}. All rights reserved.
          </p>

          <div className='flex items-center gap-4'>
            {socialLinks.length > 0 && (
              <div className='flex gap-3.5'>
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-9 h-9 rounded-full bg-slate-800/30 border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-white hover:shadow-lg transition-all duration-300 ${getSocialHoverClass(link.platform)}`}
                    title={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </motion.a>
                ))}
              </div>
            )}

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='w-9 h-9 rounded-full bg-slate-800/30 border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-950/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300'
              title='Back to Top'
              aria-label='Back to Top'
            >
              <FaArrowUp className='w-3.5 h-3.5' />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
