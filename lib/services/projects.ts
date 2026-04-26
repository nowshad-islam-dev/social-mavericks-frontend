import { fetchCollection } from '../api';
import { endpoints } from '../endpoints';
import type { Project } from '../types';

export async function getProjects() {
  const result = await fetchCollection<Project>(endpoints.projects);
  return result;
}
