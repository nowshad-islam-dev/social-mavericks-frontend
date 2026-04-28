import { fetchAPI } from '../api';
import { normalizeCollection } from '../normalizer';
import type { Service } from '../types';

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetchAPI(
      `/services?filters[slug][$eq]=${slug}&populate[faqs]=*&populate[track][populate]=*`,
    );

    const items = normalizeCollection<Service>(res);
    return items[0] ?? null;
  } catch (err) {
    console.error('[ServiceDetailPage] Failed to fetch service:', err);
    return null;
  }
}
