import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllSuccessCases, getSuccessCaseBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const successCase = getSuccessCaseBySlug(slug, l, ["title", "description"]);

  if (!successCase) {
    return { title: "Success Case | Next Wrld" };
  }

  return {
    title: `${successCase.title} | Next Wrld`,
    description: successCase.description,
  };
}

export default async function SuccessCasePage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const successCase = getSuccessCaseBySlug(slug, l, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  if (!successCase) {
    notFound();
  }

  const dict = await getDictionary(l);
  const content = await markdownToHtml(successCase.content || "");

  return (
    <main>
      <Breadcrumb pageName={dict.successCases.detailsTitle} locale={l} />

      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              {successCase.coverImage && (
                <div
                  className="wow fadeInUp relative z-20 mb-[60px] h-[300px] overflow-hidden rounded md:h-[400px] lg:h-[500px]"
                  data-wow-delay=".1s"
                >
                  <Image
                    src={successCase.coverImage}
                    alt={dict.common.imageAlt}
                    width={1288}
                    height={500}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute left-0 top-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-dark-700 to-transparent">
                    <div className="flex flex-wrap items-center p-4 pb-4 sm:p-8">
                      <div className="mb-4 mr-5 flex items-center md:mr-10">
                        {successCase.authorImage && (
                          <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={successCase.authorImage}
                              alt={dict.common.imageAlt}
                              className="w-full"
                              width={40}
                              height={40}
                            />
                          </div>
                        )}
                        <p className="text-base font-medium text-white">
                          {dict.successCases.by}{" "}
                          <span className="text-white">{successCase.author}</span>
                        </p>
                      </div>
                      <div className="mb-4 flex items-center">
                        <p className="mr-5 flex items-center text-sm font-medium text-white md:mr-6">
                          <span className="mr-3">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current"
                            >
                              <path d="M13.9998 2.6499H12.6998V2.0999C12.6998 1.7999 12.4498 1.5249 12.1248 1.5249C11.7998 1.5249 11.5498 1.7749 11.5498 2.0999V2.6499H4.4248V2.0999C4.4248 1.7999 4.1748 1.5249 3.8498 1.5249C3.5248 1.5249 3.2748 1.7749 3.2748 2.0999V2.6499H1.9998C1.1498 2.6499 0.424805 3.3499 0.424805 4.2249V12.9249C0.424805 13.7749 1.1248 14.4999 1.9998 14.4999H13.9998C14.8498 14.4999 15.5748 13.7999 15.5748 12.9249V4.1999C15.5748 3.3499 14.8498 2.6499 13.9998 2.6499ZM1.5748 7.2999H3.6998V9.7749H1.5748V7.2999ZM4.8248 7.2999H7.4498V9.7749H4.8248V7.2999ZM7.4498 10.8999V13.3499H4.8248V10.8999H7.4498V10.8999ZM8.5748 10.8999H11.1998V13.3499H8.5748V10.8999ZM8.5748 9.7749V7.2999H11.1998V9.7749H8.5748ZM12.2998 7.2999H14.4248V9.7749H12.2998V7.2999ZM1.9998 3.7749H3.2998V4.2999C3.2998 4.5999 3.5498 4.8749 3.8748 4.8749C4.1998 4.8749 4.4498 4.6249 4.4498 4.2999V3.7749H11.5998V4.2999C11.5998 4.5999 11.8498 4.8749 12.1748 4.8749C12.4998 4.8749 12.7498 4.6249 12.7498 4.2999V3.7749H13.9998C14.2498 3.7749 14.4498 3.9749 14.4498 4.2249V6.1749H1.5748V4.2249C1.5748 3.9749 1.7498 3.7749 1.9998 3.7749ZM1.5748 12.8999V10.8749H3.6998V13.3249H1.9998C1.7498 13.3499 1.5748 13.1499 1.5748 12.8999ZM13.9998 13.3499H12.2998V10.8999H14.4248V12.9249C14.4498 13.1499 14.2498 13.3499 13.9998 13.3499Z" />
                            </svg>
                          </span>
                          {successCase.date ? format(parseISO(successCase.date), "dd MMM yyyy") : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <article className="blog-details">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const slugsES = getAllSuccessCases("es", ["slug"]);
  const slugsEN = getAllSuccessCases("en", ["slug"]);

  return [
    ...slugsES.map((c) => ({ locale: "es", slug: c.slug })),
    ...slugsEN.map((c) => ({ locale: "en", slug: c.slug })),
  ];
}