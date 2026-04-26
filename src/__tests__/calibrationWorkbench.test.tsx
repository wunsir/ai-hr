import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { CandidateDetail } from "../components/CandidateDetail";
import { candidates } from "../data/candidates";

describe("calibration workbench acceptance behavior", () => {
  it("selects candidate B by default for the deep closed-loop case", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: /候选人 B/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByText(
        "原 AI 评估 → 隐性贡献证据 → 员工补充待确认线索 → 人工复核边界",
      ),
    ).toBeInTheDocument();
  });

  it("does not label candidate C review prompt as low-estimation risk", () => {
    const candidateC = candidates.find((candidate) => candidate.id === "C")!;

    render(
      <CandidateDetail
        candidate={candidateC}
        evidenceFilter="全部"
        onSetEvidenceFilter={() => undefined}
      />,
    );

    expect(screen.getByText("复核提示 / 补充评审")).toBeInTheDocument();
    expect(screen.queryByText("低估风险 / 复核提示")).not.toBeInTheDocument();
  });

  it("keeps A as a summary case with sufficient verified material in the right panel", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /候选人 A/ }));

    const detail = screen.getByLabelText("候选人 A 校准详情");
    const reviewerPanel = screen.getByLabelText("评审委员会材料");

    expect(within(detail).getByText("维持推荐")).toBeInTheDocument();
    expect(
      within(detail).queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();
    expect(within(reviewerPanel).getByText("已验证材料充分")).toBeInTheDocument();
    expect(
      within(reviewerPanel).getByText("无明显新增复核风险"),
    ).toBeInTheDocument();
  });

  it("keeps C as a supplemental-review summary case and updates right-panel questions", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /候选人 C/ }));

    const detail = screen.getByLabelText("候选人 C 校准详情");
    const reviewerPanel = screen.getByLabelText("评审委员会材料");

    expect(within(detail).getByText("补充评审")).toBeInTheDocument();
    expect(
      within(detail).queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();
    expect(within(reviewerPanel).getByText("补充评审问题")).toBeInTheDocument();
    expect(within(reviewerPanel).getByText("向协作团队确认")).toBeInTheDocument();
  });
});
