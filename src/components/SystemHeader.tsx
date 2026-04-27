import type { PromotionBatch } from "../types/calibration";
import type { RoleView } from "../App";
import { RoleSwitcher } from "./RoleSwitcher";

interface SystemHeaderProps {
  batch: PromotionBatch;
  activeView: RoleView;
  onRoleViewChange: (view: RoleView) => void;
}

export function SystemHeader({ batch, activeView, onRoleViewChange }: SystemHeaderProps) {
  return (
    <header className="system-header">
      <div className="system-header__title">
        <span>{batch.productDomain}</span>
        <strong>{batch.moduleName}</strong>
      </div>
      <div className="system-header__right">
        <div className="system-header__context" aria-label="当前评审上下文">
          <span>{batch.cycle}</span>
          <span>{batch.reviewBatch}</span>
          <strong>{batch.dataLabel}</strong>
        </div>
        <RoleSwitcher activeView={activeView} onChange={onRoleViewChange} />
      </div>
    </header>
  );
}
