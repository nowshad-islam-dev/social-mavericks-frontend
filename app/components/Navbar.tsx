'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { MdMenu } from 'react-icons/md';
import type { GlobalSettings } from '@/lib/types';

type NavbarProps = Pick<GlobalSettings, 'navigation_links'>;

export default function Navbar({ navigation_links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = navigation_links || [];
  const pathname = usePathname();

  return (
    <nav className='fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-[0px_24px_48px_-12px_rgba(9,20,38,0.08)]'>
      <div className='flex justify-between items-center px-8 py-4 max-w-7xl mx-auto'>
        {/* Logo */}
        <div className='relative h-24 w-24'>
          <Link href='/'>
            <Image
              src='/social-mavericks-web-logo.png'
              alt='Logo'
              fill
              className='object-contain border border-secondary/10 hover:border-secondary/30 rounded-[50%]
            transition-border duration-300'
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((navLink) => (
            <Link
              key={navLink.id}
              href={navLink.url}
              className={classNames(
                'text-slate-600 hover:text-blue-600 transition-all',
                {
                  'underline decoration-blue-600': pathname === navLink.url,
                },
              )}
            >
              {navLink.label}
            </Link>
          ))}
        </div>
        <div className='hidden items-center gap-4 md:flex'>
          <button className='bg-secondary text-on-secondary px-6 py-2 rounded-lg font-semibold hover:scale-[1.02] transition-transform active:scale-95 duration-100'>
            Get a Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          <MdMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white/70 shadow-lg py-4 px-8 flex flex-col gap-4'>
          <ul className='flex flex-col gap-4'>
            {navLinks.map((navLink) => (
              <li key={navLink.id} onClick={() => setIsOpen(false)}>
                <Link href={navLink.url}>{navLink.label}</Link>
              </li>
            ))}
          </ul>
          <button
            className='bg-secondary text-on-secondary px-6 py-2 rounded-lg font-semibold hover:scale-[1.02] transition-transform active:scale-95 duration-100'
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </button>
        </div>
      )}
    </nav>
  );
}
