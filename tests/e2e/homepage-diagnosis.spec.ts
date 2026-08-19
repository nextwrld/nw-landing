import { test, expect } from "@playwright/test";

test.describe("homepage diagnosis — draft isolation", () => {
  test("serves Foundation content with no Experience diagnosis, FAQ, or final CTA copy in initial HTML", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");
    await expect(
      page.getByRole("heading", { name: /Antes de decidir qué construir/ })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Preguntas frecuentes/ })).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: /Hagamos que sea más fácil hacerla crecer/ })
    ).toHaveCount(0);
    await expect(page.locator("#diagnosis")).toHaveCount(0);

    await page.goto("/en");
    await expect(page.locator("h1").first()).toContainText("WELCOME TO THE NEW OPERATIONAL STANDARD");
    await expect(
      page.getByRole("heading", { name: /Before deciding what to build/ })
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: /Frequently asked questions/ })
    ).toHaveCount(0);
  });

  test("keeps the page complete under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/es");
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(behavior).toBe("auto");
    await expect(page.locator("h1").first()).toBeVisible();
  });
});

test.describe("homepage diagnosis — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("does not overflow horizontally on a narrow viewport", async ({ page }) => {
    await page.goto("/es");
    const overflow = await page.evaluate(() => {
      const main = document.querySelector("#main-content");
      return main ? main.scrollWidth - main.clientWidth : -1;
    });
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
