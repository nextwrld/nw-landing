# Next Wrld — Localization Foundation (Fase 2)

## Estado

**Implementada y desplegada 2026-08-12** (commit `b7d3b29`, Vercel check `success`). URLs deterministas, `lang` correcto, selector navegable, redirects probados, locales generados en build y ninguna cookie decide contenido indexable. **`I18N-006` cerrado:** el contenido estático ya no depende de `react-i18next` en cliente (Server Components con diccionarios en servidor; `react-i18next`/`i18next` eliminados de dependencias).

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
- **Diccionarios en servidor (I18N-006)**: `getDictionary(locale)` en `src/i18n/dictionaries.ts` es la única fuente de copy en runtime. El contenido estático se renderiza en Server Components y recibe slices tipados del diccionario por props (`dict.hero`, `dict.features`, `dict.pricing`, `dict.footer`, `dict.contact`, `dict.diagnostico.*`, etc.). Las islas cliente conservadas reciben el copy por props desde el servidor (Contact, Header con `menu`, Diagnostico/Hero, SingleFaq). Se eliminaron `react-i18next`, `i18next` y el init global `src/i18n.ts`. El único i18n en cliente es la navegación del selector (`useLocale` + `replaceLocale`).
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

- Ninguna para el gate I18N tras cerrar `I18N-006`: el contenido estático ya no depende de `react-i18next` en cliente; los diccionarios en servidor alimentan metadata y todas las secciones estáticas vía Server Components con props tipadas. Las islas cliente restantes tienen una necesidad de interacción real (formulario, menú, tema, selector, smooth scroll, FAQ accordion).

## Verificación de I18N-006 (cierre)

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 68/68 (incluye test de regresión que falla si `i18next`/`react-i18next` reaparecen en `package.json`).
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ` dinámico.
- Smoke local (`next start`): H1, menú, footer, diagnóstico, pricing, legales y contacto renderizan el copy correcto por locale en `/es` y `/en`; `<html lang>` correcto.
- Sin referencias a `react-i18next`, `useTranslation` ni `i18next` en `src/` ni `tests/`.

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
- [x] Contenido estático sin `react-i18next` en cliente (Server Components + diccionarios en servidor).