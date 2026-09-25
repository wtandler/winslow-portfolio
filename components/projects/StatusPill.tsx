import type { ProjectStatus } from "@/lib/status";
import { STATUS_COLORS, STATUS_LABELS, STATUS_MARKERS } from "@/lib/status";

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className="status-pill"
      data-marker={STATUS_MARKERS[status]}
      style={{ color: STATUS_COLORS[status] }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
