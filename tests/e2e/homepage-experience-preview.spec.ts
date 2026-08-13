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
});
