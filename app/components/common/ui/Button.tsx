'use client';

import { FaLongArrowAltRight, FaPhoneAlt } from 'react-icons/fa';

// Extend window to include Calendly — it's injected by their script
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CalendlyButtonProps {
  url?: string;
  label?: string;
  icon?: 'phone' | 'arrow';
}

export const CalendlyButton = ({
  url = 'https://calendly.com/socialmavericksdigital/15min',
  label = 'Book a discovery call',
  icon = 'arrow',
}: CalendlyButtonProps) => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!window.Calendly) {
      // Script hasn't loaded yet — fallback to direct link
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    window.Calendly.initPopupWidget({ url });
  }

  return (
    <button
      onClick={handleClick}
      className='group inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-label text-sm font-medium text-on-primary transition-opacity duration-150 hover:opacity-90'
      type='button'
    >
      {label}
      {icon === 'phone' && <FaPhoneAlt />}
      {icon === 'arrow' && <FaLongArrowAltRight />}
    </button>
  );
};
