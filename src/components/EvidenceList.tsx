import type { EvidenceFilter } from "../App";
import type { EvidenceItem as EvidenceItemType } from "../types/calibration";
import { EvidenceItem } from "./EvidenceItem";

const filterOptions: EvidenceFilter[] = ["全部", "已验证", "待确认", "证据不足"];

interface EvidenceListProps {
  evidence: EvidenceItemType[];
  filter: EvidenceFilter;
  isCondensed?: boolean;
  onSetFilter: (filter: EvidenceFilter) => void;
}

const statusOrder = {
  已验证: 0,
  待确认: 1,
  证据不足: 2,
};

export function EvidenceList({
  evidence,
  filter,
  isCondensed = false,
  onSetFilter,
}: EvidenceListProps) {
  const visibleEvidence = evidence
    .filter((item) => filter === "全部" || item.status === filter)
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return (
    <section className="panel evidence-panel">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">
            {isCondensed ? "摘要证据" : "隐性贡献证据"}
          </span>
          <h3>来源、可信状态与下一步动作</h3>
        </div>
        <div className="filter-tabs" aria-label="证据状态筛选">
          {filterOptions.map((option) => (
            <button
              className={filter === option ? "is-active" : ""}
              key={option}
              onClick={() => onSetFilter(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="evidence-workpaper-head" aria-hidden="true">
        <span>贡献维度</span>
        <span>证据摘要</span>
        <span>来源</span>
        <span>状态</span>
        <span>需要动作</span>
      </div>
      <div className="evidence-list">
        {visibleEvidence.map((item) => (
          <EvidenceItem item={item} key={item.id} />
        ))}
      </div>
      {visibleEvidence.length === 0 ? (
        <p className="empty-state">当前材料中未发现该状态的可确认线索。</p>
      ) : null}
    </section>
  );
}
