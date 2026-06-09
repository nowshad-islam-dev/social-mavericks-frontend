'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { MdMenu, MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendlyButton } from './common/ui/Button';
import type { GlobalSettings } from '@/lib/types';

type NavbarProps = Pick<GlobalSettings, 'navigation_links'>;

export default function Navbar({ navigation_links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = navigation_links || [];
  const pathname = usePathname();

  return (
    <nav className='fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300'>
      <div className='flex justify-between items-center px-8 py-4 max-w-7xl mx-auto'>
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className='h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20'
        >
          <Link href='/' className='relative block h-full w-full'>
            <Image
              src='/nav-logo.svg'
              alt='Logo'
              fill
              sizes='(max-width: 768px) 48px, (max-width: 1200px) 64px, 80px'
              className='object-contain'
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((navLink) => {
            const isActive = pathname === navLink.url;
            return (
              <Link
                key={navLink.id}
                href={navLink.url}
                className={classNames(
                  'text-sm font-medium transition-all relative py-1 hover:text-secondary',
                  {
                    'text-secondary': isActive,
                    'text-slate-600': !isActive,
                  },
                )}
              >
                {navLink.label}
                {isActive && (
                  <motion.div
                    layoutId='activeNavBorder'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-secondary'
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className='hidden items-center gap-4 md:flex'>
          <CalendlyButton label='Book A Call' icon='phone' />
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden flex flex-col justify-center items-center w-8 h-8 text-primary'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-6 px-8 flex flex-col gap-6 border-t border-slate-100 overflow-hidden'
          >
            <ul className='flex flex-col gap-4'>
              {navLinks.map((navLink) => {
                const isActive = pathname === navLink.url;
                return (
                  <li key={navLink.id} onClick={() => setIsOpen(false)}>
                    <Link 
                      href={navLink.url}
                      className={classNames(
                        'block text-base font-semibold py-1 transition-colors',
                        {
                          'text-secondary': isActive,
                          'text-slate-700 hover:text-secondary': !isActive,
                        }
                      )}
                    >
                      {navLink.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className='pt-2 border-t border-slate-100'>
              <CalendlyButton label='Book A Call' icon='phone' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
