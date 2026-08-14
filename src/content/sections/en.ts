import type { SectionContent } from "./types";

/**
 * EN section-page content. Every route mirrors the ES structure but stays
 * `approved: false` until Fase 2 approved copy exists; the locale-parity gate
 * therefore keeps `publishedRoutes("en")` empty and withholds all EN links.
 */
export const sectionsEN: SectionContent[] = [
  {
    route: "software-a-medida",
    seo: {
      title: "Custom software | Next Wrld",
      description:
        "We design and build custom software for operations that don't fit well inside generic tools.",
    },
    heading: "Custom software for your operation",
    intro:
      "When your operation doesn't fit the tools available, we build the system that does fit — around your processes, not the other way around.",
    sections: [
      {
        id: "designed-around-the-problem",
        heading: "Designed around the problem",
        body: "We start by understanding how your operation works today and what needs to change before deciding what to build.",
      },
      {
        id: "internal-platforms",
        heading: "Internal platforms, portals, and back offices",
        body: "Systems that centralize processes, information, and decisions for teams operating with disconnected tools.",
      },
      {
        id: "when-it-makes-sense",
        heading: "When does custom software make sense?",
        body: "When critical processes depend on spreadsheets, messages, and manual tasks that generic tools don't solve.",
      },
    ],
    approved: false,
  },
  {
    route: "sistemas-de-gestion",
    seo: {
      title: "Management systems | Next Wrld",
      description:
        "We centralize processes, information, and reporting so you can manage your operation from a clearer place.",
    },
    heading: "Management systems to centralize your operation",
    intro:
      "A management system organizes scattered information: customers, operations, administration, inventory, and reporting in one place.",
    sections: [
      {
        id: "centralized-information",
        heading: "Centralized information",
        body: "We replace spreadsheets and chats with a single place where the operation is recorded and consulted.",
      },
      {
        id: "processes-and-workflows",
        heading: "Processes and workflows",
        body: "We define the workflow so every task has an owner, a state, and a record.",
      },
      {
        id: "clear-reporting",
        heading: "Frictionless reporting",
        body: "Getting an answer no longer requires searching, consolidating, and validating data in different places.",
      },
    ],
    approved: false,
  },
  {
    route: "automatizacion",
    seo: {
      title: "Automation and integrations | Next Wrld",
      description:
        "We connect the tools you already use and automate tasks that don't need constant human intervention.",
    },
    heading: "Automation and integrations",
    intro:
      "You don't always need a new system. Sometimes the answer is connecting the tools you already use and automating repetitive tasks.",
    sections: [
      {
        id: "integrations",
        heading: "Connected tools",
        body: "We sync data between the applications your team already uses to remove manual copying.",
      },
      {
        id: "automated-workflows",
        heading: "Workflows and notifications",
        body: "We automate administrative tasks with clear rules: processing, notifications, and follow-up.",
      },
      {
        id: "concrete-ai",
        heading: "AI where it adds value",
        body: "We incorporate artificial intelligence only when it improves a concrete task: classifying, assisting, or automating decisions.",
      },
    ],
    approved: false,
  },
  {
    route: "como-trabajamos",
    seo: {
      title: "How we work | Next Wrld",
      description:
        "A five-stage process: understand the problem, decide what's worth building, build, launch, and evolve.",
    },
    heading: "How we work",
    intro:
      "We avoid starting with features. First we understand, then we decide what is worth building, and only then do we build.",
    sections: [
      {
        id: "discover",
        heading: "Discover",
        body: "We understand how the operation works today and where friction exists.",
      },
      {
        id: "shape",
        heading: "Shape",
        body: "We turn what we learned into priorities, scope, and a concrete direction.",
      },
      {
        id: "build",
        heading: "Build",
        body: "We design and develop the system around the agreed scope.",
      },
      {
        id: "launch",
        heading: "Launch",
        body: "We implement, connect data and tools, and support users.",
      },
      {
        id: "evolve",
        heading: "Evolve",
        body: "We measure, learn, and evolve the system alongside the operation.",
      },
    ],
    approved: false,
  },
  {
    route: "casos",
    seo: {
      title: "Cases | Next Wrld",
      description:
        "Real work from Next Wrld: products and systems built for growing operations.",
    },
    heading: "Real work",
    intro:
      "We share real work: our own products and systems built for growing operations.",
    sections: [
      {
        id: "how-we-read-a-case",
        heading: "How we read a case",
        body: "Each case covers the operation's problem, the solution design, and the real scope of the work.",
      },
      {
        id: "diagnosis",
        heading: "Does your operation look similar?",
        body: "If you recognize similar friction, the operational diagnosis is the first step to understand what to build.",
      },
    ],
    cases: [],
    approved: false,
  },
  {
    route: "insights",
    seo: {
      title: "Insights | Next Wrld",
      description:
        "Notes on custom software, operations, and automation. Content pending approval.",
    },
    heading: "Insights",
    intro:
      "Practical notes on how growing companies stop depending on manual work.",
    sections: [
      {
        id: "pending",
        heading: "Content in preparation",
        body: "We will publish notes once the content is approved.",
      },
    ],
    approved: false,
  },
  {
    route: "nosotros",
    seo: {
      title: "About us | Next Wrld",
      description:
        "Next Wrld designs custom software for companies that need to reduce manual work and operate with more control.",
    },
    heading: "Why Next Wrld",
    intro:
      "Different operations, the same principle: understand before building. We are not a feature factory.",
    sections: [
      {
        id: "judgment-before-code",
        heading: "Judgment before code",
        body: "Understanding what we shouldn't build can be as important as deciding what we should.",
      },
      {
        id: "business-and-technology",
        heading: "Business + technology",
        body: "We connect operational goals with product, design, and engineering decisions.",
      },
      {
        id: "quality",
        heading: "Quality beyond it working",
        body: "Product, experience, architecture, and operations are part of the same solution.",
      },
    ],
    approved: false,
  },
  {
    route: "diagnostico",
    seo: {
      title: "Free operational diagnosis | Next Wrld",
      description:
        "A free 30–45 minute conversation, with no obligation, focused on one concrete process of your operation.",
    },
    heading: "Operational diagnosis",
    intro:
      "Before deciding what to build, let's understand what's slowing your operation down. Free, 30–45 minutes, no obligation.",
    sections: [
      {
        id: "offer",
        heading: "What it includes",
        body: "A conversation focused on one concrete process, not a services demo.",
      },
      {
        id: "next-step",
        heading: "Next step",
        body: "Complete the context form and we will schedule the conversation.",
      },
    ],
    approved: false,
  },
];
