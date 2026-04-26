import type { CandidateCaseFile } from "../types/calibration";
import { EmployeeSupplement } from "./EmployeeSupplement";
import { StatusBadge } from "./StatusBadge";

interface EmployeePortalProps {
  caseFile: CandidateCaseFile;
}

export function EmployeePortal({ caseFile }: EmployeePortalProps) {
  const employeeVersion = caseFile.materialPackage.employeeVersion;

  return (
    <section className="employee-portal" aria-label="员工解释与补充">
      <header className="employee-portal__header">
        <div>
          <span className="panel-kicker">员工解释与补充</span>
          <h1>员工解释与补充</h1>
          <p>{caseFile.roleContext}</p>
        </div>
        <div className="case-header__chips">
          <span>原 AI 建议：{caseFile.originalRecommendation}</span>
          <StatusBadge status={caseFile.calibrationStatus} />
        </div>
      </header>

      <section className="panel employee-facing-card">
        <h2>本次材料说明</h2>
        <p>{employeeVersion.explanation}</p>
      </section>

      <div className="employee-summary-grid">
        <section className="panel">
          <h2>系统看到了哪些材料</h2>
          <ul className="compact-list">
            {employeeVersion.recognizedMaterials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <h2>哪些内容仍需确认</h2>
          <ul className="compact-list">
            {employeeVersion.stillNeedsConfirmation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <EmployeeSupplement caseFile={caseFile} />

      <section className="boundary-notice">
        <h2>处理边界</h2>
        <p>{employeeVersion.supplementHandling}</p>
        <p>{employeeVersion.boundary}</p>
      </section>
    </section>
  );
}
