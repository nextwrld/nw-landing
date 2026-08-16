import { test, expect } from "@playwright/test";

test.describe("section routes — ES and localized EN", () => {
  const es = [
    ["/es/como-trabajamos", /Cómo trabajamos/i],
    ["/es/nosotros", /Por qué Next Wrld/i],
    ["/es/casos", /Trabajo real/i],
    ["/es/servicios/software-a-medida", /Software a medida/i],
    ["/es/servicios/sistemas-de-gestion", /Sistemas de gestión/i],
    ["/es/servicios/automatizacion", /Automatización/i],
  ] as const;

  for (const [path, heading] of es) {
    test(`serves ${path} with its narrative heading`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(heading);
    });
  }

  const en = [
    ["/en/how-we-work", /How we work/i],
    ["/en/about-us", /Why Next Wrld/i],
    ["/en/cases", /Real work/i],
    ["/en/services/custom-software", /Custom software/i],
    ["/en/services/management-systems", /Management systems/i],
    ["/en/services/automation", /Automation/i],
  ] as const;

  for (const [path, heading] of en) {
    test(`serves localized ${path} with its English heading`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(heading);
    });
  }

  test("keeps insights unpublished in both locales", async ({ page }) => {
    await page.goto("/es/insights");
    await expect(page.getByRole("heading", { name: /Insights/i })).toHaveCount(0);
    await page.goto("/en/insights");
    await expect(page.getByRole("heading", { name: /Insights/i })).toHaveCount(0);
  });
});
