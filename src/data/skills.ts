// src/data/skills.ts — technical inventory (design.md §14)
import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  { name: "Backend", items: ["Haskell", "PureScript", "TypeScript", "Node.js", "Servant", "Express"] },
  { name: "Persistence", items: ["PostgreSQL", "ClickHouse", "MongoDB", "MySQL", "Redis"] },
  { name: "Infrastructure", items: ["Kubernetes", "Docker", "AWS", "GCP", "Helm", "ArgoCD"] },
  { name: "Networking", items: ["Envoy", "Istio", "gRPC", "Squid"] },
  {
    name: "Observability",
    items: ["OpenTelemetry", "Prometheus", "Grafana", "Kibana", "Vector", "OpenObserve"],
  },
  { name: "CI/CD", items: ["GitHub Actions", "ArgoCD", "Helm", "Docker Compose"] },
];
