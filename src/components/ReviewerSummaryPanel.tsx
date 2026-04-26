import type { Candidate } from "../types/calibration";

interface ReviewerSummaryPanelProps {
  candidate: Candidate;
}

export function ReviewerSummaryPanel({ candidate }: ReviewerSummaryPanelProps) {
  return (
    <aside className="reviewer-panel" aria-label="评审委员会材料">
      <section>
        <span className="panel-kicker">评审讨论摘要</span>
        <h2>{candidate.label}</h2>
        <p>{candidate.reviewerSummary.boundary}</p>
      </section>

      <section>
        <h3>可采纳证据</h3>
        <ul className="compact-list">
          {candidate.reviewerSummary.adoptableEvidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>待确认线索</h3>
        <ul className="compact-list">
          {candidate.reviewerSummary.unconfirmedClues.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>建议追问</h3>
        <div className="question-list">
          {candidate.reviewQuestions.map((question) => (
            <article className="question-item" key={question.id}>
              <strong>向{question.askWhom}确认</strong>
              <p>{question.question}</p>
              <span>{question.reason}</span>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3>未确认事项</h3>
        <ul className="compact-list">
          {candidate.unconfirmedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="review-boundary">
        <h3>人工复核边界</h3>
        <p>{candidate.reviewerSummary.reminder}</p>
        <p>AI 负责发现可能被遗漏的贡献线索、整理证据和生成讨论材料；最终晋升建议由人工评审委员会根据完整材料决定。</p>
      </section>
    </aside>
  );
}
