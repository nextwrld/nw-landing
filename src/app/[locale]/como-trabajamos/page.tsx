import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/HomeExperience/SectionPageShell";
import { sectionPageContent, sectionPageMetadata, sectionStaticParams } from "@/utils/sectionPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return sectionStaticParams("como-trabajamos");
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return sectionPageMetadata("como-trabajamos", locale);
}

export default async function ComoTrabajamosPage({ params }: Props) {
  const { locale } = await params;
  const content = sectionPageContent("como-trabajamos", locale);
  if (!content) {
    notFound();
  }
  return <SectionPageShell content={content} />;
}
