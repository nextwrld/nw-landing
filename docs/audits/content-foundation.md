# Next Wrld — Content Infrastructure (Fase 5)

## Estado

**Implementada y desplegada 2026-08-12.** Pipeline de contenido consistente y validado: fuentes `.md` (sin `.mdx`), frontmatter validado en loader, GFM habilitado (las tablas son un requisito real del contenido), y demo/Play de blogs fuera del índice y del árbol.

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md) — Fase 5 (CONTENT).
- Previas: `seo-rendering-foundation.md` (SEO-002A normalizó el contrato), `localization-foundation.md` (matriz de URLs, `/blogs` → REMOVE).

## Implementación

### CONTENT-001 — Frontmatter común de casos
- Contrato ya normalizado en `SEO-002A` (`excerpt → description`, `slug` persistido, `locale` persistido; `date` canónica de `gym-access-os` resuelta a `2025-08-01`; fechas de `chatbot` como string por js-yaml).
- `validateSuccessCaseFrontmatter` (`src/utils/frontmatter.ts`) sigue validando `title`, `description`, `slug` == filename, `locale` == directorio y `date` calendárica real; conectado al loader, un frontmatter inválido rompe tests y build con el path del archivo.
- Sin divergencias de fecha pendientes entre pares ES/EN.

### CONTENT-002 — Markdown deliberado
- Renombrado de los seis casos de `.mdx` → `.md` (`git mv`), con validación completa (el validador sigue activo).
- `src/utils/markdown.ts` actualizado: `listSources` filtra `.md` y `resolveSuccessCasePath` resuelve `${slug}.md`.
- Dependencias MDX no utilizadas eliminadas: `next-mdx-remote`, `marked`, `remark-html`.
- **GFM añadido** (`remark-gfm`): los casos `gym-access-os` ES/EN contienen tablas (`| Flow | … |`), que sin GFM se renderizaban como texto literal. Dependencia nueva justificada por requisito real de contenido.
- No se habilita HTML arbitrario: el pipeline `remark → remark-rehype → rehype-sanitize → rehype-stringify` sanitiza la salida.

### CONTENT-003 — Semántica de contenido
- Cada página indexable tiene un H1 descriptivo (`<main>` + `<article>` + `<header>` con `<h1>` y `<time>` en casos; breadcrumb en `<nav aria-label="Breadcrumb">`).
- Verificado por tests de renderizado (`tests/success-cases-page.test.ts`: exactamente un H1 con el título, descripción y fecha visibles).

### CONTENT-004 — Cuarentena de contenido Play
- Decisiones por ruta ya registradas en la matriz de URLs (I18N): `/about`, `/blogs`, `/blogs/:slug`, `/error` → `REMOVE` (404 reales); `/pricing` → `REDIRECT` (contenido real preservado).
- Ejecutada la cuarentena de demo/Play: eliminados `markdown/blogs/*.mdx` (3 demo), los loaders de blog (`getPostSlugs`, `getPostBySlug`, `getAllPosts`), `src/types/blog.ts`, los componentes `src/components/Blog/` (HomeBlogSection, SingleBlog, Newsletter, PopularArticle, TagButton) y la sección `blog` del diccionario (sin consumidores).
- Sin cambio de copy en contenido real (casos intactos salvo el nivel de heading ya normalizado en SEO).

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 88/88 (incluye `tests/content.test.ts`: solo `.md` en `markdown/`, casos cargados desde `.md`, tablas GFM → `<table>`, sin sección `blog` en el diccionario).
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ`; `/robots.txt` y `/sitemap.xml` estáticos.
- Smoke local: `gym-access-os` renderiza `<table>` (tabla GFM), H1 correcto, `/es` y `/en` 200.

## Gate CONTENT — Estado

- [x] Pipeline consistente y validado (`.md`, frontmatter validado, GFM para tablas).
- [x] Demo/Play fuera del índice y del árbol (blogs removidos; rutas retiradas 404).
- [x] Contenido real preservado (seis casos intactos en ambos idiomas).
- [x] Frontmatter inválido falla de forma explícita durante tests/build.
