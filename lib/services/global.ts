import { fetchSingle } from '../api';
import { endpoints } from '../endpoints';
import type { GlobalSettings } from '../types';

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const result = await fetchSingle<GlobalSettings>(endpoints.global);
  if (!result) {
    throw new Error('Global settings not found');
  }
  return result;
}
