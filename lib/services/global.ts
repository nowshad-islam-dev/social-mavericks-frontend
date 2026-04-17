import { fetchAPI } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import { GlobalSettings } from '../types';

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const data = await fetchAPI(endpoints.global);
  const normalized = normalizeResponse(data);
  if (!normalized) {
    throw new Error('Global settings not found');
  }
  return normalized;
}
