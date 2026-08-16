import { test, expect, type ConsoleMessage } from "@playwright/test";

const REACT_RENDERING_WARNINGS = /script tag while rendering|never executed|hydrat|did not match/i;

test("navigating between locales keeps a clean console and serves the V3 composition", async ({
  page,
}) => {
  const consoleIssues: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleIssues.push(`${msg.type()}: ${msg.text()}`);
    }
  });

  await page.goto("/es");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("h1").first()).toContainText(
    "Tu empresa no debería crecer multiplicando trabajo manual"
  );

  await page.getByRole("button", { name: "Switch to English" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1").first()).toContainText(
    "Your company shouldn't grow by multiplying manual work"
  );

  await page.getByRole("button", { name: "Cambiar a Español" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");

  expect(consoleIssues.filter((m) => REACT_RENDERING_WARNINGS.test(m))).toEqual([]);
});

test("serves EN section pages after the Fase 2 approval flip", async ({ page }) => {
  await page.goto("/en/how-we-work");
  await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
    /How we work/i
  );

  await page.goto("/en/services/custom-software");
  await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
    /custom software/i
  );

  await page.goto("/en/cases");
  await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
    /real work|real cases/i
  );
});

test("translates section slugs when switching language on a section page", async ({
  page,
}) => {
  await page.goto("/es/como-trabajamos");
  await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
    /Cómo trabajamos/i
  );
  await page.getByRole("button", { name: "Switch to English" }).first().click();
  await expect(page).toHaveURL(/\/en\/how-we-work/);
  await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
    /How we work/i
  );

  await page.goto("/es/servicios/software-a-medida");
  await page.getByRole("button", { name: "Switch to English" }).first().click();
  await expect(page).toHaveURL(/\/en\/services\/custom-software/);
});

test("keeps insights withheld in both locales", async ({ page }) => {
  await page.goto("/en/insights");
  // The route 404s — no insights content heading renders until approved.
  await expect(page.getByRole("heading", { name: /insights/i })).toHaveCount(0);
});
