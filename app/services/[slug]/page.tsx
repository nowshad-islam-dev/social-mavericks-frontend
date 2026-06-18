import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServiceSlugList } from '@/lib/services/services';
import { ServiceDetailHero } from './ServiceDetailHero';
import { ServiceDetailContent } from './ServiceDetailContent';
import { ServiceDetailSidebar } from './ServiceDetailSidebar';
// import { RelatedServices } from './RelatedServices';

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
  return await getServiceSlugList();
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <main className='min-h-screen pt-24 lg:pt-32 pb-16 lg:pb-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12'>
          {/* Main Content */}
          <section className='min-w-0'>
            <ServiceDetailHero service={service} />
            <ServiceDetailContent service={service} />
          </section>

          {/* Sidebar */}
          <aside className='lg:sticky lg:top-24 h-fit'>
            <ServiceDetailSidebar service={service} />
          </aside>
        </div>

        {/* Related Services */}
        {/* <RelatedServices services={service} /> */}
      </div>
    </main>
  );
}
