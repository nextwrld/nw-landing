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

  test("serves every section sub-page with its own H1, reused slice, and Experience chrome", async ({
    page,
  }) => {
    const cases = [
      { path: "/es/servicios", h1: /Software a medida, sistemas de gestión y automatización/, slice: ".capability-grid" },
      { path: "/es/metodo", h1: /Cómo trabajamos/, slice: ".method-stages" },
      { path: "/es/casos", h1: /Casos y trabajo real/, slice: ".aion-band" },
      { path: "/es/nosotros", h1: /Por qué Next Wrld/, slice: ".differentiation-list" },
      { path: "/en/services", h1: /Custom software, management systems, and automation/, slice: ".capability-grid" },
      { path: "/en/method", h1: /How we work/, slice: ".method-stages" },
      { path: "/en/cases", h1: /Cases and real work/, slice: ".aion-band" },
      { path: "/en/about", h1: /Why Next Wrld/, slice: ".differentiation-list" },
    ];
    for (const c of cases) {
      await page.goto(c.path);
      await expect(page.locator("header.experience-header")).toHaveCount(1);
      await expect(page.locator("footer.experience-footer")).toHaveCount(1);
      await expect(
        page.getByRole("heading", { level: 1, name: c.h1 })
      ).toHaveCount(1);
      await expect(page.locator(c.slice)).toHaveCount(1);
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
