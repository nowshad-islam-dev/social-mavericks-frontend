export const endpoints = {
  home: '/home?populate=*',
  services: '/services?populate=*',
  projects: '/projects?populate=*',
  testimonials: '/testimonials?populate=*',
  blogs: '/blog-posts?populate=*',
  blogCategories: '/blog-categories?populate=*',
  blogBySlug: (slug: string) =>
    `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
  global: '/global?populate=*',
};
