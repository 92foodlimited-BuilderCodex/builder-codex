# Changelog

## [3.1.0] - 2026-06-22 — Behavioral Guardrails Edition

### Added (adopted from `somnus0x/agt-skill-pack/claude-md-setup`)
- **The 4 AI Misbehaviors Framework** (เดา / โกหก / ทำเกิน / ลืม) in Executive Summary
- **P-31: R0/R1/R2 Reversibility Classification** pattern
- **MEMORY.md** template — AI's operational failure log (3-field schema: what / root cause / correct behavior)
- **spec.md** template — project-level save point (Architecture / Done / Todo / Current state)
- **Data Contracts block** in AGENTS.md template
- **@imports syntax** in AGENTS.md (`@MEMORY.md`, `@CAPTURE_LOG.md`)
- **File Job Clarification** section — MEMORY vs CAPTURE_LOG vs spec.md vs SPEC.md

### Changed
- AGENTS.md restructured with explicit Behavioral Guardrails section before Hard Rules
- Before/After code workflow updated to read spec.md + update spec.md
- Pattern Library expanded from 30 → 31 patterns
- §10 Acknowledgements expanded with somnus0x credit

### Architecture
- Builder Codex is now a synthesis of:
  - Incident-derived technical patterns (P-01..P-31) — Tony's lessons
  - Behavioral guardrails — somnus0x/agt-skill-pack
  - 2026 industry standards — Linux Foundation, Anthropic, GitHub

## [3.0.1] - 2026-06-20

### Added
- CAPTURE_LOG.md template with 3 real examples
- DR_PLAN.md template with 7 disaster scenarios

## [3.0.0] - 2026-06-20 — Solo-Survival Edition

### Added
- Three-Tier file architecture (AGENTS.md + SKILL.md + Codex master)
- 8 new patterns: P-23 (Hallucination Guardrails), P-24 (Backup Discipline), P-25 (Cost/Token Budget), P-26 (Context Management), P-27 (Mobile Store), P-28 (PDPA), P-29 (Spec-Driven Artifacts), P-30 (AI Second Reviewer)
- 5 portable SKILL.md modules

### Changed
- BUILDER_CODEX.md split: condensed P-01..P-22, expanded P-23..P-30
- §10 Acknowledgements expanded with 2026 standards landscape

## [2.0.0] - 2026-06-19 — Global Edition

### Changed
- Removed project-specific references (PuffStick, Pippa, etc.)
- 4-step Compounding Loop (Plan → Work → Review → Compound)

### Added
- §10 Acknowledgements (first version)

## [1.0.0] - 2026-06-18

### Added
- Initial Builder Codex with Compounding Loop section
- CAPTURE_LOG.md standard

---

> **Versioning:** semver-ish — major versions = architecture change, minor = pattern additions, patch = template/example refinements
