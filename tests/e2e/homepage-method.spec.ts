import { test, expect } from "@playwright/test";

test.describe("homepage method — draft isolation", () => {
  test("serves Foundation content with no Experience capability or method copy in initial HTML", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");
    await expect(
      page.getByRole("heading", { name: /Tecnología diseñada alrededor de tu operación/ })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Software a medida/ })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /De entender el problema a construir/ })).toHaveCount(0);

    await page.goto("/en");
    await expect(page.locator("h1").first()).toContainText("WELCOME TO THE NEW OPERATIONAL STANDARD");
    await expect(
      page.getByRole("heading", { name: /Technology designed around your operation/ })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Custom software/ })).toHaveCount(0);
  });

  test("keeps mandatory narrative readable with scripts disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/es");
    await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");
    await expect(page.locator("footer")).toContainText("La evolución no es un evento.");
    await context.close();
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

test.describe("homepage method — mobile", () => {
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
