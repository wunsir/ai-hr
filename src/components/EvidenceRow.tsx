import type { EvidenceItem } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface EvidenceRowProps {
  item: EvidenceItem;
}

export function EvidenceRow({ item }: EvidenceRowProps) {
  return (
    <article className="workpaper-row">
      <span className="dimension-tag">{item.dimension}</span>
      <p>{item.reviewableFact}</p>
      <span>
        <b>{item.source}</b>
        <small>{item.sourceExcerpt}</small>
      </span>
      <StatusBadge status={item.status} />
      <span>{item.missingEvidence}</span>
      <span>{item.nextAction}</span>
      <span className="package-destinations">
        {item.packageDestinations.map((destination) => (
          <em key={destination}>{destination}</em>
        ))}
      </span>
    </article>
  );
}
