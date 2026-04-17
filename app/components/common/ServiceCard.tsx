import Image from 'next/image';
import type { Service } from '@/lib/types';
import { getImageUrl } from '@/lib/normalizer';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
}: ServiceCardProps) => {
  return (
    <div className='p-6 bg-background flex flex-col items-center rounded-lg shadow-md hover:shadow-lg transition-shadow'>
      <Image
        src={getImageUrl(service.icon)!}
        alt={service.title}
        width={64}
        height={64}
      />
      <h3 className='text-xl text-center font-semibold mb-2 text-primary'>
        {service.title}
      </h3>
      <p className='text-tertiary text-center text-sm'>
        {service.short_description}
      </p>
    </div>
  );
};
