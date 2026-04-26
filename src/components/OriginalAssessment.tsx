import type { CandidateCaseFile } from "../types/calibration";

interface OriginalAssessmentProps {
  caseFile: CandidateCaseFile;
}

export function OriginalAssessment({ caseFile }: OriginalAssessmentProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">原 AI 评估</span>
          <h3>原建议：{caseFile.originalRecommendation}</h3>
        </div>
      </div>
      <div className="split-grid">
        <div>
          <h4>显性绩效</h4>
          <ul className="compact-list">
            {caseFile.originalAssessment.explicitPerformance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>原评估依据</h4>
          <div className="tag-row">
            {caseFile.originalAssessment.basis.map((item) => (
              <span className="plain-tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="boundary-copy">{caseFile.originalAssessment.limitationCopy}</p>
    </section>
  );
}
