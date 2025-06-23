import { RootProvider } from 'fumadocs-ui/provider';
import type { Translations } from 'fumadocs-ui/i18n';

// translations
const cn: Partial<Translations> = {
  search: 'Translated Content',
};

// available languages that will be displayed on UI
// make sure `locale` is consistent with your i18n config
const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: 'Chinese',
    locale: 'zh',
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
        translations: { cn }[lang],
      }}
    >
      {children}
    </RootProvider>
  );
}