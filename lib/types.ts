export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  name: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface GlobalSettings {
  id: number;
  documentId: string;
  contact_title_first: string;
  contact_title_second: string;
  contact_description: string;
  site_name: string;
  footer_description: string;
  navigation_links: {
    id: number;
    label: string;
    url: string;
  }[];
  social_links: {
    id: number;
    platform: string;
    url: string;
  }[];
  contact_email: string;
  contact_text: string;
  address: string;
  google_map_link: string;
}

export interface HomePage {
  id: number;
  documentId: string;
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

export interface DifferencePoint {
  id: number;
  title: string;
  description: string;
}

export interface AboutPage {
  id: number;
  documentId: string;
  headline: string;
  description: string;
  tech_stack_logos: StrapiImage[];
  difference_points: DifferencePoint[];
}

export enum Pricing {
  'Retainer' = 'Retainer',
  'Fixed' = 'Fixed',
  'Milestone-based' = 'Milestone-based',
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  order: number;
  track: Track;
  pricing: Pricing;
  tags: string[];
  is_differentiator: boolean;
}

export interface Track {
  id: number;
  documentId: string;
  label: string;
  tagline: string;
  slug: string;
  badge: string;
  description: string;
  order: number;
  services: Service[];
}
export interface ServicePopulated extends Omit<Service, 'track'> {
  track: Track;
}

export interface TrackPopulated extends Omit<Track, 'services'> {
  services: ServicePopulated[];
}

export enum ProjectCategory {
  crm = 'crm',
  pos = 'pos',
  erp = 'erp',
  others = 'others',
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  thumbnail: StrapiImage;
  screenshots: StrapiImage[];
  featured: boolean;
}

export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  role_or_company: string;
  quote: string;
  photo: StrapiImage;
  rating: number;
}

export interface Blog {
  id: number;
  documentId: string;
  category: BlogCategory;
  title: string;
  slug: string;
  excerpt: string;
  author_name: string;
  content: string;
  cover_image: StrapiImage;
  seo_title: string;
  seo_description: string;
  publishedAt: string;
}

export interface BlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}
