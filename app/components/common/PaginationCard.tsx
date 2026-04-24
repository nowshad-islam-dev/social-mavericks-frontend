import type { Pagination } from '@/lib/types';
import { FaLongArrowAltRight } from 'react-icons/fa';

interface PaginationProps {
  pagination: Pagination;
}

export const PaginationCard: React.FC<PaginationProps> = ({
  pagination,
}: PaginationProps) => {
  const pages = Array.from({ length: pagination.pageCount }, (_, i) => i + 1);

  return (
    <div className='flex items-center gap-4 pt-12 border-t border-outline-variant/10'>
      {pages.map((page) => {
        const isActive = page === pagination.page;

        return isActive ? (
          <span key={page} className='text-primary font-bold'>
            {String(page).padStart(2, '0')}
          </span>
        ) : (
          <a
            key={page}
            href={`?page=${page}`}
            className='text-on-surface-variant/40 hover:text-primary transition-colors font-bold'
          >
            {String(page).padStart(2, '0')}
          </a>
        );
      })}

      <div className='flex-grow' />

      {pagination.page < pagination.pageCount && (
        <a
          href={`?page=${pagination.page + 1}`}
          className='text-secondary font-bold flex items-center gap-2'
        >
          Next Page
          <span className='material-symbols-outlined text-sm'>
            <FaLongArrowAltRight size={24} />
          </span>
        </a>
      )}
    </div>
  );
};
