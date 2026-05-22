import { REVALIDATE_TIME } from './constants';
import { Pagination } from './types';

const API_URL = process.env.STRAPI_URL;

type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination: Pagination;
  };
};

if (!API_URL) {
  throw new Error('STRAPI_URL environment variable is not set');
}

export async function fetchAPI(path: string) {
  const res = await fetch(`${API_URL}/api${path}`, {
    next: { revalidate: REVALIDATE_TIME }, // ISR
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}

export async function fetchCollection<T>(
  endpoint: string,
): Promise<StrapiResponse<T>> {
  const res = await fetchAPI(endpoint);
  return res as StrapiResponse<T>;
}

export async function fetchSingle<T>(endpoint: string): Promise<T> {
  const res = await fetchAPI(endpoint);
  return res.data as T;
}
