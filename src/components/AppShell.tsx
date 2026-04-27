import type { EvidenceFilter, RoleView } from "../App";
import type { CandidateCaseFile, CaseId, PromotionBatch } from "../types/calibration";
import { BatchOverview } from "./BatchOverview";
import { CommitteeBriefing } from "./CommitteeBriefing";
import { EmployeePortal } from "./EmployeePortal";
import { FloatingAssistant } from "./FloatingAssistant";
import { HrReviewWorkspace } from "./HrReviewWorkspace";
import { RoleSwitcher } from "./RoleSwitcher";
import { SystemActions } from "./SystemActions";
import { SystemHeader } from "./SystemHeader";

interface AppShellProps {
  batch: PromotionBatch;
  evidenceFilter: EvidenceFilter;
  roleView: RoleView;
  selectedCase: CandidateCaseFile;
  onEvidenceFilterChange: (filter: EvidenceFilter) => void;
  onRoleViewChange: (view: RoleView) => void;
  onSelectCase: (caseId: CaseId) => void;
}

export function AppShell({
  batch,
  evidenceFilter,
  roleView,
  selectedCase,
  onEvidenceFilterChange,
  onRoleViewChange,
  onSelectCase,
}: AppShellProps) {
  return (
    <main className="app-shell">
      <SystemHeader batch={batch} />
      <RoleSwitcher activeView={roleView} onChange={onRoleViewChange} />
      <SystemActions />
      {roleView === "hr" ? (
        <>
          <BatchOverview batch={batch} />
          <HrReviewWorkspace
            batch={batch}
            evidenceFilter={evidenceFilter}
            selectedCase={selectedCase}
            onEvidenceFilterChange={onEvidenceFilterChange}
            onSelectCase={onSelectCase}
          />
        </>
      ) : null}
      {roleView === "committee" ? (
        <CommitteeBriefing
          batch={batch}
          selectedCase={selectedCase}
          onSelectCase={onSelectCase}
        />
      ) : null}
      {roleView === "employee" ? <EmployeePortal caseFile={batch.cases[1]} /> : null}
      <FloatingAssistant />
    </main>
  );
}
