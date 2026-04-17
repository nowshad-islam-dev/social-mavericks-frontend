import type { HomePage, Service } from '@/lib/types';
import { getServices } from '@/lib/services/services';
import { ServiceCard } from '../common/ServiceCard';

interface ServiceProps {
  home: HomePage;
}

export default async function Service({ home }: ServiceProps) {
  const services = await getServices();

  return (
    <section className='bg-linear-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32 max-w-7xl mx-auto rounded-lg'>
      <div className='space-y-4 md:space-y-6'>
        <h3 className='title'>{home.services_section_title}</h3>
        <p className='subtitle'>{home.services_section_description}</p>
      </div>
      <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
