// src/components/Pill.tsx — hairline mono chip for stack items (design-v2 §7)
interface PillProps {
  label: string;
  className?: string;
}

export default function Pill({ label, className = "" }: PillProps) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 font-mono text-micro uppercase text-ink-dim transition-all duration-300 hover:-translate-y-1 hover:border-chartreuse hover:text-ink ${className}`}
      style={{ borderColor: "var(--hairline-strong)" }}
    >
      {label}
    </span>
  );
}
