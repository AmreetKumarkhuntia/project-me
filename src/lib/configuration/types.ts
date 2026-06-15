// Content model for the Editorial Noir portfolio.

export interface Identity {
  name: string;
  role: string;
  location: string;
  tagline: string;
  intro: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    site: string;
  };
}

export interface Capability {
  metric: string;
  unit: string;
  label: string;
  note: string;
}

export interface ProjectImpact {
  value: string;
  unit: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  kind: string;
  tags: string[];
  summary: string;
  problem: string;
  engineering: string;
  impact: ProjectImpact;
  stack: string[];
  repo: string;
}

export interface StackGroup {
  group: string;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface PhilosophyItem {
  title: string;
  body: string;
}
