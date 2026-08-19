## Exploration: experience-2-homepage

### Current State
The homepage is a server-rendered, locale-prefixed composition in `src/app/[locale]/page.tsx`, but it remains the Foundation-era Tailgrids landing: Hero, Features, About, Pricing, FAQ, three generic case cards, and Contact. Static page copy is loaded from typed ES/EN dictionaries; case content is local Markdown; metadata, canonical URLs, reciprocal hreflang, OG/Twitter, Organization JSON-LD, GTM bootstrap, and a small event helper already exist.

The authoritative specification requires a substantially different narrative and component model: problem recognition through operational diagnosis, an editorial light/dark chapter rhythm, real-product evidence, and all critical commercial content in initial HTML. Existing client boundaries are concentrated in the header/menu/theme/language controls, FAQ disclosure, contact form, and diagnosis hero. That is compatible with Foundation ADRs, but the new storytelling motion must remain optional and reduced-motion safe.

### Affected Areas
- `src/app/[locale]/page.tsx` — replace the Foundation section composition with the specified homepage narrative while retaining server-first assembly.
- `src/i18n/es.ts`, `src/i18n/en.ts`, `src/i18n/dictionaries.ts` — replace/extend the current homepage dictionary with an identical typed ES/EN Experience 2.0 shape.
- `src/components/Header/index.tsx`, `src/components/Header/menuData.tsx`, `src/components/Footer/index.tsx` — align navigation, mobile menu, diagnosis CTA, and footer information architecture with the specification.
- `src/components/Hero/index.tsx`, `src/components/Features/`, `src/components/About/`, `src/components/Pricing/`, `src/components/Faq/` — retire or reshape Foundation presentation components; their current copy and visual grammar do not meet the target.
- `src/components/Diagnostico/`, `src/components/Contact/`, `src/constants/links.ts` — evolve the direct external-calendar/generic-contact flow into the specified context-first diagnosis flow; preserve the hardened `/api/contact` boundary unless an approved integration requires a new endpoint.
- `src/components/SuccessCases/`, `markdown/success-cases/**`, `public/images/**` — source AION/JFHP/InmoCRM/automation evidence and imagery; current case slugs/content/assets are Gym Access OS, InmoCRM, and AI Sales Engine and do not provide the required AION showcase.
- `src/components/GoogleTagManager.tsx`, `src/utils/analytics.ts`, `src/components/Common/TrackedLink.tsx` — complete required event names and attach location-aware CTA, WhatsApp, service, case, and insight tracking.
- `src/app/[locale]/page.tsx`, `src/app/site.ts`, `src/utils/seo.ts` — update homepage title/description and add homepage-specific pertinent structured data without regressing existing canonical/hreflang/OG/Twitter behavior.
- `src/styles/index.css` — establish Experience 2.0 tokens, chapter backgrounds, responsive typography/layout, and reduced-motion rules; the current theme is broad Tailgrids compatibility CSS rather than a homepage design system.
- `tests/seo.test.ts`, `tests/localization.test.ts`, `tests/e2e/locale-navigation.spec.ts`, new focused tests — protect dictionary parity, server HTML/heading structure, metadata/schema, event contracts, responsive interaction, and reduced-motion behavior under strict TDD.

### Approaches
1. **Dedicated Experience 2.0 homepage composition** — Build section-specific server components from a typed homepage-content model, retaining only small interactive islands (header, FAQ, motion controller, form).
   - Pros: Matches the specified non-generic visual/narrative structure; preserves static SEO HTML; isolates each section for review and testing.
   - Cons: Replaces much of the Foundation landing presentation and needs a deliberate compatibility/retirement plan for old components.
   - Effort: High.

2. **Incrementally repurpose existing Tailgrids sections** — Rename and restyle Hero/Features/About/Pricing/FAQ/cases until they contain the new copy.
   - Pros: Smaller initial diff and less file creation.
   - Cons: The current abstractions enforce generic cards/grids, obscure the narrative, complicate AION and process visuals, and increase coupling to obsolete terminology.
   - Effort: Medium initially, High overall.

### Recommendation
Use a dedicated Experience 2.0 composition (Approach 1). Keep `page.tsx` as the server orchestration point, place all approved localized content in one typed homepage dictionary domain, and create intentionally section-specific presentational components instead of a universal card system. Preserve Foundation invariants: `/es` and `/en` remain canonical static routes; all commercial copy is server-rendered; client JavaScript is limited to interaction/motion; existing SEO helpers and contact validation are reused where applicable.

Implement as auto-chained, independently reviewable work units below the 800-line session budget where practical:

1. **Content contract, global shell, and SEO/tracking contract** — typed ES/EN homepage content, header/footer/menu/CTA vocabulary, metadata/schema, event vocabulary, and tests. Target <800 authored lines; establishes links and contracts before visual sections.
2. **Narrative foundation** — hero/system visual (static-first), problem recognition, operational cost/better-way, shared tokens, responsive and reduced-motion baseline. Target <800 lines; no unavailable case assets.
3. **Solution and method** — capabilities, AI treatment, Discover→Shape→Build→Launch→Evolve timeline, and focused motion island/tests. Target <800 lines.
4. **Evidence and differentiation** — AION showcase plus supporting cases, Why Next Wrld, optional compact Own Products, contingent on approved real assets and destination URLs. Target <800 lines; keep case-content migration separate if it becomes substantial.
5. **Diagnosis conversion and completion** — context-first diagnosis form/calendar handoff, WhatsApp CTA, FAQ, final CTA, conversion/e2e/accessibility verification. Target <800 lines; publication depends on calendar/form ownership decisions.

### Risks
- **Publication blocker:** the specified FAQ ownership answer cannot be published as an absolute claim until the client-ownership contractual policy is confirmed; the source explicitly requires legal formalization.
- **Publication blocker:** the required diagnosis sequence is context fields (Name, Company, Email, operational area) before time selection, but the current primary route opens a direct external Google Calendar URL. The calendar provider/embed/redirect mechanism and data handoff/privacy treatment are not evidenced in the repository.
- **Unavailable evidence/assets:** no AION product screenshots/mockups or AION destination URL are present; no JFHP source/content or route is present; existing images are generic/template/blog assets. Real approved AION/JFHP/automation assets and destination URLs are required before the evidence slice can be accepted.
- **Information architecture dependency:** the specified Services, How we work, Cases, Insights, and About links do not currently have dedicated routes; current navigation only targets homepage anchors. Confirm whether the first release uses anchors, approved destination routes, or intentionally unavailable links before publication.
- **Content evidence risk:** current InmoCRM Markdown describes a scalable platform and existing Gym Access OS/AI Sales Engine labels do not map cleanly to the specified AION/JFHP/automation evidence. Case copy must be editorially validated to avoid implying production results or invented metrics.
- **Tracking gap:** current analytics supports diagnosis, calendar, contact, case, and language events only; it lacks the specified WhatsApp, service, and insight names, and current homepage CTAs are not consistently tracked with locations.
- **Visual/motion risk:** current Tailgrids styling and large legacy SVG-heavy sections are not a reusable design-token system. New motion must honor `prefers-reduced-motion`, never hide HTML content, and avoid turning sections into client-rendered content.

### Ready for Proposal
Yes — product decisions are already authoritative. The proposal should treat the five items above as implementation dependencies/publication blockers, not reopen copy, layout, conversion, SEO, or motion choices. It should explicitly gate the evidence slice on approved real assets/URLs and the diagnosis/ownership answers, while allowing the server-first shell and narrative sections to proceed independently.
