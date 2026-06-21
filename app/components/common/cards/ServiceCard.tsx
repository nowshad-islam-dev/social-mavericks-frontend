'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import {
  FaChartLine,
  FaArrowRightLong,
  FaBullhorn,
  FaStar,
} from 'react-icons/fa6';
import {
  FaCode,
  FaSearchDollar,
  FaLayerGroup,
  FaServer,
  FaMobileAlt,
} from 'react-icons/fa';
import { BsTools } from 'react-icons/bs';
import { Tag, PricingBadge } from '@components/common/ui/Badge';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  isGrowth: boolean;
}

// Map service slugs to specific icons for visual differentiation
const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  // Growth track
  'ai ad management': FaSearchDollar,
  'marketing automation': FaBullhorn,
  'digital ops retainer': FaChartLine,

  // Build track
  'e-commerce development': FaCode,
  'erp / crm / cms development': FaMobileAlt,
  'custom-software': FaLayerGroup,
  'ai-integrated applications': FaServer,
};

function getServiceIcon(slug: string, isGrowth: boolean): React.ElementType {
  // Try direct slug match first
  const directMatch = SERVICE_ICON_MAP[slug];
  if (directMatch) return directMatch;

  // Try partial match
  const slugLower = slug.toLowerCase();
  for (const [key, icon] of Object.entries(SERVICE_ICON_MAP)) {
    if (slugLower.includes(key) || key.includes(slugLower)) return icon;
  }

  // Fallback by track
  return isGrowth ? FaChartLine : BsTools;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isGrowth,
}: ServiceCardProps) => {
  const IconComponent = getServiceIcon(service.slug, isGrowth);

  return (
    <Link href={`/services/${service.slug}`}>
      <motion.div
        whileHover={{
          y: -6,
          boxShadow: isGrowth
            ? '0 20px 40px -12px rgba(0,89,186,0.20)'
            : '0 20px 40px -12px rgba(9,20,38,0.18)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={classNames(
          'group relative flex h-full flex-col gap-4 rounded-xl border bg-surface-container-lowest p-6',
          'transition-colors duration-200 ease-in-out',
          {
            'border-secondary/40 shadow-sm': service.is_differentiator,
            'border-outline-variant hover:border-outline':
              !service.is_differentiator,
          },
        )}
      >
        {/* Differentiator badge — top right */}
        {service.is_differentiator && (
          <div className='absolute right-4 top-4'>
            <span className='inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 font-label text-xs font-medium text-on-primary'>
              <FaStar size={9} />
              Differentiator
            </span>
          </div>
        )}

        {/* Icon area — larger, more visual weight */}
        <div
          className={classNames(
            'flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110',
            {
              'bg-secondary-fixed text-secondary': isGrowth,
              'bg-primary-fixed bg-opacity-60 text-on-primary-fixed': !isGrowth,
            },
          )}
        >
          <IconComponent size={22} />
        </div>

        {/* Content */}
        <div className='flex flex-col gap-2 flex-1'>
          <h3 className='font-headline text-base font-bold text-on-surface leading-snug'>
            {service.title}
          </h3>
          <p className='font-body text-sm leading-relaxed text-on-surface-variant'>
            {service.short_description}
          </p>
        </div>

        {/* Footer */}
        <div className='mt-auto flex flex-col gap-3 pt-1'>
          {service.tags?.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {service.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
          <div className='flex items-center justify-between border-t border-outline-variant pt-3'>
            <PricingBadge pricing={service.pricing} />
            <span className='group/link inline-flex items-center gap-1.5 font-label text-xs font-semibold text-secondary transition-all duration-150 hover:gap-2.5'>
              Learn more
              <FaArrowRightLong
                size={11}
                className='transition-transform duration-200 group-hover/link:translate-x-0.5'
              />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
