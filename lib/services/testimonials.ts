import { fetchCollection } from '../api';
import { endpoints } from '../endpoints';
import type { Testimonial } from '../types';

export async function getTestimonials() {
  const result = await fetchCollection<Testimonial>(endpoints.testimonials);
  return result;
}
