import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  buildApprovedNav,
  nextMenuState,
  shellA11yCopy,
  socialLinkLabel,
} from "@/components/Header/menuData";
import { contentByLocale } from "@/content/homepage";

const layoutSource = readFileSync(
  new URL("../src/app/[locale]/layout.tsx", import.meta.url),
  "utf8"
);
const pageSource = readFileSync(
  new URL("../src/app/[locale]/page.tsx", import.meta.url),
  "utf8"
);
const headerSource = readFileSync(
  new URL("../src/components/Header/index.tsx", import.meta.url),
  "utf8"
);
const footerSource = readFileSync(
  new URL("../src/components/Footer/index.tsx", import.meta.url),
  "utf8"
);
const cssSource = readFileSync(
  new URL("../src/styles/index.css", import.meta.url),
  "utf8"
);

function relativeLuminance(hex: string): number {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const raw = parseInt(value.slice(offset, offset + 2), 16) / 255;
    return raw <= 0.03928 ? raw / 12.92 : Math.pow((raw + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x
  );
  return (lighter + 0.05) / (darker + 0.05);
}

function shellToken(name: string): string {
  const match = cssSource.match(
    new RegExp(`--color-shell-${name}:\\s*([#0-9a-fA-F]{7});`)
  );
  if (!match) {
    throw new Error(`Missing shell token --color-shell-${name}`);
  }
  return match[1].toLowerCase();
}

describe("localized shell copy and navigation (SHELL-001)", () => {
  it("provides equivalent ES and EN a11y copy for the menu toggle", () => {
    const es = shellA11yCopy("es");
    const en = shellA11yCopy("en");
    expect(es.menuToggle.length).toBeGreaterThan(0);
    expect(en.menuToggle.length).toBeGreaterThan(0);
    expect(es.menuToggle).not.toBe(en.menuToggle);
    expect(es.skipToContent.length).toBeGreaterThan(0);
    expect(en.skipToContent.length).toBeGreaterThan(0);
    expect(es.skipToContent).not.toBe(en.skipToContent);
  });

  it("provides localized social link labels for every shell network", () => {
    for (const network of ["X", "Instagram", "LinkedIn"] as const) {
      const es = socialLinkLabel("es", network);
      const en = socialLinkLabel("en", network);
      expect(es.length).toBeGreaterThan(0);
      expect(en.length).toBeGreaterThan(0);
      expect(es).not.toBe(en);
      expect(en.toLowerCase()).toContain(network.toLowerCase());
    }
  });

  it("builds the same approved nav surface for ES and EN", () => {
    const esNav = buildApprovedNav(contentByLocale.es);
    const enNav = buildApprovedNav(contentByLocale.en);
    expect(esNav).toHaveLength(enNav.length);
  });

  it("renders approved ES/EN nav items with equivalent localized labels", () => {
    const withApproval = (locale: "es" | "en") => ({
      ...contentByLocale[locale],
      nav: {
        items: contentByLocale[locale].nav.items.map((item) => ({
          ...item,
          destination: `/#${item.id}`,
          approved: true,
        })),
      },
    });
    const esNav = buildApprovedNav(withApproval("es"));
    const enNav = buildApprovedNav(withApproval("en"));
    expect(esNav.map((item) => item.title)).toEqual([
      "Servicios",
      "Método",
      "Casos",
      "Insights",
      "Nosotros",
    ]);
    expect(enNav.map((item) => item.title)).toEqual([
      "Services",
      "Method",
      "Cases",
      "Insights",
      "About",
    ]);
  });

  it("emits the locale on the html element in the layout", () => {
    expect(layoutSource).toContain("lang={locale}");
  });
});

describe("keyboard menu and focus contract (SHELL-002)", () => {
  it("closes the menu with Escape regardless of current state", () => {
    expect(nextMenuState(true, "Escape")).toBe(false);
    expect(nextMenuState(false, "Escape")).toBe(false);
  });

  it("toggles the menu with Enter or Space", () => {
    expect(nextMenuState(false, "Enter")).toBe(true);
    expect(nextMenuState(true, " ")).toBe(false);
  });

  it("leaves the menu unchanged for navigation keys", () => {
    expect(nextMenuState(true, "Tab")).toBeNull();
    expect(nextMenuState(false, "Tab")).toBeNull();
  });

  it("exposes menu state, keyboard handling, and focus restoration in the header", () => {
    expect(headerSource).toContain("aria-expanded={navbarOpen}");
    expect(headerSource).toContain("aria-controls=\"navbarCollapse\"");
    expect(headerSource).toContain("aria-haspopup");
    expect(headerSource).toContain("addEventListener");
    expect(headerSource).toContain("nextMenuState");
    expect(headerSource).toContain("closeMenu");
    expect(headerSource).toContain(".focus()");
  });

  it("provides a keyboard-reachable skip link to main content", () => {
    expect(headerSource).toContain("skip-link");
    expect(headerSource).toContain("#main-content");
    expect(pageSource).toContain("id=\"main-content\"");
  });
});

describe("zoom safety (SHELL-003)", () => {
  it("declares a viewport that allows user zoom", () => {
    expect(layoutSource).toContain("export const viewport");
    expect(layoutSource).toContain("width: \"device-width\"");
    expect(layoutSource).toContain("initialScale: 1");
    expect(layoutSource).not.toContain("userScalable: false");
    expect(layoutSource).not.toContain("maximumScale");
  });
});

describe("shell contrast meets WCAG AA (SHELL-004)", () => {
  it("keeps the diagnosis CTA text readable on the primary background", () => {
    const ratio = contrastRatio(
      shellToken("cta-text"),
      shellToken("primary")
    );
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps footer text readable on the footer background", () => {
    const ratio = contrastRatio(
      shellToken("footer-text"),
      shellToken("footer-bg")
    );
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps header text readable on the header background", () => {
    const ratio = contrastRatio(
      shellToken("header-text"),
      shellToken("header-bg")
    );
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

describe("non-color cues and motion safety (SHELL-005)", () => {
  it("reveals the skip link on keyboard focus without relying on color", () => {
    expect(cssSource).toContain(".skip-link");
    expect(cssSource).toContain(".skip-link:focus");
  });

  it("always shows a visible focus ring for keyboard users", () => {
    expect(cssSource).toContain(":focus-visible");
    expect(cssSource).toContain("outline");
  });

  it("removes nonessential motion under reduced-motion preference", () => {
    expect(cssSource).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cssSource).toContain("scroll-behavior");
  });

  it("keeps the social links keyboard-accessible with localized names", () => {
    expect(footerSource).toContain("socialLinkLabel");
  });
});
