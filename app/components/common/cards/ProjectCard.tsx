import Image from 'next/image';
import Link from 'next/link';
import { FaChartLine, FaArrowRightLong } from 'react-icons/fa6';
import { CategoryBadge, Tag } from '@components/common/ui/Badge';
import { getImageUrl } from '@/lib/normalizer';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`/gallery/${project.slug}`}
      className='group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-shadow duration-200 hover:shadow-md'
    >
      {/* Thumbnail */}
      <div className='relative h-44 w-full overflow-hidden'>
        <Image
          src={getImageUrl(project.thumbnail)!}
          alt={'project image'}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'
          fill
        />
        <div className='absolute left-3 top-3'>
          <CategoryBadge category={project.category} />
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col gap-3 p-5'>
        <div className='flex flex-col gap-1.5'>
          {project.client_industry && (
            <span className='font-label text-xs text-outline'>
              {project.client_industry}
            </span>
          )}
          <h3 className='font-headline text-base font-semibold text-on-surface'>
            {project.title}
          </h3>
          <p className='font-body text-sm leading-relaxed text-on-surface-variant line-clamp-2'>
            {project.description}
          </p>
        </div>

        {/* Result */}
        {project.result && (
          <div className='flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2'>
            <span className='text-secondary'>
              <FaChartLine />
            </span>
            <p className='font-label text-xs font-medium text-on-surface line-clamp-1'>
              {project.result}
            </p>
          </div>
        )}

        <div className='mt-auto flex flex-col gap-3 pt-2'>
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {project.tech_stack.slice(0, 3).map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
              {project.tech_stack.length > 3 && (
                <Tag label={`+${project.tech_stack.length - 3}`} />
              )}
            </div>
          )}

          <div className='flex items-center justify-between border-t border-outline-variant pt-3'>
            <span className='font-label text-xs font-medium text-secondary transition-opacity duration-150 group-hover:opacity-75'>
              View case study →
            </span>
            {project.live_url && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    project.live_url,
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
                className='font-label text-xs text-outline transition-colors duration-150 hover:text-on-surface'
              >
                Live ↗
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Featured card — full width, more visual weight
export const FeaturedProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/gallery/${project.slug}`}
      className='group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-shadow duration-200 hover:shadow-md sm:flex-row'
    >
      {/* Image — left side on desktop */}
      <div className='relative h-52 w-full overflow-hidden sm:h-auto sm:w-2/5'>
        <Image
          src={getImageUrl(project.thumbnail)!}
          alt={'project image'}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'
          fill
        />
        <div className='absolute left-3 top-3'>
          <span className='inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 font-label text-xs font-medium text-on-primary'>
            Featured
          </span>
        </div>
      </div>

      {/* Content — right side on desktop */}
      <div className='flex flex-1 flex-col justify-between gap-4 p-6'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <CategoryBadge category={project.category} />
            {project.client_industry && (
              <span className='font-label text-xs text-outline'>
                {project.client_industry}
              </span>
            )}
          </div>

          <h3 className='font-headline text-xl font-semibold text-on-surface'>
            {project.title}
          </h3>

          <p className='font-body text-sm leading-relaxed text-on-surface-variant line-clamp-3'>
            {project.description}
          </p>

          {/* Result — the conversion element */}
          {project.result && (
            <div className='flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2'>
              <span className='text-secondary'>
                <FaChartLine />
              </span>
              <p className='font-label text-sm font-medium text-on-surface'>
                {project.result}
              </p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {project.tech_stack.slice(0, 4).map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
              {project.tech_stack.length > 4 && (
                <Tag label={`+${project.tech_stack.length - 4}`} />
              )}
            </div>
          )}

          <div className='flex items-center gap-1.5 font-label text-sm font-medium text-secondary transition-gap duration-150 group-hover:gap-2.5'>
            View case study
            <FaArrowRightLong />
          </div>
        </div>
      </div>
    </Link>
  );
};
