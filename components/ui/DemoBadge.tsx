import { FlaskConical } from "lucide-react";

/** Always visible so nobody mistakes prototype data for production data. */
export function DemoBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-warn/40 bg-warn/10 px-2.5 py-1 text-xs font-medium text-warn"
      title="Progress is saved in this browser only. There are no accounts yet."
    >
      <FlaskConical size={13} aria-hidden="true" />
      Demo mode
    </span>
  );
}
