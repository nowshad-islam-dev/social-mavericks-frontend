import Image from 'next/image';
import { getProjects } from '@/lib/services/projects';
import { getImageUrl } from '@/lib/normalizer';
import type { HomePage } from '@/lib/types';

type GalleryProps = Pick<HomePage, 'gallery_section_title'>;

export default async function Gallery({ gallery_section_title }: GalleryProps) {
  const projects = await getProjects();
  const featuredProjects =
    projects.filter((project) => project.featured).slice(0, 3) || [];

  return (
    <section className='py-24 bg-surface'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='mb-16'>
          <h2 className='text-3xl md:text-5xl font-extrabold text-primary mb-2'>
            {gallery_section_title}
          </h2>
          <div className='h-1 w-20 bg-secondary'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {featuredProjects.map((project) => (
            <div key={project.id} className='group cursor-pointer'>
              <div className='relative aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-surface-container-low'>
                <Image
                  src={getImageUrl(project.thumbnail)!}
                  alt='Project Thumbnail'
                  className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105'
                  fill
                />
                <div className='absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </div>
              <div className='flex justify-between items-start'>
                <div>
                  <h4 className='text-xl font-bold text-primary'>
                    {project.title}
                  </h4>
                  <p className='text-on-surface-variant text-sm'>
                    {project.category}
                  </p>
                </div>
                <span className='material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity'>
                  see details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
