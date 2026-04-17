import 'dotenv/config';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';

const roboto = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Mavericks - Social Media Agency',
  description: 'Professional social media marketing and management services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${roboto.className} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
