import { fetchSingle } from '../api';
import { endpoints } from '../endpoints';
import type { AboutPage, DifferencePoint } from '../types';

interface AboutSingle {
  difference_points: DifferencePoint[];
}

export async function getAboutPage(): Promise<AboutPage> {
  const result = await fetchSingle<AboutPage>(endpoints.about);
  if (!result) {
    throw new Error('About page not found');
  }
  return result;
}

export async function getDifferencePoints(): Promise<DifferencePoint[]> {
  try {
    // Target only the field needed — avoid populate=* on About single type
    const result = await fetchSingle<AboutSingle>(
      '/about?populate[difference_points]=*',
    );
    return result?.difference_points ?? [];
  } catch (err) {
    console.error('[ServicesPage] Failed to fetch difference points:', err);
    return [];
  }
}
