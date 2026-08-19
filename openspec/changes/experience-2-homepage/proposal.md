# Proposal: Experience 2.0 Homepage

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
