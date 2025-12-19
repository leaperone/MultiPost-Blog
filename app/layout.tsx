import './global.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.multipost.app'),
  title: {
    default: 'MultiPost Blog - 多平台内容发布技术分享',
    template: '%s | MultiPost Blog',
  },
  description:
    'MultiPost 官方博客，分享多平台内容发布技术、社交媒体运营经验、产品动态和最佳实践。帮助内容创作者提升工作效率，实现一键多平台发布。',
  keywords: [
    'MultiPost',
    '多平台发布',
    '内容分发',
    '社交媒体运营',
    '浏览器扩展',
    '技术博客',
    '一键发布',
    '效率工具',
    'multi-platform publishing',
    'content distribution',
    'social media management',
    'browser extension',
  ],
  authors: [{ name: 'MultiPost Team', url: 'https://blog.multipost.app' }],
  creator: 'MultiPost',
  publisher: 'MultiPost',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US', 'ko_KR', 'pt_BR'],
    url: 'https://blog.multipost.app',
    title: 'MultiPost Blog - 多平台内容发布技术分享',
    description: '分享多平台内容发布技术、社交媒体运营经验和产品动态',
    siteName: 'MultiPost Blog',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MultiPost Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MultiPost Blog - 多平台内容发布技术分享',
    description: '分享多平台内容发布技术、社交媒体运营经验和产品动态',
    images: ['/twitter-image.png'],
    creator: '@multipost_app',
  },
  alternates: {
    canonical: 'https://blog.multipost.app',
    types: {
      'application/rss+xml': 'https://blog.multipost.app/rss.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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