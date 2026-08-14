# Section Pages V3 Specification

## Purpose

Define section sub-pages as the primary navigation of the V3 ecosystem: per-route server-first content, a typed per-route content domain, route-based metadata/sitemap, and a fail-closed guarantee that no link ever points to empty content.

## Requirements

### Requirement: Section routes as primary navigation

The system MUST provide locale-prefixed, server-rendered section pages for the ES routes `/es/servicios/software-a-medida`, `/es/servicios/sistemas-de-gestion`, `/es/servicios/automatizacion`, `/es/como-trabajamos`, `/es/casos`, `/es/insights`, and `/es/nosotros`. These routes MUST be the destinations of the primary header/footer navigation and MUST render their mandatory content in initial HTML without client execution. The homepage MUST NOT use `/#` anchors as navigation destinations.

#### Scenario: Section routes render server-first

- GIVEN a visitor opens any published section route
- WHEN the initial document is inspected
- THEN it contains that route's localized mandatory narrative and heading structure in initial HTML
- AND no content depends on client execution or animation

#### Scenario: Navigation resolves to routes

- GIVEN the header or footer navigation
- WHEN a primary nav item is activated
- THEN it resolves to a real section route and never to an in-page anchor

### Requirement: Typed per-route content contract

Section-page content MUST live in a typed per-route content domain (`src/content/sections/`) with one entry per route and ES as the primary locale. EN content MUST be added only when approved; the locale-parity gate MUST withhold EN routes, nav items, and links rather than half-publish an unapproved locale. A route MUST have complete approved content (copy, metadata, and required assets) before it may be linked.

> **Assumption (pending user confirmation before apply):** per open decision 2, EN section routes are built ES-first and withheld until approved EN copy exists; the locale-parity gate never half-publishes EN nav or links.

#### Scenario: Content completeness

- GIVEN a route is linked in nav, footer, or as a CTA destination
- WHEN publication is evaluated
- THEN the route has complete approved content in the linked locale

#### Scenario: EN withheld until approved

- GIVEN an EN section route lacks approved content
- WHEN navigation is generated
- THEN the EN link and route MUST remain unpublished
- AND the ES version MUST remain available without mixing locales

### Requirement: Per-route metadata, canonical, hreflang, and sitemap

Each published section route MUST provide a localized title and approved description, a self-canonical URL, reciprocal hreflang alternates through the existing metadata helpers, and an entry in the sitemap. Per-route structured data MUST be supported by that route's visible approved content.

#### Scenario: Route metadata parity

- GIVEN a section route is indexable in ES and EN
- WHEN its metadata is inspected
- THEN it has localized title/description, self-canonical, reciprocal alternates, and share metadata consistent with its locale

#### Scenario: Sitemap includes section routes

- GIVEN the site sitemap is generated
- WHEN it is inspected
- THEN every published section route is present with the approved locale structure
- AND missing or content-incomplete routes are absent

### Requirement: "Never link to empty content" publication gate

The fail-closed release validator MUST require both route existence and content completeness for every nav, footer, and CTA destination. A release whose homepage, nav, or footer links to a missing route or a content-incomplete route MUST fail. The homepage MUST never link to an empty destination.

> **Assumption (pending user confirmation before apply):** per open decision 3, `/es/insights` stays unlinked in nav/footer/homepage while its content is `approved:false`; an interim listing page with withheld posts is not shipped unless confirmed.

#### Scenario: Empty destination fails release

- GIVEN a nav, footer, or CTA destination lacks a route or approved content
- WHEN release is evaluated
- THEN the release fails and no link to that destination is published

#### Scenario: Insights withheld

- GIVEN `/es/insights` content is not yet approved
- WHEN nav, footer, and homepage are generated
- THEN no link to `/es/insights` appears anywhere
- AND the route itself MAY remain unpublished until its content is approved

### Requirement: Cases listing and detail URLs

The cases experience MUST provide a listing page at `/casos` and detail pages at `/casos/[slug]`, and MUST redirect legacy `/success-cases/*` URLs to their `/casos/[slug]` equivalents.

> **Assumption (pending user confirmation before apply):** per open decision 1, the URL migration defaults to `/casos` listing + `/casos/[slug]` details with redirects from `/success-cases/*` (per `seo.md` §34 URL-migration rule) and awaits explicit user confirmation before apply.

#### Scenario: Legacy URL redirect

- GIVEN a visitor opens a legacy `/success-cases/{slug}` URL
- WHEN the request is resolved
- THEN it redirects to the corresponding `/casos/{slug}` detail URL preserving locale and content
