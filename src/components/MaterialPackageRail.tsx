import { useState } from "react";
import type { CandidateCaseFile } from "../types/calibration";
import { GovernanceRecord } from "./GovernanceRecord";
import { MaterialPackageTabs } from "./MaterialPackageTabs";

interface MaterialPackageRailProps {
  caseFile: CandidateCaseFile;
}

type RailView = "package" | "governance";

export function MaterialPackageRail({ caseFile }: MaterialPackageRailProps) {
  const [railView, setRailView] = useState<RailView>("package");

  return (
    <aside className="material-rail" aria-label="人工复核材料与治理记录">
      <div className="rail-switch" aria-label="侧栏视图">
        <button
          className={railView === "package" ? "is-active" : ""}
          onClick={() => setRailView("package")}
          type="button"
        >
          AI 材料包
        </button>
        <button
          className={railView === "governance" ? "is-active" : ""}
          onClick={() => setRailView("governance")}
          type="button"
        >
          治理记录
        </button>
      </div>
      {railView === "package" ? <MaterialPackageTabs caseFile={caseFile} /> : null}
      {railView === "governance" ? (
        <GovernanceRecord record={caseFile.governanceRecord} />
      ) : null}
    </aside>
  );
}
