# Builder Codex — Solo-Survival Edition

> **Standards bundle สำหรับ solo builder ที่ใช้ AI 100% ในการเขียนโค้ด**
> v3.0 · 2026-06-20 · MIT-style license

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

## File Architecture (Three-Tier)

```
your-project/
├── AGENTS.md                       ← Tier 1: <150 lines, agent auto-loads
├── BUILDER_CODEX.md                ← Tier 3: master reference (~600 lines)
├── CAPTURE_LOG.md                  ← Your session learnings
├── skills/                         ← Tier 2: on-demand load
│   ├── verifying-ai-output/SKILL.md
│   ├── backing-up-solo-projects/SKILL.md
│   ├── preparing-mobile-store-submission/SKILL.md
│   ├── complying-with-thai-pdpa/SKILL.md
│   └── writing-feature-specs/SKILL.md
└── features/                       ← Per-feature artifacts (P-29)
    └── XYZ-feature-name/
        ├── SPEC.md
        ├── PLAN.md
        ├── TASKS.md
        └── REVIEW.md
```

## How to Install in a New Project

```bash
# 1. Copy bundle to project root
cd ~/projects/your-project
cp -r ~/builder-codex/AGENTS.md .
cp -r ~/builder-codex/BUILDER_CODEX.md .
cp -r ~/builder-codex/skills .

# 2. Create empty Capture Log
echo "# Capture Log — Your Project\n" > CAPTURE_LOG.md

# 3. Commit
git add AGENTS.md BUILDER_CODEX.md CAPTURE_LOG.md skills/
git commit -m "chore: install Builder Codex v3.0"

# 4. AI agent (Claude Code, Cursor, Codex CLI, Windsurf, etc.) จะอ่าน AGENTS.md อัตโนมัติตอนเริ่ม session
```

## Tools ที่อ่าน AGENTS.md อัตโนมัติ (2026)

Claude Code, Cursor, Codex CLI, GitHub Copilot, Windsurf, Amp, Devin, Aider, Zed, Jules, VS Code, JetBrains Junie, Gemini CLI (ผ่าน symlink GEMINI.md → AGENTS.md)

## What Makes v3.0 Different from v2.0

- ✅ Three-Tier file architecture (AGENTS / SKILL / Codex) แทนไฟล์เดียวยักษ์
- ✅ 8 patterns ใหม่ (P-23 → P-30) สำหรับ solo builder
- ✅ 5 portable SKILL.md ที่ load on-demand
- ✅ Integration กับ 2026 standards (Linux Foundation AGENTS spec, Anthropic SKILL spec, GitHub Spec Kit)

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

Original author: Tony (solo builder, Thailand)
License: MIT-style — use freely, attribution appreciated

---

🛠️ Stay safe, ship reliable, let nothing fail silently. Compound, don't repeat.
