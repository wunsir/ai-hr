import type { MaterialCoverageItem } from "../types/calibration";
import { StatusBadge } from "./StatusBadge";

interface MaterialCoverageGapProps {
  items: MaterialCoverageItem[];
}

export function MaterialCoverageGap({ items }: MaterialCoverageGapProps) {
  return (
    <section className="panel material-coverage">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">材料覆盖盲区</span>
          <h3>材料覆盖表</h3>
        </div>
      </div>
      <p>
        校准助手不是重算结论，而是补齐原评估材料视野，帮助评审看到显性绩效以外的证据结构。
      </p>
      <div className="coverage-table">
        <div className="coverage-table__head">
          <span>材料类型</span>
          <span>来源</span>
          <span>覆盖状态</span>
          <span>评审用途</span>
        </div>
        {items.map((item) => (
          <div className="coverage-table__row" key={item.id}>
            <strong>{item.materialType}</strong>
            <span>{item.source}</span>
            <StatusBadge status={item.coverageStatus} />
            <span>{item.discussionUse}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
