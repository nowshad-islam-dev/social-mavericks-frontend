import Link from 'next/link';
import { CalendlyButton } from '@components/common/ui/Button';
import { Tag, PricingBadge } from '@components/common/ui/Badge';
import type { Service } from '@/lib/types';

interface ServiceDetailSidebarProps {
  service: Service;
}

export function ServiceDetailSidebar({ service }: ServiceDetailSidebarProps) {
  const isGrowth = service.track?.slug === 'growth';

  return (
    <div className='sticky top-24 flex flex-col gap-4'>
      {/* Main sidebar card */}
      <div className='rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm'>
        {/* Service mini-header */}
        <p className='mb-1 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
          {service.track?.label}
        </p>
        <h2 className='mb-4 font-headline text-base font-bold leading-snug text-on-surface'>
          {service.title}
        </h2>

        {/* Divider */}
        <div className='mb-4 h-px bg-outline-variant' />

        {/* Pricing */}
        <div className='mb-4'>
          <p className='mb-1.5 font-label text-xs font-semibold text-outline'>
            Pricing model
          </p>
          <PricingBadge pricing={service.pricing} />
        </div>

        {/* Tags */}
        {service.tags?.length > 0 && (
          <div className='mb-5'>
            <p className='mb-1.5 font-label text-xs font-semibold text-outline'>
              Expertise tags
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {service.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className='mb-5 h-px bg-outline-variant' />

        {/* CTA buttons */}
        <div className='flex flex-col gap-2.5'>
          <CalendlyButton />
          <Link
            href='/services'
            className='inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-5 py-2.5 font-label text-sm font-medium text-on-surface transition-colors duration-150 hover:border-outline'
          >
            View all services
          </Link>
        </div>
      </div>

      {/* Track info card */}
      <div
        className={`rounded-2xl p-5 ${
          isGrowth
            ? 'bg-secondary-container/20 border border-secondary/20'
            : 'bg-primary-container/70 border border-primary-fixed-dim/20'
        }`}
      >
        <p
          className={`mb-1 font-label text-xs font-bold uppercase tracking-widest ${
            isGrowth ? 'text-on-secondary-container' : 'text-primary-fixed-dim'
          }`}
        >
          {service.track?.label} track
        </p>
        <p
          className={`font-headline text-sm font-semibold ${
            isGrowth ? 'text-on-secondary-container' : 'text-primary-fixed-dim'
          }`}
        >
          {service.track?.tagline}
        </p>
        <p
          className={`mt-2 font-body text-xs leading-relaxed ${
            isGrowth
              ? 'text-on-secondary-container/80'
              : 'text-on-primary-container'
          }`}
        >
          {service.track?.badge}
        </p>
      </div>
    </div>
  );
}
