import 'dotenv/config';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getGlobalSettings } from '@/lib/services/global';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Mavericks - Social Media Agency',
  description: 'Professional social media marketing and management services',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globals = await getGlobalSettings();
  const navbarProps = {
    navigation_links: globals.navigation_links,
  };
  const footerProps = {
    navigation_links: globals.navigation_links,
    social_links: globals.social_links,
    site_name: globals.site_name,
    footer_description: globals.footer_description,
    contact_email: globals.contact_email,
    contact_text: globals.contact_text,
  };

  return (
    <html lang='en' className={`${inter.className} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <Navbar {...navbarProps} />
        {children}
        <Footer {...footerProps} />
      </body>
    </html>
  );
}
