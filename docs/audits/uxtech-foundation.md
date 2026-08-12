# Next Wrld — Accesibilidad y performance (Fase 8)

## Estado

**Implementada y desplegada 2026-08-12.** Formulario accesible (labels/ids, `autocomplete`, errores por campo, `aria-live`), newsletter falsa ausente, imágenes con alts descriptivos/decorativos y `sizes`, LCP priorizado y fuente Inter self-hosted con `next/font`.

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md) — Fase 8 (UXTECH).

## UXTECH-001 — Formularios

`Contact` (isla cliente):

- IDs y labels conectados (`htmlFor`/`id`) en todos los campos.
- `autocomplete` apropiado: `name`, `email`, `tel`.
- Errores por campo con validación cliente (nombre, email, mensaje): mensaje bajo cada campo, `aria-invalid` y `aria-describedby` hacia el mensaje.
- Región de estado con `role="status"` y `aria-live="polite"`.
- `source` validado en servidor (SEC-003) y enviado como `form_source`.

## UXTECH-002 — Newsletter

- **Cerrado en CONTENT**: `Newsletter.tsx` (sin handler) fue eliminado junto al contenido demo. No hay newsletter sin infraestructura.

## UXTECH-003 — Imágenes

- Alts corregidos:
  - Logos (Header/Footer) → `alt="Next Wrld"`.
  - Hero de home → `alt=""` (decorativo) + `priority` (LCP) + `sizes`.
  - Imágenes de About → `alt=""` (decorativas) + `sizes`.
  - Cover de caso → `alt={title}` + `priority` (LCP del caso).
  - Autor (caso) y shape de footer → `alt=""` (decorativos).
  - 404 → alt descriptivo + `sizes`.
- `sizes` definido en las imágenes con `fill` (About, footer shape, 404).
- LCP priorizado: hero de home y cover de caso con `priority`.
- Imágenes de casos ya migradas a `next/image` (SEO).

## UXTECH-004 — Fuentes

- Inter movido de `@import` remoto (Google Fonts) a `next/font/google` (`src/app/fonts.ts`), self-hosted en build.
- `--font-sans` del theme apunta a `var(--font-inter)`; `body` usa `var(--font-sans)`.
- Sin dependencia de red en runtime para la fuente.

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 88/88.
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ`; fuentes woff2 self-hosted; sin `@import` a Google Fonts.
- Smoke local: HTML del formulario con `autoComplete`/`aria-invalid`; `aria-live` en la región de estado; woff2 presentes.

## Gate UXTECH — Estado

- [x] Formulario navegable/anunciado correctamente (labels, autocomplete, errores por campo, aria-live).
- [x] Newsletter falsa ausente (eliminada en CONTENT).
- [x] Riesgos evidentes de imagen/fuente resueltos (alts, sizes, LCP, next/font) o registrados.
