import type { PromotionBatch } from "../types/calibration";

const boundarySentence =
  "AI 负责发现材料盲区、组织证据和辅助解释；最终晋升决定由人工评审委员会根据完整材料作出。";

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
    boundaryCopy:
      "本批次仅展示 AI 校准材料结构，不代表最终晋升结论。所有待确认线索需由人工评审继续复核。",
  },
  cases: [
    {
      id: "A",
      candidateLabel: "候选人 A",
      roleContext: "商业增长平台 · 高级产品运营",
      originalRecommendation: "推荐晋升",
      calibrationStatus: "维持推荐",
      reviewPriority: "低",
      materialPackageStatus: "摘要材料",
      queueSummary: {
        evidenceCoverage: {
          explicitPerformance: "已覆盖",
          internalMaterials: "已覆盖",
          employeeSupplement: "待确认",
        },
        unconfirmedCount: 1,
        nextAction: "维持原讨论重点",
        shortCopy:
          "校准助手未提示新增复核风险。当前材料结构支持围绕业务结果和稳定交付继续讨论。",
      },
      originalAssessment: {
        explicitPerformance: [
          "核心 KPI 连续两个季度超过目标线。",
          "关键增长项目按期交付，复盘材料完整。",
          "绩效评级稳定在 A- 区间。",
        ],
        basis: ["KPI 达成", "关键项目交付", "绩效评级", "业务负责人反馈"],
        limitationCopy:
          "原评估主要基于显性业绩材料；当前校准未发现会改变讨论重点的隐性贡献遗漏。",
      },
      materialCoverage: [
        {
          id: "a-cov-1",
          materialType: "显性绩效",
          source: "KPI、项目复盘、绩效评级",
          coverageStatus: "已覆盖",
          discussionUse: "可用于围绕业务结果继续讨论",
        },
        {
          id: "a-cov-2",
          materialType: "内部材料",
          source: "项目复盘、知识库记录",
          coverageStatus: "已覆盖",
          discussionUse: "仅补充材料完整性，不改变讨论重点",
        },
        {
          id: "a-cov-3",
          materialType: "员工补充",
          source: "未提交新的补充说明",
          coverageStatus: "待确认",
          discussionUse: "当前不进入讨论事实",
        },
      ],
      comparison: {
        originalBasis: ["显性业绩强。", "关键项目产出明确。", "原建议为推荐晋升。"],
        calibrationReviewFocus: [
          "现有材料结构较完整。",
          "隐性贡献材料不多，但未与原建议形成明显冲突。",
          "评审可维持原讨论重点。",
        ],
      },
      evidence: [
        {
          id: "a-1",
          dimension: "用户价值",
          reviewableFact: "转化优化项目复盘记录了完整实验过程和业务影响。",
          source: "项目复盘，2025 Q4",
          sourceExcerpt: "实验分组、灰度范围和转化口径均有记录。",
          status: "已验证",
          missingEvidence: "无关键缺口",
          nextAction: "可纳入评审讨论",
          packageDestinations: ["评审委员版"],
        },
        {
          id: "a-2",
          dimension: "知识沉淀",
          reviewableFact: "运营实验模板被本组复用，跨团队引用范围仍较有限。",
          source: "知识库记录",
          sourceExcerpt: "模板在本组项目复盘中出现 2 次引用。",
          status: "待确认",
          missingEvidence: "跨团队引用范围",
          nextAction: "如需讨论组织影响，可补充引用来源",
          packageDestinations: ["人工复核版"],
        },
      ],
      reviewPrompt: {
        title: "复核提示：当前证据结构支持维持原讨论重点",
        body: "校准助手未提示需要改变讨论重点。评审仍可查看材料来源，但当前证据结构支持维持原建议。",
        triggers: ["显性业绩材料充分", "未发现集中出现的遗漏贡献线索"],
        cannotConfirm: ["运营模板跨团队复用范围仍可补充"],
        suggestedConfirmations: ["如委员会讨论组织影响，可向业务负责人补充确认"],
        boundary: boundarySentence,
      },
      materialPackage: {
        reviewerVersion: {
          summary: "候选人 A 显性绩效材料充分，校准助手未提示明显材料盲区。",
          verifiedEvidence: ["核心 KPI 连续两个季度超过目标线", "关键项目按期交付且复盘材料完整"],
          unconfirmedClues: ["运营实验模板的跨团队复用范围"],
          questions: [
            {
              id: "a-q1",
              askWhom: "业务负责人",
              question: "确认关键增长项目的可持续影响是否已进入后续运营节奏。",
              reason: "用于判断显性业绩是否具备持续性。",
            },
          ],
          reminder: "校准助手只整理材料结构，不替代委员会判断。",
        },
        employeeVersion: {
          explanation:
            "本次校准助手主要识别到你在业务结果和项目复盘方面的已验证材料。部分知识沉淀影响范围仍可补充，最终结论由人工评审决定。",
          recognizedMaterials: ["KPI 达成记录", "项目复盘", "绩效评级"],
          stillNeedsConfirmation: ["实验模板的跨团队引用范围"],
          supplementHandling: "当前无新的员工补充说明。",
          boundary: boundarySentence,
        },
        humanReviewVersion: {
          cannotConfirm: ["实验模板是否形成跨团队稳定复用"],
          missingEvidence: ["更多团队引用记录"],
          suggestedOwners: ["业务负责人", "知识库维护人"],
          employeeSelfReportStatus: "当前无新的员工自述，若后续补充则默认待确认。",
        },
      },
      governanceRecord: {
        aiOutputTime: "2026-04-26 10:40",
        inputMaterials: ["KPI 摘要", "绩效评级", "项目复盘", "知识库记录"],
        verifiedMaterials: ["KPI 摘要", "项目复盘", "绩效评级"],
        unconfirmedMaterials: ["跨团队知识库引用范围"],
        employeeSelfReportHandling: "当前无员工自述进入已验证证据。",
        humanReviewBoundary: boundarySentence,
      },
      employeeExplanation:
        "本次校准助手主要识别到你在业务结果和项目复盘方面的已验证材料。部分知识沉淀影响范围仍可补充，评审委员会会结合原评估结果和完整材料讨论，最终结论由人工评审决定。",
    },
    {
      id: "B",
      candidateLabel: "候选人 B",
      roleContext: "商家平台 · 资深后端工程师",
      originalRecommendation: "暂缓晋升",
      calibrationStatus: "低估风险",
      reviewPriority: "中",
      materialPackageStatus: "已生成",
      queueSummary: {
        evidenceCoverage: {
          explicitPerformance: "已覆盖",
          internalMaterials: "校准补充",
          employeeSupplement: "待确认",
        },
        unconfirmedCount: 3,
        nextAction: "审阅 AI 材料包，向主管和协作方确认",
        shortCopy:
          "多条内部材料指向人才培养、知识沉淀和跨团队协作贡献。建议补充复核，不改变原 AI 建议。",
      },
      originalAssessment: {
        explicitPerformance: [
          "项目交付稳定，未出现重大延期。",
          "核心 KPI 达成 92%。",
          "最近一次绩效评级为 B+。",
          "缺少直接业务增长突破。",
        ],
        basis: ["KPI", "交付周期", "绩效评级", "项目负责人反馈"],
        limitationCopy:
          "原评估不是错误，而是材料覆盖范围有限；它更依赖 KPI、交付和绩效评级等显性数据。",
      },
      materialCoverage: [
        {
          id: "b-cov-1",
          materialType: "KPI",
          source: "绩效系统摘要",
          coverageStatus: "已覆盖",
          discussionUse: "可作为显性绩效背景",
        },
        {
          id: "b-cov-2",
          materialType: "交付周期",
          source: "项目排期记录",
          coverageStatus: "已覆盖",
          discussionUse: "可作为稳定交付背景",
        },
        {
          id: "b-cov-3",
          materialType: "绩效评级",
          source: "2025 Q4 绩效记录",
          coverageStatus: "已覆盖",
          discussionUse: "可作为原 AI 依据",
        },
        {
          id: "b-cov-4",
          materialType: "mentor 记录",
          source: "mentor 记录、主管季度反馈",
          coverageStatus: "校准补充",
          discussionUse: "可进入评审委员版讨论",
        },
        {
          id: "b-cov-5",
          materialType: "知识分享",
          source: "知识库记录、项目复盘",
          coverageStatus: "校准补充",
          discussionUse: "可进入评审委员版讨论",
        },
        {
          id: "b-cov-6",
          materialType: "跨团队支持",
          source: "跨团队协作评价",
          coverageStatus: "待确认",
          discussionUse: "进入人工复核版追问",
        },
        {
          id: "b-cov-7",
          materialType: "长期用户价值",
          source: "员工补充说明",
          coverageStatus: "待确认",
          discussionUse: "仅作为待确认线索",
        },
      ],
      comparison: {
        originalBasis: ["显性绩效中等。", "缺少直接增长指标突破。", "晋升建议为暂缓。"],
        calibrationReviewFocus: [
          "已验证材料指向人才培养贡献。",
          "知识库和复盘记录显示知识沉淀影响多个团队。",
          "跨团队协作反馈显示其解决平台接入阻塞。",
          "员工补充形成一条待确认长期用户价值线索。",
        ],
      },
      evidence: [
        {
          id: "b-1",
          dimension: "人才培养",
          reviewableFact:
            "连续两个季度担任 2 名 P6 工程师 mentor，其中 1 人已独立负责灰度方案设计。",
          source: "mentor 记录、主管反馈",
          sourceExcerpt: "新人已能独立完成灰度方案设计和上线检查清单。",
          status: "已验证",
          missingEvidence: "无关键缺口",
          nextAction: "可纳入评审讨论",
          packageDestinations: ["评审委员版"],
        },
        {
          id: "b-2",
          dimension: "知识沉淀",
          reviewableFact: "商家侧异常归因手册被 4 个团队在项目复盘中引用。",
          source: "知识库、项目复盘",
          sourceExcerpt: "风控、商家平台、客户端和体验团队在复盘中引用该手册。",
          status: "已验证",
          missingEvidence: "持续引用频率可补充",
          nextAction: "可纳入评审讨论",
          packageDestinations: ["评审委员版"],
        },
        {
          id: "b-3",
          dimension: "协作影响",
          reviewableFact: "支付链路改造中协调多团队，可能缩短接入排期约 2 周。",
          source: "跨团队协作评价",
          sourceExcerpt: "协作方反馈其推动接口口径对齐，减少等待时间。",
          status: "待确认",
          missingEvidence: "影响范围和排期口径",
          nextAction: "向项目负责人确认",
          packageDestinations: ["人工复核版"],
        },
        {
          id: "b-4",
          dimension: "用户价值",
          reviewableFact: "员工补充称其推动客服工单归因模板，可能降低重复定位成本。",
          source: "员工补充说明",
          sourceExcerpt: "体验团队和客服团队反馈尚未进入正式复盘材料。",
          status: "待确认",
          missingEvidence: "使用范围、效率幅度、正式材料来源",
          nextAction: "需主管或客服团队确认",
          packageDestinations: ["员工解释版", "人工复核版"],
        },
        {
          id: "b-5",
          dimension: "长期组织贡献",
          reviewableFact: "多次项目复盘提到其将故障定位步骤整理为可复用检查清单。",
          source: "项目复盘、知识库记录",
          sourceExcerpt: "检查清单在两个后续项目中被引用。",
          status: "已验证",
          missingEvidence: "持续复用频率可补充",
          nextAction: "可纳入评审讨论",
          packageDestinations: ["评审委员版"],
        },
      ],
      reviewPrompt: {
        title: "复核提示：显性指标可能未覆盖部分组织贡献",
        body:
          "校准助手发现多条内部材料指向人才培养、知识沉淀和跨团队协作贡献。由于原评估主要依据 KPI、交付和绩效评级，候选人 B 可能存在被显性指标低估的风险。该提示仅用于评审补充复核，不改变原 AI 建议，也不代表晋升结论。",
        triggers: ["人才培养证据集中出现", "知识沉淀被多个团队引用", "跨团队协作线索指向平台接入阻塞解决"],
        cannotConfirm: ["支付链路排期是否确实缩短约 2 周", "客服工单模板是否降低重复定位成本"],
        suggestedConfirmations: ["直属主管", "支付链路项目负责人", "知识库负责人", "客服团队"],
        boundary: boundarySentence,
      },
      materialPackage: {
        reviewerVersion: {
          summary:
            "候选人 B 的显性绩效中等，但多条内部材料显示其在人才培养、知识沉淀和跨团队协作中有可讨论贡献。",
          verifiedEvidence: [
            "mentor 支持形成独立交付能力",
            "异常归因手册被 4 个团队引用",
            "故障定位清单在后续项目中复用",
          ],
          unconfirmedClues: ["支付链路排期影响", "客服工单模板使用范围"],
          questions: [
            {
              id: "b-q1",
              askWhom: "直属主管",
              question: "确认 mentor 贡献是否超出常规岗位职责，是否对团队交付质量产生可观察影响。",
              reason: "关系到人才培养证据是否可作为晋升讨论材料。",
            },
            {
              id: "b-q2",
              askWhom: "支付链路项目负责人",
              question: "确认跨团队协调是否直接缩短排期，影响范围覆盖哪些团队。",
              reason: "关系到协作影响是否具备可验证范围。",
            },
            {
              id: "b-q3",
              askWhom: "知识库负责人",
              question: "确认异常归因手册是否被持续引用，是否减少重复问题定位。",
              reason: "关系到知识沉淀是否形成长期组织贡献。",
            },
          ],
          reminder: "建议补充复核，不替代委员会判断。",
        },
        employeeVersion: {
          explanation:
            "本次校准助手识别到你在 mentor 支持、知识沉淀和跨团队协作方面的若干材料。",
          recognizedMaterials: ["mentor 记录", "知识库引用", "项目复盘"],
          stillNeedsConfirmation: ["支付链路协作影响", "用户价值补充线索"],
          supplementHandling: "员工补充如何被处理：整理为待确认线索，需结合主管、协作方或项目材料进一步确认。",
          boundary:
            "评审委员会会结合已验证材料、待确认线索和原评估结果进行综合讨论，最终结论由人工评审决定。",
        },
        humanReviewVersion: {
          cannotConfirm: ["支付链路排期是否确实缩短约 2 周", "客服工单模板是否降低重复定位成本"],
          missingEvidence: ["协作方反馈", "客服团队使用记录", "项目复盘记录", "主管反馈"],
          suggestedOwners: ["直属主管", "支付链路项目负责人", "客服团队", "知识库负责人"],
          employeeSelfReportStatus: "员工自述已结构化为待确认线索，未进入已验证证据。",
        },
      },
      governanceRecord: {
        aiOutputTime: "2026-04-26 10:40",
        inputMaterials: ["KPI 摘要", "绩效评级", "项目复盘", "知识库记录", "mentor 记录", "跨团队协作评价", "员工补充"],
        verifiedMaterials: ["mentor 记录", "知识库记录", "项目复盘"],
        unconfirmedMaterials: ["跨团队协作评价", "员工补充说明"],
        employeeSelfReportHandling: "员工自述已结构化为待确认线索，未进入已验证证据。",
        humanReviewBoundary: boundarySentence,
      },
      employeeExplanation:
        "本次校准助手识别到你在 mentor 支持、知识沉淀和跨团队协作方面的若干材料。其中，mentor 记录和知识库引用已来自内部材料；支付链路协作影响和你补充的用户价值线索仍需进一步确认。评审委员会会结合已验证材料、待确认线索和原评估结果进行综合讨论，最终结论由人工评审决定。",
      employeeSupplement: {
        originalText:
          "我还参与了客服工单归因模板的整理，和体验团队一起把高频问题拆成了 6 类。后来客服同学说定位重复问题快了很多，但这个没有写进项目复盘。",
        structured: {
          dimensions: ["用户价值", "知识沉淀"],
          clue: "参与整理客服工单归因模板，可能帮助客服更快定位重复问题。",
          possibleImpact: "减少重复问题定位成本，但影响幅度和使用范围尚无内部材料确认。",
          currentStatus: "待确认",
          cannotConfirm: ["实际效率提升幅度", "使用范围", "是否进入正式流程"],
          suggestedSources: ["体验团队反馈", "项目复盘记录", "客服团队使用记录"],
          governanceStatus: "员工自述，未验证，不直接进入评审事实。",
        },
        missingEvidenceHint:
          "需要体验团队反馈、项目复盘记录或客服团队使用记录后，才能进入已验证材料讨论。",
      },
    },
    {
      id: "C",
      candidateLabel: "候选人 C",
      roleContext: "交易基础设施 · 技术负责人",
      originalRecommendation: "推荐晋升",
      calibrationStatus: "补充评审",
      reviewPriority: "中",
      materialPackageStatus: "摘要材料",
      queueSummary: {
        evidenceCoverage: {
          explicitPerformance: "已覆盖",
          internalMaterials: "待确认",
          employeeSupplement: "待确认",
        },
        unconfirmedCount: 2,
        nextAction: "确认协作反馈、知识复用和带教稳定性",
        shortCopy: "校准助手提示补充确认组织影响材料。该提示不否定原推荐，也不是负面裁定。",
      },
      originalAssessment: {
        explicitPerformance: ["核心项目业务指标超额完成。", "关键链路稳定性明显改善。", "绩效评级为 A。"],
        basis: ["业务指标", "系统稳定性", "绩效评级", "项目负责人反馈"],
        limitationCopy:
          "原评估充分看到了显性产出，但部分协作和组织影响材料仍需人工补充确认。",
      },
      materialCoverage: [
        {
          id: "c-cov-1",
          materialType: "显性绩效",
          source: "业务指标、稳定性复盘、绩效评级",
          coverageStatus: "已覆盖",
          discussionUse: "可作为原 AI 推荐背景",
        },
        {
          id: "c-cov-2",
          materialType: "协作反馈",
          source: "跨团队协作评价",
          coverageStatus: "待确认",
          discussionUse: "需要补充确认影响范围",
        },
        {
          id: "c-cov-3",
          materialType: "知识沉淀",
          source: "知识库记录",
          coverageStatus: "待确认",
          discussionUse: "需要确认是否可被团队复用",
        },
      ],
      comparison: {
        originalBasis: ["显性业绩强。", "关键项目结果突出。", "原建议为推荐晋升。"],
        calibrationReviewFocus: [
          "协作团队反馈中存在返工和沟通成本线索。",
          "知识沉淀材料较依赖个人处理经验，复用范围待确认。",
          "带教反馈样本少，需要确认稳定性。",
        ],
      },
      evidence: [
        {
          id: "c-1",
          dimension: "协作影响",
          reviewableFact: "部分协作反馈提到项目推进中出现多次口径返工。",
          source: "跨团队协作评价",
          sourceExcerpt: "返工原因和影响范围在材料中没有完整说明。",
          status: "待确认",
          missingEvidence: "返工原因和影响范围",
          nextAction: "需协作团队确认是否影响交付质量",
          packageDestinations: ["人工复核版"],
        },
        {
          id: "c-2",
          dimension: "知识沉淀",
          reviewableFact: "候选人 C 处理复杂问题较多，但知识库中可复用文档较少。",
          source: "知识库记录",
          sourceExcerpt: "相关条目多为个人问题记录，缺少团队操作指南。",
          status: "证据不足",
          missingEvidence: "团队可复用材料",
          nextAction: "需补充团队指南或复盘记录",
          packageDestinations: ["人工复核版"],
        },
      ],
      reviewPrompt: {
        title: "复核提示：建议补充确认协作和组织影响材料",
        body: "补充评审用于完善材料结构，不是否定原推荐，也不是负面裁定。",
        triggers: ["协作反馈存在未确认分歧", "知识沉淀复用范围不足", "带教反馈样本周期短"],
        cannotConfirm: ["返工原因", "知识沉淀是否达到团队复用", "带教反馈是否稳定"],
        suggestedConfirmations: ["协作团队", "团队负责人", "mentor 对象"],
        boundary: boundarySentence,
      },
      materialPackage: {
        reviewerVersion: {
          summary: "候选人 C 显性绩效强，但协作影响和知识沉淀复用仍有未确认点。",
          verifiedEvidence: ["核心项目业务指标超额完成", "关键链路稳定性改善有复盘材料支持"],
          unconfirmedClues: ["协作过程是否带来反复返工", "知识沉淀是否能被团队复用"],
          questions: [
            {
              id: "c-q1",
              askWhom: "协作团队",
              question: "确认项目推进过程中是否存在反复返工或沟通成本上升。",
              reason: "关系到协作影响是否需要在评审中补充讨论。",
            },
            {
              id: "c-q2",
              askWhom: "团队负责人",
              question: "确认候选人的知识沉淀是否能被团队复用，而不只依赖个人处理。",
              reason: "关系到长期组织贡献是否有材料支持。",
            },
            {
              id: "c-q3",
              askWhom: "mentor 对象",
              question: "确认带教反馈是否稳定，是否存在支持不足。",
              reason: "关系到人才培养材料是否充分。",
            },
          ],
          reminder: "补充评审用于完善材料结构，不是负面裁定。",
        },
        employeeVersion: {
          explanation:
            "本次校准助手识别到你在显性项目结果上的材料较充分，同时部分协作反馈、知识沉淀复用和带教反馈仍需进一步确认。",
          recognizedMaterials: ["业务指标", "稳定性复盘", "绩效评级"],
          stillNeedsConfirmation: ["协作反馈", "知识沉淀复用", "带教稳定性"],
          supplementHandling: "当前无新的员工补充说明。",
          boundary: boundarySentence,
        },
        humanReviewVersion: {
          cannotConfirm: ["返工原因", "知识沉淀复用范围", "带教反馈稳定性"],
          missingEvidence: ["协作团队反馈", "团队负责人确认", "mentor 对象反馈"],
          suggestedOwners: ["协作团队", "团队负责人", "mentor 对象"],
          employeeSelfReportStatus: "当前无新的员工自述，若后续补充则默认待确认。",
        },
      },
      governanceRecord: {
        aiOutputTime: "2026-04-26 10:40",
        inputMaterials: ["业务指标", "稳定性复盘", "绩效评级", "跨团队协作评价", "知识库记录"],
        verifiedMaterials: ["业务指标", "稳定性复盘", "绩效评级"],
        unconfirmedMaterials: ["协作反馈", "知识沉淀复用范围", "带教反馈稳定性"],
        employeeSelfReportHandling: "当前无员工自述进入已验证证据。",
        humanReviewBoundary: boundarySentence,
      },
      employeeExplanation:
        "本次校准助手识别到你在显性项目结果上的材料较充分，同时部分协作反馈、知识沉淀复用和带教反馈仍需进一步确认。最终结论由人工评审决定。",
    },
  ],
};
