import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/normalizer';
import type { Blog } from '@/lib/types';

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blog/${blog.slug}`} className='group block cursor-pointer'>
      <article className='flex flex-col h-full'>
        <div className='aspect-4/3 mb-6 overflow-hidden rounded-xl bg-surface-container-low relative h-64 shadow-sm border border-outline-variant/10'>
          <Image
            src={getImageUrl(blog.cover_image)!}
            className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-[1.02]'
            alt={blog.title}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
        <span className='text-xs font-bold text-secondary uppercase tracking-widest block mb-3'>
          {blog.category?.name}
        </span>
        <h3 className='text-xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors duration-200'>
          {blog.title}
        </h3>
        <p className='text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3'>
          {blog.excerpt}
        </p>
        <span className='text-xs font-bold text-secondary uppercase tracking-wider inline-flex items-center gap-1 group-hover:underline mt-auto'>
          Read More →
        </span>
      </article>
    </Link>
  );
};
