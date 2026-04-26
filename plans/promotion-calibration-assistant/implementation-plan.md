# 晋升评估中心 AI 校准模块 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-day, high-fidelity, runnable AI product demo that presents the AI calibration experience as a module inside an HR promotion assessment center.

**Architecture:** Build a React + TypeScript single-page demo backed entirely by local mock data. The app has five visible layers: system shell, batch overview, case file queue, candidate AI calibration workspace, and a side rail for AI review material package plus governance record. Candidate B is the full closed-loop vertical slice; Candidates A and C stay as summary case files.

**Tech Stack:** Vite, React, TypeScript, plain CSS, Vitest, Testing Library. Playwright is optional for final visual smoke checks if time allows.

---

## 1. Updated Product Direction

The implementation must follow the updated source of truth:

- `plans/promotion-calibration-assistant/product-spec.md`
- `plans/promotion-calibration-assistant/ui-shape.md`
- `AGENTS.md`

The product is no longer just a standalone “AI 校准工作台”. It should feel like:

> 晋升评估中心中的 AI 校准模块

This means the demo must show:

- 晋升评估中心 system shell.
- 当前评审批次概览.
- 3 个候选人 case file 复核队列.
- 候选人 B 的 AI 校准工作台.
- AI 评审材料包三视角.
- 轻量治理记录.

It must still not become a real HR platform. Do not add login, org management, approval flow, appeal flow, ranking, database integration, model training, real audit/compliance records, or real private employee data.

## 2. One-Day Delivery Strategy

Build in this order:

1. Scaffold runnable Vite app.
2. Define product-shaped mock schema and mock data.
3. Build Candidate B vertical slice inside the upgraded system shell.
4. Add AI review material package tabs and governance record.
5. Add employee supplement loop.
6. Add Candidate A and C summary case files.
7. Polish enterprise-system visual density and run verification.

Non-negotiable for the demo:

- Candidate B is selected by default.
- User first sees batch context and case file queue.
- Candidate B includes original AI assessment, material coverage gap, comparison, evidence workpaper, underestimation prompt, material package, employee explanation, employee supplement, structured待确认线索, and human review boundary.
- Right side rail can switch between AI 材料包 and 治理记录.
- AI never changes scores, confirms facts from employee self-report, or makes final promotion decisions.

## 3. File Structure

Create the app at repository root:

```text
package.json
tsconfig.json
vite.config.ts
index.html
src/
  main.tsx
  App.tsx
  data/
    promotionBatch.ts
  types/
    calibration.ts
  components/
    AppShell.tsx
    SystemHeader.tsx
    BatchOverview.tsx
    CaseFileQueue.tsx
    CandidateWorkspace.tsx
    CaseHeader.tsx
    CalibrationPath.tsx
    OriginalAssessment.tsx
    MaterialCoverageGap.tsx
    CalibrationComparison.tsx
    EvidenceWorkpaper.tsx
    EvidenceRow.tsx
    ReviewPrompt.tsx
    MaterialPackageRail.tsx
    MaterialPackageTabs.tsx
    GovernanceRecord.tsx
    EmployeeExplanation.tsx
    EmployeeSupplement.tsx
    BoundaryNotice.tsx
    StatusBadge.tsx
  styles/
    app.css
  test/
    setup.ts
  __tests__/
    promotionBatch.test.ts
    employeeSupplement.test.tsx
```

Responsibilities:

- `src/types/calibration.ts`: all TypeScript types for batch, case files, material coverage, evidence, package views, governance, and employee supplement.
- `src/data/promotionBatch.ts`: all mock data and mock AI output.
- `src/App.tsx`: selected case state, evidence filter state, side-rail tab state.
- `src/components/AppShell.tsx`: five-layer layout.
- `src/components/SystemHeader.tsx`: `晋升评估中心` shell and `AI 校准` module context.
- `src/components/BatchOverview.tsx`: current batch summary and review-status chips.
- `src/components/CaseFileQueue.tsx`: A/B/C case file switching.
- `src/components/CandidateWorkspace.tsx`: selected candidate work area.
- `src/components/CaseHeader.tsx`: candidate identity, original recommendation, calibration status, review priority, material package status.
- `src/components/CalibrationPath.tsx`: static material-structure navigation.
- `src/components/OriginalAssessment.tsx`: original AI assessment and limits.
- `src/components/MaterialCoverageGap.tsx`: coverage ledger for covered, calibration-supplemented, and employee-supplied material.
- `src/components/CalibrationComparison.tsx`: original AI basis vs AI calibration prompts to review.
- `src/components/EvidenceWorkpaper.tsx`: filterable evidence workpaper.
- `src/components/EvidenceRow.tsx`: one evidence row with source, excerpt, status, missing evidence, next action, package destination.
- `src/components/ReviewPrompt.tsx`: low-estimation or supplemental-review prompt.
- `src/components/MaterialPackageRail.tsx`: right rail container with package/governance switch.
- `src/components/MaterialPackageTabs.tsx`: three package views: reviewer, employee, human review.
- `src/components/GovernanceRecord.tsx`: lightweight trace and boundary.
- `src/components/EmployeeExplanation.tsx`: neutral employee-readable package preview.
- `src/components/EmployeeSupplement.tsx`: employee text to structured待确认线索 interaction.
- `src/components/BoundaryNotice.tsx`: repeated human-review boundary copy.
- `src/components/StatusBadge.tsx`: consistent semantic chips.
- `src/styles/app.css`: enterprise-system visual language, layout, responsive behavior.
- `src/test/setup.ts`: Vitest DOM matcher setup.
- `src/__tests__/promotionBatch.test.ts`: schema, content, and copy guardrail tests.
- `src/__tests__/employeeSupplement.test.tsx`: interaction test for employee supplement.

## 4. Mock Data Schema

Use local TypeScript data only. Do not create API mocks or persistence.

```ts
export type CaseId = "A" | "B" | "C";
export type OriginalRecommendation = "推荐晋升" | "暂缓晋升";
export type CalibrationStatus = "维持推荐" | "低估风险" | "补充评审";
export type EvidenceStatus = "已验证" | "待确认" | "证据不足";
export type CoverageStatus = "已覆盖" | "校准补充" | "待确认";
export type ReviewPriority = "低" | "中" | "高";
export type PackageDestination = "评审委员版" | "员工解释版" | "人工复核版";

export type ContributionDimension =
  | "人才培养"
  | "知识沉淀"
  | "协作影响"
  | "长期组织贡献"
  | "用户价值"
  | "创新突破";

export interface PromotionBatch {
  productDomain: "晋升评估中心";
  moduleName: "AI 校准";
  cycle: string;
  reviewBatch: string;
  dataLabel: "演示数据";
  overview: {
    caseCount: number;
    aiReviewStatus: string;
    riskDistribution: string[];
    unconfirmedCount: number;
    materialPackageStatus: string;
    boundaryCopy: string;
  };
  cases: CandidateCaseFile[];
}

export interface CandidateCaseFile {
  id: CaseId;
  candidateLabel: string;
  roleContext: string;
  originalRecommendation: OriginalRecommendation;
  calibrationStatus: CalibrationStatus;
  reviewPriority: ReviewPriority;
  materialPackageStatus: "已生成" | "摘要材料";
  queueSummary: {
    evidenceCoverage: {
      explicitPerformance: CoverageStatus;
      internalMaterials: CoverageStatus;
      employeeSupplement: CoverageStatus;
    };
    unconfirmedCount: number;
    nextAction: string;
    shortCopy: string;
  };
  originalAssessment: {
    explicitPerformance: string[];
    basis: string[];
    limitationCopy: string;
  };
  materialCoverage: MaterialCoverageItem[];
  comparison: {
    originalBasis: string[];
    calibrationReviewFocus: string[];
  };
  evidence: EvidenceItem[];
  reviewPrompt: ReviewPrompt;
  materialPackage: MaterialPackage;
  governanceRecord: GovernanceRecord;
  employeeExplanation?: string;
  employeeSupplement?: EmployeeSupplement;
}

export interface MaterialCoverageItem {
  id: string;
  materialType: string;
  source: string;
  coverageStatus: CoverageStatus;
  discussionUse: string;
}

export interface EvidenceItem {
  id: string;
  dimension: ContributionDimension;
  reviewableFact: string;
  source: string;
  sourceExcerpt: string;
  status: EvidenceStatus;
  missingEvidence: string;
  nextAction: string;
  packageDestinations: PackageDestination[];
}

export interface ReviewPrompt {
  title: string;
  body: string;
  triggers: string[];
  cannotConfirm: string[];
  suggestedConfirmations: string[];
  boundary: string;
}

export interface ReviewQuestion {
  id: string;
  askWhom: string;
  question: string;
  reason: string;
}

export interface MaterialPackage {
  reviewerVersion: {
    summary: string;
    verifiedEvidence: string[];
    unconfirmedClues: string[];
    questions: ReviewQuestion[];
    reminder: string;
  };
  employeeVersion: {
    explanation: string;
    recognizedMaterials: string[];
    stillNeedsConfirmation: string[];
    supplementHandling: string;
    boundary: string;
  };
  humanReviewVersion: {
    cannotConfirm: string[];
    missingEvidence: string[];
    suggestedOwners: string[];
    employeeSelfReportStatus: string;
  };
}

export interface GovernanceRecord {
  aiOutputTime: string;
  inputMaterials: string[];
  verifiedMaterials: string[];
  unconfirmedMaterials: string[];
  employeeSelfReportHandling: string;
  humanReviewBoundary: string;
}

export interface EmployeeSupplement {
  originalText: string;
  structured: {
    dimensions: ContributionDimension[];
    clue: string;
    possibleImpact: string;
    currentStatus: "待确认";
    cannotConfirm: string[];
    suggestedSources: string[];
    governanceStatus: string;
  };
  missingEvidenceHint: string;
}
```

Required mock content:

- Batch context: `2026 H1 技术序列`, `P6 到 P7 晋升复核批次`, 3 case files, 6 unconfirmed items, Candidate B package generated.
- Candidate A: `维持推荐`, original `推荐晋升`, low or no unconfirmed items, summary package only.
- Candidate B: `低估风险`, original `暂缓晋升`, full closed loop.
- Candidate C: `补充评审`, original `推荐晋升`, 2 to 3 unconfirmed items, review questions.
- Candidate B evidence workpaper includes 4 to 6 rows and the required examples from `ui-shape.md`.
- Governance record explicitly says employee self-report is structured as待确认线索 and not verified evidence.

## 5. Static Mock Output Vs Interactive Behavior

Static mock output:

- Batch overview.
- Case file queue data.
- Original AI assessments.
- Material coverage gap ledger.
- Calibration comparison.
- Evidence extraction rows.
- Review prompt.
- AI material package three versions.
- Governance record.
- Employee explanation.
- Candidate B structured employee supplement.
- Candidate B/C review questions.

Interactive behavior:

- Select Case A/B/C.
- Filter evidence by `全部`, `已验证`, `待确认`, `证据不足`.
- Switch side rail between `AI 评审材料包` and `治理记录`.
- Switch package tabs: `评审委员版`, `员工解释版`, `人工复核版`.
- Click `生成待确认线索` for Candidate B employee supplement.

Do not implement:

- Real save state.
- Approval submission.
- Pass/reject actions.
- Appeal or dispute flow.
- Ranking or sorting by promotion likelihood.
- Runtime AI call.
- Prompt/model log display.

## 6. Implementation Tasks

### Task 1: Scaffold Runnable Frontend

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/app.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Create dependencies**

`package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest --run"
  },
  "dependencies": {
    "lucide-react": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "@vitejs/plugin-react": "latest",
    "jsdom": "latest",
    "typescript": "latest",
    "vite": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Add config**

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

- [ ] **Step 3: Add app entry**

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

`src/App.tsx` initially:

```tsx
export default function App() {
  return <main className="app">晋升评估中心 · AI 校准</main>;
}
```

- [ ] **Step 4: Verify scaffold**

Run:

```bash
npm install
npm run build
```

Expected:

```text
dist/ generated without TypeScript or Vite errors
```

### Task 2: Add Schema And Mock Batch Data

**Files:**

- Create: `src/types/calibration.ts`
- Create: `src/data/promotionBatch.ts`
- Create: `src/__tests__/promotionBatch.test.ts`

- [ ] **Step 1: Add schema**

Copy the schema from section 4 into `src/types/calibration.ts`.

- [ ] **Step 2: Add `promotionBatch` mock data**

`src/data/promotionBatch.ts` exports:

```ts
import type { PromotionBatch } from "../types/calibration";

export const promotionBatch: PromotionBatch = {
  productDomain: "晋升评估中心",
  moduleName: "AI 校准",
  cycle: "2026 H1 技术序列",
  reviewBatch: "P6 到 P7 晋升复核批次",
  dataLabel: "演示数据",
  overview: {
    caseCount: 3,
    aiReviewStatus: "AI 校准分析已完成",
    riskDistribution: ["低估风险 1", "补充评审 1", "维持推荐 1"],
    unconfirmedCount: 6,
    materialPackageStatus: "候选人 B 已生成评审材料包，A/C 为摘要材料",
    boundaryCopy: "本批次仅展示 AI 校准材料结构，不代表最终晋升结论。所有待确认线索需由人工评审继续复核。"
  },
  cases: []
};
```

Then add full A/B/C case data. Candidate B must include:

- `roleContext`: `商家平台 · 资深后端工程师`.
- `originalRecommendation`: `暂缓晋升`.
- `calibrationStatus`: `低估风险`.
- `reviewPriority`: `中`.
- `materialPackageStatus`: `已生成`.
- Material coverage rows for KPI, delivery cycle, performance rating, project-owner feedback, mentor record, knowledge sharing, cross-team support, long-term user value, employee supplement.
- Evidence rows with `missingEvidence` and `packageDestinations`.
- Material package reviewer/employee/human-review versions.
- Governance record with `aiOutputTime`, input material range, verified materials, unconfirmed materials, employee self-report handling, and human review boundary.

- [ ] **Step 3: Add data tests**

`src/__tests__/promotionBatch.test.ts`:

```ts
import { promotionBatch } from "../data/promotionBatch";

describe("promotionBatch mock data", () => {
  it("models the updated HR assessment center shell", () => {
    expect(promotionBatch.productDomain).toBe("晋升评估中心");
    expect(promotionBatch.moduleName).toBe("AI 校准");
    expect(promotionBatch.overview.caseCount).toBe(3);
    expect(promotionBatch.cases.map((item) => item.id)).toEqual(["A", "B", "C"]);
  });

  it("keeps candidate B as the full low-estimation-risk vertical slice", () => {
    const candidateB = promotionBatch.cases.find((item) => item.id === "B");

    expect(candidateB?.originalRecommendation).toBe("暂缓晋升");
    expect(candidateB?.calibrationStatus).toBe("低估风险");
    expect(candidateB?.materialPackageStatus).toBe("已生成");
    expect(candidateB?.materialCoverage.length).toBeGreaterThanOrEqual(6);
    expect(candidateB?.evidence.length).toBeGreaterThanOrEqual(4);
    expect(candidateB?.employeeSupplement?.structured.currentStatus).toBe("待确认");
  });

  it("includes material package and governance record for candidate B", () => {
    const candidateB = promotionBatch.cases.find((item) => item.id === "B")!;

    expect(candidateB.materialPackage.reviewerVersion.summary).toContain("显性绩效");
    expect(candidateB.materialPackage.employeeVersion.boundary).toContain("人工评审");
    expect(candidateB.materialPackage.humanReviewVersion.employeeSelfReportStatus).toContain("待确认");
    expect(candidateB.governanceRecord.employeeSelfReportHandling).toContain("未进入已验证证据");
  });

  it("does not use prohibited automatic-decision language", () => {
    const serialized = JSON.stringify(promotionBatch);

    expect(serialized).not.toContain("AI 改分");
    expect(serialized).not.toContain("自动晋升");
    expect(serialized).not.toContain("申诉成功");
    expect(serialized).not.toContain("提交审批");
    expect(serialized).not.toContain("系统判定应晋升");
    expect(serialized).not.toContain("校准后分数");
    expect(serialized).not.toContain("晋升概率");
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
4 tests pass
```

### Task 3: Build System Shell, Batch Overview, And Case File Queue

**Files:**

- Modify: `src/App.tsx`
- Create: `src/components/AppShell.tsx`
- Create: `src/components/SystemHeader.tsx`
- Create: `src/components/BatchOverview.tsx`
- Create: `src/components/CaseFileQueue.tsx`
- Create: `src/components/StatusBadge.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Wire app state**

`src/App.tsx`:

```tsx
import { useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { promotionBatch } from "./data/promotionBatch";
import type { CaseId, EvidenceStatus } from "./types/calibration";

export default function App() {
  const [selectedCaseId, setSelectedCaseId] = useState<CaseId>("B");
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceStatus | "全部">("全部");
  const selectedCase = useMemo(
    () => promotionBatch.cases.find((item) => item.id === selectedCaseId) ?? promotionBatch.cases[1],
    [selectedCaseId],
  );

  return (
    <AppShell
      batch={promotionBatch}
      selectedCase={selectedCase}
      evidenceFilter={evidenceFilter}
      onEvidenceFilterChange={setEvidenceFilter}
      onSelectCase={setSelectedCaseId}
    />
  );
}
```

- [ ] **Step 2: Build `SystemHeader`**

Render:

- `晋升评估中心`
- `AI 校准`
- cycle
- review batch
- `演示数据`

Do not render account, permissions, org tree, settings, or global HR nav.

- [ ] **Step 3: Build `BatchOverview`**

Render compact control-strip content:

- Current batch.
- `3 个 AI case file`.
- `AI 校准分析已完成`.
- Risk distribution chips.
- `6 项待人工确认`.
- Material package status.
- Batch boundary copy.

Avoid KPI dashboard visuals.

- [ ] **Step 4: Build `CaseFileQueue`**

Each case row/card must show:

- `Case A/B/C`.
- Candidate label.
- Role context.
- Original AI recommendation.
- Calibration status.
- Evidence coverage for explicit performance, internal materials, employee supplement.
- Unconfirmed count.
- Next review action.

Clicking a case changes selected case. Candidate B is selected by default.

- [ ] **Step 5: Manual check**

Run:

```bash
npm run dev
```

Expected:

- First screen clearly feels like `晋升评估中心 > AI 校准`.
- Batch overview appears before candidate detail.
- Case file queue replaces simple candidate cards.
- No ranking, score, pass, reject, approval, or appeal action appears.

### Task 4: Build Candidate B AI Calibration Workspace

**Files:**

- Create: `src/components/CandidateWorkspace.tsx`
- Create: `src/components/CaseHeader.tsx`
- Create: `src/components/CalibrationPath.tsx`
- Create: `src/components/OriginalAssessment.tsx`
- Create: `src/components/MaterialCoverageGap.tsx`
- Create: `src/components/CalibrationComparison.tsx`
- Create: `src/components/EvidenceWorkpaper.tsx`
- Create: `src/components/EvidenceRow.tsx`
- Create: `src/components/ReviewPrompt.tsx`
- Create: `src/components/BoundaryNotice.tsx`
- Modify: `src/components/AppShell.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Build `CandidateWorkspace`**

For any selected case, render:

1. `CaseHeader`
2. `CalibrationPath`
3. `OriginalAssessment`
4. `MaterialCoverageGap`
5. `CalibrationComparison`
6. `EvidenceWorkpaper`
7. `ReviewPrompt`
8. `BoundaryNotice`

Candidate B will later get employee loop. A/C stay summary but use the same frame.

- [ ] **Step 2: Build `CaseHeader`**

Render:

- Candidate label.
- Role context.
- Original AI recommendation.
- Calibration status.
- Review priority.
- Material package status.
- Fixed risk boundary sentence: `该提示用于帮助评审补充复核，不改变原 AI 建议，也不代表最终晋升结论。`

- [ ] **Step 3: Build `CalibrationPath`**

Render static path nodes:

```text
原 AI 评估 -> 材料覆盖盲区 -> 隐性贡献证据 -> 复核提示 -> AI 评审材料包 -> 员工解释 -> 员工补充 -> 待确认线索 -> 人工复核边界
```

It is material-structure navigation, not an approval progress bar.

- [ ] **Step 4: Build `MaterialCoverageGap`**

Render a coverage ledger with columns:

- Material type.
- Source.
- Coverage status.
- Discussion use.

It must include the explanatory copy:

```text
校准助手不是重算结论，而是补齐原评估材料视野，帮助评审看到显性绩效以外的证据结构。
```

- [ ] **Step 5: Build `EvidenceWorkpaper`**

Render evidence rows with:

- Contribution dimension.
- Reviewable fact.
- Source.
- Source excerpt.
- Status.
- Missing evidence.
- Next action.
- Package destinations.

Add filter buttons:

```text
全部 / 已验证 / 待确认 / 证据不足
```

Filtering must not hide the human boundary notice.

- [ ] **Step 6: Build `ReviewPrompt`**

For Candidate B, render:

- Title: `复核提示：显性指标可能未覆盖部分组织贡献`.
- Body.
- Trigger reasons.
- Cannot-confirm items.
- Suggested confirmation owners.
- Boundary copy.

For Candidate C, same component should support supplemental-review prompt. For Candidate A, it should support stable/no-new-risk prompt.

- [ ] **Step 7: Manual vertical-slice check**

Run:

```bash
npm run dev
```

Expected:

- Candidate B is selected by default.
- Original AI assessment says `暂缓晋升`.
- Material coverage gap appears between original assessment and comparison/evidence.
- Evidence workpaper rows include missing evidence and package destinations.
- Underestimation prompt is framed as review support, not score correction.

### Task 5: Build AI Material Package And Governance Side Rail

**Files:**

- Create: `src/components/MaterialPackageRail.tsx`
- Create: `src/components/MaterialPackageTabs.tsx`
- Create: `src/components/GovernanceRecord.tsx`
- Modify: `src/components/AppShell.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Build side rail top-level switch**

`MaterialPackageRail` keeps local state:

```ts
const [railView, setRailView] = useState<"package" | "governance">("package");
```

Render two controls:

- `AI 评审材料包`
- `治理记录`

- [ ] **Step 2: Build package tabs**

`MaterialPackageTabs` keeps local state:

```ts
const [packageView, setPackageView] = useState<"reviewer" | "employee" | "humanReview">("reviewer");
```

Tabs:

- `评审委员版`
- `员工解释版`
- `人工复核版`

Reviewer version shows:

- Supplemental assessment summary.
- Verified evidence.
- Unconfirmed clues.
- Suggested review questions.
- Review reminder.

Employee version shows:

- What materials were recognized.
- What still needs confirmation.
- How employee supplement is handled.
- Human-review boundary.

Human review version shows:

- AI cannot-confirm items.
- Missing evidence.
- Suggested owners.
- Employee self-report status.

- [ ] **Step 3: Build governance record**

`GovernanceRecord` shows:

- AI output time.
- Input material range.
- Verified materials.
- Unconfirmed materials.
- Employee self-report handling.
- Human review boundary.

Avoid copy such as `审计通过`, `合规确认`, `系统已确认`.

- [ ] **Step 4: Manual side-rail check**

Run:

```bash
npm run dev
```

Expected:

- Right side rail defaults to `AI 评审材料包`.
- Default package tab is `评审委员版`.
- Switching to `员工解释版` changes tone and content.
- Switching to `人工复核版` emphasizes cannot-confirm and missing evidence.
- Switching to `治理记录` shows trace/boundary information without becoming real audit UI.

### Task 6: Add Candidate B Employee Explanation And Supplement Loop

**Files:**

- Create: `src/components/EmployeeExplanation.tsx`
- Create: `src/components/EmployeeSupplement.tsx`
- Create: `src/__tests__/employeeSupplement.test.tsx`
- Modify: `src/components/CandidateWorkspace.tsx`
- Modify: `src/styles/app.css`

- [ ] **Step 1: Render Candidate B employee explanation**

Only Candidate B needs the full employee loop. The explanation must be neutral:

- Say which materials were identified.
- Say which items still need confirmation.
- Say final decision remains with human reviewers.
- Do not say `你被低估了`, `系统认可你的贡献`, or `结果会改变`.

- [ ] **Step 2: Build supplement interaction**

`EmployeeSupplement` state:

```ts
const [text, setText] = useState(caseFile.employeeSupplement?.originalText ?? "");
const [hasGenerated, setHasGenerated] = useState(false);
```

Button:

```text
生成待确认线索
```

On click:

- Keep textarea text visible.
- Show static structured output from mock data.
- Show success status: `已整理为待确认线索`.
- Show `治理状态：员工自述，未验证，不直接进入评审事实。`

- [ ] **Step 3: Add interaction test**

`src/__tests__/employeeSupplement.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmployeeSupplement } from "../components/EmployeeSupplement";
import { promotionBatch } from "../data/promotionBatch";

describe("EmployeeSupplement", () => {
  it("turns employee text into an unconfirmed structured clue", async () => {
    const candidateB = promotionBatch.cases.find((item) => item.id === "B")!;

    render(<EmployeeSupplement caseFile={candidateB} />);

    await userEvent.click(screen.getByRole("button", { name: "生成待确认线索" }));

    expect(screen.getByText("已整理为待确认线索")).toBeInTheDocument();
    expect(screen.getByText(/当前状态/)).toBeInTheDocument();
    expect(screen.getByText(/待确认/)).toBeInTheDocument();
    expect(screen.getByText(/未验证/)).toBeInTheDocument();
    expect(screen.queryByText(/已采纳/)).not.toBeInTheDocument();
    expect(screen.queryByText(/提交申诉/)).not.toBeInTheDocument();
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
all tests pass
```

### Task 7: Add Candidate A And C Summary Case Files

**Files:**

- Modify: `src/data/promotionBatch.ts`
- Modify: `src/components/CandidateWorkspace.tsx`
- Modify: `src/components/MaterialPackageTabs.tsx`
- Modify: `src/components/GovernanceRecord.tsx`

- [ ] **Step 1: Candidate A summary requirements**

Candidate A data and UI must show:

- Original AI recommendation: `推荐晋升`.
- Calibration status: `维持推荐`.
- Evidence coverage: explicit performance sufficient, hidden contribution not obviously missing.
- Unconfirmed count: 0 or 1.
- Next action: `维持原讨论重点`.
- Material package: summary material only.
- No employee supplement loop.

Summary copy:

```text
校准助手未提示新增复核风险。当前材料结构支持围绕业务结果和稳定交付继续讨论。
```

- [ ] **Step 2: Candidate C summary requirements**

Candidate C data and UI must show:

- Original AI recommendation: `推荐晋升`.
- Calibration status: `补充评审`.
- Evidence coverage: explicit performance strong, collaboration/knowledge/mentoring material has unconfirmed points.
- Unconfirmed count: 2 or 3.
- Next action: confirm collaboration feedback, knowledge reuse, and mentoring stability.
- No employee supplement loop.

Review questions:

- Ask collaboration team whether project work caused repeated rework or communication cost.
- Ask team lead whether knowledge sedimentation can be reused by the team.
- Ask mentees whether support feedback is stable.

Summary copy:

```text
补充评审用于完善材料结构，不是否定原推荐，也不是负面裁定。
```

- [ ] **Step 3: Verify A/C switch behavior**

Run:

```bash
npm run dev
```

Expected:

- A and C remain in the same case file system.
- A communicates maintained recommendation without becoming celebration UI.
- C communicates supplemental review without becoming a negative decision.
- A/C do not show the full employee supplement loop.

### Task 8: Visual Polish And Responsive Quality

**Files:**

- Modify: `src/styles/app.css`
- Modify component class names only when needed.

- [ ] **Step 1: Apply visual direction**

The UI should read as:

- Restrained enterprise product.
- Review material console.
- Evidence and governance workflow.

CSS requirements:

- Light workbench background.
- Gray-blue neutral palette with precise status accents.
- 8px or smaller border radius.
- Compact rows and workpaper density.
- Clear chips for statuses and package destinations.
- No hero section.
- No decorative gradients, glassmorphism, glow, or AI magic visual language.
- No large KPI dashboard.
- No nested cards.

- [ ] **Step 2: Layout requirements**

Desktop:

- Top system shell.
- Batch overview band.
- Main grid: case file queue, candidate workspace, side rail.

Narrow screens:

- Header and batch overview stay first.
- Case file queue becomes horizontal/stacked above workspace.
- Side rail stacks below workspace.
- Text wraps cleanly.

- [ ] **Step 3: Viewport checks**

Check:

```text
1440px desktop
1280px laptop
1024px tablet
390px mobile sanity check
```

Expected:

- No incoherent overlaps.
- Button and tab labels do not overflow.
- Evidence workpaper remains readable.
- Side rail remains usable when stacked.

### Task 9: Verification And Acceptance

**Files:**

- Modify only files that fail verification.

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

- [ ] **Step 3: Manual product acceptance**

Open the local dev URL and verify:

- User sees `晋升评估中心 > AI 校准`, not an isolated single page.
- User sees batch overview before case detail.
- Case file queue shows A/B/C, original AI suggestion, calibration status, evidence coverage, unconfirmed count, next action.
- Candidate B is selected by default.
- Candidate B workspace includes original AI assessment, material coverage gap, original-vs-calibration comparison, evidence workpaper, underestimation prompt, employee explanation, employee supplement, structured待确认线索, and human review boundary.
- Evidence workpaper rows show source, excerpt, status, missing evidence, next action, and package destination.
- Right rail shows AI material package with reviewer, employee, and human-review versions.
- Governance record shows AI output time, input materials, verified materials, unconfirmed materials, employee self-report handling, and human boundary.
- Employee supplement remains `待确认` and does not become verified evidence.
- Candidate A is a maintained-recommendation summary case.
- Candidate C is a supplemental-review summary case.
- No UI exposes login, approval, appeal, ranking, real database, model training, or full HR platform actions.
- No UI copy uses prohibited phrases: `AI 修正结果`, `AI 改分`, `公平裁判`, `消除偏见`, `自动晋升`, `申诉成功`, `提交审批`, `通过`, `驳回`, `系统判定应晋升`, `校准后分数`, `晋升概率`.

## 7. Candidate B Vertical Slice Acceptance

Candidate B is accepted when the reviewer can complete this path:

1. Open app and understand the batch context: `2026 H1 技术序列`, `P6 到 P7 晋升复核批次`.
2. See the case file queue and understand B is `低估风险`.
3. Open B by default and see original recommendation `暂缓晋升`.
4. Understand original AI mainly used KPI, delivery cycle, performance rating, and project-owner feedback.
5. See material coverage gap: what was already covered, what calibration supplements, and what employee supplement remains待确认.
6. Compare original AI basis with AI calibration review focus.
7. Review evidence workpaper with source, excerpt, trust status, missing evidence, next action, and package destination.
8. Understand underestimation risk as a review prompt, not a changed result.
9. Use AI material package tabs: reviewer version, employee version, human-review version.
10. View governance record and understand employee self-report is not verified fact.
11. Generate employee supplement structured clue.
12. See generated supplement remains `待确认`.
13. See final decision remains with human review committee.

## 8. Build, Run, And Manual Verification Commands

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Test:

```bash
npm test
```

Preview:

```bash
npm run preview
```

Manual browser verification:

```bash
npm run dev
```

Open the printed Vite URL and run the checklist in Task 9.

## 9. One-Day Execution Order

Recommended order:

1. Scaffold app.
2. Add schema and mock data.
3. Build system shell, batch overview, and case queue.
4. Build Candidate B workspace.
5. Build material package and governance rail.
6. Build employee supplement loop.
7. Add A/C summary cases.
8. Polish visual density and responsiveness.
9. Run build, tests, and manual acceptance.

Cut if time is tight:

- Click-to-scroll behavior in `CalibrationPath`.
- Optional Playwright automation.
- Lightweight follow-up marker toggles.
- Source expansion drawers.

Do not cut:

- Batch overview.
- Case file queue.
- Candidate B complete closed loop.
- Material coverage gap.
- Evidence workpaper with missing evidence and package destination.
- AI material package three versions.
- Governance record.
- Employee supplement to待确认线索.
- Human-review boundary copy.

## 10. Final Self-Review Checklist

Before marking implementation complete:

- The app is runnable locally.
- It uses mock data and mock AI output only.
- It feels like an AI module inside a promotion assessment center.
- It does not expand into a full HR platform.
- Candidate B is default and complete.
- Candidate A/C remain summary case files.
- Employee self-report is never verified by AI.
- AI never changes score, confirms promotion, or replaces committee judgment.
- All visible copy follows updated PRD/UI guardrails.
