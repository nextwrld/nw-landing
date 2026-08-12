# Next Wrld — Security Foundation (Fase 1)

## Estado

**Cerrada y desplegada 2026-08-12.** Implementación local verificada, deployment a producción completado (commit `486cbe8`, Vercel check `success`) y regla WAF activada por el owner con `429` confirmado. Detalles y evidencia de producción en [`#Verificación en producción`](#verificación-en-producción-y-waf).

## Objetivo

Aplicar `Fase 1 - Security First` del [`next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md): cerrar filesystem traversal (SEC-001), parchear Next.js dentro de 16.x (SEC-002) y endurecer `/api/contact` (SEC-003).

## Entorno

| Campo | Valor |
| --- | --- |
| Fecha/hora UTC | 2026-08-12T15:2xZ (última verificación local 15:19Z) |
| Branch / worktree | `main`, limpio de cambios no relacionados |
| Node | `v24.18.0` |
| pnpm | `11.20.0` (fijado en `package.json`) |
| Next.js | `16.0.10` → `16.3.0` |
| React | `19.2.3` (sin cambio) |
| @next/eslint-plugin-next / eslint-config-next | `16.2.12` → `16.3.0` |
| Commit de implementación | Pendiente de registrar al commitear (estado actual sin commit) |

## SEC-001 — Filesystem traversal (Critical)

### Cambios

- **Nueva fuente única de locales** `src/i18n/config.ts`:
  `locales = ["es","en"]`, `type Locale`, `defaultLocale = "es"`, `isLocale()`.
- **Nueva validación de slugs** `src/utils/validate.ts`:
  patrón `^[a-z0-9]+(?:-[a-z0-9]+)*$`, máx. 120 chars, clase `InvalidContentPathError`.
- **`src/utils/markdown.ts`**:
  - Tipado de locale como `Locale` (no `string`) en loaders de casos y blogs.
  - `resolve()` + verificación de contención dentro del directorio permitido con límite de separador (`assertInside`).
  - `listSources` filtra solo `.mdx` y devuelve slugs sin extensión (elimina entradas anómalas del directorio).
  - Rechaza directorios como destinos (`isFile()`).
  - Validate antes de cualquier acceso a disco.
- **`api/success-cases/[slug]/route.ts`**:
  - `locale` ausente → default explícito `es` antes de acceso a disco.
  - `locale` vacío/desconocido → `400`.
  - `slug` inválido/traversal → `400`.
- **`api/contact`, `blogs/[slug]`**: mismo endurecimiento de facto vía loader (el blog valida su slug URL contra el mismo patrón; slugs inválidos → `notFound()` en vez de acceso a disco).

### Verificación local (HTTP, servidor de producción `next start`)

| Request | Status |
| --- | --- |
| `/api/success-cases/crm?locale=es` | 200 |
| `/api/success-cases/crm?locale=en` | 200 |
| `/api/success-cases/crm` (sin locale → es) | 200 |
| `?locale=` | 400 |
| `?locale=../blogs` | 400 |
| `?locale=../../` | 400 |
| `?locale=foo` | 400 |
| Slug `..%2Fblogs` | 400 |
| Slug `%2e%2e` | 308 (normalización de Next antes del handler; sin acceso a disco) |
| Slug inexistente bien formado | 404 |

### Pruebas

- `tests/success-cases-traversal.test.ts`: locales ES/EN válidos, locales inválidos (`../blogs`, `../`, `../../`, `foo`, `es/../blogs`, `ES`, vacío) lanzan `InvalidContentPathError` **sin llamar a `fs.readFileSync`** (spy), slugs inválidos (`..`, `../blogs`, `foo/bar`, `foo\bar`, `crm.mdx`, vacío, `%2e%2e`) idem, slugs de blog idem, ruta API con locale/slug ambos validados, `readFileSync` nunca invocado en los casos rechazados. La suite fallaría sin la corrección.

## SEC-002 — Next.js dentro de 16.x (Critical)

### Versión elegida

`16.3.0` (última 16.x estable publicada, 2026-08-03). Ruta mínima parcheada para los advisories actuales: `16.2.11`. `eslint-config-next` y `@next/eslint-plugin-next` alineados a `16.3.0`. No se ejecutó `audit fix --force`.

### Resultado de audit dirigido (`pnpm audit --lockfile-only`)

| Métrica | Antes (`16.0.10`) | Después (`16.3.0`) |
| --- | --- | --- |
| Critical | 1 | 1 |
| High | 43 | 29 |
| Moderate | 47 | 32 |
| Low | 7 | 4 |
| Total | 98 | 66 |

- **Advisories de `next` aplicables: 0 restantes** (antes: 10, todos con patch `>=16.2.11`; incluye bypass de middleware/proxy Turbopack con locale único GHSA-6gpp-xcg3-4w24, DoS de Server Actions, SSRF en rewrites/custom servers, cache confusion, DoS de Image Optimization SVG, disclousure de endpoints). No aplicables en esta app: los SSRF de "custom servers" requieren custom server; la cache body confusion requiere requests con body; no se usan Server Actions ni middleware.
- **Transitivos bajo `next` (`next>postcss`, `next>sharp`, `next>postcss>nanoid`): 0 restantes** tras la actualización.
- El `critical` restante (`fast-xml-parser`) es **solo dev/types** vía `@types/nodemailer` → AWS SDK de tipos; no corre en runtime. Ver residuales.

### Verificación local

- `pnpm install --frozen-lockfile` → OK en lockfile actualizado.
- `pnpm lint` → 0 errores/warnings.
- `pnpm test` → 66/66.
- `pnpm build` (Next 16.3.0, Turbopack) → OK, 17 rutas, todas `ƒ` Dynamic (esperado por `cookies()` en root layout; fase I18N).
- Smoke: `/` 200, `/diagnostico` 200, `/contact` 200, casos API 200.

## SEC-003 — Endurecer `/api/contact` (Critical)

### Cambios

- **`src/utils/contact.ts`**: `parseContactPayload` sin dependencia nueva.
  - No acepta bodies no-objeto, arrays, `null` ni claves heredadas de prototipo (`__proto__`, `constructor`, `prototype`).
  - Rechaza campos inesperados.
  - `fullName` ≤ 120, `email` ≤ 254 + regex, `phone` opcional ≤ 40, `message` ≤ 5000.
  - `source` obligatorio y allowlisted: `home | contact | diagnostico`.
  - Honeypot `website` opcional (string).
- **`api/contact/route.ts`**:
  - JSON malformado → `400`.
  - Error de validación → `400` con mensaje genérico.
  - Honeypot activo → `200` de éxito sin enviar email (no revela detección).
  - Origen en asunto (`[source] …`) y cuerpo del email.
  - Error SMTP → `500` genérico, **sin** excepciones/stack/host/credenciales ni campo `details`.
  - Log interno separado: prefijo `[contact]` + origen + mensaje de error, sin payload/PII.
- **Frontend**: `<Contact source>` prop (home `home`, `/contact` → `contact`, diagnóstico → `diagnostico`); honeypot oculto `website` en el formulario; `encodeURIComponent` del locale en el fetch de casos.

### Verificación local (HTTP)

| Caso | Status | Respuesta pública |
| --- | --- | --- |
| Faltante `source` | 400 | `Invalid source` |
| Email inválido | 400 | `Invalid email` |
| JSON malformado | 400 | `Invalid request body` |
| Campos inesperados / largos / whitespace | 400 | Genérico |
| Honeypot activo | 200 | `Message sent successfully` (sin envío) |
| Envío válido (SMTP falla sin credenciales) | 500 | `Something went wrong. Please try again later.` — sin `details` |

### Pruebas

- `tests/contact-api.test.ts` (31 casos): `parseContactPayload` (válido, trims, campos malformados, claves de prototipo, unknown fields, límites), y `POST` con `sendEmail` mockeado (source en subject, honeypot sin envío, 400 sin envío, JSON malformado 400, error SMTP → 500 genérico sin leakage).

## Control de abuso (deployment)

Regla **Vercel WAF** acordada y activada por el owner:

```text
Name:   nw-contact-rate-limit
If:     Request Method == POST AND Path == /api/contact
Then:   Rate Limit (key: IP, window: 10 min, limit: 10) → 429
```

- Disponibilidad: WAF Rate Limiting está incluido en todos los planes; Hobby admite 1 regla.
- Contadores por región: el límite se aplica por región de ejecución. En la prueba, requests repetidas repartidas entre regiones (`gru1::iad1`, `gru1::h92tv`) no superaron el umbral por región; acumuladas en una sola región, el bloqueo apareció.
- **Observación verificada:** la regla bloquea también `GET /api/contact` (endpoint sin handler GET en la app), lo que indica que la condición en el dashboard se aplica al path con todos los métodos. Sin impacto negativo: `GET /api/contact` no tiene función en la app.

## Verificación en producción y WAF

**Deployment:** push de `main` a `origin/main` (`8c89c69..486cbe8`, 2026-08-12); Vercel GitHub integration check `success`, inspector `https://vercel.com/gabriel-perez-federicos-projects/nw-landing/Ay7woC37vwAB6s7bmnukkw9hxQHY`.

| Verificación | Resultado | Evidencia |
| --- | --- | --- |
| `/` `/diagnostico` `/contact` | 200 | `nextwrld.com` |
| `/api/success-cases/crm?locale=es\|en` y sin locale | 200 | default `es` |
| `?locale=` `../blogs` `../../` `foo` | 400 | rechazo antes de disco |
| slug `..%2Fblogs` | 400 | rechazo antes de disco |
| slug inexistente bien formado | 404 | `404` real |
| POST `/api/contact` sin `source` | 400 | `Invalid source` |
| POST email inválido / JSON malformado / campo inesperado | 400 | `Invalid email` / `Invalid request body` / `Unexpected fields in request` |
| POST honeypot activo | 200 | `Message sent successfully` sin envío |
| WAF rate limit (`/api/contact`, GET y POST) | 429 | `x-vercel-mitigated: deny`; `/` y `/api/success-cases` siguen `200` |

> **Nota:** la verificación de rate limiting consumió la cuota de 10 requests/10 min de la IP de origen (186.22.17.207). Los envíos legítimos desde esa IP quedan limitados hasta que la ventana de 10 min se reinicie.

## Riesgos residuales registrados

| Hallazgo | Severidad | Estado/Decisión |
| --- | --- | --- |
| `nodemailer@7.0.12` < 9.0.1 (bypass `raw` de disableFileAccess/disableUrlAccess) | High | La app no usa `raw`, files ni URLs; HTML construido en servidor con valores escapados. No explotable en uso actual. Upgrade major separado (SEC/limpieza dirigida). |
| `axios@1.13.2` (11 advisories) vía `PricingBox` huérfano | High | Código muerto, sin import en runtime. A retirar en Fase CLEANUP. |
| `form-data` (CRLF injection) vía axios | High | Mismo camino muerto (axios). CLEANUP. |
| `js-yaml@3.x` (2) vía `gray-matter` | High | Solo frontmatter de archivos locales/trusted; preparación de contenido en servidor. Evaluar en fase CONTENT. |
| `fast-xml-parser` (critical) vía `@types/nodemailer` | Critical | **Solo dev/types** (AWS SDK de tipos). Nunca bundle en runtime. Se retira si se sustituyen los tipos; no afecta producción. |
| Regla WAF | - | Activa y verificada con `429` + `x-vercel-mitigated: deny`. Owner: usuario. |

## Gate de salida SEC — Estado

- [x] Traversal cerrado (locale y slug validados antes de disco) y cubierto por pruebas.
- [x] Next.js en `16.3.0`, 0 advisories aplicables de `next`; build OK.
- [x] `/api/contact` endurecido (validación, honeypot, `source`, respuestas genéricas sin leakage).
- [x] Formularios actualizados para enviar `source` y honeypot.
- [x] Deployment a producción de los cambios (commit `486cbe8`, Vercel check `success`).
- [x] Regla WAF activa y verificada con `429` (GET y POST `/api/contact`, `x-vercel-mitigated: deny`).

La fase se considerará **cerrada** cuando deployment y WAF estén verificados; ese registro se agrega a esta sección y al [`next-wrld-2-technical-plan.md`](../planning/next-wrld-2-technical-plan.md).