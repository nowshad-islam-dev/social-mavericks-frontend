import Link from 'next/link';
import { TfiEmail } from 'react-icons/tfi';
import { FaPhoneAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaGithub, FaYoutube, FaLink } from 'react-icons/fa';
import type { GlobalSettings } from '@/lib/types';

type FooterProps = Pick<
  GlobalSettings,
  | 'navigation_links'
  | 'social_links'
  | 'site_name'
  | 'footer_description'
  | 'contact_email'
  | 'contact_text'
>;

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <FaFacebook />;
    case 'instagram':
      return <FaInstagram />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'twitter':
    case 'x':
      return <FaTwitter />;
    case 'github':
      return <FaGithub />;
    case 'youtube':
      return <FaYoutube />;
    default:
      return <FaLink />;
  }
}

export default function Footer({
  navigation_links,
  social_links,
  site_name,
  footer_description,
  contact_email,
  contact_text,
}: FooterProps) {
  const navigationLinks = navigation_links || [];
  const socialLinks = social_links || [];

  return (
    <footer className='bg-background border-t border-gray-200 py-8 md:py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <h3 className='font-semibold text-primary mb-2 text-sm md:text-base'>
              {site_name}
            </h3>
            <p className='text-xs md:text-sm text-tertiary line-clamp-3'>
              {footer_description}
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
                  <Link href={link.url} className='text-xs hover:text-secondary transition-colors'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* legal */}
          <div>
            <h4 className='font-semibold text-primary mb-3 text-xs md:text-sm'>
              Legal
            </h4>
            <ul className='space-y-1 md:space-y-2'>
              <li>
                <Link href='/terms' className='text-xs hover:text-secondary transition-colors'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='text-xs hover:text-secondary transition-colors'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-semibold text-primary mb-3 text-xs md:text-sm'>
              Contact
            </h4>
            <a
              href={`mailto:${contact_email}`}
              className='text-xs md:text-sm text-tertiary flex items-center gap-2 mb-2 hover:text-secondary transition-colors'
            >
              <span className='inline-flex items-center gap-1'>
                <TfiEmail />
                {contact_email}
              </span>
            </a>
            <a
              href={`tel:${contact_text}`}
              className='text-xs md:text-sm text-tertiary flex items-center gap-2 hover:text-secondary transition-colors'
            >
              <FaPhoneAlt />
              {contact_text}
            </a>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className='border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-tertiary text-center md:text-left'>
            &copy; {new Date().getFullYear()} {site_name}. All rights reserved.
          </p>
          {socialLinks.length > 0 && (
            <div className='flex gap-3'>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-slate-500 hover:bg-secondary hover:text-white hover:border-secondary hover:scale-105 transition-all duration-300'
                  title={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
