# Commercial Observability Specification

## Purpose

Define bilingual discoverability and privacy-safe measurement for the V3 homepage and section sub-pages, using the V3 event vocabulary and per-route metadata, with the "never link to empty content" rule as part of the publication gate.

## Requirements

### Requirement: Locale SEO and initial commercial HTML

The homepage and every published section route MUST provide a localized title, approved description, canonical, reciprocal hreflang, Open Graph, and Twitter metadata. The homepage title MUST be equivalent to "Software a medida para empresas | Next Wrld" with the approved V3 meta description. URLs MUST resolve to the matching public locale. Initial HTML MUST contain the H1 and the route's mandatory commercial content (including the six homepage sections or the section page's narrative) without client rendering.

#### Scenario: Locale metadata parity

- GIVEN `/es`, `/en`, and the section routes are indexable
- WHEN metadata and initial HTML are inspected
- THEN each has localized title/description, self-canonical, reciprocal alternates, share metadata, and equivalent critical commercial content

#### Scenario: Invalid locale URL

- GIVEN a canonical or alternate points to a non-public, mismatched, or failing URL
- WHEN publication is evaluated
- THEN the affected route MUST fail publication

### Requirement: Truthful structured data

Schema MUST be supported by visible approved content and identify the organization/site as applicable. It MAY include only FAQ answers published in that locale (the homepage publishes no FAQ and MUST NOT emit FAQ schema) and MUST NOT include blocked ownership wording, invented results, unavailable offers, or unverified evidence.

#### Scenario: Schema-content consistency

- GIVEN a locale page contains approved visible content
- WHEN its structured data is inspected
- THEN every claim and FAQ entity is supported by equivalent visible localized content

### Requirement: Event vocabulary and location

Measurement MUST use the V3 vocabulary: `diagnosis_cta_click`, `service_click`, `method_click`, `case_click`, `whatsapp_click`, `calendar_click`, `contact_form_start`, `contact_form_submit`, `contact_form_success`, `contact_form_error`, and `language_change`. The former `service_view` and `case_view` MUST be renamed to `service_click` and `case_click`, `method_click` MUST be added, and the homepage `insight_view` event and the `final` CTA location MUST be dropped. CTA events MUST include the stable `cta_location` context restricted to `header`, `hero`, and `diagnosis_section`. Events MUST include locale and distinguish intent, submission, confirmed success, and error.

#### Scenario: Diagnosis CTA tracking

- GIVEN diagnosis CTAs appear in `header`, `hero`, or `diagnosis_section`
- WHEN one is activated
- THEN exactly one `diagnosis_cta_click` records its actual location and locale before handoff

#### Scenario: Form lifecycle

- GIVEN a visitor starts and submits diagnosis context on `/es/diagnostico`
- WHEN validation or processing completes
- THEN start and submit are distinct, and exactly one success or error event reflects the confirmed outcome

### Requirement: Navigation and content events

Service, method, and case events MUST identify the approved item and source location. `calendar_click` and `whatsapp_click` MUST follow only intentional activation of approved destinations. `language_change` MUST record source and target while preserving equivalent page context when available.

#### Scenario: Language switch

- GIVEN a visitor changes from ES to EN
- WHEN locale navigation is activated
- THEN one `language_change` records source, target, and location without recording a diagnosis conversion

#### Scenario: Service, method, and case clicks

- GIVEN a visitor activates an approved service, method, or case element
- WHEN the event is emitted
- THEN exactly one `service_click`, `method_click`, or `case_click` identifies the approved item and source location

### Requirement: Privacy, accessibility, and resilience

Observability MUST follow approved consent/privacy treatment, exclude entered operational context and personal data, and MUST NOT block navigation or forms. Tracking failure or consent denial MUST leave actions functional and MUST NOT disrupt assistive technology.

#### Scenario: Analytics unavailable

- GIVEN tracking is blocked, denied, or fails
- WHEN a visitor navigates, changes locale, or submits valid context
- THEN the user journey continues and no false success, duplicate action, or visible error is caused by analytics

#### Scenario: Sensitive context entered

- GIVEN a visitor provides operational and contact details
- WHEN lifecycle events are emitted
- THEN event payloads contain only approved non-personal categorical metadata and exclude entered values

### Requirement: Observability publication gate

Events and metadata for blocked destinations, evidence, FAQ wording, or diagnosis behavior MUST remain absent. The "never link to empty content" rule MUST join the gate: no event, schema entity, or metadata MAY represent a missing or content-incomplete destination, and release MUST fail when any nav, footer, or CTA points to one. Optional analytics MUST degrade silently; invalid canonical/hreflang, misleading schema, or unconfirmed-success events MUST block release.

#### Scenario: Blocked commercial element

- GIVEN an element is withheld by a publication blocker
- WHEN the page and telemetry are generated
- THEN no schema entity, destination event, or success signal represents that element as available

#### Scenario: Empty destination

- GIVEN a nav, footer, or CTA destination is missing or content-incomplete (for example `/es/insights` before approval)
- WHEN the page and telemetry are generated
- THEN no schema entity, destination event, or success signal represents it and release fails
