import type { CandidateCaseFile, CaseId } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface CaseFileQueueProps {
  cases: CandidateCaseFile[];
  selectedCaseId: CaseId;
  onSelectCase: (caseId: CaseId) => void;
}

const coverageLabels = {
  explicitPerformance: "显性绩效",
  internalMaterials: "内部材料",
  employeeSupplement: "员工补充",
};

export function CaseFileQueue({
  cases,
  selectedCaseId,
  onSelectCase,
}: CaseFileQueueProps) {
  return (
    <aside className="case-queue" aria-label="case file 复核队列">
      <div className="section-heading">
        <span>复核队列</span>
        <strong>3 个 case file</strong>
      </div>
      <div className="case-list">
        {cases.map((caseFile) => {
          const isSelected = caseFile.id === selectedCaseId;

          return (
            <button
              aria-pressed={isSelected}
              className={`case-file scenario-${caseFile.calibrationStatus} ${
                isSelected ? "is-selected" : ""
              }`}
              key={caseFile.id}
              onClick={() => onSelectCase(caseFile.id)}
              type="button"
            >
              <span className="case-file__top">
                <span>
                  <b>Case {caseFile.id}</b>
                  <strong>{caseFile.candidateLabel}</strong>
                </span>
                <StatusBadge status={caseFile.calibrationStatus} />
              </span>
              <span className="case-file__role">{caseFile.roleContext}</span>
              <span className="case-file__meta">
                <span>原 AI 建议：{caseFile.originalRecommendation}</span>
                <span>待确认：{caseFile.queueSummary.unconfirmedCount} 项</span>
              </span>
              <span className="coverage-row">
                {Object.entries(caseFile.queueSummary.evidenceCoverage).map(
                  ([key, value]) => (
                    <span key={key}>
                      {coverageLabels[key as keyof typeof coverageLabels]}：{value}
                    </span>
                  ),
                )}
              </span>
              <span className="case-file__copy">{caseFile.queueSummary.shortCopy}</span>
              <span className="case-file__action">{caseFile.queueSummary.nextAction}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
