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
- [ ] 1.1 RED: parity, IDs, approvals/destinations, evidence, missing meaning; 1.2 GREEN: implement contracts/preflight in both ES and EN, `tsx` scripts, lockfile if changed; fail-closed release/Foundation draft.
- [ ] 2.1 RED: locale, focus, zoom, contrast, non-color cues; 2.2 GREEN: ES/EN Header/Footer/layout/CSS composed.
- [ ] 3.1 RED: ES/EN H1, friction/impact/order, scripts-off/reduced-motion; 3.2 GREEN: ES/EN problem content composed.
- [ ] 4.1 RED: services, useful-AI boundary, five-stage outcomes; 4.2 GREEN: ES/EN method composed.
- [ ] 5.1 RED: approved AION/JFHP/automation/InmoCRM-MVP evidence and CRM withholding; 5.2 GREEN: ES/EN safe evidence composed.
- [ ] 6.1 RED: offer duration/cost/focus/non-obligation/conditional deliverables; field errors; contact/calendar/external recovery, WhatsApp, confirmed booking, privacy/legal blockers, FAQ assistive-tech/no-enhancement. 6.2 GREEN: ES/EN diagnosis/FAQ/CTA and strict union.
- [ ] 7.1 RED: privacy events, consent/analytics failure, withheld schema/events, invalid canonical/hreflang, intentional external activation, language-switch context. 7.2 GREEN: ES/EN metadata/schema/observability.
- [ ] 8.1 RED: navigation/evidence/diagnosis/FAQ/build blockers and ordinary/Vercel/direct builds. 8.2 GREEN/REFACTOR: ES/EN `src/app/[locale]/page.tsx`; complete Experience only, else Foundation/withholding.
