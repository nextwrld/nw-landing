import { test, expect } from "@playwright/test";

test.describe("homepage observability — draft metadata", () => {
  test("/es and /en serve self-canonical URLs with reciprocal hreflang alternates", async ({ page }) => {
    await page.goto("/es");
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(
      "https://nextwrld.com/es"
    );
    const esAlternates = await page.evaluate(() =>
      Array.from(document.querySelectorAll('link[rel="alternate"]')).map((link) => ({
        hreflang: link.getAttribute("hreflang"),
        href: link.getAttribute("href"),
      }))
    );
    expect(esAlternates).toContainEqual({ hreflang: "es", href: "https://nextwrld.com/es" });
    expect(esAlternates).toContainEqual({ hreflang: "en", href: "https://nextwrld.com/en" });

    await page.goto("/en");
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(
      "https://nextwrld.com/en"
    );
    const enAlternates = await page.evaluate(() =>
      Array.from(document.querySelectorAll('link[rel="alternate"]')).map((link) => ({
        hreflang: link.getAttribute("hreflang"),
        href: link.getAttribute("href"),
      }))
    );
    expect(enAlternates).toContainEqual({ hreflang: "es", href: "https://nextwrld.com/es" });
    expect(enAlternates).toContainEqual({ hreflang: "en", href: "https://nextwrld.com/en" });
  });

  test("draft pages withhold the Experience FAQ schema", async ({ page }) => {
    await page.goto("/es");
    const schemaScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schemaScripts.length).toBeGreaterThan(0);
    for (const script of schemaScripts) {
      expect(script).not.toContain("FAQPage");
    }
  });
});

test.describe("homepage observability — analytics failure resilience", () => {
  test("language switching still navigates when tracking is blocked", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { dataLayer: { push: () => never } }).dataLayer = {
        push: () => {
          throw new Error("consent blocked");
        },
      };
    });
    await page.goto("/es");
    await page.getByRole("button", { name: "Switch to English" }).first().click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("homepage observability — language switch context", () => {
  test("records source/target, preserves page context, and records no diagnosis conversion", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    });
    await page.goto("/es#pricing");
    await page.getByRole("button", { name: "Switch to English" }).first().click();
    await expect(page).toHaveURL(/\/en#pricing$/);

    const events = await page.evaluate(
      () => (window as unknown as { dataLayer?: { event?: string }[] }).dataLayer ?? []
    );
    const languageChanges = events.filter((entry) => entry?.event === "language_change");
    expect(languageChanges).toHaveLength(1);
    expect(languageChanges[0]).toMatchObject({
      from_locale: "es",
      to_locale: "en",
      page: "/es",
    });
    expect(events.some((entry) => entry?.event === "diagnosis_cta_click")).toBe(false);
  });
});
