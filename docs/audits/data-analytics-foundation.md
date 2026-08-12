# Next Wrld — Analytics y conversión (Fase 7)

## Estado

**Implementada y desplegada 2026-08-12.** Estrategia de carga única (GTM), eventos de conversión publicados en `dataLayer` con contexto, y política de consentimiento registrada.

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md) — Fase 7 (DATA).
- `analytics-consent.md` (DATA-003).

## DATA-001 — Estrategia de carga (owner confirmado)

- Decisión del owner (2026-08-12): **GTM como único loader**. El contenedor `GTM-NJJC2MGP` es el que administra la medición (incluida GA4).
- Eliminado el cargador directo de GA4 (`GoogleAnalytics.tsx` y `GA_ID`). El layout carga solo `GoogleTagManager` (`afterInteractive`).
- Los eventos se publican en `dataLayer` (lenguaje nativo de GTM).

## DATA-002 — Eventos estables

`src/utils/analytics.ts` expone `trackEvent(event, params)` (publica en `window.dataLayer`; guard de SSR).

| Evento | Dónde | Contexto |
| --- | --- | --- |
| `diagnosis_cta_click` | Hero de diagnóstico (CTA primaria) | `cta_location: "hero"` |
| `calendar_booking_click` | PlanCard de pricing (plan2) y modelo de diagnóstico (ambos) | `cta_location: "pricing" \| "modelo"` |
| `contact_form_start` | Contact (primer cambio de campo) | `form_source: home \| contact \| diagnostico` |
| `contact_form_submit` | Contact (submit) | `form_source` |
| `contact_form_success` | Contact (respuesta ok) | `form_source` |
| `contact_form_error` | Contact (400/error de red) | `form_source` |
| `case_view` | Página de caso (`CaseViewTracker`) | `case_slug`, `locale` |
| `language_change` | LanguageSelector | `from_locale`, `to_locale`, `page` |

- No se usa copy visible como identificador de evento.
- `TrackedLink` (isla cliente) permite disparar eventos desde CTAs renderizados en servidor (`PlanCard`), pasando `event`/`params` serializables.

## DATA-003 — Consentimiento

- Política registrada en `docs/audits/analytics-consent.md`: mercados, base legal (interés legítimo/consentimiento según región), categorías (sin PII en eventos), momento de ejecución (post-interacción, `afterInteractive`, no bloquea render).
- Pendiente de contenido final: banner de consentimiento EEA (fuera de Foundation).

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 88/88.
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ`.
- `pnpm test:e2e` → 1/1.
- Smoke: `dataLayer` recibe eventos en interacciones (se verifica por consola en el flujo E2E/manual); GTM único en el layout (sin doble carga).

## Gate DATA — Estado

- [x] Estrategia de carga única (GTM), con owner confirmado.
- [x] Eventos de conversión definidos, implementados y verificables en `dataLayer`.
- [x] Formularios distinguen `source` (`form_source`).
- [x] Política de consentimiento documentada.
