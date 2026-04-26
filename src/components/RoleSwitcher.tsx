import type { RoleView } from "../App";

interface RoleSwitcherProps {
  activeView: RoleView;
  onChange: (view: RoleView) => void;
}

const roleOptions: Array<{ id: RoleView; label: string; description: string }> = [
  {
    id: "hr",
    label: "HR 复核工作台",
    description: "批次复核、证据表和人工确认边界",
  },
  {
    id: "committee",
    label: "评审委员会材料",
    description: "会议摘要、可采纳证据和建议追问",
  },
  {
    id: "employee",
    label: "员工解释与补充",
    description: "员工可读解释和补充入口",
  },
];

export function RoleSwitcher({ activeView, onChange }: RoleSwitcherProps) {
  return (
    <nav className="role-switcher" aria-label="角色视角">
      {roleOptions.map((option) => (
        <button
          aria-label={option.label}
          aria-pressed={activeView === option.id}
          className={activeView === option.id ? "is-active" : ""}
          key={option.id}
          onClick={() => onChange(option.id)}
          type="button"
        >
          <span>{option.label}</span>
          <small>{option.description}</small>
        </button>
      ))}
    </nav>
  );
}
