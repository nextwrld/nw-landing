# Homepage Experience Specification

## Purpose

Define the bilingual journey from operational friction to diagnosis.

## Requirements

### Requirement: Localized initial document

The `/es` and `/en` homepages MUST expose equivalent meaning, sections, actions, evidence qualifications, and headings in initial HTML. Each MUST have one immediately visible H1 equivalent to “Tu empresa no debería crecer multiplicando trabajo manual”; critical copy MUST NOT depend on client execution or animation.

#### Scenario: Initial HTML parity
- GIVEN either locale URL with scripts disabled
- WHEN the initial document is inspected
- THEN it contains one H1 plus localized mandatory narrative and actions
- AND every item and action has a semantic counterpart in the other locale

#### Scenario: Unsupported locale content
- GIVEN a required translation is absent
- WHEN publication is evaluated
- THEN that locale MUST fail publication rather than mix languages or omit mandatory content

### Requirement: Mandatory narrative and content contract

The page MUST preserve: growth trigger; manual/dispersed/disconnected problems; cost and transformation; custom software, management systems, and automation/integrations, with AI only where useful; Discover → Shape → Build → Launch → Evolve with outcomes; verified evidence; differentiation; diagnosis; FAQ; final diagnosis CTA. It MUST put operations before technology, use approved CTA vocabulary, and avoid buzzwords and absolute claims. It MAY condense adjacent chapters without losing meaning.

#### Scenario: First-time visitor comprehension
- GIVEN a visitor reads the page in order
- WHEN they reach the final CTA
- THEN it identifies the offer, problem, audience, five-stage method, real evidence, and diagnosis as the next step

### Requirement: Evidence integrity and publication gating

Evidence MUST use approved assets, destinations, and claims only. AION MUST describe only verified capabilities; InmoCRM MUST be identified as an MVP, not production. Unsupported metrics, outcomes, placeholders, or claims MUST NOT publish.

#### Scenario: Missing evidence approval
- GIVEN an asset, claim, or destination is unavailable or unverified
- WHEN a release is prepared
- THEN the affected evidence/action MUST be withheld and the release MUST fail if required real-evidence meaning is no longer present

### Requirement: Navigation and conversion hierarchy

Header and footer MUST provide localized access to Services, Method, Cases, Insights, About, locale switching, diagnosis, contact, social, and legal destinations where approved. Primary paths MUST converge on diagnosis; secondary paths MAY expose cases or WhatsApp. Links MUST use approved destinations, preserve locale, and MUST NOT be speculative.

#### Scenario: Keyboard navigation
- GIVEN a keyboard user opens desktop or mobile navigation
- WHEN they traverse, activate, and close it
- THEN focus order, labels, current state, dismissal, destination, and focus restoration are perceivable and operable

#### Scenario: Destination unavailable
- GIVEN a required destination lacks approval
- WHEN publication is evaluated
- THEN its link MUST remain unpublished and any resulting mandatory-navigation gap MUST block release

### Requirement: Responsive, accessible, motion-safe experience

Content MUST remain complete and ordered at all viewports. Mobile MUST stack cases/capabilities, use a vertical method, place visuals after text when needed, and require neither hover nor carousel. The page MUST support zoom, keyboard use, visible focus, semantics, accessible names, contrast, and non-color cues. Motion MUST NOT gate content, hijack scrolling, or obscure the H1; reduced motion MUST remove nonessential movement without losing meaning.

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
