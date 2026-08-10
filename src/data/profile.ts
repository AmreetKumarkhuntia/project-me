// src/data/profile.ts — core identity & metrics (design.md §14)
import type { Metric, Principle } from "@/types";

export const profile = {
  name: "Amreet Khuntia",
  firstName: "AMREET",
  lastName: "KHUNTIA",
  role: "Software & DevOps Engineer",
  roles: ["SOFTWARE ENGINEER", "DEVOPS ENGINEER", "MUSICIAN", "GAMER"] as const,
  based: "Bengaluru, India",
  coords: "LAT 12.97°N / LON 77.59°E — BENGALURU",
  focus: "Backend · Platform",
  status: "Available",
  tagline: "I build resilient systems & automate the infrastructure they run on.",
  bio: "I'm Amreet Khuntia — a Software & DevOps engineer based in Bengaluru, India. I build robust backend systems, automate CI/CD pipelines, and run cloud infrastructure. I care about simplicity, observability, and making the predictable boring. Off the clock, I make songs and play games — same obsession, different mediums.",
  identityChips: ["SWE · DEVOPS", "BACKEND · PLATFORM", "BENGALURU, IN", "AVAILABLE ✦"],
  statRail: [
    { label: "FOCUS", value: "BACKEND / PLATFORM" },
    { label: "BASE", value: "BENGALURU" },
    { label: "STATUS", value: "OPEN TO WORK" },
  ],
  ethosQuote:
    "The best system is the one you can hold in your head — and the boring deploy is the good deploy.",
  availability: "Currently open to backend, platform & infrastructure roles.",
  contactHeading: "Let's build something.",
  contactBody:
    "Got a system to scale, a pipeline to tame — or a track to collab on? My inbox is open.",
  contactSmallPrint: "RESPONSE TIME: < 24H · TIMEZONE: IST (UTC+5:30)",
} as const;

export const metrics: Metric[] = [
  {
    index: "01",
    value: "< 50ms",
    label: "P95 LATENCY",
    sub: "High-throughput APIs — Servant + Express services tuned for tight tail latencies.",
  },
  {
    index: "02",
    value: "99.99%",
    label: "UPTIME",
    sub: "Resilient infrastructure — zero-downtime deploys across GKE with ArgoCD + Helm.",
  },
  {
    index: "03",
    value: "1M+",
    label: "LOGS / DAY",
    sub: "Observability at scale — structured logging & tracing pipelines that stay queryable.",
  },
  {
    index: "04",
    value: "−40%",
    label: "MTTR",
    sub: "Fast incident recovery — monitoring that surfaces the cause, not the noise.",
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
