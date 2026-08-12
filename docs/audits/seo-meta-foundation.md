# Next Wrld — SEO Meta Infrastructure (Fase 4)

## Estado

**Implementada y desplegada 2026-08-12.** Metadata global y por ruta con canonical, alternates ES/EN recíprocos, Open Graph y Twitter; `robots.txt` y `sitemap.xml` verificables por HTTP; structured data (Organization/Article) publicada. Sin identidad Play.

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md) — Fase 4 (META).
- Previas: `security-foundation.md`, `localization-foundation.md`, `seo-rendering-foundation.md`.

## Implementación

### META-001 — Metadata global
- `src/app/site.ts`: `SITE_URL` (`https://nextwrld.com`, override por `NEXT_PUBLIC_SITE_URL`), `SITE_NAME`, `OG_DEFAULT_IMAGE`.
- `[locale]/layout.tsx` (root layout): `metadataBase`, `title` con `default: "Next Wrld"` y template `%s | Next Wrld`, descripción por defecto, `applicationName`/`creator`/`publisher` = Next Wrld, Open Graph (siteName, type, url) y Twitter (card summary_large_image) por defecto.
- Sin referencias a Play, boilerplate ni `Your Site Name`/`Your Author Name` en metadata.

### META-002/003/004 — Metadata por ruta (canonical + alternates + OG/Twitter)
- Helper `src/utils/seo.ts`: `siteUrl`, `localePath`, `localeUrl`, `localeAlternates` (canonical absoluto + lenguajes recíprocos es/en) y `buildPageMetadata` (title/description, canonical, alternates, OG con `es_ES`/`en_US`, Twitter).
- Todas las páginas indexables publican canonical absoluto autocanónico, alternates recíprocos ES/EN y OG/Twitter:
  `/es|en`, `/es|en/diagnostico`, `/es|en/contact`, `/es|en/pricing`, `/es|en/privacy-policy`, `/es|en/legal-notice`, `/es|en/terms-of-service`, `/es|en/success-cases/:slug`.
- Casos: `og:type = article`, imagen del `coverImage`; home/diagnóstico usan la imagen por defecto.
- Título del home en modo `absolute` (evita duplicar "Next Wrld" con el template); el resto usa el template.

### META-005 — Robots
- `src/app/robots.ts`: `User-Agent: *`, `Allow: /`, `Disallow: /api/`, `Host`, `Sitemap`. Las rutas heredadas retiradas devuelven 404 real (fuera del índice por no existir).

### META-006 — Sitemap
- `src/app/sitemap.ts`: las 7 rutas publicables × 2 locales + los casos de filesystem × 2 locales, con `lastModified`, `changeFrequency`, `priority` y alternates recíprocos. Excluye demos, errores, rutas obsoletas y contenido Play (no hay `/blogs`, `/about`, `/error`, `/fr`).

### META-007 — Structured data
- `Organization` (JSON-LD) en el root layout: name, url, `sameAs` (LinkedIn, X, Instagram).
- `Article` (JSON-LD) en cada página de caso: headline, description, datePublished, author/publisher Organization, mainEntityOfPage e image.
- `WebSite` y `BreadcrumbList`/`FAQPage` quedan pendientes de contenido final según META-007 (no se inventan equivalencias).

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 85/85 (incluye `tests/seo.test.ts`: robots, sitemap con alternates recíprocos y exclusión de demo/blog/error, y metadata por ruta con canonical absoluto + lenguajes + OG para las 8 páginas públicas).
- `pnpm test:e2e` → 1/1 (navegación ES/EN sin warnings de React; el JSON-LD en servidor no introduce script cliente).
- `pnpm build` → `/robots.txt` y `/sitemap.xml` estáticos; todas las rutas localizadas `● SSG`; solo `/api/contact` `ƒ`.

## Verificación local HTTP (`next start`)

| Verificación | Resultado |
| --- | --- |
| `/es` canonical | `rel="canonical" href="https://nextwrld.com/es"` |
| `/es` alternates | `hrefLang="es"` → `/es`, `hrefLang="en"` → `/en` |
| `/es/contact` `<title>` | `Contacto | Next Wrld` (template aplicado) |
| `/es` `<title>` | `Next Wrld – Preparando organizaciones…` (absolute, sin duplicar) |
| `/en` `og:locale` | `en_US` |
| `/es` `og:url` / `og:type` | `https://nextwrld.com/es` / `website` |
| Caso `og:type` | `article` |
| JSON-LD Organization / Article | presentes en servidor |
| `/robots.txt` | `Allow: /`, `Disallow: /api/`, `Host`, `Sitemap` |
| `/sitemap.xml` | 20 `<url>` (14 estáticas + 6 casos); sin `/blogs` |

## Gate META — Estado

- [x] Canonical autocanónico y absoluto en cada URL indexable.
- [x] Alternates recíprocos ES/EN en contenido equivalente (sin inventar ausencias).
- [x] `robots.txt` verificable por HTTP.
- [x] `sitemap.xml` verificable por HTTP, con variantes de idioma y sin demos/Play.
- [x] Metadata global y por ruta sin identidad Play (`Your Site Name`, etc.).
- [x] Open Graph y Twitter por página.
- [x] Structured data mínima publicada (Organization, Article); WebSite/Breadcrumb/FAQ aplazados por contenido.
