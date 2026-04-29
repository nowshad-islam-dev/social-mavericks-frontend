import Link from 'next/link';
import classNames from 'classnames';
import { FaChartLine, FaArrowRightLong } from 'react-icons/fa6';
import { BsTools } from 'react-icons/bs';
import { Tag, PricingBadge } from '@components/common/ui/Badge';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  isGrowth: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isGrowth,
}: ServiceCardProps) => {
  return (
    <div
      className={classNames(
        'group relative flex flex-col gap-4 rounded-xl border bg-surface-container-lowest p-6',
        'transition-colors duration-200 ease-in-out',
        {
          'border-secondary shadow-sm': service.is_differentiator,
          'border-outline-variant hover:border-outline hover:shadow-sm':
            !service.is_differentiator,
        },
      )}
    >
      {service.is_differentiator && (
        <div className='absolute -top-3 left-5'>
          <span className='inline-flex items-center rounded-full bg-secondary px-3 py-0.5 font-label text-xs font-medium text-on-secondary'>
            Differentiator
          </span>
        </div>
      )}

      <div
        className={classNames(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          {
            'bg-primary-fixed': isGrowth,
            'bg-secondary-fixed': !isGrowth,
          },
        )}
      >
        {isGrowth ? <FaChartLine /> : <BsTools />}
      </div>

      <div className='flex flex-col gap-2'>
        <h3 className='font-headline text-base font-semibold text-on-surface'>
          {service.title}
        </h3>
        <p className='font-body text-sm leading-relaxed text-on-surface-variant'>
          {service.short_description}
        </p>
      </div>

      <div className='mt-auto flex flex-col gap-3 pt-2'>
        {service.tags?.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {service.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
        <div className='flex items-center justify-between border-t border-outline-variant pt-3'>
          <PricingBadge pricing={service.pricing} />
          <Link href={`/services/${service.slug}`}>
            <span className='font-label text-xs font-medium text-on-primary-container transition-colors duration-150 group-hover:text-on-surface'>
              Learn more <FaArrowRightLong className='inline' />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
