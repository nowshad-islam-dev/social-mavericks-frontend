import type { Metadata } from 'next';
import Link from 'next/dist/client/link';
import { getAboutPage } from '@/lib/services/about';
import { DifferencePointCard } from '@components/common/cards/DifferencePointCard';
import { RichTextBody } from '@components/common/ui/RichTextBody';
import { FaLongArrowAltRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'About — Social Mavericks',
  description:
    'We are a two-founder digital agency building and growing online businesses with AI at the core. Custom software, e-commerce, and full-funnel digital operations.',
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <main className='min-h-screen mt-24 bg-background'>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* ── Header ── */}
        <section className='mb-14 max-w-2xl'>
          <p className='mb-3 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
            About us
          </p>
          <h1 className='mb-6 font-headline text-3xl font-semibold leading-tight text-on-background sm:text-4xl'>
            {about.headline}
          </h1>
          <div className='h-px w-16 bg-secondary mb-8' />
          <RichTextBody content={about.description} />
        </section>

        {/* ── Divider ── */}
        <div className='mb-14 h-px bg-outline-variant' />

        {/* ── Difference points ── */}
        {about.difference_points?.length > 0 && (
          <section className='mb-14'>
            <p className='mb-8 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
              What makes us different
            </p>
            <div className='grid gap-4 sm:grid-cols-2'>
              {about.difference_points.map((point) => (
                <DifferencePointCard key={point.id} point={point} />
              ))}
            </div>
          </section>
        )}

        {/* ── Divider ── */}
        <div className='mb-14 h-px bg-outline-variant' />

        {/* ── CTA ── */}
        <section>
          <div className='rounded-xl border border-outline-variant bg-surface-container-low p-8'>
            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <div>
                <h2 className='font-headline text-lg font-semibold text-on-surface'>
                  Want to work with us?
                </h2>
                <p className='mt-1 font-body text-sm text-on-surface-variant'>
                  Tell us what you&apos;re building. We&apos;ll tell you if we
                  can help.
                </p>
              </div>
              <div className='flex shrink-0 flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='group inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-label text-sm font-medium text-on-primary transition-opacity duration-150 hover:opacity-90'
                >
                  Get in touch
                  <FaLongArrowAltRight />
                </Link>
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
