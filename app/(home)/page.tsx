import Link from 'next/link';
import { source } from '@/lib/source';

export default function HomePage() {
  const blogs = source.getPages();

  return (
    <main className="flex flex-1 flex-col px-6 py-8">
      <div className="max-w-6xl mx-auto w-full">
        
        {blogs.length === 0 ? (
          <p className="text-fd-muted-foreground">
            暂时还没有博客文章
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
                    {blog.data.title || '无标题'}
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
