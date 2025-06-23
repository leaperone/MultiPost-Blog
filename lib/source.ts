import { i18n } from '@/lib/i18n';
import { blog } from '@/.source';
import { loader } from 'fumadocs-core/source';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  i18n: i18n,
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
});
