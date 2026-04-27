import { Database, KeyRound, Upload } from "lucide-react";
import { useState } from "react";

type ActionPanel = "materials" | "api" | null;

export function SystemActions() {
  const [activePanel, setActivePanel] = useState<ActionPanel>(null);

  const togglePanel = (panel: Exclude<ActionPanel, null>) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };

  return (
    <section className="system-actions" aria-label="系统操作">
      <div className="system-actions__toolbar">
        <button
          aria-expanded={activePanel === "materials"}
          className={activePanel === "materials" ? "is-active" : ""}
          onClick={() => togglePanel("materials")}
          type="button"
        >
          <Upload size={16} aria-hidden="true" />
          导入材料
        </button>
        <button
          aria-expanded={activePanel === "api"}
          className={activePanel === "api" ? "is-active" : ""}
          onClick={() => togglePanel("api")}
          type="button"
        >
          <KeyRound size={16} aria-hidden="true" />
          AI API 设置
        </button>
        <span>
          <Database size={15} aria-hidden="true" />
          材料源：KPI、绩效评级、项目复盘、知识库、mentor 记录
        </span>
      </div>

      {activePanel === "materials" ? (
        <div className="system-actions__panel">
          <div>
            <strong>材料导入预检</strong>
            <p>已识别 7 类材料，员工自述默认进入待确认线索。</p>
          </div>
          <div className="system-actions__dropzone">
            <Upload size={18} aria-hidden="true" />
            拖入项目复盘、360 反馈或知识库导出文件
          </div>
          <button type="button">选择文件</button>
        </div>
      ) : null}

      {activePanel === "api" ? (
        <div className="system-actions__panel">
          <div>
            <strong>AI 校准 API</strong>
            <p>企业 AI 网关 · 批次材料解析配置</p>
          </div>
          <label>
            Provider
            <select defaultValue="internal">
              <option value="internal">企业 AI 网关</option>
              <option value="openai">OpenAI API</option>
              <option value="azure">Azure OpenAI</option>
            </select>
          </label>
          <label>
            API Key
            <input readOnly value="sk-••••••••••••" />
          </label>
          <button type="button">保存配置</button>
        </div>
      ) : null}
    </section>
  );
}
