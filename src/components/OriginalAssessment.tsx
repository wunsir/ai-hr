import type { Candidate } from "../types/calibration";

interface OriginalAssessmentProps {
  assessment: Candidate["originalAssessment"];
}

export function OriginalAssessment({ assessment }: OriginalAssessmentProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <span className="panel-kicker">原 AI 评估结果</span>
        <strong className="recommendation">{assessment.recommendation}</strong>
      </div>
      <div className="split-grid">
        <div>
          <h3>显性绩效摘要</h3>
          <ul className="compact-list">
            {assessment.explicitPerformance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>原评估依据</h3>
          <div className="tag-row">
            {assessment.basis.map((item) => (
              <span className="plain-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
          <h3>原系统未充分覆盖</h3>
          <div className="tag-row">
            {assessment.notFullyCovered.map((item) => (
              <span className="plain-tag muted" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="boundary-copy">{assessment.limitationCopy}</p>
    </section>
  );
}
