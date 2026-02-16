import type { FooterConfig } from "$generated/types/Configuration";

export const footer: FooterConfig = {
  brand: {
    title: "Amreet Kumar Khuntia",
    description:
      "Engineering robust distributed systems that prioritize reliability, observability, and cost-efficiency. Available for strategic consulting and high-impact technical leadership.",
  },
  navLinks: [
    { label: "Top", url: "#" },
    { label: "Case Studies", url: "#projects" },
    { label: "Tech Stack", url: "#tech" },
    { label: "Philosophy", url: "#philosophy" },
  ],
  connectLinks: [
    { label: "GitHub", url: "https://github.com/AmreetKumarkhuntia" },
    { label: "LinkedIn", url: "https://linkedin.com/in/amreet-kumar-khuntia" },
    { label: "Twitter / X", url: "https://twitter.com/amreet_khuntia" },
    { label: "Technical Blog", url: "/blog" },
  ],
  metrics: [
    { label: "LATENCY", value: "14MS" },
    { label: "UPTIME", value: "99.99%" },
    { label: "LOCATION", value: "GLOBAL / REMOTE" },
  ],
  copyright: "MADE BY AMREET KUMAR KHUNTIA. © 2026",
};
