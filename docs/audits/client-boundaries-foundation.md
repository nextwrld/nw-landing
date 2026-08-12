# Next Wrld — Client Boundary Refactor (Fase 6)

## Estado

**Cerrada y desplegada 2026-08-12.** Auditoría de límites Server/Client: el contenido estático ya es Server Component (heredado de `I18N-006`); cada `"use client"` restante tiene una necesidad de navegador/interacción identificable (CLIENT-001 reducción completa; CLIENT-002 islas conservadas).

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md) — Fase 6 (CLIENT).
- ADR-002 (rendering strategy), `localization-foundation.md` (I18N-006).

## CLIENT-001 — Reducción de `"use client"`

Con `I18N-006` el contenido estático dejó de ser cliente. Las secciones que se renderizan en servidor con diccionarios en servidor son:

- Hero (home), Features (+ featuresData), About, Pricing, Faq (sección), SuccessCasesSection, Footer, CallToAction.
- Diagnóstico: Audience, Checklist, Outcomes, Modelo, ContactWrapper.
- Legal: PrivacyPolicyContent; páginas legal-notice y terms-of-service.
- PlanCard, SectionTitle, SingleSuccessCase, Clients, Breadcrumb.

## CLIENT-002 — Islas cliente conservadas (inventario)

| Componente | Necesidad de navegador/interacción |
| --- | --- |
| `providers.tsx` (ThemeProvider + Toaster) | Contexto de tema y toasts de UI (estado cliente) |
| `ThemeProvider.tsx` | Tema light/dark: `useLayoutEffect`, `localStorage`, clase en `<html>` |
| `Header/index.tsx` | Sticky nav (scroll), menú móvil, submenu, theme toggle |
| `LanguageSelector/index.tsx` | Navegación: `usePathname` + `router.push` con `replaceLocale` |
| `Contact/index.tsx` | Formulario: estado, validación, `fetch` a `/api/contact`, estados de envío |
| `Diagnostico/Hero.tsx` | Smooth scroll (`scrollIntoView`) |
| `Faq/SingleFaq.tsx` | Accordion (abrir/cerrar) |
| `ScrollUp.tsx` / `ScrollToTop.tsx` | Comportamiento de scroll |
| `GoogleAnalytics.tsx` / `GoogleTagManager.tsx` | Scripts de medición en el navegador |
| `NotFound/index.tsx` | Deriva el locale de `usePathname` (no hay params en el contexto not-found) |
| `hooks/useLocale.ts` | Hook que lee el primer segmento de `usePathname` (usado por islas) |

Patrón aplicado: `Server Section -> small Client Control`. No hay `"use client"` de página; la única capa cliente global es `providers.tsx` (contexto/temas/toasts), sin contenido SEO.

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 88/88.
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ`; `/robots.txt` y `/sitemap.xml` estáticos.
- `pnpm test:e2e` → 1/1 (navegación ES/EN sin warnings de React).

## Gate CLIENT — Estado

- [x] Cada `"use client"` restante tiene una necesidad de navegador/interacción identificable.
- [x] Contenido estático renderizado en servidor (sin hydration por traducciones).
- [x] Islas cliente limitadas a interacción real (CLIENT-002).
