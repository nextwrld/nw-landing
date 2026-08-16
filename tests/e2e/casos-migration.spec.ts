import { test, expect } from "@playwright/test";

test.describe("legacy success-case migration", () => {
  test("redirects /success-cases/{slug} to the localized /casos/{slug} page", async ({ page }) => {
    await page.goto("/es/success-cases/crm");
    await expect(page).toHaveURL(/\/es\/casos\/crm$/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(/InmoCRM/i);
  });

  test("preserves the locale when redirecting the EN legacy URL", async ({ page }) => {
    await page.goto("/en/success-cases/crm");
    await expect(page).toHaveURL(/\/en\/cases\/crm$/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(/InmoCRM/i);
  });
});
