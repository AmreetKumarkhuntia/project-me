// src/data/profile.ts — core identity & metrics (design.md §14)
import type { Metric, Principle } from "@/types";

export const profile = {
  name: "Amreet Khuntia",
  role: "Software & DevOps Engineer",
  based: "Bengaluru, India",
  focus: "Backend · Platform",
  status: "Available",
  availability: "Currently open to backend, platform & infrastructure roles.",
  contactBody:
    "Got a system to scale, a pipeline to tame — or a track to collab on? My inbox is open.",
} as const;

export const metrics: Metric[] = [
  {
    figure: "Sub-50ms",
    caption: "P95 Latency — High-throughput APIs",
    detail: "High-throughput APIs — Servant + Express services tuned for tight tail latencies.",
  },
  {
    figure: "99.99%",
    caption: "Uptime — Resilient infrastructure",
    accent: true,
    detail: "Resilient infrastructure — zero-downtime deploys across GKE with ArgoCD + Helm.",
  },
  {
    figure: "1M+",
    caption: "Logs / Day — Observability at scale",
    detail: "Observability at scale — structured logging & tracing pipelines that stay queryable.",
  },
  {
    figure: "−40%",
    caption: "MTTR — Fast incident recovery",
    detail: "Fast incident recovery — monitoring that surfaces the cause, not the noise.",
  },
];

export const principles: Principle[] = [
  {
    index: "01",
    name: "Simplicity",
    description: "The best system is the one you can hold in your head. I remove before I add.",
  },
  {
    index: "02",
    name: "Observability",
    description: "If you can't see it, you can't fix it. Every system ships with eyes.",
  },
  {
    index: "03",
    name: "Predictability",
    description:
      "Boring deploys are good deploys. Surprises belong in the product, not the pipeline.",
  },
];
