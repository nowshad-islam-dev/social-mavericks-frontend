export const endpoints = {
  home: '/home?populate=*',
  services: '/services?populate=*',
  tracks: '/tracks?populate=*',
  projects: '/projects?populate=*',
  testimonials: '/testimonials?populate=*',
  blogs: '/blog-posts?populate=*',
  blogCategories: '/blog-categories?populate=*',
  blogBySlug: (slug: string) =>
    `/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
  global: '/global?populate=*',
  about:
    '/about?populate[0]=workflow_steps&populate[1]=workflow_steps.icon&populate[2]=founders&populate[3]=founders.profile_photo&populate[4]=stats&populate[5]=difference_points&populate[6]=milestones',
  partners: '/partners?populate=*',
};
