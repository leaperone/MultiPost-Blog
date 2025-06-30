import { createI18nMiddleware } from 'fumadocs-core/i18n';
import { i18n } from '@/lib/i18n';

export default createI18nMiddleware(i18n);

export const config = {
  // Matcher ignoring `/_next/`, `/api/` and `/sitemap.xml`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)'],
};