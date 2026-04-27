import { useMemo, useState } from "react";
import type { EvidenceFilter } from "../App";
import type { EvidenceItem } from "../types/calibration";
import { EvidenceRow } from "./EvidenceRow";

const filters: EvidenceFilter[] = ["全部", "已验证", "待确认", "证据不足"];

interface EvidenceWorkpaperProps {
  evidence: EvidenceItem[];
  filter: EvidenceFilter;
  onFilterChange: (filter: EvidenceFilter) => void;
}

const statusOrder = {
  已验证: 0,
  待确认: 1,
  证据不足: 2,
};

export function EvidenceWorkpaper({
  evidence,
  filter,
  onFilterChange,
}: EvidenceWorkpaperProps) {
  const visibleEvidence = useMemo(
    () =>
      evidence
        .filter((item) => filter === "全部" || item.status === filter)
        .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    [evidence, filter],
  );
  const [expandedId, setExpandedId] = useState<string | null>(
    () => visibleEvidence[0]?.id ?? null,
  );
  const activeExpandedId =
    visibleEvidence.some((item) => item.id === expandedId)
      ? expandedId
      : visibleEvidence[0]?.id ?? null;

  return (
    <section className="panel evidence-workpaper" aria-label="证据表">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">证据列表</span>
          <h3>隐性贡献证据</h3>
        </div>
        <div className="filter-tabs" aria-label="证据状态筛选">
          {filters.map((item) => (
            <button
              className={filter === item ? "is-active" : ""}
              key={item}
              onClick={() => onFilterChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="evidence-list">
        {visibleEvidence.map((item) => (
          <EvidenceRow
            isExpanded={item.id === activeExpandedId}
            item={item}
            key={item.id}
            onToggle={() =>
              setExpandedId((currentId) => (currentId === item.id ? null : item.id))
            }
          />
        ))}
      </div>
      {visibleEvidence.length === 0 ? (
        <p className="empty-state">当前材料中未发现该状态的可确认线索。</p>
      ) : null}
    </section>
  );
}
