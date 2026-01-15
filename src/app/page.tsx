import About from "@/components/About";
import SuccessCasesSection from "@/components/SuccessCases/SuccessCasesSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import { getAllSuccessCases } from "@/utils/markdown";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { commonEN } from "@/i18n/en";
import { commonES } from "@/i18n/es";

export async function generateMetadata(): Promise<Metadata> {
  // Prefer language cookie; fallback to Accept-Language
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("language")?.value;
  if (cookieLang === "en" || cookieLang === "es") {
    const seo = cookieLang === "en" ? commonEN.seo.home : commonES.seo.home;
    return { title: seo.title, description: seo.description };
  }

  const h = await headers();
  const acceptRaw = h.get("accept-language") || undefined;
  const accept = acceptRaw || "es";
  const isEnglish = /(^|,\s*)en(\b|-)/i.test(accept);

  const seo = isEnglish ? commonEN.seo.home : commonES.seo.home;

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default function Home() {
  // Load success cases for default locale (Spanish)
  const casesES = getAllSuccessCases("es", ["title", "date", "excerpt", "coverImage", "slug"]);
  const casesEN = getAllSuccessCases("en", ["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main suppressHydrationWarning>
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <Faq />
      <SuccessCasesSection casesES={casesES} casesEN={casesEN} />
      <Contact />
      <Clients />
    </main>
  );
}
