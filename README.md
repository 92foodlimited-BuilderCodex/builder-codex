# Builder Codex — Solo-Survival + Behavioral Guardrails + Structural Integrity Edition

> **Standards bundle สำหรับ solo builder ที่ใช้ AI 100% ในการเขียนโค้ด** v3.3.0 (Grilling Edition) · 2026-09-24 · MIT-style license

## เปิดอันไหนเมื่อไหร่

| สถานการณ์                         | เปิดอ่าน                                                   |
| --------------------------------- | ---------------------------------------------------------- |
| 🆕 เริ่ม project ใหม่              | `AGENTS.md` (copy ไป root ของ project)                     |
| 🤖 ตั้ง AI agent ในเครื่องใหม่     | `AGENTS.md` (auto-loaded) + linked `BUILDER_CODEX.md`      |
| 🐛 เจอ bug ที่ไม่รู้แก้ยังไง       | `BUILDER_CODEX.md` § Pattern Library + § Debugging Toolkit |
| 📋 ก่อน deploy                     | `BUILDER_CODEX.md` § Pre-Deployment Checklist              |
| 🔍 AI generate code แล้วไม่แน่ใจ   | `skills/verifying-ai-output/SKILL.md`                      |
| 💾 ตั้งระบบ backup                 | `skills/backing-up-solo-projects/SKILL.md`                 |
| 📱 ก่อน submit Play/App Store      | `skills/preparing-mobile-store-submission/SKILL.md`        |
| 🇹🇭 ก่อน collect user data ใน Thai | `skills/complying-with-thai-pdpa/SKILL.md`                 |
| ✍️ เริ่ม feature ใหญ่             | `skills/writing-feature-specs/SKILL.md`                    |
| 🆕 AI ทำผิดอะไร — log อะไร         | `MEMORY.md` (AI เขียนเอง)                                  |
| 🆕 ตอนนี้ project อยู่ตรงไหน       | `spec.md` § Current State                                  |
| 🆕 R0/R1/R2 จัดยังไง               | `BUILDER_CODEX.md` § P-31                                  |
| 🆕 ก่อนเขียน brief ที่แตะ component เดิม | `BUILDER_CODEX.md` § P-32 (Structure-Read Gate)      |
| 🆕 ก่อน edit ไฟล์ใหญ่ / มีภาษาไทย  | `BUILDER_CODEX.md` § P-33 (No-Regenerate / Encoding-Safe) |
| 🆕 ก่อน grill requirement ก่อนเขียน spec | `BUILDER_CODEX.md` § P-29 (Grilling method)          |

## File Architecture (Three-Tier + Behavioral Layer)

```
your-project/
├── AGENTS.md                       ← Tier 1: <150 lines, agent auto-loads
├── MEMORY.md                       ← AI's failure log
├── CAPTURE_LOG.md                  ← Human's strategic log
├── spec.md                         ← Project save point
├── BUILDER_CODEX.md                ← Tier 3: master reference (~760 lines)
├── DR_PLAN.md                      ← Disaster recovery (7 scenarios)
├── skills/                         ← Tier 2: on-demand load
│   ├── verifying-ai-output/SKILL.md
│   ├── backing-up-solo-projects/SKILL.md
│   ├── preparing-mobile-store-submission/SKILL.md
│   ├── complying-with-thai-pdpa/SKILL.md
│   ├── writing-feature-specs/SKILL.md
│   ├── concurrency-and-hidden-bugs/SKILL.md
│   └── debugging-discipline/SKILL.md
└── features/                       ← Per-feature artifacts (P-29)
    └── XYZ-feature-name/
        ├── SPEC.md                 ← ≠ project-level spec.md
        ├── PLAN.md
        ├── TASKS.md
        └── REVIEW.md
```

## 🆕 What v3.3.0 Adds

`/clarify` step ของ P-29 (Spec-Driven Workflow) ตอนนี้มี mechanism จริงแทนคำแนะนำลอยๆ — **Grilling method** (ต้นทาง `mattpocock/skills`, ต่อยอดโดย `utarn/engineer-skills`):

1. Map requirement เป็น **design tree** — decision ทุกตัวแตกเป็น decision ย่อยที่ขึ้นกับมัน
2. ถามเป็น **rounds** — เฉพาะ **frontier** (คำถามที่ prerequisite settled แล้ว)
3. ถามทั้ง frontier ในรอบเดียว มีเลขคำถาม + คำตอบแนะนำเสมอ
4. Fact ที่หาเองได้ → agent หาเอง ไม่ถาม user — user ตอบเฉพาะ decision จริง
5. จบเมื่อ frontier ว่าง — ห้ามลงมือจนกว่า user confirm shared understanding

ดูรายละเอียดเต็มใน `BUILDER_CODEX.md` § P-29

## What v3.2.0 Added (Structural Integrity Edition)

- **P-32 Structure-Read Gate** — อ่าน source body ก่อน brief ที่ define/move/merge/delete component ใดๆ
- **P-33 No-Regenerate / Encoding-Safe Edit Gate** — ห้าม regenerate ทั้งไฟล์ แก้ทีละจุดพร้อม assert unique match
- **P-34 Nova-Reference Byte-Diff Acceptance Gate** — acceptance = byte-diff กับ reference ที่สร้างเอง ไม่ใช่ metric ที่ agent report
- **P-35 Coding-Agent Env-Note Header** — ทุก brief ระบุ environment quirks ของ agent ที่จะรับงานไว้ก่อน
- **P-36 Goal-Lock & Minimal Footprint** (ALWAYS ON) — restate origin goal + footprint declaration ก่อนทุก proposal

## What v3.1.0 Added

Adopted from `somnus0x/agt-skill-pack/claude-md-setup`:

1. **The 4 AI Misbehaviors Framework** (เดา / โกหก / ทำเกิน / ลืม) — mental anchor ใน Executive Summary
2. **P-31 R0/R1/R2 Reversibility Classification** — gradient ระหว่าง "ถามทุกอย่าง" กับ "ทำทุกอย่าง"
3. **MEMORY.md** (AI's failure log, 3-field schema) — แยกจาก CAPTURE_LOG (human's)
4. **project-level spec.md** (4-section save point) — แยกจาก feature-level SPEC.md
5. **Data Contracts block** ใน AGENTS.md — กัน session ใหม่ guess interface ผิด
6. **@imports** syntax ใน AGENTS.md — auto-load MEMORY + CAPTURE_LOG

## How to Install in a New Project

```
# 1. Copy bundle to project root
cd ~/projects/your-project
cp -r ~/builder-codex/AGENTS.md .
cp -r ~/builder-codex/BUILDER_CODEX.md .
cp -r ~/builder-codex/MEMORY.md .
cp -r ~/builder-codex/spec.md .
cp -r ~/builder-codex/CAPTURE_LOG.md .
cp -r ~/builder-codex/DR_PLAN.md .
cp -r ~/builder-codex/skills .

# 2. Customize 5 files (search for [Project Name] and replace)
#    - AGENTS.md (stack + commands)
#    - MEMORY.md (project name)
#    - spec.md (project name + goal)
#    - CAPTURE_LOG.md (project name)
#    - DR_PLAN.md (project name + inventory)

# 3. Commit
git add .
git commit -m "chore: install Builder Codex v3.3.0"

# 4. AI agent (Claude Code, Cursor, Codex CLI, Windsurf, etc.) จะอ่าน AGENTS.md
#    + imported MEMORY.md + CAPTURE_LOG.md อัตโนมัติทุก session
```

## Tools ที่อ่าน AGENTS.md อัตโนมัติ (2026)

Claude Code, Cursor, Codex CLI, GitHub Copilot, Windsurf, Amp, Devin, Aider, Zed, Jules, VS Code, JetBrains Junie, Gemini CLI (ผ่าน symlink GEMINI.md → AGENTS.md)

## What Makes v3.3.0 Different from Earlier Versions

- ✅ 4 AI Misbehaviors framework — mental anchor
- ✅ P-31 reversibility classification
- ✅ MEMORY.md separate from CAPTURE_LOG
- ✅ project-level spec.md save point
- ✅ Data Contracts block
- ✅ `@import` syntax in AGENTS.md
- ✅ P-32..P-36 structural-integrity gates (read-before-write, encoding-safe edits, byte-diff acceptance, env-note headers, goal-lock)
- ✅ P-29 `/clarify` formalized with the Grilling method (design tree + frontier rounds)
- ✅ Synthesis of incident-derived patterns + behavioral guardrails + structural gates + spec-driven grilling

## Contributing / Forking

เอกสารนี้เปิด — fork, modify, redistribute ได้

**กฎเดียว:** อย่าให้ AI generate "best practices" ทั่วไปมาใส่ — ทุก pattern ต้องมาจากบทเรียนจริง (ดู §วิธีใช้ ใน BUILDER_CODEX)

## Credits

Synthesized from:

- Production bug lessons of solo builders
- Linux Foundation AGENTS.md spec (60,000+ repos)
- Anthropic Skills open standard (2025)
- GitHub Spec Kit + OpenSpec + BMAD methodologies
- Claude Code memory hierarchy docs
- Vibe coding ecosystem research 2026
- Thai PDPA (พ.ร.บ. 2562) + PDPC guidelines
- `somnus0x/agt-skill-pack/claude-md-setup` (behavioral guardrails layer, v3.1.0)
- 🆕 `mattpocock/skills` — original Grilling method (design tree + frontier rounds, v3.3.0)
- 🆕 `utarn/engineer-skills` — fork that extends Grilling into `grill-me`/`grill-with-docs`/`grill-novice` + `handoff` + `domain-modeling` (v3.3.0; Domain Language + Handoff Compaction candidates still parked)

Original author: Tony (solo builder, Thailand)
License: MIT-style — use freely, attribution appreciated

---

🛠️ Stay safe, ship reliable, let nothing fail silently. Compound, don't repeat.
