import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaqAccordion } from '@components/common/ui/Accordion';
import { Tag, PricingBadge } from '@components/common/ui/Badge';
import { TrackBreadcrumb } from '@components/common/ui/Breadcrumb';
import { fetchAPI } from '@/lib/api';
import { getServiceBySlug } from '@/lib/services/services';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found — Social Mavericks' };
  }

  return {
    title: `${service.title} — Social Mavericks`,
    description: service.short_description,
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetchAPI('/services?fields[0]=slug');
    const services: { slug: string }[] = res?.data ?? [];
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const hasFaqs = service.faqs?.length > 0;

  return (
    <main className='min-h-screen bg-background mt-24'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* ── Breadcrumb ── */}
        <div className='mb-8'>
          <TrackBreadcrumb track={service.track} />
        </div>

        {/* ── Header ── */}
        <header className='mb-10'>
          {service.is_differentiator && (
            <div className='mb-3'>
              <span className='inline-flex items-center rounded-full bg-secondary px-3 py-0.5 font-label text-xs font-medium text-on-secondary'>
                Differentiator
              </span>
            </div>
          )}

          <h1 className='mb-3 font-headline text-3xl font-semibold leading-tight text-on-background sm:text-4xl'>
            {service.title}
          </h1>

          <p className='mb-5 font-body text-base leading-relaxed text-on-surface-variant'>
            {service.short_description}
          </p>

          {/* Meta row */}
          <div className='flex flex-wrap items-center gap-2'>
            <PricingBadge pricing={service.pricing} />
            {service.tags?.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>

        {/* ── Divider ── */}
        <div className='mb-10 h-px bg-outline-variant' />

        {/* ── Long description (rich text) ── */}
        <section className='mb-12'>
          <BlocksRenderer content={service.long_description} />
        </section>

        {/* ── FAQ ── */}
        {hasFaqs && (
          <section className='mb-12'>
            <p className='mb-5 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
              Frequently asked questions
            </p>
            <FaqAccordion faqs={service.faqs} />
          </section>
        )}

        {/* ── Divider ── */}
        <div className='mb-10 h-px bg-outline-variant' />

        {/* ── CTA ── */}
        <section>
          <div className='rounded-xl border border-outline-variant bg-surface-container-low p-8'>
            <h2 className='mb-1 font-headline text-lg font-semibold text-on-surface'>
              Interested in {service.title}?
            </h2>
            <p className='mb-6 font-body text-sm text-on-surface-variant'>
              Tell us about your project. We&apos;ll come back with a clear
              plan, not a sales pitch.
            </p>
            <div className='flex flex-wrap gap-3'>
              <a
                href='/contact'
                className='group inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-label text-sm font-medium text-on-primary transition-opacity duration-150 hover:opacity-90'
              >
                Book a discovery call
                <FaLongArrowAltRight />
              </a>
              <Link
                href='/services'
                className='inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-2.5 font-label text-sm font-medium text-on-surface transition-colors duration-150 hover:border-outline'
              >
                View all services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
