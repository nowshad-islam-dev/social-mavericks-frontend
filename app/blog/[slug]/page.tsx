import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { fetchSingle } from '@/lib/api';
import { getImageUrl } from '@/lib/normalizer';
import type { Blog } from '@/lib/types';

export default async function SingleBlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const blog = await fetchSingle<Blog>(`/blog-posts/${slug}?populate=*`);

  return (
    <main className='mt-40 mb-20 sm:mb-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-8'>
      <div>
        <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center md:text-start font-bold text-primary mb-6 sm:mb-8 leading-tight'>
          {blog.title}
        </h1>
        <div className='relative h-48 sm:h-64 md:h-96 w-full mb-6 sm:mb-8 border'>
          <Image
            src={getImageUrl(blog.cover_image)!}
            alt={blog.title}
            fill
            className='object-cover'
          />
        </div>
        <p className='text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0'>
          <span>Published on: {new Date(blog.publishedAt).toDateString()}</span>
          <span className='sm:inline-block sm:ml-6 italic'>
            Written By: {blog.author_name}
          </span>
        </p>
        <div className='text-justify prose prose-sm sm:prose-base max-w-none'>
          <BlocksRenderer content={blog.content} />
        </div>
      </div>
    </main>
  );
}
