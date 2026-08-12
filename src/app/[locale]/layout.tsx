import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "../providers";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
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

  return (
    <html lang={locale} className="!scroll-smooth">
      <body>
        <GoogleTagManager />
        <GoogleAnalytics />
        <Providers>
          <div className="isolate">
            <Header />

            {children}

            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}