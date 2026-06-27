import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ScrollProgress';

const manrope = Manrope({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tujenge.africa'),
  title: {
    default: 'Tujenge — Africa\'s Construction & Real Estate Marketplace',
    template: '%s | Tujenge',
  },
  description:
    'Find verified land, hire trusted contractors, source materials at fair prices, and complete your project faster. Tujenge is Africa\'s verified marketplace for construction and real estate.',
  keywords: [
    'construction marketplace Africa',
    'real estate Africa',
    'verified properties Kenya',
    'construction materials Nairobi',
    'contractors Kenya',
    'architects Lagos',
    'build a house Africa',
    'land for sale Kenya',
    'Tujenge',
  ],
  authors: [{ name: 'Tujenge' }],
  creator: 'Tujenge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tujenge.africa',
    siteName: 'Tujenge',
    title: 'Tujenge — Africa\'s Construction & Real Estate Marketplace',
    description:
      'Find verified land, hire trusted contractors, and complete your project with confidence. The verified marketplace for African construction.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Tujenge — Africa\'s Construction & Real Estate Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tujenge — Build Africa. Together.',
    description:
      'Find verified land, hire trusted contractors, and complete your project with confidence.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
