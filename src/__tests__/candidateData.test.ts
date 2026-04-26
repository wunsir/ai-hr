import { candidates } from "../data/candidates";

describe("candidate mock data", () => {
  it("includes three candidates A/B/C", () => {
    expect(candidates.map((candidate) => candidate.id)).toEqual(["A", "B", "C"]);
  });

  it("keeps candidate B as the deep low-estimation-risk case", () => {
    const candidateB = candidates.find((candidate) => candidate.id === "B");

    expect(candidateB?.scenario).toBe("低估风险");
    expect(candidateB?.originalAssessment.recommendation).toBe("暂缓晋升");
    expect(candidateB?.evidence.length).toBeGreaterThanOrEqual(4);
    expect(candidateB?.employeeSupplement?.structured.currentStatus).toBe("待确认");
  });

  it("does not use prohibited automatic-decision language", () => {
    const serialized = JSON.stringify(candidates);

    expect(serialized).not.toContain("AI 改分");
    expect(serialized).not.toContain("自动晋升");
    expect(serialized).not.toContain("系统判定应晋升");
    expect(serialized).not.toContain("消除偏见");
  });
});
