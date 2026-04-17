import type { GlobalSettings } from '@/lib/types';
import { TfiEmail } from 'react-icons/tfi';
import { FaPhoneAlt } from 'react-icons/fa';

interface FooterProps {
  globals: GlobalSettings;
}

export default function Footer({ globals }: FooterProps) {
  const navigationLinks = globals.navigation_links || [];
  const socialLinks = globals.social_links || [];

  return (
    <footer className='bg-background border-t border-gray-200 py-8 md:py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <h3 className='font-semibold text-primary mb-2 text-sm md:text-base'>
              {globals.site_name}
            </h3>
            <p className='text-xs md:text-sm text-tertiary line-clamp-3'>
              {globals.footer_description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className='font-semibold text-primary mb-3 text-xs md:text-sm'>
              Navigation
            </h4>
            <ul className='space-y-1 md:space-y-2'>
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} className='text-xs navlink'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* legal */}
          <div>
            <h4 className='font-semibold text-primary mb-3 text-xs md:text-sm'>
              Legal
            </h4>
            <ul>
              <li className='text-xs navlink'>
                <a href='#terms' className='text-xs navlink'>
                  Terms of Service
                </a>
              </li>
              <li className='text-xs navlink'>
                <a href='#policy' className='text-xs navlink'>
                  Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-semibold text-primary mb-3 text-xs md:text-sm'>
              Contact
            </h4>
            <a
              href={`mailto:${globals.contact_email}`}
              className='text-xs md:text-sm text-tertiary flex items-center gap-2 mb-2'
            >
              <span className='inline-flex items-center gap-1'>
                <TfiEmail />
                {globals.contact_email}
              </span>
            </a>
            <a
              href={`tel:${globals.contact_text}`}
              className='text-xs md:text-sm text-tertiary flex items-center gap-2'
            >
              <FaPhoneAlt />
              {globals.contact_text}
            </a>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className='flex gap-3'>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-tertiary hover:text-primary transition'
                />
              ))}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-200 pt-6'>
          <p className='text-xs text-tertiary text-center'>
            &copy; {new Date().getFullYear()} {globals.site_name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
