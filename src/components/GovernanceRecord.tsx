import type { GovernanceRecord as GovernanceRecordType } from "../types/calibration";

interface GovernanceRecordProps {
  record: GovernanceRecordType;
}

export function GovernanceRecord({ record }: GovernanceRecordProps) {
  return (
    <section className="governance-record inspector-panel">
      <span className="panel-kicker">治理记录</span>
      <dl>
        <div>
          <dt>输入材料范围</dt>
          <dd>{record.inputMaterials.join("、")}</dd>
        </div>
        <div>
          <dt>待确认材料</dt>
          <dd>{record.unconfirmedMaterials.join("、")}</dd>
        </div>
        <div>
          <dt>人工确认边界</dt>
          <dd>{record.humanReviewBoundary}</dd>
        </div>
      </dl>
      <details className="governance-details">
        <summary>查看记录细节</summary>
        <dl>
          <div>
            <dt>AI 输出时间</dt>
            <dd>{record.aiOutputTime}</dd>
          </div>
          <div>
            <dt>已验证材料</dt>
            <dd>{record.verifiedMaterials.join("、")}</dd>
          </div>
          <div>
            <dt>员工自述状态</dt>
            <dd>{record.employeeSelfReportHandling}</dd>
          </div>
        </dl>
      </details>
    </section>
  );
}
