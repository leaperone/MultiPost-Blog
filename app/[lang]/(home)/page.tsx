import Link from 'next/link';
import { source } from '@/lib/source';

// i18n文本
const texts = {
  en: {
    noBlogsMessage: "No blog posts yet",
    by: "By",
    on: "on"
  },
  'zh-Hans': {
    noBlogsMessage: "暂时还没有博客文章",
    by: "作者",
    on: "发布于"
  },
  'zh-Hant': {
    noBlogsMessage: "暫時還沒有部落格文章",
    by: "作者",
    on: "發布於"
  },
  ja: {
    noBlogsMessage: "まだブログ記事がありません",
    by: "著者",
    on: "投稿日"
  },
  fr: {
    noBlogsMessage: "Aucun article de blog pour le moment",
    by: "Par",
    on: "le"
  },
  es: {
    noBlogsMessage: "Aún no hay publicaciones en el blog",
    by: "Por",
    on: "el"
  },
  pt: {
    noBlogsMessage: "Ainda não há postagens no blog",
    by: "Por",
    on: "em"
  },
  ko: {
    noBlogsMessage: "아직 블로그 글이 없습니다",
    by: "작성자",
    on: "작성일"
  },
  ms: {
    noBlogsMessage: "Belum ada catatan blog lagi",
    by: "Oleh",
    on: "pada"
  },
  id: {
    noBlogsMessage: "Belum ada postingan blog",
    by: "Oleh",
    on: "pada"
  },
  ru: {
    noBlogsMessage: "Пока нет записей в блоге",
    by: "Автор",
    on: "опубликовано"
  }
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as keyof typeof texts;
  // 支持的语言及显示名
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh-Hans', label: '简体中文' },
    { code: 'zh-Hant', label: '繁體中文' },
    { code: 'ja', label: '日本語' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'ko', label: '한국어' },
    { code: 'ms', label: 'Melayu' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'ru', label: 'Русский' },
  ];
  // 获取指定语言的页面
  const allBlogs = source.getPages(lang);
  
  // 按日期排序，新的在前（降序）
  const blogs = allBlogs.sort((a, b) => {
    const dateA = a.data.date;
    const dateB = b.data.date;
    
    // 如果两个都没有日期，保持原有顺序
    if (!dateA && !dateB) return 0;
    // 没有日期的放在后面
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    // 按日期降序排列（新的在前）
    return dateB.getTime() - dateA.getTime();
  });
  
  const t = texts[lang] || texts.en;

  return (
    <main className="flex flex-1 flex-col px-6 py-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* 多语言快捷跳转栏 */}
        <nav className="flex flex-wrap gap-2 mb-8">
          {languages.map((item) => (
            <Link
              key={item.code}
              href={`/${item.code}`}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                lang === item.code
                  ? 'bg-fd-primary text-fd-primary-foreground'
                  : 'bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
                className="block space-y-3 pb-8 border-b border-fd-border last:border-b-0"
              >
                <article className="space-y-3">
                  <h2 className="text-2xl font-semibold text-fd-foreground hover:text-fd-primary transition-colors">
                    {blog.data.title || (lang === 'zh-Hans' ? '无标题' : 'Untitled')}
                  </h2>
                  
                  {/* 作者和日期信息 */}
                  {(blog.data.author || blog.data.date) && (
                    <div className="flex items-center gap-4 text-sm text-fd-muted-foreground">
                      {blog.data.author && (
                        <span className="flex items-center gap-1">
                          {t.by} {blog.data.author}
                        </span>
                      )}
                      {blog.data.date && (
                        <span className="flex items-center gap-1">
                          {t.on} {blog.data.date.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {blog.data.description && (
                    <p className="text-fd-muted-foreground leading-relaxed">
                      {blog.data.description}
                    </p>
                  )}
                  
                  {/* 关键词标签 */}
                  {blog.data.keywords && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {blog.data.keywords.split(',').slice(0, 5).map((keyword, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-fd-secondary text-fd-secondary-foreground text-xs rounded-md"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                      {blog.data.keywords.split(',').length > 5 && (
                        <span className="px-2 py-1 text-fd-muted-foreground text-xs">
                          +{blog.data.keywords.split(',').length - 5}
                        </span>
                      )}
                    </div>
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
