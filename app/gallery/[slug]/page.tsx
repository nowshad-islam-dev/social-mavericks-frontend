import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaArrowLeftLong, FaChartLine } from 'react-icons/fa6';
import { CategoryBadge, Tag } from '@components/common/ui/Badge';
import { getImageUrl } from '@/lib/normalizer';
import { getProjectBySlug, getProjectSlugList } from '@/lib/services/projects';
import { CalendlyButton } from '@components/common/ui/Button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found — Social Mavericks' };
  }

  return {
    title: `${project.title} Case Study — Social Mavericks`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return await getProjectSlugList();
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const screenshots = project.screenshots || [];

  return (
    <main className='min-h-screen pt-24 lg:pt-32 pb-20 bg-background'>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        {/* Back Link */}
        <div className='mb-8'>
          <Link
            href='/gallery'
            className='inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-secondary transition-colors duration-150'
          >
            <FaArrowLeftLong /> Back to work
          </Link>
        </div>

        {/* Header Section */}
        <header className='mb-12'>
          <div className='flex items-center gap-3 mb-4'>
            <CategoryBadge category={project.category} />
            {project.client_industry && (
              <span className='inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-label text-xs font-semibold text-slate-600'>
                {project.client_industry}
              </span>
            )}
          </div>

          <h1 className='text-3xl sm:text-5xl font-extrabold text-primary mb-6 leading-tight'>
            {project.title}
          </h1>

          <p className='text-lg leading-relaxed text-on-surface-variant max-w-3xl'>
            {project.description}
          </p>
        </header>

        {/* Hero Result Banner */}
        {project.result && (
          <section className='mb-12 bg-primary text-on-primary rounded-2xl p-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800 relative overflow-hidden'>
            <div className='absolute right-0 top-0 w-32 h-32 bg-secondary/15 rounded-full blur-3xl pointer-events-none' />
            <div className='space-y-2 relative z-10'>
              <span className='text-xs font-mono tracking-widest text-secondary uppercase'>
                KEY SUCCESS METRIC
              </span>
              <h3 className='text-2xl sm:text-3xl font-extrabold flex items-center gap-2'>
                <FaChartLine className='text-secondary shrink-0' />{' '}
                {project.result}
              </h3>
            </div>
            {project.live_url && (
              <a
                href={project.live_url}
                target='_blank'
                rel='noopener noreferrer'
                className='relative z-10 inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 font-semibold text-on-secondary shadow-md hover:bg-secondary/95 hover:scale-[1.02] transition-all duration-200 text-sm shrink-0'
              >
                Visit Live Site ↗
              </a>
            )}
          </section>
        )}

        {/* Featured Case Study Thumbnail */}
        <section className='relative w-full mb-6 sm:mb-8 aspect-video border'>
          <Image
            src={getImageUrl(project.thumbnail)!}
            alt={`${project.title} Cover`}
            fill
            className='object-cover'
            priority
          />
        </section>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <section className='mb-12 border-t border-outline-variant/40 pt-8'>
            <h4 className='font-headline text-sm font-bold text-primary uppercase tracking-wider mb-4'>
              Technologies Applied
            </h4>
            <div className='flex flex-wrap gap-2'>
              {project.tech_stack.map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
            </div>
          </section>
        )}

        {/* Screenshots Gallery */}
        {screenshots.length > 0 && (
          <section className='mb-16 border-t border-outline-variant/40 pt-8'>
            <h4 className='font-headline text-sm font-bold text-primary uppercase tracking-wider mb-6'>
              Project Gallery
            </h4>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {screenshots.map((shot, index) => (
                <div
                  key={shot.id}
                  className='relative aspect-[4/3] rounded-xl overflow-hidden border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow duration-300 bg-surface-container-low'
                >
                  <Image
                    src={getImageUrl(shot)!}
                    alt={`${project.title} Screenshot ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 420px'
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call To Action Box */}
        <section className='border-t border-outline-variant/40 pt-12'>
          <div className='rounded-2xl border border-outline-variant bg-surface-container-low p-8 shadow-sm relative overflow-hidden'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10'>
              <div className='max-w-md'>
                <h3 className='font-headline text-xl font-bold text-on-surface'>
                  Looking for a similar performance result?
                </h3>
                <p className='mt-2 font-body text-sm text-on-surface-variant leading-relaxed'>
                  Let's explore your technology bottlenecks. We build custom
                  integrations, high-converting platforms, and system
                  automations tailored to your operational KPIs.
                </p>
              </div>
              <div className='flex flex-wrap gap-3 shrink-0'>
                <CalendlyButton />
                <Link
                  href='/gallery'
                  className='inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-2.5 font-label text-sm font-medium text-on-surface hover:border-outline hover:bg-surface-container-low transition-all duration-150'
                >
                  View other projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
