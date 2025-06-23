import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  return (
    <HomeLayout {...baseOptions(lang)}>
      <DocsLayout
        tree={source.pageTree[lang]}
        sidebar={{ enabled: false }}
        {...baseOptions(lang)}
      >
        {children}
      </DocsLayout>
    </HomeLayout>
  );
}
