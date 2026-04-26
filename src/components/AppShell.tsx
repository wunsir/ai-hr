import type { EvidenceFilter } from "../App";
import type { CandidateCaseFile, CaseId, PromotionBatch } from "../types/calibration";
import { BatchOverview } from "./BatchOverview";
import { CandidateWorkspace } from "./CandidateWorkspace";
import { CaseFileQueue } from "./CaseFileQueue";
import { MaterialPackageRail } from "./MaterialPackageRail";
import { SystemHeader } from "./SystemHeader";

interface AppShellProps {
  batch: PromotionBatch;
  evidenceFilter: EvidenceFilter;
  selectedCase: CandidateCaseFile;
  onEvidenceFilterChange: (filter: EvidenceFilter) => void;
  onSelectCase: (caseId: CaseId) => void;
}

export function AppShell({
  batch,
  evidenceFilter,
  selectedCase,
  onEvidenceFilterChange,
  onSelectCase,
}: AppShellProps) {
  return (
    <main className="app-shell">
      <SystemHeader batch={batch} />
      <BatchOverview batch={batch} />
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
    </main>
  );
}
