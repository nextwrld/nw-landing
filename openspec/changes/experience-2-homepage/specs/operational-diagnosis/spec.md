# Operational Diagnosis Specification

## Purpose

Define context-first diagnosis and truthful handoffs.

## Requirements

### Requirement: Concrete diagnosis offer

In ES and EN, the system MUST describe a free 30–45 minute operational conversation, focused on one concrete process rather than a service demo, with no obligation to hire. It MUST promise a mini-diagnosis containing current situation, frictions, business impact, opportunities, priorities, initial solution direction, and recommended next steps only when delivery ownership is approved.

#### Scenario: Offer comprehension
- GIVEN a visitor reaches the diagnosis section
- WHEN they review the offer
- THEN duration, cost, focus, non-obligation, and approved outcomes are explicit and equivalent across locales

### Requirement: Context-first scheduling sequence

The primary diagnosis path MUST collect only name, company, email, and the operation area to improve before offering calendar selection. It MUST validate through the existing contact boundary, disclose the approved privacy treatment, prevent progression on invalid input, and MUST NOT imply that a meeting is booked before provider confirmation.

#### Scenario: Valid handoff
- GIVEN valid required context and acknowledged privacy treatment
- WHEN the visitor submits it
- THEN the context is accepted before calendar selection is offered
- AND booking is confirmed only after the calendar provider confirms it

#### Scenario: Invalid context
- GIVEN missing or invalid required data
- WHEN submission is attempted
- THEN progression is blocked and field-associated, accessible guidance identifies corrections without discarding valid input

### Requirement: Diagnosis publication gate

Public scheduling MUST NOT launch until the diagnosis provider, calendar destination/handoff, privacy treatment, and internal ownership are approved. Implementable presentation and validation MAY exist before approval, but public CTAs MUST NOT lead to placeholders, dead ends, unowned submissions, or unapproved data processing.

#### Scenario: Dependency unapproved
- GIVEN any diagnosis dependency remains unapproved
- WHEN public release is evaluated
- THEN scheduling publication MUST be blocked and no CTA may claim that scheduling is available

### Requirement: WhatsApp alternative

Where an approved WhatsApp destination exists, the system MUST offer a secondary path with a localized prefilled message equivalent to “I arrived from Next Wrld and want to discuss a process in my company that we want to improve,” not a generic information request. It MUST clearly identify that activating the action leaves the site.

#### Scenario: WhatsApp activation
- GIVEN the approved WhatsApp action is available
- WHEN a visitor activates it
- THEN the correct destination opens with the contextual localized message and no diagnosis is represented as booked

### Requirement: FAQ approval and behavior

The FAQ MUST publish the approved bilingual answers covering fit for custom software, retaining existing tools, starting with one process, duration, pricing, post-launch evolution, and concrete AI use. The software-ownership question and answer MUST NOT publish until contractual/legal wording is approved; it MUST NOT be guessed, softened into an implied promise, or emitted in FAQ schema. Disclosures MUST be keyboard and assistive-technology operable, and their answers MUST remain available without animation.

#### Scenario: Ownership wording pending
- GIVEN ownership terms lack legal approval
- WHEN FAQ content and schema are generated
- THEN the ownership entry is absent from both while all other approved FAQ entries remain available

#### Scenario: FAQ interaction failure
- GIVEN enhanced disclosure behavior is unavailable
- WHEN a visitor accesses the FAQ
- THEN approved questions and answers remain readable through a non-deceptive fallback

### Requirement: Failure and recovery states

Submission, calendar, and external-channel failures MUST provide an accessible localized status, preserve entered context where safe, avoid duplicate submissions, and offer a truthful retry or approved alternative. The system MUST NOT display success after timeout, rejection, or unknown provider state.

#### Scenario: Contact or calendar failure
- GIVEN context submission or calendar handoff fails
- WHEN the failure is known or confirmation is absent
- THEN no success/booking state appears, retained input is recoverable, and retry or an approved alternative is offered
