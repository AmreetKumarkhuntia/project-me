// src/types/profile.ts — identity, metrics & ethos shapes

export interface Metric {
  /** rendered giant Playfair figure, e.g. "Sub-50ms" */
  figure: string;
  /** mono caption under the figure */
  caption: string;
  /** at most one figure per viewport renders chartreuse italic */
  accent?: boolean;
  /** longer sentence behind the stat, kept for reuse elsewhere */
  detail: string;
}

export interface Principle {
  index: string;
  name: string;
  description: string;
}
