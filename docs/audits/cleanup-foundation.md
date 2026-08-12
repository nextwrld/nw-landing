# Next Wrld — Limpieza incremental del starter (Fase 9)

## Estado

**Implementada y desplegada 2026-08-12.** Código y dependencias muertas del starter eliminados en unidades coherentes, con lint/test/build verificados. README reescrito para representar el proyecto actual.

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md) — Fase 9 (CLEANUP).
- Residuales de SEC: axios/form-data vía PricingBox muerto, stripe/qs, Prism.

## Eliminado (con verificación de imports/referencias previa)

### Componentes muertos (sin import en ninguna ruta)
- `src/components/Testimonials/` (index + SingleTestimonial).
- `src/components/Team/` (index + SingleTeam).
- `src/components/Common/Loader.tsx`, `src/components/Common/PreLoader.tsx`.
- `src/components/Pricing/PricingBox.tsx` (único consumidor de `axios`), `src/components/Pricing/OfferList.tsx`.
- `src/components/Clients/` (data vacía; renderizaba `null`) y su uso en el home.

### Tipos/artefactos
- `src/types/price.ts`, `src/types/team.ts`, `src/types/testimonial.ts`, `src/types/client.ts`.
- `schema.json` (stub de Prisma/NextAuth; auth ya retirado).
- `src/styles/prism-vsc-dark-plus.css` (CSS de Prism sin runtime) y su import del layout.

### Dependencias
- `stripe` (+ `qs` transitivo), `axios` (+ `form-data`, `follow-redirects` transitivos), `prismjs`, `@types/prismjs`, `dotenv` (sin uso; Next carga `.env` nativamente), `marked`, `remark-html`, `next-mdx-remote` (ya retirados en CONTENT).

## Impacto en dependencias/seguridad

- `pnpm audit --lockfile-only`: **66 → 33** vulnerabilidades (2 low / 13 moderate / 17 high / 1 critical).
- El `critical` restante (`fast-xml-parser`, GHSA-m7jm-9gc2-mpf2) es solo dev/types vía `@types/nodemailer` (no bundle en runtime).
- High restantes documentados: `nodemailer` (uso real, sin `raw`/files), `js-yaml` vía `gray-matter` (frontmatter local/trusted), picomatch/brace-expansion/flatted (tooling transitivo).

## README

- Reescrito `README.md`: elimina el boilerplate de "Play Next.js" y describe Next Wrld (stack, rutas, arquitectura Server-first, comandos, env, analytics, docs).

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 88/88.
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ`; `/robots.txt` y `/sitemap.xml` estáticos.
- Sin referencias rotas a los módulos eliminados.

## Gate CLEANUP — Estado

- [x] Dependencias y artefactos principales eliminados sin mezclar cambios no relacionados.
- [x] README representa el proyecto actual.
- [x] Residuales de seguridad documentados (DoD Repository).
