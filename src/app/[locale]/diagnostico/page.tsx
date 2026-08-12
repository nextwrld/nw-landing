import { Metadata } from "next";
import Hero from "@/components/Diagnostico/Hero";
import Audience from "@/components/Diagnostico/Audience";
import Checklist from "@/components/Diagnostico/Checklist";
import Outcomes from "@/components/Diagnostico/Outcomes";
import Modelo from "@/components/Diagnostico/Modelo";
import DiagnosticoContact from "@/components/Diagnostico/ContactWrapper";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/utils/seo";
import { OG_DEFAULT_IMAGE } from "../../site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(l);
  return buildPageMetadata({
    locale: l,
    path: "/diagnostico",
    title: dict.seo.diagnostico.title,
    description: dict.seo.diagnostico.description,
    image: OG_DEFAULT_IMAGE,
  });
}

const DiagnosticoPage = async ({ params }: Props) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);

  return (
    <>
      <Hero dict={dict.diagnostico.hero} />
      <Audience dict={dict.diagnostico.audience} />
      <Checklist dict={dict.diagnostico.review} />
      <Outcomes dict={dict.diagnostico.outcomes} />
      <Modelo dict={dict.diagnostico.model} />
      <div id="contacto-diagnostico">
        <DiagnosticoContact dict={dict} />
      </div>
    </>
  );
};

export default DiagnosticoPage;