export const endpoints = {
  home: '/home?populate=*',
  services: '/services?populate=*',
  projects: '/projects?populate=*',
  blogs: '/blog-posts?populate=*',
  blogBySlug: (slug: string) =>
    `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
  global: '/global?populate=*',
};
