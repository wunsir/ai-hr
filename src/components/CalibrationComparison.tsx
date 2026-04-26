import type { CandidateCaseFile } from "../types/calibration";

interface CalibrationComparisonProps {
  comparison: CandidateCaseFile["comparison"];
}

export function CalibrationComparison({ comparison }: CalibrationComparisonProps) {
  return (
    <section className="panel comparison-panel">
      <div>
        <h3>原 AI 评估依据</h3>
        <ul className="compact-list">
          {comparison.originalBasis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>AI 校准提示补看的材料</h3>
        <ul className="compact-list accent-list">
          {comparison.calibrationReviewFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
