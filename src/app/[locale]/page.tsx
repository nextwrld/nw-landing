import About from "@/components/About";
import SuccessCasesSection from "@/components/SuccessCases/SuccessCasesSection";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import { getAllSuccessCases } from "@/utils/markdown";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(l);
  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const cases = getAllSuccessCases(l, [
    "title",
    "date",
    "description",
    "coverImage",
    "slug",
    "author",
    "authorImage",
  ]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <Faq />
      <SuccessCasesSection cases={cases} />
      <Contact />
      <Clients />
    </main>
  );
}