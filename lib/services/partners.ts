import { fetchCollection } from '../api';
import { endpoints } from '../endpoints';
import type { Partner } from '../types';

export async function getPartners() {
  const result = await fetchCollection<Partner>(endpoints.partners);
  return result;
}
    