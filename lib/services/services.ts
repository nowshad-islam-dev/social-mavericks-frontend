import { fetchAPI } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import { Service } from '../types';

export async function getServices(): Promise<Service[]> {
  const data = await fetchAPI(endpoints.services);
  const normalized = normalizeResponse(data) as Service[] | null;
  return normalized || [];
}
