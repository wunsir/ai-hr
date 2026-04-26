import type { PromotionBatch } from "../types/calibration";

interface BatchOverviewProps {
  batch: PromotionBatch;
}

export function BatchOverview({ batch }: BatchOverviewProps) {
  return (
    <section className="batch-overview" aria-label="评审批次概览">
      <div className="batch-overview__main">
        <span className="eyebrow">评审批次概览</span>
        <h1>{batch.cycle}</h1>
        <p>{batch.reviewBatch}</p>
      </div>
      <div className="batch-overview__items">
        <span>{batch.overview.caseCount} 个复核档案</span>
        <span>{batch.overview.aiReviewStatus}</span>
        {batch.overview.riskDistribution.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span>{batch.overview.unconfirmedCount} 项待人工确认</span>
        <span>{batch.overview.materialPackageStatus}</span>
      </div>
      <p className="batch-boundary">{batch.overview.boundaryCopy}</p>
    </section>
  );
}
