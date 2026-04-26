import { fetchCollection } from '../api';
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
