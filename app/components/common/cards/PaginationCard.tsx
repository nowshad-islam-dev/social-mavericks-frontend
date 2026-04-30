import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import type { Pagination } from '@/lib/types';

interface PaginationProps {
  pagination: Pagination;
  // Pass current search params so pagination preserves category/other filters
  basePath?: string;
}

export const PaginationCard: React.FC<PaginationProps> = ({
  pagination,
  basePath = '/blog',
}) => {
  const pages = Array.from({ length: pagination.pageCount }, (_, i) => i + 1);

  // Only render if there's more than one page
  if (pagination.pageCount <= 1) return null;

  return (
    <div className='flex items-center gap-4 pt-12 border-t border-outline-variant/10'>
      {pages.map((page) => {
        const isActive = page === pagination.page;

        return isActive ? (
          <span key={page} className='text-primary font-bold'>
            {String(page).padStart(2, '0')}
          </span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className='text-on-surface-variant/40 hover:text-primary transition-colors font-bold'
          >
            {String(page).padStart(2, '0')}
          </Link>
        );
      })}

      <div className='flex-grow' />

      {pagination.page < pagination.pageCount && (
        <Link
          href={`${basePath}?page=${pagination.page + 1}`}
          className='text-secondary font-bold flex items-center gap-2'
        >
          Next Page
          <FaLongArrowAltRight size={24} />
        </Link>
      )}
    </div>
  );
};
