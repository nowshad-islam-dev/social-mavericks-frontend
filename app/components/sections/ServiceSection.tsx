import Image from 'next/image';
import { IoMdCart } from 'react-icons/io';
import { ImDatabase } from 'react-icons/im';
import type { HomePage } from '@/lib/types';

type ServiceProps = Pick<
  HomePage,
  'services_section_title' | 'services_section_description'
>;

export default async function Service({
  services_section_title,
  services_section_description,
}: ServiceProps) {
  return (
    <section className='py-24 bg-surface-container-low'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-8'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl md:text-5xl font-extrabold text-primary mb-6'>
              {services_section_title}
            </h2>
            <p className='text-on-surface-variant text-lg'>
              {services_section_description}
            </p>
          </div>
          <div className='hidden md:block w-32 h-px bg-outline-variant/30 mb-4'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          {/* E-commerce */}
          {/* E-commerce */}
          <div className='md:col-span-8 bg-surface-container-lowest p-12 rounded-lg flex flex-col md:flex-row gap-8 items-center border border-transparent hover:border-secondary/10 transition-all'>
            <div className='w-full md:w-1/2 space-y-4 shrink-0'>
              <span className='text-4xl text-secondary'>
                <IoMdCart />
              </span>
              <h3 className='text-2xl font-bold text-primary'>
                High-Performance E-commerce
              </h3>
              <p className='text-on-surface-variant leading-relaxed'>
                Headless commerce solutions that prioritize lightning-fast load
                times and conversion engineering for global retail brands.
              </p>
            </div>
            <div className='relative w-full md:w-1/2 aspect-video p-4 rounded'>
              <Image
                alt='E-commerce data'
                className='rounded shadow-sm object-contain'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                src='/ecommerce-data.svg'
              />
            </div>
          </div>
          {/* Automation */}
          <div className='md:col-span-4 bg-primary text-on-primary p-12 rounded-lg flex flex-col justify-between'>
            <span className='material-symbols-outlined text-4xl text-secondary'>
              automation
            </span>
            <div className='mt-12'>
              <h3 className='text-2xl font-bold mb-4'>
                Intelligent Automation
              </h3>
              <p className='text-on-primary-container text-sm leading-relaxed'>
                Eliminate bottlenecks with custom workflow logic and
                machine-learning integrations.
              </p>
            </div>
          </div>
          {/* ERP */}
          <div className='md:col-span-4 bg-surface-container-lowest p-12 rounded-lg border border-transparent hover:border-secondary/10 transition-all flex flex-col justify-between'>
            <span className='material-symbols-outlined text-4xl text-secondary'>
              <ImDatabase />
            </span>
            <div className='mt-8'>
              <h3 className='text-2xl font-bold text-primary mb-4'>
                Enterprise Resource Planning
              </h3>
              <p className='text-on-surface-variant text-sm leading-relaxed'>
                Centralized technical architecture for complex organizational
                logistics and data ledgering.
              </p>
            </div>
          </div>
          {/* Analytics */}
          <div className='md:col-span-8 bg-surface-container-highest p-12 rounded-lg flex items-center justify-between overflow-hidden'>
            <div className='max-w-xs'>
              <h3 className='text-2xl font-bold text-primary mb-4'>
                Precision Analytics
              </h3>
              <p className='text-on-surface-variant text-sm leading-relaxed'>
                Deep-dive reporting that treats data like a blueprint, ensuring
                every insight is actionable and verified.
              </p>
            </div>
            <div className='w-48 h-48 rotate-12 opacity-20'>
              <span className='material-symbols-outlined text-[10rem] text-primary'>
                monitoring
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
