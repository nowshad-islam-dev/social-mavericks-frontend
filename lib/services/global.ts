import { fetchAPI } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import { GlobalSettings } from '../types';

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const result = await fetchAPI(endpoints.global);
  const normalized = normalizeResponse(result) as GlobalSettings | null;
  if (!normalized) {
    throw new Error('Global settings not found');
  }
  return normalized;
}
