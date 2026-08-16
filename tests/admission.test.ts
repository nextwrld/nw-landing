import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { contentByLocale } from "@/content/homepage";
import {
  DEFAULT_APPROVALS,
  PublicationBlockedError,
  admitPublication,
  buildApprovals,
  getPublicationConfig,
  validateRelease,
} from "@/content/homepage/publication";
import { buildApprovedNav, buildApprovedNavV3 } from "@/components/Header/menuData";
import {
  loadEvidenceGate,
  resolveEntryLink,
} from "@/content/homepage/evidence";
import { homepageSchema } from "@/utils/seo";
import { APPROVAL_KEYS } from "@/content/homepage/types";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
const vercel = JSON.parse(
  readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
);
const pageSource = readFileSync(
  new URL("../src/app/[locale]/page.tsx", import.meta.url),
  "utf8",
);
const preflightSource = readFileSync(
  new URL("../scripts/validate-experience-build.ts", import.meta.url),
  "utf8",
);
const layoutSource = readFileSync(
  new URL("../src/app/[locale]/layout.tsx", import.meta.url),
  "utf8",
);
const experienceHomeSource = readFileSync(
  new URL(
    "../src/components/HomeExperience/ExperienceHome.tsx",
    import.meta.url,
  ),
  "utf8",
);
const caseEvidenceSource = readFileSync(
  new URL("../src/components/HomeExperience/CaseEvidence.tsx", import.meta.url),
  "utf8",
);
const diagnosisSource = readFileSync(
  new URL("../src/components/HomeExperience/Diagnosis.tsx", import.meta.url),
  "utf8",
);

function runPreflight(status: "release" | "draft"): number {
  const env = { ...process.env } as Record<string, string | undefined>;
  if (status === "release") {
    env.EXPERIENCE_PUBLICATION_STATUS = "release";
  } else {
    delete env.EXPERIENCE_PUBLICATION_STATUS;
  }
  try {
    execFileSync(
      process.execPath,
      ["--import", "tsx", "scripts/validate-experience-build.ts"],
      {
        cwd: process.cwd(),
        env: env as NodeJS.ProcessEnv,
        stdio: "pipe",
      },
    );
    return 0;
  } catch (error) {
    return (error as { status?: number }).status ?? -1;
  }
}

function expectBlocked(
  approvals: Parameters<typeof buildApprovals>[0],
  key?: string,
) {
  let thrown: unknown;
  try {
    admitPublication({
      status: "release",
      approvals: buildApprovals(approvals),
    });
  } catch (error) {
    thrown = error;
  }
  expect(thrown).toBeInstanceOf(PublicationBlockedError);
  if (key) {
    expect(
      (thrown as PublicationBlockedError).problems.some((problem) =>
        problem.includes(key),
      ),
    ).toBe(true);
  }
}

describe("navigation admission (ADMISSION-NAV)", () => {
  it("approves only real registered routes and withholds speculative destinations", () => {
    for (const content of [esContent, enContent]) {
      const items = content.nav.items.flatMap((item) =>
        item.children && item.children.length > 0 ? item.children : [item]
      );
      for (const item of items) {
        if (item.id === "insights") {
          expect(item.approved).toBe(false);
          expect(item.destination).toBeNull();
        } else {
          expect(item.approved).toBe(true);
          expect(item.destination).toMatch(/^\/[a-z]/);
          expect(item.destination).not.toContain("#");
        }
      }
      expect(buildApprovedNavV3(content)).toHaveLength(4);
      expect(
        buildApprovedNavV3(content).some((item) => item.title === "Insights")
      ).toBe(false);
    }
  });

  it("emits the V3 services submenu from the registry-driven nav builder", () => {
    const nav = buildApprovedNavV3(esContent);
    const services = nav.find((item) => item.title === "Servicios");
    expect(services?.submenu?.map((child) => child.title)).toEqual([
      "Software a medida",
      "Sistemas de gestión",
      "Automatización",
    ]);
  });

  it("publishes a navigation item only when approved with an approved destination", () => {
    const fullyApproved = {
      ...esContent,
      nav: {
        items: esContent.nav.items.map((item) => ({
          ...item,
          destination: `/#${item.id}`,
          approved: true,
        })),
      },
    };
    const nav = buildApprovedNav(fullyApproved);
    expect(nav.map((item) => item.title)).toEqual([
      "Servicios",
      "Método",
      "Casos",
      "Insights",
      "Nosotros",
    ]);

    const partiallyApproved = {
      ...esContent,
      nav: {
        items: esContent.nav.items.map((item, index) => ({
          ...item,
          destination: index === 0 ? "/#services" : null,
          approved: index === 0,
        })),
      },
    };
    expect(buildApprovedNav(partiallyApproved)).toHaveLength(1);
  });

  it("blocks release while navigation destinations remain unapproved", () => {
    expectBlocked(
      { navigationDestinations: "pending" },
      "navigationDestinations",
    );
  });

  it("switches the shell nav to the approved Experience surface only when admitted", () => {
    expect(layoutSource).toContain("experienceAdmitted");
    expect(layoutSource).toContain("buildApprovedNavV3(content)");
  });
});

describe("evidence admission (ADMISSION-EVIDENCE)", () => {
  it("keeps every evidence entry link-free while unapproved or placeholder", () => {
    const gate = loadEvidenceGate();
    for (const content of [esContent, enContent]) {
      expect(content.evidence.showcase.approved).toBe(false);
      for (const entry of content.evidence.items) {
        expect(entry.approved).toBe(false);
        expect(resolveEntryLink(entry, gate)).toBeNull();
      }
    }
  });

  it("withholds the case link and renders label text when the destination is unapproved", () => {
    expect(caseEvidenceSource).toContain("resolveEntryLink");
    expect(caseEvidenceSource).toContain("<a href={link}");
    expect(caseEvidenceSource).toContain("<span>");
  });

  it("blocks release while any evidence approval remains pending", () => {
    for (const key of [
      "evidenceAssets",
      "evidenceClaims",
      "evidenceDestinations",
    ] as const) {
      expectBlocked({ [key]: "pending" }, key);
    }
  });

  it("fails closed on placeholder evidence even when every approval is granted", () => {
    expectBlocked({});
  });

  it("reports both approval and evidence problems at the release gate", () => {
    const problems = validateRelease({
      status: "release",
      approvals: DEFAULT_APPROVALS,
    });
    expect(problems.some((problem) => /approval pending/i.test(problem))).toBe(
      true,
    );
    expect(problems.some((problem) => /not approved/i.test(problem))).toBe(
      true,
    );
  });
});

describe("diagnosis admission (ADMISSION-DIAGNOSIS)", () => {
  it("blocks release until provider, calendar, privacy, and ownership are approved", () => {
    for (const key of [
      "diagnosisProvider",
      "calendarHandoff",
      "privacyTreatment",
      "diagnosisOwnership",
    ] as const) {
      expectBlocked({ [key]: "pending" }, key);
    }
  });

  it("never claims scheduling availability while the calendar handoff is unapproved", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.calendar.available).toBe(false);
      expect(content.diagnosis.calendar.availabilityClaim).toBeNull();
    }
    expect(diagnosisSource).toContain("content.calendar.available");
  });

  it("withholds the WhatsApp and final-CTA secondary destinations", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.whatsapp.destination).toBeNull();
      expect(content.finalCta.secondaryCta.destination).toBeNull();
    }
    expect(diagnosisSource).toContain("content.whatsapp.destination ?");
  });

  it("keeps the mini-diagnosis deliverables conditional while ownership is unapproved", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.offer.deliverables.approved).toBe(false);
      expect(content.diagnosis.offer.deliverables.lines).toHaveLength(0);
    }
  });
});

describe("FAQ admission (ADMISSION-FAQ)", () => {
  it("keeps the ownership question absent from content and schema while unapproved", () => {
    for (const content of [esContent, enContent]) {
      expect(
        content.faq.entries.some((entry) =>
          /pertenece|ownership|property/i.test(entry.question),
        ),
      ).toBe(false);
      expect(homepageSchema(content)).toEqual([]);
    }
  });

  it("emits no FAQ schema on the V3 homepage", () => {
    for (const content of [esContent, enContent]) {
      expect(homepageSchema(content)).toEqual([]);
      expect(JSON.stringify(homepageSchema(content))).not.toContain("FAQPage");
    }
  });
});

describe("preview admission (ADMISSION-PREVIEW)", () => {
  it("returns preview status only when the preview flag is set", () => {
    delete process.env.EXPERIENCE_PREVIEW;
    expect(getPublicationConfig().status).toBe("draft");

    process.env.EXPERIENCE_PREVIEW = "true";
    const config = getPublicationConfig();
    expect(config.status).toBe("preview");
    delete process.env.EXPERIENCE_PREVIEW;
  });

  it("keeps the Foundation composition in preview while the V3 skeleton is incomplete", () => {
    expect(
      admitPublication({ status: "preview", approvals: DEFAULT_APPROVALS }),
    ).toEqual({ composition: "foundation" });
  });

  it("admits the complete V3 skeleton in preview when the skeleton is complete", () => {
    const admission = admitPublication(
      { status: "preview", approvals: DEFAULT_APPROVALS },
      { skeletonComplete: true }
    );
    expect(admission).toEqual({
      composition: "v3-skeleton",
      content: expect.any(Object),
    });
  });

  it("keeps release fail-closed even when the preview flag is present", () => {
    process.env.EXPERIENCE_PREVIEW = "true";
    let thrown: unknown;
    try {
      admitPublication({ status: "release", approvals: DEFAULT_APPROVALS });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(PublicationBlockedError);
    delete process.env.EXPERIENCE_PREVIEW;
  });
});

describe("build admission (ADMISSION-BUILD)", () => {
  it("routes the ordinary build through the fail-closed preflight before next build", () => {
    expect(pkg.scripts.build).toBe(
      "pnpm validate:experience-build && next build",
    );
    expect(pkg.scripts["validate:experience-build"]).toBe(
      "tsx scripts/validate-experience-build.ts",
    );
    expect(pkg.devDependencies.tsx).toBeTruthy();
  });

  it("routes the Vercel build through the ordinary fail-closed build command", () => {
    expect(vercel.buildCommand).toBe("pnpm build");
  });

  it("makes the preflight exit nonzero when release admission is blocked", () => {
    expect(runPreflight("release")).toBe(1);
  });

  it("lets the preflight pass in draft and retain Foundation", () => {
    expect(runPreflight("draft")).toBe(0);
  });

  it("validates a direct next build through page composition", () => {
    expect(pageSource).toContain("admitPublication");
    expect(pageSource).toContain("getPublicationConfig");
    expect(pageSource).toContain("content={getHomepageContent");
  });

  it("composes the complete Experience only when admission passes", () => {
    expect(pageSource).toContain('admission.composition !== "foundation"');
    for (const section of [
      "<Hero",
      "<ProblemTransformation",
      "<ServicesOverview",
      "<MethodSection",
      "<EvidenceSection",
      "<DiagnosisOffer",
    ]) {
      expect(experienceHomeSource).toContain(section);
    }
    for (const retired of ["<Faq", "<FinalCTA", "<Impact", "<BetterWay", "<ChapterDivider"]) {
      expect(experienceHomeSource).not.toContain(retired);
    }
  });

  it("keeps draft publication the default and fail-closed for release", () => {
    expect(getPublicationConfig().status).toBe("draft");
    expect(
      admitPublication({ status: "draft", approvals: DEFAULT_APPROVALS }),
    ).toEqual({ composition: "foundation" });
    let thrown: unknown;
    try {
      admitPublication({ status: "release", approvals: DEFAULT_APPROVALS });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(PublicationBlockedError);
  });

  it("fails closed for every unapproved approval key at the release gate", () => {
    for (const key of APPROVAL_KEYS) {
      expectBlocked({ [key]: "pending" }, key);
    }
  });

  it("keeps the preflight source wired to admission and process.exit", () => {
    expect(preflightSource).toContain("admitPublication");
    expect(preflightSource).toContain("process.exit");
  });
});
