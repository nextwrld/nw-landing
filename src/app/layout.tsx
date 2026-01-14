import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import Providers from "./providers";
import { cookies, headers } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const c = cookies();
  let cookieLang: string | undefined;
  // Support environments where cookies() may not expose .get()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (c as any).get === "function") {
    // @ts-ignore
    cookieLang = (c as any).get("language")?.value;
  } else {
    const h = headers();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cookieHeader = (typeof (h as any).get === "function")
      // @ts-ignore
      ? (h as any).get("cookie")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : (h as any)["cookie"];
    if (cookieHeader) {
      const match = String(cookieHeader).match(/(?:^|;\s*)language=([^;]+)/);
      if (match) cookieLang = decodeURIComponent(match[1]);
    }
  }
  const initialLang = cookieLang === "en" ? "en" : "es";
  return (
    <html suppressHydrationWarning className="!scroll-smooth" lang={initialLang}>
      <body>
        <Providers initialLanguage={initialLang}>
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
