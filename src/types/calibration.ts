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
