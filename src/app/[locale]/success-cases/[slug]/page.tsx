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
    "description",
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
      <Breadcrumb pageName={dict.successCases.detailsTitle} locale={l} hideHeading />

      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <article>
                <header className="mb-10 text-center">
                  <h1 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                    {successCase.title}
                  </h1>
                  {successCase.description && (
                    <p className="text-body-color mx-auto mb-4 max-w-[720px] text-base dark:text-dark-6">
                      {successCase.description}
                    </p>
                  )}
                  {successCase.date && (
                    <time
                      dateTime={successCase.date}
                      className="text-body-color text-sm font-medium dark:text-dark-6"
                    >
                      {format(parseISO(successCase.date), "dd MMM yyyy")}
                    </time>
                  )}
                </header>

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
                        {successCase.authorImage && (
                          <div className="mb-4 mr-5 flex items-center md:mr-10">
                            <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={successCase.authorImage}
                                alt={dict.common.imageAlt}
                                className="w-full"
                                width={40}
                                height={40}
                              />
                            </div>
                            <p className="text-base font-medium text-white">
                              {dict.successCases.by}{" "}
                              <span className="text-white">{successCase.author}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="blog-details">
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                  </div>
                </div>
              </article>
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
