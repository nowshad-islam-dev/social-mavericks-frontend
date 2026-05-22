interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

export function LegalLayout({
  children,
  title,
  lastUpdated,
}: LegalLayoutProps) {
  return (
    <main className='min-h-screen bg-background mt-24'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* Header */}
        <header className='mb-10'>
          <p className='mb-3 font-label text-xs font-semibold uppercase tracking-widest text-outline'>
            Legal
          </p>
          <h1 className='mb-3 font-headline text-3xl font-semibold text-on-background'>
            {title}
          </h1>
          <p className='font-label text-xs text-outline'>
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className='h-px bg-outline-variant mb-10' />

        {/* MDX content */}
        <div className='legal-prose'>{children}</div>
      </div>
    </main>
  );
}
