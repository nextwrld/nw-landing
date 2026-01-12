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

export const metadata: Metadata = {
  title: "Next Wrld - Preparing organizations for the Next World",
  description: "We build the systems that free your organization from operational chaos. Digital architecture with product criteria and strategic AI.",
};

export default function Home() {
  // Load success cases for default locale (Spanish)
  const casesES = getAllSuccessCases("es", ["title", "date", "excerpt", "coverImage", "slug"]);
  const casesEN = getAllSuccessCases("en", ["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
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
