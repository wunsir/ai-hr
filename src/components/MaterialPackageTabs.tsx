import { useState } from "react";
import type { CandidateCaseFile } from "../types/calibration";

interface MaterialPackageTabsProps {
  caseFile: CandidateCaseFile;
}

export function MaterialPackageTabs({ caseFile }: MaterialPackageTabsProps) {
  const [packageView, setPackageView] = useState<
    "reviewer" | "employee" | "humanReview"
  >("reviewer");
  const materialPackage = caseFile.materialPackage;

  return (
    <section className="material-package inspector-panel">
      <header className="inspector-head">
        <span className="panel-kicker">AI 评审材料包</span>
        <strong>{caseFile.candidateLabel}</strong>
      </header>
      <div className="package-tabs" aria-label="材料包视角">
        <button
          className={packageView === "reviewer" ? "is-active" : ""}
          onClick={() => setPackageView("reviewer")}
          type="button"
        >
          评审委员版
        </button>
        <button
          className={packageView === "employee" ? "is-active" : ""}
          onClick={() => setPackageView("employee")}
          type="button"
        >
          员工解释版
        </button>
        <button
          className={packageView === "humanReview" ? "is-active" : ""}
          onClick={() => setPackageView("humanReview")}
          type="button"
        >
          人工复核版
        </button>
      </div>

      {packageView === "reviewer" ? (
        <div className="package-view inspector-sections">
          <section>
            <h3>本次可讨论</h3>
            <p>{materialPackage.reviewerVersion.summary}</p>
          </section>
          <ul className="compact-list">
            {materialPackage.reviewerVersion.verifiedEvidence.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <section>
            <h3>需要确认</h3>
          </section>
          <ul className="compact-list">
            {materialPackage.reviewerVersion.unconfirmedClues.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <section>
            <h3>建议追问</h3>
          </section>
          <ol className="inspector-questions">
            {materialPackage.reviewerVersion.questions.slice(0, 3).map((question) => (
              <li key={question.id}>
                向{question.askWhom}确认：{question.question}
              </li>
            ))}
          </ol>
          <p className="boundary-copy">{materialPackage.reviewerVersion.reminder}</p>
        </div>
      ) : null}

      {packageView === "employee" ? (
        <div className="package-view inspector-sections">
          <h3>员工解释</h3>
          <p>{materialPackage.employeeVersion.explanation}</p>
          <h3>系统看到了哪些材料</h3>
          <ul className="compact-list">
            {materialPackage.employeeVersion.recognizedMaterials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>哪些内容仍需确认</h3>
          <ul className="compact-list">
            {materialPackage.employeeVersion.stillNeedsConfirmation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>员工补充如何被处理</h3>
          <p>{materialPackage.employeeVersion.supplementHandling}</p>
          <p className="boundary-copy">{materialPackage.employeeVersion.boundary}</p>
        </div>
      ) : null}

      {packageView === "humanReview" ? (
        <div className="package-view inspector-sections">
          <h3>AI 不能确认的事项</h3>
          <ul className="compact-list">
            {materialPackage.humanReviewVersion.cannotConfirm.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>缺失证据</h3>
          <ul className="compact-list">
            {materialPackage.humanReviewVersion.missingEvidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>建议确认对象</h3>
          <ul className="compact-list">
            {materialPackage.humanReviewVersion.suggestedOwners.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>员工自述状态</h3>
          <p>{materialPackage.humanReviewVersion.employeeSelfReportStatus}</p>
        </div>
      ) : null}
    </section>
  );
}
