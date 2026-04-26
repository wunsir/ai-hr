# 晋升评估 AI 校准工作台 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-day, high-fidelity, runnable AI product demo for an AI promotion assessment calibration workbench.

**Architecture:** Create a single-page React + TypeScript demo with mock candidate data and mock AI outputs stored locally. The app uses a three-column workbench: candidate switcher, candidate calibration detail, and reviewer-ready summary panel. Candidate B is the complete closed-loop vertical slice; Candidates A and C are compact summary cases.

**Tech Stack:** Vite, React, TypeScript, CSS modules or plain CSS, Vitest, Testing Library, Playwright for manual smoke verification if time allows.

---

## 1. Scope And Product Boundaries

Build only the demo surface described in:

- `plans/promotion-calibration-assistant/product-spec.md`
- `plans/promotion-calibration-assistant/ui-shape.md`
- `AGENTS.md`

Do not add real database integration, login, roles, permissions, approval flows, appeal/dispute systems, employee ranking, model training, real private employee data, or a full HR platform.

The product must frame AI as:

- Finding blind spots.
- Organizing evidence.
- Helping explain review material.
- Producing reviewer prompts and employee-readable explanations.

The product must not frame AI as:

- Changing scores.
- Correcting the original AI result.
- Guaranteeing fairness.
- Deciding promotion outcomes.
- Treating employee self-reports as verified facts.

## 2. File Structure

Create this app structure at repository root:

```text
package.json
tsconfig.json
vite.config.ts
index.html
src/
  main.tsx
  App.tsx
  data/
    candidates.ts
  types/
    calibration.ts
  components/
    AppShell.tsx
    HeaderBar.tsx
    CandidateRail.tsx
    CandidateDetail.tsx
    OriginalAssessment.tsx
    CalibrationComparison.tsx
    EvidenceList.tsx
    EvidenceItem.tsx
    ReviewPrompt.tsx
    ReviewerSummaryPanel.tsx
    EmployeeExplanation.tsx
    EmployeeSupplement.tsx
    BoundaryNotice.tsx
    StatusBadge.tsx
  styles/
    app.css
  test/
    setup.ts
  __tests__/
    candidateData.test.ts
    employeeSupplement.test.tsx
```

Responsibilities:

- `src/types/calibration.ts`: shared TypeScript schema for candidates, evidence, review prompts, employee supplement output, and status values.
- `src/data/candidates.ts`: all static mock data and mock AI output for A/B/C.
- `src/App.tsx`: selected candidate state, evidence status filter state, employee supplement generation state.
- `src/components/AppShell.tsx`: three-column layout and responsive shell.
- `src/components/HeaderBar.tsx`: product title, cycle metadata, "演示数据" marker.
- `src/components/CandidateRail.tsx`: A/B/C candidate switching and scenario summaries.
- `src/components/CandidateDetail.tsx`: routes between Candidate B deep flow and A/C summary views.
- `src/components/OriginalAssessment.tsx`: original AI assessment module.
- `src/components/CalibrationComparison.tsx`: original conclusion vs calibration focus comparison.
- `src/components/EvidenceList.tsx`: grouped evidence list with status filter.
- `src/components/EvidenceItem.tsx`: one review-grade evidence row.
- `src/components/ReviewPrompt.tsx`: low-estimation risk or supplemental-review prompt.
- `src/components/ReviewerSummaryPanel.tsx`: sticky right panel for committee summary, questions, unconfirmed items, and human boundary.
- `src/components/EmployeeExplanation.tsx`: employee-readable explanation preview.
- `src/components/EmployeeSupplement.tsx`: natural language supplement input plus generated structured unconfirmed clue.
- `src/components/BoundaryNotice.tsx`: reusable human-review boundary copy.
- `src/components/StatusBadge.tsx`: consistent labels for `已验证`, `待确认`, `证据不足`.
- `src/styles/app.css`: restrained product-register visual system, layout, responsive behavior, and status colors.
- `src/test/setup.ts`: Vitest DOM matcher setup.
- `src/__tests__/candidateData.test.ts`: schema and guardrail tests for mock data.
- `src/__tests__/employeeSupplement.test.tsx`: interaction test for turning supplement input into a待确认线索.

## 3. Mock Data Schema

Use one local TypeScript schema for all mock content. Keep the schema product-shaped instead of backend-shaped, because there is no API or database in this demo.

```ts
export type CandidateId = "A" | "B" | "C";

export type OriginalRecommendation = "推荐晋升" | "暂缓晋升";

export type ScenarioType = "维持推荐" | "低估风险" | "补充评审";

export type EvidenceStatus = "已验证" | "待确认" | "证据不足";

export type ContributionDimension =
  | "人才培养"
  | "知识沉淀"
  | "协作影响"
  | "长期组织贡献"
  | "用户价值"
  | "创新突破";

export interface EvidenceItem {
  id: string;
  dimension: ContributionDimension;
  title: string;
  fact: string;
  source: string;
  sourceExcerpt: string;
  status: EvidenceStatus;
  action: string;
}

export interface ReviewQuestion {
  id: string;
  askWhom: string;
  question: string;
  reason: string;
}

export interface StructuredSupplement {
  dimension: ContributionDimension[];
  clue: string;
  possibleImpact: string;
  currentStatus: "待确认";
  cannotConfirm: string[];
  suggestedSources: string[];
}

export interface Candidate {
  id: CandidateId;
  label: string;
  roleContext: string;
  scenario: ScenarioType;
  railSummary: {
    originalRecommendation: OriginalRecommendation;
    calibrationFocus: string;
    reviewStatus: string;
  };
  originalAssessment: {
    recommendation: OriginalRecommendation;
    explicitPerformance: string[];
    basis: string[];
    notFullyCovered: string[];
    limitationCopy: string;
  };
  comparison: {
    originalSaw: string[];
    calibrationPromptsReviewerToReview: string[];
  };
  evidence: EvidenceItem[];
  reviewPrompt: {
    title: string;
    body: string;
    triggers: string[];
    limitations: string[];
    nextSteps: string[];
    priority: "低" | "中" | "高";
  };
  reviewerSummary: {
    boundary: string;
    adoptableEvidence: string[];
    unconfirmedClues: string[];
    reminder: string;
  };
  reviewQuestions: ReviewQuestion[];
  unconfirmedItems: string[];
  employeeExplanation: string;
  employeeSupplement?: {
    originalText: string;
    structured: StructuredSupplement;
    missingEvidenceHint: string;
  };
}
```

Required mock content:

- Candidate A: recommended by original AI, calibration maintains recommendation, low-risk summary, at least 2 evidence items.
- Candidate B: original AI says temporary delay, full closed loop, 4 to 6 evidence items, review prompt, employee explanation, employee supplement and structured待确认线索.
- Candidate C: original AI recommends promotion, calibration asks for supplemental review, at least 3 evidence items or risk points, review questions and unconfirmed items.

Candidate B evidence must include the examples from `ui-shape.md`:

- Mentor record for 2 P6 engineers, 1 independently owning gray-release design, status `已验证`.
- Merchant-side exception attribution handbook cited by 4 teams, status `已验证`.
- Payment-chain cross-team coordination shortening integration schedule by about 2 weeks, status `待确认`.
- Customer-service ticket attribution template from employee supplement, status `待确认`.

## 4. Page And Component Breakdown

### 4.1 App Shell

Render one screen with:

- Top bar: `晋升评估 AI 校准工作台`, promotion cycle, review batch, `演示数据`.
- Left rail: 3 candidates, visible at all times on desktop.
- Center content: selected candidate detail.
- Right panel: committee material for selected candidate.

Responsive rule:

- Desktop: three columns.
- Tablet/narrow: left rail becomes top candidate switcher, right panel stacks below the candidate detail.
- Mobile is not the primary demo target, but content must not overlap.

### 4.2 Candidate Rail

Each candidate item shows:

- Candidate label: `候选人 A`, `候选人 B`, `候选人 C`.
- Scenario tag: `维持推荐`, `低估风险`, `补充评审`.
- Original AI recommendation.
- Calibration focus.
- Current review status.

Do not show ranking, avatars, global HR navigation, score tables, or promotion decision buttons.

### 4.3 Candidate Detail

Candidate B deep view order:

1. Original AI assessment.
2. Original vs calibration comparison.
3. Evidence list with status filter.
4. Review prompt: low-estimation risk.
5. Employee-readable explanation.
6. Employee supplement input and structured unconfirmed clue.
7. Human review boundary.

Candidate A and C summary view order:

1. Original AI assessment.
2. Original vs calibration comparison.
3. Condensed evidence or risk list.
4. Summary review prompt.
5. Human review boundary.

### 4.4 Reviewer Summary Panel

Sticky right panel sections:

- `评审讨论摘要`
- `可采纳证据`
- `待确认线索`
- `建议追问`
- `未确认事项`
- `人工复核边界`

For Candidate B and C, review questions must be actionable: ask whom, confirm what, and why it matters.

### 4.5 Employee Supplement Interaction

The input is demo-local only:

- Pre-fill Candidate B with the mock supplement from the UI shape.
- Allow editing the textarea.
- Button: `生成待确认线索`.
- On click, show the static mock structured result and success copy: `已整理为待确认线索`.
- Always keep status as `待确认`.

Do not create a submission queue, appeal status, approval state, or "accepted" state.

## 5. Static Mock Output Vs Interactive Behavior

Static mock output:

- All candidate data.
- Original AI assessments.
- Calibration comparison text.
- Evidence extraction results.
- Evidence source excerpts.
- Evidence status.
- Next actions.
- Review prompts.
- Reviewer summaries.
- Suggested review questions.
- Unconfirmed items.
- Employee-readable explanation.
- Candidate B structured supplement result.

Interactive behavior:

- Select Candidate A/B/C.
- Filter evidence by `全部`, `已验证`, `待确认`, `证据不足`.
- Generate Candidate B employee supplement structured clue from the textarea.
- Optionally toggle lightweight right-panel follow-up markers such as `需主管确认` and `需协作方确认`, but only if the main path is complete first.

No runtime AI call is required. Label generated content as mock AI output only through product framing like `演示数据`; do not expose prompts or model logs.

## 6. Implementation Tasks

### Task 1: Scaffold The Runnable Frontend

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/app.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create Vite React TypeScript dependencies**

Use this `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest --run"
  },
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "@vitejs/plugin-react": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest",
    "typescript": "latest",
    "vite": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Add Vite and TypeScript config**

`vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "vite.config.ts"]
}
```

`src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add minimal Vite entry files**

`index.html`:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

`src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 4: Add temporary app shell**

`src/App.tsx` initially:

```tsx
export default function App() {
  return <main className="app">晋升评估 AI 校准工作台</main>;
}
```

- [ ] **Step 5: Install and verify**

Run:

```bash
npm install
npm run build
```

Expected:

```text
dist/ generated without TypeScript or Vite errors
```

### Task 2: Add Types And Candidate Mock Data

**Files:**

- Create: `src/types/calibration.ts`
- Create: `src/data/candidates.ts`
- Create: `src/__tests__/candidateData.test.ts`

- [ ] **Step 1: Add the schema**

Copy the schema from section 3 into `src/types/calibration.ts`.

- [ ] **Step 2: Add Candidate B complete data first**

Create `src/data/candidates.ts` with `candidates: Candidate[]`. Start with Candidate B, including:

- Original recommendation: `暂缓晋升`.
- Explicit performance: KPI 92%, stable delivery, B+ performance rating, lack of direct growth breakthrough.
- Not fully covered: mentor records, knowledge sharing, cross-team support, long-term user value.
- Evidence list: 4 to 6 items, including the required examples.
- Review prompt title: `复核提示：显性指标可能未覆盖部分组织贡献`.
- Employee explanation using neutral language from `ui-shape.md`.
- Employee supplement original text and structured待确认线索.

- [ ] **Step 3: Add data guardrail tests**

`src/__tests__/candidateData.test.ts` should assert:

```ts
import { candidates } from "../data/candidates";

describe("candidate mock data", () => {
  it("includes three candidates A/B/C", () => {
    expect(candidates.map((candidate) => candidate.id)).toEqual(["A", "B", "C"]);
  });

  it("keeps candidate B as the deep low-estimation-risk case", () => {
    const candidateB = candidates.find((candidate) => candidate.id === "B");

    expect(candidateB?.scenario).toBe("低估风险");
    expect(candidateB?.originalAssessment.recommendation).toBe("暂缓晋升");
    expect(candidateB?.evidence.length).toBeGreaterThanOrEqual(4);
    expect(candidateB?.employeeSupplement?.structured.currentStatus).toBe("待确认");
  });

  it("does not use prohibited automatic-decision language", () => {
    const serialized = JSON.stringify(candidates);

    expect(serialized).not.toContain("AI 改分");
    expect(serialized).not.toContain("自动晋升");
    expect(serialized).not.toContain("系统判定应晋升");
    expect(serialized).not.toContain("消除偏见");
  });
});
```

- [ ] **Step 4: Run tests**

Run:

```bash
npm test
```

Expected:

```text
3 tests pass
```

### Task 3: Implement Candidate B Vertical Slice

**Files:**

- Modify: `src/App.tsx`
- Create: `src/components/AppShell.tsx`
- Create: `src/components/HeaderBar.tsx`
- Create: `src/components/CandidateRail.tsx`
- Create: `src/components/CandidateDetail.tsx`
- Create: `src/components/OriginalAssessment.tsx`
- Create: `src/components/CalibrationComparison.tsx`
- Create: `src/components/EvidenceList.tsx`
- Create: `src/components/EvidenceItem.tsx`
- Create: `src/components/ReviewPrompt.tsx`
- Create: `src/components/ReviewerSummaryPanel.tsx`
- Create: `src/components/BoundaryNotice.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Wire selected candidate state**

`src/App.tsx` should:

```tsx
import { useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { candidates } from "./data/candidates";
import type { CandidateId } from "./types/calibration";

export default function App() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<CandidateId>("B");
  const selectedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.id === selectedCandidateId) ?? candidates[1],
    [selectedCandidateId],
  );

  return (
    <AppShell
      candidates={candidates}
      selectedCandidate={selectedCandidate}
      onSelectCandidate={setSelectedCandidateId}
    />
  );
}
```

- [ ] **Step 2: Build the three-column shell**

`AppShell` should render `HeaderBar`, `CandidateRail`, `CandidateDetail`, and `ReviewerSummaryPanel`.

- [ ] **Step 3: Build OriginalAssessment**

Show:

- Original recommendation.
- Explicit performance summary.
- Original basis.
- Not fully covered.
- Limitation copy: original assessment is not necessarily wrong; material coverage is limited.

- [ ] **Step 4: Build CalibrationComparison**

Use two columns:

- `原评估看到的内容`
- `校准助手提示评审补看的内容`

The right title must not use `修正结果`, `改分`, or `重新判定`.

- [ ] **Step 5: Build EvidenceList and EvidenceItem**

Show grouped or sorted evidence. Each item must render:

- Contribution dimension.
- Evidence title.
- One factual sentence.
- Source.
- Source excerpt.
- Status.
- Required action.

- [ ] **Step 6: Build ReviewPrompt**

For Candidate B, render:

- Trigger reasons.
- Limitations.
- Next steps.
- Fixed boundary sentence: `该提示用于帮助评审补充复核，不改变原 AI 建议，也不代表最终晋升结论。`

- [ ] **Step 7: Build ReviewerSummaryPanel**

Right panel must show:

- Boundary.
- 2 to 3 adoptable evidence bullets.
- 1 to 2 unconfirmed clues.
- Review questions.
- Unconfirmed items.
- Reminder that employee self-report is not verified fact.

- [ ] **Step 8: Verify Candidate B manually**

Run:

```bash
npm run dev
```

Open the local Vite URL. Confirm:

- Candidate B is selected by default.
- Original AI result says `暂缓晋升`.
- Comparison shows original limitations and calibration focus.
- Evidence list includes source, status, and next action for every item.
- Right panel includes committee summary, review questions, unconfirmed items, and human boundary.

### Task 4: Add Employee Explanation And Supplement Loop

**Files:**

- Create: `src/components/EmployeeExplanation.tsx`
- Create: `src/components/EmployeeSupplement.tsx`
- Create: `src/__tests__/employeeSupplement.test.tsx`
- Modify: `src/components/CandidateDetail.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Render employee-readable explanation**

`EmployeeExplanation` should show neutral text:

- What material was recognized.
- What remains unconfirmed.
- Final decision remains human.
- No promise that the outcome will change.

- [ ] **Step 2: Build supplement input**

`EmployeeSupplement` state:

```ts
const [text, setText] = useState(candidate.employeeSupplement?.originalText ?? "");
const [hasGenerated, setHasGenerated] = useState(false);
```

Button behavior:

- Button label: `生成待确认线索`.
- On click, set `hasGenerated` to `true`.
- Display the static structured supplement from mock data.
- Show success status: `已整理为待确认线索`.

- [ ] **Step 3: Keep supplement status unverified**

The structured result must always show:

- `当前状态：待确认`
- `不能确认的事项`
- `建议补充来源`

Do not add `已采纳`, `已确认`, `申诉成功`, or final decision states.

- [ ] **Step 4: Add interaction test**

`src/__tests__/employeeSupplement.test.tsx`:

```tsx
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
    expect(screen.getByText(/待确认/)).toBeInTheDocument();
    expect(screen.queryByText(/已采纳/)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run tests**

Run:

```bash
npm test
```

Expected:

```text
all tests pass
```

### Task 5: Extend Candidate A And C Summary Cases

**Files:**

- Modify: `src/data/candidates.ts`
- Modify: `src/components/CandidateDetail.tsx`
- Modify: `src/components/ReviewerSummaryPanel.tsx`

- [ ] **Step 1: Add Candidate A mock data**

Candidate A must show:

- Scenario: `维持推荐`.
- Original recommendation: `推荐晋升`.
- Calibration focus: explicit performance evidence is sufficient; no obvious low-estimation risk.
- Summary copy: `校准助手未提示需要改变讨论重点。评审仍可查看材料来源，但当前证据结构支持维持原建议。`
- Evidence should be limited and stable, not inflated.

- [ ] **Step 2: Add Candidate C mock data**

Candidate C must show:

- Scenario: `补充评审`.
- Original recommendation: `推荐晋升`.
- Calibration focus: strong visible performance, but collaboration, mentoring, knowledge sedimentation, or organization impact has unconfirmed risk.
- Review questions:
  - Ask collaboration team whether project work caused repeated rework or communication cost.
  - Ask team lead whether knowledge sedimentation can be reused by the team.
  - Ask mentees whether support feedback is stable.

- [ ] **Step 3: Keep Candidate A/C as summary views**

In `CandidateDetail`, if selected candidate is not B:

- Render summary evidence/risk list.
- Render original assessment and comparison.
- Render review prompt and boundary.
- Do not render employee supplement loop for A/C.

- [ ] **Step 4: Verify switching**

Run:

```bash
npm run dev
```

Manual checks:

- Click A: the page communicates `维持推荐`; no added low-estimation risk.
- Click B: the full closed loop appears.
- Click C: the page communicates `补充评审`; no automatic negative decision.

### Task 6: Visual Polish And Demo Fidelity

**Files:**

- Modify: `src/styles/app.css`
- Modify components only for class names or minor structure if needed.

- [ ] **Step 1: Apply restrained product-register styling**

CSS requirements:

- Light workbench background.
- Dense but readable spacing.
- 8px or smaller card radius.
- Semantic status colors only.
- No hero section.
- No decorative gradients or orbs.
- No large KPI dashboard.
- No nested cards.

- [ ] **Step 2: Style statuses consistently**

Recommended status mapping:

- `已验证`: neutral label with low-saturation confirmation border/background.
- `待确认`: information label.
- `证据不足`: gray or subtle warning label.
- `低估风险`: information emphasis, not an automatic pass signal.
- `补充评审`: cautious warning, not an error or punishment signal.

- [ ] **Step 3: Ensure text does not overlap**

Check these viewport widths:

```text
1440px desktop
1024px tablet
390px mobile sanity check
```

Expected:

- Candidate rail remains readable.
- Evidence rows wrap cleanly.
- Right summary panel stacks on narrow screens.
- No button text overflows.

### Task 7: Guardrail Review And Manual Verification

**Files:**

- Modify only files that fail checks.

- [ ] **Step 1: Run build**

Run:

```bash
npm run build
```

Expected:

```text
TypeScript build succeeds and Vite outputs dist/
```

- [ ] **Step 2: Run tests**

Run:

```bash
npm test
```

Expected:

```text
all tests pass
```

- [ ] **Step 3: Manual product acceptance check**

Open the local dev URL and verify:

- A/B/C switching works.
- Candidate A is a维持推荐 summary case.
- Candidate B is the full deep closed-loop case.
- Candidate C is a补充评审 summary case.
- Original AI assessment is visible for all candidates.
- Original assessment and calibration focus comparison is visible.
- Evidence list shows source, trust status, and next action.
- Low-estimation risk or supplemental-review prompt is framed as review support.
- Committee summary is visible.
- Suggested review questions and unconfirmed items are visible.
- Employee-readable explanation is visible for Candidate B.
- Employee supplement input generates a structured待确认线索.
- Human review boundary appears in the detail area and right panel.
- No UI uses prohibited copy such as `AI 改分`, `自动晋升`, `申诉成功`, or `系统判定应晋升`.

## 7. Candidate B Vertical Slice Acceptance

The Candidate B vertical slice is accepted when a reviewer can complete this demo path without explanation from the engineer:

1. Open the app and see Candidate B selected by default.
2. Understand the original AI recommendation: `暂缓晋升`.
3. See that original AI relied mainly on KPI, delivery, performance rating, and project-owner feedback.
4. Compare original conclusion with calibration focus.
5. Review hidden contribution evidence grouped around talent development, knowledge sedimentation, collaboration impact, and user value.
6. See each evidence item's source, status, and next action.
7. Understand the low-estimation risk as a review prompt, not a changed result.
8. Read committee summary, suggested questions, and unconfirmed items.
9. Read employee-facing explanation.
10. Click `生成待确认线索` and see employee supplement transformed into a structured unconfirmed clue.
11. See that employee self-report remains `待确认`.
12. See that final promotion decision remains with human reviewers.

## 8. Build, Run, And Verification Commands

Install:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Preview production build:

```bash
npm run preview
```

Optional browser smoke verification:

```bash
npm run dev
```

Then open the printed Vite URL and follow the manual checklist in Task 7.

## 9. One-Day Execution Order

Recommended schedule:

1. Scaffold app and install dependencies.
2. Implement TypeScript schema and Candidate B mock data.
3. Build Candidate B layout and core review flow.
4. Add employee explanation and supplement loop.
5. Add Candidate A and C summary cases.
6. Polish visual hierarchy and responsive behavior.
7. Run build, tests, and manual demo verification.

Cut if time is tight:

- Lightweight follow-up marker toggles in the right panel.
- Playwright automation.
- Evidence source expansion drawer.

Do not cut:

- Candidate B closed loop.
- A/B/C switching.
- Source/status/next-action fields.
- Review questions and unconfirmed items.
- Employee supplement to待确认线索.
- Human review boundary copy.

## 10. Final Self-Review Checklist

Before calling the implementation complete, confirm:

- The app is runnable locally.
- The app does not depend on a real backend.
- The app uses mock data and mock AI output only.
- Candidate B is the default and complete path.
- Candidate A and C prove the tool is not a one-way "add points" product.
- Employee self-report is never treated as verified fact.
- AI never changes scores or makes final promotion decisions.
- All visible copy remains consistent with the product and UI source-of-truth files.
