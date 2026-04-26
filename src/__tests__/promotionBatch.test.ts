import { promotionBatch } from "../data/promotionBatch";

describe("promotionBatch mock data", () => {
  it("models the updated HR assessment center shell", () => {
    expect(promotionBatch.productDomain).toBe("晋升评估中心");
    expect(promotionBatch.moduleName).toBe("AI 校准");
    expect(promotionBatch.overview.caseCount).toBe(3);
    expect(promotionBatch.cases.map((item) => item.id)).toEqual(["A", "B", "C"]);
  });

  it("keeps candidate B as the full low-estimation-risk vertical slice", () => {
    const candidateB = promotionBatch.cases.find((item) => item.id === "B");

    expect(candidateB?.originalRecommendation).toBe("暂缓晋升");
    expect(candidateB?.calibrationStatus).toBe("低估风险");
    expect(candidateB?.materialPackageStatus).toBe("已生成");
    expect(candidateB?.materialCoverage.length).toBeGreaterThanOrEqual(6);
    expect(candidateB?.evidence.length).toBeGreaterThanOrEqual(4);
    expect(candidateB?.employeeSupplement?.structured.currentStatus).toBe("待确认");
  });

  it("includes material package and governance record for candidate B", () => {
    const candidateB = promotionBatch.cases.find((item) => item.id === "B")!;

    expect(candidateB.materialPackage.reviewerVersion.summary).toContain("显性绩效");
    expect(candidateB.materialPackage.employeeVersion.boundary).toContain("人工评审");
    expect(candidateB.materialPackage.humanReviewVersion.employeeSelfReportStatus).toContain(
      "待确认",
    );
    expect(candidateB.governanceRecord.employeeSelfReportHandling).toContain(
      "未进入已验证证据",
    );
  });

  it("does not use prohibited automatic-decision language", () => {
    const serialized = JSON.stringify(promotionBatch);

    expect(serialized).not.toContain("AI 改分");
    expect(serialized).not.toContain("自动晋升");
    expect(serialized).not.toContain("申诉成功");
    expect(serialized).not.toContain("提交审批");
    expect(serialized).not.toContain("系统判定应晋升");
    expect(serialized).not.toContain("校准后分数");
    expect(serialized).not.toContain("晋升概率");
  });
});
