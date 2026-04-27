import Image from 'next/image';
import Link from 'next/link';
import type { Blog } from '@/lib/types';
import { getImageUrl } from '@/lib/normalizer';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }: BlogCardProps) => {
  return (
    <article className='group cursor-pointer'>
      <div className='aspect-4/3 mb-6 overflow-hidden bg-surface-container-low relative h-64'>
        <Image
          src={getImageUrl(blog.cover_image)!}
          className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105'
          alt={blog.title}
          fill
        />
      </div>
      <span className='text-xs font-bold text-secondary uppercase tracking-widest block mb-3'>
        {blog.category.name}
      </span>
      <h3 className='text-xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors'>
        {blog.title}
      </h3>
      <p className='text-sm text-on-surface-variant leading-relaxed mb-4'>
        {blog.excerpt}
      </p>
      <Link
        className='text-xs font-black uppercase tracking-tighter border-b-2 border-primary pb-0.5'
        href={`/blog/${blog.documentId}`}
      >
        Read More
      </Link>
    </article>
  );
};
