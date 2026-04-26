import type { CandidateCaseFile } from "../types/calibration";

interface ReviewPromptProps {
  caseFile: CandidateCaseFile;
}

export function ReviewPrompt({ caseFile }: ReviewPromptProps) {
  const prompt = caseFile.reviewPrompt;

  return (
    <section className="panel review-prompt">
      <div className="prompt-title-row">
        <div>
          <span className="panel-kicker">复核提示 / {caseFile.calibrationStatus}</span>
          <h3>{prompt.title}</h3>
        </div>
        <span className="priority-tag">复核优先级：{caseFile.reviewPriority}</span>
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
          <h4>不能确认事项</h4>
          <ul className="compact-list">
            {prompt.cannotConfirm.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>建议追问对象</h4>
          <ul className="compact-list">
            {prompt.suggestedConfirmations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="boundary-copy">{prompt.boundary}</p>
    </section>
  );
}
