// src/types/experience.ts — work-history & education shapes

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}
