import { fetchSingle } from '../api';
import { endpoints } from '../endpoints';
import type { HomePage } from '../types';

export async function getHomePage(): Promise<HomePage> {
  const result = await fetchSingle<HomePage>(endpoints.home);
  if (!result) {
    throw new Error('Home page data not found');
  }
  return result;
}
