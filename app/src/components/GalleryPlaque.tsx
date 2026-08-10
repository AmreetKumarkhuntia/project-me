// src/components/GalleryPlaque.tsx — museum wall-label card (design-v2 §7)
interface GalleryPlaqueProps {
  title: string; // e.g. "Nº 01 — UNTITLED (SYSTEM)"
  medium: string; // e.g. "DISPLACED CLAY, STUDIO LIGHT"
  year?: string;
  className?: string;
}

export default function GalleryPlaque({ title, medium, year, className = "" }: GalleryPlaqueProps) {
  return (
    <div
      className={`w-fit border bg-bg-2 px-4 py-3 ${className}`}
      style={{ borderColor: "var(--hairline-strong)" }}
    >
      <p className="font-mono text-micro uppercase text-ink">{title}</p>
      <p className="mt-1 font-mono text-micro-10 uppercase text-ink-faint">{medium}</p>
      {year && <p className="mt-1 font-mono text-micro-10 uppercase text-ink-faint">{year}</p>}
    </div>
  );
}
