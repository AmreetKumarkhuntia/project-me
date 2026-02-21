import type { ProjectItem } from "$generated/types/Configuration";

export const projects: ProjectItem[] = [
  {
    id: "knik",
    title: "Knik (AI Voice Console)",
    subTitle: null,
    category: null,
    fullDescription: null,
    links: null,
    stats: null,
    detailedSections: null,
    tags: ["AI", "Local First", "React", "FastAPI"],
    problem: {
      title: "THE PROBLEM",
      description:
        "High latency and privacy concerns with cloud-based voice assistants.",
    },
    engineering: {
      title: "THE ENGINEERING",
      description:
        "Integrated Kokoro-82M TTS with an async FastAPI backend and React frontend for sub-second latency and smooth UI.",
    },
    impact: {
      value: "Real-time",
      description: "local voice interaction",
    },
    architecture: {
      title: "System Architecture",
      controlPlane: {
        label: "// Control Plane",
        items: ["FastAPI Orchestrator", "MCP Router"],
      },
      dataPlane: {
        label: "// Data Plane",
        nodes: ["Kokoro TTS", "Local Tools"],
      },
    },
  },
  {
    id: "lilac",
    title: "Lilac (TypeScript Logging Package)",
    subTitle: null,
    category: null,
    fullDescription: null,
    links: null,
    stats: null,
    detailedSections: null,
    tags: ["TypeScript", "NPM"],
    problem: {
      title: "THE PROBLEM",
      description:
        "Debugging was slow and inefficient due to lack of structured logging.",
    },
    engineering: {
      title: "THE ENGINEERING",
      description:
        "Conceptualized and deployed a lightweight TypeScript logging package to NPM.",
    },
    impact: {
      value: "20%",
      description: "reduction in debugging time",
    },
    architecture: {
      title: "System Architecture",
      controlPlane: {
        label: "// Core",
        items: ["Lightweight Logger", "Custom Transports"],
      },
      dataPlane: {
        label: "// Output",
        nodes: ["Console", "File", "Remote"],
      },
    },
  },
  {
    id: "vernix",
    title: "Vernix (Svelte Component Package)",
    subTitle: null,
    category: null,
    fullDescription: null,
    links: null,
    stats: null,
    detailedSections: null,
    tags: ["Svelte", "UI/UX", "NPM"],
    problem: {
      title: "THE PROBLEM",
      description:
        "Inconsistent design patterns and slow UI development across projects.",
    },
    engineering: {
      title: "THE ENGINEERING",
      description:
        "Developed and published a component library with 10+ reusable components and built-in transitions.",
    },
    impact: {
      value: "10+",
      description: "reusable components",
    },
    architecture: {
      title: "Library Structure",
      controlPlane: {
        label: "// Components",
        items: ["Buttons", "Inputs", "Modals"],
      },
      dataPlane: {
        label: "// Integration",
        nodes: ["SvelteKit", "Vite"],
      },
    },
  },
  {
    id: "hospital-api",
    title: "Hospital API",
    subTitle: null,
    category: null,
    fullDescription: null,
    links: null,
    stats: null,
    detailedSections: null,
    tags: ["Backend", "API", "Filtering"],
    problem: {
      title: "THE PROBLEM",
      description:
        "Slow retrieval of critical patient data affecting care coordination efficiency.",
    },
    engineering: {
      title: "THE ENGINEERING",
      description:
        "Implemented five advanced filtering mechanisms within the patient records API.",
    },
    impact: {
      value: "60%",
      description: "faster data retrieval",
    },
    architecture: {
      title: "API Architecture",
      controlPlane: {
        label: "// Logic",
        items: ["Advanced Formatting", "Query Optimization"],
      },
      dataPlane: {
        label: "// Data",
        nodes: ["Database", "Cache"],
      },
    },
  },
  {
    id: "aegis-mesh",
    title: "AEGIS MESH:",
    subTitle: "Global Edge Architecture.",
    category: "INFRASTRUCTURE & DISTRIBUTED SYSTEMS",
    tags: ["Rust", "CDN", "Edge"],
    fullDescription:
      "Replacing legacy CDN infrastructure with a custom-built, Rust-powered edge-caching layer that reduced cold-start latency by 64% for 12M global users.",
    links: [
      { label: "View Repository", url: "#" },
      { label: "Technical Docs", url: "#" },
    ],
    stats: [
      { label: "TIMELINE", value: "Q3 2023 - Q1 2024" },
      { label: "SCALE", value: "1.2M Req/sec Peak" },
      { label: "COST SAVINGS", value: "$220k / Month" },
    ],
    detailedSections: [
      {
        id: "executive-summary",
        title: "EXECUTIVE SUMMARY",
        content:
          "The mission was to eliminate vendor lock-in and provide sub-50ms global content delivery through a proprietary mesh network.\n\nAs lead system architect, I directed the migration from a third-party managed CDN to a custom-orchestrated edge mesh. The primary challenge was maintaining strong consistency for dynamic assets across 42 global POPs while minimizing the overhead of the data plane.",
        keyContribution:
          '"Designed a novel eventual-consistency protocol for edge metadata synchronization that reduced inter-region chatter by 40%, directly translating to lower cloud egress costs."',
      },
      {
        id: "system-architecture",
        title: "SYSTEM ARCHITECTURE",
        content:
          "Detailed architecture design and implementation of the edge nodes and control plane.",
        keyContribution: null,
      },
      {
        id: "engineering-stack",
        title: "ENGINEERING STACK",
        content:
          "Overview of technologies used including Rust, distributed key-value stores, and anycast routing.",
        keyContribution: null,
      },
      {
        id: "technical-decisions",
        title: "TECHNICAL DECISIONS",
        content: "Key decisions made during the design phase.",
        keyContribution: null,
      },
      {
        id: "performance-metrics",
        title: "PERFORMANCE METRICS",
        content:
          "Breakdown of the 64% latency reduction and overall system throughput.",
        keyContribution: null,
      },
      {
        id: "postmortem",
        title: "POSTMORTEM",
        content:
          "Lessons learned from the deployment and what we would do differently.",
        keyContribution: null,
      },
    ],
    problem: {
      title: "THE PROBLEM",
      description: "High costs and vendor lock-in with existing managed CDN.",
    },
    engineering: {
      title: "THE ENGINEERING",
      description: "Custom Rust-powered edge-caching layer.",
    },
    impact: {
      value: "64%",
      description: "latency reduction",
    },
    architecture: {
      title: "System Architecture",
      controlPlane: {
        label: "// Control Plane",
        items: ["Orchestrator", "Routing"],
      },
      dataPlane: {
        label: "// Data Plane",
        nodes: ["Edge Nodes", "Cache"],
      },
    },
  },
];
