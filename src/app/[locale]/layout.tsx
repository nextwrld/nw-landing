import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import buildMenuData from "@/components/Header/menuData";
import Providers from "../providers";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "@/styles/index.css";
import "@/styles/prism-vsc-dark-plus.css";

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
        <GoogleTagManager />
        <GoogleAnalytics />
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