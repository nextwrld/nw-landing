# Proposal: Experience 2.0 Homepage

> **Change status.** This change originally proposed and implemented the V2 "Experience 2.0 Homepage" (one-page, anchor-based architecture delivered across slices `experience-2-homepage-01-contracts` through `-08-admission`). The user then delivered an authoritative spec, **"Next Wrld — Homepage V3" (v1.0)**, which **inverts** the V2 architecture: the homepage becomes the ecosystem entry door (one conversion, exactly 6 content sections) and section sub-pages become the primary navigation. The user decided to **extend this change** rather than open a new one. **Part I below is the V2 proposal preserved verbatim for the audit trail; Part II is the V3 amendment that supersedes Part I for all new work. Where they conflict, Part II wins.**

---

## Part I — V2 Proposal (preserved verbatim; implemented through slice `experience-2-homepage-08-admission`)

## Intent

Replace the Foundation landing with Experience 2.0 so growing companies recognize operational friction, trust Next Wrld, and request an operational diagnosis. Preserve the North Star: “They understand our problem; I want to talk to them.”

## Scope

### In Scope
- ES/EN server-rendered narrative, chapter rhythm, responsive layouts, and reduced-motion-safe enhancement.
- Header/footer IA, capabilities, five-stage method, verified evidence, differentiation, FAQ, diagnosis, final CTA, SEO/schema, and location-aware analytics.
- Context-first diagnosis handoff while retaining the hardened `/api/contact` validation boundary.
- Strict-TDD phases: (1) contracts/shell/SEO/tracking, (2) problem, (3) solution/method, (4) evidence, (5) conversion/completion.

### Out of Scope
- Reopening authoritative product, copy, visual, motion, SEO, or conversion decisions.
- Replacing `/es` and `/en`, client-rendering commercial content, contact-API redesign, invented evidence, or unrelated Foundation routes.
- New service, insight, about, or product routes.

## Capabilities

### New Capabilities
- `homepage-experience`: Server-first narrative, visual system, responsive/motion behavior, evidence, navigation, and conversion hierarchy.
- `operational-diagnosis`: Context capture, calendar handoff, WhatsApp path, FAQ policy, and diagnosis outcomes.
- `commercial-observability`: Metadata/schema and location-aware CTA, service, case, insight, form, and language events.

### Modified Capabilities
None; no baseline OpenSpec capabilities exist.

## Approach

Compose section-specific Server Components from one parity-checked typed dictionary. Limit Client Components to navigation, disclosure, form, analytics, and optional motion islands. Reuse SEO helpers and contact hardening; avoid generic Tailgrids abstractions.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/app/[locale]/page.tsx`, `src/components/` | Modified/New | Experience composition and shell |
| `src/i18n/`, `src/styles/index.css` | Modified | Copy contract and visual tokens |
| `src/utils/analytics.ts`, `src/utils/seo.ts`, `tests/` | Modified | Observable, TDD-protected contracts |
| `markdown/success-cases/`, `public/images/` | Modified | Approved evidence only |

## Risks and Publication Blockers

- **Blocked:** ownership FAQ awaits contractual/legal approval.
- **Blocked:** diagnosis provider, calendar handoff, privacy treatment, and ownership are unconfirmed.
- **Blocked:** AION/JFHP/automation assets, validated claims, and destination URLs are unavailable.
- **Blocked:** Services/Method/Cases/Insights/About destinations require approved anchors or routes.
- Mitigate motion, accessibility, locale, and SEO regressions through static-first rendering, constrained islands, and strict TDD.

## Rollout and Rollback

Land auto-chained phases within the 800-line review budget. Contracts and narrative may proceed; blocked evidence/conversion claims MUST NOT publish. Deploy only after blockers clear and verification passes. Roll back Experience composition/content/assets while retaining Foundation routes, SEO helpers, and contact boundary.

## Dependencies

- Design/copy specification and exploration.
- Approvals named under publication blockers.

## Success Criteria

- [ ] ES/EN initial HTML contains the required narrative, heading hierarchy, services, method, approved evidence, FAQ, and diagnosis path.
- [ ] Canonical/hreflang/metadata remain valid; analytics, responsive behavior, accessibility, reduced motion, and strict-TDD suites pass.
- [ ] Every primary path converges on operational diagnosis without unsupported claims.

---

## Part II — V3 Amendment (Homepage V3, spec 1.0 — authoritative; supersedes Part I for new work)

> Sources of truth: the user's "Next Wrld — Homepage V3" (v1.0) specification (decision-grade; see the V3 section of `exploration.md`), cross-referenced with `docs/nextwrld2.0/*.md` (`landingConstruction.md` §24–31 section-page IA, `seo.md` §10–13/§31–34 URL strategy and migration rule, `estructuraDeLaWeb.md` §21–22/§29–30 AION-dominant evidence and conversion hierarchy). The V3 spec is authoritative; V2-era docs supply copy/detail only where they agree with it.

### Intent (V3)

Homepage V3 **inverts** the V2 architecture. The homepage stops being a mega-landing with in-page anchor navigation and becomes the **entry door to the Next Wrld ecosystem**: one primary conversion ("Analizar mi operación"), **exactly 6 content sections**, and **section sub-pages as the primary navigation** — not anchors. The North Star is preserved and restated: *"Estos entienden el tipo de problema que tenemos. Quiero hablar con ellos."* Invariants:

- Homepage = Header + Footer + 01 Hero, 02 Problema→Transformación, 03 Qué resolvemos, 04 Cómo trabajamos (Discover→Shape→Build→Launch→Evolve, one line per stage), 05 Trabajo real (AION dominant; JFHP + InmoCRM secondary; InmoCRM as research/MVP), 06 Diagnóstico (**offer only**).
- The form/calendar/WhatsApp/FAQ experience moves to the rebuilt `/es/diagnostico` page; the homepage must **never link to empty content**.
- Primary navigation is section sub-pages: `/es/servicios/software-a-medida`, `/es/servicios/sistemas-de-gestion`, `/es/servicios/automatizacion`, `/es/como-trabajamos`, `/es/casos`, `/es/insights`, `/es/nosotros`, `/es/diagnostico` (`/en` equivalent structure once approved content exists).

### Scope (V3)

**In scope**

- **Section routes as primary navigation:** `servicios/[slug]` (3 services), `como-trabajamos`, `casos`, `insights`, `nosotros`; `diagnostico` rebuilt as the context-first offer + form + calendar/WhatsApp handoff page (V2 homepage Diagnosis moves there, reusing the `homepage_diagnosis` source and strict `/api/contact` union). Per-route metadata/canonical/hreflang via existing `buildPageMetadata`/`localeAlternates`; sitemap extension; ES/EN slug parity where content is approved.
- **6-section homepage composition:** rewrite `ExperienceHome` to exactly 01–06; **retire** the anchor machinery (ExperienceHeader scrollspy + `handleAnchorClick`, `navAnchorId`/`navAnchorPath`, `/#` nav destinations, ChapterDivider-as-nav) and the homepage-only Faq/FinalCTA/Differentiation/Impact/BetterWay blocks (ideas redistribute: Why Next Wrld → `/nosotros`, framework → `/como-trabajamos`, FAQ → section pages and `/diagnostico`).
- **Test retirement/rework:** delete/replace `tests/section-pages.test.ts`, `tests/section-routes.test.ts`, and the anchor assertions in `tests/e2e/homepage-experience-preview.spec.ts`; rework `chapter-differentiation`/`experience-design` to the 6-section rhythm; update contracts/admission/observability/release suites to the new shape and event vocabulary; add route-level render/parity/a11y/SEO tests.
- **Event vocabulary (V3):** `diagnosis_cta_click`, `service_click`, `method_click`, `case_click`, `whatsapp_click`, `language_change` with `cta_location` context (`header`/`hero`/`diagnosis_section`); rename `service_view`→`service_click`, `case_view`→`case_click`, add `method_click`, drop homepage `insight_view` and `final` CTA location.
- **No-empty-content publication gate:** extend the fail-closed gate with route-existence + content-completeness validators (every nav/footer/CTA destination must resolve to a real, content-complete route).
- **Spec revisions:** `commercial-observability` (event vocabulary, per-route metadata/schema, no-empty-content gate), `homepage-experience` (6-section model), `operational-diagnosis` (homepage offer-only; full experience at `/diagnostico`); new `section-pages-v3` spec.
- **Three-phase delivery:** Fase 1 esqueleto → Fase 2 copy → Fase 3 final, with explicit approval gates between phases.

**Out of scope**

- Final visual/motion polish (Fase 3 details, sequenced only after copy approval in Fase 2).
- Evidence asset admission: 05 Trabajo real stays withheld/placeholder until real AION UI + JFHP/InmoCRM destinations are approved (InmoCRM remains research/MVP; current MVP-safe copy already complies).
- EN section pages beyond the homepage until approved EN content exists — the locale-parity gate withholds EN nav/links rather than half-publishing.
- New product offerings, new capabilities, or changes to `/api/contact` semantics beyond reuse.
- Reopening authoritative V3 spec decisions (section count, route set, conversion, phase gates).

### Capabilities (V3)

**New Capabilities**

- `section-pages-v3` — new capability: section sub-pages as primary navigation; per-route content contracts; route metadata/sitemap/schema; the "never link to empty content" release validator (route existence + content completeness).
- `homepage-v3` — successor of `homepage-experience`: the V3 entry-door composition (Header/Footer + exactly 6 sections, one conversion, no anchors). Registered as new so the V2 one-page capability can be retired cleanly.

**Modified Capabilities** (existing spec files that need V3 revision)

- `homepage-experience` — **retired in place / absorbed into `homepage-v3`**: `specs/homepage-experience/spec.md` is rewritten from the 13-key mega-landing content contract (impact, betterWay, differentiation, faq, finalCta, `/#` nav) to the 6-section entry-door model with route-based destinations.
- `operational-diagnosis` — revised: homepage 06 becomes offer-only (CTA → `/es/diagnostico`); the context-first form, calendar handoff, WhatsApp path, and FAQ experience move to the rebuilt `/es/diagnostico` page; `homepage_diagnosis` and the strict `ContactPayload` union are reused unchanged.
- `commercial-observability` — revised: event vocabulary renamed to V3 names with `cta_location` contexts; per-route metadata/hreflang/schema; the no-empty-content rule joins the observability publication gate.

Naming note: the task brief floated `homepage-v3` as a new capability name; we register it as the successor of `homepage-experience` (which is marked retired) so the existing specs-directory naming convention and the audit trail both hold. If the user prefers keeping `homepage-experience` as the name, that is a trivial rename — see Open decisions below.

### Approach (V3)

Adopt **Approach C (full V3 composition)** from the V3 exploration, with A's pragmatism where reuse is genuinely safe:

- **Reuse (safe reuse list):** `utils/diagnosis.ts` state machine, the strict `ContactPayload` union and `/api/contact` boundary (moved to `/es/diagnostico`); `EvidenceSection`/`AIONProductShowcase`/`CaseEvidence` visuals inside 05 Trabajo real; publication-gate machinery (`getPublicationConfig`/`admitPublication`/`scripts/validate-experience-build.ts`, `vercel.json` wiring) **extended** with route/no-empty-content validators; `buildPageMetadata`/`localeAlternates`/`trackEvent`/`TrackedLink`.
- **Retire wholesale:** ExperienceHeader scrollspy + anchor interception, `navAnchorId`/`navAnchorPath`, the `/#`-destination nav model (the `localizedHref` anchor branch stays but is no longer used for primary nav), ChapterDivider-as-nav, homepage Faq/FinalCTA/Differentiation, standalone Impact/BetterWay.
- **Tests:** delete/replace `section-pages.test.ts` + `section-routes.test.ts` with section-route tests (routes exist, render, ES/EN parity, sitemap includes them); rewrite `homepage-experience-preview.spec.ts` (nav hrefs = section routes, exactly 6 sections, no 404s, no anchor destinations); rework `chapter-differentiation`/`experience-design` to 6 sections; update `homepage-release.spec.ts` "no speculative links" to route-based no-empty-content checks.
- **Content model:** `HomepageContent` reshaped to 6 sections + route-based nav (`services` submenu of 3 + `como-trabajamos`/`casos`/`insights`/`nosotros`); `validateContentParity` updated (6-section invariant, no `/#` destinations, no empty destinations); section-page content lives in a new per-route content domain.
- **Sequencing guarantee:** the draft gate must keep serving a **complete** composition at every commit — Foundation (as today), or a complete V3 skeleton in Fase 1 — so no partial homepage that links to empty routes ever reaches production.

### Affected Areas (V3)

| Area | Impact | Description |
|---|---|---|
| `src/app/[locale]/page.tsx`, `src/app/[locale]/diagnostico/page.tsx` | Modified/New | 6-section entry-door composition; rebuilt diagnosis page (offer + form + calendar/WhatsApp handoff) |
| `src/app/[locale]/servicios/[slug]/page.tsx`, `src/app/[locale]/{como-trabajamos,casos,insights,nosotros}/page.tsx` | New | Section sub-pages as primary navigation; per-route content/metadata |
| `src/app/sitemap.ts`, `src/utils/seo.ts` | Modified | Section routes in sitemap; per-route canonical/hreflang/schema |
| `src/components/HomeExperience/{ExperienceHome,ExperienceHeader,...}.tsx` | Modified/New | 6-section composition (01–06); retire scrollspy/anchor interception; new section components (Problema→Transformación, Qué resolvemos, Cómo trabajamos, Trabajo real) |
| `src/components/Header/menuData.tsx`, `src/components/Footer/`, `src/i18n/{es,en}.ts` | Modified | Route-based nav items (Servicios submenu of 3 + 4 top-level items), V3 footer columns, menu vocabulary |
| `src/content/homepage/{types,es,en,index,publication,manifest,evidence}.ts` | Modified | 6-section model + route destinations; parity validator updated; release validators extended (routes, no-empty-content) |
| `src/content/sections/` (new) | New | Per-route section-page content contract (ES; EN when approved) |
| `scripts/validate-experience-build.ts`, `src/content/homepage/publication.ts` | Modified | Route existence + content-completeness validators; `vercel.json`/`package.json` wiring unchanged |
| `src/utils/analytics.ts` | Modified | V3 event vocabulary (`service_click`, `method_click`, `case_click`; `cta_location` header/hero/diagnosis_section) |
| `tests/` | Modified/Deleted | Retire `section-pages.test.ts`, `section-routes.test.ts`, anchor assertions in `homepage-experience-preview.spec.ts`; rework chapter/design/contracts/admission/observability/release suites; new route-level render/parity/a11y/SEO tests |
| `specs/{homepage-experience,operational-diagnosis,commercial-observability}/spec.md` | Modified | V3 revision (see Capabilities); new `specs/section-pages-v3/spec.md` |
| `markdown/success-cases/`, `public/images/experience/` | Unchanged/Blocked | InmoCRM MVP-safe copy already complies; AION/JFHP still placeholder (approved:false, empty allowlist, placeholder manifest) until real assets approved |

### Risks and Publication Blockers (V3)

- **Test inversion churn:** `section-pages.test.ts`, `section-routes.test.ts`, and the anchor assertions in `homepage-experience-preview.spec.ts` fully encode the anchor architecture and must be **replaced, not patched**; `experience-design`/`chapter-differentiation` pin the V2 5-divider chapter rhythm and numbered eyebrows that V3 renumbers to 6 sections.
- **Never link to empty content (incl. `/es/insights`, currently `approved:false`):** every nav/footer/CTA destination must resolve to a content-complete route; Fase 1 must deliver provisional-but-real copy or withhold the link; this becomes a fail-closed release validator.
- **Evidence still blocked:** AION showcase/JFHP/InmoCRM entries remain placeholder (approved:false, empty `verifiedCapabilities.aion` allowlist, placeholder `manifest.json`); 05 Trabajo real cannot release until real AION UI/destinations are approved. InmoCRM stays research/MVP — current MVP-safe copy complies.
- **Event/spec naming conflict:** `commercial-observability/spec.md` (and `docs/nextwrld2.0/landingConstruction.md` §41) still name `service_view`/`case_view`/`insight_view`; V3 mandates `service_click`/`method_click`/`case_click`. The OpenSpec specs must be revised to V3 vocabulary **before** the observability work lands, or the event contract tests will fight the spec.
- **`/casos` URL migration (OPEN DECISION — see Open decisions):** V3 mandates top-level `/casos` while detail pages live at `/success-cases/[slug]` (Foundation-era slugs: gym-access-os, chatbot, crm). Default assumption: `/casos` listing + `/casos/[slug]` details per the spec architecture, with redirects from `/success-cases/*` (per `seo.md` §34 URL-migration rule) — **pending explicit user confirmation before apply**; do not resolve silently.
- **Draft gate must keep a complete composition:** while the V3 composition is incomplete, the gate keeps serving the current complete composition (Foundation or the V2 homepage) — no partial 6-section homepage may go public; release stays blocked through Fases 1–2.
- **800-line budget re-slicing:** 7–8 new routes + section content can exceed the review budget; Fase 1 must be re-sliced into route-group units (servicios×3, institucional [nosotros + como-trabajamos], casos/insights, diagnostico) with per-slice RED tests.

### Rollout, Rollback, and Three-Phase Delivery (V3)

Deliver in the three mandated phases, each ending in an approval gate; continue the existing auto-chain feature-branch model, chaining V3 slices off `experience-2-homepage-08-admission` (tracker stays draft/no-merge until the Fase 3 gate passes).

| Phase | Content | Approval gate |
|---|---|---|
| **Fase 1 — esqueleto** | Section routes + nav/footer route wiring + 6-section homepage skeleton with provisional-but-real copy (no link points at empty content); anchor-test retirement; new route/render/parity RED tests; draft gate extended with route-completeness validation (release stays blocked) | Structure/nav/routes/responsive skeleton approved |
| **Fase 2 — copy** | Final ES/EN copy per section and per route; dictionary reshaped to the 6-section model; `src/i18n` footer/menu vocabulary; copy parity tests; no unverifiable claims | Final ES/EN copy approved |
| **Fase 3 — final** | Visual/motion/SEO/analytics/a11y/performance pass; event rename (`service_click`/`method_click`/`case_click`); per-route metadata + sitemap + schema; e2e/observability updates; evidence assets admission (real AION UI still required); release flip | Fase 3 QA + release admission |

Budget: keep every slice under the 800 authored-line review budget; re-slice Fase 1 into route-group units rather than one mega-slice. Each slice owns RED/GREEN/composition/proof with rollback to the previous slice.

**Rollback:** reverting any phase returns publication to the previous **complete** composition — Fase 3 → Fase 2 → Fase 1 skeleton → V2 one-page homepage → Foundation — because the fail-closed gate re-admits the status at every build path. Preserve locale routes, Foundation, `buildPageMetadata`/SEO helpers, and the `/api/contact` boundary throughout; no data migration exists (the rebuilt `/diagnostico` replaces the legacy message form only when the V3 page passes release admission).

### Dependencies (V3)

- User confirmation of the open decisions below (notably `/casos` URL migration) before Fase 1 apply.
- Approvals named under publication blockers: real AION UI + destination URLs, JFHP/InmoCRM destinations, diagnosis provider/calendar/privacy ownership (carried from V2).
- Final ES/EN copy for section pages (Fase 2 gate) and approved EN content before EN section routes publish.

### Success Criteria (V3)

- [ ] Homepage is the entry door: exactly 6 content sections + Header/Footer; one primary conversion "Analizar mi operación" converging on `/es/diagnostico`; no `/#` anchor navigation, no scrollspy/anchor machinery, no homepage FAQ/FinalCTA/Differentiation.
- [ ] Section sub-pages exist for ES (servicios×3, como-trabajamos, casos, insights, nosotros) plus the rebuilt `/es/diagnostico`; they render server-first, preserve ES/EN parity where content is approved, and appear in nav, footer, sitemap, and per-route metadata/schema.
- [ ] The no-empty-content validator fails any release whose nav/footer/CTA links to a missing or content-incomplete destination (including `/es/insights` until approved content exists); the draft gate keeps serving a complete composition at all times.
- [ ] Event vocabulary matches V3 (`diagnosis_cta_click`, `service_click`, `method_click`, `case_click`, `whatsapp_click`, `language_change` with `cta_location` header/hero/diagnosis_section); `commercial-observability`, `homepage-experience`, and `operational-diagnosis` specs revised, with `section-pages-v3` added.
- [ ] 05 Trabajo real publishes only approved evidence — AION dominant (real UI), JFHP + InmoCRM secondary, InmoCRM as research/MVP — and release remains blocked until then.
- [ ] Fases 1 → 2 → 3 delivered with approval gates; strict-TDD suites, lint, typecheck, build, and e2e pass; every intermediate state is a complete, deployable composition.
- [ ] North Star preserved: "Estos entienden el tipo de problema que tenemos. Quiero hablar con ellos."

### Open Decisions for User Confirmation (proposal question round)

This proposal is a formalization of an authoritative spec, but a few product-architecture unknowns would otherwise make it ambiguous to apply. Defaults are stated; please confirm, correct, or override before Fase 1 apply:

1. **`/casos` URL migration (blocking for Fase 1):** V3 mandates top-level `/casos`, but detail pages live at `/success-cases/[slug]`. **Default:** `/casos` listing + `/casos/[slug]` details, with redirects from `/success-cases/*` per `seo.md` §34. Alternatives: rename slugs in place (no redirects), or keep `/success-cases/[slug]` as the detail URL with `/casos` as the listing. Which do you want?
2. **EN section pages timing:** build EN routes as parity skeletons in Fase 1, or ES-first with EN routes withheld until approved EN copy exists? **Default:** ES-first; EN routes are added when content is approved, and the locale-parity gate withholds EN nav/links (never half-publishes).
3. **`/es/insights` empty state:** withhold the nav/footer link until approved content exists (default, per "never link to empty content"), or ship an interim listing page with withheld posts?
4. **Capability naming:** keep the existing three capability names with `homepage-experience` revised (and add `section-pages-v3`), or rename `homepage-experience` → `homepage-v3` in the specs directory? **Default:** keep existing names + add `section-pages-v3` (rename is trivial later if preferred).
