# Changelog

## [3.3.0] - 2026-09-24 — Grilling Edition

### Added (from `mattpocock/skills`, extended by `utarn/engineer-skills`)

- **Grilling method** formalized inside `/clarify` step of P-29 — design tree + frontier rounds, numbered question + recommended answer format, agent-finds-facts-itself rule, never act until frontier is empty
- **BUILDER_CODEX_INDEX.md** — token-efficient companion index (~150 lines), committed to repo for the first time

### Changed

- P-29 (Spec → Plan → Tasks Artifacts): `/clarify` sub-step now has a concrete mechanism instead of a one-line prose instruction
- Trimmed the 8-slash-command box and OpenSpec 3-phase description to net-offset the addition (Growth Discipline — every addition must reduce something else)
- §10 Acknowledgements: added credit for `mattpocock/skills` (original) and `utarn/engineer-skills` (fork that extends it)

### Fixed

- Provenance correction: an earlier internal note attributed the Grilling technique to `utarn/engineer-skills`; the primary source is `mattpocock/skills` — utarn is a fork that extends it (adds `grill-with-docs`, `grill-novice`, `handoff`, `domain-modeling`)

### Retired

- **P-37 candidate number** — the "Grilling Before Implementation" candidate (parked since the utarn discovery session) is folded into P-29 instead of becoming a standalone pattern; it is a definition of `/clarify`, not a separate discipline

### Real incident anchor

- Session 8 (2026-06-25): Nova answered off Tony's question 3 times in a row and proposed a counter-option ("Option A++") instead of answering what was asked — exactly the failure the frontier-round-with-recommended-answer format is designed to prevent

---

## [3.2.0] - 2026-09-23 — Structural Integrity Edition

> **Note:** this version was merged locally but never pushed to this repo before v3.3.0 — added here retroactively so the changelog stays accurate. See `META_CAPTURE_LOG.md` Session 7-9 for the incidents behind it.

### Added

- **P-32: Structure-Read Gate** — read a component's source body before any brief that moves/merges/deletes it; every brief carries a `Structure verified:` header with function/DOM + line numbers (from the Pippa "Safety tab" mischaracterization incident, 2026-07-20)
- **P-33: No-Regenerate / Encoding-Safe Edit Gate** — never regenerate a whole file; targeted `str_replace` only, with `assert count==1` before each replace (from the Pippa Antigravity mojibake scare, 2026-07-21)
- **P-34: Nova-Reference Byte-Diff Acceptance Gate** — acceptance = byte-diff against a pre-built reference, not the coding agent's self-reported metrics (proven 3/3 on real deliveries)
- **P-35: Coding-Agent Env-Note Header** — every brief states the target agent's environment quirks (PowerShell fallback, skip `node --check`, etc.) up front
- **P-36: Goal-Lock & Minimal Footprint** (ALWAYS ON) — restate the origin goal before any proposal; footprint declaration before any new infra/dep/hosting/auth/domain

### Changed

- Pattern Library expanded from 31 → 36 patterns
- §10 Acknowledgements: numbering note added — P-32/P-33 were referred to as P-31/P-32 in working memory before this version locked P-31 to Reversibility Classification

### Architecture

- Builder Codex is now a synthesis of: incident-derived technical patterns (P-01..P-30) + behavioral guardrails (P-31, somnus0x) + structural-integrity gates (P-32..P-36, cross-tool coding-agent handoff lessons) + 2026 industry standards

---

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
  * Incident-derived technical patterns (P-01..P-31) — Tony's lessons
  * Behavioral guardrails — somnus0x/agt-skill-pack
  * 2026 industry standards — Linux Foundation, Anthropic, GitHub

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
