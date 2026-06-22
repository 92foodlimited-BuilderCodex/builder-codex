# Builder Codex — Solo-Survival + Behavioral Guardrails Edition

> **Standards bundle สำหรับ solo builder ที่ใช้ AI 100% ในการเขียนโค้ด**
> v3.1.0 · 2026-06-22 · MIT-style license

## เปิดอันไหนเมื่อไหร่

| สถานการณ์ | เปิดอ่าน |
|---|---|
| 🆕 เริ่ม project ใหม่ | `AGENTS.md` (copy ไป root ของ project) |
| 🤖 ตั้ง AI agent ในเครื่องใหม่ | `AGENTS.md` (auto-loaded) + linked `BUILDER_CODEX.md` |
| 🐛 เจอ bug ที่ไม่รู้แก้ยังไง | `BUILDER_CODEX.md` § Pattern Library + § Debugging Toolkit |
| 📋 ก่อน deploy | `BUILDER_CODEX.md` § Pre-Deployment Checklist |
| 🔍 AI generate code แล้วไม่แน่ใจ | `skills/verifying-ai-output/SKILL.md` |
| 💾 ตั้งระบบ backup | `skills/backing-up-solo-projects/SKILL.md` |
| 📱 ก่อน submit Play/App Store | `skills/preparing-mobile-store-submission/SKILL.md` |
| 🇹🇭 ก่อน collect user data ใน Thai | `skills/complying-with-thai-pdpa/SKILL.md` |
| ✍️ เริ่ม feature ใหญ่ | `skills/writing-feature-specs/SKILL.md` |
| 🆕 AI ทำผิดอะไร — log อะไร | `MEMORY.md` (AI เขียนเอง) |
| 🆕 ตอนนี้ project อยู่ตรงไหน | `spec.md` § Current State |
| 🆕 R0/R1/R2 จัดยังไง | `BUILDER_CODEX.md` § P-31 |

## File Architecture (Three-Tier + Behavioral Layer)

```
your-project/
├── AGENTS.md                       ← Tier 1: <150 lines, agent auto-loads
├── @MEMORY.md                      ← 🆕 v3.1: AI's failure log (auto-imported)
├── @CAPTURE_LOG.md                 ← Human's strategic log (auto-imported)
├── spec.md                         ← 🆕 v3.1: Project save point
├── BUILDER_CODEX.md                ← Tier 3: master reference (~700 lines)
├── DR_PLAN.md                      ← Disaster recovery (7 scenarios)
├── skills/                         ← Tier 2: on-demand load
│   ├── verifying-ai-output/SKILL.md
│   ├── backing-up-solo-projects/SKILL.md
│   ├── preparing-mobile-store-submission/SKILL.md
│   ├── complying-with-thai-pdpa/SKILL.md
│   └── writing-feature-specs/SKILL.md
└── features/                       ← Per-feature artifacts (P-29)
    └── XYZ-feature-name/
        ├── SPEC.md                 ← ≠ project-level spec.md
        ├── PLAN.md
        ├── TASKS.md
        └── REVIEW.md
```

## 🆕 What v3.1.0 Adds

Adopted from `somnus0x/agt-skill-pack/claude-md-setup`:

1. **The 4 AI Misbehaviors Framework** (เดา / โกหก / ทำเกิน / ลืม) — mental anchor ใน Executive Summary
2. **P-31 R0/R1/R2 Reversibility Classification** — gradient ระหว่าง "ถามทุกอย่าง" กับ "ทำทุกอย่าง"
3. **MEMORY.md** (AI's failure log, 3-field schema) — แยกจาก CAPTURE_LOG (human's)
4. **project-level spec.md** (4-section save point) — แยกจาก feature-level SPEC.md
5. **Data Contracts block** ใน AGENTS.md — กัน session ใหม่ guess interface ผิด
6. **@imports** syntax ใน AGENTS.md — auto-load MEMORY + CAPTURE_LOG

## How to Install in a New Project

```bash
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
git commit -m "chore: install Builder Codex v3.1.0"

# 4. AI agent (Claude Code, Cursor, Codex CLI, Windsurf, etc.) จะอ่าน AGENTS.md
#    + imported MEMORY.md + CAPTURE_LOG.md อัตโนมัติทุก session
```

## Tools ที่อ่าน AGENTS.md อัตโนมัติ (2026)

Claude Code, Cursor, Codex CLI, GitHub Copilot, Windsurf, Amp, Devin, Aider, Zed, Jules, VS Code, JetBrains Junie, Gemini CLI (ผ่าน symlink GEMINI.md → AGENTS.md)

## What Makes v3.1.0 Different from v3.0.x

- ✅ 4 AI Misbehaviors framework — mental anchor
- ✅ P-31 reversibility classification
- ✅ MEMORY.md separate from CAPTURE_LOG
- ✅ project-level spec.md save point
- ✅ Data Contracts block
- ✅ `@import` syntax in AGENTS.md
- ✅ Synthesis of incident-derived patterns + behavioral guardrails

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
- 🆕 `somnus0x/agt-skill-pack/claude-md-setup` (behavioral guardrails layer)

Original author: Tony (solo builder, Thailand)
License: MIT-style — use freely, attribution appreciated

---

🛠️ Stay safe, ship reliable, let nothing fail silently. Compound, don't repeat.
