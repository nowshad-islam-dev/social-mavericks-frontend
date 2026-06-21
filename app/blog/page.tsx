import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import {
  getBlogPosts,
  getLatestFiveBlogPosts,
  getBlogCategories,
} from '@/lib/services/blogs';
import { getImageUrl, normalizeCollection } from '@/lib/normalizer';
import { BlogCard } from '@components/common/cards/BlogCard';
import { PaginationCard } from '@components/common/cards/PaginationCard';
import { BlogSearchInput } from '@components/BlogSearchInput';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const activeCategory = params.category;

  const [blogsData, categoriesData, latestBlogs] = await Promise.all([
    getBlogPosts(page, activeCategory),
    getBlogCategories(),
    getLatestFiveBlogPosts(),
  ]);

  const blogs = normalizeCollection(blogsData);
  const categories = normalizeCollection(categoriesData);
  const { pagination } = blogsData.meta;

  // Guard — if page exceeds pageCount redirect gracefully
  if (blogs.length === 0 && page > 1) {
    return (
      <div className='px-6 my-24 text-center'>
        <p className='font-body text-on-surface-variant'>
          No articles found on page {page}.{' '}
          <Link href='/blog' className='text-secondary font-medium underline'>
            Go back to page 1
          </Link>
        </p>
      </div>
    );
  }

  const [featuredBlog, ...restBlogs] = blogs;

  return (
    <div className='px-8 pt-20 lg:pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-16'>
      {/* ── Main column ── */}
      <div className='lg:col-span-8 space-y-16'>
        {/* Featured Article */}
        {featuredBlog && (
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className='group block cursor-pointer'
          >
            <article>
              <div className='relative overflow-hidden rounded-2xl aspect-video mb-8 border border-outline-variant/15 shadow-sm'>
                <Image
                  src={getImageUrl(featuredBlog.cover_image)!}
                  className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-[1.01]'
                  alt={featuredBlog.title}
                  fill
                  sizes='100vw'
                  priority
                />
                <div className='absolute top-6 left-6'>
                  <span className='bg-background px-4 py-2 text-xs font-bold text-primary tracking-tighter shadow-sm rounded-lg'>
                    {featuredBlog.category?.name}
                  </span>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-4 text-xs font-semibold text-on-surface-variant/60 uppercase tracking-widest'>
                  <span>
                    {new Date(featuredBlog.publishedAt).toDateString()}
                  </span>
                </div>
                <h2 className='text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300'>
                  {featuredBlog.title}
                </h2>
                <p className='text-on-surface-variant leading-relaxed text-lg line-clamp-3'>
                  {featuredBlog.excerpt}
                </p>
                <div className='pt-2'>
                  <span className='inline-flex items-center gap-2 text-secondary font-bold group/link'>
                    Read Full Article
                    <span className='w-6 h-0.5 bg-secondary transition-all duration-300 group-hover/link:w-10' />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Blog List */}
        {restBlogs.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {restBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <PaginationCard pagination={pagination} basePath='/blog' />
      </div>

      {/* ── Sidebar ── */}
      <aside className='lg:col-span-4 space-y-12'>
        {/* Search */}
        <div className='p-8 bg-surface-container-low'>
          <h4 className='text-sm font-bold text-primary uppercase tracking-widest mb-6'>
            Search Articles
          </h4>
          <BlogSearchInput />
        </div>

        {/* Categories */}
        <div className='p-8 border-l border-outline-variant/20'>
          <div className='flex justify-between items-center mb-8'>
            <h4 className='text-sm font-bold text-primary uppercase tracking-widest'>
              Categories
            </h4>
            {activeCategory && (
              <Link
                href='/blog'
                className='text-xs text-secondary hover:underline transition-colors'
              >
                Clear
              </Link>
            )}
          </div>
          <ul className='space-y-4'>
            {categories.map((category) => {
              const isCategoryActive = category.slug === activeCategory;
              return (
                <li key={category.id}>
                  <Link
                    className='flex justify-between items-center group'
                    href={`/blog?category=${category.slug}`}
                  >
                    <span
                      className={classNames(
                        'transition-colors font-medium text-sm',
                        {
                          'text-secondary font-bold': isCategoryActive,
                          'text-on-surface-variant group-hover:text-secondary':
                            !isCategoryActive,
                        },
                      )}
                    >
                      {category.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Latest Posts */}
        <div className='p-8 bg-primary text-on-primary'>
          <h4 className='text-sm font-bold uppercase tracking-widest mb-8 text-on-primary-container'>
            Latest Posts
          </h4>
          <div className='space-y-8'>
            {latestBlogs.map((blog) => (
              <Link
                key={blog.id}
                className='block group'
                href={`/blog/${blog.slug}`}
              >
                <span className='text-[10px] font-bold text-secondary uppercase mb-2 block'>
                  {new Date(blog.publishedAt).toDateString()}
                </span>
                <h5 className='text-lg font-bold leading-tight group-hover:text-primary-fixed-dim transition-colors'>
                  {blog.title}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
