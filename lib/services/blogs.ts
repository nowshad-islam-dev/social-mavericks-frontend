'use server';

import { fetchAPI, fetchCollection } from '../api';
import { normalizeCollection } from '../normalizer';
import { endpoints } from '../endpoints';
import type { Blog, BlogCategory } from '../types';

const BLOGS_PER_PAGE = 25;

export async function getBlogPosts(page: number = 1) {
  const result = await fetchCollection<Blog>(
    `${endpoints.blogs}&pagination[page]=${page}&pagination[pageSize]=${BLOGS_PER_PAGE}&sort=publishedAt:desc`,
  );
  return result;
}

export async function getBlogCategories() {
  const result = await fetchCollection<BlogCategory>(endpoints.blogCategories);
  return result;
}

export async function getBlogPostBySlug(slug: string): Promise<Blog | null> {
  try {
    const result = await fetchAPI(
      `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
    );

    const items = normalizeCollection<Blog>(result);
    return items[0] ?? null;
  } catch (err) {
    console.error('[BlogPostPage] Failed to fetch blog post:', err);
    return null;
  }
}

export async function getLatestFiveBlogPosts(): Promise<Blog[]> {
  try {
    const result = await fetchAPI(
      `/blog-posts?pagination[limit]=5&sort=publishedAt:desc&populate=*`,
    );

    const items = normalizeCollection<Blog>(result);
    return items;
  } catch (err) {
    console.error('[BlogPostPage] Failed to fetch latest blog posts:', err);
    return [];
  }
}

export async function searchBlogPosts(query: string): Promise<Blog[]> {
  if (!query.trim()) return [];
  try {
    const encoded = encodeURIComponent(query);
    const result = await fetchAPI(
      `/blog-posts?filters[$or][0][title][$containsi]=${encoded}&filters[$or][1][excerpt][$containsi]=${encoded}&pagination[limit]=8&sort=publishedAt:desc&populate=*`,
    );
    const items = normalizeCollection<Blog>(result);
    return items;
  } catch (err) {
    console.error('[BlogPostPage] Failed to search blog posts:', err);
    return [];
  }
}
