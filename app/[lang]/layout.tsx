import { RootProvider } from 'fumadocs-ui/provider';
import type { Translations } from 'fumadocs-ui/i18n';

// translations
const cn: Partial<Translations> = {
  search: '搜索内容',
};
const zhHant: Partial<Translations> = {
  search: '搜尋內容',
};

// available languages that will be displayed on UI
// make sure `locale` is consistent with your i18n config
const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: '简体中文',
    locale: 'zh-Hans',
  },
  {
    name: '繁體中文',
    locale: 'zh-Hant',
  },
];

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  return (
    <RootProvider
      i18n={{
        locale: lang,
        locales,
        translations: { 'zh-Hans': cn, 'zh-Hant': zhHant }[lang],
      }}
    >
      {children}
    </RootProvider>
  );
}