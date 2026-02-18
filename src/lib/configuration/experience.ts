import type { ExperienceItem } from "$generated/types/Configuration";

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Juspay",
    period: "Aug 2024 - Current",
    description:
      "Led migration of 11 services from AWS EKS to GCP GKE, cutting costs by 20% and improving uptime to 99.99%. Designed centralized monitoring reducing MTTR by 40%. Engineered logging system for 1M+ daily logs.",
    scaleImpact: "Mentored 10 junior engineers, automated CI/CD",
  },
  {
    role: "Software Engineer Intern",
    company: "Juspay",
    period: "Jan 2024 - Jul 2024",
    description:
      "Drove 75% reduction in RTO for 30k+ monthly orders via address validation service. Set up AWS anomaly detection cutting alert fatigue by 30%.",
    scaleImpact: "Boosted address accuracy by 60%",
  },
];
