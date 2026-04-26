import type { EvidenceItem as EvidenceItemType } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface EvidenceItemProps {
  item: EvidenceItemType;
}

export function EvidenceItem({ item }: EvidenceItemProps) {
  return (
    <article className="evidence-item">
      <div className="evidence-main">
        <div className="evidence-title-row">
          <span className="dimension-tag">{item.dimension}</span>
          <StatusBadge status={item.status} />
        </div>
        <h4>{item.title}</h4>
        <p>{item.fact}</p>
      </div>
      <div className="evidence-meta">
        <span>
          <b>来源</b>
          {item.source}
        </span>
        <span>
          <b>片段</b>
          {item.sourceExcerpt}
        </span>
        <span>
          <b>需要动作</b>
          {item.action}
        </span>
      </div>
    </article>
  );
}
