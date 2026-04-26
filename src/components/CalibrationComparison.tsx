import type { Candidate } from "../types/calibration";

interface CalibrationComparisonProps {
  comparison: Candidate["comparison"];
}

export function CalibrationComparison({ comparison }: CalibrationComparisonProps) {
  return (
    <section className="panel comparison-panel">
      <div>
        <h3>原评估看到的内容</h3>
        <ul className="compact-list">
          {comparison.originalSaw.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>校准助手提示评审补看的内容</h3>
        <ul className="compact-list accent-list">
          {comparison.calibrationPromptsReviewerToReview.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
