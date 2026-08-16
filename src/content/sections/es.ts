import type { SectionContent } from "./types";

/**
 * ES section-page content (Fase 1 provisional-but-real copy). Every route is
 * registered with complete narrative content so the "never link to empty
 * content" gate can admit the ES skeleton; `insights` stays `approved: false`
 * until approved content exists (withheld from nav, footer, sitemap).
 */
export const sectionsES: SectionContent[] = [
  {
    route: "software-a-medida",
    seo: {
      title: "Software a medida | Next Wrld",
      description:
        "Diseñamos y desarrollamos software a medida para operaciones que no encajan en herramientas genéricas.",
    },
    heading: "Software a medida para tu operación",
    intro:
      "Cuando tu operación no encaja bien en las herramientas disponibles, construimos el sistema que sí encaja: alrededor de tus procesos, no al revés.",
    sections: [
      {
        id: "diseno-alrededor-del-problema",
        heading: "Diseñado alrededor del problema",
        body: "Empezamos entendiendo cómo funciona tu operación hoy y qué necesita cambiar antes de decidir qué construir.",
      },
      {
        id: "plataformas-internas",
        heading: "Plataformas internas, portales y backoffices",
        body: "Sistemas que centralizan procesos, información y decisiones para equipos que operan con herramientas sueltas.",
      },
      {
        id: "cuando-tiene-sentido",
        heading: "¿Cuándo tiene sentido el software a medida?",
        body: "Cuando los procesos importantes dependen de planillas, mensajes y tareas manuales que las herramientas genéricas no resuelven.",
      },
    ],
    approved: true,
  },
  {
    route: "sistemas-de-gestion",
    seo: {
      title: "Sistemas de gestión | Next Wrld",
      description:
        "Centralizamos procesos, información y reporting para gestionar tu operación desde un lugar más claro.",
    },
    heading: "Sistemas de gestión para centralizar tu operación",
    intro:
      "Un sistema de gestión ordena la información dispersa: clientes, operaciones, administración, inventario y reporting en un solo lugar.",
    sections: [
      {
        id: "informacion-centralizada",
        heading: "Información centralizada",
        body: "Reemplazamos las planillas y chats por un lugar único donde la operación se registra y consulta.",
      },
      {
        id: "procesos-y-workflows",
        heading: "Procesos y workflows",
        body: "Definimos el flujo de trabajo para que cada tarea tenga un dueño, un estado y un registro.",
      },
      {
        id: "reporting-claro",
        heading: "Reporting sin fricción",
        body: "Obtener una respuesta deja de requerir buscar, consolidar y validar datos en diferentes lugares.",
      },
    ],
    approved: true,
  },
  {
    route: "automatizacion",
    seo: {
      title: "Automatización e integraciones | Next Wrld",
      description:
        "Conectamos las herramientas que ya usas y automatizamos tareas que no necesitan intervención humana constante.",
    },
    heading: "Automatización e integraciones",
    intro:
      "No siempre necesitas un sistema nuevo. A veces la solución es conectar las herramientas que ya usas y automatizar las tareas repetitivas.",
    sections: [
      {
        id: "integraciones",
        heading: "Herramientas conectadas",
        body: "Sincronizamos datos entre las aplicaciones que tu equipo ya usa para eliminar la copia manual.",
      },
      {
        id: "workflows-automatizados",
        heading: "Workflows y notificaciones",
        body: "Automatizamos tareas administrativas con reglas claras: procesamiento, notificaciones y seguimiento.",
      },
      {
        id: "ia-concreta",
        heading: "IA donde aporta valor",
        body: "Incorporamos inteligencia artificial solo cuando mejora una tarea concreta: clasificar, asistir o automatizar decisiones.",
      },
    ],
    approved: true,
  },
  {
    route: "como-trabajamos",
    seo: {
      title: "Cómo trabajamos | Next Wrld",
      description:
        "Un proceso en cinco etapas: entender el problema, decidir qué vale la pena, construir, integrar y evolucionar.",
    },
    heading: "Cómo trabajamos",
    intro:
      "Evitamos empezar por features. Primero entendemos, después decidimos qué vale la pena construir y solo entonces construimos.",
    sections: [
      {
        id: "discover",
        heading: "Discover",
        body: "Entendemos cómo funciona hoy la operación y dónde existe fricción.",
      },
      {
        id: "shape",
        heading: "Shape",
        body: "Convertimos lo aprendido en prioridades, alcance y una dirección concreta.",
      },
      {
        id: "build",
        heading: "Build",
        body: "Diseñamos y desarrollamos el sistema alrededor del alcance acordado.",
      },
      {
        id: "launch",
        heading: "Launch",
        body: "Implementamos, conectamos datos y herramientas y acompañamos a los usuarios.",
      },
      {
        id: "evolve",
        heading: "Evolve",
        body: "Medimos, aprendemos y evolucionamos el sistema con la operación.",
      },
    ],
    approved: true,
  },
  {
    route: "casos",
    seo: {
      title: "Casos | Next Wrld",
      description:
        "Trabajo real de Next Wrld: productos y sistemas construidos para operaciones en crecimiento.",
    },
    heading: "Trabajo real",
    intro:
      "Seleccionamos casos reales de trabajo: productos propios y sistemas construidos para operaciones en crecimiento.",
    sections: [
      {
        id: "narrativa",
        heading: "Cómo leemos un caso",
        body: "Cada caso cuenta el problema de la operación, el diseño de la solución y el alcance real del trabajo.",
      },
      {
        id: "diagnostico",
        heading: "¿Tu operación se parece a alguna?",
        body: "Si identificas fricciones parecidas, el diagnóstico operativo es el primer paso para entender qué conviene construir.",
      },
    ],
    cases: [
      { slug: "gym-access-os", approved: true },
      { slug: "chatbot", approved: true },
      { slug: "crm", approved: true },
    ],
    approved: true,
  },
  {
    route: "insights",
    seo: {
      title: "Insights | Next Wrld",
      description:
        "Apuntes sobre software a medida, operaciones y automatización. Contenido pendiente de aprobación.",
    },
    heading: "Insights",
    intro:
      "Apuntes prácticos sobre cómo las empresas en crecimiento dejan de depender del trabajo manual.",
    sections: [
      {
        id: "pendiente",
        heading: "Contenido en preparación",
        body: "Publicaremos notas cuando el contenido esté aprobado.",
      },
    ],
    approved: false,
  },
  {
    route: "nosotros",
    seo: {
      title: "Nosotros | Next Wrld",
      description:
        "Next Wrld diseña software a medida para empresas que necesitan reducir trabajo manual y operar con más control.",
    },
    heading: "Por qué Next Wrld",
    intro:
      "Diferentes operaciones, el mismo principio: entender antes de construir. No somos una fábrica de features.",
    sections: [
      {
        id: "criterio-antes-que-codigo",
        heading: "Criterio antes que código",
        body: "Entender qué no deberíamos construir puede ser tan importante como decidir qué sí.",
      },
      {
        id: "negocio-y-tecnologia",
        heading: "Negocio + tecnología",
        body: "Conectamos objetivos operativos con decisiones de producto, diseño e ingeniería.",
      },
      {
        id: "calidad",
        heading: "Calidad más allá de que funcione",
        body: "Producto, experiencia, arquitectura y operación forman parte de la misma solución.",
      },
    ],
    approved: true,
  },
  {
    route: "diagnostico",
    seo: {
      title: "Diagnóstico operativo gratuito | Next Wrld",
      description:
        "Una conversación de 30–45 minutos, gratuita y sin compromiso, enfocada en un proceso concreto de tu operación.",
    },
    heading: "Diagnóstico operativo",
    intro:
      "Antes de decidir qué construir, entendamos qué está frenando tu operación. Gratuito, 30–45 minutos, sin compromiso.",
    sections: [
      {
        id: "oferta",
        heading: "En qué consiste",
        body: "Una conversación enfocada en un proceso concreto, no una demo de servicios.",
      },
      {
        id: "siguiente-paso",
        heading: "Siguiente paso",
        body: "Completa el formulario de contexto y coordinamos la conversación.",
      },
    ],
    approved: true,
  },
];
