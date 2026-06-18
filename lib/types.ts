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

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  num: string;
  title: string;
  description: string;
  icon: StrapiImage;
}

export interface Founder {
  name: string;
  initials: string;
  role: string;
  bio: string;
  tags: string[];
  profile_photo: StrapiImage;
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
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
  title: string;
  headline: string;
  description: string;
  philosophy_title: string;
  philosophy_heading: string;
  timeline_title: string;
  timeline_heading: string;
  method_title: string;
  method_heading: string;
  founders_title: string;
  founders_heading: string;
  founders_description: string;
  gradient_cta_title: string;
  gradient_cta_heading: string;
  gradient_cta_description: string;
  founders: Founder[];
  milestones: Milestone[];
  workflow_steps: WorkflowStep[];
  difference_points: DifferencePoint[];
  stats: Stat[];
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
  cover_photo: StrapiImage;
  order: number;
  pricing: Pricing;
  tags: string[];
  is_differentiator: boolean;
  track: Track;
  faqs: FaqItem[];
}

export type ProjectCategory =
  | 'custom-software'
  | 'ecommerce'
  | 'crm'
  | 'pos'
  | 'erp'
  | 'others'
  | 'cms'
  | 'all';

export interface Project extends StrapiEntity {
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  thumbnail: StrapiImage;
  screenshots: StrapiImage[];
  featured: boolean;
  result: string;
  client_industry: string;
  tech_stack: string[];
  live_url: string;
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

export interface Partner extends StrapiEntity {
  name: string;
  logo: StrapiImage;
  website: string;
}
