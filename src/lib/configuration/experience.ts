import type { ExperienceItem } from "$generated/types/Configuration";

export const experience: ExperienceItem[] = [
  {
    role: "Staff Systems Engineer",
    company: "Verity Cloud Solutions",
    period: "2021 — PRESENT",
    description:
      "Leading the core infrastructure team in migrating from monolithic EC2 instances to a fully managed EKS environment. Championing observability initiatives that reduced MTTD by 60%.",
    scaleImpact: "Reduced cloud spend by 40% through ARM64 migration",
  },
  {
    role: "Senior Backend Engineer",
    company: "DataPulse Analytics",
    period: "2018 — 2021",
    description:
      "Designed and maintained high-throughput data ingestion pipelines. Optimized PostgreSQL queries to handle 100TB+ datasets with sub-second response times.",
    scaleImpact: "Handled 50k req/s during data ingestion peaks",
  },
  {
    role: "Distributed Systems Engineer",
    company: "ProtoScale",
    period: "2015 — 2018",
    description:
      "Contributed to the development of a custom real-time messaging protocol. Focused on consensus algorithms and failure recovery strategies.",
    scaleImpact: "Built system supporting 10M concurrent users",
  },
];
