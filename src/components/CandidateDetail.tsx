import type { EvidenceFilter } from "../App";
import type { Candidate } from "../types/calibration";
import { BoundaryNotice } from "./BoundaryNotice";
import { CalibrationComparison } from "./CalibrationComparison";
import { EvidenceList } from "./EvidenceList";
import { EmployeeExplanation } from "./EmployeeExplanation";
import { EmployeeSupplement } from "./EmployeeSupplement";
import { OriginalAssessment } from "./OriginalAssessment";
import { ReviewPrompt } from "./ReviewPrompt";

interface CandidateDetailProps {
  candidate: Candidate;
  evidenceFilter: EvidenceFilter;
  onSetEvidenceFilter: (filter: EvidenceFilter) => void;
}

export function CandidateDetail({
  candidate,
  evidenceFilter,
  onSetEvidenceFilter,
}: CandidateDetailProps) {
  const isDeepCase = candidate.id === "B";

  return (
    <section className="candidate-detail" aria-label={`${candidate.label} 校准详情`}>
      <div className="detail-title">
        <div>
          <p className="eyebrow">{candidate.roleContext}</p>
          <h2>{candidate.label}</h2>
        </div>
        <span className={`scenario-pill scenario-${candidate.scenario}`}>
          {candidate.scenario}
        </span>
      </div>

      <OriginalAssessment assessment={candidate.originalAssessment} />
      <CalibrationComparison comparison={candidate.comparison} />
      <EvidenceList
        evidence={candidate.evidence}
        filter={evidenceFilter}
        isCondensed={!isDeepCase}
        onSetFilter={onSetEvidenceFilter}
      />
      <ReviewPrompt prompt={candidate.reviewPrompt} />
      {isDeepCase ? (
        <>
          <EmployeeExplanation candidate={candidate} />
          <EmployeeSupplement candidate={candidate} />
        </>
      ) : null}
      <BoundaryNotice />
    </section>
  );
}
