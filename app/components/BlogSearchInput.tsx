'use client';

import { useState, useTransition, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDebouncedCallback } from 'use-debounce';
import { GoSearch } from 'react-icons/go';
import { searchBlogsAction } from '@/actions/blog';
import { getImageUrl } from '@/lib/normalizer';
import type { Blog } from '@/lib/types';

export function BlogSearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Blog[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const runSearch = useDebouncedCallback((value: string) => {
    if (!value.trim()) {
      setResults([]);
      setHasSearched(false);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    startTransition(async () => {
      const blogs = await searchBlogsAction(value);
      setResults(blogs);
      setHasSearched(true);
    });
  }, 400);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      runSearch(value);
    },
    [runSearch],
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setIsOpen(false);
    runSearch.cancel();
  }, [runSearch]);

  const handleFocus = useCallback(() => {
    if (query.trim()) setIsOpen(true);
  }, [query]);

  // Use onBlur on the container instead of a document mousedown listener —
  // relatedTarget tells us if focus moved to an element still inside the container
  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  }, []);

  return (
    <div className='relative' onBlur={handleBlur}>
      {/* Input */}
      <div className='relative'>
        <input
          className='w-full bg-transparent border-b-2 border-outline-variant/30 focus:border-primary transition-colors py-3 pr-8 outline-none text-primary placeholder:text-on-surface-variant/40'
          placeholder='Keywords...'
          type='text'
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          aria-label='Search articles'
          aria-autocomplete='list'
        />

        <span className='absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant/40'>
          {query ? (
            <button
              onClick={handleClear}
              aria-label='Clear search'
              className='hover:text-on-surface transition-colors duration-150 cursor-pointer'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                aria-hidden='true'
              >
                <path
                  d='M4 4L14 14M14 4L4 14'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          ) : (
            <GoSearch size={20} aria-hidden='true' />
          )}
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-outline-variant bg-surface-container-lowest shadow-lg'>
          {/* Loading */}
          {isPending && (
            <div className='flex items-center gap-2 px-4 py-3 border-b border-outline-variant/20'>
              <span className='h-3 w-3 animate-spin rounded-full border-2 border-outline-variant border-t-primary' />
              <span className='font-label text-xs text-on-surface-variant'>
                Searching...
              </span>
            </div>
          )}

          {/* Results */}
          {!isPending && hasSearched && results.length > 0 && (
            <ul role='listbox'>
              {results.map((blog) => (
                <li key={blog.documentId} role='option' aria-selected='false'>
                  <Link
                    href={`/blog/${blog.slug}`}
                    onClick={() => setIsOpen(false)}
                    className='flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-surface-container border-b border-outline-variant/10 last:border-b-0'
                  >
                    {blog.cover_image?.url && (
                      <div className='h-10 w-14 relative shrink-0 overflow-hidden rounded'>
                        <Image
                          src={getImageUrl(blog.cover_image)!}
                          alt={blog.title}
                          fill
                          className='h-full w-full object-cover'
                        />
                      </div>
                    )}
                    <div className='flex min-w-0 flex-col gap-0.5'>
                      <span className='font-label text-xs font-medium text-secondary'>
                        {blog.category?.name}
                      </span>
                      <span className='font-body text-sm text-on-surface line-clamp-1'>
                        {blog.title}
                      </span>
                      <span className='font-label text-xs text-on-surface-variant'>
                        {new Date(blog.publishedAt).toDateString()}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* No results */}
          {!isPending && hasSearched && results.length === 0 && (
            <div className='px-4 py-6 text-center'>
              <p className='font-body text-sm text-on-surface-variant'>
                No articles found for{' '}
                <span className='font-medium text-on-surface'>
                  &ldquo;{query}&rdquo;
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
