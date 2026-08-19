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
