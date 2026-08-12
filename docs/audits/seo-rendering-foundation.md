# Next Wrld — SEO Rendering (Fase 3)

## Estado

**Implementada y desplegada 2026-08-12** (commits `322bb6c` + `b0380ff`, Vercel check `success`). Heroes y casos completos en raw HTML, sin placeholders de loading, y solo `/api/contact` permanece dinámico.

## Entorno

| Campo | Valor |
| --- | --- |
| Commits | `322bb6c` (heroes server-render), `b0380ff` (casos: frontmatter + server-render + API removida) |
| Next.js | `16.3.0` |
| Node / pnpm | `v24.18.0` / `11.20.0` |

## Implementación

### SEO-001 / SEO-002 — Heroes server-render
- Eliminado el guard `mounted` + `useState`/`useEffect` y el `<h1>Loading...</h1>` del Hero de home y del hero de diagnóstico.
- El HTML inicial incluye ahora H1, descripción, CTA e imagen/sub-headline.
- Copy determinista por URL (override `lng` de `useTranslation`); el botón de smooth scroll de diagnóstico permanece como único comportamiento cliente.

### SEO-002A / CONTENT-001 — Frontmatter normalizado y validado
- Migración mecánica de los seis casos (`excerpt` → `description`, `slug` persistido, `locale` persistido; se conserva `coverImage`, author, authorImage, tags, category).
- Fecha canónica de `gym-access-os` resuelta: `2025-08-01` en ES y EN (decisión del propietario).
- Fechas de `chatbot` citadas como string (`"2025-12-24"`) porque js-yaml parsea fechas sin comillas como objeto `Date`.
- `validateSuccessCaseFrontmatter` en `src/utils/frontmatter.ts`: valida `title`, `description`, `slug` == filename, `locale` == directorio, y `date` como fecha de calendario real. Lanza `FrontmatterError` con el path del archivo y motivo accionable.
- Validación conectada al loader (`getSuccessCaseBySlug`): un frontmatter inválido rompe tests y build de forma explícita.

### SEO-003 — Server-render de casos
- La página `[locale]/success-cases/[slug]` lee el caso en el Server Component, convierte Markdown a HTML (`markdownToHtml`) y renderiza en servidor con `<article>` semántico, imagen de portada, autor y fecha.
- `generateMetadata` deriva del frontmatter; slug inexistente → `notFound()`; `generateStaticParams` por locale×slug.
- Fecha renderizada con `parseISO` (evita el desplazamiento de zona horaria que mostraba `31 Jul 2025` para la fecha canónica).

### SEO-004 — API interna removida
- Eliminados `/api/success-cases/[slug]` y `SuccessCaseContent` (fetch cliente con fallback cruzado).
- `/api/contact` queda como única ruta dinámica legítima.
- Tests actualizados: los casos de la API se reemplazaron por cobertura del validador de frontmatter y carga de los seis casos publicados; se conservan los tests de seguridad de paths del loader.

## Verificación local

- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 67/67.
- `pnpm build` → todas las rutas localizadas `● SSG`; `/api/contact` `ƒ` dinámico. `/api/success-cases/[slug]` ya no existe.

## Verificación en producción (`https://nextwrld.com`)

| Verificación | Resultado |
| --- | --- |
| `/es` `/en` | H1 real del hero en raw HTML (ES y EN), sin `Loading` |
| `/es/diagnostico` `/en/diagnostico` | H1 real (ES/EN) en raw HTML, sin `Loading` |
| `/es/success-cases/crm` `/en/success-cases/crm` | `<article>` + headings/body completos en raw HTML, sin `Cargando` |
| `/es\|en/success-cases/gym-access-os` | Fecha canónica `01 Aug 2025` |
| `/api/success-cases/crm?locale=es` | 404 (API eliminada) |
| Slug inexistente | 404 real |
| `/api/contact` (payload inválido) | 400 (sigue funcional) |
| Placeholders `Loading...` / `Cargando...` | 0 en home, diagnóstico y casos (ES y EN) |

## Desviaciones

- Ninguna para el gate SEO. La normalización de headings dentro del Markdown de los casos (niveles H1/H2 inconsistentes) queda registrada como trabajo de contenido, fuera del alcance de esta fase (no se reescribió copy).

## Gate SEO — Estado

- [x] No existe `Loading...`/`Cargando...` como contenido SEO (heroes y casos).
- [x] Casos completos en raw HTML (nombre en metadata, descripción, headings y body).
- [x] El caso no depende de hydration para aparecer.
- [x] Slug inexistente devuelve 404 real.
- [x] Metadata deriva del frontmatter correcto.
- [x] ES y EN se generan para cada caso disponible.
- [x] Los seis casos cumplen el contrato mínimo de frontmatter (sin reescribir body ni copy).
- [x] Slug y locale del frontmatter coinciden con path y URL.
- [x] Frontmatter inválido falla de forma explícita durante tests/build.
- [x] Home, diagnóstico, legales y casos aparecen estáticos en el build.
- [x] API de lectura de casos eliminada; no quedan consumidores internos.