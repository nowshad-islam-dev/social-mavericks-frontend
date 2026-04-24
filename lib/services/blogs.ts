import { fetchAPI, fetchCollection } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import type { Blog, BlogCategory } from '../types';

export async function getBlogPosts() {
  const result = await fetchCollection<Blog>(endpoints.blogs);
  if (!result) {
    throw new Error('Blog posts not found');
  }
  return result;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const result = await fetchAPI(endpoints.blogCategories);
  const normalized = normalizeResponse(result) as BlogCategory[];
  if (!normalized) {
    throw new Error('Blog categories not found');
  }
  return normalized;
}
