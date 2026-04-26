export const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className='rounded-xl border border-outline-variant bg-surface-container-low px-6 py-12 text-center'>
      <p className='font-body text-sm text-on-surface-variant'>{message}</p>
    </div>
  );
};
