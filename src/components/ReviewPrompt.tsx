import type { Candidate } from "../types/calibration";

interface ReviewPromptProps {
  prompt: Candidate["reviewPrompt"];
  scenario: Candidate["scenario"];
}

const kickerByScenario: Record<Candidate["scenario"], string> = {
  维持推荐: "复核提示 / 维持推荐",
  低估风险: "复核提示 / 低估风险",
  补充评审: "复核提示 / 补充评审",
};

export function ReviewPrompt({ prompt, scenario }: ReviewPromptProps) {
  return (
    <section className="panel review-prompt">
      <div className="prompt-title-row">
        <div>
          <span className="panel-kicker">{kickerByScenario[scenario]}</span>
          <h3>{prompt.title}</h3>
        </div>
        <span className="priority-tag">复核优先级：{prompt.priority}</span>
      </div>
      <p>{prompt.body}</p>
      <div className="three-column-list">
        <div>
          <h4>触发原因</h4>
          <ul className="compact-list">
            {prompt.triggers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>限制说明</h4>
          <ul className="compact-list">
            {prompt.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>下一步</h4>
          <ul className="compact-list">
            {prompt.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="boundary-copy">
        该提示用于帮助评审补充复核，不改变原 AI 建议，也不代表最终晋升结论。
      </p>
    </section>
  );
}
