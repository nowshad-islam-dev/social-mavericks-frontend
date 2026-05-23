'use client';

import { JSX } from 'react/jsx-dev-runtime';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export function RichTextBody({ content }: { content: unknown }) {
  return (
    <BlocksRenderer
      content={content as Parameters<typeof BlocksRenderer>[0]['content']}
      blocks={{
        paragraph: ({ children }) => (
          <p className='mb-4 font-body text-base leading-relaxed text-on-surface-variant'>
            {children}
          </p>
        ),
        heading: ({ children, level }) => {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          const styles: Record<number, string> = {
            1: 'mb-4 mt-8 font-headline text-2xl font-semibold text-on-surface',
            2: 'mb-3 mt-7 font-headline text-xl font-semibold text-on-surface',
            3: 'mb-3 mt-6 font-headline text-lg font-semibold text-on-surface',
            4: 'mb-2 mt-5 font-headline text-base font-semibold text-on-surface',
            5: 'mb-2 mt-4 font-headline text-sm font-semibold text-on-surface',
            6: 'mb-2 mt-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-surface',
          };
          return <Tag className={styles[level]}>{children}</Tag>;
        },
        list: ({ children, format }) =>
          format === 'ordered' ? (
            <ol className='mb-4 ml-5 list-decimal space-y-1.5 font-body text-base text-on-surface-variant'>
              {children}
            </ol>
          ) : (
            <ul className='mb-4 ml-5 list-disc space-y-1.5 font-body text-base text-on-surface-variant'>
              {children}
            </ul>
          ),
        'list-item': ({ children }) => (
          <li className='leading-relaxed'>{children}</li>
        ),
        quote: ({ children }) => (
          <blockquote className='my-6 border-l-2 border-secondary pl-4 font-body text-base italic text-on-surface-variant'>
            {children}
          </blockquote>
        ),
        code: ({ plainText }) => (
          <pre className='my-4 overflow-x-auto rounded-lg border border-outline-variant bg-surface-container p-4'>
            <code className='font-mono text-sm text-on-surface'>
              {plainText}
            </code>
          </pre>
        ),
        image: ({ image }) => (
          <figure className='my-6'>
            <Image
              src={image.url}
              alt={image.alternativeText ?? ''}
              className='w-full rounded-lg border border-outline-variant'
              width={image.width}
              height={image.height}
            />
          </figure>
        ),
        link: ({ children, url }) => (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-secondary underline underline-offset-2 transition-opacity duration-150 hover:opacity-75'
          >
            {children}
          </a>
        ),
      }}
      modifiers={{
        bold: ({ children }) => (
          <strong className='font-semibold text-on-surface'>{children}</strong>
        ),
        italic: ({ children }) => <em className='italic'>{children}</em>,
        code: ({ children }) => (
          <code className='rounded border border-outline-variant bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface'>
            {children}
          </code>
        ),
        strikethrough: ({ children }) => (
          <s className='text-outline'>{children}</s>
        ),
        underline: ({ children }) => (
          <u className='underline underline-offset-2'>{children}</u>
        ),
      }}
    />
  );
}
