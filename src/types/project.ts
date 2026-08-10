// src/types/project.ts — selected work shapes

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  problem: string;
  built: string;
  impact: string;
  stack: string[];
  links: ProjectLink[];
}
