import { useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { candidates } from "./data/candidates";
import type { CandidateId, EvidenceStatus } from "./types/calibration";

export type EvidenceFilter = EvidenceStatus | "全部";

export default function App() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<CandidateId>("B");
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceFilter>("全部");

  const selectedCandidate = useMemo(
    () =>
      candidates.find((candidate) => candidate.id === selectedCandidateId) ??
      candidates[1],
    [selectedCandidateId],
  );

  const handleSelectCandidate = (candidateId: CandidateId) => {
    setSelectedCandidateId(candidateId);
    setEvidenceFilter("全部");
  };

  return (
    <AppShell
      candidates={candidates}
      evidenceFilter={evidenceFilter}
      selectedCandidate={selectedCandidate}
      onSelectCandidate={handleSelectCandidate}
      onSetEvidenceFilter={setEvidenceFilter}
    />
  );
}
