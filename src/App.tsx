import { useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { promotionBatch } from "./data/promotionBatch";
import type { CaseId, EvidenceStatus } from "./types/calibration";

export type EvidenceFilter = EvidenceStatus | "全部";
export type RoleView = "hr" | "committee" | "employee";

export default function App() {
  const [selectedCaseId, setSelectedCaseId] = useState<CaseId>("B");
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceFilter>("全部");
  const [roleView, setRoleView] = useState<RoleView>("hr");

  const selectedCase = useMemo(
    () =>
      promotionBatch.cases.find((caseFile) => caseFile.id === selectedCaseId) ??
      promotionBatch.cases[1],
    [selectedCaseId],
  );

  const handleSelectCase = (caseId: CaseId) => {
    setSelectedCaseId(caseId);
    setEvidenceFilter("全部");
  };

  return (
    <AppShell
      batch={promotionBatch}
      evidenceFilter={evidenceFilter}
      roleView={roleView}
      selectedCase={selectedCase}
      onEvidenceFilterChange={setEvidenceFilter}
      onRoleViewChange={setRoleView}
      onSelectCase={handleSelectCase}
    />
  );
}
