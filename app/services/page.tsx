import type { Metadata } from 'next';
import Link from 'next/link';
import classNames from 'classnames';
import { ServiceCard } from '@components/common/cards/ServiceCard';
import { DifferencePointCard } from '@components/common/cards/DifferencePointCard';
import { EmptyState } from '@components/EmptyState';
import { CalendlyButton } from '@components/common/ui/Button';
import { getTracks } from '@/lib/services/tracks';
import { getDifferencePoints } from '@/lib/services/about';
import type { Track } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Services — Social Mavericks',
  description:
    'AI-powered software development and digital growth systems for e-commerce businesses. We build and grow — same team, full picture.',
};

function TrackHeader({ track }: { track: Track }) {
  const isGrowth = track.slug === 'growth';

  return (
    <div
      className={classNames('rounded-xl border p-5', {
        'border-primary-fixed bg-primary-container': isGrowth,
        'border-secondary-fixed bg-secondary-container': !isGrowth,
      })}
    >
      <span
        className={classNames(
          'font-label text-xs font-semibold uppercase tracking-widest',
          {
            'text-on-primary-container': isGrowth,
            'text-on-secondary-container': !isGrowth,
          },
        )}
      >
        {track.label}
      </span>
      <h2
        className={classNames('mt-1 font-headline text-xl font-semibold', {
          'text-on-primary': isGrowth,
          'text-on-secondary-container': !isGrowth,
        })}
      >
        {track.tagline}
      </h2>
      <p
        className={classNames('mt-0.5 font-label text-xs', {
          'text-on-primary-container': isGrowth,
          'text-on-secondary-container': !isGrowth,
        })}
      >
        {track.badge}
      </p>
      <p
        className={classNames('mt-4 font-body text-sm leading-relaxed', {
          'text-on-primary-container': isGrowth,
          'text-on-secondary-container': !isGrowth,
        })}
      >
        {track.description}
      </p>
    </div>
  );
}

function SectionDivider({ label }: { label: string; isGrowth: boolean }) {
  return (
    <div className='mb-6 flex items-center gap-3'>
      <span className='inline-flex shrink-0 items-center rounded-full border px-3 py-1 font-label text-xs font-semibold border-secondary-fixed bg-secondary-fixed text-on-secondary-fixed'>
        {label}
      </span>
      <div className='h-px flex-1 bg-outline-variant' />
    </div>
  );
}

export default async function ServicesPage() {
  const [tracks, differencePoints] = await Promise.all([
    getTracks(),
    getDifferencePoints(),
  ]);

  return (
    <main className='min-h-screen mt-24 bg-background'>
      <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* ── Page header ── */}
        <section className='mb-14'>
          <p className='mb-3 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
            What we do
          </p>
          <h1 className='mb-4 font-headline text-3xl font-semibold leading-tight text-on-background sm:text-4xl'>
            We build and grow digital businesses —{' '}
            <span className='text-secondary'>with AI at the core</span>
          </h1>
          <p className='max-w-xl font-body text-base leading-relaxed text-on-surface-variant'>
            Whether you need a system built from scratch or your existing
            business scaled faster, we handle both ends — and connect them. Most
            agencies do one or the other. We do both.
          </p>
        </section>

        {/* ── Track overview ── */}
        {tracks.length > 0 && (
          <section className='mb-14 grid gap-4 sm:grid-cols-2'>
            {tracks.map((track) => (
              <TrackHeader key={track.documentId} track={track} />
            ))}
          </section>
        )}

        {/* ── Services per track ── */}
        {tracks.length === 0 ? (
          <EmptyState message='Services coming soon.' />
        ) : (
          <div>
            {tracks.map((track) => {
              const isGrowth = track.slug === 'growth';

              return (
                <section key={track.documentId} className='mb-14'>
                  <SectionDivider
                    label={`${track.label} — ${track.tagline}`}
                    isGrowth={isGrowth}
                  />
                  {track.services?.length > 0 ? (
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                      {track.services.map((service) => (
                        <ServiceCard
                          key={service.documentId}
                          service={service}
                          isGrowth={isGrowth}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState message='No services listed yet.' />
                  )}
                </section>
              );
            })}
          </div>
        )}

        {/* ── Divider ── */}
        <div className='mb-14 h-px bg-outline-variant' />

        {/* ── Difference points ── */}
        {differencePoints.length > 0 && (
          <section className='mb-14'>
            <p className='mb-6 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
              Why this matters
            </p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {differencePoints.map((point) => (
                <DifferencePointCard key={point.id} point={point} />
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section>
          <div className='rounded-xl border border-outline-variant bg-surface-container-low p-8'>
            <div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center'>
              <div>
                <h2 className='font-headline text-lg font-semibold text-on-surface'>
                  Not sure which track fits you?
                </h2>
                <p className='mt-1 font-body text-sm text-on-surface-variant'>
                  Tell us your problem. We&#39;ll tell you what makes sense — no
                  pitch, no pressure.
                </p>
              </div>
              <div className='flex shrink-0 flex-wrap gap-3'>
                <CalendlyButton url='https://calendly.com/socialmavericksdigital/30min' />
                <Link
                  href='/gallery'
                  className='inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-2.5 font-label text-sm font-medium text-on-surface transition-colors duration-150 hover:border-outline'
                >
                  See our work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
