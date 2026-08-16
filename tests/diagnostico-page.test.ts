import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { getHomepageContent } from "@/content/homepage";
import DiagnosticoPage from "@/app/[locale]/[...slugs]/page";

function sourceOf(path: string): string {
  try {
    return readFileSync(new URL(path, import.meta.url), "utf-8");
  } catch {
    return "";
  }
}

const pageSource = sourceOf("../src/app/[locale]/[...slugs]/page.tsx");

describe("diagnostico page composition (DIAGNOSTICO-V3-001)", () => {
  it("hosts the context-first Diagnosis form component", () => {
    const experienceSource = readFileSync(
      new URL("../src/components/HomeExperience/DiagnosisExperience.tsx", import.meta.url),
      "utf-8"
    );
    expect(experienceSource).toContain("Diagnosis");
    expect(experienceSource).toContain("getHomepageContent(locale).diagnosis");
    expect(experienceSource).not.toContain("DiagnosticoContact");
  });

  it("renders the offer sections server-first with the form", async () => {
    const element = await DiagnosticoPage({
      params: Promise.resolve({ locale: "es", slugs: ["diagnostico"] }),
    });
    const html = renderToString(element);
    expect(html.length).toBeGreaterThan(0);
  });
});

describe("homepage diagnosis offer (DIAGNOSTICO-V3-002)", () => {
  it("keeps the homepage offer factual and non-obligating in both locales", () => {
    for (const locale of ["es", "en"] as const) {
      const offer = getHomepageContent(locale).diagnosis.offer;
      expect(offer.duration).toMatch(/30|45|min/);
      expect(offer.cost).toMatch(/gratuito|free|sin costo|no cost/i);
      expect(offer.nonObligation).toMatch(/sin|no (obligation|commitment|compromiso|obligaci)/i);
    }
  });
});
