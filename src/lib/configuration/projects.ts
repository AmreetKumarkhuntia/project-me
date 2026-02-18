import type { ProjectItem } from "$generated/types/Configuration";

export const projects: ProjectItem[] = [
  {
    title: "Lilac (TypeScript Logging Package)",
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
    title: "Vernix (Svelte Component Package)",
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
    title: "Hospital API",
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
];
