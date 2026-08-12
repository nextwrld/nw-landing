import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { getAllSuccessCases } from "@/utils/markdown";
import SuccessCasePage from "@/app/[locale]/success-cases/[slug]/page";

const decodeHtml = (html: string) =>
  html
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

describe("success case page semantics", () => {
  it.each(["es", "en"] as const)(
    "renders exactly one descriptive H1 and the visible description for every %s case",
    async (locale) => {
      const cases = getAllSuccessCases(locale, ["slug", "title", "description"]);

      for (const c of cases) {
        if (!c.slug) {
          throw new Error(`case ${locale} has no slug`);
        }
        const element = await SuccessCasePage({
          params: Promise.resolve({ locale, slug: c.slug }),
        });
        const html = decodeHtml(renderToString(element));

        const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) ?? [];
        expect(h1s, `case ${locale}/${c.slug}`).toHaveLength(1);
        expect(html).toContain(c.title);
        expect(html).toContain(c.description);
        expect(html).not.toContain(">Detalles del Caso de Éxito</h1>");
        expect(html).not.toContain(">Success Case Details</h1>");
      }
    }
  );

  it("renders a descriptive H1 equal to the case title", async () => {
    const element = await SuccessCasePage({
      params: Promise.resolve({ locale: "es", slug: "crm" }),
    });
    const html = decodeHtml(renderToString(element));
    expect(html).toMatch(/<h1[^>]*>InmoCRM[^<]*/);
  });
});
