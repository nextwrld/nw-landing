import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/HomeExperience/SectionPageShell";
import { sectionPageContent, sectionPageMetadata, sectionStaticParams } from "@/utils/sectionPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return sectionStaticParams("nosotros");
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return sectionPageMetadata("nosotros", locale);
}

export default async function NosotrosPage({ params }: Props) {
  const { locale } = await params;
  const content = sectionPageContent("nosotros", locale);
  if (!content) {
    notFound();
  }
  return <SectionPageShell content={content} />;
}
