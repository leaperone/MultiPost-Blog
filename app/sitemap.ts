import { MetadataRoute } from 'next'
import { source } from '@/lib/source'
import { i18n } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blog.multipost.app'
  const currentDate = new Date()
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add language-specific home pages
  for (const lang of i18n.languages) {
    const langPrefix = lang === i18n.defaultLanguage ? '' : `/${lang}`
    
    sitemapEntries.push({
      url: `${baseUrl}${langPrefix}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    })
  }

  // Get all blog posts and add them for each language
  const posts = source.getPages()
  
  for (const post of posts) {
    for (const lang of i18n.languages) {
      const langPrefix = lang === i18n.defaultLanguage ? '' : `/${lang}`
      
      // Check if the post exists for this language
      try {
        const postData = source.getPage([post.slugs[0]], lang)
        if (postData) {
          const postDate = postData.data.date ? new Date(postData.data.date) : currentDate
          
          sitemapEntries.push({
            url: `${baseUrl}${langPrefix}/blog/${post.slugs[0]}`,
            lastModified: postDate,
            changeFrequency: 'monthly',
            priority: 0.8,
          })
        }
      } catch {
        // If post doesn't exist for this language, skip it
        continue
      }
    }
  }

  // Add blog index pages for each language
  for (const lang of i18n.languages) {
    const langPrefix = lang === i18n.defaultLanguage ? '' : `/${lang}`
    
    sitemapEntries.push({
      url: `${baseUrl}${langPrefix}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  return sitemapEntries
}
