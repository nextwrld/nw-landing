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
  test("exposes a localized, zoom-safe, motion-safe shell with draft Foundation content", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    await expect(page.getByRole("link", { name: "Saltar al contenido principal" })).toHaveCount(1);
    await expect(page.locator("footer")).toContainText("La evolución no es un evento.");
    await expect(page.locator("h1").first()).toContainText("BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO");
    await expect(page.getByRole("heading", { name: /Tu empresa no debería crecer multiplicando trabajo manual/ })).toHaveCount(0);

    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveCount(1);
    await expect(page.locator("footer")).toContainText("Evolution is not an event.");
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

  test("keeps footer text readable on the footer background", async ({ page }) => {
    await page.goto("/es");
    const [fg, bg] = await page.evaluate(() => {
      const link = document.querySelector('footer a[href*="privacy-policy"]');
      const footer = document.querySelector("footer");
      return [
        getComputedStyle(link as HTMLElement).color,
        getComputedStyle(footer as HTMLElement).backgroundColor,
      ];
    });
    expect(contrastRatio(rgbToHex(fg), rgbToHex(bg))).toBeGreaterThanOrEqual(4.5);
  });

  test("removes nonessential motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/es");
    const auto = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(auto).toBe("auto");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/es");
    const smooth = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(smooth).toBe("smooth");
  });
});

test.describe("homepage shell — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("localizes the menu toggle", async ({ page }) => {
    await page.goto("/es");
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
    await page.goto("/en");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("opens, traverses, and closes the menu with the keyboard, restoring focus", async ({ page }) => {
    await page.goto("/es");
    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Tab");
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBe("A");

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("keeps the open menu links readable on the menu background", async ({ page }) => {
    await page.goto("/es");
    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const [fg, bg] = await page.evaluate(() => {
      const link = document.querySelector("#navbarCollapse a");
      const panel = document.querySelector("#navbarCollapse");
      return [
        getComputedStyle(link as HTMLElement).color,
        getComputedStyle(panel as HTMLElement).backgroundColor,
      ];
    });
    expect(contrastRatio(rgbToHex(fg), rgbToHex(bg))).toBeGreaterThanOrEqual(4.5);
  });
});
