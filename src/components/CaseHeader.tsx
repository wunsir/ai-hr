import type { CandidateCaseFile } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface CaseHeaderProps {
  caseFile: CandidateCaseFile;
}

export function CaseHeader({ caseFile }: CaseHeaderProps) {
  return (
    <section className="case-header">
      <div>
        <span className="eyebrow">档案 {caseFile.id} · {caseFile.roleContext}</span>
        <h2>{caseFile.candidateLabel}</h2>
      </div>
      <div className="case-header__chips">
        <span>原 AI 建议：{caseFile.originalRecommendation}</span>
        <StatusBadge status={caseFile.calibrationStatus} />
        <span>复核优先级：{caseFile.reviewPriority}</span>
        <span>材料包：{caseFile.materialPackageStatus}</span>
      </div>
      <p className="case-header__boundary">
        该提示用于帮助评审补充复核，不改变原 AI 建议，也不代表最终晋升结论。
      </p>
    </section>
  );
}
