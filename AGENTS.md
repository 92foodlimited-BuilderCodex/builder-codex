# AGENTS.md
> Entry point for AI coding agents. <150 lines by design.
> Full reference → `BUILDER_CODEX.md` (Tier 3 master) + `skills/` (Tier 2 on-demand)

## Project
**Stack:** Single-file HTML/JS + Firebase Realtime Database (asia-southeast1) + Cloudflare Workers
**Build system:** None (vanilla) — เปิด HTML file ใน browser run ได้เลย
**Source of truth:** Git repo (commit ทันทีหลัง agent เสร็จ)
**Audience:** Thai market — UI ภาษาไทย, code/comment ภาษาอังกฤษ

## Commands
- Run locally: เปิดไฟล์ใน browser หรือ `python3 -m http.server 8000`
- Deploy: `git push origin main` → Cloudflare Pages auto-deploy
- DB rules: Firebase Console > Realtime Database > Rules tab

## Hard Rules (ห้ามฝ่าฝืน)
1. **Render functions = `function(){}` + string concat ONLY** — ห้าม nested backtick template literal (crash root cause #1)
2. **onclick = `data-id` pattern + event delegation** — ห้าม inline string escape
3. **localStorage = check quota before setItem** + fallback ทุกครั้ง (P-15, P-16)
4. **Firebase write = ต้องมี error handler** — no exception (P-01)
5. **ZERO duplicate logic** — extend existing function, ห้ามสร้าง parallel
6. **ทุก feature = single source of truth** — บอกชื่อ function/section ที่เป็น SOT ก่อนแก้

## Before Writing Code (Plan phase — P-29)
1. ระบุ existing function/section ที่กระทบ
2. ระบุ single source of truth ที่จะแก้
3. List side effects ที่อาจเกิด
4. ถ้า scope ไม่ชัด → ถามก่อน ห้ามเดาแล้วเขียนทับ

## After Writing Code (Review phase)
1. Run `npm ls` หรือ check import จริง — กัน hallucination (P-23)
2. ตรวจ schema กับ Firebase rules จริง ไม่ใช่ memory
3. ทดสอบใน sandbox 1 รอบก่อน commit
4. Diff ดูว่ามี duplicate logic เกิดขึ้นไหม

## Known Bug Patterns (ห้าม trigger)
- **Nested backtick crash** → string concat เท่านั้นใน render
- **localStorage overflow > 3 เดือน** → ต้องมี archive/cleanup strategy
- **Context loss in long session** → /compact ที่ 60% token (P-26)
- **onclick escape issues** → data-id + delegation
- **AI hallucinated imports** → verify ทุก import (P-23)

## File Layout
```
project_root/
├── *.html              ← single-file app(s)
├── AGENTS.md           ← this file
├── CAPTURE_LOG.md      ← session learnings
├── BUILDER_CODEX.md    ← master reference
└── skills/             ← on-demand SKILL.md
```

## Compounding Loop (ทุก session ต้องวิ่ง)
**Plan** (อ่าน Codex + Capture Log) → **Work** (ตาม plan) → **Review** (เทียบ pattern) → **Compound** (เขียน Capture entry)

> 80% ของเวลา = Plan + Review รวมกัน Work เป็น 20% (AI เร็วอยู่แล้ว)

## Solo Builder Constraints
- ไม่มี peer review → ใช้ AI #2 review (P-30) ก่อน merge
- เครื่องเดียวเสีย = ทุก project หาย → backup weekly (P-24)
- ไม่มี ops team → cost dashboard ดู 1 ครั้ง/สัปดาห์ (P-25)

## Communication Style
- Thai casual สำหรับ discussion
- English สำหรับ code, variable name, comment
- Direct fix > lengthy explanation
- Flag risk **ก่อน** implement ไม่ใช่หลัง
- Token ยาว → suggest splitting task

## When in Doubt
1. อ่าน `BUILDER_CODEX.md` Pattern Library ที่ตรง issue
2. อ่าน `CAPTURE_LOG.md` มี case คล้ายกันไหม
3. ถาม human ก่อน assume

## Forbidden
- ❌ Refactor ที่ไม่ได้ขอ
- ❌ "ปรับปรุง" structure โดยไม่ flag
- ❌ Catch error แบบเงียบ (ต้อง report/log เสมอ)
- ❌ Hide secret ใน client code (P-11)
- ❌ Revoke credential เก่าก่อนทดสอบใหม่ (P-07)
- ❌ Patch ด้วย redesign (P-21)

---

**Pattern reference:** ดู `BUILDER_CODEX.md` § Pattern Library (P-01 → P-30)
**Skill reference:** ดู `skills/*/SKILL.md`
**Version:** AGENTS.md v3.0 sync with Builder Codex 3.0 (2026-06-20)
