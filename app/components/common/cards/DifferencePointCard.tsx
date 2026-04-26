import type { DifferencePoint } from '@/lib/types';

interface DifferencePointCardProps {
  point: DifferencePoint;
}

export const DifferencePointCard = ({ point }: DifferencePointCardProps) => {
  return (
    <div className='rounded-xl border border-outline-variant bg-surface-container-low p-5 transition-colors duration-150 hover:border-outline'>
      <h4 className='font-headline text-sm font-semibold text-on-surface'>
        {point.title}
      </h4>
      <p className='mt-2 font-body text-sm leading-relaxed text-on-surface-variant'>
        {point.description}
      </p>
    </div>
  );
};
