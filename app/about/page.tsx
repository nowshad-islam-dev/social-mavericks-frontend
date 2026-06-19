import type { Metadata } from 'next';
import { getAboutPage } from '@/lib/services/about';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About — Social Mavericks',
  description:
    'We are a two-founder digital agency building and growing online businesses with AI at the core. Custom software, e-commerce, and full-funnel digital operations.',
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return <AboutClient about={about} />;
}

