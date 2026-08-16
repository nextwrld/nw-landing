import { test, expect } from "@playwright/test";

test.describe("homepage v3 — services and method", () => {
  test("renders the three service cards linking to their section pages", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("heading", { name: /Software a medida/ })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /Sistemas de gestión/ })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: /Automatización e integraciones/ })).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Explorar software a medida/ })).toHaveAttribute(
      "href",
      "/es/servicios/software-a-medida"
    );
  });

  test("renders the five-stage framework with the process CTA", async ({ page }) => {
    await page.goto("/es");
    for (const stage of ["Discover", "Shape", "Build", "Launch", "Evolve"]) {
      await expect(page.getByRole("heading", { name: new RegExp(stage) })).toHaveCount(1);
    }
    await expect(page.getByRole("link", { name: /Conocer nuestro proceso/ })).toHaveAttribute(
      "href",
      "/es/como-trabajamos"
    );
  });
});
