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
  const visibleEvidence = evidence
    .filter((item) => filter === "全部" || item.status === filter)
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return (
    <section className="panel evidence-workpaper" aria-label="证据 workpaper">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">证据 workpaper</span>
          <h3>来源、状态、缺失证据与材料包归属</h3>
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
      <div className="workpaper-table">
        <div className="workpaper-head">
          <span>维度</span>
          <span>可评审事实</span>
          <span>来源与片段</span>
          <span>状态</span>
          <span>缺失证据</span>
          <span>下一步动作</span>
          <span>材料包</span>
        </div>
        {visibleEvidence.map((item) => (
          <EvidenceRow item={item} key={item.id} />
        ))}
      </div>
      {visibleEvidence.length === 0 ? (
        <p className="empty-state">当前材料中未发现该状态的可确认线索。</p>
      ) : null}
    </section>
  );
}
