import type {
  Database,
  Framework,
  Language,
  Tool,
} from "$generated/types/Projects.ts";
import type { TechnicalCategory } from "$generated/types/Configuration.ts";

export const languages: Array<Language> = [
  "haskell",
  "typescript",
  "javascript",
  "c",
  "cpp",
  "sql",
  "groovy",
  "html",
  "css",
];

export const frameworks: Array<Framework> = [
  "react",
  "svelte",
  "express",
  "servant",
  "nodejs",
];

export const tools: Array<Tool> = [
  "git",
  "docker",
  "kubernetes",
  "aws",
  "gcp",
  "prometheus",
  "grafana",
  "kibana",
  "vector",
  "openobserve",
  "envoy",
  "squid",
];

export const databases: Array<Database> = [
  "postgresql",
  "clickhouse",
  "mongodb",
  "mysql",
  "redis",
];

export const technicalInventory: Array<TechnicalCategory> = [
  {
    title: "CORE BACKEND",
    icon: "cpu",
    items: [
      {
        title: "Haskell / Purescript",
        badge: "Functional",
        desc: "Strongly typed functional programming for reliable systems.",
      },
      {
        title: "TypeScript / Node.js",
        badge: "API Layer",
        desc: "Versatile language for both frontend and backend development.",
      },
    ],
    chips: [
      "Haskell",
      "PureScript",
      "TypeScript",
      "Node.js",
      "Express",
      "Servant",
    ],
  },
  {
    title: "PERSISTENCE",
    icon: "database",
    items: [
      {
        title: "PostgreSQL",
        badge: "Relational",
        desc: "Primary relational database for structured data.",
      },
      {
        title: "ClickHouse",
        badge: "Analytics",
        desc: "High-performance columnar database for real-time analytics.",
      },
    ],
    chips: ["PostgreSQL", "ClickHouse", "MongoDB", "MySQL", "Redis"],
  },
  {
    title: "INFRASTRUCTURE",
    icon: "cloud",
    items: [
      {
        title: "Kubernetes / Docker",
        badge: "Containerization",
        desc: "Orchestration and containerization for scalable deployments.",
      },
      {
        title: "AWS / GCP",
        badge: "Cloud",
        desc: "Experience with major cloud providers for hosting and services.",
      },
    ],
    chips: [
      "Kubernetes",
      "Docker",
      "AWS",
      "GCP",
      "Prometheus",
      "Grafana",
      "Envoy",
    ],
  },
  {
    title: "NETWORK",
    icon: "network",
    items: [],
    chips: ["Envoy", "Squid", "gRPC", "Istio", "OpenTelemetry"],
  },
  {
    title: "OBSERVABILITY",
    icon: "testing",
    items: [],
    chips: [
      "Prometheus",
      "Grafana",
      "Kibana",
      "Vector",
      "OpenObserve",
      "Kiali",
    ],
  },
  {
    title: "CI / CD",
    icon: "cicd",
    items: [],
    chips: ["GitHub Actions", "ArgoCD", "Helm", "Docker Compose"],
  },
];
