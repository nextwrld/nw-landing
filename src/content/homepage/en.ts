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
        approved: false,
      },
      {
        id: "method",
        label: "Method",
        destination: null,
        approved: false,
      },
      {
        id: "cases",
        label: "Cases",
        destination: null,
        approved: false,
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
        destination: null,
        approved: false,
      },
    ],
  },
  hero: {
    id: "hero",
    eyebrow: "SOFTWARE FOR OPERATIONS THAT ARE GROWING",
    h1: "Your company shouldn't grow by multiplying manual work.",
    supporting:
      "We build software for companies that need to centralize processes, connect tools, and automate the work that today depends on spreadsheets, messages, and manual tasks.",
    secondaryLine: "Less administrative work. More control over your operation.",
    primaryCta: "Analyze my operation",
    secondaryCta: "See cases",
    microcopy: "Free diagnosis · 30–45 minutes",
  },
  problem: {
    id: "problem",
    heading: "Your company may have grown faster than the way it operates.",
    intro:
      "What worked with ten clients, a small team, or a few operations can become a limitation as the business grows.",
    cards: [
      {
        id: "excel-system",
        title: "Excel became the system",
        body: "Critical information lives in spreadsheets that grow more complex, harder to maintain, and dependent on the person who created them.",
      },
      {
        id: "whatsapp-process",
        title: "WhatsApp is part of the process",
        body: "Orders, decisions, and important information end up scattered across chats and people.",
      },
      {
        id: "disconnected-tools",
        title: "The tools aren't connected",
        body: "The team copies information from one system to another just to keep the operation running.",
      },
      {
        id: "repetitive-tasks",
        title: "Too many repetitive tasks",
        body: "Administrative processes consume hours every week even though they always follow the same rules.",
      },
      {
        id: "indispensable-people",
        title: "Some people can't be missing",
        body: "Part of the operation depends on knowledge that exists only in someone's head.",
      },
      {
        id: "slow-reporting",
        title: "Getting information costs too much",
        body: "A simple answer requires searching, consolidating, and validating data from different places.",
      },
    ],
  },
  impact: {
    id: "impact",
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
    eyebrow: "WHAT WE CAN BUILD",
    heading: "Technology designed around your operation.",
    supporting:
      "Some companies need to replace one process. Others need to connect five tools. Others need a complete system. We design the solution around the problem, not the other way around.",
    items: [
      {
        id: "custom-software",
        title: "Custom software",
        body: "We design and build systems for operations that don't fit well inside generic tools.",
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
        body: "We centralize processes, information, and reporting so the operation can be managed from a clearer place.",
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
        body: "We connect the tools you already use and automate tasks that don't need constant human intervention.",
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
      body: "We incorporate it when it can add concrete value to a process: analyzing, classifying, assisting, searching for information, or automating decisions.",
    },
  },
  method: {
    id: "method",
    eyebrow: "HOW WE WORK",
    heading: "From understanding the problem to building something that works inside your operation.",
    body: "Our process avoids starting with features. First we understand, then we decide what is worth building.",
    stages: [
      {
        id: "discover",
        name: "Discover",
        label: "Understand",
        headline: "What is really happening?",
        copy: "We understand how the operation works today, what the business wants to achieve, where friction exists, and what depends on manual work.",
        output: "Outcome: clear problem and context.",
      },
      {
        id: "shape",
        name: "Shape",
        label: "Decide",
        headline: "What is worth solving?",
        copy: "We turn what we learned into priorities, scope, and a concrete direction before investing in development.",
        output: "Outcome: initial solution and roadmap.",
      },
      {
        id: "build",
        name: "Build",
        label: "Build",
        headline: "We turn the direction into a product.",
        copy: "We design and develop the system, its integrations, and automations around the agreed scope.",
        output: "Outcome: software ready to enter operation.",
      },
      {
        id: "launch",
        name: "Launch",
        label: "Integrate",
        headline: "The software starts working alongside the business.",
        copy: "We implement, connect data and tools, support users, and bring the solution into real operation.",
        output: "Outcome: system in use.",
      },
      {
        id: "evolve",
        name: "Evolve",
        label: "Improve",
        headline: "What works today may need to change tomorrow.",
        copy: "We measure, learn, and evolve the system as users, processes, and business needs change.",
        output: "Outcome: a solution that can grow with the operation.",
      },
    ],
    microcopy:
      "The process can adapt to the size and complexity of each project. Not everyone needs to start from scratch.",
  },
  differentiation: {
    id: "differentiation",
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
    heading: "We also build our own products.",
    showcase: {
      id: "aion",
      heading: "AION",
      role: "Next Wrld's own product",
      summary:
        "AION is Next Wrld's own product. We are defining its verified capabilities and results; this section will be updated once that data is approved.",
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
        claim: "Placeholder visual · case pending approval.",
        approved: false,
      },
      {
        id: "automation",
        heading: "Automation",
        qualification: "mvp",
        claimId: "automation",
        asset: "automation-support.svg",
        destination: null,
        claim: "Placeholder visual · case pending approval.",
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
          "InmoCRM: an MVP in development based on applied software-engineering research.",
        approved: false,
      },
    ],
  },
  faq: {
    id: "faq",
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
    primaryCtaHref: "#diagnosis",
    microcopy: "Free diagnosis · 30–45 minutes · no obligation.",
    secondaryCta: {
      label: "Continue on WhatsApp",
      destination: null,
      leaveSiteNote: "Activating this link takes you off the site.",
    },
  },
};
