# Next Wrld — Landing

Landing corporativa de **Next Wrld**, empresa de arquitectura digital y transformación operativa. Sitio estático, server-rendered, multidioma (`/es` y `/en`), SEO-first.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS 4**.
- **pnpm** como package manager único (`packageManager` fijado y `installCommand` frozen).
- Contenido en **Markdown + frontmatter** (`.md`) cargado en servidor (`src/utils/markdown.ts`) con validación de frontmatter.
- **Vitest** para tests unitarios y **Playwright** para regresión de navegación.
- Deploy en **Vercel** (integración GitHub).

## Rutas

```text
/            -> /es  (308)
/es          /en
/{locale}/diagnostico
/{locale}/contact
/{locale}/pricing
/{locale}/privacy-policy
/{locale}/legal-notice
/{locale}/terms-of-service
/{locale}/success-cases/:slug
/robots.txt  /sitemap.xml
```

Rutas retiradas (demo/Play) devuelven 404 real: `/about`, `/blogs`, `/error`.

## Arquitectura

- **Server Components por defecto**: el contenido estático se renderiza en servidor con diccionarios (`src/i18n/dictionaries.ts`, `es.ts`/`en.ts`).
- **Client islands** solo con interacción real: formulario de contacto, header/menú, selector de idioma, tema, accordion, scroll, analytics (GTM).
- Locale desde la URL (`params`); sin cookies ni `localStorage` en rendering.
- SEO: canonical absoluto, alternates recíprocos ES/EN, Open Graph/Twitter por página, robots y sitemap, JSON-LD (Organization/Article).

## Setup

```bash
pnpm install --frozen-lockfile
pnpm dev        # desarrollo
pnpm build      # build de producción
pnpm start      # servir el build
```

## Validación

```bash
pnpm lint       # eslint src
pnpm test       # vitest run (tests/**/*.test.ts)
pnpm test:e2e   # build + Playwright (tests/e2e/*.spec.ts, Chromium)
```

`pnpm test:e2e` requiere el navegador una vez: `pnpm exec playwright install chromium`.

## Variables de entorno

| Variable | Uso | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL base para canonical/sitemap | `https://nextwrld.com` |
| `NEXT_PUBLIC_GTM_ID` | Contenedor GTM | `GTM-NJJC2MGP` |
| `NEXT_PUBLIC_CALENDAR_URL` | Link de agendamiento | Calendly de diagnóstico |
| `EMAIL_FROM` / credenciales SMTP | Envío de `/api/contact` | — |

## Analytics

GTM como único cargador. Eventos de conversión publicados en `dataLayer` (`diagnosis_cta_click`, `calendar_booking_click`, `contact_form_start/submit/success/error`, `case_view`, `language_change`) con contexto (`page`, `locale`, `cta_location`, `case_slug`, `form_source`). Política de consentimiento en `docs/audits/analytics-consent.md`.

## Documentación

- Plan técnico y registro de progreso: `docs/planning/next-wrld-2-technical-plan.md`.
- Auditorías por fase: `docs/audits/`.
- Decisiones: `docs/architecture/ADR-00{1,2,3}.md`.
