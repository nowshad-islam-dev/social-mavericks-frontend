import { fetchAPI, fetchCollection } from '../api';
import { normalizeCollection } from '../normalizer';
import { endpoints } from '../endpoints';
import type { Blog, BlogCategory } from '../types';

export async function getBlogPosts() {
  const result = await fetchCollection<Blog>(endpoints.blogs);
  return result;
}

export async function getBlogCategories() {
  const result = await fetchCollection<BlogCategory>(endpoints.blogCategories);
  return result;
}

export async function getBlogPostBySlug(slug: string): Promise<Blog | null> {
  try {
    const res = await fetchAPI(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
    );

    const items = normalizeCollection<Blog>(res);
    return items[0] ?? null;
  } catch (err) {
    console.error('[BlogPostPage] Failed to fetch blog post:', err);
    return null;
  }
}
