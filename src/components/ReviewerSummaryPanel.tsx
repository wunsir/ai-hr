import type { Candidate } from "../types/calibration";

interface ReviewerSummaryPanelProps {
  candidate: Candidate;
}

const verifiedHeadingByScenario: Record<Candidate["scenario"], string> = {
  维持推荐: "已验证材料充分",
  低估风险: "已验证证据",
  补充评审: "已验证证据",
};

const pendingHeadingByScenario: Record<Candidate["scenario"], string> = {
  维持推荐: "无明显新增复核风险",
  低估风险: "待确认线索",
  补充评审: "补充评审问题",
};

const pendingNoteByScenario: Record<Candidate["scenario"], string> = {
  维持推荐: "当前仅保留可选补充材料，校准助手未提示需要改变讨论重点。",
  低估风险: "需复核来源后才可纳入评审事实。",
  补充评审: "这些问题用于补充确认，不是否定原 AI 推荐。",
};

export function ReviewerSummaryPanel({ candidate }: ReviewerSummaryPanelProps) {
  return (
    <aside className="reviewer-panel" aria-label="评审委员会材料">
      <section>
        <span className="panel-kicker">评审讨论摘要</span>
        <h2>{candidate.label}</h2>
        <p>{candidate.reviewerSummary.boundary}</p>
      </section>

      <section className="summary-section summary-section--verified">
        <h3>{verifiedHeadingByScenario[candidate.scenario]}</h3>
        <ul className="compact-list">
          {candidate.reviewerSummary.adoptableEvidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="summary-section summary-section--pending">
        <h3>{pendingHeadingByScenario[candidate.scenario]}</h3>
        <p className="summary-note">{pendingNoteByScenario[candidate.scenario]}</p>
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
