# Next Wrld - Pre-refactor Build Baseline

## Estado

**Ejecutado el 2026-08-12 en el worktree local de `main` (worktree limpio de cambios no relacionados, salvo `docs/` sin trackear).**

Este archivo registra el baseline reproducible de F0 antes de cualquier modificación de arquitectura o seguridad.

## Referencias

- Plan: [`../planning/next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md)
- Auditoría: [`current-state-audit.md`](current-state-audit.md)

## Objetivo

Capturar un baseline reproducible que permita comparar errores, warnings, rutas, rendering modes y tamaños antes y después de cada fase.

## Estado conocido antes de ejecutar

| Área | Evidencia disponible |
| --- | --- |
| Dependencias locales | `node_modules` estaba ausente durante la auditoría de 2026-08-08. |
| Build anterior | `npm run build` falló con `next: command not found`; no es un baseline de aplicación. |
| Lockfiles | `pnpm-lock.yaml` coincide con el manifest; `package-lock.json` estaba obsoleto y fue retirado en F0.1. |
| Package manager | pnpm 11.20.0; declarado en `package.json` vía `packageManager` en F0.1. |
| Node esperado | `>=20` según `package.json`. |
| Rendering observado | Producción devolvía HTML dinámico/no-store por el uso de `cookies()` en root layout. |

## Requisitos previos

- [x] Confirmar versión oficial de pnpm. → `11.20.0` (via `packageManager: "pnpm@11.20.0"`).
- [x] Confirmar que deployment/CI no depende del npm lock obsoleto. → Sin GitHub Actions ni config de deployment trackeada; deployments activos via Vercel (auto-detección por lockfile) y `vercel.json` con `installCommand` frozen.
- [x] Registrar commit SHA y branch. → `main` @ `ef78878764df7086d2545410e20d42f0212f7742` (antes de commitear F0).
- [x] Confirmar versión de Node. → `v24.18.0`.
- [x] Confirmar worktree y archivos no relacionados. → Solo `docs/` untracked; modificaciones F0 intencionales.
- [x] No modificar arquitectura antes de capturar resultados. → Sin cambios de app/arquitectura.

## Entorno

| Campo | Valor |
| --- | --- |
| Fecha/hora UTC | 2026-08-12T16:58Z |
| Commit SHA | `ef78878764df7086d2545410e20d42f0212f7742` |
| Branch | `main` |
| Sistema operativo | macOS (Darwin) arm64 |
| Node | `v24.18.0` |
| pnpm | `11.20.0` (fijado en `package.json`) |
| Next.js resuelto | `16.0.10` |
| React resuelto | `react@19.2.3`, `react-dom@19.2.3` |
| Variables requeridas disponibles | No requeridas para install/lint/test/build. |
| Entorno local/CI | Local (worktree); deployment Vercel verificado el 2026-08-01. |

## Instalación frozen

### Comando

```bash
pnpm install --frozen-lockfile
```

### Resultado

**Estado:** Éxito (exit `0`).

```text
✓ Lockfile passes supply-chain policies (verified ...)
Lockfile is up to date, resolution step is skipped
Already up to date
Done in 359ms using pnpm v11.20.0
```

### Observaciones

- El primer intento falló con `ERR_PNPM_IGNORED_BUILDS: sharp@0.34.5, unrs-resolver@1.11.1`. Resuelto aprobando sus build scripts vía `onlyBuiltDependencies` en `pnpm-workspace.yaml` y ejecutando `pnpm approve-builds sharp unrs-resolver`. Sin esta resolución, `pnpm test` (que ejecuta un deps check previo) devolvería exit 1 y bloquearía el gate F0.
- `sharp` es requerido por la optimización de imágenes de Next.js; `unrs-resolver` es el binding nativo de `@pnpm`/eslint. Ambos son conocidos y esperados.

## Lint

### Comando

```bash
pnpm lint
```

### Resultado

**Estado:** Éxito (exit `0`), sin errores ni warnings.

```text
$ eslint src
```

### Clasificación

| Categoría | Cantidad | Bloqueante | Referencia |
| --- | ---: | --- | --- |
| Errores | 0 | No | - |
| Warnings | 0 | No | - |

> **Nota F0.1:** el script `lint` se normalizó de `next lint --dir src || eslint src --ext .ts,.tsx` a `eslint src`, porque `next lint` fue eliminado en Next.js 16 (`error: unknown option '--dir'`) y el fallback `eslint` ya cubría el proyecto con la config flat (`eslint.config.mjs`).

## Tests

La auditoría no encontró test runner ni script `test`. F0.3 estableció la capacidad mínima:

### Comando

```bash
pnpm test
```

### Resultado

**Estado:** Éxito (exit `0`).

| Campo | Valor |
| --- | --- |
| Runner elegido | Vitest `4.1.10` |
| Justificación | Runner mínimo oficialmente compatible con Next.js 16 y TypeScript; modo no interactivo `vitest run`; sin necesidad de plugins extra para utilidades/loaders. Nueva devDependency justificada. |
| Pruebas ejecutadas | `tests/runner.test.ts` |
| Passed | 1 (1 archivo) |
| Failed | 0 |
| Duración | ~70 ms |

### Cobertura de requisitos

- [x] `pnpm test` existe en `package.json` (`vitest run`).
- [x] Fallo devuelve non-zero: prueba temporal `tests/failproof.tmp.test.ts` (esperado `123 + 1` fallido) devolvió exit `1` con `UNEXPECTED: 1 failed`; eliminada después de la verificación (`Expected FAIL  tests/failproof.tmp.test.ts > ...  exit code 1`).
- [x] Estructura/naming/alcance: config en `vitest.config.mts` (alias `@/`, include `tests/**/*.test.ts`); prueba mínima en `tests/`.
- [x] Nuevas dependencias con justificación registrada (Vitest devDependency, solo testing).

`src/app` no se mezcla con tests: Vitest no incluye rutas de Next, y los tests viven fuera del árbol de la app.

## Build de producción

### Comando

```bash
pnpm build
```

### Resultado

**Estado:** Éxito (exit `0`).

```text
   ▲ Next.js 16.0.10 (Turbopack)
   Creating an optimized production build ...
 ✓ Compiled successfully in 1304.1ms
   Running TypeScript ...
   Collecting page data using 9 workers ...
   Generating static pages using 9 workers (17/17) in 230.0ms
   Finalizing page optimization ...
```

Warnings: `baseline-browser-mapping` data desactualizada (informativo, no bloqueante).

### Rutas y rendering modes

Todas las rutas HTML se reportan **`ƒ` (Dynamic)**; Next no imprime tamaños en este modo. Esto coincide con la auditoría (root layout usa `cookies()`).

| Ruta | Mode reportado | Tamaño | First Load JS | Observaciones |
| --- | --- | ---: | ---: | --- |
| `/` | `ƒ` Dynamic | No reportado | No reportado | Todas las páginas son request-rendered por `cookies()` en root layout. |
| `/diagnostico` | `ƒ` Dynamic | No reportado | No reportado | - |
| `/success-cases/[slug]` | `ƒ` Dynamic | No reportado | No reportado | - |
| `/blogs` | `ƒ` Dynamic | No reportado | No reportado | - |
| `/blogs/[slug]` | `ƒ` Dynamic | No reportado | No reportado | - |
| `/contact` | `ƒ` Dynamic | No reportado | No reportado | - |
| Páginas legales | `ƒ` Dynamic | No reportado | No reportado | `legal-notice`, `privacy-policy`, `terms-of-service`. |
| Otras rutas públicas | `ƒ` Dynamic | No reportado | No reportado | `/about`, `/error`, `/pricing`, `/_not-found`. |
| API routes | `ƒ` Dynamic | No reportado | No reportado | `/api/contact`, `/api/success-cases/[slug]`. |

## Smoke test local

Comando ejecutado: `pnpm start` (producción) y `curl` local.

| Verificación | Resultado | Evidencia |
| --- | --- | --- |
| Home responde | ✅ | HTTP `200`. |
| Home raw HTML contiene `Loading...` | ✅ | 1 coincidencia de `Loading` en raw HTML. |
| Diagnóstico raw HTML contiene `Loading...` | ✅ | 1 coincidencia de `Loading` en raw HTML. |
| Caso raw HTML contiene body | ⛔ (esperado) | `/success-cases/crm` HTTP 200 pero sin `<h1>/<article>/<main>` en raw HTML. |
| Caso raw HTML contiene `Cargando...` | ✅ (esperado) | 1 coincidencia de `Cargando`. |
| Locale traversal reproducible | ⛔ (no probado en F0) | Probe informativo `?locale=blog` devolvió 404 sin exposición; la prueba de regresión SEC-001 es responsabilidad de Fase 1. No se incluye contenido sensible en este documento. |
| Contact route carga | ✅ | `/contact` HTTP `200`. No se envió email (sin autorización/configuración de prueba). |

## Dependencias y seguridad

Ejecutado sobre el lockfile oficial después del baseline. No se aplicaron fixes automáticos.

```bash
pnpm audit --lockfile-only
pnpm outdated
```

| Severidad | Cantidad | Directas relevantes | Acción planificada |
| --- | ---: | --- | --- |
| Critical | 1 | `fast-xml-parser` (transitiva dev vía `@types/nodemailer > @aws-sdk/client-ses`) | Evaluar en SEC/limpieza; solo dev/types. |
| High | 43 | `next` (<16.2.11), `axios` (<1.18), `nodemailer`, más | SEC-002 (actualización Next) y limpieza. |
| Moderate | 47 | `next`, `axios`, `nodemailer`, `postcss`, `js-yaml` (gray-matter) | SEC-002 / auditoría dirigida. |
| Low | 7 | `next`, `qs` (stripe), `axios`, `fast-xml-parser` | Seguimiento en SEC. |

`pnpm outdated`: `next 16.3.0` disponible; React `19.2.3 → 19.2.8`; demás dentro del alcance de fases posteriores. No se actualiza nada en F0.

## Bloqueos

| Bloqueo | Impacto | Owner | Próximo paso |
| --- | --- | --- | --- |
| Ninguno para el gate F0. | - | - | - |

> Los hallazgos de `pnpm audit` (incluidos los advisories de Next < 16.2.11) son trabajo de Fase 1 (SEC), no bloquean F0.

## Conclusión del baseline

- Instalación frozen: ✅ exit 0 en worktree local con lockfile sincronizado.
- Lint: ✅ `eslint src` sin errores ni warnings.
- Tests: ✅ Vitest canónico, fallo non-zero verificado, 1.ª prueba pasando.
- Build: ✅ Next 16.0.10 producción exitoso; 17 páginas generadas, todas `ƒ` Dynamic.
- Rutas dinámicas/estáticas confirmadas: todas dinámicas por `cookies()` en root layout (coincide con auditoría).
- Riesgos que bloquean SEC: ninguno; los advisories se atienden en Fase 1.
- Aprobación para iniciar Fase 1: ✅.

## Gate de salida F0

- [x] Instalación frozen reproducible.
- [x] Lint ejecutado y resultado registrado.
- [x] Test runner y comando canónico establecidos.
- [x] Tests ejecutados y resultado registrado.
- [x] Build ejecutado y resultado registrado.
- [x] Tabla de rutas preservada.
- [x] Errores/warnings clasificados.
- [x] Baseline aprobado sin bloqueos de instalación, lint, tests o build.