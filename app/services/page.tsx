import type { Metadata } from 'next';
import { EmptyState } from '@components/EmptyState';
import { getTracks } from '@/lib/services/tracks';
import { getDifferencePoints } from '@/lib/services/about';
import { ServicesHero } from './ServicesHero';
import { TrackBanner } from './TrackBanner';
import { DifferenceSection } from './DifferenceSection';
import { ServicesCTA } from './ServicesCTA';

export const metadata: Metadata = {
  title: 'Services — Social Mavericks',
  description:
    'AI-powered software development and digital growth systems for e-commerce businesses. We build and grow — same team, full picture.',
};

export default async function ServicesPage() {
  const [tracks, differencePoints] = await Promise.all([
    getTracks(),
    getDifferencePoints(),
  ]);

  return (
    <main className='min-h-screen pt-20 lg:pt-[114px] pb-20 bg-background'>
      <ServicesHero />
      <div id='tracks' className='mx-auto max-w-5xl pt-12 px-4 sm:px-6 lg:px-8'>
        {tracks.length === 0 ? (
          <EmptyState message='Services coming soon.' />
        ) : (
          tracks.map((track, index) => (
            <TrackBanner key={track.documentId} track={track} index={index} />
          ))
        )}

        {/* ── Divider ── */}
        {differencePoints.length > 0 && (
          <div className='mb-16 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent' />
        )}

        <DifferenceSection points={differencePoints} />
        <ServicesCTA />
      </div>
    </main>
  );
}
