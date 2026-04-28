import type { BlocksContent } from '@strapi/blocks-react-renderer';

interface StrapiEntity {
  id: number;
  documentId: string;
}

interface StrapiTimestamps {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImage extends StrapiEntity {
  url: string;
  name: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  alternativeText?: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface DifferencePoint {
  id: number;
  title: string;
  description: string;
}

interface NavigationLink {
  id: number;
  label: string;
  url: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface GlobalSettings extends StrapiEntity {
  site_name: string;
  footer_description: string;
  contact_title_first: string;
  contact_title_second: string;
  contact_description: string;
  contact_email: string;
  contact_text: string;
  address: string;
  google_map_link: string;
  navigation_links: NavigationLink[];
  social_links: SocialLink[];
}

export interface HomePage extends StrapiEntity {
  hero_title_first: string;
  hero_title_second: string;
  hero_subtitle: string;
  hero_cta_label: string;
  hero_background_image: StrapiImage;
  services_section_title: string;
  services_section_description: string;
  gallery_section_title: string;
  testimonials_section_title: string;
  cta_title: string;
  cta_description: string;
  cta_button_label: string;
  cta_link: string;
}

export interface AboutPage extends StrapiEntity {
  headline: string;
  description: string;
  tech_stack_logos: StrapiImage[];
  difference_points: DifferencePoint[];
}

export type Pricing = 'Retainer' | 'Fixed' | 'Milestone-based';

export interface Track extends StrapiEntity {
  label: string;
  tagline: string;
  slug: string;
  badge: string;
  description: string;
  order: number;
  services: Service[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface Service extends StrapiEntity {
  title: string;
  slug: string;
  short_description: string;
  long_description: BlocksContent;
  order: number;
  pricing: Pricing;
  tags: string[];
  is_differentiator: boolean;
  track: Track;
  faqs: FaqItem[];
}

export type ProjectCategory = 'crm' | 'pos' | 'erp' | 'others';

export interface Project extends StrapiEntity {
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  thumbnail: StrapiImage;
  screenshots: StrapiImage[];
  featured: boolean;
}

export interface Testimonial extends StrapiEntity {
  name: string;
  role_or_company: string;
  quote: string;
  photo: StrapiImage;
  rating: number;
}

export interface BlogCategory extends StrapiEntity {
  name: string;
  slug: string;
}

export interface Blog extends StrapiEntity, StrapiTimestamps {
  title: string;
  slug: string;
  excerpt: string;
  author_name: string;
  content: BlocksContent;
  cover_image: StrapiImage;
  category: BlogCategory;
  seo_title: string;
  seo_description: string;
}
