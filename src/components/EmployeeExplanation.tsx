import type { CandidateCaseFile } from "../types/calibration";

interface EmployeeExplanationProps {
  caseFile: CandidateCaseFile;
}

export function EmployeeExplanation({ caseFile }: EmployeeExplanationProps) {
  return (
    <section className="panel employee-explanation">
      <span className="panel-kicker">员工解释版预览</span>
      <h3>给员工的评估材料说明</h3>
      <p>{caseFile.employeeExplanation}</p>
      <p className="boundary-copy">
        员工补充说明会被整理为待确认线索，需结合主管、协作方或项目材料进一步确认。
      </p>
    </section>
  );
}
