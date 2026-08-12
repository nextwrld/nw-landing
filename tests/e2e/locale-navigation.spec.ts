import { test, expect, type ConsoleMessage } from "@playwright/test";

const REACT_RENDERING_WARNINGS = /script tag while rendering|never executed|hydrat|did not match/i;

test("navigating between locales keeps a clean console and deterministic theme", async ({ page }) => {
  const consoleIssues: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleIssues.push(`${msg.type()}: ${msg.text()}`);
    }
  });

  await page.goto("/es");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");

  await page.getByRole("button", { name: "Switch to English" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1").first()).toContainText("WELCOME TO THE NEW OPERATIONAL STANDARD");

  await page.getByRole("button", { name: "Cambiar a Español" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");

  const htmlClass = (await page.locator("html").getAttribute("class")) ?? "";
  expect(htmlClass).toMatch(/\b(light|dark)\b/);

  await page.getByRole("button", { name: "theme toggler" }).click();
  await page.reload();
  const storedTheme = await page.evaluate(() => window.localStorage.getItem("theme"));
  const reloadedClass = (await page.locator("html").getAttribute("class")) ?? "";
  expect(reloadedClass).toContain(storedTheme ?? "light");

  expect(consoleIssues.filter((m) => REACT_RENDERING_WARNINGS.test(m))).toEqual([]);
});
