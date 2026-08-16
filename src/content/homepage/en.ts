import type { HomepageContent } from "./types";

export const homepageEN: HomepageContent = {
  locale: "en",
  seo: {
    title: "Custom software for companies | Next Wrld",
    description:
      "We build custom software for companies that need to reduce manual processes, connect tools, and operate with more control.",
  },
  nav: {
    items: [
      {
        id: "services",
        label: "Services",
        destination: null,
        approved: true,
        children: [
          {
            id: "software-a-medida",
            label: "Custom software",
            destination: "/servicios/software-a-medida",
            approved: true,
          },
          {
            id: "sistemas-de-gestion",
            label: "Management systems",
            destination: "/servicios/sistemas-de-gestion",
            approved: true,
          },
          {
            id: "automatizacion",
            label: "Automation",
            destination: "/servicios/automatizacion",
            approved: true,
          },
        ],
      },
      {
        id: "method",
        label: "Method",
        destination: "/como-trabajamos",
        approved: true,
      },
      {
        id: "cases",
        label: "Cases",
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
        label: "About",
        destination: "/nosotros",
        approved: true,
      },
    ],
  },
  hero: {
    id: "hero",
    eyebrow: "01 · SOFTWARE FOR OPERATIONS THAT ARE GROWING",
    h1: "Your company shouldn't grow by multiplying manual work.",
    supporting:
      "We design software to centralize processes, connect tools, and automate the work that today depends on spreadsheets, messages, and manual tasks.",
    secondaryLine: "Less administration. More control over your operation.",
    primaryCta: "Analyze my operation",
    secondaryCta: "How we work",
    secondaryCtaHref: "/como-trabajamos",
    microcopy: "Free diagnosis · 30–45 minutes",
  },
  problem: {
    id: "problem",
    eyebrow: "02 · WHEN THE OPERATION FALLS BEHIND",
    heading: "Your company may have grown faster than the way you manage it.",
    intro:
      "What worked with a small team can become a limitation as clients, people, and complexity grow.",
    cards: [
      {
        id: "planillas-sistema",
        title: "Spreadsheets that became the system",
        body: "Critical information ends up depending on files that get harder and harder to maintain.",
      },
      {
        id: "whatsapp-procesos",
        title: "Processes living in WhatsApp",
        body: "Decisions, orders, and operational information are scattered across chats and people.",
      },
      {
        id: "herramientas-desconectadas",
        title: "Disconnected tools",
        body: "The team moves information between systems by hand to keep everything working.",
      },
      {
        id: "personas-clave",
        title: "People who cannot be missing",
        body: "Part of the operation depends on knowledge that does not yet exist inside a process or system.",
      },
    ],
    statement:
      "More growth should not mean more administration.",
    transformation: [
      { from: "Manual", to: "Automated" },
      { from: "Dispersed", to: "Centralized" },
      { from: "Disconnected", to: "Integrated" },
      { from: "Dependent", to: "Repeatable" },
    ],
    closing:
      "Technology should reduce complexity, not add another tool to manage.",
  },
  impact: {
    id: "impact",
    eyebrow: "03 · THE COST OF STAYING THE SAME",
    heading:
      "The problem isn't that your operation doesn't work. It's that keeping it running costs more and more.",
    costPairs: [
      { cause: "More clients", effect: "More administration" },
      { cause: "More people", effect: "More coordination" },
      { cause: "More tools", effect: "More scattered information" },
      { cause: "More volume", effect: "More room for error" },
    ],
    closing: "Growth starts increasing complexity faster than the ability to manage it.",
  },
  betterWay: {
    id: "betterWay",
    eyebrow: "04 · A BETTER WAY TO OPERATE",
    heading: "Growing shouldn't mean doing more manual work.",
    intro:
      "When processes start to outgrow the tools that support them, the answer isn't always another application. Sometimes you need to connect what already exists, automate parts of the process, or build software around how your business works.",
    beforeAfter: [
      { before: "Manual processes", after: "Defined processes" },
      { before: "Scattered information", after: "Centralized information" },
      { before: "Isolated tools", after: "Connected systems" },
      { before: "Dependency on people", after: "Automation" },
      { before: "Manual reporting", after: "Available data" },
    ],
    closing:
      "We don't start by deciding which technology to use. We start by understanding what needs to change.",
  },
  capabilities: {
    id: "capabilities",
    eyebrow: "03 · WHAT WE SOLVE",
    heading: "Technology designed around your operation.",
    supporting:
      "Sometimes you need to build. Other times connect, centralize, or automate what already exists. The solution depends on the problem.",
    items: [
      {
        id: "custom-software",
        title: "Custom software",
        body: "Systems built around processes a generic tool does not solve well.",
        includes: [
          "internal platforms",
          "portals",
          "back offices",
          "digital products",
          "specific systems",
        ],
        linkLabel: "Explore custom software",
      },
      {
        id: "management-systems",
        title: "Management systems",
        body: "We centralize information and processes so the operation can be managed from a clearer place.",
        includes: [
          "operations",
          "customers",
          "administration",
          "inventory",
          "reporting",
          "workflows",
        ],
        linkLabel: "Explore management systems",
      },
      {
        id: "automation-and-integrations",
        title: "Automation and integrations",
        body: "We connect tools and remove tasks that do not need constant manual intervention.",
        includes: [
          "synchronization",
          "workflows",
          "notifications",
          "processing",
          "integrations",
          "administrative automations",
        ],
        linkLabel: "Explore automation",
      },
    ],
    aiTransversal: {
      heading: "Where does AI come in?",
      body: "AI is part of the solution when it improves a concrete task, not as a selling point on its own.",
    },
  },
  method: {
    id: "method",
    eyebrow: "04 · HOW WE WORK",
    heading: "From understanding the problem to building something that works inside your operation.",
    body: "Our process avoids starting with features. First we understand, then we decide what is worth building.",
    stages: [
      {
        id: "discover",
        name: "Discover",
        label: "Understand",
        headline: "What is really happening?",
        copy: "How it works today.",
        output: "Outcome: clear problem and context.",
      },
      {
        id: "shape",
        name: "Shape",
        label: "Decide",
        headline: "What is worth solving?",
        copy: "What is worth solving.",
        output: "Outcome: initial solution and roadmap.",
      },
      {
        id: "build",
        name: "Build",
        label: "Build",
        headline: "We turn the direction into a product.",
        copy: "Turning the direction into a product.",
        output: "Outcome: software ready to enter operation.",
      },
      {
        id: "launch",
        name: "Launch",
        label: "Integrate",
        headline: "The software starts working alongside the business.",
        copy: "Taking it into the real operation.",
        output: "Outcome: system in use.",
      },
      {
        id: "evolve",
        name: "Evolve",
        label: "Improve",
        headline: "What works today may need to change tomorrow.",
        copy: "Adapting it as the business changes.",
        output: "Outcome: a solution that can grow with the operation.",
      },
    ],
    microcopy: "Learn about our process",
  },
  differentiation: {
    id: "differentiation",
    eyebrow: "07 · WHY NEXT WRLD",
    heading: "Different operations. The same principle: understand before building.",
    pillars: [
      {
        id: "criterio-antes-que-codigo",
        title: "Judgment before code",
        body: "Understanding what we shouldn't build can be as important as deciding what we should.",
      },
      {
        id: "negocio-y-tecnologia",
        title: "Business + technology",
        body: "We connect operational goals with product, design, and engineering decisions.",
      },
      {
        id: "calidad-mas-alla-de-que-funcione",
        title: "Quality beyond “it works”",
        body: "Product, experience, architecture, and operations are part of the same solution.",
      },
      {
        id: "pensado-para-evolucionar",
        title: "Built to evolve",
        body: "We build considering what will happen as more users, processes, and needs arrive.",
      },
    ],
    optionalStatement: "We are not a feature factory.",
  },
  evidence: {
    id: "evidence",
    eyebrow: "05 · REAL WORK",
    heading: "We build for real operations. Also for ourselves.",
    showcase: {
      id: "aion",
      heading: "AION Wellness",
      role: "A PRODUCT BY NEXT WRLD",
      summary:
        "AION centralizes memberships, plans, payments, members, and daily closing within one platform built to simplify the management of fitness and sports businesses.",
      statusNote: "Placeholder visuals · verified capabilities and results pending validation.",
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
        claim: "From distributed administrative processes to a centralized platform.",
        approved: false,
      },
      {
        id: "automation",
        heading: "Automation",
        qualification: "mvp",
        claimId: "automation",
        asset: "automation-support.svg",
        destination: null,
        claim: "From distributed administrative processes to a centralized platform.",
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
          "From operational research to a PropTech MVP.",
        approved: false,
      },
    ],
  },
  faq: {
    id: "faq",
    eyebrow: "10 · FREQUENTLY ASKED QUESTIONS",
    heading: "Frequently asked questions",
    entries: [
      {
        id: "how-do-i-know",
        question: "How do I know if I need custom software?",
        answer:
          "It makes sense to evaluate it when your company's important processes no longer fit well in the tools you have, require too much manual work, or need specific adaptations to function.",
        approved: true,
      },
      {
        id: "replace-tools",
        question: "Do I have to replace the tools I already use?",
        answer:
          "Not necessarily. Often the best solution is to integrate or automate the existing tools. Building something new only makes sense when it provides a clear benefit.",
        approved: true,
      },
      {
        id: "start-one-process",
        question: "Can we start with a single process?",
        answer:
          "Yes. In fact, it is often better to begin with a concrete problem, measure the impact, and evolve from there.",
        approved: true,
      },
      {
        id: "duration",
        question: "How long does a project take?",
        answer:
          "It depends on scope. A specific automation can be resolved in weeks, while a complete system may require several months. The initial diagnosis lets us understand which scenario applies.",
        approved: true,
      },
      {
        id: "pricing",
        question: "How is pricing defined?",
        answer:
          "Based on scope, complexity, integrations, and uncertainty level. When a project requires deeper definition, we can run a Discovery phase before budgeting the full build.",
        approved: true,
      },
      {
        id: "post-launch",
        question: "What happens after launch?",
        answer:
          "We can keep working on improvements, new automations, integrations, and system evolution as your operation changes.",
        approved: true,
      },
      {
        id: "ai-use",
        question: "Where do you use artificial intelligence?",
        answer:
          "We use it when it improves a specific task: analyzing information, classifying data, assisting users, searching knowledge, or automating decisions. We don't add AI just to say a product has AI.",
        approved: true,
      },
    ],
  },
  diagnosis: {
    id: "diagnosis",
    eyebrow: "06 · OPERATIONAL DIAGNOSIS",
    heading: "Before deciding what to build, let's understand what is slowing your operation down.",
    offer: {
      duration: "30–45 minutes",
      cost: "Free",
      focus:
        "A conversation focused on one concrete process of your operation, not a services demo.",
      nonObligation: "No obligation to hire.",
      deliverables: { lines: [], approved: false },
    },
    context: {
      fields: {
        fullName: {
          label: "Full name",
          placeholder: "Your name",
          required: "Enter your name.",
        },
        company: {
          label: "Company",
          placeholder: "Your company name",
          required: "Enter your company name.",
        },
        email: {
          label: "Email",
          placeholder: "you@company.com",
          required: "Enter a valid email.",
        },
        operationArea: {
          label: "Operation area to improve",
          placeholder: "For example: sales, orders, inventory, administration",
          required: "Enter the area you want to improve.",
        },
      },
      privacy: {
        consent: "I agree that Next Wrld uses my data to contact me about the diagnosis.",
        required: "You must accept the use of your data to continue.",
        note: null,
      },
      submitLabel: "Continue",
      submittingLabel: "Sending…",
      statusSubmitting: "Sending your information…",
      statusAccepted:
        "We received your information. Our team will contact you to move the diagnosis forward.",
      statusSubmitError: "Review the highlighted fields and try again.",
      statusHandoffError:
        "We could not process your request right now. Please try again later.",
      retryLabel: "Try again",
      alternative: { label: "Or contact us directly", href: "/en/contact" },
    },
    whatsapp: {
      enabled: false,
      destination: null,
      message:
        "I arrived from Next Wrld and want to discuss a process in my company that we want to improve.",
      label: "Continue on WhatsApp",
      leaveSiteNote: "Activating this link takes you off the site to open WhatsApp.",
    },
    calendar: { available: false, availabilityClaim: null },
  },
  finalCta: {
    id: "finalCta",
    heading: "Your operation already works. Let's make it easier to grow.",
    primaryCta: "Analyze my operation",
    primaryCtaHref: "/diagnostico",
    microcopy: "Free diagnosis · 30–45 minutes · no obligation.",
    secondaryCta: {
      label: "Continue on WhatsApp",
      destination: null,
      leaveSiteNote: "Activating this link takes you off the site.",
    },
  },
};
