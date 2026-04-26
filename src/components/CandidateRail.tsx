import { CheckCircle2 } from "lucide-react";
import type { Candidate, CandidateId } from "../types/calibration";

interface CandidateRailProps {
  candidates: Candidate[];
  selectedCandidateId: CandidateId;
  onSelectCandidate: (candidateId: CandidateId) => void;
}

export function CandidateRail({
  candidates,
  selectedCandidateId,
  onSelectCandidate,
}: CandidateRailProps) {
  return (
    <aside className="candidate-rail" aria-label="候选人切换">
      <div className="section-heading">
        <span>候选人</span>
        <strong>3 个典型场景</strong>
      </div>
      <div className="candidate-list">
        {candidates.map((candidate) => {
          const isSelected = candidate.id === selectedCandidateId;

          return (
            <button
              aria-pressed={isSelected}
              className={`candidate-card scenario-${candidate.scenario} ${
                isSelected ? "is-selected" : ""
              }`}
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate.id)}
              type="button"
            >
              <span className="candidate-card__top">
                <strong>{candidate.label}</strong>
                <span className="candidate-card__state">
                  {isSelected ? (
                    <span className="selected-indicator" aria-label="当前选中">
                      <CheckCircle2 aria-hidden="true" size={14} />
                      当前
                    </span>
                  ) : null}
                  <span className="scenario-tag">{candidate.scenario}</span>
                </span>
              </span>
              <span className="rail-row">
                <b>原 AI 建议</b>
                {candidate.railSummary.originalRecommendation}
              </span>
              <span className="rail-copy">{candidate.railSummary.calibrationFocus}</span>
              <span className="rail-status">{candidate.railSummary.reviewStatus}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
