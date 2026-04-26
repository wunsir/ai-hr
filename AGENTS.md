# AGENTS.md

## Project Goal

This repository is for a one-day, high-fidelity AI product demo: 晋升评估 AI 校准工作台.

The demo should show how an AI calibration layer can help reviewers notice contribution evidence that may be underrepresented in an existing AI promotion assessment. It is not a real enterprise HR system and must not be treated as one.

## Source Of Truth

- Product source of truth: `plans/promotion-calibration-assistant/product-spec.md`
- UI source of truth: `plans/promotion-calibration-assistant/ui-shape.md`

If future work conflicts with either file, follow the relevant source of truth instead of inventing new product behavior or UI direction.

## Demo Scope

- Candidate A and Candidate C are summary cases.
- Candidate B is the deep closed-loop case.
- The intended demo may use mock data and mock AI output.
- AI should be presented as finding blind spots, organizing evidence, and helping explain review material.
- Final promotion decisions remain with human reviewers.

## Development Boundaries

Do not add:

- Real database integration.
- Login, roles, permissions, or organization management.
- Approval flows.
- Appeal or dispute systems.
- Employee ranking.
- Model training.
- Handling of real employee private data.
- Full enterprise HR workflows.
- Roadmap, architecture, decision, or progress documents unless explicitly requested.

## Product Guardrails

- Do not present AI as the final promotion decision-maker.
- Do not imply AI changes scores, corrects results, or guarantees fairness.
- Do not treat employee self-reports as verified facts.
- Do not use real employee personal or sensitive data.
- Do not expand the demo into a general HR dashboard.
- Do not document unimplemented behavior as existing product reality.
