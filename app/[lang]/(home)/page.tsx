import Link from 'next/link';
import { source } from '@/lib/source';

// i18n文本
const texts = {
  en: {
    noBlogsMessage: "No blog posts yet"
  },
  'zh-Hans': {
    noBlogsMessage: "暂时还没有博客文章"
  },
  'zh-Hant': {
    noBlogsMessage: "暫時還沒有部落格文章"
  }
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as keyof typeof texts;
  // 获取指定语言的页面
  const blogs = source.getPages(lang);
  const t = texts[lang] || texts.en;

  return (
    <main className="flex flex-1 flex-col px-6 py-8">
      <div className="max-w-6xl mx-auto w-full">
        
        {blogs.length === 0 ? (
          <p className="text-fd-muted-foreground">
            {t.noBlogsMessage}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {blogs.map((blog) => (
              <Link 
                key={blog.url}
                href={blog.url}
                className="block space-y-3 pb-8"
              >
                <article>
                  <h2 className="text-2xl font-semibold text-fd-foreground">
                    {blog.data.title || (lang === 'zh-Hans' ? '无标题' : 'Untitled')}
                  </h2>
                  
                  {blog.data.description && (
                    <p className="text-fd-muted-foreground leading-relaxed">
                      {blog.data.description}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
