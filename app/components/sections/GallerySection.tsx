'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/normalizer';
import type { Project } from '@/lib/types';

type GalleryProps = {
  gallery_section_title: string;
  projects: Project[];
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
  },
};

export default function Gallery({ gallery_section_title, projects }: GalleryProps) {
  const featuredProjects = (projects || [])
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <section className='py-24 bg-surface overflow-hidden'>
      <div className='max-w-7xl mx-auto px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className='mb-16'
        >
          <h2 className='text-3xl md:text-5xl font-extrabold text-primary mb-2'>
            {gallery_section_title}
          </h2>
          <div className='h-1 w-20 bg-secondary'></div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className='group'
            >
              <Link href={`/gallery/${project.slug}`}>
                <div className='relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-surface-container-low shadow-sm group-hover:shadow-md transition-shadow duration-300'>
                  <Image
                    src={getImageUrl(project.thumbnail)!}
                    alt='Project Thumbnail'
                    className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105'
                    fill
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-200'>
                      {project.title}
                    </h4>
                    <p className='text-on-surface-variant text-sm mt-1 capitalize'>
                      {project.category.replace('-', ' ')}
                    </p>
                  </div>
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0'>
                    <FaArrowRightLong size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
