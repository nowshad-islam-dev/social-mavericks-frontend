import { fetchAPI } from '../api';
import { normalizeResponse } from '../normalizer';
import { endpoints } from '../endpoints';
import { Testimonial } from '../types';

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchAPI(endpoints.testimonials);
  const normalized = normalizeResponse(data) as Testimonial[] | null;
  return normalized || [];
}
