import { RootProvider } from 'fumadocs-ui/provider';
import type { Translations } from 'fumadocs-ui/i18n';

// translations
const cn: Partial<Translations> = {
  search: '搜索内容',
};
const zhHant: Partial<Translations> = {
  search: '搜尋內容',
};

const ja: Partial<Translations> = {};
const fr: Partial<Translations> = {};
const es: Partial<Translations> = {};
const pt: Partial<Translations> = {};
const ko: Partial<Translations> = {};
const ms: Partial<Translations> = {};
const id: Partial<Translations> = {};
const ru: Partial<Translations> = {};

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
  {
    name: '日本語',
    locale: 'ja',
  },
  {
    name: 'Français',
    locale: 'fr',
  },
  {
    name: 'Español',
    locale: 'es',
  },
  {
    name: 'Português',
    locale: 'pt',
  },
  {
    name: '한국어',
    locale: 'ko',
  },
  {
    name: 'Bahasa Melayu',
    locale: 'ms',
  },
  {
    name: 'Bahasa Indonesia',
    locale: 'id',
  },
  {
    name: 'Русский',
    locale: 'ru',
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
        translations: {
          'zh-Hans': cn,
          'zh-Hant': zhHant,
          ja,
          fr,
          es,
          pt,
          ko,
          ms,
          id,
          ru,
        }[lang],
      }}
    >
      {children}
    </RootProvider>
  );
}