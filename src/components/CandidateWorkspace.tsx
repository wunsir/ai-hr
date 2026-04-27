import { useEffect, useMemo, useState } from "react";
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

type PrimarySection = "summary" | "assessment" | "calibration" | "review";
type SecondarySection =
  | "summary"
  | "original"
  | "comparison"
  | "coverage"
  | "evidence"
  | "risk"
  | "reviewSummary"
  | "questions"
  | "unconfirmed"
  | "boundary";

interface DirectoryGroup {
  id: PrimarySection;
  label: string;
  description: string;
  items: Array<{ id: SecondarySection; label: string }>;
}

const deepDirectory: DirectoryGroup[] = [
  {
    id: "assessment",
    label: "原评估材料",
    description: "原系统依据与覆盖范围",
    items: [
      { id: "original", label: "原 AI 评估" },
      { id: "comparison", label: "原评估 vs 补看点" },
    ],
  },
  {
    id: "calibration",
    label: "AI 校准材料",
    description: "材料覆盖、隐性证据与复核提示",
    items: [
      { id: "coverage", label: "材料覆盖" },
      { id: "evidence", label: "隐性贡献证据" },
      { id: "risk", label: "复核提示" },
    ],
  },
  {
    id: "review",
    label: "人工复核",
    description: "会议材料、追问与边界",
    items: [
      { id: "reviewSummary", label: "评审摘要" },
      { id: "questions", label: "建议追问" },
      { id: "unconfirmed", label: "未确认事项" },
      { id: "boundary", label: "边界说明" },
    ],
  },
];

const summaryDirectory: DirectoryGroup[] = [
  {
    id: "summary",
    label: "档案摘要",
    description: "原建议与校准关注点",
    items: [{ id: "summary", label: "摘要" }],
  },
  {
    id: "review",
    label: "人工复核",
    description: "有限补充确认",
    items: [{ id: "risk", label: "复核提示" }],
  },
];

function getDefaultSections(isDeepCase: boolean) {
  return isDeepCase
    ? { primary: "calibration" as PrimarySection, secondary: "evidence" as SecondarySection }
    : { primary: "summary" as PrimarySection, secondary: "summary" as SecondarySection };
}

export function CandidateWorkspace({
  caseFile,
  evidenceFilter,
  onEvidenceFilterChange,
}: CandidateWorkspaceProps) {
  const isDeepCase = caseFile.id === "B";
  const defaults = useMemo(() => getDefaultSections(isDeepCase), [isDeepCase]);
  const [activePrimary, setActivePrimary] = useState<PrimarySection>(defaults.primary);
  const [activeSecondary, setActiveSecondary] = useState<SecondarySection>(
    defaults.secondary,
  );
  const directory = isDeepCase ? deepDirectory : summaryDirectory;
  const activeGroup =
    directory.find((group) => group.id === activePrimary) ?? directory[0];
  const activeItem =
    activeGroup.items.find((item) => item.id === activeSecondary) ??
    activeGroup.items[0];

  useEffect(() => {
    setActivePrimary(defaults.primary);
    setActiveSecondary(defaults.secondary);
  }, [caseFile.id, defaults.primary, defaults.secondary]);

  const handlePrimaryChange = (group: DirectoryGroup) => {
    setActivePrimary(group.id);
    setActiveSecondary(group.items[0].id);
  };

  return (
    <section
      className="candidate-workspace"
      aria-label={`${caseFile.candidateLabel} AI 校准工作台`}
    >
      <CaseHeader caseFile={caseFile} />
      <CalibrationPath isDeepCase={isDeepCase} />
      <div className="workspace-browser">
        <nav className="workspace-directory" aria-label="档案目录">
          {directory.map((group) => (
            <button
              aria-pressed={activePrimary === group.id}
              className={activePrimary === group.id ? "is-active" : ""}
              key={group.id}
              onClick={() => handlePrimaryChange(group)}
              type="button"
            >
              <span>{group.label}</span>
              <small>{group.description}</small>
            </button>
          ))}
        </nav>
        <section className="workspace-detail">
          <div className="workspace-detail__head">
            <span>{activeGroup.label}</span>
            <strong>{activeItem.label}</strong>
          </div>
          <nav className="workspace-submenu" aria-label="材料分组">
            {activeGroup.items.map((item) => (
              <button
                aria-pressed={activeSecondary === item.id}
                className={activeSecondary === item.id ? "is-active" : ""}
                key={item.id}
                onClick={() => setActiveSecondary(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="workspace-stage">
            {activeSecondary === "summary" ? <SummaryView caseFile={caseFile} /> : null}
            {activeSecondary === "original" ? (
              <OriginalAssessment caseFile={caseFile} />
            ) : null}
            {activeSecondary === "comparison" ? (
              <CalibrationComparison comparison={caseFile.comparison} />
            ) : null}
            {activeSecondary === "coverage" ? (
              <MaterialCoverageGap items={caseFile.materialCoverage} />
            ) : null}
            {activeSecondary === "evidence" ? (
              <EvidenceWorkpaper
                evidence={caseFile.evidence}
                filter={evidenceFilter}
                onFilterChange={onEvidenceFilterChange}
              />
            ) : null}
            {activeSecondary === "risk" ? <ReviewPrompt caseFile={caseFile} /> : null}
            {activeSecondary === "reviewSummary" ? (
              <ReviewSummaryView caseFile={caseFile} />
            ) : null}
            {activeSecondary === "questions" ? (
              <ReviewQuestionsView caseFile={caseFile} />
            ) : null}
            {activeSecondary === "unconfirmed" ? (
              <UnconfirmedView caseFile={caseFile} />
            ) : null}
            {activeSecondary === "boundary" ? <BoundaryNotice /> : null}
          </div>
        </section>
      </div>
      {activeSecondary !== "boundary" ? <BoundaryNotice /> : null}
    </section>
  );
}

function SummaryView({ caseFile }: { caseFile: CandidateCaseFile }) {
  return (
    <section className="panel summary-view">
      <span className="panel-kicker">档案摘要 / {caseFile.calibrationStatus}</span>
      <h3>{caseFile.candidateLabel}</h3>
      <div className="summary-grid">
        <div>
          <strong>原 AI 建议</strong>
          <p>{caseFile.originalRecommendation}</p>
        </div>
        <div>
          <strong>校准关注点</strong>
          <p>{caseFile.queueSummary.shortCopy}</p>
        </div>
        <div>
          <strong>下一步动作</strong>
          <p>{caseFile.queueSummary.nextAction}</p>
        </div>
      </div>
    </section>
  );
}

function ReviewSummaryView({ caseFile }: { caseFile: CandidateCaseFile }) {
  const reviewerVersion = caseFile.materialPackage.reviewerVersion;

  return (
    <section className="panel review-material-view">
      <span className="panel-kicker">人工复核 / 评审摘要</span>
      <h3>补充评估摘要</h3>
      <p>{reviewerVersion.summary}</p>
      <h4>已验证证据</h4>
      <ul className="compact-list">
        {reviewerVersion.verifiedEvidence.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ReviewQuestionsView({ caseFile }: { caseFile: CandidateCaseFile }) {
  return (
    <section className="panel review-material-view">
      <span className="panel-kicker">人工复核 / 建议追问</span>
      <h3>建议追问</h3>
      <div className="question-list">
        {caseFile.materialPackage.reviewerVersion.questions.map((question) => (
          <article className="question-item" key={question.id}>
            <strong>向{question.askWhom}确认</strong>
            <p>{question.question}</p>
            <span>{question.reason}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function UnconfirmedView({ caseFile }: { caseFile: CandidateCaseFile }) {
  const reviewerVersion = caseFile.materialPackage.reviewerVersion;
  const humanReview = caseFile.materialPackage.humanReviewVersion;

  return (
    <section className="panel review-material-view">
      <span className="panel-kicker">人工复核 / 未确认事项</span>
      <h3>待确认线索</h3>
      <ul className="compact-list">
        {reviewerVersion.unconfirmedClues.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h4>缺失证据</h4>
      <ul className="compact-list">
        {humanReview.missingEvidence.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
