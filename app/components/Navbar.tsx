'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GlobalSettings } from '@/lib/types';
import { MdMenu } from 'react-icons/md';

type NavbarProps = Pick<GlobalSettings, 'navigation_links'>;

export default function Navbar({ navigation_links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = navigation_links || [];

  return (
    <nav className='sticky bg-background top-0 z-50 flex justify-between items-center px-8 shadow-md'>
      {/* Logo */}
      <div>
        <Image
          src='/social-mavericks-web-logo.png'
          width={100}
          height={100}
          alt='social mavericks logo'
          className='object-contain'
        />
      </div>

      {/* Desktop Nav */}
      <div className='hidden md:flex items-center gap-8'>
        <ul className='flex gap-6'>
          {navLinks.map((navLink) => (
            <li key={navLink.id} className='navlink'>
              {navLink.label}
            </li>
          ))}
        </ul>
        <div>
          <button className='btn-primary px-6 py-2 shadow-md hover:shadow-lg'>
            GET A QUOTE
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle menu'
      >
        <MdMenu size={24} />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-background shadow-lg py-4 px-8 flex flex-col gap-4'>
          <ul className='flex flex-col gap-4'>
            {navLinks.map((navLink) => (
              <li
                key={navLink.id}
                className='navlink'
                onClick={() => setIsOpen(false)}
              >
                {navLink.label}
              </li>
            ))}
          </ul>
          <button
            className='btn-primary px-6 py-2 w-full'
            onClick={() => setIsOpen(false)}
          >
            GET A QUOTE
          </button>
        </div>
      )}
    </nav>
  );
}
