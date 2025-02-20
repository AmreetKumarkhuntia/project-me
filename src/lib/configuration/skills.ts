import type {
  Database,
  Framework,
  Language,
  Tool,
} from "$generated/types/Projects.ts";

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
