import { useState } from "react";
import type { EvidenceFilter } from "../App";
import type { CandidateCaseFile } from "../types/calibration";
import { BoundaryNotice } from "./BoundaryNotice";
import { CalibrationComparison } from "./CalibrationComparison";
import { CalibrationPath } from "./CalibrationPath";
import { CaseHeader } from "./CaseHeader";
import { EvidenceWorkpaper } from "./EvidenceWorkpaper";
import { MaterialCoverageGap } from "./MaterialCoverageGap";
import { OriginalAssessment } from "./OriginalAssessment";
import { ReviewPrompt } from "./ReviewPrompt";

interface CandidateWorkspaceProps {
  caseFile: CandidateCaseFile;
  evidenceFilter: EvidenceFilter;
  onEvidenceFilterChange: (filter: EvidenceFilter) => void;
}

type WorkspaceSection = "assessment" | "coverage" | "evidence" | "risk";

const workspaceSections: Array<{
  id: WorkspaceSection;
  label: string;
  description: string;
}> = [
  {
    id: "assessment",
    label: "原评估与对比",
    description: "先看原 AI 依据，再看校准补看的材料",
  },
  {
    id: "coverage",
    label: "材料覆盖盲区",
    description: "确认哪些来源已覆盖、哪些进入校准补充",
  },
  {
    id: "evidence",
    label: "证据工作台",
    description: "按状态查看来源、缺口、动作和材料包归属",
  },
  {
    id: "risk",
    label: "复核提示",
    description: "只作为补充复核信号，不改变原 AI 建议",
  },
];

export function CandidateWorkspace({
  caseFile,
  evidenceFilter,
  onEvidenceFilterChange,
}: CandidateWorkspaceProps) {
  const isDeepCase = caseFile.id === "B";
  const [activeSection, setActiveSection] = useState<WorkspaceSection>("evidence");

  return (
    <section
      className="candidate-workspace"
      aria-label={`${caseFile.candidateLabel} AI 校准工作台`}
    >
      <CaseHeader caseFile={caseFile} />
      <CalibrationPath isDeepCase={isDeepCase} />
      <nav className="workspace-menu" aria-label="候选人材料层级">
        {workspaceSections.map((section) => (
          <button
            className={activeSection === section.id ? "is-active" : ""}
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            type="button"
            aria-pressed={activeSection === section.id}
          >
            <span>{section.label}</span>
            <small>{section.description}</small>
          </button>
        ))}
      </nav>
      <div className="workspace-stage">
        {activeSection === "assessment" ? (
          <>
            <OriginalAssessment caseFile={caseFile} />
            <CalibrationComparison comparison={caseFile.comparison} />
          </>
        ) : null}
        {activeSection === "coverage" ? (
          <MaterialCoverageGap items={caseFile.materialCoverage} />
        ) : null}
        {activeSection === "evidence" ? (
          <EvidenceWorkpaper
            evidence={caseFile.evidence}
            filter={evidenceFilter}
            onFilterChange={onEvidenceFilterChange}
          />
        ) : null}
        {activeSection === "risk" ? <ReviewPrompt caseFile={caseFile} /> : null}
      </div>
      <BoundaryNotice />
    </section>
  );
}
