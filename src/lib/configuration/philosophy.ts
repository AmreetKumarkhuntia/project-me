import type {
  PhilosophyItem,
  PhilosophyIcon,
} from "$generated/types/Configuration";

export const philosophy: PhilosophyItem[] = [
  {
    title: "SIMPLICITY",
    quote:
      '"I build systems that are easy to reason about. Complex problems don\'t always require complex solutions. I prioritize maintainability and clarity over cleverness."',
    icon: "bolt" as PhilosophyIcon,
  },
  {
    title: "OBSERVABILITY",
    quote:
      "\"If you can't measure it, you don't own it. I embed telemetry, structured logging, and tracing into the heart of every service to ensure full operational transparency.\"",
    icon: "pulse" as PhilosophyIcon,
  },
  {
    title: "PREDICTABILITY",
    quote:
      '"Performance should be deterministic. I architect for predictable latencies and graceful degradation, ensuring the system remains stable under extreme load."',
    icon: "shield" as PhilosophyIcon,
  },
];
