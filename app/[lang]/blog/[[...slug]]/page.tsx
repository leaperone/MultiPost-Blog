import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDXContent = page.data.body;

  const langPrefix = params.lang === 'en' ? '' : `/${params.lang}`;
  const url = `https://blog.multipost.app${langPrefix}/blog/${params.slug?.join('/') || ''}`;
  const publishedTime = page.data.date ? new Date(page.data.date).toISOString() : new Date().toISOString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.data.title,
    description: page.data.description,
    image: 'https://blog.multipost.app/og-image.png',
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      '@type': 'Person',
      name: page.data.author || 'MultiPost Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MultiPost',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.multipost.app/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const langPrefix = params.lang === 'en' ? '' : `/${params.lang}`;
  const url = `https://blog.multipost.app${langPrefix}/blog/${params.slug?.join('/') || ''}`;
  const publishedTime = page.data.date ? new Date(page.data.date).toISOString() : undefined;

  return {
    title: page.data.title,
    description: page.data.description,
    keywords: page.data.keywords,
    authors: page.data.author ? [{ name: page.data.author }] : [{ name: 'MultiPost Team' }],
    openGraph: {
      type: 'article',
      locale: params.lang === 'zh-Hans' ? 'zh_CN' : 'en_US',
      url: url,
      title: page.data.title,
      description: page.data.description,
      siteName: 'MultiPost Blog',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
      publishedTime,
      authors: page.data.author ? [page.data.author] : ['MultiPost Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: ['/twitter-image.png'],
      creator: '@multipost_app',
    },
    alternates: {
      canonical: url,
    },
  };
}
