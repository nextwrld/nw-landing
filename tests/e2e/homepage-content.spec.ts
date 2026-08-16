import { test, expect } from "@playwright/test";

test.describe("homepage v3 — server-first content", () => {
  test("serves the six V3 sections with the narrative in initial HTML", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Tu empresa no debería crecer multiplicando trabajo manual"
    );
    await expect(page.getByRole("heading", { name: /Planillas que se volvieron sistemas/ })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /Tecnología diseñada alrededor/ })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /Entender antes de construir/ })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /Construimos para operaciones reales/ })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /Antes de decidir qué construir/ })).toHaveCount(1);
  });

  test("keeps the mandatory narrative readable with scripts disabled", async ({ page }) => {
    await page.addInitScript(() => {
      window.__NEXT_DATA__ = undefined as unknown as typeof window.__NEXT_DATA__;
    });
    await page.goto("/es");
    const body = await page.locator("body").innerText();
    expect(body).toContain("Tu empresa no debería crecer multiplicando trabajo manual");
    expect(body).toContain("Más crecimiento no debería significar más administración");
    expect(body).toContain("Analizar mi operación");
  });
});
