import { test, expect } from "@playwright/test";

function relativeLuminance(hex: string): number {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const raw = parseInt(value.slice(offset, offset + 2), 16) / 255;
    return raw <= 0.03928 ? raw / 12.92 : Math.pow((raw + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHex(rgb: string): string {
  const channels = rgb.match(/\d+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
  return `#${channels.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

test.describe("homepage shell — desktop", () => {
  test("exposes a localized, zoom-safe, motion-safe V3 shell", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("link", { name: "Saltar al contenido principal" })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Tu empresa no debería crecer multiplicando trabajo manual"
    );

    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(
      "Your company shouldn't grow by multiplying manual work"
    );
  });

  test("keeps the viewport zoomable and the content responsive", async ({ page }) => {
    await page.goto("/es");
    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).not.toBeNull();
    expect(viewport).toContain("initial-scale=1");
    expect(viewport).not.toContain("user-scalable=no");
    expect(viewport).not.toContain("maximum-scale");
  });

  test("reveals the skip link on keyboard focus", async ({ page }) => {
    await page.goto("/es");
    const skip = page.getByRole("link", { name: "Saltar al contenido principal" });
    const hiddenBox = await skip.boundingBox();
    expect(hiddenBox).not.toBeNull();
    expect(hiddenBox!.y).toBeLessThan(0);

    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    const focusedBox = await skip.boundingBox();
    expect(focusedBox!.y).toBeGreaterThanOrEqual(0);
  });

  test("keeps nav and footer text readable on their backgrounds", async ({ page }) => {
    await page.goto("/es");
    const navLink = page.locator("header .experience-nav-link").first();
    const navColor = rgbToHex(await navLink.evaluate((el) => getComputedStyle(el).color));
    const navBg = rgbToHex(
      await navLink.evaluate((el) => getComputedStyle(el.closest("header")!).backgroundColor)
    );
    expect(contrastRatio(navColor, navBg)).toBeGreaterThanOrEqual(4.5);

    const footerText = page.locator("footer .experience-footer-desc");
    const footerColor = rgbToHex(await footerText.evaluate((el) => getComputedStyle(el).color));
    const footerBg = rgbToHex(
      await footerText.evaluate((el) => getComputedStyle(el.closest("footer")!).backgroundColor)
    );
    expect(contrastRatio(footerColor, footerBg)).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe("homepage shell — mobile", () => {
  test("opens the menu with keyboard and keeps links readable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/es");
    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await toggle.click();
    await expect(page.locator(".experience-mobile-menu")).toHaveClass(/open/);
    await expect(page.locator("#experienceMenu").getByRole("link", { name: "Casos" })).toBeVisible();
  });
});
