import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BlogCategoryBreadcrumb } from '@components/common/ui/Breadcrumb';
import { getBlogPostBySlug } from '@/lib/services/blogs';
import { fetchAPI } from '@/lib/api';
import { getImageUrl } from '@/lib/normalizer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) {
    return { title: 'Blog Post Not Found — Social Mavericks' };
  }

  return {
    title: `${blog.seo_title} — Social Mavericks`,
    description: blog.seo_description,
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetchAPI('/blogs?fields[0]=slug');
    const blogs: { slug: string }[] = res?.data ?? [];
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export default async function SingleBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) notFound();

  return (
    <main className='mt-40 mb-20 sm:mb-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-8'>
      <div className='mb-8'>
        <BlogCategoryBreadcrumb category={blog.category} />
      </div>
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

        <div className='mt-8 mx-auto'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 rounded-lg bg-surface-container-lowest px-5 py-2.5 font-label text-sm font-medium text-on-surface transition-all duration-200 hover:text-on-secondary-fixed-variant hover:scale-110'
          >
            Discover more posts
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
