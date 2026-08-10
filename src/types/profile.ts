// src/types/profile.ts — identity, metrics & ethos shapes

export interface Metric {
  index: string;
  value: string;
  label: string;
  sub: string;
}

export interface Principle {
  index: string;
  name: string;
  description: string;
}
