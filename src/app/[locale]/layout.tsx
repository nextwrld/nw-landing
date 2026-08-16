import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import ExperienceHeader from "@/components/HomeExperience/ExperienceHeader";
import ExperienceFooter from "@/components/HomeExperience/ExperienceFooter";
import buildMenuData, { buildApprovedNavV3 } from "@/components/Header/menuData";
import Providers from "../providers";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_NAME, SITE_URL } from "../site";
import { inter } from "../fonts";
import { siteUrl } from "@/utils/seo";
import { localizedHref } from "@/utils/i18n-url";
import { admitPublication, getPublicationConfig, isV3SkeletonReady } from "@/content/homepage/publication";
import { getHomepageContent } from "@/content/homepage";
import "@/styles/index.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Diseñamos y construimos sistemas digitales que transforman procesos manuales y desorden operativo en estructuras claras, eficientes y escalables.",
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: siteUrl("/es"),
  },
  twitter: {
    card: "summary_large_image",
    site: "@NextWrld30538",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/company/next-wrld/",
    "https://x.com/NextWrld30538",
    "https://www.instagram.com/nextwrldsystems/",
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);
  const admission = admitPublication(getPublicationConfig(), {
    skeletonComplete: isV3SkeletonReady(),
  });
  const content = getHomepageContent(l);
  const experienceAdmitted = admission.composition !== "foundation";
  const menu = experienceAdmitted
    ? buildApprovedNavV3(content)
    : buildMenuData(dict.menu, l);
  const diagnosisCta = experienceAdmitted
    ? { label: content.hero.primaryCta, href: localizedHref(l, "/diagnostico") }
    : undefined;

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <GoogleTagManager />
        <Providers>
          <div className="isolate">
            {experienceAdmitted ? (
              <>
                <ExperienceHeader
                  menu={menu}
                  content={content}
                  diagnosisCta={diagnosisCta}
                />

                {children}

                <ExperienceFooter content={content} dict={dict} locale={l} />
              </>
            ) : (
              <>
                <Header menu={menu} diagnosisCta={diagnosisCta} />

                {children}

                <Footer dict={dict.footer} locale={l} />
              </>
            )}
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}