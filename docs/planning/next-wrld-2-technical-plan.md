# Next Wrld 2.0 - Technical Foundation Plan

## Estado

**Propuesto para implementación.** Este documento define el trabajo; no registra su ejecución.

## Objetivo

Evolucionar el repositorio actual hacia una base segura, SEO-first, server-rendered, mayormente estática, multidioma de forma determinista, medible y mantenible, sin reescribir la aplicación ni iniciar todavía el rediseño visual o de contenido de Next Wrld 2.0.

La evidencia de partida está en [`../audits/current-state-audit.md`](../audits/current-state-audit.md). El baseline reproducible se registrará al comenzar en [`../audits/pre-refactor-build.md`](../audits/pre-refactor-build.md).

## Resultado esperado

```text
Next.js 16.x soportado y parcheado
React 19
TypeScript
Tailwind CSS 4
App Router
  |
  +-- /es/... y /en/...
  +-- Server Components por defecto
  +-- Static Rendering para contenido comercial
  +-- Client islands para interacción real
  +-- Markdown + frontmatter para casos e insights
  +-- Metadata, canonical, hreflang, robots y sitemap nativos
  +-- Analytics y formularios con contexto de conversión
```

## Documentos de decisión

| Decisión | Documento | Estado |
| --- | --- | --- |
| El idioma forma parte de la URL | [`ADR-001-locale-routing.md`](../architecture/ADR-001-locale-routing.md) | Aceptada para Foundation |
| Server Components y Static Rendering por defecto | [`ADR-002-rendering-strategy.md`](../architecture/ADR-002-rendering-strategy.md) | Aceptada para Foundation |
| Markdown deliberado y contenido cargado en servidor | [`ADR-003-content-pipeline.md`](../architecture/ADR-003-content-pipeline.md) | Aceptada para Foundation |

## Alcance

### Incluido

- Baseline reproducible y package manager único.
- Correcciones críticas de seguridad.
- Actualización parcheada dentro de Next.js 16.x.
- Rutas explícitas `/es` y `/en`.
- Server rendering y static rendering del contenido comercial.
- Casos completos en HTML inicial.
- Infraestructura SEO técnica.
- Normalización del pipeline de contenido.
- Reducción de Client Components innecesarios.
- Analytics de conversión y contexto de formularios.
- Accesibilidad técnica y performance básica.
- Limpieza incremental del starter.

### Fuera de alcance

- Rediseño visual.
- Reescritura completa del copy.
- Nuevas páginas de servicios o industrias.
- CMS, base de datos, autenticación o Stripe.
- Nueva librería de animaciones.
- Reemplazo completo del design system.
- Implementación editorial de `/insights`.

## Principios obligatorios

1. Evolucionar el repositorio actual; no crear otro proyecto.
2. Mantener Next.js, App Router, TypeScript y Tailwind CSS 4.
3. No mezclar Foundation con Experience 2.0.
4. Utilizar Server Components por defecto.
5. Reservar Client Components para estado, eventos, efectos o APIs del navegador.
6. Incluir contenido SEO crítico en el HTML inicial.
7. Generar estáticamente las páginas comerciales cuando sea posible.
8. Usar la URL como fuente de verdad del idioma.
9. No usar cookies para decidir el HTML de una URL indexable.
10. Preferir capacidades nativas de Next.js y la plataforma.
11. Mantener el proyecto desplegable después de cada fase.
12. Evitar limpiezas masivas sin build y verificación entre cambios.
13. Priorizar seguridad e indexación sobre performance y estética.
14. Registrar toda desviación arquitectónica mediante ADR o actualización explícita del plan.

## Protocolo de ejecución

Cada fase debe seguir este ciclo:

1. Leer la auditoría, este plan y los ADR relacionados.
2. Confirmar el estado del worktree y los requisitos de deployment.
3. Ejecutar solamente las tareas de la fase activa.
4. Mantener cada cambio en una unidad revisable.
5. Ejecutar `pnpm lint` y `pnpm build` cuando el entorno esté preparado.
6. Ejecutar pruebas específicas y smoke tests de la fase.
7. Registrar resultados, desviaciones y riesgos residuales.
8. No iniciar la fase siguiente hasta cumplir el gate de salida.

Una fase bloqueada no se considera completada. Debe documentarse el bloqueo y conservarse el último estado desplegable.

## Mapa de dependencias

```text
F0 Baseline reproducible
  |
  v
SEC Seguridad
  |
  v
I18N Localización por URL
  |
  v
SEO Rendering e indexabilidad
  |
  v
META Infraestructura SEO
  |
  v
CONTENT Pipeline de contenido
  |
  v
CLIENT Límites Server/Client
  |
  v
DATA Medición
  |
  v
UXTECH Accesibilidad y performance
  |
  v
CLEANUP Limpieza incremental
  |
  v
EXPERIENCE Next Wrld 2.0
```

Dependencia que no debe invertirse sin una decisión documentada:

```text
Locale routing -> Static Rendering -> canonical/hreflang -> sitemap -> rediseño
```

## Fase 0 - Baseline reproducible

### F0.1 Estandarizar pnpm

**Problema:** `pnpm-lock.yaml` representa el manifest actual, mientras `package-lock.json` conserva dependencias eliminadas de Auth/Prisma. No existe `packageManager` declarado.

**Trabajo:**

- Confirmar que CI y deployment pueden usar pnpm.
- Declarar la versión de pnpm en `package.json`.
- Conservar `pnpm-lock.yaml`.
- Retirar `package-lock.json` solo después de verificar consumidores externos.
- Actualizar README y comandos operativos.
- Exigir instalaciones frozen en CI/deployment.

**Acceptance criteria:**

- [ ] Existe un solo lockfile activo.
- [ ] `pnpm install --frozen-lockfile` funciona en un checkout limpio.
- [ ] `pnpm lint` funciona.
- [ ] `pnpm build` funciona.
- [ ] Deployment usa el mismo package manager y lockfile.

### F0.2 Registrar baseline de build

Ejecutar, sin cambios arquitectónicos previos:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

Registrar comandos, entorno, errores, warnings, rutas, rendering modes y tamaños relevantes en [`../audits/pre-refactor-build.md`](../audits/pre-refactor-build.md).

### F0.3 Establecer comando canónico de tests

La auditoría no encontró test runner ni script `test`. Security Foundation exige pruebas de regresión, por lo que F0 debe establecer la capacidad mínima antes de implementar SEC-001.

**Trabajo:**

- Evaluar el mecanismo más pequeño compatible con Next.js 16, TypeScript y route handlers.
- Preferir herramientas ya transitivamente disponibles solo si pueden declararse y ejecutarse de forma reproducible.
- Agregar un script canónico `pnpm test`.
- Documentar estructura, naming y alcance de pruebas.
- Incluir una prueba mínima que demuestre que el runner detecta fallos.

**Acceptance criteria:**

- [ ] `pnpm test` existe y funciona en un checkout limpio.
- [ ] El comando devuelve non-zero ante una prueba fallida.
- [ ] Las fases posteriores no inventan comandos de prueba diferentes.
- [ ] Cualquier dependencia nueva tiene una justificación registrada.

**Gate F0:** instalación, lint, tests y build reproducibles. Si existe un bloqueo, debe documentarse con causa y owner, pero Fase 1 no puede comenzar hasta resolverlo.

## Fase 1 - Security First

Esta fase debe desplegarse antes de localización, SEO o limpieza.

### SEC-001 Corregir filesystem traversal

**Prioridad:** Critical  
**Complejidad:** S

**Evidencia:** `locale` entra desde query parameters en `src/app/api/success-cases/[slug]/route.ts` y llega a `join()` en `src/utils/markdown.ts`. La auditoría verificó acceso a contenido de `markdown/blogs` mediante traversal.

**Trabajo:**

- Definir el tipo `Locale = "es" | "en"` en una fuente única.
- Validar el locale antes de construir rutas.
- Resolver el path absoluto y verificar que permanezca dentro del directorio permitido.
- Rechazar locales desconocidos.
- Agregar pruebas de regresión para loader y route handler.

**Acceptance criteria:**

- [ ] `locale=es` funciona.
- [ ] `locale=en` funciona.
- [ ] `locale=../blogs` falla.
- [ ] `locale=../../` falla.
- [ ] `locale=foo` falla.
- [ ] `locale=` falla o adopta un default explícito antes del acceso a disco.
- [ ] Slugs con `..`, separadores codificados o traversal fallan antes de acceso a disco.
- [ ] Existe una prueba automática que falla sin la corrección.

### SEC-002 Actualizar Next.js dentro de 16.x

**Prioridad:** Critical  
**Complejidad:** M

**Trabajo:**

- Consultar advisories oficiales actuales.
- Elegir una versión 16.x soportada y parcheada.
- No realizar upgrade major.
- Actualizar manifest y lockfile.
- Ejecutar build y smoke tests.
- Registrar advisories aplicables y no aplicables.

**Acceptance criteria:**

- [ ] La versión elegida no permanece afectada por advisories conocidos aplicables.
- [ ] Build exitoso.
- [ ] Home, casos, formulario y selector de idioma funcionan.
- [ ] No se aplicó `audit fix --force` sin revisión.

### SEC-003 Endurecer `/api/contact`

**Prioridad:** Critical  
**Complejidad:** M

**Trabajo:**

- Validar estructura, tipos, email y longitudes.
- Rechazar campos inesperados cuando corresponda.
- Incorporar honeypot.
- Definir protección contra abuso/rate limiting según deployment.
- Devolver errores públicos genéricos.
- Separar logs internos de respuestas públicas.
- Agregar `source: home | contact | diagnostico`.
- Evitar exposición de excepciones, stack, SMTP o configuración.

**Acceptance criteria:**

- [ ] Payload inválido devuelve `400`.
- [ ] Honeypot activado no genera envío.
- [ ] Error SMTP no expone información interna.
- [ ] El email recibido identifica el origen.
- [ ] Casos válidos continúan enviándose.
- [ ] Existen pruebas para validación y sanitización de respuesta.
- [ ] Existe un control de abuso activo en el entorno de deployment, con owner identificado.
- [ ] La evidencia de verificación registra límites, respuesta esperada y mecanismo de observabilidad sin publicar secretos.

**Gate SEC:** traversal cerrado en producción, Next parcheado y endpoint de contacto endurecido.

## Fase 2 - Localization Foundation

### I18N-001 Fuente única de locales

Crear y reutilizar:

```ts
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
```

No mantener strings de locale dispersos cuando puedan derivarse de esta configuración.

### I18N-002 Introducir `[locale]`

Objetivo inicial:

```text
src/app/
├── [locale]/
│   ├── layout.tsx           # root layout; contiene html/body y lang por params
│   ├── page.tsx
│   ├── diagnostico/
│   ├── success-cases/
│   ├── contact/
│   └── ...
├── api/
├── robots.ts
└── sitemap.ts

next.config.js               # redirect estable / -> /es y redirects legacy
```

No se mantendrá un `src/app/layout.tsx` por encima del segmento porque no recibiría el locale necesario para `<html lang>`. `src/app/[locale]/layout.tsx` será el root layout y debe incluir `<html>` y `<body>`, validar params y ejecutar `notFound()` para idiomas desconocidos. Next.js permite un root layout dentro de un segmento dinámico. APIs y metadata routes no necesitan atravesar ese layout. La traducción de slugs internos queda fuera de esta fase.

Agregar `generateStaticParams()` en el root layout localizado para devolver todos los locales soportados. Esto permite que Next.js conozca `/es` y `/en` durante build y es prerrequisito para validar Static Rendering.

### I18N-003 Eliminar cookie como dependencia de rendering

- El root layout no debe usar `cookies()` para decidir contenido o `<html lang>`.
- El locale debe provenir de params.
- `/` debe redirigir de forma estable a `/es` mediante `next.config.js` o configuración de plataforma versionada, sin detección de idioma.
- No usar `Accept-Language` para cambiar el HTML canónico de `/`.

### I18N-003A Preservar URLs históricas

Antes de mover rutas, crear un inventario de todas las URLs públicas actuales y asignar destino localizado. Como mínimo:

```text
/diagnostico -> /es/diagnostico
/contact -> /es/contact
/success-cases/:slug -> /es/success-cases/:slug
```

Las rutas heredadas en cuarentena deben recibir una decisión `REDIRECT`, `TEMPORARY NOINDEX`, `REMOVE` o `KEEP`; no pueden desaparecer accidentalmente. Los redirects deben preservar path parameters, query strings cuando corresponda y autoridad SEO.

#### Matriz de URLs históricas (aprobada 2026-08-12)

| URL histórica | Decisión | Destino | HTTP | Query | Motivo |
| --- | --- | --- | --- | --- | --- |
| `/` | `REDIRECT` | `/es` | 308 | Preservar | Locale por defecto determinista |
| `/diagnostico` | `REDIRECT` | `/es/diagnostico` | 308 | Preservar | Página comercial vigente |
| `/contact` | `REDIRECT` | `/es/contact` | 308 | Preservar | Formulario vigente |
| `/pricing` | `REDIRECT` | `/es/pricing` | 308 | Preservar | Contenido comercial conservado |
| `/privacy-policy` | `REDIRECT` | `/es/privacy-policy` | 308 | Preservar | Página legal vigente |
| `/legal-notice` | `REDIRECT` | `/es/legal-notice` | 308 | Preservar | Página legal vigente |
| `/terms-of-service` | `REDIRECT` | `/es/terms-of-service` | 308 | Preservar | Página legal vigente |
| `/success-cases/:slug` | `REDIRECT` | `/es/success-cases/:slug` | 308 | Preservar | Casos disponibles en ES/EN |
| `/about` | `REMOVE` | Ninguno | 404 real | N/A | Contenido demo y equipo placeholder |
| `/blogs` | `REMOVE` | Ninguno | 404 real | N/A | Listado Play/demo sin estrategia editorial |
| `/blogs/:slug` | `REMOVE` | Ninguno | 404 real | N/A | Artículos demo; no se duplican en EN |
| `/error` | `REMOVE` | Ninguno | 404 real | N/A | Falso 404 servido como página normal |

**Rutas publicables** (creadas en ambos idiomas):

```text
/es
/en
/{locale}/diagnostico
/{locale}/contact
/{locale}/pricing
/{locale}/privacy-policy
/{locale}/legal-notice
/{locale}/terms-of-service
/{locale}/success-cases/:slug
```

No se crean: `/{locale}/about`, `/{locale}/blogs`, `/{locale}/blogs/:slug`, `/{locale}/error`.

**Reglas de implementación:**
- Redirects explícitos en `next.config.js`; sin wildcard que capture `/api` ni `/images`.
- Los redirects históricos siempre apuntan a español; `/en/...` se accede por navegación y selector.
- Los redirects dinámicos preservan `:slug` y query strings.
- Las rutas retiradas desaparecen del árbol App Router y devuelven el 404 nativo.
- Eliminar links internos hacia `/about`, `/blogs` y `/error`.
- El selector de idioma vuelve al home del locale destino cuando no existe equivalente.
- No conservar cookie ni `localStorage` como fuente del idioma.

**Acceptance criteria:**

- [x] Existe una matriz origen/destino/status para todas las rutas de la auditoría.
- [x] `/` redirige a `/es` sin leer cookies o headers.
- [x] Cada ruta pública migrada tiene redirect probado.
- [x] Links internos dejan de apuntar a URLs históricas.

### I18N-004 HTML determinista

**Acceptance criteria:**

- [x] `/es` siempre entrega español.
- [x] `/en` siempre entrega inglés.
- [x] Cookies y `Accept-Language` no cambian el body de esas URLs.
- [x] `<html lang="es">` en `/es`.
- [x] `<html lang="en">` en `/en`.
- [x] No se usa `suppressHydrationWarning` para ocultar diferencias de idioma.
- [x] `generateStaticParams()` genera exactamente los locales soportados.
- [x] La tabla de build registra el mode de `/es` y `/en`.

### I18N-005 Selector por navegación

El selector debe transformar la URL equivalente:

```text
/es/success-cases/crm -> /en/success-cases/crm
```

Puede guardar una preferencia auxiliar, pero debe navegar. Debe definir fallback para rutas que no tengan equivalente publicable.

### I18N-006 Diccionarios en servidor

Introducir `getDictionary(locale)` o una interfaz equivalente. El contenido estático no debe depender de `react-i18next` en cliente. Mantener traducción cliente solo donde exista una necesidad interactiva demostrada.

**Acceptance criteria:**

- [x] El contenido estático se renderiza en Server Components con diccionarios cargados en servidor.
- [x] `react-i18next`/`i18next` no se usan en contenido estático (eliminados de dependencias).
- [x] La traducción cliente se limita a islas con interacción real (formulario, menú, selector, tema, accordion, smooth scroll).

**Gate I18N:** URLs deterministas, `<html lang>` correcto, selector navegable, redirects históricos probados, locales generados durante build y ninguna cookie decidiendo contenido indexable.

## Fase 3 - Rendering e indexabilidad

### SEO-001 Server-render del hero de home

Eliminar el guard `mounted` y el H1 `Loading...`. El HTML inicial debe incluir H1, descripción, CTA e imagen/contenido principal.

### SEO-002 Server-render del hero de diagnóstico

Aplicar el mismo patrón. El smooth scrolling puede permanecer como una pequeña isla cliente; el contenido no.

### SEO-002A Normalizar el contrato mínimo de casos

Antes de server-renderizar casos, migrar mecánicamente los seis archivos actuales al frontmatter mínimo acordado en ADR-003:

```text
excerpt -> description
filename -> slug persistido
parent directory -> locale persistido
```

Conservar `coverImage` durante esta fase para evitar un rename sin valor funcional. Resolver o documentar discrepancias de fecha entre pares ES/EN. Activar validación estricta con errores accionables antes de que `SEO-003` consuma los archivos.

**Acceptance criteria:**

- [x] Los seis casos cumplen el contrato mínimo.
- [x] No se reescribe el body ni el copy editorial.
- [x] Slug y locale coinciden con path y URL.
- [x] Frontmatter inválido falla de forma explícita durante tests/build.

### SEO-003 Server-render de casos

Flujo objetivo:

```text
locale + slug
  -> loader de filesystem
  -> Markdown a HTML
  -> Server Component
  -> HTML inicial
```

Implementar `generateStaticParams`, `generateMetadata`, `notFound()` y contenido completo en servidor.

**Acceptance criteria:**

- [x] Raw HTML contiene nombre, descripción, headings y body del caso.
- [x] El caso no depende de hydration para aparecer.
- [x] Slug inexistente devuelve 404 real.
- [x] Metadata deriva del frontmatter correcto.
- [x] ES y EN se generan para cada caso disponible.

### SEO-004 Eliminar API de lectura de casos

Eliminar `/api/success-cases/[slug]` cuando no tenga consumidores legítimos. No mantener una API solo por compatibilidad interna inexistente.

### SEO-005 Recuperar Static Rendering

Validar mediante build de producción que home, diagnóstico, casos y páginas legales no sean dinámicas únicamente por idioma.

**Gate SEO:** no existe `Loading...`/`Cargando...` como contenido SEO; casos completos en raw HTML; rutas compatibles aparecen estáticas en el build.

## Fase 4 - Infraestructura SEO

Esta fase comienza cuando las URLs de locale son estables.

### META-001 Metadata global

Configurar `metadataBase`, title template, site name, descripción por defecto, creator, publisher, Open Graph y Twitter defaults.

Eliminar referencias públicas a Play, boilerplate, `Your Site Name` y `Your Author Name`.

### META-002 Metadata por ruta

Toda página indexable debe incluir title, description, canonical, Open Graph y Twitter. Casos e insights deben derivarlos de frontmatter.

### META-003 Canonicals

Cada URL indexable debe ser autocanónica y absoluta.

Las URLs localizadas que reciben redirects históricos deben publicar canonical de su URL localizada, nunca de la URL anterior.

### META-004 Alternates de idioma

Contenido equivalente debe publicar alternates recíprocos ES/EN. La ausencia de equivalente debe tratarse explícitamente, no inventarse.

### META-005 Robots

Crear `robots.ts`. No indexar temporalmente rutas heredadas que todavía no representen a Next Wrld.

### META-006 Sitemap

Crear `sitemap.ts` con páginas publicables y sus variantes de idioma. Excluir demos, errores, rutas obsoletas y contenido Play.

### META-007 Structured data

Agregar después de estabilizar contenido:

- `Organization`.
- `WebSite`.
- `BreadcrumbList`.
- `Article` para casos e insights.

Usar `FAQPage` solo si el contenido visible final y las políticas aplicables lo justifican.

**Gate META:** canonical, hreflang, robots y sitemap verificables por HTTP; metadata sin identidad Play.

## Fase 5 - Content Infrastructure

### CONTENT-001 Frontmatter común de casos

Campos mínimos:

```yaml
---
title: "InmoCRM"
description: "..."
slug: "crm"
date: "2024-06-12"
locale: "es"
---
```

`title`, `description`, `slug`, `date` y `locale` deben validarse. `industry`, `cover`, `author` y tags pueden ser opcionales según uso real.

La normalización mínima de estos campos se ejecuta como prerrequisito `SEO-002A`, antes del server-render de casos. Esta fase revisa y consolida el contrato para el futuro pipeline de casos e insights:

```text
excerpt -> description
filename -> slug persistido
parent directory -> locale persistido
coverImage -> cover, solo si se adopta el nuevo nombre
```

No activar validación obligatoria hasta migrar todos los casos o proporcionar una transición acotada y testeada.

**Acceptance criteria:**

- [ ] Los seis casos actuales conservan los campos obligatorios normalizados en `SEO-002A`.
- [ ] Slug y locale del frontmatter coinciden con su URL y ubicación.
- [ ] Divergencias de fecha entre idiomas quedan resueltas o documentadas.
- [ ] El build falla con un mensaje accionable ante frontmatter inválido.

### CONTENT-002 Markdown deliberado

- Mantener Markdown + frontmatter + React layout.
- Renombrar `.mdx` a `.md` cuando el cambio pueda hacerse con validación completa.
- Remover dependencias MDX no utilizadas.
- Agregar GFM solo si tablas u otra sintaxis son un requisito real.
- No habilitar HTML arbitrario para resolver imágenes existentes.

### CONTENT-003 Semántica de contenido

```html
<main>
  <article>
    <header>
      <h1>...</h1>
      <time>...</time>
    </header>
  </article>
</main>
```

Breadcrumbs deben usar `<nav aria-label="Breadcrumb">`. Cada página indexable debe tener un H1 descriptivo.

### CONTENT-004 Cuarentena de contenido Play

Revisar `/about`, `/blogs`, `/error`, `/pricing` y cualquier otra ruta heredada. Registrar una decisión por ruta:

```text
KEEP | REFACTOR | REDIRECT | REMOVE | TEMPORARY NOINDEX
```

No escribir el nuevo copy de Experience 2.0 durante esta fase.

**Gate CONTENT:** pipeline consistente y validado; demo/Play fuera del índice; contenido real preservado.

## Fase 6 - Client Boundary Refactor

### CLIENT-001 Reducir `"use client"`

Auditar después de resolver localización:

- Features.
- About.
- Pricing.
- Secciones de diagnóstico.
- Footer.
- Legal.
- Hero.

Las traducciones no justifican por sí solas hydration.

### CLIENT-002 Conservar client islands reales

- ContactForm.
- MobileMenu.
- ThemeToggle.
- LanguageSwitcher.
- FaqDisclosure.
- Scroll behavior.
- Controladores de animación interactiva.

Preferir `Server Section -> small Client Control`.

**Gate CLIENT:** cada `"use client"` restante tiene una necesidad de navegador/interacción identificable.

## Fase 7 - Analytics y conversión

### DATA-001 Resolver GA4 versus GTM

Verificar el contenedor externo y elegir un owner. Preferencia: GTM administra GA4 y futuras etiquetas si el contenedor tiene ownership y gobierno claros. No cargar ambos sin una razón documentada.

### DATA-002 Eventos estables

```text
diagnosis_cta_click
calendar_booking_click
contact_form_start
contact_form_submit
contact_form_success
contact_form_error
case_view
language_change
```

Contexto cuando corresponda:

```text
page
locale
cta_location
case_slug
form_source
```

No usar el copy visible como identificador de evento.

### DATA-003 Consentimiento

Documentar mercados, base legal, categorías y momento de ejecución antes de ampliar tracking.

**Gate DATA:** una sola estrategia de carga, eventos verificables y política de consentimiento documentada.

## Fase 8 - Accesibilidad y performance

### UXTECH-001 Formularios

- IDs y labels conectados.
- `autocomplete` apropiado.
- Errores por campo.
- Estado accesible mediante `aria-live` cuando corresponda.
- `source` validado.

### UXTECH-002 Newsletter

Eliminar temporalmente la newsletter sin handler. No crear infraestructura hasta que Insights tenga una estrategia real.

### UXTECH-003 Imágenes

- Corregir alts genéricos.
- Marcar imágenes decorativas con alt vacío.
- Definir `sizes`.
- Priorizar el LCP real.
- Optimizar assets pesados.
- Migrar imágenes de casos a una sintaxis soportada.

### UXTECH-004 Fuentes

Mover Inter desde CSS remoto a `next/font` durante la pasada de performance. No bloquear Security ni SEO Foundation por este trabajo.

**Gate UXTECH:** formulario navegable/anunciado correctamente, newsletter falsa ausente y riesgos evidentes de imagen/fuente resueltos o registrados.

## Fase 9 - Limpieza incremental del starter

Candidatos iniciales:

```text
Stripe
Axios
PricingBox
OfferList
price types
Loader
PreLoader
Testimonials
empty Clients
placeholder Team
Prisma stub
schema.json
unused MDX packages
marked
remark-html
unused Prism runtime/CSS
demo blog content
template images
stale docs
```

Antes de eliminar cada candidato:

1. Buscar imports y referencias dinámicas.
2. Confirmar que ninguna ruta o deployment lo necesita.
3. Eliminar una unidad coherente.
4. Ejecutar lint/build/smoke tests.

**Gate CLEANUP:** dependencias y artefactos principales eliminados sin mezclar cambios no relacionados.

## Fase 10 - Frontera con Experience 2.0

Foundation termina antes de implementar:

- Homepage 2.0.
- Diagnóstico 2.0.
- Services.
- Industries.
- Success Cases rediseñados.
- Insights.
- About / Founders.
- FAQ nuevo.
- Navigation y conversion journey rediseñados.

El FAQ actual debe marcarse para Experience 2.0 porque todavía incluye creación de sitios, rondas de revisión y mantenimiento web. No se reemplaza dentro de Foundation.

## Estrategia de work units y commits

Secuencia de referencia:

```text
chore: standardize pnpm project setup
fix: validate success case locale paths
fix: harden contact endpoint
chore: update next within supported branch
refactor: introduce explicit locale routing
refactor: server render translated hero content
refactor: server render success case pages
refactor: restore static rendering for commercial pages
feat: add canonical and locale metadata
feat: add robots and sitemap
refactor: standardize markdown content pipeline
refactor: reduce unnecessary client boundaries
feat: add conversion analytics
fix: improve form accessibility
chore: remove legacy play dependencies
chore: remove unused starter assets and docs
```

Cada unidad debe compilar, conservar rutas necesarias, incluir pruebas relevantes, ser revisable y poder revertirse cuando sea razonable. La secuencia puede dividirse en más commits; no debe comprimirse en un único PR.

## Smoke tests obligatorios

Después de cada fase relevante:

```bash
pnpm lint
pnpm build
```

Después de deployment:

```bash
curl -I https://nextwrld.com/es
curl -I https://nextwrld.com/en
curl -s https://nextwrld.com/es
curl -s https://nextwrld.com/en
curl -s https://nextwrld.com/es/success-cases/crm
curl -s https://nextwrld.com/robots.txt
curl -s https://nextwrld.com/sitemap.xml
```

Checklist funcional:

- [ ] H1 real en raw HTML.
- [ ] Body del caso en raw HTML.
- [ ] `lang` correcto.
- [ ] Canonical correcto.
- [ ] Alternates recíprocos correctos.
- [ ] Metadata correcta.
- [ ] No aparece `Loading...`.
- [ ] No aparece `Cargando...`.
- [ ] No aparece `Play SaaS`.
- [ ] No aparece `Your Site Name`.
- [ ] Robots disponible.
- [ ] Sitemap disponible.

Checklist de seguridad:

- [ ] `locale=../blogs` rechazado.
- [ ] Locale inválido rechazado.
- [ ] Slug con traversal o separadores codificados rechazado.
- [ ] Caso inexistente devuelve 404 real.
- [ ] Payload de contacto inválido devuelve 400.
- [ ] Errores internos no se exponen.

## Definition of Done - Foundation

### Security

- [ ] Directory traversal corregido y cubierto por pruebas.
- [ ] Next.js está en una versión 16.x soportada y parcheada.
- [ ] Formulario endurecido.
- [ ] No se exponen errores internos.

### Rendering

- [ ] `/es` y `/en` entregan hero completo sin JavaScript.
- [ ] Diagnóstico entrega contenido real sin JavaScript.
- [ ] Casos completos existen en raw HTML.
- [ ] No hay loading text como contenido SEO.

### Localization

- [ ] Locale proviene de URL.
- [ ] `<html lang>` corresponde a URL.
- [ ] Cookies no deciden contenido.
- [ ] Selector navega entre idiomas.
- [ ] URLs históricas tienen redirect o decisión explícita verificada.

### Static

- [ ] Contenido comercial no depende de request rendering innecesario.
- [ ] Páginas compatibles se generan estáticamente.

### SEO

- [ ] Metadata global y por página.
- [ ] Canonical y hreflang.
- [ ] Open Graph y Twitter metadata.
- [ ] Robots y sitemap.
- [ ] Headings y HTML semántico correctos.

### Content

- [ ] Casos usan pipeline server-side consistente.
- [ ] Demo Play no es indexable.
- [ ] Identidad Play no se expone públicamente.

### Analytics

- [ ] Existe una sola estrategia GA/GTM.
- [ ] Eventos de conversión definidos y verificados.
- [ ] Formularios distinguen source.

### Repository

- [ ] Un package manager y un lockfile.
- [ ] Build reproducible.
- [ ] Dependencias muertas principales removidas.
- [ ] README representa el proyecto actual.

## Restricciones para agentes implementadores

1. Trabajar fase por fase.
2. Leer auditoría, plan y ADR antes de modificar.
3. Verificar referencias antes de eliminar.
4. No inventar páginas ni nuevo copy.
5. No rediseñar componentes durante Foundation.
6. Conservar la identidad visual actual.
7. No migrar de Next.js.
8. No añadir CMS, base de datos, auth o Stripe.
9. No añadir librerías de animación.
10. No resolver en cliente un problema que pueda resolverse en servidor.
11. Ejecutar build al cerrar cada fase.
12. Documentar cualquier desviación.
13. Corregir hallazgos nuevos fuera de alcance solo si afectan seguridad, build o integridad.

## Registro de progreso

| Fase | Estado | Evidencia de cierre | Desviaciones |
| --- | --- | --- | --- |
| F0 Baseline | Implementada y desplegada | `pre-refactor-build.md` + checkout limpio `e526adb` + deployment Vercel success + smoke tests 200 | pnpm lint normalizado a `eslint src` (next lint eliminado en Next 16); build scripts de sharp/unrs-resolver aprobados vía `pnpm-workspace.yaml`; verificación en checkout limpio y deployment completados el 2026-08-12 |
| SEC Security | Implementada y desplegada | `security-foundation.md` + commit `486cbe8` + deployment Vercel success + smoke prod 200/400/404 + WAF 429 (`x-vercel-mitigated: deny`) | Errores públicos del contacto unificados en `Invalid request` (SEC-003); audit reproducible confirma 0 advisories aplicables a `next@16.3.0`. Pendiente del owner: confirmar el predicado exacto de la regla WAF (`POST` documentado, pero se observó 429 también en `GET`) |
| I18N Localization | Implementada y desplegada | `localization-foundation.md` + commits `3cd5ff9`/`b7d3b29` + deployment Vercel success + smoke prod (308/404/200, `lang`, determinismo con cookies y `Accept-Language`) | `I18N-006` cerrado: contenido estático migrado a Server Components con diccionarios en servidor; `react-i18next`/`i18next` eliminados de dependencias y del init global. Sin desviaciones pendientes |
| SEO Rendering | Implementada y desplegada | `seo-rendering-foundation.md` + commits `322bb6c`/`b0380ff` + deployment Vercel success + raw HTML heroes/casos sin loading + API de casos 404 | Fecha canónica de `gym-access-os` = `2025-08-01`; normalización de headings internos de casos queda para trabajo de contenido |
| META SEO | Pendiente | HTTP metadata/robots/sitemap | - |
| CONTENT Pipeline | Pendiente | content tests + build | - |
| CLIENT Boundaries | Pendiente | client inventory + build | - |
| DATA Analytics | Pendiente | event verification | - |
| UXTECH | Pendiente | accessibility/performance checks | - |
| CLEANUP | Pendiente | dependency/reference verification | - |
| EXPERIENCE | Fuera de Foundation | Documento futuro | - |
