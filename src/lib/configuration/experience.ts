import type { ExperienceEntry } from "./types";

export const timeline: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    org: "Juspay",
    period: "Aug 2024 — Present",
    points: [
      "Led the migration of 11 services from AWS EKS to GCP GKE, cutting infra cost ~20% and lifting uptime to 99.99%.",
      "Centralized monitoring across services, reducing mean time to recovery by ~40%.",
      "Built a logging system handling 1M+ logs per day, kept queryable and cheap.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Juspay",
    period: "Jan 2024 — Jul 2024",
    points: [
      "Shipped address validation that cut return-to-origin by ~75% across 30k+ monthly orders.",
      "Built AWS anomaly detection that reduced alert fatigue by ~30%.",
    ],
  },
];
