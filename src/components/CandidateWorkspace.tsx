import type { EvidenceFilter } from "../App";
import type { CandidateCaseFile } from "../types/calibration";
import { BoundaryNotice } from "./BoundaryNotice";
import { CalibrationComparison } from "./CalibrationComparison";
import { CalibrationPath } from "./CalibrationPath";
import { CaseHeader } from "./CaseHeader";
import { EmployeeExplanation } from "./EmployeeExplanation";
import { EmployeeSupplement } from "./EmployeeSupplement";
import { EvidenceWorkpaper } from "./EvidenceWorkpaper";
import { MaterialCoverageGap } from "./MaterialCoverageGap";
import { OriginalAssessment } from "./OriginalAssessment";
import { ReviewPrompt } from "./ReviewPrompt";

interface CandidateWorkspaceProps {
  caseFile: CandidateCaseFile;
  evidenceFilter: EvidenceFilter;
  onEvidenceFilterChange: (filter: EvidenceFilter) => void;
}

export function CandidateWorkspace({
  caseFile,
  evidenceFilter,
  onEvidenceFilterChange,
}: CandidateWorkspaceProps) {
  const isDeepCase = caseFile.id === "B";

  return (
    <section
      className="candidate-workspace"
      aria-label={`${caseFile.candidateLabel} AI 校准工作台`}
    >
      <CaseHeader caseFile={caseFile} />
      <CalibrationPath isDeepCase={isDeepCase} />
      <OriginalAssessment caseFile={caseFile} />
      <MaterialCoverageGap items={caseFile.materialCoverage} />
      <CalibrationComparison comparison={caseFile.comparison} />
      <EvidenceWorkpaper
        evidence={caseFile.evidence}
        filter={evidenceFilter}
        onFilterChange={onEvidenceFilterChange}
      />
      <ReviewPrompt caseFile={caseFile} />
      {isDeepCase ? (
        <>
          <EmployeeExplanation caseFile={caseFile} />
          <EmployeeSupplement caseFile={caseFile} />
        </>
      ) : null}
      <BoundaryNotice />
    </section>
  );
}
