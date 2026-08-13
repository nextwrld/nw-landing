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
  },
  impact: {
    id: "impact",
    heading:
      "The problem isn't that your operation doesn't work. It's that keeping it running costs more and more.",
  },
  betterWay: {
    id: "betterWay",
    heading: "Growing shouldn't mean doing more manual work.",
  },
  capabilities: {
    id: "capabilities",
    heading: "Technology designed around your operation.",
  },
  method: {
    id: "method",
    heading: "From understanding the problem to building something that works inside your operation.",
  },
  differentiation: {
    id: "differentiation",
    heading: "Different operations. The same principle: understand before building.",
  },
  evidence: {
    id: "evidence",
    heading: "We also build our own products.",
    items: [
      {
        id: "inmocrm",
        heading: "InmoCRM",
        qualification: "mvp",
        claimId: "inmocrm",
        asset: null,
        destination: null,
        claim: null,
        approved: false,
      },
    ],
  },
  faq: {
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
        id: "ownership",
        question: "Does the software belong to my company?",
        answer:
          "Yes. In custom software projects, the product developed for your company remains under the ownership conditions agreed from the start of the project.",
        approved: false,
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
  },
  finalCta: {
    id: "finalCta",
    heading: "Your operation already works. Let's make it easier to grow.",
  },
};
