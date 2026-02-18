import type { FooterConfig } from "$generated/types/Configuration";

export const footer: FooterConfig = {
  brand: {
    title: "Amreet K",
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
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/amreet-khuntia-15193220b/",
    },
    { label: "Twitter / X", url: "http://x.com/amreetsgto321" },
    { label: "Technical Blog", url: "/blog" },
  ],
  metrics: [
    { label: "LATENCY", value: "14MS" },
    { label: "UPTIME", value: "99.99%" },
    { label: "LOCATION", value: "BENGALURU, INDIA" },
  ],
  copyright: "MADE BY AMREET KUMAR KHUNTIA. © 2026",
};
