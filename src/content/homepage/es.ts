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
      "Diseñamos software para empresas que necesitan centralizar procesos, conectar herramientas y automatizar el trabajo que hoy depende de planillas, mensajes y tareas manuales.",
    secondaryLine: "Menos trabajo administrativo. Más control sobre tu operación.",
    primaryCta: "Analizar mi operación",
    secondaryCta: "Ver casos",
    secondaryCtaHref: "/como-trabajamos",
    microcopy: "Diagnóstico gratuito · 30–45 minutos",
  },
  problem: {
    id: "problem",
    eyebrow: "02 · CUANDO LA OPERACIÓN SE QUEDA ATRÁS",
    heading: "Tu empresa puede haber crecido más rápido que su forma de operar.",
    intro:
      "Lo que funcionaba con diez clientes, un equipo pequeño o pocas operaciones puede convertirse en una limitación cuando el negocio crece.",
            transformation: [
          { from: "Manual", to: "Automatizado" },
          { from: "Disperso", to: "Centralizado" },
          { from: "Desconectado", to: "Integrado" },
          { from: "Dependiente", to: "Repetible" },
        ],
cards: [
      {
        id: "excel-system",
        title: "Excel se convirtió en el sistema",
        body: "Información crítica vive en hojas cada vez más complejas, difíciles de mantener y dependientes de quien las creó.",
      },
      {
        id: "whatsapp-process",
        title: "WhatsApp forma parte del proceso",
        body: "Pedidos, decisiones e información importante quedan repartidos entre chats y personas.",
      },
      {
        id: "disconnected-tools",
        title: "Las herramientas no están conectadas",
        body: "El equipo copia información de un sistema a otro para mantener la operación funcionando.",
      },
      {
        id: "repetitive-tasks",
        title: "Demasiadas tareas repetitivas",
        body: "Procesos administrativos consumen horas cada semana aunque sigan siempre las mismas reglas.",
      },
      {
        id: "indispensable-people",
        title: "Hay personas que no pueden faltar",
        body: "Parte de la operación depende de conocimiento que existe únicamente en la cabeza de alguien.",
      },
      {
        id: "slow-reporting",
        title: "Obtener información cuesta demasiado",
        body: "Una respuesta simple requiere buscar, consolidar y validar datos desde diferentes lugares.",
      },
    ],
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
      "Algunas empresas necesitan reemplazar un proceso. Otras conectar cinco herramientas. Otras construir un sistema completo. Diseñamos la solución alrededor del problema, no al revés.",
    items: [
      {
        id: "custom-software",
        title: "Software a medida",
        body: "Diseñamos y desarrollamos sistemas para operaciones que no encajan bien dentro de herramientas genéricas.",
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
        body: "Centralizamos procesos, información y reporting para que la operación pueda gestionarse desde un lugar más claro.",
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
        body: "Conectamos las herramientas que ya utilizas y automatizamos tareas que no necesitan intervención humana constante.",
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
      body: "La incorporamos cuando puede aportar valor concreto al proceso: analizar, clasificar, asistir, buscar información o automatizar decisiones.",
    },
  },
  method: {
    id: "method",
    eyebrow: "04 · CÓMO TRABAJAMOS",
    heading:
      "De entender el problema a construir algo que funciona dentro de tu operación.",
    body: "Nuestro proceso evita empezar por features. Primero entendemos, después decidimos qué vale la pena construir.",
    stages: [
      {
        id: "discover",
        name: "Discover",
        label: "Entender",
        headline: "¿Qué está pasando realmente?",
        copy: "Entendemos cómo funciona hoy la operación, qué quiere conseguir el negocio, dónde existe fricción y qué depende de trabajo manual.",
        output: "Resultado: problema y contexto claros.",
      },
      {
        id: "shape",
        name: "Shape",
        label: "Decidir",
        headline: "¿Qué vale la pena resolver?",
        copy: "Convertimos lo aprendido en prioridades, alcance y una dirección concreta antes de invertir en desarrollo.",
        output: "Resultado: solución y roadmap inicial.",
      },
      {
        id: "build",
        name: "Build",
        label: "Construir",
        headline: "Convertimos la dirección en producto.",
        copy: "Diseñamos y desarrollamos el sistema, sus integraciones y automatizaciones alrededor del alcance acordado.",
        output: "Resultado: software listo para entrar en operación.",
      },
      {
        id: "launch",
        name: "Launch",
        label: "Integrar",
        headline: "El software empieza a convivir con el negocio.",
        copy: "Implementamos, conectamos datos y herramientas, acompañamos usuarios y llevamos la solución a la operación real.",
        output: "Resultado: sistema en uso.",
      },
      {
        id: "evolve",
        name: "Evolve",
        label: "Mejorar",
        headline: "Lo que funciona hoy puede necesitar cambiar mañana.",
        copy: "Medimos, aprendemos y evolucionamos el sistema a medida que cambian usuarios, procesos y necesidades del negocio.",
        output: "Resultado: una solución que puede crecer con la operación.",
      },
    ],
    microcopy:
      "El proceso puede adaptarse al tamaño y complejidad de cada proyecto. No todos necesitan empezar desde cero.",
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
    heading: "También construimos nuestros propios productos.",
    showcase: {
      id: "aion",
      heading: "AION",
      role: "Producto propio de Next Wrld",
      summary:
        "AION es el producto propio de Next Wrld. Estamos definiendo sus capacidades verificadas y resultados; esta sección se actualiza cuando esos datos estén aprobados.",
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
        claim: "Visual de ejemplo · caso pendiente de aprobación.",
        approved: false,
      },
      {
        id: "automation",
        heading: "Automatización",
        qualification: "mvp",
        claimId: "automation",
        asset: "automation-support.svg",
        destination: null,
        claim: "Visual de ejemplo · caso pendiente de aprobación.",
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
          "InmoCRM: MVP en desarrollo basado en investigación aplicada en ingeniería de software.",
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
      nonObligation: "Sin compromiso de contratar.",
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
