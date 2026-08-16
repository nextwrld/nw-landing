import { test, expect } from "@playwright/test";

/**
 * Homepage V3 — Fase 1 skeleton e2e. Runs against the draft build, which now
 * admits the complete V3 skeleton: exactly six content sections, route-based
 * navigation, offer-only diagnosis on the homepage, and the context-first
 * form on /es/diagnostico.
 */
test.describe("homepage v3 — entry-door skeleton", () => {
  test("composes exactly the six V3 sections with one primary conversion", async ({
    page,
  }) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    // 01 Hero with the single H1
    await expect(
      page.getByRole("heading", { level: 1, name: /Tu empresa no debería crecer/ })
    ).toHaveCount(1);

    // Section markers for the six sections
    await expect(page.locator(".problem-transformation")).toHaveCount(1);
    await expect(page.locator(".services-overview")).toHaveCount(1);
    await expect(page.locator(".method-section")).toHaveCount(1);
    await expect(page.locator(".homepage-evidence")).toHaveCount(1);
    await expect(page.locator(".diagnosis-offer")).toHaveCount(1);

    // Retired V2 blocks must not render
    await expect(page.locator(".faq-disclosure")).toHaveCount(0);
    await expect(page.locator(".final-cta-section")).toHaveCount(0);
    await expect(page.locator(".impact-section")).toHaveCount(0);
    await expect(page.locator(".diagnosis-form-card")).toHaveCount(0);
  });

  test("navigates with route-based links, never anchors", async ({ page }) => {
    await page.goto("/es");
    // The skip link (#main-content) is a legitimate accessibility anchor;
    // every other header link must be a route, never an in-page anchor.
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("header a:not(.skip-link)"))
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter((href) => href.length > 0)
    );
    for (const href of hrefs) {
      expect(href).not.toMatch(/#/);
    }
    expect(hrefs).toContain("/es/servicios/software-a-medida");
    expect(hrefs).toContain("/es/como-trabajamos");
    expect(hrefs).toContain("/es/casos");
    expect(hrefs).toContain("/es/nosotros");
    expect(hrefs).not.toContain("/es/insights");
  });

  test("converts the homepage diagnosis CTA to the /es/diagnostico route", async ({
    page,
  }) => {
    await page.goto("/es");
    const diagnosisCta = page.getByRole("link", { name: "Analizar mi operación" }).first();
    await expect(diagnosisCta).toHaveAttribute("href", "/es/diagnostico");
  });

  test("serves the full diagnosis experience on /es/diagnostico", async ({ page }) => {
    await page.goto("/es/diagnostico");
    await expect(
      page.getByRole("heading", { level: 1 }).first()
    ).toBeVisible();
  });

  test("serves EN section pages after the Fase 2 approval flip", async ({
    page,
  }) => {
    await page.goto("/en/como-trabajamos");
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      /How we work/i
    );
  });
});
