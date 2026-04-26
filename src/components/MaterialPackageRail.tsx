import { useState } from "react";
import type { CandidateCaseFile } from "../types/calibration";
import { GovernanceRecord } from "./GovernanceRecord";
import { MaterialPackageTabs } from "./MaterialPackageTabs";

interface MaterialPackageRailProps {
  caseFile: CandidateCaseFile;
}

export function MaterialPackageRail({ caseFile }: MaterialPackageRailProps) {
  const [railView, setRailView] = useState<"package" | "governance">("package");

  return (
    <aside className="material-rail" aria-label="AI 材料包与治理记录">
      <div className="rail-switch" aria-label="侧栏视角">
        <button
          className={railView === "package" ? "is-active" : ""}
          onClick={() => setRailView("package")}
          type="button"
        >
          AI 评审材料包
        </button>
        <button
          className={railView === "governance" ? "is-active" : ""}
          onClick={() => setRailView("governance")}
          type="button"
        >
          治理记录
        </button>
      </div>
      {railView === "package" ? (
        <MaterialPackageTabs caseFile={caseFile} />
      ) : (
        <GovernanceRecord record={caseFile.governanceRecord} />
      )}
    </aside>
  );
}
