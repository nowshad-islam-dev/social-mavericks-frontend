export const Tag = ({ label }: { label: string }) => {
  return (
    <span className='inline-flex items-center rounded-full border border-outline-variant bg-surface-container px-2.5 py-0.5 font-label text-xs text-on-surface-variant'>
      {label}
    </span>
  );
};

export const PricingBadge = ({ pricing }: { pricing: string }) => {
  return (
    <span className='inline-flex items-center rounded-full border border-outline-variant bg-surface-container-low px-2.5 py-0.5 font-label text-xs text-on-surface-variant'>
      {pricing}
    </span>
  );
};
