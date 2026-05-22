import type { StrapiImage } from './types';

const BASE_URL = process.env.STRAPI_URL;

export function getImageUrl(image: StrapiImage | null | undefined) {
  if (!image) return null;
  return `${BASE_URL}${image.url}`;
}

export function normalizeResponse<T>(
  res: { data: T } | null | undefined,
): T | null {
  return res?.data || null;
}

export function normalizeCollection<T>(
  res: { data: T[] } | null | undefined,
): T[] {
  return res?.data ?? [];
}

export function normalizeSingle<T>(
  res: { data: T } | null | undefined,
): T | null {
  return res?.data ?? null;
}
