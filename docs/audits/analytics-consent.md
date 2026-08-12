# Next Wrld — Política de consentimiento y medición (DATA-003)

> Documento de registro (borrador de trabajo de Foundation). No es la política pública del sitio; fija la base antes de ampliar tracking.

## Estado

Registro preliminar 2026-08-12. Define mercados, base legal, categorías y momento de ejecución de la medición antes de ampliarla.

## Mercados

- Mercados objetivo actuales: Venezuela, Argentina y España (copy ES/EN).
- La web es accesible globalmente; los datos pueden originarse en cualquier mercado (incluida la UE/EEA).

## Base legal (RGPD, por mercado UE/EEA)

| Tratamiento | Base legal | Nota |
| --- | --- | --- |
| Analytics agregado sin identificación personal | Interés legítimo | Datos agregados, sin cruzar con identidad; es posible la necesidad de consentimiento según interpretación y tag configuración |
| Contacto (formulario) | Interés legítimo + consentimiento tácito del envío | El envío del formulario es la ejecución del contrato/solicitud |
| Cookies estrictamente necesarias (tema, preferencias) | Interés legítimo | `localStorage` del tema; sin terceros |

Para EEA se documentará el consentimiento explícito antes de habilitar medición opcional en esa región.

## Categorías de datos

- Eventos de conversión (página, locale, `cta_location`, `case_slug`, `form_source`).
- Métricas de navegación agregadas.
- Sin PII en eventos (no se envían nombres, emails ni mensajes del formulario a analytics).

## Eventos implementados (DATA-002)

```text
diagnosis_cta_click    calendar_booking_click
contact_form_start     contact_form_submit   contact_form_success   contact_form_error
case_view              language_change
```

Todos se publican en `dataLayer` con contexto (`page`, `locale`, `cta_location`, `case_slug`, `form_source`); no se usa copy visible como identificador.

## Momento de ejecución

- Carga: solo después de interacción del usuario (scripts `afterInteractive` de GTM/GA4).
- Disparo de eventos: en el evento real (click, submit, éxito/error, view, cambio de idioma).
- No se cargan scripts de terceros en SSR; la medición no bloquea render ni LCP.

## Decisiones pendientes (owner)

- Estrategia de carga única GTM vs GA4 (DATA-001): verificar el contenedor GTM y confirmar si dispara GA4.
- Implementación de banner de consentimiento para EEA (fuera de Foundation salvo necesidad).
