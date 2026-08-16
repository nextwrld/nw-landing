import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/HomeExperience/SectionPageShell";
import { sectionPageContent, sectionPageMetadata, sectionStaticParams } from "@/utils/sectionPage";

type Props = {
  params: Promise<{ locale: string }>;
};

// `/es/insights` content is not approved yet (open decision 3: withhold until
// real content exists). No static params are generated, so every request 404s
// via `dynamicParams = false` until Fase 2/3 approval flips the registry.
export function generateStaticParams() {
  return sectionStaticParams("insights");
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return sectionPageMetadata("insights", locale);
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  const content = sectionPageContent("insights", locale);
  if (!content) {
    notFound();
  }
  return <SectionPageShell content={content} />;
}
