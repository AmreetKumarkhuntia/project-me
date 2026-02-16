import type {
  Database,
  Framework,
  Language,
  Tool,
} from "$generated/types/Projects.ts";
import type { TechnicalCategory } from "$generated/types/Configuration.ts";

export const languages: Array<Language> = [
  "c",
  "cpp",
  "html",
  "javascript",
  "typescript",
  "haskell",
  "sass",
  "yaml",
  "bash",
];

export const frameworks: Array<Framework> = [
  "express",
  "react",
  "svelte",
  "tailwind",
  "servant",
  "next.js",
  "material-ui",
  "mustache",
];

export const tools: Array<Tool> = ["git", "docker", "kubernetes", "aws"];

export const databases: Array<Database> = [
  "mongodb",
  "postgresql",
  "mysql",
  "redis",
];

export const technicalInventory: Array<TechnicalCategory> = [
  {
    title: "CORE BACKEND",
    icon: "cpu",
    items: [
      {
        title: "Golang / Rust",
        badge: "Primary",
        desc: "Used for high-performance microservices and CLI tooling.",
      },
      {
        title: "Node.js (TS)",
        badge: "API Layer",
        desc: "Rapid prototyping and I/O intensive BFF layers.",
      },
    ],
  },
  {
    title: "PERSISTENCE",
    icon: "database",
    items: [
      {
        title: "PostgreSQL",
        badge: "Relational",
        desc: "Optimized for high-concurrency write-heavy workloads.",
      },
      {
        title: "Redis / Scylla",
        badge: "Distributed",
        desc: "Caching and highly-available partitioned storage.",
      },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    icon: "cloud",
    items: [
      {
        title: "K8s / Terraform",
        badge: "Automation",
        desc: "Declarative infrastructure and orchestration as standard.",
      },
      {
        title: "AWS / GCP",
        badge: "Cloud Native",
        desc: "Multi-cloud deployments with strict IAM and VPC isolation.",
      },
    ],
  },
];
