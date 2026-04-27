import type { EvidenceItem } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface EvidenceRowProps {
  isExpanded: boolean;
  item: EvidenceItem;
  onToggle: () => void;
}

export function EvidenceRow({ isExpanded, item, onToggle }: EvidenceRowProps) {
  return (
    <article className={`evidence-item ${isExpanded ? "is-expanded" : ""}`}>
      <button
        aria-expanded={isExpanded}
        className="evidence-item__summary"
        onClick={onToggle}
        type="button"
      >
        <span className="dimension-tag">{item.dimension}</span>
        <strong>{item.reviewableFact}</strong>
        <StatusBadge status={item.status} />
        <span className="evidence-item__action">{item.nextAction}</span>
      </button>
      {isExpanded ? (
        <dl className="evidence-item__details">
          <div>
            <dt>来源</dt>
            <dd>
              <b>{item.source}</b>
              <span>{item.sourceExcerpt}</span>
            </dd>
          </div>
          <div>
            <dt>缺失证据</dt>
            <dd>{item.missingEvidence}</dd>
          </div>
          <div>
            <dt>材料包</dt>
            <dd className="package-destinations">
              {item.packageDestinations.map((destination) => (
                <em key={destination}>{destination}</em>
              ))}
            </dd>
          </div>
        </dl>
      ) : null}
    </article>
  );
}
