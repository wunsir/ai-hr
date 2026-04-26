import type { EvidenceFilter } from "../App";
import type { CandidateCaseFile, CaseId, PromotionBatch } from "../types/calibration";
import { CandidateWorkspace } from "./CandidateWorkspace";
import { CaseFileQueue } from "./CaseFileQueue";
import { MaterialPackageRail } from "./MaterialPackageRail";

interface HrReviewWorkspaceProps {
  batch: PromotionBatch;
  evidenceFilter: EvidenceFilter;
  selectedCase: CandidateCaseFile;
  onEvidenceFilterChange: (filter: EvidenceFilter) => void;
  onSelectCase: (caseId: CaseId) => void;
}

export function HrReviewWorkspace({
  batch,
  evidenceFilter,
  selectedCase,
  onEvidenceFilterChange,
  onSelectCase,
}: HrReviewWorkspaceProps) {
  return (
    <div className="assessment-layout">
      <CaseFileQueue
        cases={batch.cases}
        selectedCaseId={selectedCase.id}
        onSelectCase={onSelectCase}
      />
      <CandidateWorkspace
        caseFile={selectedCase}
        evidenceFilter={evidenceFilter}
        onEvidenceFilterChange={onEvidenceFilterChange}
      />
      <MaterialPackageRail caseFile={selectedCase} />
    </div>
  );
}
