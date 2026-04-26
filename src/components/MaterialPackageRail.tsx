import type { CandidateCaseFile } from "../types/calibration";
import { GovernanceRecord } from "./GovernanceRecord";

interface MaterialPackageRailProps {
  caseFile: CandidateCaseFile;
}

export function MaterialPackageRail({ caseFile }: MaterialPackageRailProps) {
  const humanReview = caseFile.materialPackage.humanReviewVersion;

  return (
    <aside className="material-rail" aria-label="人工复核材料与治理记录">
      <section className="material-package">
        <span className="panel-kicker">HR 复核侧栏</span>
        <h2>人工复核材料</h2>
        <div className="package-view">
          <h3>AI 不能确认的事项</h3>
          <ul className="compact-list">
            {humanReview.cannotConfirm.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>缺失证据</h3>
          <ul className="compact-list">
            {humanReview.missingEvidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>建议确认对象</h3>
          <ul className="compact-list">
            {humanReview.suggestedOwners.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>员工自述状态</h3>
          <p>{humanReview.employeeSelfReportStatus}</p>
        </div>
      </section>
      <GovernanceRecord record={caseFile.governanceRecord} />
    </aside>
  );
}
