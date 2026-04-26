import { fetchAPI } from '@/lib/api';
import { normalizeCollection } from '../normalizer';
import type { TrackPopulated } from '../types';

export async function getTracks(): Promise<TrackPopulated[]> {
  try {
    const res = await fetchAPI(
      '/tracks?populate[services][populate]=*&sort=order:asc',
    );
    const tracks: TrackPopulated[] = normalizeCollection<TrackPopulated>(res);

    return tracks.map((track) => ({
      ...track,
      services: [...(track.services ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    }));
  } catch (err) {
    console.error('[ServicesPage] Failed to fetch tracks:', err);
    return [];
  }
}
