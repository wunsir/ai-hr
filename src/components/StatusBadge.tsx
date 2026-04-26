import type { EvidenceStatus } from "../types/calibration";

interface StatusBadgeProps {
  status: EvidenceStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}
