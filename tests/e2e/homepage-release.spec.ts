import { test, expect } from "@playwright/test";

test.describe("homepage v3 — release stays fail-closed", () => {
  test("serves the V3 skeleton in the default draft build", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Tu empresa no debería crecer multiplicando trabajo manual"
    );
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Your company shouldn't grow by multiplying manual work"
    );
  });

  test("emits no FAQ schema on the homepage", async ({ page }) => {
    await page.goto("/es");
    const ldJson = await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) =>
        s.textContent ?? ""
      )
    );
    expect(ldJson.join("")).not.toContain("FAQPage");
  });

  test("publishes no speculative links to unapproved destinations", async ({ page }) => {
    await page.goto("/es");
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"))
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter((href) => href.length > 0)
    );
    expect(hrefs).not.toContain("/es/insights");
    expect(hrefs).not.toContain("/en/insights");
    for (const href of hrefs) {
      expect(href).not.toMatch(/wa\.me/);
      expect(href).not.toMatch(/cal\.com|savvycal|calendly/i);
    }
  });

  test("keeps evidence visuals withheld until approved", async ({ page }) => {
    await page.goto("/es");
    // Placeholder visuals render with the pending status note, never real screenshots.
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/resultados obtenidos|achieved results/i);
  });
});
