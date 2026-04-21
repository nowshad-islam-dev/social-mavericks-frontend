import { fetchAPI } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import { Project } from '../types';

export async function getProjects(): Promise<Project[]> {
  const data = await fetchAPI(endpoints.projects);
  const normalized = normalizeResponse(data) as Project[] | null;
  return normalized || [];
}
