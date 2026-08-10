// src/components/SectionHeader.tsx — `— NN / LABEL` + hairline (design-v2 §7)
interface SectionHeaderProps {
  index: string; // e.g. "02"
  label: string; // e.g. "MEASURED"
  note?: string; // optional right-aligned note
  className?: string;
}

export default function SectionHeader({ index, label, note, className = "" }: SectionHeaderProps) {
  return (
    <div className={`hairline-b pb-4 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="micro-label">
          — <span className="text-chartreuse">{index}</span> / {label}
        </span>
        {note && <span className="micro-label hidden sm:block">{note}</span>}
      </div>
    </div>
  );
}
