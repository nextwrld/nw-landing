# Next Wrld — Current State Audit

**Audit date:** 2026-08-08  
**Repository:** `nextwrld/nw-landing`  
**Scope:** repository inspection, production raw-HTML sampling, and non-destructive dependency diagnostics. No application code or dependencies were changed.

## Evidence conventions

- **Verified:** confirmed directly in the current repository.
- **Runtime verified:** confirmed in raw HTTP responses from `https://nextwrld.com` on the audit date.
- **Inferred:** conclusion follows from framework semantics and the inspected code, but could not be reproduced through a local build.
- **Not verified:** evidence required to reach a reliable conclusion was unavailable.
- Line references describe the repository state on the audit date.

## 1. Executive Summary

1. The application is a Next.js `16.0.10`, React `19.2.x`, TypeScript, Tailwind CSS 4 App Router site. There is no Pages Router.
2. The current product-facing home already communicates operational systems, custom software, automation, and strategically applied AI more clearly than the original Play template.
3. The repository is not a functioning SaaS application: authentication, NextAuth/Auth.js, Prisma, PostgreSQL, dashboard, and active Stripe flows are absent from current source.
4. Significant Play Next.js residue remains publicly reachable: starter metadata, placeholder team members, demo blogs, a nonfunctional newsletter, dead payment components, stale documentation, and stale dependencies.
5. The crawler finding is confirmed. `/` and `/diagnostico` intentionally render `<h1>Loading...</h1>` in initial HTML until a client `useEffect` marks their heroes as mounted.
6. Success-case details are more severely affected: initial HTML contains `Cargando...`, while the complete article is fetched from `/api/success-cases/[slug]` only after hydration. Non-JavaScript crawlers cannot access the article body.
7. Client Components are not inherently the cause. Next.js prerenders them; the SEO loss comes from first-render branches that deliberately replace content with loading text.
8. Every HTML route is currently request-rendered and returned as private/no-store because the root layout calls `cookies()`. Home metadata also calls `cookies()` and `headers()`.
9. Home, services, diagnóstico, blogs, and success cases are based on bundled translations or local files and are technically compatible with static rendering once request-bound locale selection and client-only article loading are removed.
10. Technical SEO is incomplete: no `metadataBase`, canonical URLs, locale alternates, sitemap, robots file, JSON-LD, shared Open Graph defaults, or Twitter images were found.
11. Public metadata on `/about`, `/contact`, `/pricing`, `/blogs`, `/error`, and the global 404 still identifies the site as “Play SaaS Starter Kit and Boilerplate for Next.js.”
12. Spanish and English share the same URLs and switch by cookie/client state. Metadata, `<html lang>`, and server-rendered body can disagree on first request.
13. The content foundation is reusable, but the `.mdx` files are processed as sanitized Markdown, not true MDX. Raw HTML images and GFM tables used in cases are not supported by the configured pipeline.
14. The success-case API has a confirmed directory-traversal flaw: unvalidated `locale` input is joined into a filesystem path and can expose other `.mdx` content in the repository.
15. The project can evolve to an SEO-first App Router architecture without a rewrite. The highest-value path is to fix initial HTML, filesystem input validation, locale/rendering architecture, indexation controls, public template routes, and dependency security before visual redesign.

## 2. Current Architecture

### 2.1 Technology inventory

Exact resolved versions are taken from `pnpm-lock.yaml:9-152`; declared ranges are in `package.json:11-60`.

| Component | Technology | Version | In use | Observations |
| --- | --- | --- | --- | --- |
| Framework | Next.js | `16.0.10` | Yes | App Router under `src/app`; declared exactly in `package.json:19`. |
| UI runtime | React / React DOM | `19.2.3` resolved | Yes | Declared `^19.2.0`; `pnpm-lock.yaml:53-58`. |
| Language | TypeScript | `5.9.3` resolved | Yes | Strict mode and no emit in `tsconfig.json:3-29`. |
| Node | Node.js | `>=20` expected | Yes | Engine in `package.json:62-64`; local audit runtime was Node `24.18.0`. |
| Package manager | pnpm, likely | Not declared | Uncertain | Current `pnpm-lock.yaml`; stale `package-lock.json`; README instructs npm. |
| Styling | Tailwind CSS | `4.1.18` resolved | Yes | CSS-first config in `src/styles/index.css:3`; no `tailwind.config.*`. |
| UI plugin | TailGrids | `2.3.0` | Yes | Loaded by `@plugin` in `src/styles/index.css:4`. |
| Icons | Heroicons | `2.2.0` | Yes | Used, for example, in `src/components/About/index.tsx:3`. |
| Internationalization | i18next / react-i18next | `25.7.4` / `16.5.1` | Yes | Client singleton in `src/i18n.ts`; ES and EN bundled resources. |
| Theme | next-themes | `0.4.6` | Yes | `ThemeProvider` in `src/app/providers.tsx:17-21`. |
| Notifications | react-hot-toast | `2.6.0` | Provider only | `<Toaster>` is global, but no toast calls were found. |
| Animation | CSS `wow` / `fadeInUp` classes | No JS package found | Partial | Classes are widespread; no WOW runtime import was found. No Framer Motion/GSAP. |
| Markdown frontmatter | gray-matter | `4.0.3` | Yes | `src/utils/markdown.ts:1-2,28-29,80-81`. |
| Markdown rendering | remark + remark-rehype + rehype | `15.0.1`, `11.1.2`, `6.0.0`, `10.0.1` | Yes | Sanitized Markdown pipeline in `src/utils/markdownToHtml.ts:1-12`. |
| MDX runtime | next-mdx-remote | `6.0.0` | No | Installed but not imported; current `.mdx` files are not compiled as MDX. |
| Markdown alternative | marked / remark-html | `17.0.1` / `16.0.1` | No | No imports found. |
| Syntax highlighting | PrismJS | `1.30.0` | No runtime use | Global Prism CSS is imported in `src/app/layout.tsx:7`; no highlighting invocation. |
| Date formatting | date-fns | `3.6.0` | Yes | Blog and case dates. |
| HTTP client | Axios | `1.13.2` | Dead code only | Only used by orphaned `PricingBox`, which calls a nonexistent payment API. |
| Forms | Native controlled React form | N/A | Yes | No form library; contact submits with browser `fetch`. |
| Email | Nodemailer / SMTP | `7.0.12` | Yes | `src/utils/email.ts`; contact route uses it. |
| Analytics | Google Analytics 4 | Native gtag | Yes | Global component; ID fallback in `src/constants/links.ts:9`. |
| Tag management | Google Tag Manager | Native script | Yes | Global component; ID fallback in `src/constants/links.ts:8`. |
| Database | None | N/A | No | No Prisma schema/client, SQL, or database imports. |
| Prisma | Empty stub only | N/A | No | `prisma.config.ts:1-2`; stale npm lock/docs remain. |
| Authentication | None | N/A | No | No NextAuth/Auth.js route, middleware, provider, or auth dependencies in current manifest. |
| Payments | Stripe package | `14.25.0` | No | Installed in lockfile but no source import or payment endpoint. |
| External booking | Google Calendar | URL integration | Yes | `CALENDAR_URL` in `src/constants/links.ts:1-3`. |
| Deployment | Unspecified | Not verified | Unknown | No Vercel config, Dockerfile, CI deployment workflow, or platform config. Production headers indicate Vercel, but repository strategy is not declared. |

### 2.2 Application model

- `src/app/layout.tsx:11-37` is the global Server Component layout.
- It reads the `language` cookie, renders GTM, GA, header, footer, theme/i18n providers, and scroll controls.
- `src/app/providers.tsx:1-25` is a Client Component containing theme, toaster, and i18n synchronization.
- Product copy is stored in `src/i18n/es.ts` and `src/i18n/en.ts` and ships to the browser.
- Blogs and success cases are local filesystem content under `markdown/`.
- `/api/contact` sends SMTP email; `/api/success-cases/[slug]` converts local Markdown into JSON/HTML.
- There is no middleware, server action, database, auth boundary, or payment backend.

### 2.3 Environment and external services

| Area | Variables / service | Evidence |
| --- | --- | --- |
| SMTP | `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_FROM` | `src/utils/email.ts:9-27` |
| Booking | `NEXT_PUBLIC_CALENDAR_URL` with committed fallback | `src/constants/links.ts:1-3` |
| GTM | `NEXT_PUBLIC_GTM_ID` with committed fallback | `src/constants/links.ts:8` |
| GA4 | `NEXT_PUBLIC_GA_ID` with committed fallback | `src/constants/links.ts:9` |
| Blog identity | `SITE_NAME`, `AUTHOR_NAME` | `src/app/(site)/blogs/[slug]/page.tsx:21-22` |
| Fonts | Google Fonts, Inter | `src/styles/index.css:1` |

No tracked `.env*` files were found. `.gitignore:21,28-29,39` excludes PEM and local environment files. Deployment-level secrets and historical Git exposure are **not verified**.

## 3. Repository Structure

```text
.
├── markdown/
│   ├── blogs/                       # Three starter/demo articles
│   └── success-cases/
│       ├── en/                      # Three English cases
│       └── es/                      # Three Spanish cases
├── public/images/                   # Site, template, blog, team, and legacy assets
├── src/
│   ├── app/
│   │   ├── (site)/                  # Public pages; group is omitted from URLs
│   │   │   ├── about/
│   │   │   ├── blogs/[slug]/
│   │   │   ├── contact/
│   │   │   ├── diagnostico/
│   │   │   ├── error/
│   │   │   ├── legal-notice/
│   │   │   ├── pricing/
│   │   │   ├── privacy-policy/
│   │   │   ├── success-cases/[slug]/
│   │   │   └── terms-of-service/
│   │   ├── api/contact/             # SMTP form endpoint
│   │   ├── api/success-cases/[slug] # Locale-dependent case JSON endpoint
│   │   ├── layout.tsx               # Request-bound global layout
│   │   ├── page.tsx                 # Home
│   │   ├── providers.tsx            # Theme, toaster, i18n
│   │   └── not-found.tsx            # Global 404 boundary
│   ├── components/
│   │   ├── About, Features, Hero    # Home sections
│   │   ├── Pricing, Faq, Contact    # Home and standalone sections
│   │   ├── Diagnostico/             # Diagnostic page sections
│   │   ├── SuccessCases/            # Case cards and client-loaded detail
│   │   ├── Blog/                    # Listing/detail support and newsletter
│   │   ├── Header, Footer           # Global navigation/chrome
│   │   ├── Common, Legal            # Shared presentation
│   │   └── Team, Clients, Testimonials # Template/demo or inactive areas
│   ├── constants/                   # URLs and integration IDs
│   ├── i18n/                        # ES/EN copy resources
│   ├── styles/                      # Tailwind/global and Prism CSS
│   ├── types/                       # Content and component types
│   └── utils/                       # Filesystem content, Markdown, SMTP
├── next.config.js
├── package.json
├── package-lock.json                # Stale npm dependency graph
├── pnpm-lock.yaml                   # Current dependency graph
├── prisma.config.ts                 # Empty removal stub
└── schema.json                      # Obsolete NextAuth schema artifact
```

No `src/hooks`, service layer, database layer, test suite, Pages Router, middleware, or active auth/payment modules exist.

## 4. Routing & Rendering

### 4.1 Public route inventory

The rendering classification includes the root layout. Because `src/app/layout.tsx:16` calls `cookies()`, all current HTML routes are dynamically rendered even where the page body itself is static-capable.

| Route | Type | Content | Indexable | Own metadata | Current rendering | Observations |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Commercial page | Full homepage | Yes by default | Bilingual title/description | Dynamic SSR | Initial H1 is `Loading...`; most lower sections are in initial HTML. |
| `/about` | Legacy/public page | About + placeholder team | Yes by default | Yes, Play metadata | Dynamic SSR | Public template residue. |
| `/blogs` | Content index | Three demo posts | Yes by default | Yes, Play metadata | Dynamic SSR | Filesystem content; no navigation link. |
| `/blogs/[slug]` | Dynamic content | Full blog article | Yes; conflicting Googlebot follow rule | Generated | Dynamic SSR | Article body is server-rendered; no `generateStaticParams`. |
| `/contact` | Commercial/form | Contact section | Yes by default | Yes, Play metadata | Dynamic SSR + CSR form | Form posts to `/api/contact`. |
| `/diagnostico` | Commercial page | Operational diagnosis | Yes by default | Spanish-only | Dynamic SSR | Initial H1 is `Loading...`; lower sections are SSR HTML. |
| `/error` | Legacy page | 404-style UI | Yes by default | Yes, Play metadata | Dynamic SSR | Returns a normal page, not `error.tsx`; likely HTTP 200. |
| `/legal-notice` | Legal page | Bilingual legal notice | Yes by default | No | Dynamic SSR/client boundary | Entire page is explicitly client-marked. |
| `/pricing` | Commercial/legacy route | Current work model + FAQ | Yes by default | Yes, Play metadata | Dynamic SSR | Visible content is current; metadata is template residue. |
| `/privacy-policy` | Legal page | Bilingual privacy policy | Yes by default | Spanish-only | Dynamic SSR | Calls `cookies()` itself. |
| `/success-cases/chatbot` | Dynamic case | AI sales engine | Yes by default | Generic shared | Dynamic shell + CSR data | Initial body is only `Cargando...`. |
| `/success-cases/crm` | Dynamic case | InmoCRM | Yes by default | Generic shared | Dynamic shell + CSR data | Initial body is only `Cargando...`. |
| `/success-cases/gym-access-os` | Dynamic case | Gym Access OS | Yes by default | Generic shared | Dynamic shell + CSR data | Initial body is only `Cargando...`. |
| `/terms-of-service` | Legal page | Bilingual terms | Yes by default | No | Dynamic SSR/client boundary | Entire page is explicitly client-marked. |
| Unknown URL | Framework boundary | Global 404 | No by status | Yes, Play metadata | Dynamic SSR | Correct boundary, stale title. |

API routes:

| Route | Method | Rendering | Purpose |
| --- | --- | --- | --- |
| `/api/contact` | POST | Dynamic | Validate minimal fields and send SMTP email. |
| `/api/success-cases/[slug]?locale=es` | GET | Runtime | Read local case, convert Markdown, return JSON. |

There is no `/services` page. Services is the `/#services` section rendered by `src/components/About/index.tsx:30-74`.

### 4.2 Rendering controls and blockers

| Mechanism searched | Result |
| --- | --- |
| `force-dynamic`, `force-static`, `dynamic` export | None found |
| `revalidate`, `fetchCache` | None found |
| Server `fetch()` in pages | None found |
| Client data fetch | Success-case detail and contact submit |
| `cookies()` | Root layout, home metadata, privacy page |
| `headers()` | Home metadata |
| `searchParams` | Success-case API locale only |
| `next/dynamic`, `ssr: false` | None found |
| `Suspense`, React lazy, `loading.tsx` | None found |
| Server Actions / `use server` | None found |
| Middleware | None found |

Next.js 16 documentation defines `cookies()` as a Dynamic API that opts a layout/page route into request rendering. This matches runtime responses sampled on the audit date: tested HTML routes returned `cache-control: private, no-cache, no-store, max-age=0, must-revalidate` and `x-vercel-cache: MISS`.

### 4.3 Static feasibility

| Area | Static today | Fundamentally static-capable | Current blocker |
| --- | --- | --- | --- |
| Home | No | Yes | Root cookie, header/cookie metadata, locale strategy, hero mount guard. |
| Services section | No, inherited | Yes | Root request-bound locale; section data itself is bundled. |
| Diagnóstico | No | Yes | Root cookie and mount-gated hero. |
| Blog index/details | No | Yes | Root cookie; details lack static params but use local files. |
| Success-case cards | No, inherited | Yes | Root cookie and client locale selection. |
| Success-case details | No meaningful static content | Yes | Content fetched only after hydration; cookie-based shared URL locale. |
| Contact page | No | Yes | Page can be static while POST API remains dynamic. |
| Legal pages | No | Yes with a locale decision | Cookie/client translation architecture. |

## 5. Server vs Client Components

There are 31 explicit `"use client"` modules. Two complete pages are Client Components: legal notice and terms of service. Most other route files are Server Components but compose large client subtrees due to global `react-i18next` usage.

| File / group | Server/Client | Motive | Justified | Recommendation |
| --- | --- | --- | --- | --- |
| `src/app/layout.tsx` | Server | Cookies and global composition | Partially | Keep server; remove request-bound locale if static output is the target. |
| `src/app/page.tsx` | Server | Reads local cases | Yes | Keep server. |
| `src/app/providers.tsx` | Client | Theme, toast, language effect | Partially | Isolate providers; remove toaster if unused and avoid client translation ownership for static copy. |
| `src/components/Hero/index.tsx` | Client | Translation hook and mount guard | No for full section | Render content server-side; isolate only interaction if needed. |
| `src/components/Diagnostico/Hero.tsx` | Client | Translation, scroll button, mount guard | Partially | Server-render copy; isolate smooth-scroll button only. |
| `Features`, `About`, `Pricing`, `PlanCard` | Client | Translation hooks | Mostly no | These are static presentation and can be server-rendered with resolved copy. |
| `Faq` | Client | Translation + disclosure state | Partially | Keep only each disclosure controller client-side; server-render questions/answers. |
| `SuccessCasesSection` | Client | Chooses locale through i18n | Mostly no | Resolve locale/content on server. |
| `SuccessCaseContent` | Client | Fetch, loading state, locale | No for article body | Move file loading/conversion/metadata/notFound to page Server Component. |
| `Contact` | Client | Controlled form and fetch | Yes | Keep form island; surrounding content can be server-rendered. |
| `Header` | Client | Mobile menu, theme, scroll listener, i18n | Partially | Isolate interactive controls; avoid hydrating all navigation copy. |
| `Footer` | Client | Translation hook | Mostly no | Render static footer server-side after locale architecture is decided. |
| `LanguageSelector` | Client | Browser state and language change | Yes | Keep as isolated control; current mount-null behavior should not own page content. |
| `GoogleAnalytics`, `GoogleTagManager` | Client | Script injection | Yes technically | Consolidate analytics strategy and consent handling. |
| `ScrollToTop`, `ScrollUp` | Client | Browser scroll APIs | Yes | Keep isolated; review whether both are needed. |
| `Diagnostico/Audience`, `Checklist`, `Outcomes`, `Modelo` | Client | Translation hooks only | Mostly no | Convert static sections to server-rendered content. |
| `Diagnostico/ContactWrapper` | Client | Translation + Contact | Partially | Wrapper can be server; form remains client. |
| `legal-notice/page.tsx`, `terms-of-service/page.tsx` | Client page | Translation hooks | No | Restore server page boundary and metadata support. |
| `PrivacyPolicyContent` | Client | Translation hook | Mostly no | Resolve content on server. |

Client Components still receive SSR HTML. The audit does **not** treat `"use client"` alone as an SEO defect. The defect occurs when their first server render suppresses meaningful content or when static presentation causes unnecessary hydration.

## 6. Loading / Hydration Investigation

### 6.1 Exact sources

#### Home `/`

- `src/components/Hero/index.tsx:10` initializes `mounted` as `false`.
- `src/components/Hero/index.tsx:12-14` changes it only in `useEffect`, which never runs on the server.
- `src/components/Hero/index.tsx:17-40` returns a replacement hero before mount.
- `src/components/Hero/index.tsx:31-33` places literal `Loading...` inside the only initial hero H1.
- The real title, description, CTA, subheadline, and image are in the post-mount branch at lines 43-99.

**Initial HTML impact:** the hero's SEO-critical content is absent. Lower home sections, including services and case cards, are present.

#### Diagnóstico `/diagnostico`

- `src/components/Diagnostico/Hero.tsx:9` initializes `mounted=false`.
- `src/components/Diagnostico/Hero.tsx:11-13` changes it after hydration.
- `src/components/Diagnostico/Hero.tsx:22-33` returns the loading shell.
- `src/components/Diagnostico/Hero.tsx:27-29` renders `<h1>Loading...</h1>`.

**Initial HTML impact:** title, subtitle, and two hero CTAs are absent. Audience, checklist, outcomes, model, and contact remain server-rendered HTML.

#### Success cases `/success-cases/[slug]`

- The page only renders `<SuccessCaseContent slug={slug} />`: `src/app/(site)/success-cases/[slug]/page.tsx:17-20`.
- `SuccessCaseContent` initializes `caseData=null` and `loading=true`: lines 20-21.
- The article request starts only inside `useEffect`: lines 23-52.
- The initial branch renders `t("common.loading")`: lines 54-61.
- Spanish defines this as `Cargando...`: `src/i18n/es.ts:83-85`.
- Complete HTML is inserted only after browser fetch: `SuccessCaseContent.tsx:136-140`.

**Initial HTML impact:** breadcrumb, cover, title/article body, author, date, and case headings are absent. A non-JavaScript crawler receives only global chrome plus `Cargando...`.

### 6.2 What is not causing the text

- No `loading.tsx` exists.
- No `Suspense` or fallback exists.
- No `next/dynamic` or `{ ssr: false }` exists.
- No page transition wrapper exists.
- `Loader.tsx` and `PreLoader.tsx` exist but are unreferenced.
- Contact's `Enviando...` state occurs only after user submission and is unrelated.

### 6.3 Locale/hydration inconsistency

- Root layout reads the cookie and sets `<html lang>`: `src/app/layout.tsx:16-20`.
- The i18n singleton always initializes with `lng: "es"`: `src/i18n.ts:19-33`.
- `Providers` changes language only in an effect: `src/app/providers.tsx:9-14`.
- Home metadata separately checks cookies and `Accept-Language`: `src/app/page.tsx:17-36`.

As a result, a first English request can receive English metadata, `<html lang="es">`, Spanish server content, and an English literal `Loading...` H1. `suppressHydrationWarning` at `layout.tsx:20` and `page.tsx:44` hides mismatch warnings; it does not fix the mismatch.

### 6.4 Runtime evidence

Raw production HTML sampled on 2026-08-08 confirmed:

- `/` includes `Loading...` and Spanish services in initial HTML.
- `/diagnostico` includes `Loading...` in initial HTML.
- `/success-cases/crm` includes `Cargando...` and not the case article.
- `Cookie: language=en` did not make the success-case initial shell English.
- English `Accept-Language` without a cookie produced English title metadata with `lang="es"` and Spanish body.

This verifies that the external crawler observation is current, not merely historical.

## 7. SEO Technical Audit

### Critical

1. **Success-case content is absent from initial HTML.** Evidence: `SuccessCaseContent.tsx:20-61,136-140`. All case detail indexing depends on JavaScript and a client API request.
2. **Primary H1 content is replaced by `Loading...`.** Evidence: home Hero lines 10-40 and diagnóstico Hero lines 9-34.
3. **No sitemap or robots artifact exists.** Exhaustive search found no `sitemap.ts`, `sitemap.xml`, `robots.ts`, or `robots.txt`.
4. **Current Next.js version has published advisories.** `pnpm audit --lockfile-only` reported Next `16.0.10` as affected, including a high-severity RSC request-deserialization DoS fixed in `16.0.11`, plus newer advisories fixed in later 16.x versions.
5. **The success-case API permits directory traversal through `locale`.** `route.ts:10-20` passes the query value directly to `getSuccessCaseBySlug`; `src/utils/markdown.ts:19-28` joins it into a filesystem path without an `es`/`en` allowlist. Runtime verification returned HTTP 200 and blog content for `/api/success-cases/contact-form?locale=..%2Fblogs`.

### High

1. No `metadataBase`, canonical URLs, locale alternates, or `hreflang` exist.
2. Same URLs switch language by cookie/client state, producing unstable indexable representations.
3. `/about`, `/contact`, `/pricing`, `/blogs`, `/error`, and global 404 expose Play SaaS metadata.
4. All success-case slugs share generic metadata and ignore title, excerpt, date, cover, and locale: `success-cases/[slug]/page.tsx:8-15`.
5. All routes are request-rendered/no-store because the root layout uses `cookies()`.
6. Blog metadata can expose “Your Site Name” and “Your Author Name”: `blogs/[slug]/page.tsx:21-27`.
7. Blog robots metadata says `follow: true` but Googlebot `follow: false`: lines 28-38.
8. No structured data exists for Organization, WebSite, Article, BreadcrumbList, FAQPage, or Service.
9. Unknown success-case slugs do not call server `notFound()`; they can return a loading shell followed by a client “not found” state.

### Medium

1. No global Open Graph or Twitter defaults/images. Blog details have partial OG/Twitter titles only.
2. Legal notice and terms have no route metadata; privacy metadata is Spanish-only.
3. Blog details do not render the post title as a visible heading; Breadcrumb owns the H1 “Blog Details.”
4. Success-case details use a generic breadcrumb H1; case heading levels differ by file.
5. Multiple routes lack `<main>`; articles lack `<article>`, `<time>`, and breadcrumb landmarks.
6. Contact labels are disconnected because fields have no matching IDs: `Contact/index.tsx:167-231`.
7. Image alts include `logo`, `hero`, `about image`, `image/imagen`, and `shape`; decorative and informative images are not distinguished.
8. Raw HTML images and GFM tables in case files are unsupported by the current Markdown pipeline.
9. Header links and labels do not reliably match destinations; success cases, diagnóstico, and blog are absent from active navigation.

### Low

1. No site manifest was found.
2. Breadcrumb “Home” is not localized and lacks `aria-current`.
3. FAQ disclosure has `aria-expanded` but no `aria-controls`/panel IDs.
4. Mobile navigation lacks `aria-expanded`, `aria-controls`, and an accessible nav label.
5. No skip link was found.

### 7.1 Metadata matrix

| Route | Title/description | Canonical | OG | Twitter | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | Locale-selected | No | No | No | Metadata locale can disagree with body/lang. |
| `/diagnostico` | Spanish | No | No | No | No English metadata variant. |
| `/about` | Play starter | No | No | No | Public template identity. |
| `/contact` | Play starter | No | No | No | Public template identity. |
| `/pricing` | Play starter | No | No | No | Public template identity. |
| `/blogs` | Play starter | No | No | No | Public template identity. |
| `/blogs/[slug]` | Per title | No | Partial | Partial | Missing description/images/URL/dates; placeholder site identity possible. |
| `/success-cases/[slug]` | Generic shared | No | No | No | Slug is read but not used in metadata. |
| `/privacy-policy` | Spanish | No | No | No | Visible content can switch language. |
| `/legal-notice` | None | No | No | No | Client page prevents static metadata export in current form. |
| `/terms-of-service` | None | No | No | No | Client page prevents static metadata export in current form. |
| `/error`, 404 | Play starter | No | No | No | `/error` is a normal route. |

### 7.2 Heading structures

```text
/
H1 Loading... initially; product H1 after hydration
  H2 No somos una agencia de software. Somos tu socio de arquitectura.
    H3 Criterio de Producto & Negocio
    H3 IA como Acelerador, no como Moda
    H3 Infraestructura de Evolución Continua
    H3 Activos Digitales Propios
  H2 La Oferta Clara
    H3 Ingeniería de Sistemas Operativos
    H3 Automatización e IA Aplicada
    H3 Retainers de Evolución Estratégica
  H2 El futuro pertenece a aquellos que se preparan hoy
  H2 Modelo de Sociedad
  H2 Preguntas Frecuentes
    H3 six questions
  H2 Casos de Éxito
    H3 three case titles
  H2 Contáctanos
    H3 contact detail and form groups
```

```text
/diagnostico
H1 Loading... initially; diagnosis title after hydration
  H2 audience
  H2 review checklist
  H2 outcomes
  H2 work model
  H2/H3 contact
```

```text
/blogs/[slug]
H1 Blog Details (breadcrumb)
  Post title is absent as a heading
  Article Markdown begins at H2 in current files
  H2 Popular Articles
  H2 Related Articles
```

```text
/success-cases/[slug]
H2 Cargando... initially
After hydration: H1 generic case-details breadcrumb
  Markdown may begin at H1 or H2 depending on file
```

### 7.3 Semantic HTML and accessibility relevant to SEO

Positive evidence:

- Global `<header>`, `<nav>`, and `<footer>` exist.
- Home and selected legal/about pages use `<main>`.
- Interactive controls use native buttons.
- FAQ buttons expose `aria-expanded`.
- External calendar links use `noopener noreferrer`.
- Markdown output is sanitized before `dangerouslySetInnerHTML`.

Issues:

- No `<main>` on diagnóstico, contact, pricing, blogs, blog details, case details, `/error`, and 404.
- Blog/case bodies are generic divs, not `<article>`.
- Breadcrumb is not `<nav aria-label="Breadcrumb">`.
- Contact labels have `htmlFor` but inputs/textarea lack IDs.
- Contact response has no live region and API validation is minimal.
- Footer “Developed by” points to `#`, opens a tab, and misspells `noopener` as `noopner`.
- Popular article and case author links point to `/#` rather than real destinations.
- Placeholder team social links point to `/#` and share generic accessible labels.
- No clickable non-interactive divs were identified in the targeted search.

### 7.4 Images

Active React UI uses `next/image`; raw `<img>` appears only inside case `.mdx` files.

| Category | Evidence | Assessment |
| --- | --- | --- |
| Informative with useful alt | Blog cards and case cards use title; team uses name | Good where content is real. |
| Logo | Header/footer use `alt="logo"` | Should identify Next Wrld or be empty when redundant. |
| Hero | `alt="hero"`; no `priority` | Weak alt and likely LCP risk. |
| About | `alt="about image"` | Generic; determine informative vs decorative. |
| Case detail | Generic translated `image/imagen` for cover and author | Should derive from case/person context. |
| Decorative shape | Footer uses `alt="shape"` | Should likely use empty alt. |
| Raw MDX images | Descriptive source alts | Pipeline does not enable raw HTML, so likely not rendered. |

Largest relevant assets found: `public/images/blog/blog-02.png` ~1.2 MB, `blog-details-01.jpg` ~700 KB, `blog-03.jpg` ~624 KB, `author-02.jpg` ~536 KB, and `blog-02.jpg` ~528 KB. Total `public/images` is ~4.9 MB. Usage, not directory total, determines delivered cost.

## 8. Content Audit

### 8.1 Current home content

| Section | Heading / message | CTA | Apparent purpose |
| --- | --- | --- | --- |
| Hero | “BIENVENIDO AL NUEVO ESTÁNDAR OPERATIVO”; transforms manual/disordered processes into clear, efficient, scalable systems | “Evoluciona tu operación” → `/#contact` | Establish operational-transformation promise. Initial HTML instead says `Loading...`. |
| Differential | “No somos una agencia de software. Somos tu socio de arquitectura.” Four pillars: business/product judgment, applied AI, continuous evolution, owned digital assets | None | Differentiate from software agency/feature factory. |
| Services | “La Oferta Clara”: operational systems, automation/applied AI, strategic evolution retainers | None | Define service categories. |
| About/vision | “El futuro pertenece a aquellos que se preparan hoy”; systemic execution and digital operations | “Casos de Éxito” | Establish worldview and proof path. |
| Process | No dedicated process section | None | Absent. Work model partially covers engagement, not delivery process. |
| Work model | “Modelo de Sociedad”: Cimentación Digital and Evolución & Escala | Contact and Google Calendar diagnosis | Explain project/retainer commercial model. |
| FAQ | Six questions; first three are website-agency questions, last three concern AI/integration/results | Disclosure only | Address objections, but half reflects old positioning. |
| Cases | “Casos de Éxito”; three operational/digital-system cases | Card links | Provide proof. Detail SEO delivery is broken. |
| Contact | Locations, emails, native contact form | “Enviar” | Generic lead capture. |
| Clients | None visible | None | Component returns `null` because data is empty. |
| Final CTA | Not rendered | None | `CallToAction` is imported but unused. |
| Footer | “La evolución no es un evento. Es un sistema en movimiento.” | Social/legal links | Brand close and legal navigation. |

### 8.2 What the site currently communicates

The active home largely communicates an architecture and operational-systems partner. It explicitly rejects the agency label and emphasizes business/product judgment, scalable digital backbones, owned systems, automation, and applied AI. However, public secondary routes and FAQ content dilute that message with web-development services, SaaS starter identity, generic digital transformation, and demo content.

## 9. Positioning Inconsistencies

| File / route | Text or concept | Positioning problem |
| --- | --- | --- |
| `src/i18n/es.ts:248-264`, `en.ts:254-266` / `/` | Website timelines, design revision rounds, website maintenance/backups | Communicates a web agency and project delivery shop. |
| `src/app/(site)/about/page.tsx:6-20` / `/about` | Play metadata, generic “About Us,” placeholder team | Communicates template/demo company, not Next Wrld. |
| `src/app/(site)/pricing/page.tsx:6-10` / `/pricing` | “Play SaaS Starter Kit” metadata | Search snippets contradict current product position. |
| `src/app/(site)/contact/page.tsx:5-9` / `/contact` | “Play SaaS Starter Kit” metadata | Public template identity. |
| `src/app/(site)/blogs/page.tsx:6-10` / `/blogs` | “Blog Grids | Play SaaS Starter Kit” | Public boilerplate identity. |
| `src/app/not-found.tsx:5-7`, `(site)/error/page.tsx:5-7` | Play starter 404 title | Template brand can surface on errors/indexation. |
| `markdown/blogs/bootstrap-templates.mdx` | Bootstrap template installation | Unrelated to operational systems/business architecture. |
| `markdown/blogs/contact-form.mdx` | FormBold/Bootstrap setup | Tutorial/template content, not strategic insights. |
| `markdown/blogs/blog-example-with-mdx-file.mdx` | Template blog/case hybrid with legacy author | Demo artifact presented as editorial content. |
| `src/components/Team/index.tsx` | Placeholder people, generic roles, Lorem Ipsum | Damages trust if `/about` is discovered. |
| `README.md:1-33,109-118` | SaaS starter, auth, Stripe, signup/login | Repository documentation describes a product that no longer exists. |
| `package.json:2` | Package name `play-nextjs` | Internal/template identity remains. |
| `markdown/success-cases/*/gym-access-os.mdx` | SaaS pricing/model and “features” language | May be valid case evidence, but can make Next Wrld sound like a generic SaaS vendor without framing. |
| `src/components/About/index.tsx:127-134` | “Transformación Digital” | Broad/generic phrase compared with the sharper operational-systems position. |

## 10. Success Cases Audit

### 10.1 Shared implementation

- Content lives in `markdown/success-cases/{es,en}/*.mdx`.
- `getAllSuccessCases` and `getSuccessCaseBySlug` synchronously read local files: `src/utils/markdown.ts:7-53`.
- `generateStaticParams` discovers three deduplicated slugs: `success-cases/[slug]/page.tsx:23-35`.
- Despite static params, page content is not read on the server. The browser requests a locale API after hydration.
- Metadata is identical for every case.
- Missing slugs are not converted to a server 404.
- Content is sanitized, but raw HTML and GFM tables in source are unsupported.
- Cards use case titles as alts and link correctly to each slug.
- Detail cover/author alts are generic; author links point to `/#`.

### 10.2 Case inventory

| Case | URL | Rendering | Metadata | Server-rendered content | Problems |
| --- | --- | --- | --- | --- | --- |
| AI sales engine / Chatbot | `/success-cases/chatbot` | Dynamic shell + client API | Generic shared | No | Initial `Cargando...`; raw external images unsupported; Markdown starts with H1; closing CTA is plain text. |
| InmoCRM | `/success-cases/crm` | Dynamic shell + client API | Generic shared | No | Initial `Cargando...`; raw image/HTML unsupported; no own title metadata; no server 404 behavior. |
| Gym Access OS | `/success-cases/gym-access-os` | Dynamic shell + client API | Generic shared | No | Initial `Cargando...`; Spanish date `2025-01-15` vs English `2024-01-15`; heading levels differ; GFM table unsupported; English contains visible editorial “CTA” heading. |

### 10.3 Blog / MDX infrastructure

Current blog URLs:

- `/blogs/blog-example-with-mdx-file`
- `/blogs/bootstrap-templates`
- `/blogs/contact-form`

The infrastructure can be reused for `/insights` because it already provides filesystem slugs, gray-matter frontmatter, sorting, server-side Markdown conversion, cards, and a detail layout. It is not currently true MDX: no JSX component compilation occurs, despite `.mdx` extensions and an installed `next-mdx-remote` package.

Reuse constraints:

- Replace demo content and template metadata.
- Add static params and complete metadata.
- Decide Markdown versus real MDX explicitly.
- Add GFM support if tables are required.
- Remove/fix newsletter, fake popular links, advertisement, and related-post logic.
- Ensure actual title appears in `<article>` and structured metadata.

## 11. Play Next.js Legacy

### 11.1 Classification table

| Element | Probable origin | Current use | Suggested action |
| --- | --- | --- | --- |
| App Router shell, Header/Footer, common sections | Play starter adapted | Real use | Refactor selectively |
| TailGrids/Tailwind visual system | Play/TailGrids | Real use | Keep pending redesign decision |
| About route + Team | Play starter | Public but placeholder | Remove or refactor before indexing |
| Pricing route shell | Play starter | Current business model is real | Refactor metadata/route intent |
| Contact page/component | Play starter adapted | Real lead form | Keep and harden |
| Blog route/components | Play starter | Technically live, content is demo | Refactor or keep noindexed until ready |
| Newsletter | Play starter | Visible, no functionality | Remove candidate |
| Popular article/ad sidebar | Play starter | Visible on demo blogs | Remove/refactor candidate |
| Auth / NextAuth pages and API | Play starter | Removed | Keep removed; clean stale docs/lock/schema |
| Prisma/PostgreSQL | Play starter | Removed | Remove residual stub/docs/schema |
| Stripe package | Play starter | No current use | Remove candidate after dependency review |
| `PricingBox` / `OfferList` / price type | Play starter payment UI | Unreferenced; calls missing API | Remove candidate |
| Axios | Supports dead payment UI only | No live use | Remove candidate with dead payment UI |
| Dashboard/SaaS account pages | Play starter | Absent | No action |
| Signin/signup/forgot-password | Play starter | Absent | No action; README cleanup only |
| Clients | Play starter | Rendered but always null | Remove/refactor candidate |
| Testimonials | Play starter | Unreferenced demo data | Remove candidate |
| Loader/PreLoader | Play starter | Unreferenced | Remove candidate |
| Prism package/global CSS | Play blog | Package unused; CSS global | Review; likely remove or scope |
| `next-mdx-remote`, `marked`, `remark-html` | Play/content experiments | Unused | Remove candidate after Markdown decision |
| `schema.json` | NextAuth/Prisma | Obsolete | Remove candidate |
| `prisma.config.ts` | Prisma removal stub | No runtime use | Remove candidate |
| `package-lock.json` | Older npm install | Stale Auth/Prisma graph | Choose package manager, then remove/regenerate appropriately |
| README and project summaries | Play/older project state | Materially inaccurate | Rewrite documentation |
| Public brand/team/footer assets | Play starter | Many unreferenced | Review before removal |

### 11.2 Keep

- App Router and TypeScript foundation.
- Tailwind CSS 4 and the current design system while redesign remains out of scope.
- Filesystem content loaders and sanitized Markdown concept.
- Contact API/email integration, after validation and abuse hardening.
- Current operational-systems copy sections and diagnóstico content.
- Case source files, after server-rendering and content cleanup.

### 11.3 Refactor

- Locale architecture and global providers.
- Home/diagnóstico heroes.
- Success-case detail route.
- Blog/insight content pipeline.
- Metadata, sitemap, robots, and semantic layouts.
- Header navigation, footer links, analytics, and contact form.

### 11.4 Remove candidates

- `PricingBox`, `OfferList`, `src/types/price.ts`, Axios.
- Stripe, `dotenv`, `marked`, `next-mdx-remote`, `remark-html`, Prism runtime, and likely Prism global CSS.
- `Loader`, `PreLoader`, `LanguageSync`, `HomeBlogSection`, `TagButton`, Testimonials.
- Empty Clients subtree if no client logos are planned.
- Placeholder Team data/components or the complete legacy `/about` route.
- `schema.json`, empty `prisma.config.ts`, stale project summaries, template screenshots/assets.
- One of the two lockfiles after package-manager selection.

### 11.5 Needs investigation

- Whether GTM already configures the same GA4 property.
- Whether public legacy routes receive traffic/backlinks before removal or redirects.
- Which public images are externally referenced or intentionally retained for future content.
- Deployment configuration, WAF/rate limiting, SMTP restrictions, and analytics consent behavior outside the repository.
- Whether TailGrids remains part of the intended design system.

## 12. Performance & Bundle Risks

1. `src/components/Hero/index.tsx` is 1,249 lines/~44 KB, mostly inline SVG, and is a Client Component. It withholds the LCP content/image until hydration.
2. The hero image lacks `priority`/fetch priority; fill images lack `sizes` in inspected components.
3. Both complete ES and EN resource files, including legal text, are imported into the shared client i18n singleton and can enter global client bundles.
4. Header and scroll-to-top register global scroll listeners; header's listener is non-passive and runs at scroll frequency.
5. The global provider mounts an unused toast system on every route.
6. GTM and direct GA scripts both load globally and may duplicate tracking.
7. Inter loads through a remote CSS `@import` with multiple weights instead of `next/font`, creating an external render-blocking chain.
8. Prism CSS loads globally although no highlighting runtime was found.
9. Success-case detail adds hydration plus one API request, and potentially a second fallback-locale request, before content appears.
10. Cookie-driven dynamic rendering removes static/CDN HTML caching from the entire commercial site.
11. Several large blog assets and many likely unused template assets remain in `public/images`.
12. Unused dependencies increase install/audit surface. Stripe, Axios, and content packages are notable candidates.

### Build result

`npm run build` was attempted without installing dependencies and failed immediately:

```text
> play-nextjs@2.2.2 build
> next build

sh: next: command not found
```

`node_modules` is absent, so no reliable local route table, bundle sizes, warnings, or generated rendering modes could be obtained. Dependencies were not installed because this audit forbids unnecessary installation and both lockfiles conflict.

## 13. Analytics & Conversion Tracking

### 13.1 Analytics

| Tool | Installed/loaded | Evidence | Status |
| --- | --- | --- | --- |
| Google Analytics 4 | Yes | `src/components/GoogleAnalytics.tsx`, root layout | Direct global page configuration. |
| Google Tag Manager | Yes | `src/components/GoogleTagManager.tsx`, root layout | Global GTM script and noscript iframe. |
| Vercel Analytics | No | No dependency/import | Absent. |
| Meta Pixel | No | No source evidence | Absent. |
| LinkedIn Insight Tag | No | No source evidence | Absent. |
| Hotjar | No | No source evidence | Absent. |
| Microsoft Clarity | No | No source evidence | Absent. |

No custom source-defined events were found for CTA clicks, calendar booking, form start/success/failure, case views, newsletter, language changes, or scroll depth. GTM container configuration is external, so events configured exclusively in GTM are **not verified**.

Both GA and GTM are loaded without repository-level consent gating. Duplicate GA pageviews are a risk if GTM also installs the same GA property; duplication is **not verified**.

### 13.2 CTA and form inventory

| CTA | Location | Destination | Technically functional | Observations |
| --- | --- | --- | --- | --- |
| Evoluciona tu operación | Home hero | `/#contact` | Yes after hydration | Missing from initial HTML. |
| Casos de Éxito | Home about | `/#success-cases` | Yes | Internal anchor. |
| Hablar sobre mi operación | Home pricing | `/#contact` | Yes | Generic form, no source field. |
| Agendar diagnóstico operativo | Home pricing | Google Calendar | Link works by code | External availability not verified; no event tracking. |
| Diagnóstico primary CTA | `/diagnostico` hero | Google Calendar | Link works after hydration | Missing from initial HTML; no event tracking. |
| Diagnóstico secondary CTA | `/diagnostico` hero | `#modelo-trabajo` via JS | Yes after hydration | Does not target diagnosis contact wrapper. |
| Diagnostic model CTAs | `/diagnostico` cards | Google Calendar | Link works by code | No tracking. |
| Contact submit | Home, `/contact`, `/diagnostico` | `/api/contact` | Implemented | SMTP/env delivery not verified; no source/context field. |
| Newsletter subscribe | Blog details | No action/handler | No | UI-only; no provider or persistence. |
| Email addresses | Contact | Displayed text | Not links | Not `mailto:` CTAs. |
| WhatsApp | None | None | No | No implementation found. |

The “diagnóstico operativo” concept is implemented in home pricing CTAs and the dedicated `/diagnostico` route. The dedicated page includes audience, review checklist, outcomes, model, booking links, and a customized contact wrapper. It is not linked from active navigation.

## 14. Security & Dependency Health

### 14.1 Dependency state

- No `node_modules` exists; all direct dependencies are locally missing.
- `pnpm-lock.yaml` is synchronized with `package.json` and is the best current dependency source.
- `package-lock.json` is stale and still contains NextAuth, Prisma, bcrypt, and adapter packages removed from the manifest.
- `package.json` has no `packageManager` field.
- Next runtime is `16.0.10`, while Next ESLint packages resolve to `16.2.12`.
- React runtime resolves to `19.2.3`, while React type packages are pinned to `19.1.x`.
- The lint script first invokes removed/stale `next lint` behavior and falls back with shell `||`.

`npm outdated` reported every package as `MISSING`; this describes the absent install, not deployed versions. It also showed newer releases, including Next `16.3.0`, but this audit does not recommend blind latest-version upgrades.

### 14.2 Audit results

`pnpm audit --lockfile-only` reported **98 advisories: 1 critical, 43 high, 47 moderate, 7 low** against the current lockfile on the audit date.

Important direct-path results:

- Next.js `16.0.10`: advisories include high-severity RSC request deserialization DoS fixed in `16.0.11`, plus later 16.x fixes.
- Axios `1.13.2`: multiple advisories; only used by dead payment UI.
- Nodemailer `7.0.12`: multiple advisories with patched versions in later majors.
- Stripe `14.25.0` pulls additional advisory surface despite no current use.
- `gray-matter` pulls vulnerable `js-yaml` 3.x advisories.
- PostCSS advisories affect transitive/current tool paths.
- The single critical `fast-xml-parser` path is introduced through `@types/nodemailer` → AWS SDK type dependencies, not verified runtime application code.

These counts are lockfile findings, not proof that every advisory is exploitable in this application. Each direct dependency and reachable code path requires triage. The separate `npm audit` used the stale npm lock and is not authoritative for the current project.

### 14.3 Application security findings

Positive:

- Contact email HTML values are escaped: `src/app/api/contact/route.ts:4-12,26-33`.
- Markdown output is sanitized.
- No current tracked environment files or obvious secret literals were found.
- SMTP variables are not `NEXT_PUBLIC_*`.

Risks:

- Success-case API query input controls a filesystem path segment without validation. Confirmed traversal from `markdown/success-cases` to `markdown/blogs` can disclose `.mdx` content through the JSON endpoint: `src/app/api/success-cases/[slug]/route.ts:10-20`, `src/utils/markdown.ts:19-28`.
- Contact endpoint has no rate limiting, CAPTCHA/honeypot, origin check, payload/length limits, or robust type/email validation.
- Contact 500 responses expose the raw exception message in `details`: `route.ts:45-55`.
- Missing SMTP configuration fails only at request time; there is no startup validation.
- `EMAIL_FROM` is used as both sender configuration and recipient, which may be intentional but is ambiguous.
- Analytics loads before any repository-level consent decision.
- No CSP/security-header configuration was found. Deployment-level headers are **not verified**.

## 15. Recommended Target Architecture

The proposed direction is appropriate for the current repository:

```text
Next.js App Router
Server Components by default
Static Rendering for commercial content
Client Components isolated to forms, disclosures, menus, theme, and animation
Filesystem Markdown/MDX for insights and cases where appropriate
Native Next.js metadata, sitemap, and robots
```

### Distance from target

| Target characteristic | Current distance | Why |
| --- | --- | --- |
| App Router | Already there | All routes are under `src/app`. |
| Server Components by default | Medium | Route files are mostly server, but translation hooks push most presentation into client graphs. |
| Static commercial rendering | Medium | Content is local/static-capable; root cookie and locale strategy force dynamic rendering globally. |
| Isolated client interactions | Medium | Contact/FAQ/menu need client behavior; many static sections do not. |
| Server-rendered cases | Small-to-medium | Loader and Markdown converter already exist; page must use them directly and generate metadata/notFound. |
| Insights content system | Medium | Reusable Markdown foundation exists, but public content/components/metadata are demo quality. |
| Native metadata/robots/sitemap | Medium | Framework supports it, but implementation is mostly absent and locale/canonical policy must be decided first. |
| Clean dependency surface | Medium | Current lock is reproducible, but stale lock and many dead packages/components remain. |

### Evolution versus rewrite

A rewrite is not justified by the evidence. The routing foundation, TypeScript setup, current home sections, local content loaders, contact endpoint, and design system can evolve in place. The critical changes are boundary changes rather than a new application: make locale identity explicit, restore server-rendered primary content, move case loading into the server route, add indexation primitives, and remove publicly exposed starter residue.

The largest architectural decision is localization. Cookie-selected language on one URL conflicts with immutable static HTML, stable canonicals, and clean language indexing. Resolve that decision before broad component conversion, because it determines routes, metadata, server content, sitemap entries, and migration redirects.

## 16. Prioritized Backlog

### P0 — Critical

#### P0.1 Block filesystem traversal in the success-case API

**Problem:** User-controlled `locale` is inserted into a filesystem path and can escape the intended success-case locale directory.  
**Evidence:** `src/app/api/success-cases/[slug]/route.ts:10-20`; `src/utils/markdown.ts:19-28`; runtime request `/api/success-cases/contact-form?locale=..%2Fblogs` returned HTTP 200 with blog content.  
**Files affected:** success-case route handler and Markdown content loader.  
**Suggested solution:** Allowlist only supported locale identifiers before any path construction, reject invalid values, and add traversal regression tests at both loader and route levels.  
**Complexity:** S  
**Risk:** High

#### P0.2 Server-render success-case content

**Problem:** Complete case articles are absent from initial HTML and depend on hydration plus an API request.  
**Evidence:** `src/app/(site)/success-cases/[slug]/page.tsx:17-20`; `src/components/SuccessCases/SuccessCaseContent.tsx:20-61,136-140`.  
**Files affected:** case page, case client component, Markdown utilities, case metadata.  
**Suggested solution:** Read and convert the local case in the Server Component, return `notFound()` for missing slugs, generate metadata from frontmatter, and isolate only genuine interactions.  
**Complexity:** M  
**Risk:** Medium

#### P0.3 Remove mount-gated loading H1s

**Problem:** Home and diagnóstico initial HTML expose `Loading...` instead of their primary heading/content.  
**Evidence:** `src/components/Hero/index.tsx:10-40`; `src/components/Diagnostico/Hero.tsx:9-34`.  
**Files affected:** both hero components and locale delivery.  
**Suggested solution:** Make the first render deterministic and meaningful; server-render translated hero content and isolate only smooth-scroll behavior.  
**Complexity:** M  
**Risk:** Medium

#### P0.4 Resolve supported Next.js version advisories

**Problem:** Current Next `16.0.10` is flagged by published security advisories, including an RSC DoS fixed in `16.0.11`.  
**Evidence:** `package.json:19`, `pnpm-lock.yaml:32-34`, `pnpm audit --lockfile-only`.  
**Files affected:** package manifest, chosen lockfile, build/runtime verification.  
**Suggested solution:** Triage advisories against deployment and update to a tested patched 16.x release in a dedicated dependency change; do not apply an unreviewed force update.  
**Complexity:** M  
**Risk:** High

#### P0.5 Establish robots and sitemap controls

**Problem:** Crawlers receive no repository-defined crawl policy or URL inventory, while legacy pages remain indexable.  
**Evidence:** No `robots.*` or `sitemap.*` files; route inventory above.  
**Files affected:** new native metadata files and route/content inventory.  
**Suggested solution:** Add native Next.js robots and sitemap only after deciding which legacy routes are publishable and defining canonical locale URLs.  
**Complexity:** M  
**Risk:** Medium

#### P0.6 Prevent contact endpoint abuse and information leakage

**Problem:** Public SMTP endpoint accepts minimally validated payloads without abuse controls and returns raw error details.  
**Evidence:** `src/app/api/contact/route.ts:14-55`.  
**Files affected:** contact route, form payload, environment/deployment controls.  
**Suggested solution:** Add schema/type/length/email validation, rate limiting or platform protection, honeypot/CAPTCHA as appropriate, origin policy, generic public errors, and monitoring.  
**Complexity:** M  
**Risk:** Medium

### P1 — High

#### P1.1 Decide locale URL and rendering architecture

**Problem:** Cookie/client locale on shared URLs forces dynamic rendering and allows metadata, lang, and body mismatches.  
**Evidence:** `src/app/layout.tsx:16-20`; `src/app/page.tsx:17-36`; `src/i18n.ts:19-48`; runtime samples.  
**Files affected:** routing, layout, metadata, i18n, links, sitemap, content directories.  
**Suggested solution:** Prefer explicit locale routes with stable server-rendered content, self-canonicals, and reciprocal alternates; define redirects and default locale deliberately.  
**Complexity:** L  
**Risk:** High

#### P1.2 Add coherent global and route metadata

**Problem:** Identity is fragmented; no metadata base/canonical/default social metadata exists, and public routes expose Play titles.  
**Evidence:** metadata matrix in section 7.1.  
**Files affected:** root layout, every public route, content frontmatter.  
**Suggested solution:** Define metadata base/title template/site identity, canonical/alternate policy, OG/Twitter defaults, and content-derived metadata.  
**Complexity:** M  
**Risk:** Medium

#### P1.3 Quarantine or replace public template routes

**Problem:** `/about`, `/blogs`, `/error`, and related content can damage brand trust and topical relevance.  
**Evidence:** Play metadata, placeholder Team, demo Markdown, normal `/error` route.  
**Files affected:** public route files, Team, blog content/components, navigation/sitemap.  
**Suggested solution:** Determine traffic/backlinks, then refactor, noindex temporarily, redirect, or remove each route intentionally.  
**Complexity:** M  
**Risk:** Medium

#### P1.4 Restore static rendering for commercial pages

**Problem:** Global `cookies()` makes every route private/no-store despite local content.  
**Evidence:** `src/app/layout.tsx:16`; production cache headers.  
**Files affected:** layout, locale routing, home metadata, privacy page.  
**Suggested solution:** Remove request-bound APIs from the shared static layout after locale architecture is established; validate route output through a production build.  
**Complexity:** M  
**Risk:** High

#### P1.5 Standardize the content pipeline

**Problem:** `.mdx` naming, installed packages, and source syntax imply MDX/GFM, but runtime processes plain Markdown without raw HTML or tables.  
**Evidence:** `src/utils/markdownToHtml.ts:1-12`; case raw HTML/tables; unused MDX packages.  
**Files affected:** Markdown utilities, all blog/case files, dependencies.  
**Suggested solution:** Choose genuine MDX or deliberate Markdown, support only needed syntax, keep sanitization, and migrate unsupported images/tables.  
**Complexity:** M  
**Risk:** Medium

#### P1.6 Fix indexable content hierarchy and semantics

**Problem:** Missing real article titles, generic case H1s, missing main/article/time/breadcrumb semantics, and inconsistent heading levels reduce clarity.  
**Evidence:** heading and semantic audits above.  
**Files affected:** shared breadcrumb, blog/case details, route wrappers, Markdown content.  
**Suggested solution:** Establish one descriptive H1 per page, article semantics, localized breadcrumbs, and normalized content heading levels.  
**Complexity:** M  
**Risk:** Low

#### P1.7 Choose one package manager and lockfile

**Problem:** pnpm and npm lockfiles disagree; builds/audits can install materially different trees.  
**Evidence:** current `pnpm-lock.yaml`; stale Auth/Prisma entries in `package-lock.json:7-37`; no `packageManager`.  
**Files affected:** package manifest, lockfiles, README/CI/deployment.  
**Suggested solution:** Confirm package manager, declare it, retain one synchronized lockfile, and make build/deploy use frozen installs.  
**Complexity:** S  
**Risk:** Medium

#### P1.8 Define conversion measurement

**Problem:** Core commercial actions have no source-defined event tracking; direct GA plus GTM may duplicate data.  
**Evidence:** analytics components only initialize scripts; no custom event calls found.  
**Files affected:** analytics architecture, CTA/form components, consent layer.  
**Suggested solution:** Select GTM-managed or direct GA ownership, verify external container, define stable CTA/form/case events, and add consent behavior.  
**Complexity:** M  
**Risk:** Medium

### P2 — Medium

#### P2.1 Reduce unnecessary Client Component boundaries

**Problem:** Static sections hydrate only to access translations.  
**Evidence:** client inventory in section 5.  
**Files affected:** Features, About, Pricing, diagnóstico sections, footer, legal content.  
**Suggested solution:** Resolve copy on the server and retain client islands only for interaction.  
**Complexity:** L  
**Risk:** Medium

#### P2.2 Replace inherited FAQ positioning

**Problem:** Three prominent FAQs sell website production/revisions/maintenance.  
**Evidence:** `src/i18n/es.ts:248-264`, `src/i18n/en.ts:254-266`.  
**Files affected:** ES/EN content resources and any future FAQ metadata.  
**Suggested solution:** Replace only after positioning/copy strategy is approved; preserve useful AI/integration objections.  
**Complexity:** S  
**Risk:** Low

#### P2.3 Fix form accessibility and context

**Problem:** Labels are not associated, status is not announced, and diagnosis/home/contact submissions are indistinguishable.  
**Evidence:** `Contact/index.tsx:154-242`.  
**Files affected:** Contact component and contact API/email template.  
**Suggested solution:** Add IDs/autocomplete/live status/field errors and a validated `source` field.  
**Complexity:** S  
**Risk:** Low

#### P2.4 Make newsletter functional or remove it

**Problem:** Public subscription form has no handler or persistence.  
**Evidence:** `src/components/Blog/Newsletter.tsx:13-29`.  
**Files affected:** newsletter component and possibly service/API integration.  
**Suggested solution:** Remove until an owned consent/data flow exists, or implement it with explicit measurement and privacy behavior.  
**Complexity:** S/M  
**Risk:** Low

#### P2.5 Clean dead dependencies and components

**Problem:** Dead starter code expands maintenance, audit noise, and accidental exposure.  
**Evidence:** remove candidates in section 11.4.  
**Files affected:** pricing/payment remnants, loaders, testimonials, clients, package manifest/lockfile.  
**Suggested solution:** Verify references and external needs, then remove in small reviewable units with build checks.  
**Complexity:** M  
**Risk:** Low

#### P2.6 Improve image loading and alternatives

**Problem:** Weak alts, unsupported case images, large assets, and missing responsive hints reduce accessibility/performance.  
**Evidence:** section 7.4 and asset sizes.  
**Files affected:** Hero, Header, Footer, About, case details/content, public images.  
**Suggested solution:** Classify decorative/informative images, write contextual alts, localize stable assets, add sizes/LCP priority, and remove unused assets after verification.  
**Complexity:** M  
**Risk:** Low

#### P2.7 Add structured data after content identity is stable

**Problem:** No Organization/WebSite/Article/Breadcrumb/FAQ schema exists.  
**Evidence:** no JSON-LD markers found.  
**Files affected:** root/site components and content routes.  
**Suggested solution:** Add only schemas supported by visible, final content after canonical and locale decisions.  
**Complexity:** M  
**Risk:** Low

### P3 — Nice to have

#### P3.1 Optimize font delivery

**Problem:** Remote Google Fonts CSS import adds an external render-blocking chain and loads many Inter weights.  
**Evidence:** `src/styles/index.css:1`.  
**Files affected:** root layout and global CSS.  
**Suggested solution:** Use `next/font` or owned local files and only required weights.  
**Complexity:** S  
**Risk:** Low

#### P3.2 Split or simplify oversized hero artwork

**Problem:** Hero is a 1,249-line client module dominated by inline SVG.  
**Evidence:** `src/components/Hero/index.tsx`.  
**Files affected:** Hero and assets.  
**Suggested solution:** Keep markup server-rendered and move stable decorative art to optimized assets or isolated presentation.  
**Complexity:** M  
**Risk:** Low

#### P3.3 Complete navigation and disclosure accessibility

**Problem:** Mobile nav, breadcrumb, FAQ, and skip navigation have smaller accessibility gaps.  
**Evidence:** section 7.3.  
**Files affected:** Header, Breadcrumb, FAQ, layout.  
**Suggested solution:** Add correct landmarks, labels, relationships, current state, and skip link.  
**Complexity:** S  
**Risk:** Low

#### P3.4 Remove unused public assets and stale documentation

**Problem:** Template images, screenshots, README content, and obsolete summaries obscure the current system.  
**Evidence:** `public/images` audit, `README.md`, `RESUMEN_PROYECTO.md`, `schema.json`.  
**Files affected:** public assets and repository docs.  
**Suggested solution:** Verify external references, then remove assets and rewrite documentation as separate maintenance work.  
**Complexity:** M  
**Risk:** Low

## Final answers to the audit questions

1. **Version/architecture:** Next.js `16.0.10`, React `19.2.3`, App Router, TypeScript, Tailwind 4, Node `>=20`.
2. **Play still in use:** visual/component foundation, route shells, TailGrids styles, blog/common components.
3. **Removal candidates:** dead payment/Stripe/Axios, unused Markdown packages, loaders, testimonials, empty clients, stale Prisma/Auth artifacts, demo content/assets, one lockfile.
4. **Routes:** 12 page patterns, three generated case URLs, two API routes, and global 404 are inventoried in section 4.
5. **Rendering:** all HTML routes are currently dynamic/no-store through root `cookies()`; case details additionally load content client-side.
6. **Why Loading appears:** explicit initial state branches in home/diagnóstico heroes and case content, not Suspense or `ssr:false`.
7. **Home prerender:** lower content is in initial HTML, but hero SEO content is not; whole route is request-rendered rather than static.
8. **Case HTML:** not available in initial HTML.
9. **Unnecessary clients:** most static translated sections; detailed in section 5.
10. **Metadata:** partial and inconsistent; several routes retain Play identity.
11. **Canonical:** none.
12. **Sitemap:** none.
13. **Robots:** none globally; blog detail has inconsistent per-page directives.
14. **Structured data:** none.
15. **Headings:** home/diagnóstico initial H1 is loading text; blog/case detail hierarchy is defective.
16. **Images/alts:** React uses `next/image`, but alts and loading hints are inconsistent; raw case images are unsupported.
17. **Old positioning:** FAQ, public template routes, demo blogs, Team, metadata, README, and some generic transformation language.
18. **MDX:** filesystem/frontmatter support exists, but current rendering is plain sanitized Markdown, not real MDX.
19. **Analytics:** GTM and direct GA4; no verified custom conversion events.
20. **Inherited dependencies:** Stripe, Axios, dotenv, marked, next-mdx-remote, remark-html, Prism runtime, toast provider, and some tooling are candidates.
21. **Security/obsolete risk:** the case API has confirmed filesystem traversal, current Next and lockfile dependencies have advisories, and the contact endpoint lacks abuse controls; no secrets were found in current tracked files.
22. **First corrections:** case initial HTML, loading H1s, Next advisories, robots/sitemap/indexation, and contact endpoint protection.
23. **SEO-first effort:** medium, dominated by locale architecture and component/content boundary work rather than framework replacement.
24. **Can evolve without rewrite:** yes.
25. **Initial Next Wrld 2.0 backlog:** prioritized in section 16.
