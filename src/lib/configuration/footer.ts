import type { FooterConfig } from "$generated/types/Configuration";

export const footer: FooterConfig = {
  brand: {
    title: "Amreet K",
    description:
      "Architecting code, automating infrastructure, and building scalable backend systems. Available for strategic consulting and DevOps/Backend engineering roles.",
  },
  navLinks: [
    { label: "Work", url: "/work" },
    { label: "Stack", url: "/stack" },
    { label: "Timeline", url: "/timeline" },
    { label: "Philosophy", url: "/philosophy" },
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
