import type { Capability } from "./types";

export const capabilities: Capability[] = [
  {
    metric: "Sub-50ms",
    unit: "p95 latency",
    label: "High-throughput APIs",
    note: "Servant + Express services tuned for tight tail latencies.",
  },
  {
    metric: "99.99%",
    unit: "uptime",
    label: "Resilient infrastructure",
    note: "Zero-downtime deploys across GKE with ArgoCD + Helm.",
  },
  {
    metric: "1M+",
    unit: "logs / day",
    label: "Observability at scale",
    note: "Structured logging & tracing pipelines that stay queryable.",
  },
  {
    metric: "−40%",
    unit: "MTTR",
    label: "Fast incident recovery",
    note: "Centralized monitoring that surfaces the cause, not the noise.",
  },
];
