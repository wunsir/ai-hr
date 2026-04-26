import type { EvidenceFilter } from "../App";
import type { Candidate, CandidateId } from "../types/calibration";
import { CandidateDetail } from "./CandidateDetail";
import { CandidateRail } from "./CandidateRail";
import { HeaderBar } from "./HeaderBar";
import { ReviewerSummaryPanel } from "./ReviewerSummaryPanel";

interface AppShellProps {
  candidates: Candidate[];
  evidenceFilter: EvidenceFilter;
  selectedCandidate: Candidate;
  onSelectCandidate: (candidateId: CandidateId) => void;
  onSetEvidenceFilter: (filter: EvidenceFilter) => void;
}

export function AppShell({
  candidates,
  evidenceFilter,
  selectedCandidate,
  onSelectCandidate,
  onSetEvidenceFilter,
}: AppShellProps) {
  return (
    <main className="app-shell">
      <HeaderBar />
      <div className="workbench">
        <CandidateRail
          candidates={candidates}
          selectedCandidateId={selectedCandidate.id}
          onSelectCandidate={onSelectCandidate}
        />
        <CandidateDetail
          candidate={selectedCandidate}
          evidenceFilter={evidenceFilter}
          onSetEvidenceFilter={onSetEvidenceFilter}
        />
        <ReviewerSummaryPanel candidate={selectedCandidate} />
      </div>
    </main>
  );
}
