import Link from 'next/link';
import classNames from 'classnames';
import type { Track, BlogCategory } from '@/lib/types';

export const BlogCategoryBreadcrumb = ({
  category,
}: {
  category: BlogCategory;
}) => {
  return (
    <div className='flex items-center gap-2'>
      <Link
        href='/blog'
        className='font-label text-xs text-outline transition-colors duration-150 hover:text-on-surface'
      >
        Blog
      </Link>
      <span className='font-label text-xs text-outline'>/</span>
      <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-label text-xs font-medium border-primary-fixed bg-primary-fixed text-on-primary-fixed'>
        {category.name}
      </span>
    </div>
  );
};

export const TrackBreadcrumb = ({ track }: { track: Track }) => {
  const isGrowth = track.slug === 'growth';

  return (
    <div className='flex items-center gap-2'>
      <Link
        href='/services'
        className='font-label text-xs text-outline transition-colors duration-150 hover:text-on-surface'
      >
        Services
      </Link>
      <span className='font-label text-xs text-outline'>/</span>
      <span
        className={classNames(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 font-label text-xs font-medium',
          {
            'border-primary-fixed bg-primary-fixed text-on-primary-fixed':
              isGrowth,
            'border-secondary-fixed bg-secondary-fixed text-on-secondary-fixed':
              !isGrowth,
          },
        )}
      >
        {track.tagline}
      </span>
    </div>
  );
};
