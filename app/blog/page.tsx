import Image from 'next/image';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';
import { getBlogPosts, getBlogCategories } from '@/lib/services/blogs';
import { getImageUrl, normalizeCollection } from '@/lib/normalizer';
import { BlogCard } from '../components/common/cards/BlogCard';
import { PaginationCard } from '../components/common/cards/PaginationCard';

export default async function Blog() {
  const [blogsData, categoriesData] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const blogs = normalizeCollection(blogsData);
  const categories = normalizeCollection(categoriesData);
  const { pagination } = blogsData.meta;

  return (
    <div className='px-6 my-24 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 '>
      <div className='lg:col-span-8 space-y-16'>
        {/* Featured Article */}
        <article className='group cursor-pointer'>
          <div className='relative overflow-hidden aspect-video mb-8'>
            <Image
              src={getImageUrl(blogs[0].cover_image)!}
              className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105'
              alt={blogs[0].title}
              fill
            />
            <div className='absolute top-6 left-6'>
              <span className='bg-background px-4 py-2 text-xs font-bold text-primary tracking-tighter'>
                {blogs[0].category.name}
              </span>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-4 text-xs font-semibold text-on-surface-variant/60 uppercase tracking-widest'>
              <span>{new Date(blogs[0].publishedAt).toDateString()}</span>
              {/* <span className='w-8 h-px bg-outline-variant/30'>
                {blogs[0].author_name}
              </span> */}
            </div>
            <h2 className='text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-300'>
              {blogs[0].title}
            </h2>
            <p className='text-on-surface-variant leading-relaxed text-lg'>
              {blogs[0].excerpt}
            </p>
            <div className='pt-2'>
              <Link
                className='inline-flex items-center gap-2 text-secondary font-bold group/link'
                href={`/blog/${blogs[0].documentId}`}
              >
                Read Full Article
                <span className='w-6 h-0.5 bg-secondary transition-all duration-300 group-hover/link:w-10'></span>
              </Link>
            </div>
          </div>
        </article>

        {/* Blog List */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        <PaginationCard pagination={pagination} />
      </div>

      <aside className='lg:col-span-4 space-y-12'>
        <div className='p-8 bg-surface-container-low'>
          <h4 className='text-sm font-bold text-primary uppercase tracking-widest mb-6'>
            Search Articles
          </h4>
          <div className='relative'>
            <input
              className='w-full bg-transparent border-b-2 border-outline-variant/30 focus:border-primary transition-colors py-3 outline-none text-primary placeholder:text-on-surface-variant/40'
              placeholder='Keywords...'
              type='text'
            />
            <span className='material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant/40'>
              <GoSearch
                size={24}
                className='cursor-pointer hover:scale-125 transition-all duration-300'
              />
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className='p-8 border-l border-outline-variant/20'>
          <h4 className='text-sm font-bold text-primary uppercase tracking-widest mb-8'>
            Categories
          </h4>
          <ul className='space-y-4'>
            {categories.map((category) => (
              <li key={category.id}>
                <a className='flex justify-between items-center group' href='#'>
                  <span className='text-on-surface-variant group-hover:text-secondary transition-colors font-medium'>
                    {category.name}
                  </span>
                  {/* <span className='text-xs font-bold text-outline-variant'>
                  {`(${category._count.blogs})`}
                </span> */}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Posts */}
        <div className='p-8 bg-primary text-on-primary'>
          <h4 className='text-sm font-bold uppercase tracking-widest mb-8 text-on-primary-container'>
            Latest Posts
          </h4>
          <div className='space-y-8'>
            {blogs.slice(0, 3).map((blog) => (
              <Link key={blog.id} className='block group' href='#'>
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

        {/* Newsletter Signup */}
        {/* <div className='p-8 border border-outline-variant/20'>
          <h4 className='text-sm font-bold text-primary uppercase tracking-widest mb-4'>
            Newsletter
          </h4>
          <p className='text-sm text-on-surface-variant mb-6 leading-relaxed'>
            Weekly technical insights delivered directly to your inbox. No
            fluff, just code and performance.
          </p>
          <div className='space-y-4'>
            <input
              className='w-full bg-surface-container-low px-4 py-3 text-sm outline-none border-none'
              placeholder='Email Address'
              type='email'
            />
            <button className='w-full bg-secondary text-on-secondary py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all'>
              Subscribe Now
            </button>
          </div>
        </div> */}
      </aside>
    </div>
  );
}
