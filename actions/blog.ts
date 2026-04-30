'use server';

import { searchBlogPosts } from '@/lib/services/blogs';
import type { Blog } from '@/lib/types';

export async function searchBlogsAction(query: string): Promise<Blog[]> {
  return searchBlogPosts(query);
}
