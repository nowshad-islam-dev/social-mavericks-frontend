import { fetchAPI } from '../api';
import { normalizeSingle } from '../normalizer';
import { endpoints } from '../endpoints';
import { AboutPage, DifferencePoint } from '../types';

interface AboutSingle {
  difference_points: DifferencePoint[];
}

export async function getAboutPage(): Promise<AboutPage> {
  const result = await fetchAPI(endpoints.about);
  const normalized = normalizeSingle<AboutPage>(result);
  if (!normalized) {
    throw new Error('About page not found');
  }
  return normalized;
}

export async function getDifferencePoints(): Promise<DifferencePoint[]> {
  try {
    // Target only the field needed — avoid populate=* on About single type
    const res = await fetchAPI('/about?populate[difference_points]=*');
    const about = normalizeSingle<AboutSingle>(res);
    return about?.difference_points ?? [];
  } catch (err) {
    console.error('[ServicesPage] Failed to fetch difference points:', err);
    return [];
  }
}
