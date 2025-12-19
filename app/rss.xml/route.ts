import { source } from '@/lib/source';

export async function GET() {
  const baseUrl = 'https://blog.multipost.app';
  const pages = source.getPages();

  const items = pages
    .filter((page) => page.data.date) // Only include pages with dates
    .sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA; // Sort by date descending
    })
    .map((page) => {
      const langPrefix = page.locale === 'en' ? '' : `/${page.locale}`;
      const url = `${baseUrl}${langPrefix}/blog/${page.slugs.join('/')}`;
      const pubDate = page.data.date
        ? new Date(page.data.date).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${page.data.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description><![CDATA[${page.data.description || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${page.data.author ? `<author><![CDATA[${page.data.author}]]></author>` : ''}
      ${page.data.keywords ? page.data.keywords.map((keyword: string) => `<category><![CDATA[${keyword}]]></category>`).join('\n      ') : ''}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MultiPost Blog - 多平台内容发布技术分享</title>
    <link>${baseUrl}</link>
    <description>分享多平台内容发布技术、社交媒体运营经验和产品动态</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>MultiPost Blog</title>
      <link>${baseUrl}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
