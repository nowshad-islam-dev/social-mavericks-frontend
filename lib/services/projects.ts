import { fetchAPI, fetchCollection } from '../api';
import { normalizeCollection } from '../normalizer';
import { endpoints } from '../endpoints';
import type { Project, ProjectCategory } from '../types';

export async function getProjects() {
  const result = await fetchCollection<Project>(endpoints.projects);
  return result;
}

export async function getProjectsByCategory(
  category: ProjectCategory,
): Promise<Project[]> {
  try {
    const categoryFilter =
      category !== 'all' ? `&filters[category][$eq]=${category}` : '';

    const result = await fetchCollection<Project>(
      `/projects?populate[thumbnail][populate]=*&sort[0]=featured:desc&sort[1]=createdAt:desc${categoryFilter}`,
    );

    return normalizeCollection<Project>(result);
  } catch (err) {
    console.error('[WorkPage] Failed to fetch projects:', err);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetchAPI(
      `/projects?filters[slug][$eq]=${slug}&populate[thumbnail][populate]=*&populate[screenshots][populate]=*`,
    );
    const items = normalizeCollection<Project>(res);
    return items[0] ?? null;
  } catch (err) {
    console.error('[ProjectDetailPage] Failed to fetch project:', err);
    return null;
  }
}

export async function getProjectSlugList(): Promise<{ slug: string }[]> {
  try {
    const res = await fetchAPI('/projects?fields[0]=slug');
    const items: { slug: string }[] = res?.data ?? [];
    return items.map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.error('[ProjectDetailPage] Failed to fetch project slugs:', err);
    return [];
  }
}
