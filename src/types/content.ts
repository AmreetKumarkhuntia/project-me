// src/types/content.ts — presentation/content shapes shared across pages

export interface MetaRow {
  label: string;
  value: string;
  accentDot?: boolean; // chartreuse status dot before value
}

export interface NavItem {
  to: string;
  label: string;
  index: string;
}

/** `— NN / LABEL` micro-label above a section or hero */
export interface SectionLabel {
  number: string;
  text: string;
}

/** wall-label card beside a 3D work */
export interface Plaque {
  title: string;
  medium: string;
  year?: string;
}

/** static image + alt text (3D fallbacks, portrait) */
export interface Artwork {
  src: string;
  alt: string;
}

/** one word of a display headline; italic/accent follow the design's emphasis rule */
export interface HeadlineWord {
  text: string;
  italic?: boolean;
  accent?: boolean;
  /** extra entrance delay in seconds (the accent word enters last) */
  delay?: number;
}

/** one row of the Home "wings" directory */
export interface WingEntry {
  index: string;
  name: string;
  descriptor: string;
  to: string;
  preview: string;
}

/** next-room / return band at the foot of a page. Either plain `text` or pre/em/post. */
export interface RoomBand {
  label: string;
  to: string;
  text?: string;
  pre?: string;
  em?: string;
  post?: string;
}

/** the ethos block quote with its single chartreuse phrase */
export interface EthosQuote {
  pre: string;
  accent: string;
  post: string;
}

export interface HeroBio {
  lead: string;
  body: string;
}

export interface LabeledSection {
  label: SectionLabel;
  note?: string;
}

/** shared shape of the work/music/gaming room headers */
export interface RoomHero {
  label: SectionLabel;
  /** headline as lines of words */
  headline: HeadlineWord[][];
  sub: string;
  sculpture: Artwork;
  plaque: Plaque;
}

export interface HomeContent {
  preHeroStrip: string[];
  hero: {
    label: SectionLabel;
    headline: HeadlineWord[][];
    bio: HeroBio;
    sculpture: Artwork;
    plaque: Plaque;
    metaRows: MetaRow[];
  };
  metrics: LabeledSection;
  wings: LabeledSection & { entries: WingEntry[] };
  featured: LabeledSection & { impactFigure: string; impactCaption: string };
  artist: {
    label: SectionLabel;
    portrait: Artwork;
    caption: string;
    ethos: EthosQuote;
  };
}

export interface WorkContent {
  hero: RoomHero;
  materials: LabeledSection;
  provenance: LabeledSection;
  nextRoom: RoomBand;
}

export interface MusicContent {
  hero: RoomHero;
  notes: { label: SectionLabel; quote: string; body: string };
  nextRoom: RoomBand;
  /** rows documented in the queue drawer footer */
  keyboardMap: string[];
}

export interface GamingContent {
  hero: RoomHero;
  vitrine: {
    cornerPlaque: string;
    title: string;
    subtitle: string;
    idleHeading: string;
    pausedHeading: string;
    gameOverLabel: string;
    srDescription: string;
  };
  shelf: LabeledSection;
  controlsStrip: { left: string; right: string };
  returnBand: RoomBand;
}
