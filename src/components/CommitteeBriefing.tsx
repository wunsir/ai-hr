import type { CandidateCaseFile, CaseId, PromotionBatch } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface CommitteeBriefingProps {
  batch: PromotionBatch;
  selectedCase: CandidateCaseFile;
  onSelectCase: (caseId: CaseId) => void;
}

export function CommitteeBriefing({
  batch,
  selectedCase,
  onSelectCase,
}: CommitteeBriefingProps) {
  const packageView = selectedCase.materialPackage.reviewerVersion;

  return (
    <section className="committee-view" aria-label="评审委员会材料">
      <div className="committee-view__queue" aria-label="委员会候选人材料">
        {batch.cases.map((caseFile) => (
          <button
            aria-pressed={caseFile.id === selectedCase.id}
            className={caseFile.id === selectedCase.id ? "is-active" : ""}
            key={caseFile.id}
            onClick={() => onSelectCase(caseFile.id)}
            type="button"
          >
            <span>档案 {caseFile.id}</span>
            <strong>{caseFile.candidateLabel}</strong>
            <StatusBadge status={caseFile.calibrationStatus} />
          </button>
        ))}
      </div>

      <article className="committee-brief">
        <header className="brief-header">
          <div>
            <span className="panel-kicker">评审委员会材料</span>
            <h1>评审委员会材料</h1>
            <p>
              {selectedCase.candidateLabel} · {selectedCase.roleContext}
            </p>
          </div>
          <div className="case-header__chips">
            <span>原 AI 建议：{selectedCase.originalRecommendation}</span>
            <StatusBadge status={selectedCase.calibrationStatus} />
            <span>复核优先级：{selectedCase.reviewPriority}</span>
          </div>
        </header>

        <section className="brief-section">
          <h2>补充评估摘要</h2>
          <p>{packageView.summary}</p>
        </section>

        <div className="brief-grid">
          <section className="brief-section">
            <h2>已验证证据</h2>
            <ul className="compact-list">
              {packageView.verifiedEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="brief-section">
            <h2>待确认线索</h2>
            <ul className="compact-list">
              {packageView.unconfirmedClues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="brief-section">
          <h2>建议追问</h2>
          <div className="question-list">
            {packageView.questions.map((question) => (
              <article className="question-item" key={question.id}>
                <strong>向{question.askWhom}确认</strong>
                <p>{question.question}</p>
                <span>{question.reason}</span>
              </article>
            ))}
          </div>
        </section>

        <p className="boundary-copy">{packageView.reminder}</p>
      </article>
    </section>
  );
}
