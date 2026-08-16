import { test, expect } from "@playwright/test";

test.describe("homepage v3 — real work evidence", () => {
  test("renders AION as the dominant showcase with the product label", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByText("A PRODUCT BY NEXT WRLD")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /AION Wellness/ })).toHaveCount(1);
    await expect(page.locator(".aion-band")).toHaveCount(1);
  });

  test("shows the supporting cases in the evidence section", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByText(/JFHP/)).toHaveCount(1);
    await expect(page.getByText(/InmoCRM/)).toHaveCount(1);
  });

  test("keeps the cases listing reachable from the homepage CTA", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("link", { name: /Ver todos los casos/ })).toHaveAttribute(
      "href",
      "/es/casos"
    );
  });
});
