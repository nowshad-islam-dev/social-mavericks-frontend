import type { DifferencePoint } from '@/lib/types';

interface DifferencePointCardProps {
  point: DifferencePoint;
  index: number;
}

export const DifferencePointCard = ({ point, index }: DifferencePointCardProps) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className='group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-200 hover:border-secondary/40 hover:shadow-md hover:shadow-secondary/8'>
      {/* Left accent bar */}
      <div className='absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-secondary/60 to-secondary/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />

      {/* Large number watermark */}
      <span
        aria-hidden
        className='absolute right-4 top-2 select-none font-headline text-6xl font-black leading-none text-outline-variant opacity-20 transition-opacity duration-200 group-hover:opacity-30'
      >
        {num}
      </span>

      {/* Number pill */}
      <span className='mb-4 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-secondary-fixed font-label text-xs font-bold text-secondary'>
        {num}
      </span>

      <h4 className='mb-2 font-headline text-sm font-bold text-on-surface leading-snug'>
        {point.title}
      </h4>
      <p className='font-body text-sm leading-relaxed text-on-surface-variant'>
        {point.description}
      </p>
    </div>
  );
};
