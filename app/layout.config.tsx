import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { i18n } from "@/lib/i18n";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions = (lang: string): BaseLayoutProps => ({
  nav: {
    title: (
      <>
        <Image src="/favicon.ico" alt="Logo" width={24} height={24} />
        MultiPost Blog
      </>
    ),
    enabled: true,
    url: `/${lang}`,
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
  i18n: i18n,
});
