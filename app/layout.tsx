import 'dotenv/config';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getGlobalSettings } from '@/lib/services/global';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Mavericks — AI-Powered Software & Digital Growth',
  description:
    'We build and grow digital businesses with AI at the core. Custom e-commerce, ERP, CRM, and full-funnel digital operations.',
  openGraph: {
    title: 'Social Mavericks — AI-Powered Software & Digital Growth',
    description:
      'We build and grow digital businesses with AI at the core. Custom e-commerce, ERP, CRM, and full-funnel digital operations.',
    url: 'https://www.socialmavdigital.com',
  },
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
      <head>
        <link
          href='https://assets.calendly.com/assets/external/widget.css'
          rel='stylesheet'
        ></link>
      </head>
      <body className='min-h-full flex flex-col'>
        <Navbar {...navbarProps} />
        {children}
        <Footer {...footerProps} />
        <Script
          src='https://assets.calendly.com/assets/external/widget.js'
          type='text/javascript'
          async
          strategy='lazyOnload'
        ></Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-39NT4SNC51`}
          strategy='lazyOnload'
        />
        <Script id='google-analytics' strategy='lazyOnload'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-39NT4SNC51');
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
