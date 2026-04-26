import type { Candidate } from "../types/calibration";

interface EmployeeExplanationProps {
  candidate: Candidate;
}

export function EmployeeExplanation({ candidate }: EmployeeExplanationProps) {
  return (
    <section className="panel employee-explanation">
      <span className="panel-kicker">员工视角预览</span>
      <h3>给员工的评估材料说明</h3>
      <p>{candidate.employeeExplanation}</p>
      <p className="boundary-copy">
        你提交的补充说明会被整理为待确认线索，需结合主管、协作方或项目材料进一步确认。
      </p>
    </section>
  );
}
