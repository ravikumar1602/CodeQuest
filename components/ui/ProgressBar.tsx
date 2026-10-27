interface Props {
  /** 0 to 1 */
  value: number;
  label: string;
  className?: string;
}

export function ProgressBar({ value, label, className = "" }: Props) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={`h-2.5 overflow-hidden rounded-full bg-navy-900 ring-1 ring-line ${className}`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow transition-[width] duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
