import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeeSupplement } from "../components/EmployeeSupplement";
import { promotionBatch } from "../data/promotionBatch";

describe("EmployeeSupplement", () => {
  it("turns employee text into an unconfirmed structured clue", async () => {
    const candidateB = promotionBatch.cases.find((item) => item.id === "B")!;

    render(<EmployeeSupplement caseFile={candidateB} />);

    await userEvent.click(screen.getByRole("button", { name: "生成待确认线索" }));

    expect(screen.getByText("已整理为待确认线索")).toBeInTheDocument();
    expect(screen.getByText(/当前状态/)).toBeInTheDocument();
    expect(screen.getAllByText(/待确认/).length).toBeGreaterThan(0);
    expect(screen.getByText(/未验证/)).toBeInTheDocument();
    expect(screen.queryByText(/已采纳/)).not.toBeInTheDocument();
    expect(screen.queryByText(/提交申诉/)).not.toBeInTheDocument();
  });
});
