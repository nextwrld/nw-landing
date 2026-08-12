# ADR-001 - Locale routing explícito

## Estado

**Aceptada para Next Wrld 2.0 Foundation.**

## Fecha

2026-08-10

## Contexto

El sitio actual sirve español e inglés en las mismas URLs. El idioma se determina mediante una combinación de cookie, `Accept-Language`, un singleton de `i18next`, estado cliente y `localStorage`.

La auditoría confirmó consecuencias concretas:

- El root layout usa `cookies()` y vuelve dinámicas todas las rutas HTML.
- Metadata, `<html lang>` y body pueden representar idiomas diferentes.
- El contenido cambia después de hydration.
- Una URL no identifica de forma estable una versión lingüística.
- Canonical, hreflang, sitemap y static rendering no pueden definirse limpiamente.

## Decisión

El locale formará parte de todas las URLs públicas indexables:

```text
/es/...
/en/...
```

La URL será la única fuente de verdad del idioma del HTML y de su metadata.

```ts
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
```

### Ruta raíz

`/` redirigirá de forma estable a `/es` mediante `next.config.js` o una regla de plataforma versionada equivalente.

No se utilizará detección obligatoria de `Accept-Language` para decidir qué contenido representa `/`. Esta decisión prioriza URLs deterministas, cacheables y verificables.

### Topología de root layout

`src/app/[locale]/layout.tsx` será el root layout de las páginas públicas. Debe contener `<html>` y `<body>` y establecer `lang` desde `params.locale`.

El mismo layout exportará `generateStaticParams()` con todos los locales soportados para que Next.js pueda generar las variantes durante build.

```text
src/app/
├── [locale]/
│   ├── layout.tsx      # root layout con html/body
│   ├── page.tsx
│   └── ...
├── api/
├── robots.ts
└── sitemap.ts

next.config.js          # redirects / y URLs históricas
```

No se mantendrá un `src/app/layout.tsx` superior para páginas localizadas, porque ese layout no recibe el segmento dinámico y no puede establecer `<html lang>` de forma determinista. Next.js permite que el root layout viva bajo un segmento dinámico.

### Validación

`src/app/[locale]/layout.tsx` validará params contra la lista soportada. Un locale desconocido debe ejecutar `notFound()` o ser rechazado antes de cualquier acceso a contenido.

### Selector de idioma

El selector navegará a la URL equivalente:

```text
/es/success-cases/crm -> /en/success-cases/crm
```

Una cookie podrá conservarse como preferencia auxiliar, pero no podrá alterar el HTML de una URL ya seleccionada.

### Slugs internos

Foundation solo exige prefijos `/es` y `/en`. La traducción de slugs como `/es/servicios` y `/en/services` se resolverá con la arquitectura de información de Experience 2.0 y no bloqueará esta migración.

## Consecuencias positivas

- HTML, metadata y `<html lang>` deterministas.
- Static Rendering y cache de contenido comercial.
- Canonicals y hreflang inequívocos.
- Sitemaps con variantes lingüísticas explícitas.
- Selector comprensible para crawler y usuario.
- Menor dependencia de hydration y estado global cliente.

## Costes y riesgos

- Cambia la estructura pública de URLs.
- Requiere redirects y verificación de enlaces internos.
- Debe definirse cómo navegar cuando una traducción no existe.
- Metadata y generación estática deben recibir locale por params.
- Mover el root layout exige comprobar providers, metadata routes, 404 y navegación entre layouts.
- Los redirects históricos deben desplegarse junto con las rutas localizadas para evitar enlaces rotos.

## Alternativas rechazadas

### Cookie como fuente principal

Rechazada porque una misma URL seguiría entregando representaciones diferentes y mantendría request rendering global.

### Detección automática obligatoria en `/`

Rechazada para Foundation porque introduce variabilidad y dificulta cache, pruebas y canonicalización. Una preferencia puede conservarse sin controlar el HTML canónico.

### Subdominios por idioma

Rechazados por complejidad operativa innecesaria para dos idiomas y un único sitio.

### Query parameters

`?lang=es` se rechaza como identidad principal porque produce URLs menos claras y complica canonicalización y navegación.

## Reglas de implementación

1. No leer cookies para decidir contenido indexable.
2. No usar `suppressHydrationWarning` para ocultar diferencias de idioma.
3. No importar ambos diccionarios completos en todos los Client Components.
4. Toda función de contenido debe aceptar un `Locale` validado, no un string arbitrario.
5. Toda URL indexable debe tener canonical propio y alternates válidos.
6. Locale inválido debe fallar antes de construir paths de filesystem.

## Plan de migración

1. Crear configuración de locale y validadores.
2. Inventariar URL histórica, destino y status de redirect.
3. Mover el root layout a `[locale]/layout.tsx`.
4. Agregar `generateStaticParams()` para ES/EN.
5. Configurar redirección estable `/ -> /es`.
6. Mover páginas públicas de forma incremental junto con sus redirects.
7. Resolver diccionarios en servidor.
8. Cambiar links internos y selector.
9. Retirar cookie/headers del rendering.
10. Añadir canonical/hreflang/sitemap después de estabilizar URLs.

## Criterios de verificación

- [ ] `/es` siempre contiene español en raw HTML.
- [ ] `/en` siempre contiene inglés en raw HTML.
- [ ] Cookies y `Accept-Language` no alteran esas respuestas.
- [ ] `lang` coincide con la URL.
- [ ] Locale desconocido no accede al filesystem.
- [ ] Selector navega a la ruta equivalente.
- [ ] Build identifica como estáticas las rutas compatibles.
- [ ] `generateStaticParams()` genera todos y solo los locales soportados.
- [ ] Todas las URLs públicas históricas tienen decisión y redirect probado cuando corresponde.

## Relación con otros documentos

- Evidencia: [`../audits/current-state-audit.md`](../audits/current-state-audit.md)
- Rendering: [`ADR-002-rendering-strategy.md`](ADR-002-rendering-strategy.md)
- Contenido: [`ADR-003-content-pipeline.md`](ADR-003-content-pipeline.md)
- Ejecución: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md)
