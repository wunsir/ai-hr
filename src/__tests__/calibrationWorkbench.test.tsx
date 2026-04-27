import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("promotion assessment center AI calibration module", () => {
  it("opens in the HR review workspace with candidate B selected", () => {
    render(<App />);

    expect(screen.getByText("晋升评估中心")).toBeInTheDocument();
    expect(screen.getByText("AI 校准")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "切换权限上下文" })).toHaveTextContent(
      "当前权限：HRBP 复核",
    );
    expect(screen.getAllByText("2026 H1 技术序列").length).toBeGreaterThan(0);
    expect(screen.getAllByText("P6 到 P7 晋升复核批次").length).toBeGreaterThan(0);
    expect(screen.getByText("3 个复核档案")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /档案 B/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /AI 校准材料/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "贡献证据" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByText("AI 评审材料包").length).toBeGreaterThan(0);
    expect(screen.queryByText("员工补充入口")).not.toBeInTheDocument();
  });

  it("renders candidate B evidence list with expandable details", async () => {
    render(<App />);

    const workpaper = screen.getByLabelText("证据表");

    expect(within(workpaper).getByRole("heading", { name: "隐性贡献证据" })).toBeInTheDocument();
    expect(within(workpaper).getAllByRole("article").length).toBe(5);
    expect(within(workpaper).getByText("mentor 记录、主管反馈")).toBeInTheDocument();
    expect(within(workpaper).getAllByText("评审委员版").length).toBeGreaterThan(0);
    expect(within(workpaper).queryByText("持续引用频率可补充")).not.toBeInTheDocument();

    await userEvent.click(within(workpaper).getByRole("button", { name: /异常归因手册/ }));

    expect(within(workpaper).getByText("持续引用频率可补充")).toBeInTheDocument();
  });

  it("switches to the committee briefing without exposing employee input or governance details", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "切换权限上下文" }));
    await userEvent.click(screen.getByRole("button", { name: "评审委员" }));

    expect(screen.getByRole("heading", { name: "评审委员会材料" })).toBeInTheDocument();
    expect(screen.getByText("补充评估摘要")).toBeInTheDocument();
    expect(screen.getByText("已验证证据")).toBeInTheDocument();
    expect(screen.getByText("待确认线索")).toBeInTheDocument();
    expect(screen.getByText("建议追问")).toBeInTheDocument();
    expect(screen.queryByText("员工补充入口")).not.toBeInTheDocument();
    expect(screen.queryByText("治理记录")).not.toBeInTheDocument();
  });

  it("keeps the material rail focused as a reviewer inspector", () => {
    render(<App />);

    const rail = screen.getByLabelText("人工复核材料与治理记录");

    expect(within(rail).getByText("本次可讨论")).toBeInTheDocument();
    expect(within(rail).getByText("需要确认")).toBeInTheDocument();
    expect(within(rail).getByText("建议追问")).toBeInTheDocument();
    expect(within(rail).queryByRole("heading", { name: "候选人 B" })).not.toBeInTheDocument();
  });

  it("switches to the employee portal without exposing review queue or committee prompts", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "切换权限上下文" }));
    await userEvent.click(screen.getByRole("button", { name: "员工视图预览" }));

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
    expect(screen.getAllByText("维持原讨论重点").length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /档案 C/ }));
    const candidateCWorkspace = screen.getByLabelText("候选人 C AI 校准工作台");
    expect(candidateCWorkspace).toBeInTheDocument();
    await userEvent.click(within(candidateCWorkspace).getByRole("button", { name: /人工复核/ }));
    await userEvent.click(within(candidateCWorkspace).getByRole("button", { name: /复核提示/ }));
    expect(within(candidateCWorkspace).getByText("补充评审用于完善材料结构，不是否定原推荐，也不是负面裁定。")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();
  });

  it("generates candidate B employee supplement as a pending clue", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "切换权限上下文" }));
    await userEvent.click(screen.getByRole("button", { name: "员工视图预览" }));
    await userEvent.click(screen.getByRole("button", { name: "生成待确认线索" }));

    expect(screen.getByText("已整理为待确认线索")).toBeInTheDocument();
    expect(screen.getByText(/员工自述，未验证，不直接进入评审事实/)).toBeInTheDocument();
  });

  it("opens, closes, docks, and reopens the calibration assistant", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "打开校准助手" }));

    expect(screen.getByText("候选人 B 的低估风险来源是什么？")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "关闭助手" }));
    expect(screen.getByRole("button", { name: "打开校准助手" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "打开校准助手" }));
    await userEvent.click(screen.getByRole("button", { name: "收纳助手" }));
    expect(screen.getByRole("button", { name: "展开校准助手" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "展开校准助手" }));
    expect(screen.getByRole("button", { name: "关闭助手" })).toBeInTheDocument();
  });

  it("does not expose implementation-language copy in the visible interface", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "AI API 设置" }));
    await userEvent.click(screen.getByRole("button", { name: "打开校准助手" }));

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
      "演示模式",
      "不连接真实对话",
      "仅为演示配置",
      "不发起真实模型调用",
      "保存演示配置",
      "来源、状态、缺失证据与材料包归属",
      "材料结构导航",
      "员工补充待确认线索人工复核边界",
    ];

    for (const term of blockedTerms) {
      expect(visibleText).not.toContain(term);
    }
  });
});
