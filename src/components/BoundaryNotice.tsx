export function BoundaryNotice() {
  return (
    <section className="boundary-notice">
      <h3>人工复核边界</h3>
      <ul className="compact-list">
        <li>AI 负责发现可能被遗漏的贡献线索、整理证据和生成讨论材料。</li>
        <li>AI 不能确认未进入内部材料的事实，也不能判断贡献是否达到晋升标准。</li>
        <li>员工自述默认标记为待确认，需由主管、协作方或项目材料复核。</li>
        <li>最终晋升建议由人工评审委员会根据完整材料决定。</li>
      </ul>
    </section>
  );
}
