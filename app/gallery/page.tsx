import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import classNames from 'classnames';
import {
  ProjectCard,
  FeaturedProjectCard,
} from '@components/common/cards/ProjectCard';
import { EmptyState } from '@components/EmptyState';
import { CalendlyButton } from '@components/common/ui/Button';
import { getProjectsByCategory } from '@/lib/services/projects';
import type { ProjectCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Our Work — Social Mavericks',
  description:
    'Real projects. Real results. Browse our portfolio of e-commerce platforms, ERP systems, CRM tools, and AI-integrated applications.',
};

const CATEGORY_TABS: { label: string; value: ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'E-Commerce', value: 'ecommerce' },
  { label: 'ERP', value: 'erp' },
  { label: 'CRM', value: 'crm' },
  { label: 'POS', value: 'pos' },
  { label: 'Custom Software', value: 'custom-software' },
  { label: 'Others', value: 'others' },
];

const VALID_CATEGORIES = CATEGORY_TABS.map((t) => t.value);

function CategoryTabs({ active }: { active: ProjectCategory }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {CATEGORY_TABS.map((tab) => {
        const isActive = tab.value === active;
        const href =
          tab.value === 'all' ? '/gallery' : `/gallery?category=${tab.value}`;

        return (
          <Link
            key={tab.value}
            href={href}
            className={classNames(
              'inline-flex items-center rounded-full border px-4 py-1.5 font-label text-sm transition-colors duration-150',
              {
                'border-primary bg-primary text-on-primary': isActive,
                'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-outline hover:text-on-surface':
                  !isActive,
              },
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const rawCategory = (await searchParams).category ?? 'all';

  // Validate category — 404 on unknown values so crawlers don't index junk URLs
  if (!VALID_CATEGORIES.includes(rawCategory as ProjectCategory)) {
    notFound();
  }

  const activeCategory = rawCategory as ProjectCategory;
  const projects = await getProjectsByCategory(activeCategory);

  // Split featured from rest — featured always renders first at full width
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main className='min-h-screen bg-background mt-28'>
      <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* ── Header ── */}
        <section className='mb-10'>
          <p className='mb-3 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
            Our work
          </p>
          <h1 className='mb-4 font-headline text-3xl font-semibold leading-tight text-on-background sm:text-4xl'>
            Projects that{' '}
            <span className='text-secondary'>actually shipped</span>
          </h1>
          <p className='max-w-xl font-body text-base leading-relaxed text-on-surface-variant'>
            Real businesses. Real problems. Here&apos;s how we solved them.
          </p>
        </section>

        {/* ── Filter tabs ── */}
        <section className='mb-10'>
          <CategoryTabs active={activeCategory} />
        </section>

        {/* ── Project count ── */}
        {projects.length > 0 && (
          <p className='mb-6 font-label text-xs text-outline'>
            {projects.length} project{projects.length !== 1 ? 's' : ''}
            {activeCategory !== 'all' && (
              <span>
                {' '}
                in{' '}
                {CATEGORY_TABS.find((t) => t.value === activeCategory)?.label}
              </span>
            )}
          </p>
        )}

        {/* ── Featured projects ── */}
        {featured.length > 0 && (
          <section className='mb-6 flex flex-col gap-4'>
            {featured.map((project) => (
              <FeaturedProjectCard key={project.documentId} project={project} />
            ))}
          </section>
        )}

        {/* ── Rest of projects ── */}
        {rest.length > 0 ? (
          <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {rest.map((project) => (
              <ProjectCard key={project.documentId} project={project} />
            ))}
          </section>
        ) : (
          projects.length === 0 && (
            <EmptyState message="Check back soon - We're always shipping." />
          )
        )}

        {/* ── Divider ── */}
        <div className='mb-12 mt-16 h-px bg-outline-variant' />

        {/* ── CTA ── */}
        <section>
          <div className='rounded-xl border border-outline-variant bg-surface-container-low p-8'>
            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <div>
                <h2 className='font-headline text-lg font-semibold text-on-surface'>
                  Have a project in mind?
                </h2>
                <p className='mt-1 font-body text-sm text-on-surface-variant'>
                  Tell us what you&apos;re building. We&apos;ll tell you if and
                  how we can help.
                </p>
              </div>
              <div className='flex shrink-0 flex-wrap gap-3'>
                <CalendlyButton url='https://calendly.com/socialmavericksdigital/30min' />
                <Link
                  href='/services'
                  className='inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-2.5 font-label text-sm font-medium text-on-surface transition-colors duration-150 hover:border-outline'
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
