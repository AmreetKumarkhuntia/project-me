// src/data/experience.ts — roles & bullets (design.md §14)
import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "Juspay",
    role: "Software Engineer",
    period: "Aug 2024 — Present",
    bullets: [
      "Led migration of 11 services from AWS EKS to GCP GKE, cutting infra cost ~20% and lifting uptime to 99.99%.",
      "Centralized monitoring across services, reducing MTTR by ~40%.",
      "Built a logging system handling 1M+ logs/day, kept queryable and cheap.",
    ],
  },
  {
    company: "Juspay",
    role: "Software Engineer Intern",
    period: "Jan 2024 — Jul 2024",
    bullets: [
      "Shipped address validation that cut return-to-origin by ~75% across 30k+ monthly orders.",
      "Built AWS anomaly detection that reduced alert fatigue by ~30%.",
    ],
  },
];
