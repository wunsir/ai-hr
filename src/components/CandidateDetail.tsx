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
      {isDeepCase ? (
        <div className="closed-loop-signpost" aria-label="候选人 B 闭环路径">
          <span className="panel-kicker">闭环路径</span>
          <strong>
            原 AI 评估 → 隐性贡献证据 → 员工补充待确认线索 → 人工复核边界
          </strong>
          <p>
            当前页面覆盖评审侧和员工补充侧的完整链路；员工自述只进入待确认线索，不直接改变原 AI 建议。
          </p>
        </div>
      ) : null}

      <OriginalAssessment assessment={candidate.originalAssessment} />
      <CalibrationComparison comparison={candidate.comparison} />
      <EvidenceList
        evidence={candidate.evidence}
        filter={evidenceFilter}
        isCondensed={!isDeepCase}
        onSetFilter={onSetEvidenceFilter}
      />
      <ReviewPrompt prompt={candidate.reviewPrompt} scenario={candidate.scenario} />
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
