import './global.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MultiPost Blog',
  keywords: ['blog', 'nextjs', 'react', 'typescript', 'multilingual'],
  authors: [{ name: 'Leaperone' }],
  creator: 'Leaperone',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.multipost.app',
    title: 'MultiPost Blog',
    siteName: 'MultiPost Blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
} 