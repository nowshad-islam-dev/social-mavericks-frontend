'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaChartLine, FaArrowRightLong } from 'react-icons/fa6';
import { CategoryBadge, Tag } from '@components/common/ui/Badge';
import { getImageUrl } from '@/lib/normalizer';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' }}
      className='group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-all duration-300'
    >
      {/* Absolute overlay link for the entire card */}
      <Link
        href={`/gallery/${project.slug}`}
        className='absolute inset-0 z-10'
        aria-label={`View ${project.title} case study`}
      />

      {/* Thumbnail */}
      <div className='relative h-44 w-full overflow-hidden'>
        <Image
          src={getImageUrl(project.thumbnail)!}
          alt={project.title}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute left-3 top-3 z-20'>
          <CategoryBadge category={project.category} />
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col gap-3 p-5 z-20'>
        <div className='flex flex-col gap-1.5'>
          {project.client_industry && (
            <span className='font-label text-xs text-outline'>
              {project.client_industry}
            </span>
          )}
          <h3 className='font-headline text-base font-semibold text-on-surface group-hover:text-secondary transition-colors duration-200'>
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
            <span className='font-label text-xs font-medium text-secondary flex items-center gap-1 group-hover:underline'>
              View case study <FaArrowRightLong className='w-3 h-3 group-hover:translate-x-1 transition-transform duration-200' />
            </span>
            {project.live_url && (
              <a
                href={project.live_url}
                target='_blank'
                rel='noopener noreferrer'
                className='relative z-30 font-label text-xs text-outline hover:text-primary transition-colors duration-150'
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Featured card — full width, more visual weight
export const FeaturedProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' }}
      className='group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-all duration-300 sm:flex-row'
    >
      {/* Absolute overlay link for the entire card */}
      <Link
        href={`/gallery/${project.slug}`}
        className='absolute inset-0 z-10'
        aria-label={`View ${project.title} case study`}
      />

      {/* Image — left side on desktop */}
      <div className='relative h-52 w-full overflow-hidden sm:h-auto sm:w-2/5'>
        <Image
          src={getImageUrl(project.thumbnail)!}
          alt={project.title}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]'
          fill
          sizes='(max-width: 768px) 100vw, 40vw'
        />
        <div className='absolute left-3 top-3 z-20'>
          <span className='inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 font-label text-xs font-medium text-on-primary'>
            Featured
          </span>
        </div>
      </div>

      {/* Content — right side on desktop */}
      <div className='flex flex-1 flex-col justify-between gap-4 p-6 z-20'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <CategoryBadge category={project.category} />
            {project.client_industry && (
              <span className='font-label text-xs text-outline'>
                {project.client_industry}
              </span>
            )}
          </div>

          <h3 className='font-headline text-xl font-semibold text-on-surface group-hover:text-secondary transition-colors duration-200'>
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

          <div className='flex items-center justify-between border-t border-outline-variant pt-3'>
            <span className='font-label text-sm font-medium text-secondary flex items-center gap-1.5 group-hover:underline'>
              View case study
              <FaArrowRightLong className='group-hover:translate-x-1 transition-transform duration-200' />
            </span>
            {project.live_url && (
              <a
                href={project.live_url}
                target='_blank'
                rel='noopener noreferrer'
                className='relative z-30 font-label text-xs text-outline hover:text-primary transition-colors duration-150'
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
