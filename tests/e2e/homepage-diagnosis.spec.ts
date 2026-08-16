import { test, expect } from "@playwright/test";

test.describe("homepage v3 — diagnosis offer only", () => {
  test("presents the offer on the homepage without the form", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("heading", { name: /Antes de decidir qué construir/ })).toHaveCount(1);
    await expect(page.getByText("30–45 minutos").first()).toBeVisible();
    await expect(page.getByText("Gratuito").first()).toBeVisible();
    // The context-first form does not render on the homepage.
    await expect(page.getByRole("textbox")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Analizar mi operación" }).first()).toHaveAttribute(
      "href",
      "/es/diagnostico"
    );
  });

  test("serves the full form experience on the localized diagnosis route", async ({ page }) => {
    await page.goto("/es/diagnostico");
    await expect(page.getByRole("textbox").first()).toBeVisible();
    await page.goto("/en/diagnosis");
    await expect(page.getByRole("textbox").first()).toBeVisible();
  });
});
