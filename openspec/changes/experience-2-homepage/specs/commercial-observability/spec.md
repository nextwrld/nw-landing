# Commercial Observability Specification

## Purpose

Define bilingual discoverability and privacy-safe measurement.

## Requirements

### Requirement: Locale SEO and initial commercial HTML

Each ES/EN homepage MUST provide a localized title equivalent to “Software a medida para empresas | Next Wrld,” approved description, canonical, reciprocal hreflang, Open Graph, and Twitter metadata. URLs MUST resolve to the matching public locale. Initial HTML MUST contain the H1, commercial copy, services, method, approved cases and FAQ, and diagnosis path without client rendering.

#### Scenario: Locale metadata parity
- GIVEN `/es` and `/en` are indexable
- WHEN metadata and initial HTML are inspected
- THEN each has localized title/description, self-canonical, reciprocal alternates, share metadata, and equivalent critical commercial content

#### Scenario: Invalid locale URL
- GIVEN a canonical or alternate points to a non-public, mismatched, or failing URL
- WHEN publication is evaluated
- THEN the affected locale MUST fail publication

### Requirement: Truthful structured data

Schema MUST be supported by visible approved content and identify the organization/site as applicable. It MAY include only FAQ answers published in that locale and MUST NOT include blocked ownership wording, invented results, unavailable offers, or unverified evidence.

#### Scenario: Schema-content consistency
- GIVEN a locale page contains approved visible content
- WHEN its structured data is inspected
- THEN every claim and FAQ entity is supported by equivalent visible localized content

### Requirement: Event vocabulary and location

Measurement MUST use: `diagnosis_cta_click`, `whatsapp_click`, `calendar_click`, `service_view`, `case_view`, `insight_view`, `contact_form_start`, `contact_form_submit`, `contact_form_success`, `contact_form_error`, and `language_change`. CTA events MUST include stable location; diagnosis MUST distinguish `header`, `hero`, `diagnosis_section`, and `final` when present. Events MUST include locale and distinguish intent, submission, confirmed success, and error.

#### Scenario: Diagnosis CTA tracking
- GIVEN diagnosis CTAs appear in multiple locations
- WHEN one is activated
- THEN exactly one `diagnosis_cta_click` records its actual location and locale before handoff

#### Scenario: Form lifecycle
- GIVEN a visitor starts and submits diagnosis context
- WHEN validation or processing completes
- THEN start and submit are distinct, and exactly one success or error event reflects the confirmed outcome

### Requirement: Navigation and content events

Service, case, and insight events MUST identify the approved item and source location. `calendar_click` and `whatsapp_click` MUST follow only intentional activation of approved destinations. `language_change` MUST record source and target while preserving equivalent page context when available.

#### Scenario: Language switch
- GIVEN a visitor changes from ES to EN
- WHEN locale navigation is activated
- THEN one `language_change` records source, target, and location without recording a diagnosis conversion

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

Events and metadata for blocked destinations, evidence, FAQ wording, or diagnosis behavior MUST remain absent. Optional analytics MUST degrade silently; invalid canonical/hreflang, misleading schema, or unconfirmed-success events MUST block release.

#### Scenario: Blocked commercial element
- GIVEN an element is withheld by a publication blocker
- WHEN the page and telemetry are generated
- THEN no schema entity, destination event, or success signal represents that element as available
