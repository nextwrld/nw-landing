# ADR-003 - Markdown deliberado y contenido cargado en servidor

## Estado

**Aceptada para Next Wrld 2.0 Foundation.**

## Fecha

2026-08-10

## Contexto

Blogs y casos viven en archivos `.mdx`, pero el repositorio no ejecuta MDX. El pipeline actual usa `gray-matter`, `remark`, `remark-rehype`, `rehype-sanitize` y `rehype-stringify` para tratarlos como Markdown.

La auditoría confirmó:

- `next-mdx-remote`, `marked` y `remark-html` están instalados pero no se usan.
- Raw HTML e imágenes `<img>` de los casos no están habilitados por el pipeline.
- Tablas GFM no están soportadas.
- Los casos se leen a través de una API después de hydration.
- Blogs y casos usan modelos de entrega diferentes pese a compartir origen local.
- El parámetro `locale` no validado permitió filesystem traversal.

## Decisión

Foundation utilizará:

```text
Markdown
+ frontmatter validado
+ React layout
+ carga de filesystem en servidor/build
+ sanitización deliberada
```

No se adoptará MDX real hasta que exista una necesidad concreta de incluir componentes React dentro del contenido.

Los archivos podrán migrarse de `.mdx` a `.md` de forma incremental cuando loaders, rutas y build estén cubiertos por pruebas.

### Contenido server-side

Los casos e insights se leerán directamente desde Server Components o funciones server-only. No se expondrá una API interna para que la propia página recupere archivos locales después de hydration.

### Frontmatter mínimo de casos

```yaml
---
title: "InmoCRM"
description: "..."
slug: "crm"
date: "2024-06-12"
locale: "es"
---
```

Campos obligatorios:

- `title`.
- `description`.
- `slug`.
- `date`.
- `locale`.

Campos opcionales deben existir solo si un consumidor real los utiliza: `industry`, `cover`, `author`, `authorImage`, tags.

### Migración del contenido actual

Los seis casos existentes usan `excerpt` y derivan `slug` y `locale` de su ubicación. Antes de hacer obligatorio el nuevo contrato se realizará este mapping:

```text
excerpt -> description
filename -> slug
parent directory -> locale
coverImage -> cover, si el modelo adopta ese nombre
```

La migración debe comprobar pares ES/EN, fechas, slugs y campos requeridos. La validación estricta solo se activa cuando todos los archivos actuales cumplen el contrato o existe una transición explícita y temporal.

### Seguridad de paths

- Toda entrada de locale debe estar tipada y allowlisted.
- Todo slug debe validarse antes de acceso a disco.
- El path resuelto debe permanecer dentro del directorio esperado.
- Los loaders no deben aceptar path segments arbitrarios.
- Locale o slug inválido debe terminar en error controlado o `notFound()`.

### Sintaxis soportada

El pipeline solo debe habilitar sintaxis requerida por contenido real.

- GFM se agrega únicamente si se conservan tablas u otra sintaxis GFM.
- Raw HTML no se habilita como atajo para imágenes.
- Imágenes se representan mediante una convención segura y estable compatible con el renderer.
- La sanitización se conserva cuando se genera HTML.

## Consecuencias positivas

- Pipeline más pequeño y comprensible.
- Contenido disponible en raw HTML y static builds.
- Menos dependencias y superficie de ataque.
- Metadata derivable del mismo frontmatter.
- Semántica controlada por layouts React.
- Casos e insights pueden compartir infraestructura.

## Costes y riesgos

- Los archivos actuales contienen sintaxis que deberá migrarse.
- Renombrar extensiones requiere coordinar loaders, rutas y deployment.
- Agregar validación puede revelar frontmatter incompleto o inconsistente.
- Fechas y headings inconsistentes entre locales deben resolverse sin reescribir contenido fuera de alcance.
- Una futura necesidad de componentes embebidos podría justificar un ADR posterior para MDX real.

## Alternativas rechazadas

### Adoptar MDX real inmediatamente

Rechazado porque no existe una necesidad actual demostrada y agregaría complejidad durante una fase centrada en seguridad y SEO.

### Mantener `.mdx` como nombre aunque no se compile

Rechazado como estado objetivo porque comunica capacidades inexistentes. Puede mantenerse transitoriamente durante la migración.

### Habilitar raw HTML globalmente

Rechazado porque amplía superficie de seguridad y evita diseñar una convención de contenido clara.

### Guardar casos en base de datos o CMS

Rechazado por alcance y necesidad. El filesystem satisface el volumen y modelo editorial actuales.

## Layout semántico objetivo

```html
<main>
  <article>
    <header>
      <h1>Case title</h1>
      <time datetime="2026-01-01">...</time>
    </header>
    <!-- rendered Markdown body -->
  </article>
</main>
```

Breadcrumbs deben usar un `<nav aria-label="Breadcrumb">` separado del H1 del artículo.

## Plan de migración

1. Corregir traversal de locale/slug y tipar locales.
2. Definir schema/validator de frontmatter.
3. Migrar frontmatter de los seis casos existentes como prerrequisito `SEO-002A`.
4. Activar validación estricta con errores accionables.
5. Cargar casos desde Server Components en `SEO-003`.
6. Generar params, metadata y 404 en servidor.
7. Consolidar el contrato para casos e insights durante CONTENT.
8. Migrar raw HTML/imágenes/tablas a sintaxis soportada.
9. Eliminar API interna de lectura cuando no tenga consumidores.
10. Renombrar `.mdx` a `.md` en una unidad separada.
11. Remover dependencias sin uso después de build exitoso.
12. Reutilizar el pipeline para insights cuando Experience 2.0 lo requiera.

## Criterios de verificación

- [ ] Caso completo aparece en raw HTML.
- [ ] Frontmatter obligatorio se valida.
- [ ] Los seis casos actuales fueron migrados y conservan su URL/contenido.
- [ ] Locale y slug no pueden escapar del directorio permitido.
- [ ] Caso inexistente devuelve 404 real.
- [ ] Metadata deriva del mismo archivo de contenido.
- [ ] Imágenes y tablas necesarias se renderizan mediante sintaxis soportada.
- [ ] No quedan consumidores de la API interna antes de eliminarla.
- [ ] Dependencias MDX/Markdown sin uso se retiran con build exitoso.

## Relación con otros documentos

- Localización: [`ADR-001-locale-routing.md`](ADR-001-locale-routing.md)
- Rendering: [`ADR-002-rendering-strategy.md`](ADR-002-rendering-strategy.md)
- Evidencia: [`../audits/current-state-audit.md`](../audits/current-state-audit.md)
- Ejecución: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md)
