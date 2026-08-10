// src/components/MetaTable.tsx — right-column definition rows (design-v2 §7)
export interface MetaRow {
  label: string;
  value: string;
  accentDot?: boolean; // chartreuse status dot before value
}

interface MetaTableProps {
  rows: MetaRow[];
  className?: string;
}

export default function MetaTable({ rows, className = "" }: MetaTableProps) {
  return (
    <dl className={`w-full ${className}`}>
      {rows.map((r) => (
        <div key={r.label} className="hairline-b flex items-baseline justify-between gap-4 py-3">
          <dt className="micro-label">{r.label}</dt>
          <dd className="flex items-center gap-2 font-mono text-micro uppercase text-ink">
            {r.accentDot && (
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-chartreuse" />
            )}
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
