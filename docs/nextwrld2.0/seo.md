# Next Wrld — SEO &amp; Information Architecture Strategy

## 1. Propósito del documento

Este documento define cómo debe organizarse [`nextwrld.com`](http://nextwrld.com) para:

- ayudar a Google y otros buscadores a entender qué hace Next Wrld;
- respaldar el posicionamiento comercial;
- construir autoridad alrededor de problemas operativos reales;
- facilitar la navegación del visitante;
- conectar servicios, industrias, casos e Insights;
- convertir búsquedas e investigación en oportunidades comerciales.

El SEO no será el principal motor de adquisición de Next Wrld.

Su función principal será:

> **Aumentar descubrimiento, respaldar autoridad y reducir incertidumbre durante el proceso comercial.**

---

# 2. Rol del SEO dentro de Next Wrld

La adquisición puede comenzar por:

- recomendaciones;
- networking;
- LinkedIn;
- X;
- contenido;
- comunidad;
- búsquedas;
- founders.

La búsqueda cumple dos funciones.

## 2.1 Descubrimiento

Una empresa busca:

> software a medida

> automatizar procesos

> sistema de gestión para empresa

> reemplazar Excel

> integrar sistemas

y encuentra Next Wrld.

## 2.2 Validación

Una persona ya escuchó hablar de Next Wrld y busca:

> Next Wrld

> Next Wrld software

> Next Wrld AION

para determinar:

- quiénes somos;
- qué hacemos;
- si tenemos experiencia;
- si somos confiables;
- qué hemos construido.

Ambas situaciones importan.

---

# 3. Principio SEO

No construir contenido para perseguir tráfico.

Construir contenido alrededor de problemas que pueden convertirse en conversaciones comerciales.

Antes de crear una página debemos responder:

> ¿Qué intención del potencial cliente estamos atendiendo?

Si no existe una respuesta clara, probablemente no necesitamos esa URL.

---

# 4. Mercados prioritarios

## Mercado principal

### Latinoamérica

Comunicación principal:

**español latino neutro.**

No orientar el sitio exclusivamente a:

- Argentina;
- Venezuela;
- México;
- Colombia;
- Chile.

El contenido debe funcionar regionalmente.

---

## Mercado secundario

### Estados Unidos hispano

La versión en español debe seguir siendo relevante para empresas y founders hispanohablantes establecidos en Estados Unidos.

Cuando sea necesario podemos crear contenido específico para necesidades de ese mercado.

---

## Mercado futuro

### Inglés / internacional

La infraestructura `/en` debe mantenerse correctamente.

Sin embargo, inicialmente no se invertirá el mismo esfuerzo editorial en posicionamiento orgánico en inglés.

La prioridad comercial es:

```text
/es
>>>>>>>>
/en

```

en volumen de contenido y optimización.

---

# 5. Estrategia de idiomas

El idioma debe formar parte de la URL.

Estructura:

```text
/es/...
/en/...

```

Ejemplos:

```text
/es/servicios/software-a-medida
/en/services/custom-software

```

Cada versión debe tener:

- contenido real en su idioma;
- title propio;
- description propia;
- canonical propio;
- `hreflang`;
- enlaces equivalentes entre idiomas.

No utilizar traducciones automáticas no revisadas para producir volumen.

---

# 6. Página raíz

`/` no debe competir con `/es` o `/en`.

Debe actuar como router de idioma.

Estrategia preferida:

```text
/
↓
/es

```

como idioma predeterminado.

Puede utilizarse una preferencia previamente conocida del usuario, pero no debe generar múltiples representaciones indexables de `/`.

---

# 7. Arquitectura principal

La arquitectura objetivo inicial será:

```text
/es
│
├── servicios/
│   ├── software-a-medida
│   ├── sistemas-de-gestion
│   └── automatizacion
│
├── industrias/
│   ├── fitness
│   └── inmobiliarias
│
├── casos/
│   ├── aion-wellness
│   ├── jfhp
│   ├── inmocrm
│   └── automatizaciones
│
├── insights/
│   └── [slug]
│
├── diagnostico
│
├── nosotros
│
├── contacto
│
└── legal/
    ├── privacidad
    ├── terminos
    └── aviso-legal

```

La versión inglesa mantendrá una arquitectura equivalente.

---

# 8. Principio de Information Architecture

Cada familia de páginas cumple una responsabilidad diferente.

```text
HOME
Qué problema resolvemos.

SERVICIOS
Cómo podemos resolverlo.

INDUSTRIAS
Cómo se manifiesta ese problema en un sector.

CASOS
Dónde ya lo hemos hecho.

INSIGHTS
Cómo pensamos.

NOSOTROS
Quién puede hacerlo.

DIAGNÓSTICO
Cómo empezamos.

```

No debemos hacer que todas las páginas repitan el mismo mensaje con ligeras variaciones.

---

# 9. Homepage

## Rol SEO

La homepage debe establecer la categoría general.

Temas principales:

- software a medida;
- operaciones;
- sistemas de gestión;
- automatización de procesos;
- integración;
- crecimiento empresarial.

No intentar posicionar la home para veinte términos simultáneamente.

### Intención

Empresa que:

- conoce Next Wrld;
- está explorando qué hacemos;
- tiene un problema operativo pero todavía no conoce la solución.

### Keyword conceptual principal

> software a medida para empresas

### Temas secundarios

- sistemas de gestión;
- automatización;
- procesos manuales;
- integración de sistemas.

---

# 10. Servicios

Las páginas de servicio deben capturar búsquedas donde el usuario ya identifica una posible solución.

No deben limitarse a describir qué hacemos.

Deben responder:

- cuándo tiene sentido;
- qué problemas resuelve;
- qué alternativas existen;
- cómo trabajamos;
- qué hemos hecho relacionado.

---

# 11. `/servicios/software-a-medida`

## Intención principal

Personas buscando empresas capaces de diseñar y desarrollar software específico para una operación.

### Términos conceptuales

- software a medida;
- desarrollo de software a medida;
- desarrollo de sistemas;
- software personalizado;
- desarrollo de plataformas;
- software empresarial.

### Problemas relacionados

- software existente no se adapta;
- Excel dejó de alcanzar;
- procesos particulares;
- sistemas internos;
- consolidación de operaciones.

### Estructura recomendada

```text
H1
Software a medida para empresas

Problema

Cuándo tiene sentido construir software propio

Qué tipo de sistemas desarrollamos

Construir vs comprar

Cómo trabajamos

Casos relacionados

FAQ

Diagnóstico

```

---

# 12. `/servicios/sistemas-de-gestion`

## Intención

Empresa que necesita centralizar o estructurar su operación.

### Temas

- sistemas de gestión;
- software de gestión;
- sistemas empresariales;
- gestión interna;
- CRM personalizado;
- plataformas administrativas.

No vender únicamente:

> ERP.

Next Wrld puede construir sistemas que no encajan exactamente dentro de categorías tradicionales.

### Problemas

- información duplicada;
- múltiples planillas;
- falta de trazabilidad;
- procesos distribuidos;
- reporting manual.

---

# 13. `/servicios/automatizacion`

## Intención

Empresa que sabe que realiza demasiado trabajo manual.

### Temas

- automatización de procesos;
- automatización empresarial;
- integración de sistemas;
- automatización de tareas;
- workflows;
- procesos administrativos.

### Mensaje importante

Automatizar no significa necesariamente reemplazar los sistemas existentes.

Puede significar conectarlos.

La página debe ayudar al visitante a entender la diferencia entre:

```text
Automatizar
Integrar
Construir
Reemplazar

```

---

# 14. Inteligencia artificial

Inicialmente no crear:

```text
/servicios/inteligencia-artificial

```

como página comercial principal.

Motivo:

IA no define el posicionamiento de Next Wrld.

La inteligencia artificial debe aparecer dentro de:

- software a medida;
- automatización;
- casos;
- Insights.

Una landing específica podrá existir en el futuro si aparecen:

- demanda;
- casos;
- búsquedas;
- una oferta suficientemente diferenciada.

---

# 15. Industrias

Las páginas por industria no son una lista de mercados que Next Wrld dice atender.

Deben demostrar conocimiento.

Solo se crea una vertical cuando podamos responder:

> ¿Qué sabemos específicamente sobre cómo funciona este sector?

---

# 16. `/industrias/fitness`

Será inicialmente la vertical más fuerte.

AION proporciona evidencia propia.

### Problemas que puede cubrir

- membresías;
- pagos;
- vencimientos;
- caja;
- accesos;
- planes;
- clientes;
- reporting;
- administración;
- operación de sedes;
- seguimiento.

### Intención SEO

No intentar únicamente:

> software para gimnasios.

También atender búsquedas relacionadas con:

- gestión de gimnasios;
- sistema para gimnasio;
- software de membresías;
- administración de gimnasios;
- automatización para gimnasios.

### Ventaja

Podemos mostrar un producto real:

**AION Wellness.**

---

# 17. `/industrias/inmobiliarias`

Esta página debe manejarse con mayor cuidado.

Tenemos:

- investigación;
- trabajo académico;
- MVP;
- arquitectura;
- producto diseñado.

No tenemos necesariamente resultados comerciales en producción.

La página puede demostrar:

> comprensión del problema.

No:

> éxito productivo inexistente.

### Temas

- gestión inmobiliaria;
- propiedades;
- publicación;
- leads;
- CRM;
- tareas administrativas;
- portales;
- automatización.

---

# 18. Futuros verticales

No crear páginas del estilo:

```text
/restaurantes
/salud
/retail
/logistica
/finanzas
/educacion

```

simplemente porque podrían comprar software.

Primero necesitamos:

- experiencia;
- investigación;
- casos;
- una propuesta específica.

---

# 19. Casos de estudio

Los casos cumplen tres funciones SEO.

## Evidencia

Demuestran capacidad.

## Long-tail

Pueden posicionar para problemas concretos.

## Internal linking

Conectan problemas con servicios e industrias.

---

# 20. Arquitectura de casos

Preferir:

```text
/es/casos/aion-wellness
/es/casos/jfhp
/es/casos/inmocrm

```

sobre:

```text
/es/success-cases/...

```

para la nueva experiencia en español.

Podemos mantener redirects permanentes desde las URLs antiguas.

La versión inglesa puede utilizar:

```text
/en/cases/...

```

---

# 21. Estructura SEO de un caso

Cada caso debe tener un H1 basado en resultado o transformación.

Ejemplo:

> AION Wellness: centralizando la operación de negocios fitness

No:

> Caso de éxito: AION

Estructura:

```text
Contexto

Problema

Impacto

Qué decidimos

Qué construimos

Resultado

Evidencia

Qué aprendimos

Capacidades relacionadas

CTA

```

---

# 22. Casos y resultados

Distinguir siempre:

## Resultado

Algo ocurrido y verificable.

## Objetivo

Lo que esperábamos conseguir.

## Capacidad

Lo que construimos.

No convertir:

> “El sistema permite reducir…”

en:

> “Reducimos…”

sin evidencia.

Esta regla es especialmente importante para SEO, credibilidad y ventas.

---

# 23. Insights

La sección editorial se llamará:

## Insights

No:

> Blog.

Esto refuerza la intención:

- análisis;
- experiencia;
- criterio;
- aprendizaje.

No noticias corporativas genéricas.

---

# 24. Rol SEO de Insights

Insights puede atacar búsquedas más tempranas.

Por ejemplo:

```text
“¿Cuándo Excel deja de servir?”

“¿Conviene construir software a medida?”

“¿Cómo automatizar procesos administrativos?”

“CRM personalizado vs CRM SaaS”

“Qué procesos conviene automatizar primero”

```

Una persona puede llegar sin buscar todavía una empresa de software.

El contenido la ayuda a comprender su situación.

---

# 25. Principio editorial SEO

No publicar por frecuencia.

Publicar cuando existe:

```text
problema real
+
opinión útil
+
conocimiento
+
relación comercial

```

Un artículo debe poder ser útil aunque el lector nunca contrate Next Wrld.

---

# 26. Clusters de contenido iniciales

## Cluster A — Operaciones manuales

Temas:

- Excel;
- WhatsApp;
- tareas manuales;
- dependencia;
- crecimiento operativo.

Página comercial relacionada:

> Software a medida

---

## Cluster B — Sistemas

Temas:

- software propio vs SaaS;
- sistemas internos;
- gestión;
- centralización;
- integración.

Página relacionada:

> Sistemas de gestión

---

## Cluster C — Automatización

Temas:

- qué automatizar;
- cuándo no automatizar;
- n8n;
- integraciones;
- workflows;
- IA aplicada.

Página relacionada:

> Automatización

---

## Cluster D — Producto

Temas:

- MVP;
- priorización;
- investigación;
- AION;
- decisiones de producto.

Objetivo principal:

> autoridad.

---

# 27. Primer backlog de Insights

No necesariamente publicar todos.

Prioridad sugerida:

### 1. ¿Cuándo Excel deja de ser suficiente para gestionar una empresa?

Alta intención y conexión directa con el ICP.

### 2. Automatizar un mal proceso no lo convierte en uno bueno

Posicionamiento y autoridad.

### 3. Software a medida vs herramientas SaaS: ¿cuándo conviene cada uno?

Alta relación comercial.

### 4. 5 señales de que tu empresa está creciendo más rápido que su operación

Excelente para SEO + LinkedIn.

### 5. Qué procesos deberías automatizar primero

Automatización.

### 6. Por qué construimos AION Wellness

Producto + autoridad.

### 7. Qué dejamos fuera del MVP de AION y por qué

Product thinking.

### 8. Cómo saber si necesitas integrar tus herramientas o reemplazarlas

Muy alineado con ventas.

---

# 28. Reutilización

Una pieza SEO puede nacer desde redes y viceversa.

Ejemplo:

```text
Insight
“5 señales de que tu operación superó Excel”
      ↓
LinkedIn
      ↓
X
      ↓
carrusel futuro
      ↓
CTA

```

No generar una pieza completamente diferente para cada canal.

---

# 29. Internal Linking Strategy

El sitio debe comportarse como una red.

No como páginas aisladas.

Ejemplo:

```text
Insight:
Cuándo Excel deja de alcanzar

        ↓

Software a medida

        ↓

Caso JFHP

        ↓

Diagnóstico

```

Otro:

```text
Fitness

   ↓

AION

   ↓

Sistemas de gestión

   ↓

Diagnóstico

```

---

# 30. Reglas de enlaces internos

Cada Insight debe enlazar cuando corresponda a:

- un servicio;
- un caso;
- diagnóstico.

Cada servicio debe enlazar a:

- casos;
- Insights;
- diagnóstico.

Cada industria debe enlazar a:

- casos de esa industria;
- servicios relevantes;
- diagnóstico.

Cada caso debe enlazar a:

- servicio relacionado;
- industria relacionada;
- diagnóstico.

---

# 31. Navegación principal

La navegación principal no debe reflejar toda la arquitectura.

Debe mantenerse pequeña.

Propuesta:

```text
Servicios
Cómo trabajamos
Casos
Insights
Nosotros

[Diagnóstico]

```

Servicios puede desplegar:

```text
Software a medida
Sistemas de gestión
Automatización

```

No es necesario poner industrias en el header inicialmente.

Pueden descubrirse desde:

- homepage;
- servicios;
- casos;
- footer.

---

# 32. Breadcrumbs

Utilizar breadcrumbs en páginas de profundidad.

Ejemplo:

```text
Inicio
→ Casos
→ AION Wellness

```

o:

```text
Inicio
→ Servicios
→ Software a medida

```

Además de UX, ayudan a comunicar jerarquía a buscadores.

---

# 33. Estrategia de URLs

Las URLs deben ser:

- descriptivas;
- cortas;
- en minúsculas;
- separadas con guiones;
- estables.

Preferir:

```text
/es/servicios/software-a-medida

```

sobre:

```text
/es/services/custom-software-development-company-latam

```

No escribir URLs para meter todas las keywords posibles.

---

# 34. Migración de URLs actuales

Las URLs antiguas no deben desaparecer sin estrategia.

Ejemplo:

```text
/es/success-cases/crm
          ↓ 301
/es/casos/inmocrm

```

Mantener redirect permanente.

Nunca dejar ambos contenidos indexables independientemente.

---

# 35. Canonical

Cada página indexable debe utilizar canonical autorreferencial.

Ejemplo:

```text
URL:
/es/casos/aion-wellness

canonical:
/es/casos/aion-wellness

```

No canonicalizar todo hacia homepage.

---

# 36. Hreflang

Cuando exista versión equivalente:

```text
es
/en/...

en
/es/...

```

Agregar:

- `es`;
- `en`;
- opcionalmente `x-default`.

No crear alternates si realmente no existe una traducción equivalente.

---

# 37. Metadata

Cada página debe tener un title único.

Estructura aproximada:

```text
[Intent principal] | Next Wrld

```

Ejemplos:

```text
Software a medida para empresas | Next Wrld

Automatización de procesos empresariales | Next Wrld

Software y gestión para gimnasios | Next Wrld

```

No depender únicamente de slogans de marca.

---

# 38. Meta descriptions

La description debe:

- explicar qué encontrará el usuario;
- incluir naturalmente la intención;
- diferenciar la página;
- evitar repetir exactamente el title.

Ejemplo:

> Diseñamos software a medida para empresas que necesitan reemplazar procesos manuales, conectar herramientas y operar con más control.

---

# 39. Heading strategy

Cada página debe tener:

## Un único H1 principal

Después:

```text
H2 → temas principales
H3 → subdivisiones

```

No utilizar headings exclusivamente por tamaño visual.

---

# 40. SEO semántico

No obsesionarse con repetir una keyword exacta.

Una página de software a medida debería naturalmente hablar de:

- negocio;
- procesos;
- herramientas;
- sistemas;
- integración;
- usuarios;
- requerimientos;
- desarrollo;
- operación;
- automatización.

La profundidad temática importa más que repetir:

> software a medida

veinte veces.

---

# 41. Structured Data

Implementar donde corresponda.

## Global

- Organization;
- WebSite.

## Casos / Insights

- Article cuando aplique;
- BreadcrumbList.

## Servicios

- Service cuando represente correctamente el contenido.

No utilizar schemas simplemente porque existan.

---

# 42. Imágenes

Las imágenes de producto y casos pueden reforzar búsquedas y confianza.

Reglas:

- nombres de archivo descriptivos;
- `alt` contextual;
- no describir decoraciones;
- optimización;
- evitar screenshots ilegibles;
- acompañar interfaces con explicación.

Ejemplo:

```text
aion-dashboard-memberships.webp

```

mejor que:

```text
image-23-final.png

```

---

# 43. Programmatic SEO

No es parte de la estrategia inicial.

No generar automáticamente:

```text
/software-para-gimnasios-en-argentina
/software-para-gimnasios-en-mexico
/software-para-gimnasios-en-chile
...

```

sin contenido realmente diferente.

Preferimos menos páginas con más autoridad.

---

# 44. Local SEO

Next Wrld no es inicialmente un negocio local dependiente de visitas físicas.

No centrar el SEO en:

> empresa de software Buenos Aires

aunque pueda existir relevancia geográfica.

El mercado es regional.

Podemos mencionar ubicación y procedencia cuando genere confianza, pero no limitar el posicionamiento.

---

# 45. Comparativas

Los contenidos comparativos sí pueden aportar valor.

Ejemplos:

- software a medida vs SaaS;
- automatización vs desarrollo;
- integración vs reemplazo;
- ERP tradicional vs sistema personalizado.

Regla:

No escribir comparativas manipuladas para que Next Wrld siempre gane.

El artículo debe explicar cuándo **no** conviene contratar software a medida.

Eso genera mayor confianza.

---

# 46. Contenido técnico

Puede existir contenido técnico.

Pero debe vivir en una capa diferenciada.

Ejemplo:

```text
Insight de negocio:
Cómo saber si necesitas integrar tus sistemas

Technical Deep Dive:
Arquitectura event-driven utilizada en X

```

El contenido técnico puede atraer:

- desarrolladores;
- talento;
- partners;
- clientes técnicos.

Pero no debe dominar el SEO comercial.

---

# 47. Founder SEO

Los perfiles de Gabriel y Cleibert pueden reforzar la entidad de Next Wrld.

`/nosotros` puede enlazar hacia:

- LinkedIn;
- X;
- GitHub si corresponde.

Sus publicaciones también pueden enlazar hacia Insights.

Con el tiempo esto crea asociación entre:

```text
persona
↕
expertise
↕
Next Wrld

```

sin hacer que la homepage dependa de los founders.

---

# 48. AION como autoridad temática

AION puede producir contenido alrededor de:

- fitness;
- operaciones;
- membresías;
- gestión;
- producto;
- construcción SaaS.

Cuando sea apropiado, Next Wrld y AION pueden enlazarse mutuamente.

Pero debemos evitar crear una red artificial únicamente por SEO.

La conexión debe ser real:

> AION es un producto de Next Wrld.

---

# 49. Métricas SEO

No evaluar SEO únicamente con:

> tráfico orgánico.

Medir:

- impresiones relevantes;
- posiciones de queries comerciales;
- clicks;
- visitas a servicios;
- visitas a casos desde search;
- diagnóstico iniciado desde search;
- leads orgánicos;
- consultas de marca;
- backlinks relevantes.

---

# 50. KPI de autoridad

Una señal especialmente interesante será el crecimiento de búsquedas:

```text
Next Wrld
Next Wrld software
AION Next Wrld
Gabriel Next Wrld
Cleibert Next Wrld

```

Las búsquedas de marca indican que otros canales están generando interés.

---

# 51. Search Console

Debe convertirse en la fuente principal de SEO operativo.

Revisar periódicamente:

- indexación;
- sitemap;
- queries;
- páginas;
- CTR;
- Core Web Vitals;
- errores;
- canonicals detectadas.

No depender de búsquedas manuales `site:` para medir indexación.

---

# 52. Sitemap

El sitemap debe incluir únicamente URLs:

- canónicas;
- indexables;
- publicadas.

No incluir:

- redirects;
- error pages;
- páginas demo;
- previews;
- contenido vacío.

---

# 53. Robots

Robots debe permitir rastrear contenido público útil.

No utilizar `robots.txt` como mecanismo principal para eliminar URLs ya indexadas.

Para contenido temporal que no debe aparecer en búsqueda utilizar correctamente:

- `noindex`;
- redirects;
- eliminación.

---

# 54. Páginas que NO necesitamos inicialmente

No crear todavía:

```text
/careers
/partners
/resources
/ebooks
/webinars
/news
/press

```

salvo que exista una necesidad real.

Evitar replicar arquitecturas de empresas mucho más grandes solo porque se ven completas.

---

# 55. Prioridad de implementación

## Fase 1 — Core comercial

```text
/es
/es/diagnostico
/es/servicios/software-a-medida
/es/servicios/sistemas-de-gestion
/es/servicios/automatizacion
/es/casos
/es/nosotros

```

---

## Fase 2 — Evidencia

```text
/es/casos/aion-wellness
/es/casos/jfhp
/es/casos/inmocrm

```

---

## Fase 3 — Vertical

```text
/es/industrias/fitness
/es/industrias/inmobiliarias

```

Fitness primero.

---

## Fase 4 — Authority

```text
/es/insights
/es/insights/[slug]

```

Publicar inicialmente pocas piezas fuertes.

---

## Fase 5 — Inglés

Replicar las páginas realmente relevantes con contenido revisado.

No es obligatorio traducir inmediatamente cada Insight.

---

# 56. Arquitectura inicial recomendada

```text
nextwrld.com
│
├── es/
│   │
│   ├── servicios/
│   │   ├── software-a-medida
│   │   ├── sistemas-de-gestion
│   │   └── automatizacion
│   │
│   ├── industrias/
│   │   ├── fitness
│   │   └── inmobiliarias
│   │
│   ├── casos/
│   │   ├── aion-wellness
│   │   ├── jfhp
│   │   └── inmocrm
│   │
│   ├── insights/
│   │   └── [slug]
│   │
│   ├── diagnostico
│   ├── nosotros
│   └── contacto
│
└── en/
    └── equivalent structure

```

---

# 57. Relación entre páginas

La arquitectura comercial final debe sentirse así:

```text
                       HOME
                         │
            ┌────────────┼────────────┐
            ↓            ↓            ↓
        SERVICIOS    INDUSTRIAS      CASOS
            │            │            │
            └──────┬─────┴─────┬──────┘
                   ↓           ↓
                INSIGHTS    EVIDENCIA
                   │           │
                   └─────┬─────┘
                         ↓
                    DIAGNÓSTICO

```

Todos los caminos importantes terminan en la misma acción comercial.

---

# 58. Definition of Done por página

Una nueva página SEO no se considera terminada hasta tener:

- intención claramente definida;
- URL correcta;
- H1 único;
- title;
- meta description;
- canonical;
- hreflang cuando corresponda;
- contenido útil;
- enlaces internos;
- CTA;
- imágenes optimizadas cuando existan;
- mobile correcto;
- schema cuando corresponda;
- indexabilidad validada.

---

# 59. Regla de calidad

Antes de publicar una URL debemos preguntarnos:

> ¿Esta página aporta algo que la homepage no puede explicar correctamente?

Si la respuesta es no:

**no crearla.**

---

# 60. Principio final

La estrategia SEO de Next Wrld no consiste en tener muchas páginas.

Consiste en construir progresivamente una relación clara entre:

```text
PROBLEMAS
   ↓
CONOCIMIENTO
   ↓
SERVICIOS
   ↓
EVIDENCIA
   ↓
NEXT WRLD

```

Google debe entender qué hacemos.

El visitante debe entender por qué importa.

Y ambos deben encontrar suficiente evidencia para considerar a Next Wrld una opción seria.

El resultado deseado no es solamente más tráfico.

Es:

> **que cuando una empresa tenga un problema operativo que pueda resolverse con software, Next Wrld sea una de las opciones que tenga sentido considerar.**

