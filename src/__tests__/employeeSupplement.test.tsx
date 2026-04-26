import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeeSupplement } from "../components/EmployeeSupplement";
import { candidates } from "../data/candidates";

describe("EmployeeSupplement", () => {
  it("turns employee text into an unconfirmed structured clue", async () => {
    const candidateB = candidates.find((candidate) => candidate.id === "B")!;

    render(<EmployeeSupplement candidate={candidateB} />);

    await userEvent.click(screen.getByRole("button", { name: "生成待确认线索" }));

    expect(screen.getByText("已整理为待确认线索")).toBeInTheDocument();
    expect(screen.getByText(/当前状态/)).toBeInTheDocument();
    expect(screen.getAllByText(/待确认/).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/不会直接进入已验证证据/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/已采纳/)).not.toBeInTheDocument();
  });
});
