import Image from 'next/image';
import type { Project } from '@/lib/types';
import { getImageUrl } from '@/lib/normalizer';

interface GalleryCardProps {
  project: Project;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  project,
}: GalleryCardProps) => {
  return (
    <div className='p-6 bg-background flex flex-col items-center md:items-start w-full max-w-md mx-auto'>
      <div className='relative w-full aspect-square overflow-hidden'>
        <Image
          src={getImageUrl(project.thumbnail)!}
          alt={project.title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
          className='object-cover'
        />
      </div>
      <h3 className='mt-4 text-lg font-medium text-primary text-center md:text-left'>
        {project.title}
      </h3>
      <h4 className='text-xs mb-2 text-primary text-center md:text-left'>
        {project.category}
      </h4>
    </div>
  );
};
