interface CalibrationPathProps {
  isDeepCase: boolean;
}

const fullPath = [
  "原 AI 评估",
  "材料覆盖盲区",
  "隐性贡献证据",
  "复核提示",
  "AI 评审材料包",
  "员工解释",
  "员工补充",
  "待确认线索",
  "人工复核边界",
];

const summaryPath = ["原 AI 评估", "材料覆盖盲区", "证据摘要", "复核提示", "人工复核边界"];

export function CalibrationPath({ isDeepCase }: CalibrationPathProps) {
  const nodes = isDeepCase ? fullPath : summaryPath;

  return (
    <nav className="calibration-path" aria-label="校准材料结构导航">
      {nodes.map((node) => (
        <span key={node}>{node}</span>
      ))}
    </nav>
  );
}
