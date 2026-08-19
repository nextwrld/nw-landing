import { test, expect } from "@playwright/test";

test.describe("homepage evidence — draft isolation", () => {
  test("serves Foundation content with no Experience evidence copy or visuals in initial HTML", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");
    await expect(
      page.getByRole("heading", { name: /También construimos nuestros propios productos/ })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /AION/ })).toHaveCount(0);
    await expect(page.locator('img[src*="/images/experience/"]')).toHaveCount(0);

    await page.goto("/en");
    await expect(page.locator("h1").first()).toContainText("WELCOME TO THE NEW OPERATIONAL STANDARD");
    await expect(
      page.getByRole("heading", { name: /We also build our own products/ })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /AION/ })).toHaveCount(0);
    await expect(page.locator('img[src*="/images/experience/"]')).toHaveCount(0);
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

test.describe("homepage evidence — mobile", () => {
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
