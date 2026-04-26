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
