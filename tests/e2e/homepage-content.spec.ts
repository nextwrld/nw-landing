import { test, expect } from "@playwright/test";

test.describe("homepage content — draft isolation", () => {
  test("serves Foundation content with no Experience H1 or friction copy in initial HTML", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");
    await expect(
      page.getByRole("heading", { name: /Tu empresa no debería crecer multiplicando trabajo manual/ })
    ).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Excel se convirtió en el sistema/ })).toHaveCount(0);

    await page.goto("/en");
    await expect(page.locator("h1").first()).toContainText("WELCOME TO THE NEW OPERATIONAL STANDARD");
    await expect(
      page.getByRole("heading", { name: /Your company shouldn't grow by multiplying manual work/ })
    ).toHaveCount(0);
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

test.describe("homepage content — mobile", () => {
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
