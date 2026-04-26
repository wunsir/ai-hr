import type { EvidenceItem as EvidenceItemType } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface EvidenceItemProps {
  item: EvidenceItemType;
}

export function EvidenceItem({ item }: EvidenceItemProps) {
  return (
    <article className="evidence-item">
      <div className="evidence-cell evidence-dimension">
        <span className="dimension-tag">{item.dimension}</span>
      </div>
      <div className="evidence-cell evidence-main">
        <h4>{item.title}</h4>
        <p>{item.fact}</p>
      </div>
      <div className="evidence-cell evidence-source">
        <b>{item.source}</b>
        <span>{item.sourceExcerpt}</span>
      </div>
      <div className="evidence-cell evidence-status">
        <StatusBadge status={item.status} />
      </div>
      <div className="evidence-cell evidence-action">
        <span>{item.action}</span>
      </div>
    </article>
  );
}
