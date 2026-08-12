import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import buildMenuData from "@/components/Header/menuData";
import Providers from "../providers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_NAME, SITE_URL } from "../site";
import { siteUrl } from "@/utils/seo";
import "@/styles/index.css";
import "@/styles/prism-vsc-dark-plus.css";

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

  return (
    <html lang={locale} suppressHydrationWarning className="!scroll-smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <GoogleTagManager />
        <Providers>
          <div className="isolate">
            <Header menu={buildMenuData(dict.menu, l)} />

            {children}

            <Footer dict={dict.footer} locale={l} />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}