import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);
const cssSource = readFileSync(new URL("../src/styles/index.css", import.meta.url), "utf8");

const componentPaths = {
  capabilities: new URL("../src/components/HomeExperience/Capabilities.tsx", import.meta.url),
  method: new URL("../src/components/HomeExperience/Method.tsx", import.meta.url),
  differentiation: new URL("../src/components/HomeExperience/Differentiation.tsx", import.meta.url),
};

function readComponent(name: keyof typeof componentPaths): string {
  return existsSync(componentPaths[name]) ? readFileSync(componentPaths[name], "utf8") : "";
}

describe("service capabilities with ES/EN parity (METHOD-001)", () => {
  it("lists the three recognized service capabilities in both locales", () => {
    expect(esContent.capabilities.items).toHaveLength(3);
    expect(enContent.capabilities.items).toHaveLength(3);
  });

  it("uses the exact ES capability titles and faithful EN equivalents", () => {
    expect(esContent.capabilities.items.map((item) => item.title)).toEqual([
      "Software a medida",
      "Sistemas de gestión",
      "Automatización e integraciones",
    ]);
    for (const item of enContent.capabilities.items) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.title).not.toBe(esContent.capabilities.items[0].title);
    }
  });

  it("shares the same capability ids across locales", () => {
    expect(esContent.capabilities.items.map((item) => item.id)).toEqual(
      enContent.capabilities.items.map((item) => item.id)
    );
  });

  it("gives every capability a body and a can-include list in both locales", () => {
    for (const content of [esContent, enContent]) {
      for (const item of content.capabilities.items) {
        expect(item.body.length).toBeGreaterThan(0);
        expect(item.includes.length).toBeGreaterThan(0);
        for (const entry of item.includes) {
          expect(entry.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("introduces capabilities with supporting copy in both locales", () => {
    expect(esContent.capabilities.supporting.length).toBeGreaterThan(0);
    expect(enContent.capabilities.supporting.length).toBeGreaterThan(0);
    expect(enContent.capabilities.supporting).not.toBe(esContent.capabilities.supporting);
  });
});

describe("useful-AI boundary (METHOD-002)", () => {
  it("keeps the AI transversal note distinct from the three capability cards", () => {
    expect(esContent.capabilities.items).toHaveLength(3);
    expect(enContent.capabilities.items).toHaveLength(3);
    expect(esContent.capabilities.aiTransversal.heading.length).toBeGreaterThan(0);
    expect(enContent.capabilities.aiTransversal.heading.length).toBeGreaterThan(0);
  });

  it("uses the exact ES AI heading and a faithful EN equivalent", () => {
    expect(esContent.capabilities.aiTransversal.heading).toBe("¿Dónde entra la IA?");
    expect(enContent.capabilities.aiTransversal.heading).not.toBe(
      esContent.capabilities.aiTransversal.heading
    );
  });

  it("bounds AI to concrete process value in both locales", () => {
    expect(esContent.capabilities.aiTransversal.body).toContain(
      "La incorporamos cuando puede aportar valor concreto al proceso"
    );
    expect(enContent.capabilities.aiTransversal.body).toContain("concrete value");
    expect(enContent.capabilities.aiTransversal.body.length).toBeGreaterThan(0);
  });

  it("enumerates the same concrete AI uses across locales", () => {
    const esBody = esContent.capabilities.aiTransversal.body.toLowerCase();
    const enBody = enContent.capabilities.aiTransversal.body.toLowerCase();
    expect(esBody).toContain("analizar");
    expect(esBody).toContain("clasificar");
    expect(esBody).toContain("asistir");
    expect(esBody).toContain("buscar");
    expect(esBody).toContain("automatizar");
    expect(enBody).toContain("analyzing");
    expect(enBody).toContain("classifying");
    expect(enBody).toContain("assisting");
    expect(enBody).toContain("searching");
    expect(enBody).toContain("automating");
  });
});

describe("five-stage method with outcomes (METHOD-003)", () => {
  it("sequences Discover, Shape, Build, Launch, Evolve in order in both locales", () => {
    expect(esContent.method.stages.map((stage) => stage.name)).toEqual([
      "Discover",
      "Shape",
      "Build",
      "Launch",
      "Evolve",
    ]);
    expect(enContent.method.stages.map((stage) => stage.name)).toEqual([
      "Discover",
      "Shape",
      "Build",
      "Launch",
      "Evolve",
    ]);
  });

  it("shares stage ids across locales", () => {
    expect(esContent.method.stages.map((stage) => stage.id)).toEqual(
      enContent.method.stages.map((stage) => stage.id)
    );
  });

  it("localizes stage labels in both locales", () => {
    expect(esContent.method.stages.map((stage) => stage.label)).toEqual([
      "Entender",
      "Decidir",
      "Construir",
      "Integrar",
      "Mejorar",
    ]);
    expect(enContent.method.stages.map((stage) => stage.label)).toEqual([
      "Understand",
      "Decide",
      "Build",
      "Integrate",
      "Improve",
    ]);
  });

  it("gives every stage a headline, copy, and outcome in both locales", () => {
    for (const content of [esContent, enContent]) {
      for (const stage of content.method.stages) {
        expect(stage.headline.length).toBeGreaterThan(0);
        expect(stage.copy.length).toBeGreaterThan(0);
        expect(stage.output.length).toBeGreaterThan(0);
      }
    }
  });

  it("marks every stage outcome with the localized result label", () => {
    for (const stage of esContent.method.stages) {
      expect(stage.output).toContain("Resultado:");
    }
    for (const stage of enContent.method.stages) {
      expect(stage.output).toContain("Outcome:");
    }
  });

  it("introduces and closes the method section in both locales", () => {
    expect(esContent.method.body.length).toBeGreaterThan(0);
    expect(enContent.method.body.length).toBeGreaterThan(0);
    expect(esContent.method.microcopy.length).toBeGreaterThan(0);
    expect(enContent.method.microcopy.length).toBeGreaterThan(0);
    expect(enContent.method.body).not.toBe(esContent.method.body);
    expect(enContent.method.microcopy).not.toBe(esContent.method.microcopy);
  });
});

describe("method section composition and visual (METHOD-004)", () => {
  it("composes dedicated Capabilities, Method, and Differentiation components", () => {
    expect(existsSync(componentPaths.capabilities)).toBe(true);
    expect(existsSync(componentPaths.method)).toBe(true);
    expect(existsSync(componentPaths.differentiation)).toBe(true);
    expect(experienceHomeSource).toContain('from "./Capabilities"');
    expect(experienceHomeSource).toContain('from "./Method"');
    expect(experienceHomeSource).toContain('from "./Differentiation"');
  });

  it("orders capabilities before method before differentiation after better-way", () => {
    const betterWay = experienceHomeSource.indexOf("<BetterWay");
    const capabilities = experienceHomeSource.indexOf("<Capabilities");
    const method = experienceHomeSource.indexOf("<Method");
    const differentiation = experienceHomeSource.indexOf("<Differentiation");
    expect(betterWay).toBeGreaterThanOrEqual(0);
    expect(betterWay).toBeLessThan(capabilities);
    expect(capabilities).toBeLessThan(method);
    expect(method).toBeLessThan(differentiation);
  });

  it("keeps the new sections server components (no use client)", () => {
    for (const name of ["capabilities", "method", "differentiation"] as const) {
      expect(readComponent(name)).not.toContain("use client");
    }
    expect(experienceHomeSource).not.toContain("use client");
  });

  it("renders the method as a vertical timeline on mobile and a continuous line on desktop", () => {
    expect(cssSource).toContain(".method-stages");
    expect(cssSource).toContain("@media (min-width");
  });

  it("avoids a mandatory carousel and hover dependency in the method section", () => {
    const methodSource = readComponent("method");
    expect(methodSource).toContain("content.stages.map");
    expect(methodSource).not.toContain("carousel");
    expect(methodSource).not.toContain("onMouseEnter");
    expect(methodSource).not.toContain("onMouseOver");
    expect(methodSource).not.toContain("hidden");
  });

  it("keeps the reduced-motion preference applied to the page", () => {
    expect(cssSource).toContain("@media (prefers-reduced-motion: reduce)");
  });
});

describe("differentiation content (METHOD-005)", () => {
  it("supports differentiation with titled, explained pillars in both locales", () => {
    expect(esContent.differentiation.pillars.length).toBeGreaterThan(0);
    expect(enContent.differentiation.pillars.length).toBeGreaterThan(0);
    expect(esContent.differentiation.pillars.map((pillar) => pillar.id)).toEqual(
      enContent.differentiation.pillars.map((pillar) => pillar.id)
    );
    for (const pillar of esContent.differentiation.pillars) {
      expect(pillar.title.length).toBeGreaterThan(0);
      expect(pillar.body.length).toBeGreaterThan(0);
    }
  });

  it("closes differentiation with the same optional statement meaning in both locales", () => {
    expect(esContent.differentiation.optionalStatement.length).toBeGreaterThan(0);
    expect(enContent.differentiation.optionalStatement.length).toBeGreaterThan(0);
    expect(enContent.differentiation.optionalStatement).not.toBe(
      esContent.differentiation.optionalStatement
    );
  });
});
