import { test, expect } from "@playwright/test";

test.describe("homepage release — default draft retains Foundation", () => {
  test("serves the Foundation composition with no Experience content in either locale", async ({
    page,
  }) => {
    await page.goto("/es");
    await expect(page.locator("h1").first()).toContainText(
      "BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO",
    );
    await expect(
      page.getByRole("heading", {
        name: /Tu empresa no debería crecer multiplicando trabajo manual/,
      }),
    ).toHaveCount(0);

    await page.goto("/en");
    await expect(page.locator("h1").first()).toContainText(
      "WELCOME TO THE NEW OPERATIONAL STANDARD",
    );
    await expect(
      page.getByRole("heading", {
        name: /Your company shouldn't grow by multiplying manual work/,
      }),
    ).toHaveCount(0);
  });

  test("withholds every Experience section heading while publication stays blocked", async ({
    page,
  }) => {
    await page.goto("/es");
    for (const heading of [
      /También construimos nuestros propios productos/,
      /Antes de decidir qué construir/,
      /Preguntas frecuentes/,
      /Hagamos que sea más fácil hacerla crecer/,
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toHaveCount(0);
    }
  });

  test("emits no Experience evidence visuals or FAQ schema", async ({
    page,
  }) => {
    await page.goto("/es");
    await expect(page.locator('img[src*="/images/experience/"]')).toHaveCount(
      0,
    );
    const schemaScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schemaScripts.length).toBeGreaterThan(0);
    for (const script of schemaScripts) {
      expect(script).not.toContain("FAQPage");
    }
  });

  test("publishes no speculative links to unapproved destinations", async ({
    page,
  }) => {
    await page.goto("/es");
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"))
        .map((anchor) => anchor.getAttribute("href") ?? "")
        .filter((href) => href.length > 0),
    );
    for (const href of hrefs) {
      expect(href).not.toMatch(
        /\/#(diagnosis|method|cases|insights|betterWay|finalCta)$/,
      );
      expect(href).not.toMatch(/wa\.me/);
      expect(href).not.toMatch(/cal\.com|savvycal|calendly/i);
    }
  });

  test("keeps canonical and reciprocal hreflang valid on the deployed default", async ({
    page,
  }) => {
    await page.goto("/es");
    expect(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    ).toBe("https://nextwrld.com/es");
    const esAlternates = await page.evaluate(() =>
      Array.from(document.querySelectorAll('link[rel="alternate"]')).map(
        (link) => ({
          hreflang: link.getAttribute("hreflang"),
          href: link.getAttribute("href"),
        }),
      ),
    );
    expect(esAlternates).toContainEqual({
      hreflang: "es",
      href: "https://nextwrld.com/es",
    });
    expect(esAlternates).toContainEqual({
      hreflang: "en",
      href: "https://nextwrld.com/en",
    });

    await page.goto("/en");
    expect(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    ).toBe("https://nextwrld.com/en");
  });
});
