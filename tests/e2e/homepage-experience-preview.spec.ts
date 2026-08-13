import { test, expect } from "@playwright/test";

const PREVIEW = process.env.EXPERIENCE_PREVIEW === "true";

test.describe("homepage experience — preview composition", () => {
  test.skip(!PREVIEW, "requires a build produced with EXPERIENCE_PREVIEW=true");

  test("serves the styled Experience composition with header, sections, and footer", async ({
    page,
  }) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(
      page.getByRole("heading", {
        name: /Tu empresa no debería crecer multiplicando trabajo manual/,
      })
    ).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: "Saltar al contenido principal" })
    ).toHaveCount(1);
    await expect(page.locator("header.experience-header")).toHaveCount(1);
    await expect(page.locator("footer.experience-footer")).toHaveCount(1);
    await expect(page.locator(".problem-grid")).toHaveCount(1);
    await expect(page.locator(".impact-section")).toHaveCount(1);
    await expect(page.locator(".method-stages")).toHaveCount(1);
    await expect(page.locator(".aion-band")).toHaveCount(1);
    await expect(page.locator(".diagnosis-form-card")).toHaveCount(1);
    await expect(page.locator(".faq-disclosure")).toHaveCount(7);
    await expect(page.locator(".final-cta-section")).toHaveCount(1);
    await expect(
      page.getByText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO")
    ).toHaveCount(0);
    await expect(page.locator(".ud-header")).toHaveCount(0);
  });

  test("withholds unapproved destinations in the preview composition", async ({
    page,
  }) => {
    await page.goto("/es");
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"))
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter((href) => href.length > 0)
    );
    for (const href of hrefs) {
      expect(href).not.toMatch(/wa\.me/);
      expect(href).not.toMatch(/cal\.com|savvycal|calendly/i);
    }
  });

  test("serves the one-page Experience with nav anchors for every section", async ({
    page,
  }) => {
    await page.goto("/es");
    const navAnchors = await page
      .locator("nav.experience-nav-desktop a")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href") ?? "")
      );
    expect(navAnchors).toEqual([
      "/es#servicios",
      "/es#metodo",
      "/es#casos",
      "/es#nosotros",
    ]);
    for (const id of ["servicios", "metodo", "casos", "nosotros"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await expect(page.locator("#evidence")).toHaveCount(1);
    await expect(page.locator("#diagnosis")).toHaveCount(1);
  });

  test("keeps section sub-pages removed (404) in the preview build", async ({
    page,
  }) => {
    for (const path of [
      "/es/servicios",
      "/es/metodo",
      "/es/casos",
      "/es/nosotros",
      "/en/services",
      "/en/method",
      "/en/cases",
      "/en/about",
    ]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
    }
  });

  test("highlights the matching nav item while scrolling through homepage sections", async ({
    page,
  }) => {
    await page.goto("/es");
    const methodLink = page
      .locator("nav.experience-nav-desktop a")
      .filter({ hasText: "Método" });
    await page.locator("#method").scrollIntoViewIfNeeded();
    await expect(methodLink).toHaveClass(/experience-nav-active/);
  });

  test("shows chapter dividers and numbered editorial eyebrows on the homepage", async ({
    page,
  }) => {
    await page.goto("/es");
    await expect(page.locator(".chapter-divider")).toHaveCount(5);
    await expect(
      page.getByText("05 · QUÉ PODEMOS CONSTRUIR")
    ).toHaveCount(1);
    await expect(
      page.getByText("10 · PREGUNTAS FRECUENTES")
    ).toHaveCount(1);
  });
});
