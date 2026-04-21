import type { HomePage } from '@/lib/types';
import { getProjects } from '@/lib/services/projects';
import { GalleryCard } from '../common/GelleryCard';

type GalleryProps = Pick<HomePage, 'gallery_section_title'>;

export default async function Gallery({ gallery_section_title }: GalleryProps) {
  const projects = await getProjects();

  return (
    <section className='bg-background px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32 max-w-7xl mx-auto rounded-lg'>
      <div className='space-y-4 md:space-y-6'>
        <h3 className='title'>{gallery_section_title}</h3>
        <div className='text-secondary w-16 h-1 bg-primary'></div>
      </div>
      <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <GalleryCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
