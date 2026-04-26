import { useState } from "react";
import type { CandidateCaseFile } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface EmployeeSupplementProps {
  caseFile: CandidateCaseFile;
}

export function EmployeeSupplement({ caseFile }: EmployeeSupplementProps) {
  const supplement = caseFile.employeeSupplement;
  const [text, setText] = useState(supplement?.originalText ?? "");
  const [hasGenerated, setHasGenerated] = useState(false);

  if (!supplement) {
    return null;
  }

  return (
    <section className="panel employee-supplement">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">员工补充入口</span>
          <h3>员工补充 → 结构化待确认线索</h3>
        </div>
        {hasGenerated ? <span className="success-copy">已整理为待确认线索</span> : null}
      </div>
      <div className="supplement-grid">
        <div className="supplement-input">
          <label htmlFor="employee-supplement-text">员工原始补充说明</label>
          <textarea
            id="employee-supplement-text"
            onChange={(event) => setText(event.target.value)}
            rows={8}
            value={text}
          />
          <button onClick={() => setHasGenerated(true)} type="button">
            生成待确认线索
          </button>
        </div>
        <div className="structured-output" aria-live="polite">
          {hasGenerated ? (
            <>
              <div className="evidence-title-row">
                {supplement.structured.dimensions.map((dimension) => (
                  <span className="dimension-tag" key={dimension}>
                    {dimension}
                  </span>
                ))}
                <StatusBadge status={supplement.structured.currentStatus} />
              </div>
              <dl>
                <div>
                  <dt>贡献线索</dt>
                  <dd>{supplement.structured.clue}</dd>
                </div>
                <div>
                  <dt>可能影响</dt>
                  <dd>{supplement.structured.possibleImpact}</dd>
                </div>
                <div>
                  <dt>当前状态</dt>
                  <dd>{supplement.structured.currentStatus}</dd>
                </div>
                <div>
                  <dt>不能确认的事项</dt>
                  <dd>{supplement.structured.cannotConfirm.join("、")}</dd>
                </div>
                <div>
                  <dt>建议补充来源</dt>
                  <dd>{supplement.structured.suggestedSources.join("、")}</dd>
                </div>
                <div>
                  <dt>治理状态</dt>
                  <dd>{supplement.structured.governanceStatus}</dd>
                </div>
              </dl>
              <p className="boundary-copy">{supplement.missingEvidenceHint}</p>
            </>
          ) : (
            <p className="empty-state">
              员工自述会被整理成待确认线索，不会直接进入已验证证据。
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
