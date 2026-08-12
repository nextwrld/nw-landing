# Next Wrld — Localization Foundation (Fase 2)

## Estado

**Implementada y desplegada 2026-08-12** (commit `b7d3b29`, Vercel check `success`). URLs deterministas, `lang` correcto, selector navegable, redirects probados, locales generados en build y ninguna cookie decide contenido indexable.

## Entorno

| Campo | Valor |
| --- | --- |
| Commit | `b7d3b29` (`docs: record legacy URL localization matrix` `3cd5ff9` + `feat: introduce locale-routed URLs with deterministic copy`) |
| Node / pnpm | `v24.18.0` / `11.20.0` |
| Next.js | `16.3.0` |

## Implementación

- **Topología `[locale]`**: todas las páginas públicas bajo `src/app/[locale]/`. `[locale]/layout.tsx` es el root layout: valida el locale (`notFound()` si es desconocido), renderiza `<html lang>` desde params y `generateStaticParams()` devuelve exactamente `["es","en"]`. No hay `src/app/layout.tsx` superior. APIs (`/api/...`) y metadata routes quedan fuera del segmento.
- **Sin dependencias request-bound**: eliminados `cookies()` (layout, home, privacy), `headers()` (home), `localStorage` y listener `languageChanged` de `i18n.ts`, `changeLanguage` en `Providers` y `document.cookie` del selector. `suppressHydrationWarning` solo existe en `<html>` para reconciliar la clase de tema/`color-scheme` que `next-themes` aplica en cliente (requisito documentado del provider); no oculta diferencias de idioma porque `lang` proviene de `params.locale` de forma determinista.
- **Copy determinista por URL**: `useLocale()` lee el primer segmento de `usePathname()`; los componentes clientes llaman `useTranslation(ns, { lng: locale })` para que SSR y cliente rendericen el mismo idioma. `SuccessCaseContent` ya no tiene fallback cruzado ES/EN (el locale de la URL manda).
- **Diccionarios en servidor**: `getDictionary(locale)` en `src/i18n/dictionaries.ts`, usado en `generateMetadata` de home, diagnóstico, contacto, pricing, privacidad y casos. La migración de las secciones estáticas a props de diccionario en servidor (retirar `react-i18next` en cliente) queda registrada para Fase 6 (`CLIENT-001`) según ADR-002.
- **Redirects históricos**: matriz en `next.config.js` con `permanent: true` (308). Sin wildcard que capture `/api` ni `/images`. Query strings preservadas automáticamente.
- **Rutas retiradas**: `/about`, `/blogs`, `/blogs/:slug`, `/error` eliminadas del árbol → 404 real (matriz `REMOVE`).
- **Selector de idioma**: navega reemplazando el primer segmento (`/es/success-cases/crm` → `/en/success-cases/crm`), preservando query y hash; estado activo por `aria-pressed`; sin guard de mount.
- **Links internos localizados**: Header/menú, Footer, Breadcrumb, NotFound, CTAs (Hero, About, Pricing, CallToAction) y cards de casos usan `localizedPath`/`localizedHref`.
- **Casos**: `[locale]/success-cases/[slug]/page.tsx` genera params por locale×slug y resuelve `notFound()` en servidor; metadata deriva del frontmatter del caso.

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 72/72 (incluye `tests/localization.test.ts`: configuración de locales, helpers de URL, paridad de diccionarios ES/EN y matriz de redirects).
- `pnpm build` → rutas:

```text
/es, /en                        ● SSG
/{locale}/contact|diagnostico|legal-notice|pricing|privacy-policy|terms-of-service   ● SSG
/{locale}/success-cases/[slug]  ● SSG (es+en, 6 paths)
/api/contact, /api/success-cases/[slug]   ƒ Dynamic
```

## Verificación en producción (`https://nextwrld.com`)

| Verificación | Resultado |
| --- | --- |
| `/` `/contact` `/diagnostico` `/pricing` `/privacy-policy` `/legal-notice` `/terms-of-service` | 308 → `/es/...` |
| `/success-cases/crm` y `/success-cases/crm?ref=x` | 308 → `/es/success-cases/crm` (+ query preservada) |
| `/about` `/blogs` `/blogs/contact-form` `/error` `/fr` | 404 |
| `/es` `/en` + contacto/diagnóstico/casos en ambos | 200 |
| `<html lang>` | `es` en `/es`, `en` en `/en` |
| Body estable con `Cookie: language=en\|es` y `Accept-Language` | Confirmado (ES/EN no cambian) |
| `/api/success-cases/crm?locale=es`, `/api/contact` (POST inválido) | 200 / 400 (sin prefijo de locale) |

## Desviación registrada

- `I18N-006` (contenido estático sin `react-i18next` en cliente): los diccionarios en servidor existen y alimentan metadata, pero las secciones estáticas todavía se renderizan con `react-i18next` (determinista vía `lng` override). La migración completa a Server Components con props de diccionario se ejecuta en Fase 6 (`CLIENT-001`), como prevé ADR-002. No afecta al gate I18N (URLs deterministas, `lang`, selector, redirects, static generation, sin cookie).

## Gate I18N — Estado

- [x] `/es` siempre entrega español; `/en` siempre inglés (SSG, verificado en producción).
- [x] Cookies y `Accept-Language` no cambian el body de esas URLs.
- [x] `<html lang="es">` / `<html lang="en">` coinciden con la URL.
- [x] No se usa `suppressHydrationWarning` para ocultar diferencias de idioma (solo en `<html>` para el atributo de tema de `next-themes`).
- [x] `generateStaticParams()` genera exactamente los locales soportados.
- [x] La tabla de build registra `/es` y `/en` como estáticos (SSG).
- [x] `/` redirige a `/es` sin leer cookies o headers.
- [x] Cada ruta pública migrada tiene redirect probado (308, query preservada).
- [x] Links internos dejan de apuntar a URLs históricas.
- [x] Selector navega entre rutas equivalentes (cubierto por código + test de `replaceLocale`).
- [x] Locale inválido rechazado antes de acceder a contenido (404).