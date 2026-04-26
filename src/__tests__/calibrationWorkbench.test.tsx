import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("promotion assessment center AI calibration module", () => {
  it("opens in the updated assessment-center shell with candidate B selected", () => {
    render(<App />);

    expect(screen.getByText("晋升评估中心")).toBeInTheDocument();
    expect(screen.getByText("AI 校准")).toBeInTheDocument();
    expect(screen.getAllByText("2026 H1 技术序列").length).toBeGreaterThan(0);
    expect(screen.getAllByText("P6 到 P7 晋升复核批次").length).toBeGreaterThan(0);
    expect(screen.getByText("3 个 AI case file")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Case B/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByText("材料覆盖盲区").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AI 评审材料包").length).toBeGreaterThan(0);
  });

  it("renders candidate B evidence workpaper with missing evidence and package destinations", () => {
    render(<App />);

    const workpaper = screen.getByLabelText("证据 workpaper");

    expect(within(workpaper).getByText("缺失证据")).toBeInTheDocument();
    expect(within(workpaper).getByText("材料包")).toBeInTheDocument();
    expect(within(workpaper).getByText("影响范围和排期口径")).toBeInTheDocument();
    expect(within(workpaper).getAllByText("人工复核版").length).toBeGreaterThan(0);
  });

  it("switches side rail between package versions and governance record", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "员工解释版" }));
    expect(screen.getAllByText(/员工补充如何被处理/).length).toBeGreaterThan(0);

    await userEvent.click(screen.getByRole("button", { name: "人工复核版" }));
    expect(screen.getByText("AI 不能确认的事项")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "治理记录" }));
    expect(screen.getByText("AI 输出时间")).toBeInTheDocument();
    expect(screen.getByText(/员工自述状态/)).toBeInTheDocument();
  });

  it("keeps A and C as summary case files without the employee supplement loop", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /Case A/ }));
    expect(screen.getByLabelText("候选人 A AI 校准工作台")).toBeInTheDocument();
    expect(screen.getByText("维持原讨论重点")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Case C/ }));
    expect(screen.getByLabelText("候选人 C AI 校准工作台")).toBeInTheDocument();
    expect(screen.getByText("补充评审用于完善材料结构，不是否定原推荐，也不是负面裁定。")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "生成待确认线索" }),
    ).not.toBeInTheDocument();
  });

  it("generates candidate B employee supplement as a pending clue", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "生成待确认线索" }));

    expect(screen.getByText("已整理为待确认线索")).toBeInTheDocument();
    expect(screen.getByText(/员工自述，未验证，不直接进入评审事实/)).toBeInTheDocument();
  });
});
