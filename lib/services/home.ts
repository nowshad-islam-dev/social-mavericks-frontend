import { fetchAPI } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import { HomePage } from '../types';

export async function getHomePage(): Promise<HomePage> {
  const data = await fetchAPI(endpoints.home);
  const normalized = normalizeResponse(data) as HomePage | null;
  if (!normalized) {
    throw new Error('Home page data not found');
  }
  return normalized;
}
