# ADR-002 - Server Components y Static Rendering por defecto

## Estado

**Aceptada para Next Wrld 2.0 Foundation.**

## Fecha

2026-08-10

## Contexto

El repositorio usa App Router, pero gran parte de la presentación está marcada como Client Component para acceder a `react-i18next`. Además:

- Home y diagnóstico reemplazan su contenido principal por `Loading...` hasta `useEffect`.
- Los casos cargan el artículo después de hydration mediante una API interna.
- El root layout usa `cookies()`, por lo que todas las rutas HTML se renderizan por request.
- El contenido comercial procede de código o archivos locales y no necesita request rendering.

La frontera Server/Client actual responde al sistema de traducciones, no a necesidades reales de interacción.

## Decisión

Todo componente comienza como Server Component. Solo se incorpora `"use client"` cuando el componente necesita:

- Estado interactivo.
- Eventos del navegador.
- Efectos.
- APIs del navegador.
- Librerías que requieren ejecución cliente.

El contenido comercial y editorial debe renderizarse en servidor y, cuando sus inputs sean conocidos en build, generarse estáticamente.

### Páginas estáticas objetivo

- Home.
- Diagnóstico.
- Páginas legales.
- Casos de éxito.
- Futuras páginas de servicios e industrias.
- Futuros insights.

### Rutas dinámicas legítimas

- `/api/contact`.
- Otras mutaciones o integraciones futuras justificadas.

Una API dinámica no obliga a que la página que contiene su formulario también sea dinámica.

### Client islands aceptadas

- Formulario de contacto.
- Menú mobile.
- Theme toggle.
- Language switcher.
- Disclosure de FAQ.
- Smooth scroll o controladores de animación interactiva.

Patrón preferido:

```text
Server section
  -> small Client control
```

No:

```text
Whole static section
  -> Client Component
```

## Consecuencias positivas

- Contenido crítico presente en raw HTML.
- Menos JavaScript e hydration.
- Static Rendering y cache CDN para páginas comerciales.
- Separación más clara entre contenido e interacción.
- Metadata y `notFound()` resueltos en servidor.
- Menos estados de loading artificiales.

## Costes y riesgos

- Requiere mover traducciones estáticas a diccionarios server-side.
- Componentes grandes pueden necesitar separación de controles interactivos.
- Cambiar límites puede revelar hydration mismatches ocultos por `suppressHydrationWarning`.
- El build debe comprobar rendering mode después de cada migración.
- Animaciones existentes deben evaluarse sin convertir nuevamente toda la sección en cliente.

## Alternativas rechazadas

### Mantener `react-i18next` global para toda la UI

Rechazada porque la traducción estática no es interacción y fuerza client graphs innecesarios.

### Client-side rendering para contenido comercial

Rechazado porque ya produjo pérdida de contenido SEO en heroes y casos.

### Forzar `force-static` sin retirar Dynamic APIs

Rechazado porque oculta el problema conceptual y puede producir comportamiento incorrecto. Primero deben eliminarse dependencias request-bound innecesarias.

### Convertir todo a HTML exportado

Rechazado porque el proyecto conserva endpoints dinámicos legítimos y Next.js ya permite combinar páginas estáticas con route handlers.

## Reglas de implementación

1. Ningún H1 o artículo puede depender de `useEffect` para aparecer.
2. `Loading...` no puede sustituir contenido indexable en el primer render.
3. Client Components deben recibir datos serializables preparados en servidor.
4. `cookies()`, `headers()` y APIs dinámicas requieren justificación local.
5. No usar `force-static` como sustituto de una arquitectura determinista.
6. Los casos deben usar `generateStaticParams`, metadata server-side y `notFound()`.
7. Después de cada fase se debe inspeccionar la tabla de rutas del build.

## Inventario inicial de migración

| Área | Estado actual | Objetivo |
| --- | --- | --- |
| Home Hero | Client, guard de mount | Server content; interacción aislada si existe |
| Diagnóstico Hero | Client, guard de mount + scroll | Server content + botón de scroll cliente |
| Features/About/Pricing | Client por traducciones | Server Components |
| FAQ | Sección cliente completa | Preguntas server + disclosures cliente |
| SuccessCaseContent | Client fetch completo | Página server/static |
| Contact | Formulario cliente | Section server + form island |
| Footer/Legal | Client por traducciones | Server Components |
| Header | Cliente completo | Shell server + controles cliente cuando sea viable |

## Criterios de verificación

- [ ] H1 de home y diagnóstico existe en raw HTML.
- [ ] Artículos de casos existen en raw HTML.
- [ ] No hay fetch cliente para leer contenido local de casos.
- [ ] Páginas comerciales compatibles aparecen estáticas en build.
- [ ] Cada `"use client"` restante tiene motivo documentable.
- [ ] Contacto sigue funcionando mediante endpoint dinámico.
- [ ] No se introducen hydration warnings.

## Relación con otros documentos

- Localización: [`ADR-001-locale-routing.md`](ADR-001-locale-routing.md)
- Contenido: [`ADR-003-content-pipeline.md`](ADR-003-content-pipeline.md)
- Evidencia: [`../audits/current-state-audit.md`](../audits/current-state-audit.md)
- Ejecución: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md)
