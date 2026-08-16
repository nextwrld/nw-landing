import type { HomepageContent } from "./types";

export const homepageES: HomepageContent = {
  locale: "es",
  seo: {
    title: "Software a medida para empresas | Next Wrld",
    description:
      "Diseñamos software a medida para empresas que necesitan reducir procesos manuales, conectar herramientas y operar con más control.",
  },
  nav: {
    items: [
      {
        id: "services",
        label: "Servicios",
        destination: null,
        approved: true,
        children: [
          {
            id: "software-a-medida",
            label: "Software a medida",
            destination: "/servicios/software-a-medida",
            approved: true,
          },
          {
            id: "sistemas-de-gestion",
            label: "Sistemas de gestión",
            destination: "/servicios/sistemas-de-gestion",
            approved: true,
          },
          {
            id: "automatizacion",
            label: "Automatización",
            destination: "/servicios/automatizacion",
            approved: true,
          },
        ],
      },
      {
        id: "method",
        label: "Método",
        destination: "/como-trabajamos",
        approved: true,
      },
      {
        id: "cases",
        label: "Casos",
        destination: "/casos",
        approved: true,
      },
      {
        id: "insights",
        label: "Insights",
        destination: null,
        approved: false,
      },
      {
        id: "about",
        label: "Nosotros",
        destination: "/nosotros",
        approved: true,
      },
    ],
  },
  hero: {
    id: "hero",
    eyebrow: "01 · SOFTWARE PARA OPERACIONES QUE ESTÁN CRECIENDO",
    h1: "Tu empresa no debería crecer multiplicando trabajo manual.",
    supporting:
      "Diseñamos software para centralizar procesos, conectar herramientas y automatizar el trabajo que hoy depende de planillas, mensajes y tareas manuales.",
    secondaryLine: "Menos administración. Más control sobre tu operación.",
    primaryCta: "Analizar mi operación",
    secondaryCta: "Cómo trabajamos",
    secondaryCtaHref: "/como-trabajamos",
    microcopy: "Diagnóstico gratuito · 30–45 minutos",
  },
  problem: {
    id: "problem",
    eyebrow: "02 · CUANDO LA OPERACIÓN SE QUEDA ATRÁS",
    heading: "Tu empresa puede haber crecido más rápido que la forma en que la gestionas.",
    intro:
      "Lo que funcionaba con un equipo pequeño puede convertirse en una limitación a medida que aumentan los clientes, las personas y la complejidad.",
    cards: [
      {
        id: "planillas-sistema",
        title: "Planillas que se volvieron sistemas",
        body: "Información crítica termina dependiendo de archivos cada vez más difíciles de mantener.",
      },
      {
        id: "whatsapp-procesos",
        title: "Procesos que viven en WhatsApp",
        body: "Decisiones, pedidos e información operativa quedan repartidos entre chats y personas.",
      },
      {
        id: "herramientas-desconectadas",
        title: "Herramientas desconectadas",
        body: "El equipo mueve información manualmente de un sistema a otro para mantener todo funcionando.",
      },
      {
        id: "personas-clave",
        title: "Personas que no pueden faltar",
        body: "Parte de la operación depende de conocimiento que todavía no existe dentro de un proceso o sistema.",
      },
    ],
    statement:
      "Más crecimiento no debería significar más administración.",
    transformation: [
      { from: "Manual", to: "Automatizado" },
      { from: "Disperso", to: "Centralizado" },
      { from: "Desconectado", to: "Integrado" },
      { from: "Dependiente", to: "Repetible" },
    ],
    closing:
      "La tecnología debe reducir complejidad, no agregar otra herramienta que administrar.",
  },
  impact: {
    id: "impact",
    eyebrow: "03 · EL COSTO DE SEGUIR IGUAL",
    heading:
      "El problema no es que tu operación no funcione. Es que cada vez cuesta más mantenerla funcionando.",
    costPairs: [
      { cause: "Más clientes", effect: "Más administración" },
      { cause: "Más personas", effect: "Más coordinación" },
      { cause: "Más herramientas", effect: "Más información dispersa" },
      { cause: "Más volumen", effect: "Más posibilidades de error" },
    ],
    closing:
      "El crecimiento empieza a aumentar la complejidad más rápido que la capacidad de gestionarla.",
  },
  betterWay: {
    id: "betterWay",
    eyebrow: "04 · UNA FORMA MEJOR DE OPERAR",
    heading: "Crecer no debería significar hacer más trabajo manual.",
    intro:
      "Cuando los procesos empiezan a superar las herramientas que los sostienen, la respuesta no siempre es comprar otra aplicación. A veces necesitas conectar lo que ya existe, automatizar partes del proceso o construir software alrededor de cómo funciona tu negocio.",
    beforeAfter: [
      { before: "Procesos manuales", after: "Procesos definidos" },
      { before: "Información dispersa", after: "Información centralizada" },
      { before: "Herramientas aisladas", after: "Sistemas conectados" },
      { before: "Dependencia de personas", after: "Automatización" },
      { before: "Reporting manual", after: "Datos disponibles" },
    ],
    closing:
      "No empezamos decidiendo qué tecnología usar. Empezamos entendiendo qué necesita cambiar.",
  },
  capabilities: {
    id: "capabilities",
    eyebrow: "03 · QUÉ RESOLVEMOS",
    heading: "Tecnología diseñada alrededor de tu operación.",
    supporting:
      "A veces necesitas construir. Otras veces conectar, centralizar o automatizar lo que ya existe. La solución depende del problema.",
    items: [
      {
        id: "custom-software",
        title: "Software a medida",
        body: "Sistemas construidos alrededor de procesos que una herramienta genérica no resuelve bien.",
        includes: [
          "plataformas internas",
          "portales",
          "backoffices",
          "productos digitales",
          "sistemas específicos",
        ],
        linkLabel: "Explorar software a medida",
      },
      {
        id: "management-systems",
        title: "Sistemas de gestión",
        body: "Centralizamos información y procesos para que la operación pueda gestionarse desde un lugar más claro.",
        includes: [
          "operaciones",
          "clientes",
          "administración",
          "inventario",
          "reporting",
          "workflows",
        ],
        linkLabel: "Explorar sistemas de gestión",
      },
      {
        id: "automation-and-integrations",
        title: "Automatización e integraciones",
        body: "Conectamos herramientas y eliminamos tareas que no necesitan intervención manual constante.",
        includes: [
          "sincronización",
          "workflows",
          "notificaciones",
          "procesamiento",
          "integraciones",
          "automatizaciones administrativas",
        ],
        linkLabel: "Explorar automatización",
      },
    ],
    aiTransversal: {
      heading: "¿Dónde entra la IA?",
      body: "La IA forma parte de la solución cuando mejora una tarea concreta, no como argumento de venta por sí solo.",
    },
  },
  method: {
    id: "method",
    eyebrow: "04 · CÓMO TRABAJAMOS",
    heading: "Entender antes de construir.",
    body: "Nuestro proceso evita empezar por features. Primero entendemos el problema y después decidimos qué vale la pena construir.",
    stages: [
      {
        id: "discover",
        name: "Discover",
        label: "Entender",
        headline: "¿Qué está pasando realmente?",
        copy: "Cómo funciona hoy.",
        output: "Resultado: problema y contexto claros.",
      },
      {
        id: "shape",
        name: "Shape",
        label: "Decidir",
        headline: "¿Qué vale la pena resolver?",
        copy: "Qué vale la pena resolver.",
        output: "Resultado: solución y roadmap inicial.",
      },
      {
        id: "build",
        name: "Build",
        label: "Construir",
        headline: "Convertimos la dirección en producto.",
        copy: "Convertir la dirección en producto.",
        output: "Resultado: software listo para entrar en operación.",
      },
      {
        id: "launch",
        name: "Launch",
        label: "Integrar",
        headline: "El software empieza a convivir con el negocio.",
        copy: "Llevarlo a la operación real.",
        output: "Resultado: sistema en uso.",
      },
      {
        id: "evolve",
        name: "Evolve",
        label: "Mejorar",
        headline: "Lo que funciona hoy puede necesitar cambiar mañana.",
        copy: "Adaptarlo a medida que el negocio cambia.",
        output: "Resultado: una solución que puede crecer con la operación.",
      },
    ],
    microcopy: "Conocer nuestro proceso",
  },
  differentiation: {
    id: "differentiation",
    eyebrow: "07 · POR QUÉ NEXT WRLD",
    heading: "Diferentes operaciones. El mismo principio: entender antes de construir.",
    pillars: [
      {
        id: "criterio-antes-que-codigo",
        title: "Criterio antes que código",
        body: "Entender qué no deberíamos construir puede ser tan importante como decidir qué sí.",
      },
      {
        id: "negocio-y-tecnologia",
        title: "Negocio + tecnología",
        body: "Conectamos objetivos operativos con decisiones de producto, diseño e ingeniería.",
      },
      {
        id: "calidad-mas-alla-de-que-funcione",
        title: "Calidad más allá de que “funcione”",
        body: "Producto, experiencia, arquitectura y operación forman parte de la misma solución.",
      },
      {
        id: "pensado-para-evolucionar",
        title: "Pensado para evolucionar",
        body: "Construimos considerando qué ocurrirá cuando entren más usuarios, procesos y necesidades.",
      },
    ],
    optionalStatement: "No somos una fábrica de features.",
  },
  evidence: {
    id: "evidence",
    eyebrow: "05 · TRABAJO REAL",
    heading: "Construimos para operaciones reales. También para nosotros.",
    showcase: {
      id: "aion",
      heading: "AION Wellness",
      role: "A PRODUCT BY NEXT WRLD",
      summary:
        "AION centraliza membresías, planes, pagos, socios y cierres de caja dentro de una plataforma creada para simplificar la gestión de centros deportivos y fitness.",
      statusNote: "Visuales de ejemplo · capacidades y resultados pendientes de validación.",
      asset: "aion-hero.svg",
      capabilities: [],
      approved: false,
    },
    items: [
      {
        id: "jfhp",
        heading: "JFHP",
        qualification: "mvp",
        claimId: "jfhp",
        asset: "jfhp-support.svg",
        destination: null,
        claim: "De procesos administrativos distribuidos a una plataforma centralizada.",
        approved: false,
      },
      {
        id: "automation",
        heading: "Automatización",
        qualification: "mvp",
        claimId: "automation",
        asset: "automation-support.svg",
        destination: null,
        claim: "De procesos administrativos distribuidos a una plataforma centralizada.",
        approved: false,
      },
      {
        id: "inmocrm",
        heading: "InmoCRM",
        qualification: "mvp",
        claimId: "inmocrm",
        asset: "inmocrm-mvp.svg",
        destination: null,
        claim:
          "De investigación operativa a un MVP PropTech.",
        approved: false,
      },
    ],
  },
  faq: {
    id: "faq",
    eyebrow: "10 · PREGUNTAS FRECUENTES",
    heading: "Preguntas frecuentes",
    entries: [
      {
        id: "how-do-i-know",
        question: "¿Cómo sé si necesito software a medida?",
        answer:
          "Tiene sentido evaluarlo cuando los procesos importantes de tu empresa ya no encajan bien en las herramientas disponibles, requieren demasiado trabajo manual o necesitan adaptaciones específicas para funcionar.",
        approved: true,
      },
      {
        id: "replace-tools",
        question: "¿Tengo que reemplazar las herramientas que ya utilizo?",
        answer:
          "No necesariamente. Muchas veces la mejor solución es integrar o automatizar las herramientas existentes. Construir algo nuevo solo tiene sentido cuando aporta un beneficio claro.",
        approved: true,
      },
      {
        id: "start-one-process",
        question: "¿Podemos empezar por un solo proceso?",
        answer:
          "Sí. De hecho, muchas veces es mejor comenzar por un problema concreto, medir el impacto y evolucionar desde allí.",
        approved: true,
      },
      {
        id: "duration",
        question: "¿Cuánto tarda un proyecto?",
        answer:
          "Depende del alcance. Una automatización puntual puede resolverse en semanas, mientras que un sistema completo puede requerir varios meses. El diagnóstico inicial nos permite entender qué escenario aplica.",
        approved: true,
      },
      {
        id: "pricing",
        question: "¿Cómo se define el precio?",
        answer:
          "Según alcance, complejidad, integraciones y nivel de incertidumbre. Cuando el proyecto requiere una definición más profunda, podemos realizar una etapa de Discovery antes de presupuestar la construcción completa.",
        approved: true,
      },
      {
        id: "post-launch",
        question: "¿Qué ocurre después del lanzamiento?",
        answer:
          "Podemos continuar trabajando en mejoras, nuevas automatizaciones, integraciones y evolución del sistema según cambie la operación.",
        approved: true,
      },
      {
        id: "ai-use",
        question: "¿Dónde utilizan inteligencia artificial?",
        answer:
          "La usamos cuando mejora una tarea concreta: analizar información, clasificar datos, asistir a usuarios, buscar conocimiento o automatizar decisiones. No incorporamos IA solo para decir que un producto tiene IA.",
        approved: true,
      },
    ],
  },
  diagnosis: {
    id: "diagnosis",
    eyebrow: "06 · DIAGNÓSTICO OPERATIVO",
    heading: "Antes de decidir qué construir, entendamos qué está frenando tu operación.",
    offer: {
      duration: "30–45 minutos",
      cost: "Gratuito",
      focus:
        "Una conversación enfocada en un proceso concreto de tu operación, no una demo de servicios.",
      nonObligation: "Sin obligación de contratar.",
      deliverables: { lines: [], approved: false },
    },
    context: {
      fields: {
        fullName: {
          label: "Nombre completo",
          placeholder: "Tu nombre",
          required: "Indica tu nombre.",
        },
        company: {
          label: "Empresa",
          placeholder: "Nombre de tu empresa",
          required: "Indica el nombre de tu empresa.",
        },
        email: {
          label: "Correo electrónico",
          placeholder: "tucorreo@empresa.com",
          required: "Indica un correo válido.",
        },
        operationArea: {
          label: "Área de la operación a mejorar",
          placeholder: "Por ejemplo: ventas, pedidos, inventario, administración",
          required: "Indica qué área quieres mejorar.",
        },
      },
      privacy: {
        consent: "Acepto que Next Wrld use mis datos para contactarme sobre el diagnóstico.",
        required: "Debes aceptar el uso de tus datos para continuar.",
        note: null,
      },
      submitLabel: "Continuar",
      submittingLabel: "Enviando…",
      statusSubmitting: "Enviando tu información…",
      statusAccepted:
        "Recibimos tu información. Nuestro equipo te contactará para avanzar con el diagnóstico.",
      statusSubmitError: "Revisa los campos marcados e inténtalo de nuevo.",
      statusHandoffError:
        "No pudimos procesar tu solicitud en este momento. Inténtalo de nuevo más tarde.",
      retryLabel: "Intentar de nuevo",
      alternative: { label: "O contáctanos directamente", href: "/es/contact" },
    },
    whatsapp: {
      enabled: false,
      destination: null,
      message:
        "Llegué desde Next Wrld y quiero hablar sobre un proceso de mi empresa que queremos mejorar.",
      label: "Continuar por WhatsApp",
      leaveSiteNote: "Al activar este enlace saldrás del sitio para abrir WhatsApp.",
    },
    calendar: { available: false, availabilityClaim: null },
  },
  finalCta: {
    id: "finalCta",
    heading: "Tu operación ya funciona. Hagamos que sea más fácil hacerla crecer.",
    primaryCta: "Analizar mi operación",
    primaryCtaHref: "/diagnostico",
    microcopy: "Diagnóstico gratuito · 30–45 minutos · sin compromiso.",
    secondaryCta: {
      label: "Continuar por WhatsApp",
      destination: null,
      leaveSiteNote: "Al activar este enlace saldrás del sitio.",
    },
  },
};
