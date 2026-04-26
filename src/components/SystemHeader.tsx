import type { PromotionBatch } from "../types/calibration";

interface SystemHeaderProps {
  batch: PromotionBatch;
}

export function SystemHeader({ batch }: SystemHeaderProps) {
  return (
    <header className="system-header">
      <div className="system-header__title">
        <span>{batch.productDomain}</span>
        <strong>{batch.moduleName}</strong>
      </div>
      <div className="system-header__context" aria-label="当前评审上下文">
        <span>{batch.cycle}</span>
        <span>{batch.reviewBatch}</span>
        <strong>{batch.dataLabel}</strong>
      </div>
    </header>
  );
}
