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

export interface GlobalSettings {
  id: number;
  documentId: string;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HomePage {
  id: number;
  documentId: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_label: string;
  hero_background_image: StrapiImage;
  services_section_title: string;
  services_section_description: string;
  gallery_section_title: string;
  testimonials_section_title: string;
  cta_title: string;
  cta_button_label: string;
  cta_link: string;
}

export interface Service {
  id: number;
  documentId: string;
  icon: StrapiImage;
  title: string;
  short_description: string;
  long_description: string;
}
