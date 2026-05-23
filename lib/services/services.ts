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

export async function getServiceSlugList() {
  try {
    const res = await fetchAPI('/services?fields[0]=slug');
    const services: { slug: string }[] = res?.data ?? [];
    return services.map((s) => ({ slug: s.slug }));
  } catch (err) {
    console.error('[ServiceDetailPage] Failed to fetch service slugs:', err);
    return [];
  }
}
