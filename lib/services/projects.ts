import { fetchCollection } from '../api';
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
