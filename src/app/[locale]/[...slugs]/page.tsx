import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/HomeExperience/SectionPageShell";
import DiagnosisExperience from "@/components/HomeExperience/DiagnosisExperience";
import {
  approvedCaseSlugs,
  getSectionContent,
  isServiceSlug,
  publishedRoutes,
  routeForSlug,
  servicePrefix,
  serviceRoutes,
  slugForRoute,
} from "@/content/sections";
import type { SectionContent, SectionRoute } from "@/content/sections/types";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSuccessCaseBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { buildPageMetadata, siteUrl } from "@/utils/seo";
import { SITE_NAME } from "../../site";

const FLAT_ROUTES: SectionRoute[] = ["como-trabajamos", "casos", "insights", "nosotros", "diagnostico"];

type Props = {
  params: Promise<{ locale: string; slugs: string[] }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const flat = publishedRoutes(locale)
      .map((slug) => ({ slug, route: routeForSlug(slug, locale) }))
      .filter(
        (entry): entry is { slug: string; route: SectionRoute } =>
          entry.route !== null && (FLAT_ROUTES as SectionRoute[]).includes(entry.route)
      )
      .map(({ slug }) => [slug]);
    const services = serviceRoutes(locale).map((slug) => [servicePrefix(locale), slug]);
    const casesSlug = slugForRoute("casos", locale);
    const cases = publishedRoutes(locale).includes(casesSlug)
      ? approvedCaseSlugs(locale).map((slug) => [casesSlug, slug])
      : [];
    return [...flat, ...services, ...cases].map((slugs) => ({ locale, slugs }));
  });
}

type Resolved =
  | { kind: "shell"; route: SectionRoute }
  | { kind: "diagnosis" }
  | { kind: "case"; caseSlug: string };

function resolve(locale: Locale, slugs: string[]): Resolved | null {
  if (slugs.length === 1) {
    const route = routeForSlug(slugs[0], locale);
    if (!route) return null;
    if (route === "diagnostico") return { kind: "diagnosis" };
    return { kind: "shell", route };
  }
  if (slugs.length === 2) {
    if (slugs[0] === servicePrefix(locale) && isServiceSlug(slugs[1], locale)) {
      const route = routeForSlug(slugs[1], locale);
      return route ? { kind: "shell", route } : null;
    }
    if (routeForSlug(slugs[0], locale) === "casos" && approvedCaseSlugs(locale).includes(slugs[1])) {
      return { kind: "case", caseSlug: slugs[1] };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slugs } = await params;
  const l: Locale = isLocale(locale) ? locale : locales[0];
  const resolved = resolve(l, slugs);
  if (!resolved) {
    return { title: "Next Wrld" };
  }
  if (resolved.kind === "diagnosis") {
    const dict = await getDictionary(l);
    return buildPageMetadata({
      locale: l,
      path: `/${slugs.join("/")}`,
      title: dict.seo.diagnostico.title,
      description: dict.seo.diagnostico.description,
    });
  }
  if (resolved.kind === "case") {
    const successCase = getSuccessCaseBySlug(resolved.caseSlug, l, ["title", "description", "coverImage"]);
    if (!successCase) return { title: "Casos" };
    return buildPageMetadata({
      locale: l,
      path: `/${slugs.join("/")}`,
      title: successCase.title ?? "Casos",
      description: successCase.description ?? "",
      image: successCase.coverImage ?? undefined,
      type: "article",
    });
  }
  const slug = slugForRoute(resolved.route, l);
  let content: SectionContent;
  try {
    content = getSectionContent(slug, l);
  } catch {
    return { title: "Next Wrld" };
  }
  return buildPageMetadata({
    locale: l,
    path: `/${slug}`,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export default async function SectionSlugsPage({ params }: Props) {
  const { locale, slugs } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const resolved = resolve(l, slugs);
  if (!resolved) {
    notFound();
  }

  if (resolved.kind === "diagnosis") {
    const dict = await getDictionary(l);
    return <DiagnosisExperience dict={dict} locale={l} />;
  }

  if (resolved.kind === "case") {
    const successCase = getSuccessCaseBySlug(resolved.caseSlug, l, [
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
    const content = await markdownToHtml(successCase.content || "");
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: successCase.title,
      description: successCase.description,
      datePublished: successCase.date,
      author: { "@type": "Organization", name: successCase.author ?? SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME },
      mainEntityOfPage: siteUrl(`/${l}/${slugs.join("/")}`),
      ...(successCase.coverImage ? { image: siteUrl(successCase.coverImage) } : {}),
    };
    return (
      <main id="main-content" className="section-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <article className="section-page__inner">
          <header>
            <h1 className="section-page__heading">{successCase.title}</h1>
            {successCase.description && (
              <p className="section-page__intro">{successCase.description}</p>
            )}
          </header>
          <div className="section-page__markdown" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>
    );
  }

  const slug = slugForRoute(resolved.route, l);
  if (!publishedRoutes(l).includes(slug)) {
    notFound();
  }
  let content: SectionContent;
  try {
    content = getSectionContent(slug, l);
  } catch {
    notFound();
    return null;
  }
  return <SectionPageShell content={content} />;
}
