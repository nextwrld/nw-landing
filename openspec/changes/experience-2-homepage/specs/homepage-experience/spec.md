# Homepage Experience Specification

## Purpose

Define the V3 homepage as the entry door to the Next Wrld ecosystem: Header/Footer plus exactly 6 content sections, one primary conversion, and route-based navigation. This spec is the V3 revision of the capability and supersedes the V2 one-page mega-landing model (13-key content contract, anchor navigation, homepage FAQ/FinalCTA/Differentiation/Impact/BetterWay) within this change.

> **Assumption (pending user confirmation before apply):** per open decision 4, the capability keeps the existing name `homepage-experience` (absorbed into the V3 model); the `homepage-v3` rename is not applied.

## Requirements

### Requirement: Localized entry-door document

The `/es` and `/en` homepages MUST expose equivalent meaning, sections, actions, and headings in initial HTML. Each MUST have one immediately visible H1 expressing the entry-door promise per approved V3 copy; critical copy MUST NOT depend on client execution or animation.

#### Scenario: Initial HTML parity

- GIVEN either locale URL with scripts disabled
- WHEN the initial document is inspected
- THEN it contains one H1 plus localized mandatory narrative and actions
- AND every item and action has a semantic counterpart in the other locale

#### Scenario: Unsupported locale content

- GIVEN a required translation is absent
- WHEN publication is evaluated
- THEN that locale MUST fail publication rather than mix languages or omit mandatory content

### Requirement: Six-section entry-door composition

The homepage MUST compose Header/Footer plus exactly the sections 01 Hero, 02 Problema→Transformación, 03 Qué resolvemos, 04 Cómo trabajamos (Discover → Shape → Build → Launch → Evolve, one line per stage), 05 Trabajo real (AION dominant; JFHP and InmoCRM secondary; InmoCRM as research/MVP only), and 06 Diagnóstico (offer only, CTA → `/es/diagnostico`). The homepage MUST NOT include the retired V2 blocks (Faq, FinalCTA, Differentiation, Impact, BetterWay), anchor wrappers, chapter-divider navigation, scrollspy, or `/#` destinations.

#### Scenario: Exact section set

- GIVEN a visitor opens the homepage
- WHEN the section structure is inspected
- THEN it contains Header/Footer and exactly the six numbered sections 01–06 in the mandated order
- AND no retired block, anchor destination, or chapter-divider navigation is present

#### Scenario: Evidence hierarchy in section 05

- GIVEN section 05 Trabajo real is rendered
- WHEN evidence is presented
- THEN AION is dominant, JFHP and InmoCRM are secondary, and InmoCRM is labeled as research/MVP only

#### Scenario: No anchor destinations

- GIVEN the homepage navigation or content
- WHEN any destination is inspected
- THEN it resolves to a real route and never to a `/#` anchor

### Requirement: Single primary conversion

The homepage MUST expose exactly one primary conversion, "Analizar mi operación", converging on `/es/diagnostico`. Section 06 MUST present the diagnosis offer only and MUST NOT host the form, calendar, WhatsApp path, or FAQ (those live on the rebuilt `/es/diagnostico` page). Every CTA MUST resolve to a real, content-complete route; the homepage MUST never link to an empty destination.

#### Scenario: Conversion convergence

- GIVEN a visitor activates the primary conversion
- WHEN the destination is resolved
- THEN it reaches `/es/diagnostico` and no other conversion competes for primacy

#### Scenario: Offer-only section 06

- GIVEN a visitor reviews homepage section 06
- WHEN they inspect it
- THEN it states the offer and its next step and links to `/es/diagnostico` without hosting any form, calendar, WhatsApp, or FAQ element

#### Scenario: Empty destination prevention

- GIVEN a destination lacks a route or approved content (including `/es/insights` before approval)
- WHEN the homepage is generated
- THEN no link to that destination appears and release fails rather than publish a speculative link

### Requirement: Route-based navigation and conversion hierarchy

Header and footer MUST provide localized access to the section sub-pages (Servicios submenu of 3 plus como-trabajamos, casos, insights, nosotros), locale switching, the diagnosis CTA, and approved contact/social/legal destinations. Primary paths MUST converge on diagnosis; secondary paths MAY expose cases or WhatsApp. Destinations MUST be real routes, preserve locale, and MUST NOT be speculative.

#### Scenario: Keyboard navigation

- GIVEN a keyboard user opens desktop or mobile navigation
- WHEN they traverse, activate, and close it
- THEN focus order, labels, current state, dismissal, destination, and focus restoration are perceivable and operable

#### Scenario: Destination unavailable

- GIVEN a required destination lacks approval or content (including `/es/insights`)
- WHEN publication is evaluated
- THEN its link MUST remain unpublished and any resulting mandatory-navigation gap MUST block release

### Requirement: Evidence integrity and publication gating

Section 05 Trabajo real MUST use approved assets, destinations, and claims only. AION MUST be dominant and describe only verified capabilities backed by real product UI; InmoCRM MUST be identified as research/MVP, not production. Unsupported metrics, outcomes, placeholders, or claims MUST NOT publish.

#### Scenario: Missing evidence approval

- GIVEN an asset, claim, or destination is unavailable or unverified
- WHEN a release is prepared
- THEN the affected evidence/action MUST be withheld and the release MUST fail if required real-evidence meaning is no longer present

#### Scenario: InmoCRM research/MVP labeling

- GIVEN InmoCRM is presented in section 05
- WHEN its claim is inspected
- THEN it is framed as research/MVP and never as a production result

### Requirement: Responsive, accessible, motion-safe experience

Content MUST remain complete and ordered at all viewports. Mobile MUST stack the six sections, use a vertical method, place visuals after text when needed, and require neither hover nor carousel. The page MUST support zoom, keyboard use, visible focus, semantics, accessible names, contrast, and non-color cues. Motion MUST NOT gate content, hijack scrolling, or obscure the H1; reduced motion MUST remove nonessential movement without losing meaning.

#### Scenario: Mobile and reduced motion

- GIVEN a narrow viewport with reduced motion enabled
- WHEN the visitor reads and operates the page
- THEN all narrative, evidence, navigation, and CTAs remain readable and usable without hover, horizontal content loss, autoplay dependency, or motion delay

### Requirement: Enhancement failure safety

If client enhancement fails, the system MUST retain readable content and functional available links; failures MUST NOT expose misleading success states.

#### Scenario: Client enhancement unavailable

- GIVEN initial HTML loads but client enhancement fails
- WHEN the visitor uses the homepage
- THEN mandatory narrative remains readable and available links remain actionable
