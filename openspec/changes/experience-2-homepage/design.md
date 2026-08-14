# Design: Experience 2.0 Homepage

## Technical Approach

Build server-first Experience components while Foundation remains at `/{locale}` in draft. A status-aware contract permits Experience output only after release validation.

## Architecture Decisions

| Option | Tradeoff | Decision and rationale |
|---|---|---|
| Dictionaries vs typed model | More files; compile-time parity | `HomepageContent` uses stable IDs and `satisfies`; validators enforce ES/EN parity, approvals, and destinations. |
| Universal vs section components | More components | Use section-specific components for narrative clarity. |
| Hydrated vs server-first | Explicit island props | Server-render copy; client-render only stateful controls. |
| One gate vs status-aware admission | Preserve drafts; reject unsafe releases | `admitPublication` returns Foundation after `validateDraft`; release internally runs `validateRelease` before returning Experience. `pnpm build` preflights it; Vercel invokes that build. |
| Reuse `diagnostico` vs new source | New allowlist member; no ambiguous parsing | Reserve `diagnostico` for the existing message form and add `homepage_diagnosis` for the context-first payload. This preserves `/diagnostico` throughout migration and keeps exact-key validation. |

**ADR alignment:** no deviations: locale URLs (ADR-001), static Server Components/small islands (ADR-002), and validated server-loaded Markdown (ADR-003). No routes or translated slugs are added.

## Data Flow

```text
pnpm build / Vercel → admitPublication(status)
  draft → validateDraft → Foundation composition
  release → validateRelease → Experience composition → approved HTML/schema/events
homepage_diagnosis → /api/contact parser → accepted context → approved calendar handoff
diagnostico → unchanged legacy parser branch → unchanged /diagnostico outcome
```

`DiagnosisForm` states are `idle | editing | submitting | contextAccepted | handoffError | submitError`; only provider confirmation means booked. Preserve safe retry input, prevent duplicates, and exclude entered values from analytics.

## Interfaces / Contracts

`ContactPayload` is a strict union. Legacy `source: "home" | "contact" | "diagnostico"` keeps its exact message shape; `homepage_diagnosis` accepts exactly `fullName,company,email,operationArea,privacyAccepted:true,source,website?`. Both retain existing hardening and generic errors.

`PublicationConfig.status` is `draft | release`; approvals are `pending | approved`. The sole resolver imported by `page.tsx`, `admitPublication`, returns Foundation after draft validation or Experience after release validation; rejection throws before output. `scripts/validate-experience-build.ts` calls it and exits nonzero. Future `package.json` adds `tsx`, `"validate:experience-build": "tsx scripts/validate-experience-build.ts"`, and `"build": "pnpm validate:experience-build && next build"`; `vercel.json` sets `"buildCommand": "pnpm build"`. Direct `next build` validates through page composition.

`EvidenceEntry` identifies approved assets, destinations, claims, and qualification. AION claim IDs must be in `verifiedCapabilities.aion`; InmoCRM must be `mvp`. Both validators parse `markdown/success-cases/{es,en}/crm.md`. Before publication, rewrite copy/frontmatter to remove production implementation, achieved-result, deployment, and scalability claims. Keep truthful research, problem, design, and MVP content only when compatible with the authoritative qualification. An incompatible/missing locale withholds both links; release fails if required evidence is lost.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/content/homepage/{types,es,en,index,publication}.ts` | Create | Content, parity, draft/release, evidence contracts |
| `scripts/validate-experience-build.ts`, `package.json`, `vercel.json` | Create/Modify | Status-aware preflight, fail-closed ordinary build, explicit hosting route |
| `src/components/HomeExperience/**/*.tsx` | Create | Server sections and focused islands |
| `src/app/[locale]/page.tsx` | Modify | Foundation/Experience composition switch, metadata/schema |
| `src/components/Header/`, `src/components/Footer/`, `src/styles/index.css` | Modify | Approved IA and experience rules |
| `src/utils/{analytics,contact,seo}.ts`, `src/app/api/contact/route.ts` | Modify | Events, strict payload union, schema helpers |
| `public/images/experience/`, `tests/` | Create/Modify | Approved assets and RED suites |
| `markdown/success-cases/es/crm.md`, `markdown/success-cases/en/crm.md` | Modify | MVP-safe bilingual destinations; withhold unless validated |

## Testing Strategy

Strict RED→GREEN→REFACTOR across five rollbackable auto-chain slices: (1) contracts/shell/SEO/events/build routing; (2) problem; (3) solution/method; (4) evidence/CRM destinations; (5) conversion/completion. RED tests prove draft `pnpm build`/Vercel keeps Foundation; preflight and composition reject invalid release before output; valid release selects Experience; `diagnostico` remains compatible; AION is allowlisted; both CRM files reject production/results/deployment/scalability claims and withhold links. Integration checks no withheld HTML/link/schema/event. Playwright covers initial HTML, accessibility, motion, recovery, analytics failure, and booking truth. Tasks keep tests per slice with results and rollback.

## Threat Matrix

Build/process routing is in scope; the reference rows are assessed explicitly.

| Boundary | Applicability | Design response / RED tests |
|---|---|---|
| Documentation-like paths | N/A — Markdown is parsed as content, never classified or executed | No execution boundary |
| Git repository selection | N/A — no Git invocation | None |
| Commit state | N/A — no Git invocation | None |
| Push state | N/A — no push automation | None |
| PR commands | N/A — no PR automation | None |

## Migration / Rollout

Land all five slices in draft mode; Foundation remains deployable. Release requires approved dependencies, MVP-safe CRM destinations, and a complete manifest; changing to `release` is atomic because every build path re-admits that status. Roll back status/composition and Experience assets/components while preserving locale routes, Foundation, SEO/Markdown helpers, and `/api/contact`; no data migration exists.

## Open Questions

- [ ] Approval owners must provide the blockers listed in the proposal before release admission can succeed.

---

# Design (V3 amendment): Homepage V3 — entry door + section sub-pages (spec 1.0)

> **Status / provenance.** This V3 section supersedes the V2 design above for all new work, per proposal Part II (authoritative spec 1.0). The V2 design is preserved verbatim above for the audit trail. Sources of truth: `proposal.md` Part II, the four V3 specs (`section-pages-v3` NEW; `homepage-experience`, `operational-diagnosis`, `commercial-observability` REVISED), and the V3 section of `exploration.md`. Where this section conflicts with the V2 design, this section wins. ADRs: `docs/architecture/ADR-001-locale-routing.md`, `ADR-002-rendering-strategy.md`, `ADR-003-content-pipeline.md` (all preserved; deviations are recorded below).

## V3 Architecture Decisions (with explicit deviations from V2/ADRs)

| Option | Tradeoff | Decision and rationale |
|---|---|---|
| One-page anchors vs route-based nav | More routes; matches spec 1:1 | **Deviation D1 (explicit):** V2's `/#`-destination nav model is retired. Section sub-pages become the primary navigation with real routes (`servicios/[slug]`, `como-trabajamos`, `casos`, `insights`, `nosotros`, rebuilt `diagnostico`). This supersedes the V2 decision "No routes or translated slugs are added" and the V2 ADR-alignment claim. ADR-001 (locale URLs) is not violated — all new routes stay under `[locale]/`. |
| 11-block mega-landing vs 6-section entry door | Retire working sections | **Deviation D2 (explicit):** homepage composes exactly 01 Hero, 02 Problema→Transformación, 03 Qué resolvemos, 04 Cómo trabajamos, 05 Trabajo real, 06 Diagnóstico (offer-only). Homepage Faq/FinalCTA/Differentiation/Impact/BetterWay and ChapterDivider-as-nav are retired; their meaning redistributes (Why Next Wrld → `/nosotros`, framework → `/como-trabajamos`, FAQ → section pages + `/diagnostico`). |
| Homepage hosts diagnosis form vs offer-only | Conversion distance | **Deviation D3 (explicit):** homepage 06 is offer-only with one CTA → `/es/diagnostico`. The full experience (form, calendar handoff, WhatsApp, FAQ, outcomes) moves to the rebuilt `/diagnostico` page. `homepage_diagnosis` source and the strict `ContactPayload` union are reused unchanged (no deviation from V2 contact boundary). |
| `(site)` route group vs `[locale]` convention | None for this app | Keep the existing `[locale]` convention (ADR-001). No `(site)` group is introduced; every route, including redirects, stays locale-prefixed so canonical/hreflang and `generateStaticParams` remain uniform. |
| `/casos` vs `/success-cases/[slug]` | URL migration | Per open decision 1 default: `/casos` listing + `/casos/[slug]` details, with a permanent (308) locale-preserving redirect from `/success-cases/[slug]` (per `seo.md` §34 migration rule). Markdown content files stay the canonical detail source (ADR-003); only the URL layer changes. **Pending explicit user confirmation before apply.** |
| EN section routes in Fase 1 vs withheld | Parity vs half-publish | Per open decision 2 default: ES-first. EN routes are not generated, linked, or sitemapped until approved EN content exists; one route registry (`src/content/sections/index.ts`) drives generation, nav, footer, and sitemap so withholding is atomic (locale-parity gate). |
| `/#`-capable `localizedHref` | Legacy helper | Keep the helper (legal pages and legacy paths still use it); the anchor branch is simply no longer used by primary nav. No code churn in `i18n-url.ts` beyond tests. |
| Approach C vs A/B | Highest churn; spec-faithful | Adopt C (full V3 composition) with A's safe reuse list: `utils/diagnosis.ts`, `EvidenceSection`/`AIONProductShowcase`/`CaseEvidence`, publication-gate machinery, `buildPageMetadata`/`localeAlternates`/`trackEvent`/`TrackedLink`. |

**ADR alignment:** ADR-001 (locale-prefixed routes) and ADR-003 (deliberate Markdown, server-loaded) hold unchanged; ADR-002 (Server Components/static rendering default) holds with the same four justified islands (see Component architecture). No new ADR is required; deviations D1–D3 are documented here as the V3 amendment record.

## Route Topology

```text
src/app/[locale]/
  page.tsx                          ← 6-section entry door (V3 composition switch)
  diagnostico/page.tsx              ← rebuilt: offer + context-first form + calendar/WhatsApp + FAQ
  servicios/[slug]/page.tsx         ← 3 services (software-a-medida, sistemas-de-gestion, automatizacion)
  como-trabajamos/page.tsx          ← framework page (Discover→Shape→Build→Launch→Evolve)
  casos/page.tsx                    ← listing (real markdown cases only)
  casos/[slug]/page.tsx             ← detail (reads markdown/success-cases/{es,en}/*.md)
  insights/page.tsx                 ← registered but unpublished until content approved
  nosotros/page.tsx                 ← Why Next Wrld + company
  success-cases/[slug]/page.tsx     ← replaced by 308 redirect → /casos/[slug] (same locale)
```

- **Convention:** every route keeps the `[locale]` prefix (no `(site)` group). Each section page exports `generateStaticParams` derived from the shared registry `publishedRoutes(locale)` — ES returns the 8 published routes once their Fase 1 content lands; EN returns `[]` until EN content is approved. `dynamicParams = false` + `notFound()` guards make an ungenerated locale 404 (e.g. `/en/servicios/software-a-medida` and `/es/insights` until approved). This is the **locale-parity gate**: generation, nav, footer, sitemap, and metadata all derive from one registry, so EN can never half-publish — flipping EN on is a single atomic registry change in Fase 2.
- **`/casos`:** listing renders the markdown-backed case cards whose listing entries are approved; the listing itself is never "empty" because its mandatory narrative (intro, headings, diagnosis CTA) is the content-completeness unit. Detail routes `/casos/[slug]` exist for every markdown slug (redirect targets remain valid).
- **Redirects:** `[locale]/success-cases/[slug]/page.tsx` becomes a thin server component calling `redirect(localizedHref(locale, "/casos/" + slug), "replace")` with `generateStaticParams` for the same slugs; 308 preserves SEO equity per `seo.md` §34. Sitemap emits `/casos/[slug]`, never `/success-cases/[slug]`.
- **`site.ts`/sitemap:** `site.ts` gains a default `SITE_DESCRIPTION` (approved V3 meta description) used as metadata fallback. `sitemap.ts` derives section URLs from the same `publishedRoutes(locale)` registry (no missing/incomplete route appears), keeps `/`, `/diagnostico`, `/contact`, legal pages, drops `/pricing` only if the V3 scope removes it (out of scope — keep it), and replaces the `/success-cases/` loop with `/casos/[slug]` + the registry entries.

## Component Architecture

**Reused inside 05 Trabajo real (unchanged visuals):** `EvidenceSection`, `AIONProductShowcase`, `CaseEvidence` — still gated by the evidence manifest (`approved:false` placeholder until real AION UI/destinations are approved; InmoCRM stays research/MVP).

**Reused at page level:** `utils/diagnosis.ts` state machine (`idle | editing | submitting | contextAccepted | handoffError | submitError`), `/api/contact` strict union, `buildPageMetadata`/`localeAlternates`, `trackEvent`/`TrackedLink`, publication-gate machinery (extended, see below).

**Retired wholesale:** ExperienceHeader scrollspy + `IntersectionObserver` + `handleAnchorClick`, `navAnchorId()`/`navAnchorPath()`, `/#`-destination nav model for primary nav, ChapterDivider-as-nav (and the 5-divider chapter rhythm), homepage Faq, FinalCTA, Differentiation, standalone Impact/BetterWay, `/#diagnosis` header CTA (→ `localizedHref(l, "/diagnostico")`). `buildApprovedNav` is rewritten as `buildApprovedNavV3` emitting route items (Servicios group with 3 children + 4 top-level routes), driven by the registry so unapproved routes never emit.

**New section components (all Server Components):** `ProblemTransformation` (02), `ServicesOverview` (03), `MethodSection` (04), `DiagnosisOffer` (06, offer-only), plus `SectionPageShell` (shared server layout for section routes: hero, narrative blocks, diagnosis CTA) and `CasosListing`/`CasosDetail` (listing + markdown detail renderers). `ExperienceHome` is rewritten to compose exactly the six sections.

**Client island justification (ADR-002 compliance):**

| Island | Why client | Why it stays minimal |
|---|---|---|
| Header mobile menu + submenu disclosure | Disclosure state, focus trap, current-state, dismissal + focus restoration (SHELL-002 keyboard contract) | Server-rendered links; only toggle/aria-expanded state is client |
| `LanguageSelector` | Emits `language_change` with source/target/page context and preserves equivalent page context | Still navigates server-side; tiny stateful surface |
| Diagnosis form (on `/diagnostico`) | Form state machine, field-associated errors, submit/calendar handoff lifecycle | Reuses `utils/diagnosis.ts` unchanged; never renders copy |
| `TrackedLink` | Gates external-activation events (`EXTERNAL_ACTIVATION_EVENTS`) and attaches `cta_location` | Analytics-only wrapper; renders a normal anchor |

Everything else — the six homepage sections, every section page, `/casos` listing/detail, footer, FAQ on `/diagnostico` — is a Server Component. The `/diagnostico` FAQ uses native `<details>/<summary>` (server-rendered, keyboard/AT-operable, no-enhancement fallback by construction), so the V2 client FAQ disclosure island is retired rather than moved.

## Content Model

**`HomepageContent` (6-section shape, `src/content/homepage/{types,es,en,index,manifest,evidence}.ts`):** keys become `seo`, `nav`, `hero`, `problem` (Problema→Transformación), `services` (Qué resolvemos), `method` (Cómo trabajamos), `evidence` (Trabajo real), `diagnosis` (offer-only: duration/cost/focus/next-step + CTA). Removed: `impact`, `betterWay`, `capabilities`, `differentiation`, `faq`, `finalCta`. `NavItem` gains route semantics: `{ id, label, destination: string | null, approved }` where `destination` is a locale-relative path (`/servicios/software-a-medida`, `/como-trabajamos`, `/casos`, `/insights`, `/nosotros`, `/diagnostico`); Servicios is modeled as a `NavItemGroup { id, label, children: NavItem[] }` (the existing `Menu` type already supports submenu).

**New `src/content/sections/` per-route content domain (typed contract):**

| File | Contents |
|---|---|
| `types.ts` | `SectionRoute` union (8 routes), `SectionContent` = `{ route, seo: SeoCopy, heading, intro, sections: SectionBlock[], approved: boolean }`, `CasosListingContent` (intro + `{ slug, approved }[]`), registry types |
| `index.ts` | `publishedRoutes(locale): SectionRoute[]`, `getSectionContent(route, locale)` (throws/`notFound` on unapproved), `validateSectionContent()` (per-route completeness: non-empty seo/heading/intro + no empty destination) |
| `es.ts` | ES content for services ×3, como-trabajamos, casos listing, insights (draft entry `approved:false`), nosotros |
| `en.ts` | Empty/withheld until approved (Fase 2); registry emits no EN routes meanwhile |
| `parity.ts` (or folded into `index.ts`) | ES/EN parity validator for section content where both locales are published |

`/casos/[slug]` content stays in `markdown/success-cases/{es,en}/*.md` (ADR-003), untouched; the typed domain only covers the listing metadata. EN withholding: `en.ts` holds `approved:false` entries, so `publishedRoutes("en")` returns `[]` — no EN nav, footer, sitemap, or generated route until Fase 2 approval flips the registry.

**Parity validator changes (`validateContentParity`):** (1) 6-section invariant — exactly the mandated sections in both locales, equivalent meaning; (2) no `/#` destinations anywhere in nav/footer/CTA; (3) no empty destinations — every approved destination resolves through the route registry to a content-complete route in that locale; (4) section-content parity for published locales. Draft validation now runs the V3 invariants so the complete V3 skeleton can be admitted as the draft composition (see gate).

## Publication Gate Extension

`src/content/homepage/publication.ts` and `scripts/validate-experience-build.ts` keep their wiring (`pnpm validate:experience-build && next build`; `vercel.json` buildCommand `pnpm build`). Additions:

- **Route-existence validator:** every destination in `HomepageContent.nav`, footer columns, and CTA map must exist in `publishedRoutes(locale)`. Unknown, unregistered, or `/#` destinations fail.
- **Content-completeness validator:** each referenced destination must have approved, non-empty `SectionContent` in that locale (and, for `/casos/[slug]`, a markdown file). `/es/insights` fails this while `approved:false` → release fails and no link appears anywhere.
- **Admission contract becomes a discriminated union:** `admitPublication(status)` returns `{ composition: "foundation" }` (draft while the V3 skeleton is incomplete), `{ composition: "v3-skeleton", content }` (draft/preview once V3 parity + route validation pass — the Fase 1 complete skeleton), or `{ composition: "v3-release", content }` (release + all approval keys + evidence + metadata + no-empty-content validators). `page.tsx` switches on composition; `validate-experience-build.ts` exercises all three and exits nonzero on any failure.
- **Complete composition invariant:** every commit serves Foundation **or** a complete V3 skeleton; a partial 6-section homepage can never go public because the skeleton composition only admits when every linked route is registered and content-complete (provisional-but-real copy in Fase 1).
- **Draft-vs-release:** draft/preview never run evidence/metadata/approval validators (only parity + route completeness), so Fase 1–2 stay deployable with evidence placeholder; release additionally requires approvals, evidence admission (real AION UI + JFHP/InmoCRM destinations), valid canonical/hreflang, and the no-empty-content rule — unchanged in spirit from V2, extended with the route checks.

## SEO / Analytics Design

- **Per-route metadata:** every section page calls the existing `buildPageMetadata({ locale, path, title, description, image })` with its `SectionContent.seo`; `localeAlternates` provides reciprocal hreflang; self-canonical via `siteUrl(localePath(locale, path))`. EN alternates are emitted only for EN-published routes (registry-driven).
- **Homepage:** title "Software a medida para empresas | Next Wrld", approved V3 meta description (also `SITE_DESCRIPTION` fallback), Organization JSON-LD only — **no FAQ schema on the homepage** (spec); `homepageSchema` drops the FAQ entity and the retired sections.
- **Section schema:** `seo.ts` gains `sectionPageSchema(route, content)` emitting only entities supported by visible approved content (Organization + BreadcrumbList; a service entry only where the service page's own approved copy supports it). `/diagnostico` FAQ schema emits only approved entries (ownership entry absent until legal wording approved — existing gate reused).
- **Sitemap:** registry-driven section URLs, `/casos/[slug]` (not `/success-cases/*`), no unpublished routes (e.g. no `/es/insights` while pending).
- **Event vocabulary (V3, `analytics.ts`):** `EVENT_NAMES` drop `service_view`, `case_view`, `insight_view`; add `service_click`, `method_click`, `case_click`; keep `diagnosis_cta_click`, `whatsapp_click`, `calendar_click`, `contact_form_start/submit/success/error`, `language_change`. `DIAGNOSIS_CTA_LOCATIONS = ["header", "hero", "diagnosis_section"]` (drop `final`). All events carry `locale`; `service_click`/`method_click`/`case_click` carry the approved item id + source location; entered form values are excluded.

| TrackedLink usage | Event | Context |
|---|---|---|
| Header CTA → `/diagnostico` | `diagnosis_cta_click` | `cta_location: "header"` |
| Hero primary CTA → `/diagnostico` | `diagnosis_cta_click` | `cta_location: "hero"` |
| 06 offer CTA → `/diagnostico` | `diagnosis_cta_click` | `cta_location: "diagnosis_section"` |
| Service cards/submenu items | `service_click` | item id + location |
| Method stage links (04 + `/como-trabajamos`) | `method_click` | stage id |
| Case cards (05 + `/casos`) | `case_click` | case slug |
| WhatsApp action (`/diagnostico`) | `whatsapp_click` | — |
| Calendar handoff (`/diagnostico`) | `calendar_click` | — |
| Locale switch | `language_change` | source, target, page |

## Testing Strategy (strict TDD)

**Deleted (fully encode the anchor architecture):** `tests/section-pages.test.ts` (SECTION-PAGE-001/002), `tests/section-routes.test.ts` (SECTION-PAGE-003/004), and the anchor/divider/scrollspy assertions in `tests/e2e/homepage-experience-preview.spec.ts` (nav hrefs `/#…`, `#evidence`/`#diagnosis` ids, sub-page 404, scrollspy active class, 5 `.chapter-divider`, numbered eyebrows). `tests/seo.test.ts` "no section sub-page URLs" assertions are inverted.

**Reworked:** `chapter-differentiation.test.ts` → CHAPTER-001 V3: six-section rhythm, no `.chapter-divider`, numbered eyebrows `01–06`, no `IntersectionObserver` in header; `experience-design.test.ts` → DESIGN-001/004 over the six sections (drop impact/betterWay/finalCta component checks, keep contrast/AA + reduced motion); `homepage-contracts.test.ts` → OBSERVABILITY-001 asserts `DIAGNOSIS_CTA_LOCATIONS = [header, hero, diagnosis_section]` and the V3 event names; `admission.test.ts` → ADMISSION-NAV route-based (approved nav destinations are real registered routes; unregistered/`/#` fails), new ADMISSION-ROUTES (route-existence + content-completeness blocks release while `/es/insights` pending); `observability.test.ts` → V3 events, no `final` location, no homepage FAQ schema, no empty-destination events; `homepage-release.spec.ts` "no speculative links" → route-based no-empty-content checks; `evidence.test.ts` → unchanged (placeholder gate) + `/casos` listing completeness unit; `diagnosis.test.ts` → DIAGNOSIS-09 splits: homepage 06 offer-only (no form/calendar/WhatsApp/FAQ on homepage) + `/diagnostico` page completeness; `homepage-problem.test.ts` → Problema→Transformación pair; `homepage-method.test.ts` → 04 one-line five stages; `homepage-shell/content/evidence/diagnosis/observability` e2e specs → V3 heading copy; `localization.test.ts` legacy-redirect matrix gains `/success-cases/{slug} → /casos/{slug}`.

**New RED tests per route group:**

| Group | New tests (RED first) |
|---|---|
| Route contracts/registry | `section-routes-v3.test.ts`: every published route registered, ES nav/footer/CTA destinations resolve to real routes, no `/#`, no empty destinations, EN registry empty until approved, sitemap includes published routes and excludes `/es/insights` |
| servicios ×3 | per-service render (initial HTML H1 + narrative), ES/EN parity (once EN approved), metadata/canonical/hreflang, service schema, a11y heading order |
| institucional (nosotros, como-trabajamos) | render + parity + a11y + metadata; method stages present one line per stage |
| casos/insights | listing renders approved cases; `/casos/[slug]` renders markdown; `/success-cases/[slug]` 308s to `/casos/[slug]` preserving locale; insights unlinked + 404 + absent from sitemap; `case_click` wiring |
| diagnostico | rebuilt page completeness (explanation, audience, analyzed areas, duration, free, 3–5 page deliverable, form, calendar, WhatsApp, FAQ); homepage 06 offer-only; dependencies unapproved → no scheduling claim, no booking-success state |
| V3 skeleton/admission | draft gate serves Foundation until skeleton complete, then the complete V3 skeleton; release fails on any empty destination; every intermediate commit is a complete composition |

**e2e per slice:** `tests/e2e/homepage-v3.spec.ts` (exactly 6 sections, one primary conversion → `/es/diagnostico`, no anchors, no retired blocks, mobile stack, reduced motion, enhancement-failure fallback), `tests/e2e/section-routes.spec.ts` (all published ES routes render server-first, nav resolves, no 404s), `tests/e2e/casos-migration.spec.ts` (listing + detail + legacy redirect), `tests/e2e/diagnostico-page.spec.ts` (full experience + failure/recovery + WhatsApp + FAQ fallback), plus the reworked `homepage-experience-preview.spec.ts` (V3 assertions only).

## Slice Plan (three mandated phases → auto-chain slices, 800-line budget)

| Phase | Slice | Work + per-slice RED tests | Rollback |
|---|---|---|---|
| Fase 1 — esqueleto | **V3-01 contracts, registry, gate** | HomepageContent 6-section reshape (types/es/en/index); `src/content/sections/` types + registry skeleton; route-existence + no-empty-content validators; `buildApprovedNavV3`; retire `section-pages`/`section-routes` unit tests → `section-routes-v3.test.ts` RED; parity 6-section invariant RED | → `experience-2-homepage-08-admission` |
| Fase 1 | **V3-02 servicios ×3** | Routes + `SectionContent` (software-a-medida, sistemas-de-gestion, automatizacion) + `SectionPageShell`; per-service render/parity/metadata RED tests; sitemap entries; draft gate still Foundation (skeleton incomplete) | → V3-01 |
| Fase 1 | **V3-03 institucional (nosotros + como-trabajamos)** | Routes + content (Why Next Wrld from V2 differentiation; framework from V2 method); render/parity/a11y RED tests | → V3-02 |
| Fase 1 | **V3-04 casos + insights** | `/casos` listing + `/casos/[slug]` + `/success-cases/[slug]` 308 redirect; listing completeness RED; insights route file registered but unpublished (unlinked, 404, absent from sitemap) RED | → V3-03 |
| Fase 1 | **V3-05 diagnostico + homepage 06 + V3 skeleton** | Rebuilt `/diagnostico` (form moved, calendar/WhatsApp/FAQ gated); homepage 06 offer-only; `ExperienceHome` 6-section composition; anchor-test retirement + `homepage-v3.spec.ts` RED; gate admits the complete V3 skeleton (draft composition flips from Foundation) | → V3-04 |
| Fase 2 — copy | **V3-06 final ES copy + i18n** | Final ES copy per section/route; `src/i18n/{es,en}.ts` menu/footer vocabulary; copy parity tests; no unverifiable claims | → V3-05 |
| Fase 2 | **V3-07 EN approval + registry flip** | Approved EN content; `publishedRoutes("en")` flips atomically; EN render/parity/metadata RED tests; locale-parity gate proof | → V3-06 |
| Fase 3 — final | **V3-08 events + per-route SEO/sitemap/schema** | `analytics.ts` V3 vocabulary (`service_click`/`method_click`/`case_click`, drop `final`); per-route metadata + `sectionPageSchema`; registry-driven sitemap; observability RED tests | → V3-07 |
| Fase 3 | **V3-09 e2e/observability/a11y/performance** | Rewritten `homepage-experience-preview.spec.ts`; section-route + casos-migration + diagnostico-page e2e; a11y/motion/contrast pass | → V3-08 |
| Fase 3 | **V3-10 evidence admission + release flip** | Real AION UI/JFHP/InmoCRM destinations approved; evidence manifest populated; `EXPERIENCE_PUBLICATION_STATUS=release`; release-gate e2e (blocked→flip); tracker moves out of draft | → V3-09 |

Each slice owns RED → GREEN → composition proof → rollback; every intermediate commit is a complete, deployable composition. Fase gates: structure approval after V3-05, copy approval after V3-07, QA + release admission after V3-10. Tracker stays draft/no-merge until the Fase 3 gate passes.

## Data Flow (V3)

```text
pnpm build / Vercel → admitPublication(status)
  draft (skeleton incomplete) → Foundation
  draft/preview (V3 parity + route-completeness pass) → complete V3 skeleton (6 sections, all links real)
  release (approvals + evidence + metadata + no-empty-content) → V3 release → approved HTML/schema/events

nav/footer/homepage destinations → publishedRoutes(locale) registry → real content-complete routes (never empty)
/success-cases/{slug} → 308 → /casos/{slug}
/es/diagnostico → utils/diagnosis.ts + /api/contact (homepage_diagnosis union) → contextAccepted → calendar handoff (gated)
homepage 06 → offer only → CTA diagnosis_cta_click(header|hero|diagnosis_section) → /es/diagnostico
```

## File Changes (V3, delta on top of V2)

| File | Action | Description |
|---|---|---|
| `src/app/[locale]/page.tsx` | Modify | 3-way composition switch (foundation / v3-skeleton / v3-release); homepage metadata/schema |
| `src/app/[locale]/diagnostico/page.tsx` | Modify | Rebuilt full diagnosis experience (form + calendar/WhatsApp/FAQ, gated) |
| `src/app/[locale]/servicios/[slug]/page.tsx`, `como-trabajamos/page.tsx`, `casos/page.tsx`, `casos/[slug]/page.tsx`, `insights/page.tsx`, `nosotros/page.tsx` | New | Section sub-pages; registry-driven `generateStaticParams`; per-route metadata |
| `src/app/[locale]/success-cases/[slug]/page.tsx` | Modify | 308 redirect → `/casos/[slug]` |
| `src/app/sitemap.ts`, `src/app/site.ts` | Modify | Registry-driven section URLs; `SITE_DESCRIPTION` |
| `src/utils/seo.ts` | Modify | `sectionPageSchema`; homepage schema drops FAQ/retired sections |
| `src/utils/analytics.ts` | Modify | V3 event vocabulary; `DIAGNOSIS_CTA_LOCATIONS` minus `final` |
| `src/components/HomeExperience/**` | Modify/New | 6-section `ExperienceHome`; `ProblemTransformation`, `ServicesOverview`, `MethodSection`, `DiagnosisOffer`; retire scrollspy/anchor/ChapterDivider/Faq/FinalCTA/Differentiation/Impact/BetterWay |
| `src/components/Header/menuData.tsx`, `Header/index.tsx`, `Footer/` | Modify | Route-based nav (Servicios submenu + 4 routes), registry-gated links, header CTA → `/diagnostico` |
| `src/i18n/{es,en}.ts` | Modify | V3 menu/footer vocabulary |
| `src/content/homepage/{types,es,en,index,publication,manifest,evidence}.ts` | Modify | 6-section model; route nav; parity + route/content-completeness validators; discriminated admission |
| `src/content/sections/` | New | Per-route typed content domain + registry + parity |
| `scripts/validate-experience-build.ts` | Modify | Exercises foundation/skeleton/release compositions; route validators |
| `tests/` | Modified/Deleted | See Testing Strategy |
| `markdown/success-cases/`, `public/images/experience/` | Unchanged/Blocked | InmoCRM MVP-safe copy complies; AION/JFHP placeholder until approval |

## Migration / Rollout (V3)

Land Fases 1–2 in draft; every commit is Foundation or a complete V3 skeleton. Fase 3 flips release only after approvals (real AION UI/destinations, diagnosis dependencies) and the evidence manifest are populated. Rollback is composition-graded: Fase 3 → 2 → 1 skeleton → V2 one-page → Foundation, because the gate re-admits status at every build path. Preserve locale routes, Foundation, SEO helpers, and the `/api/contact` boundary throughout. `/success-cases/*` redirects are additive; old slugs keep resolving. No data migration (the rebuilt `/diagnostico` replaces the legacy message form only when release admission passes).

## Threat Matrix (V3)

Unchanged from V2: no new execution, Git, commit, push, or PR boundaries are introduced by route/content changes; Markdown remains parsed content (ADR-003). New risk surface is limited to the route registry and redirect layer (static params, `notFound`, 308s) and is covered by the route-group RED tests and e2e specs.

## Open Questions / Blockers (V3)

- [ ] Open decision 1: `/casos` URL migration default (listing + detail + redirects) — needs explicit user confirmation before Fase 1 apply.
- [ ] Open decision 2: ES-first EN withholding (default) — confirm.
- [ ] Open decision 3: `/es/insights` withheld (default) vs interim listing — confirm.
- [ ] Open decision 4: capability naming — `homepage-experience` kept + `section-pages-v3` added (default); trivial rename later.
- [ ] Blocked: real AION UI + destination URLs, JFHP/InmoCRM destinations (homepage 05 evidence; `/casos` listing runs on approved entries).
- [ ] Blocked: diagnosis provider, calendar handoff, privacy treatment, ownership (scheduling UI on `/diagnostico`).
- [ ] Blocked: FAQ ownership legal wording (ownership FAQ entry stays absent from `/diagnostico`).
