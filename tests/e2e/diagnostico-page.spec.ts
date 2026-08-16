import { test, expect } from "@playwright/test";

test.describe("diagnosis experience page", () => {
  test("renders the offer sections and the context-first form on /es/diagnostico", async ({
    page,
  }) => {
    await page.goto("/es/diagnostico");
    await expect(page.getByRole("textbox").first()).toBeVisible();
    await expect(page.getByLabel(/Nombre completo/i).or(page.getByLabel(/Full name/i))).toBeVisible();
    await expect(page.getByRole("button", { name: /Continuar|Continue/i }).first()).toBeVisible();
  });

  test("serves the localized /en/diagnosis experience", async ({ page }) => {
    await page.goto("/en/diagnosis");
    await expect(page.getByRole("textbox").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Continue/i }).first()).toBeVisible();
  });

  test("redirects the legacy /en/diagnostico URL to /en/diagnosis", async ({ page }) => {
    await page.goto("/en/diagnostico");
    await expect(page).toHaveURL(/\/en\/diagnosis$/);
    await expect(page.getByRole("textbox").first()).toBeVisible();
  });
});
