import { Check, ChevronDown, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { RoleView } from "../App";

interface RoleSwitcherProps {
  activeView: RoleView;
  onChange: (view: RoleView) => void;
}

const roleOptions: Array<{ id: RoleView; label: string; description: string }> = [
  {
    id: "hr",
    label: "HRBP 复核",
    description: "批次复核、证据表和确认边界",
  },
  {
    id: "committee",
    label: "评审委员",
    description: "会议材料、可采纳证据和建议追问",
  },
  {
    id: "employee",
    label: "员工视图预览",
    description: "员工可读解释和补充入口",
  },
];

export function RoleSwitcher({ activeView, onChange }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption =
    roleOptions.find((option) => option.id === activeView) ?? roleOptions[0];

  const handleChange = (view: RoleView) => {
    onChange(view);
    setIsOpen(false);
  };

  return (
    <div className="role-context">
      <button
        aria-expanded={isOpen}
        aria-label="切换权限上下文"
        className="role-context__trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <ShieldCheck size={16} aria-hidden="true" />
        <span>
          <strong>当前权限：{activeOption.label}</strong>
          <small>可访问：{activeOption.description}</small>
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {isOpen ? (
        <nav className="role-context__menu" aria-label="权限上下文">
          {roleOptions.map((option) => (
            <button
              aria-label={option.label}
              aria-pressed={activeView === option.id}
              className={activeView === option.id ? "is-active" : ""}
              key={option.id}
              onClick={() => handleChange(option.id)}
              type="button"
            >
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
              {activeView === option.id ? <Check size={15} aria-hidden="true" /> : null}
            </button>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
