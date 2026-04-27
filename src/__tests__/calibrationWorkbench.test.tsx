import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("promotion assessment center AI calibration module", () => {
  it("opens in the HR review workspace with candidate B selected", () => {
    render(<App />);

    expect(screen.getByText("晋升评估中心")).toBeInTheDocument();
    expect(screen.getByText("AI 校准")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "HR 复核工作台" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByText("2026 H1 技术序列").length).toBeGreaterThan(0);
    expect(screen.getAllByText("P6 到 P7 晋升复核批次").length).toBeGreaterThan(0);
    expect(screen.getByText("3 个复核档案")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /档案 B/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByText("材料覆盖盲区").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AI 评审材料包").length).toBeGreaterThan(0);
    expect(screen.queryByText("员工补充入口")).not.toBeInTheDocument();
  });

  it("renders candidate B evidence table with missing evidence and package destinations", () => {
    render(<App />);

    const workpaper = screen.getByLabelText("证据表");

    expect(within(workpaper).getByText("缺失证据")).toBeInTheDocument();
    expect(within(workpaper).getByText("材料包")).toBeInTheDocument();
    expect(within(workpaper).getByText("影响范围和排期口径")).toBeInTheDocument();
    expect(within(workpaper).getAllByText("人工复核版").length).toBeGreaterThan(0);
  });

  it("switches to the committee briefing without exposing employee input or governance details", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "评审委员会材料" }));

    expect(screen.getByRole("heading", { name: "评审委员会材料" })).toBeInTheDocument();
    expect(screen.getByText("补充评估摘要")).toBeInTheDocument();
    expect(screen.getByText("已验证证据")).toBeInTheDocument();
    expect(screen.getByText("待确认线索")).toBeInTheDocument();
    expect(screen.getByText("建议追问")).toBeInTheDocument();
    expect(screen.queryByText("员工补充入口")).not.toBeInTheDocument();
    expect(screen.queryByText("治理记录")).not.toBeInTheDocument();
  });

  it("switches to the employee portal without exposing review queue or committee prompts", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "员工解释与补充" }));

    expect(screen.getByRole("heading", { name: "员工解释与补充" })).toBeInTheDocument();
    expect(screen.getByText("员工补充入口")).toBeInTheDocument();
    expect(screen.queryByText("复核队列")).not.toBeInTheDocument();
    expect(screen.queryByText("候选人 A")).not.toBeInTheDocument();
    expect(screen.queryByText("候选人 C")).not.toBeInTheDocument();
    expect(screen.queryByText("治理记录")).not.toBeInTheDocument();
    expect(screen.queryByText("建议追问")).not.toBeInTheDocument();
  });

  it("keeps A and C as summary case files without the employee supplement loop", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /档案 A/ }));
    expect(screen.getByLabelText("候选人 A AI 校准工作台")).toBeInTheDocument();
    expect(screen.getByText("维持原讨论重点")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /档案 C/ }));
    expect(screen.getByLabelText("候选人 C AI 校准工作台")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /复核提示/ }));
    expect(screen.getByText("补充评审用于完善材料结构，不是否定原推荐，也不是负面裁定。")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();
  });

  it("generates candidate B employee supplement as a pending clue", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "员工解释与补充" }));
    await userEvent.click(screen.getByRole("button", { name: "生成待确认线索" }));

    expect(screen.getByText("已整理为待确认线索")).toBeInTheDocument();
    expect(screen.getByText(/员工自述，未验证，不直接进入评审事实/)).toBeInTheDocument();
  });

  it("does not expose implementation-language copy in the visible interface", () => {
    render(<App />);

    const visibleText = document.body.textContent ?? "";
    const blockedTerms = [
      "mock",
      "coverage ledger",
      "trace",
      "workpaper",
      "TODO",
      "开发",
      "Scaffold",
      "AI 改分",
      "自动晋升",
      "提交审批",
      "驳回",
    ];

    for (const term of blockedTerms) {
      expect(visibleText).not.toContain(term);
    }
  });
});
