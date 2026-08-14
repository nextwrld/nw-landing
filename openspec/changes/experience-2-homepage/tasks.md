# Tasks: Experience 2.0 Homepage

Expected additions+deletions: **1,780–2,260** (eight ranges sum exactly); ceilings hard-stop; re-slice before exceeding. Every slice owns RED/GREEN/composition/proof; draft renders Foundation. Lockfile changes only if `tsx` changes.

| Slice | Range/ceiling | Base → target | RED; runtime; rollback |
|---|---|---|---|
| 1 Contracts | 260–320/500 | `experience-2-homepage` → `experience-2-homepage-01-contracts` | `pnpm exec vitest run tests/homepage-contracts.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; new `tests/homepage-contracts.test.ts`, `src/content/homepage/{types,es,en,index,publication}.ts`, `scripts/validate-experience-build.ts`, `package.json`, `vercel.json`, `pnpm-lock.yaml` if changed |
| 2 Shell | 220–280/500 | `experience-2-homepage-01-contracts` → `experience-2-homepage-02-shell` | `pnpm exec vitest run tests/shell-a11y.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-shell.spec.ts`; new `tests/{shell-a11y.test.ts,e2e/homepage-shell.spec.ts}`, modified `src/app/[locale]/{layout,page}.tsx`, `src/components/Header/index.tsx`, `src/components/Header/menuData.tsx`, `src/components/Footer/index.tsx`, `src/styles/index.css` |
| 3 Problem | 180–240/450 | `experience-2-homepage-02-shell` → `experience-2-homepage-03-problem` | `pnpm exec vitest run tests/homepage-problem.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-content.spec.ts`; new `tests/{homepage-problem.test.ts,e2e/homepage-content.spec.ts}`, `src/app/[locale]/page.tsx`, `src/components/HomeExperience/{Hero,Problem,Impact,BetterWay}.tsx`, `src/content/homepage/{es,en}.ts` |
| 4 Method | 220–280/500 | `experience-2-homepage-03-problem` → `experience-2-homepage-04-method` | `pnpm exec vitest run tests/homepage-method.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-method.spec.ts`; new `tests/{homepage-method.test.ts,e2e/homepage-method.spec.ts}`, `src/app/[locale]/page.tsx`, `src/components/HomeExperience/{Capabilities,Method,Differentiation}.tsx`, `src/content/homepage/{es,en}.ts` |
| 5 Evidence | 260–320/550 | `experience-2-homepage-04-method` → `experience-2-homepage-05-evidence` | `pnpm exec vitest run tests/evidence.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-evidence.spec.ts`; new `tests/{evidence.test.ts,e2e/homepage-evidence.spec.ts}`, `src/app/[locale]/page.tsx`, `src/components/HomeExperience/{AIONProductShowcase,CaseEvidence}.tsx`, create exact `public/images/experience/manifest.json` listing approved filenames, `markdown/success-cases/{es,en}/crm.md`; rollback: manifest + only filenames listed in it |
| 6 Diagnosis | 240–300/550 | `experience-2-homepage-05-evidence` → `experience-2-homepage-06-diagnosis` | `pnpm exec vitest run tests/{diagnosis.test.ts,contact-api.test.ts}`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-diagnosis.spec.ts`; new `tests/{diagnosis.test.ts,e2e/homepage-diagnosis.spec.ts}`, modified `tests/contact-api.test.ts`, `src/app/[locale]/page.tsx`, `src/components/HomeExperience/{Diagnosis,FAQ,FinalCTA}.tsx`, `src/utils/contact.ts`, `src/app/api/contact/route.ts` |
| 7 Observability | 180–240/450 | `experience-2-homepage-06-diagnosis` → `experience-2-homepage-07-observability` | `pnpm exec vitest run tests/observability.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-observability.spec.ts`; new `tests/{observability.test.ts,e2e/homepage-observability.spec.ts}`, `src/app/[locale]/page.tsx`, `src/utils/{analytics,seo}.ts` |
| 8 Admission | 220–280/500 | `experience-2-homepage-07-observability` → `experience-2-homepage-08-admission` | `pnpm exec vitest run tests/admission.test.ts && pnpm exec tsc --noEmit && pnpm lint && pnpm build`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-release.spec.ts`; new `tests/{admission.test.ts,e2e/homepage-release.spec.ts}`, `src/app/[locale]/page.tsx` |

400-line budget risk: High  
Chained PRs recommended: Yes  
Chain strategy: feature-branch-chain  
Decision needed before apply: No  
Delivery strategy: auto-chain. Tracker `experience-2-homepage` is draft/no-merge; slices `experience-2-homepage-01-contracts` through `experience-2-homepage-08-admission` target preceding branches; tracker later targets `main`. Next apply: task `1.1` on `experience-2-homepage-01-contracts` based on tracker. Reverting composition returns publication to prior slice; earlier sources/contracts remain.

## Topology (design refinement)
Contracts→1; shell→1/3; problem→2; method→2; evidence→2/3; diagnosis→2/3; observability→1/3; admission→1/3/4/5.

## Strict TDD tasks
- [x] 1.1 RED: parity, IDs, approvals/destinations, evidence, missing meaning; 1.2 GREEN: implement contracts/preflight in both ES and EN, `tsx` scripts, lockfile if changed; fail-closed release/Foundation draft; 1.3 REFACTOR: centralized IDs/validators, canonical/hreflang/schema, event locations, and islands.
- [x] 2.1 RED: locale, focus, zoom, contrast, non-color cues; 2.2 GREEN: ES/EN Header/Footer/layout/CSS composed.
- [x] 3.1 RED: ES/EN H1, friction/impact/order, scripts-off/reduced-motion; 3.2 GREEN: ES/EN problem content composed.
- [x] 4.1 RED: services, useful-AI boundary, five-stage outcomes; 4.2 GREEN: ES/EN method composed.
- [x] 5.1 RED: approved AION/JFHP/automation/InmoCRM-MVP evidence and CRM withholding; 5.2 GREEN: ES/EN safe evidence composed.
- [x] 6.1 RED: offer duration/cost/focus/non-obligation/conditional deliverables; field errors; contact/calendar/external recovery, WhatsApp, confirmed booking, privacy/legal blockers, FAQ assistive-tech/no-enhancement. 6.2 GREEN: ES/EN diagnosis/FAQ/CTA and strict union.
- [x] 7.1 RED: privacy events, consent/analytics failure, withheld schema/events, invalid canonical/hreflang, intentional external activation, language-switch context. 7.2 GREEN: ES/EN metadata/schema/observability.
- [x] 8.1 RED: navigation/evidence/diagnosis/FAQ/build blockers and ordinary/Vercel/direct builds. 8.2 GREEN/REFACTOR: ES/EN `src/app/[locale]/page.tsx`; complete Experience only, else Foundation/withholding.

---

# Tasks (V3 amendment): Homepage V3 — entry door + section sub-pages (spec 1.0)

> **Status / provenance.** Supersedes the V2 tasks above for all new work, per `proposal.md` Part II, the four V3 specs (`section-pages-v3` NEW; `homepage-experience`, `operational-diagnosis`, `commercial-observability` REVISED), the V3 amendment of `design.md`, and the V3 section of `exploration.md`. V2 tasks are preserved verbatim above for the audit trail. Auto-chain continues off `experience-2-homepage-08-admission`; the tracker stays draft/no-merge until the Fase 3 gate (V3-10) passes.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~3,800–5,300 across 10 chained slices (each slice ≤800; average ~450) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | V3-01 → V3-02 → V3-03 → V3-04 → V3-05 → V3-06 → V3-07 → V3-08 → V3-09 → V3-10 |
| Delivery strategy | ask-on-risk (confirm open decisions 1–4 before Fase 1 apply, then auto-chain) |
| Chain strategy | feature-branch-chain |

```text
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High
```

## V3 slice table (10 slices; 800-line ceiling each; every slice owns RED → GREEN → composition proof → rollback)

| Slice | Range/ceiling | Base → target | RED; runtime; rollback |
|---|---|---|---|
| V3-01 Contracts/registry/gate | 520–680/800 | `experience-2-homepage-08-admission` → `experience-2-homepage-v3-01-contracts-registry` | `pnpm exec vitest run tests/section-routes-v3.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; new `tests/section-routes-v3.test.ts`, `src/content/sections/{types,index,es,en}.ts`; delete `tests/{section-pages,section-routes}.test.ts`; modified `src/content/homepage/{types,es,en,index,publication}.ts`, `src/components/Header/menuData.tsx`, `scripts/validate-experience-build.ts`, `tests/{admission,homepage-contracts}.test.ts`; rollback → `experience-2-homepage-08-admission` |
| V3-02 Servicios ×3 | 420–560/800 | `experience-2-homepage-v3-01-contracts-registry` → `experience-2-homepage-v3-02-servicios` | `pnpm exec vitest run tests/servicios.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; new `src/app/[locale]/servicios/[slug]/page.tsx`, `src/components/HomeExperience/SectionPageShell.tsx`, `tests/servicios.test.ts`; modified `src/content/sections/{es,index}.ts`, `src/app/sitemap.ts`; rollback → V3-01 |
| V3-03 Institucional | 320–450/800 | `experience-2-homepage-v3-02-servicios` → `experience-2-homepage-v3-03-institucional` | `pnpm exec vitest run tests/institucional.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; new `src/app/[locale]/{como-trabajamos,nosotros}/page.tsx`, `tests/institucional.test.ts`; modified `src/content/sections/{es,index}.ts`, `src/app/sitemap.ts`; rollback → V3-02 |
| V3-04 Casos + insights | 380–520/800 | `experience-2-homepage-v3-03-institucional` → `experience-2-homepage-v3-04-casos-insights` | `pnpm exec vitest run tests/casos-insights.test.ts && pnpm exec vitest run tests/localization.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; new `src/app/[locale]/casos/{page.tsx,[slug]/page.tsx}`, `src/app/[locale]/insights/page.tsx`, `tests/casos-insights.test.ts`; modified `src/app/[locale]/success-cases/[slug]/page.tsx` (308 → `/casos/[slug]`), `src/content/sections/{es,index}.ts`, `src/app/sitemap.ts`, `tests/localization.test.ts`; rollback → V3-03 |
| V3-05 Diagnostico + homepage 06 + V3 skeleton | 520–680/800 | `experience-2-homepage-v3-04-casos-insights` → `experience-2-homepage-v3-05-diagnostico-skeleton` | `pnpm exec vitest run tests/diagnostico-page.test.ts && pnpm exec vitest run tests/diagnosis.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/homepage-v3.spec.ts`; new `src/components/HomeExperience/{ProblemTransformation,ServicesOverview,MethodSection,DiagnosisOffer}.tsx`, `tests/diagnostico-page.test.ts`, `tests/e2e/homepage-v3.spec.ts`; modified `src/app/[locale]/page.tsx` (3-way composition switch), `src/app/[locale]/diagnostico/page.tsx` (rebuilt), `src/components/HomeExperience/{ExperienceHome,ExperienceHeader,Diagnosis}.tsx`, `src/components/Header/{index.tsx,menuData.tsx}`, `src/components/Footer/`, `src/content/homepage/{es,en,index,publication}.ts` (gate admits complete V3 skeleton), `tests/diagnosis.test.ts` (DIAGNOSIS-09 split), `tests/e2e/homepage-experience-preview.spec.ts` (anchor assertions retired); rollback → V3-04 |
| V3-06 Final ES copy + i18n | 300–420/800 | `experience-2-homepage-v3-05-diagnostico-skeleton` → `experience-2-homepage-v3-06-copy-es` | `pnpm exec vitest run tests/copy-parity.test.ts && pnpm exec vitest run tests/homepage-contracts.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; new `tests/copy-parity.test.ts`; modified `src/content/homepage/{es,en}.ts`, `src/content/sections/es.ts`, `src/i18n/{es,en}.ts`, `tests/homepage-contracts.test.ts` (HOMEPAGE-001 6-section copy); rollback → V3-05 |
| V3-07 EN approval + registry flip | 300–460/800 | `experience-2-homepage-v3-06-copy-es` → `experience-2-homepage-v3-07-en-flip` | `pnpm exec vitest run tests/en-sections.test.ts && pnpm exec vitest run tests/section-routes-v3.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/locale-navigation.spec.ts`; new `tests/en-sections.test.ts`; modified `src/content/sections/{en,index}.ts` (`publishedRoutes("en")` flips atomically), `src/content/homepage/en.ts`, `tests/section-routes-v3.test.ts`, `tests/e2e/locale-navigation.spec.ts`; rollback → V3-06 |
| V3-08 Events + per-route SEO/sitemap/schema | 380–540/800 | `experience-2-homepage-v3-07-en-flip` → `experience-2-homepage-v3-08-events-seo` | `pnpm exec vitest run tests/observability.test.ts && pnpm exec vitest run tests/seo.test.ts && pnpm exec vitest run tests/homepage-contracts.test.ts`; `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build`; modified `src/utils/analytics.ts` (V3 vocabulary, drop `final`), `src/utils/seo.ts` (`sectionPageSchema`, homepage schema drops FAQ), `src/app/{sitemap,site}.ts`, `src/app/[locale]/page.tsx`, `src/content/homepage/{es,en,index}.ts`, `tests/{observability,seo,homepage-contracts}.test.ts`; rollback → V3-07 |
| V3-09 e2e/observability/a11y/performance | 420–600/800 | `experience-2-homepage-v3-08-events-seo` → `experience-2-homepage-v3-09-e2e-qa` | `pnpm exec vitest run tests/{chapter-differentiation,experience-design,homepage-problem,homepage-method,shell-a11y}.test.ts`; `pnpm build && pnpm exec playwright test tests/e2e/{section-routes,casos-migration,diagnostico-page,homepage-v3,homepage-experience-preview}.spec.ts`; new `tests/e2e/{section-routes,casos-migration,diagnostico-page}.spec.ts`; rewritten `tests/e2e/homepage-experience-preview.spec.ts`; modified `tests/{chapter-differentiation,experience-design,homepage-problem,homepage-method,shell-a11y}.test.ts`, `tests/e2e/{homepage-shell,homepage-content,homepage-method,homepage-evidence,homepage-diagnosis,homepage-observability,homepage-release}.spec.ts` (V3 heading copy), `src/styles/index.css`; rollback → V3-08 |
| V3-10 Evidence admission + release flip | 220–380/800 | `experience-2-homepage-v3-09-e2e-qa` → `experience-2-homepage-v3-10-release` | `pnpm exec vitest run tests/{evidence,admission}.test.ts && pnpm exec tsc --noEmit && pnpm lint && pnpm build`; `EXPERIENCE_PUBLICATION_STATUS=release pnpm build && pnpm exec playwright test tests/e2e/homepage-release.spec.ts`; modified `src/content/homepage/{evidence,manifest,es,en,publication}.ts`, `public/images/experience/manifest.json`, `markdown/success-cases/{es,en}/crm.md` (approved destinations only), `tests/{evidence,admission}.test.ts`, `tests/e2e/homepage-release.spec.ts` (blocked→flip); rollback → V3-09 |

## Topology (V3 refinement)
Registry/gate→section-pages-v3 1/2/4 + commercial-observability 6; servicios→section-pages-v3 2; institucional→2/3; casos/insights→section-pages-v3 2/5; diagnostico/skeleton→operational-diagnosis 1/3/7 + homepage-experience 2/3; copy→homepage-experience 1 + section-pages-v3 2; EN→section-pages-v3 2/3; events→commercial-observability 3/4; seo→commercial-observability 1/2; e2e→all; release→homepage-experience 5 + commercial-observability 6 + section-pages-v3 4.

## Verification contract (V3, per slice)
- RED runtime: `pnpm exec vitest run tests/<slice-test>.test.ts` (exact files per row above; IDs: SECTION-PAGE-V3-001..005, SERVICIO-001..004, INSTITUCIONAL-001..003, CASOS-001..005, DIAGNOSTICO-V3-001..003, COPY-001..003, EN-001..003, OBSERVABILITY-001..008, SEO-V3-001, ADMISSION-NAV/ADMISSION-ROUTES, CHAPTER-001 V3, DESIGN-001/004 V3, DIAGNOSIS-09 split, I18N redirect matrix).
- Build gate: `EXPERIENCE_PUBLICATION_STATUS=draft pnpm build` (default) through `pnpm validate:experience-build && next build`; `EXPERIENCE_PUBLICATION_STATUS=release pnpm build` only in V3-10; direct `next build` validated via page composition.
- e2e: `pnpm build && pnpm exec playwright test tests/e2e/<spec>.spec.ts` (V3-05/07/09/10 rows).
- Rollback: revert the slice branch to its base; the fail-closed gate re-admits the prior complete composition (V3-10 → V3-09 → … → V3-01 → `experience-2-homepage-08-admission`) at every build path; earlier sources/contracts remain.

## Strict TDD tasks (V3)
- [ ] V3-01 RED: SECTION-PAGE-V3-001..005 + ADMISSION-NAV/ADMISSION-ROUTES RED first (registry, ES nav/footer/CTA resolve to real routes, no `/#`, no empty destinations, EN registry empty, draft gate Foundation while skeleton incomplete, release fails on missing route); V3-01 GREEN: 6-section `HomepageContent` reshape, `src/content/sections/` types + registry skeleton, route-existence + no-empty-content validators, `buildApprovedNavV3`, discriminated `admitPublication` (foundation|v3-skeleton|v3-release); V3-01 REFACTOR: delete `section-pages`/`section-routes` tests, retire `navAnchorPath`/`/#` nav model. <!-- sdd-owner: implementation -->
- [ ] V3-02 RED: SERVICIO-001..004 (per-service initial HTML H1 + narrative, metadata/canonical/hreflang, a11y heading order, sitemap entries); V3-02 GREEN: 3 service routes + `SectionPageShell` + per-route ES `SectionContent`; REFACTOR: shared shell/server-first, draft gate still Foundation. <!-- sdd-owner: implementation -->
- [ ] V3-03 RED: INSTITUCIONAL-001..003 (nosotros Why Next Wrld, como-trabajamos five stages one line each, parity/metadata/a11y); V3-03 GREEN: `nosotros` + `como-trabajamos` routes + content (redistributed from V2 differentiation/method); REFACTOR: registry-driven `generateStaticParams`, `dynamicParams = false`. <!-- sdd-owner: implementation -->
- [ ] V3-04 RED: CASOS-001..005 (listing renders approved cases + mandatory narrative, detail renders markdown, `/success-cases/{slug}` 308 → `/casos/{slug}` preserving locale, insights unlinked + 404 + absent from sitemap, `case_click` wiring) + I18N redirect matrix; V3-04 GREEN: `/casos` + `/casos/[slug]` + insights route file (unpublished) + redirect page; REFACTOR: sitemap emits `/casos/*` never `/success-cases/*`. <!-- sdd-owner: implementation -->
- [ ] V3-05 RED: DIAGNOSTICO-V3-001..003 (rebuilt page completeness, homepage 06 offer-only — no form/calendar/WhatsApp/FAQ, dependencies unapproved → no scheduling claim) + `homepage-v3.spec.ts` RED (exactly 6 sections, one primary conversion, no anchors, no retired blocks, mobile/reduced-motion/enhancement-failure) + DIAGNOSIS-09 split; V3-05 GREEN: rebuilt `/diagnostico`, 6-section `ExperienceHome`, `DiagnosisOffer`; anchor machinery and homepage Faq/FinalCTA/Differentiation/Impact/BetterWay retired; V3-05 REFACTOR: gate admits the complete V3 skeleton (draft flips from Foundation). <!-- sdd-owner: implementation -->
- [ ] V3-06 RED: COPY-001..003 (final ES copy per section/route, no unverifiable claims, i18n menu/footer vocabulary, 6-section invariant + no `/#` + no empty destinations in copy) + HOMEPAGE-001; V3-06 GREEN: final ES copy in `src/content/homepage/{es,en}.ts` + `src/content/sections/es.ts` + `src/i18n/{es,en}.ts`; REFACTOR: single source per route, no copy drift. <!-- sdd-owner: implementation -->
- [ ] V3-07 RED: EN-001..003 (approved EN content, `publishedRoutes("en")` flips atomically, EN render/parity/metadata, locale-parity gate proof) + SECTION-PAGE-V3-003 inverted; V3-07 GREEN: `src/content/sections/en.ts` approved entries + registry flip + EN homepage copy; REFACTOR: EN on is a single atomic registry change. <!-- sdd-owner: implementation -->
- [ ] V3-08 RED: OBSERVABILITY-001 V3 vocabulary (no `service_view`/`case_view`/`insight_view`, no `final` location, `DIAGNOSIS_CTA_LOCATIONS = [header, hero, diagnosis_section]`, no homepage FAQ schema, no empty-destination events) + SEO-V3-001 (per-route canonical/hreflang/schema, registry-driven sitemap); V3-08 GREEN: `analytics.ts` rename + `method_click`, `sectionPageSchema`, `SITE_DESCRIPTION`, sitemap; REFACTOR: one event/route map shared by nav, footer, sitemap, metadata. <!-- sdd-owner: implementation -->
- [ ] V3-09 RED: CHAPTER-001 V3 (six-section rhythm, no `.chapter-divider`, eyebrows 01–06, no `IntersectionObserver` in header) + DESIGN-001/004 over six sections + PROBLEM-001 (Problema→Transformación pair) + METHOD-003 (04 one-line five stages) + e2e specs (section-routes, casos-migration, diagnostico-page, rewritten preview); V3-09 GREEN: reworked suites + V3 heading copy across e2e specs + a11y/motion/contrast pass; REFACTOR: delete remaining V2 chapter/eyebrow fixtures. <!-- sdd-owner: implementation -->
- [ ] V3-10 RED: evidence admission (real AION UI + JFHP/InmoCRM destinations, manifest populated, release-gate e2e blocked→flip) + full gate `pnpm exec vitest run tests/admission.test.ts && pnpm exec tsc --noEmit && pnpm lint && pnpm build`; V3-10 GREEN: evidence manifest/destinations approved, `EXPERIENCE_PUBLICATION_STATUS=release` flips; REFACTOR: tracker moves out of draft only after Fase 3 gate. <!-- sdd-owner: implementation -->

## Phase gates and lifecycle (parent, post-apply)
- [ ] Confirm open decisions 1–4 (listed below) before Fase 1 apply. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for each chained slice PR (V3-01 … V3-10). <!-- sdd-owner: parent -->
- [ ] Phase gate Fase 1: structure/nav/routes skeleton approved after V3-05. <!-- sdd-owner: parent -->
- [ ] Phase gate Fase 2: final ES/EN copy approved after V3-07. <!-- sdd-owner: parent -->
- [ ] Phase gate Fase 3: QA + release admission after V3-10; tracker `experience-2-homepage` moves out of draft. <!-- sdd-owner: parent -->

## Delivery summary (V3)
- **Budget risk:** High overall (~3,800–5,300 changed lines) but sliced: every PR ≤800-line ceiling, auto-chained feature branches; re-slice before any ceiling is exceeded.
- **Chain strategy:** feature-branch-chain, V3-01 based on `experience-2-homepage-08-admission`, V3-N+1 based on V3-N; tracker draft/no-merge until Fase 3 gate.
- **Decision needed before apply (all pending user confirmation; do not resolve silently):**
  1. `/casos` URL migration — default `/casos` listing + `/casos/[slug]` details + 308 redirects from `/success-cases/*` (blocks Fase 1).
  2. EN section pages timing — default ES-first, EN withheld by the locale-parity gate until approved EN copy.
  3. `/es/insights` empty state — default withheld: unlinked, 404, absent from sitemap until approved content.
  4. Capability naming — default keep `homepage-experience` (revised) + add `section-pages-v3`.
- **Tracker status:** draft until Fase 3 gate; blocked items carried from V2: real AION UI + destination URLs, JFHP/InmoCRM destinations, diagnosis provider/calendar/privacy/ownership, FAQ ownership legal wording (V3-05 gated features and V3-10 flip depend on them).

