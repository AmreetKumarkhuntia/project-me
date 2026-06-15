import type { StackGroup } from "./types";

export const stack: StackGroup[] = [
  {
    group: "Backend",
    items: [
      "Haskell",
      "PureScript",
      "TypeScript",
      "Node.js",
      "Servant",
      "Express",
    ],
  },
  {
    group: "Persistence",
    items: ["PostgreSQL", "ClickHouse", "MongoDB", "MySQL", "Redis"],
  },
  {
    group: "Infrastructure",
    items: ["Kubernetes", "Docker", "AWS", "GCP", "Helm", "ArgoCD"],
  },
  {
    group: "Networking",
    items: ["Envoy", "Istio", "gRPC", "Squid", "OpenTelemetry"],
  },
  {
    group: "Observability",
    items: ["Prometheus", "Grafana", "Kibana", "Vector", "OpenObserve"],
  },
  {
    group: "CI / CD",
    items: ["GitHub Actions", "ArgoCD", "Helm", "Docker Compose"],
  },
];
