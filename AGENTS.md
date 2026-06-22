# AGENTS.md
> Entry point for AI coding agents. <150 lines by design.
> Full reference → `BUILDER_CODEX.md` (Tier 3 master) + `skills/` (Tier 2 on-demand)

## Imports (load every session)
@MEMORY.md
@CAPTURE_LOG.md

## Project
**Stack:** Single-file HTML/JS + Firebase Realtime Database (asia-southeast1) + Cloudflare Workers
**Build system:** None (vanilla) — เปิด HTML file ใน browser run ได้เลย
**Source of truth:** Git repo (commit ทันทีหลัง agent เสร็จ)
**Audience:** Thai market — UI ภาษาไทย, code/comment ภาษาอังกฤษ

## Commands
- Run locally: เปิดไฟล์ใน browser หรือ `python3 -m http.server 8000`
- Deploy: `git push origin main` → Cloudflare Pages auto-deploy
- DB rules: Firebase Console > Realtime Database > Rules tab

## 🛑 Behavioral Guardrails (กัน 4 AI misbehaviors)

### NO MAGIC — don't guess (กัน "เดา")
All assumptions explicit. ถ้า context หาย → state assumption ชัดเจน
ห้าม hallucinate infra หรือ invent service ที่ไม่มี
ถ้าไม่รู้ว่าไฟล์/path อยู่ไหน → **ถาม** อย่าเดา

### VERIFY BEFORE DONE — no "done" without evidence (กัน "โกหก")
ห้ามอ้าง "เสร็จแล้ว" โดยไม่ run verification
"แก้ไฟล์แล้ว" = ไม่ใช่เสร็จ "แก้ไฟล์แล้ว + run output นี้" = เสร็จ
ห้าม "should work now" → evidence ก่อน assertion เสมอ

### SCOPE DRIFT — flag scope creep (กัน "ทำเกิน")
Track stated goal vs actual execution Flag เมื่อ:
- "ขอเพิ่มอีกนิด" สะสมมาก
- Nice-to-have ถูก treat เป็น must-have
- ขอ "fix bug X" แต่กำลัง "refactor ทั้ง module"

### LEARNING CAPTURE — log to MEMORY.md (กัน "ลืม")
เจอ pattern failure / operational mistake → log ลง MEMORY.md ทันที
3 fields: what happened / root cause / correct behavior
**กฎ:** correct behavior ต้องเป็น "command ที่ทำตามได้" ไม่ใช่ "feeling"

### REVERSIBILITY CLASSIFICATION (R0/R1/R2) — ดู P-31
- **R0** (irreversible): STOP. ถามก่อนทำเสมอ (rm -rf, force push, revoke key, delete data, store submission)
- **R1** (costly to reverse): Do it, but report what + why + how to rollback (migration, major version, deploy prod)
- **R2** (easily reversed): Just do it. Brief report (lint, format, edit comment, install dev dep)

## Hard Rules (technical — ห้ามฝ่าฝืน)
1. **Render functions = `function(){}` + string concat ONLY** — ห้าม nested backtick template literal
2. **onclick = `data-id` pattern + event delegation** — ห้าม inline string escape
3. **localStorage = check quota before setItem** + fallback ทุกครั้ง (P-15, P-16)
4. **Firebase write = ต้องมี error handler** (P-01)
5. **ZERO duplicate logic** — extend existing, ห้ามสร้าง parallel
6. **ทุก feature = single source of truth** — บอกชื่อ function/section ก่อนแก้

## Before Writing Code (Plan phase — P-29)
1. อ่าน `spec.md` "Current state" → รู้ว่าอยู่ตรงไหน
2. ระบุ existing function/section ที่กระทบ
3. ระบุ single source of truth ที่จะแก้
4. List side effects + classify (R0/R1/R2)
5. ถ้า scope ไม่ชัด → ถามก่อน ห้ามเดาแล้วเขียนทับ

## After Writing Code (Review phase)
1. Run `npm ls` หรือ check import จริง — กัน hallucination (P-23)
2. ตรวจ schema กับ Firebase rules จริง ไม่ใช่ memory
3. ทดสอบใน sandbox 1 รอบก่อน commit
4. **Update spec.md** "Current state" + "Done" — ไม่ update = ไม่เสร็จ

## 📋 Data Contracts (interface ระหว่าง components)
> AI agent **ห้ามแก้ contract เหล่านี้** โดยไม่ flag ก่อน
> Update เมื่อ interface เปลี่ยน + log ลง MEMORY.md

```
- Firebase order schema:  { branchId: string, items: [...], vat: number, ts: number }
- Telegram payload:       { branchId: string, text: string, retry: number }
- Health ping:            { ts: number, deviceId: string, version: string, storageKB: number }
```

## Known Bug Patterns (ห้าม trigger)
- **Nested backtick crash** → string concat เท่านั้นใน render
- **localStorage overflow > 3 เดือน** → archive/cleanup strategy
- **Context loss in long session** → /compact ที่ 60% token (P-26)
- **onclick escape issues** → data-id + delegation
- **AI hallucinated imports** → verify ทุก import (P-23)

## Solo Builder Constraints
- ไม่มี peer review → ใช้ AI #2 review (P-30) ก่อน merge
- เครื่องเดียวเสีย = ทุก project หาย → backup weekly (P-24)
- ไม่มี ops team → cost dashboard ดู 1 ครั้ง/สัปดาห์ (P-25)

## Communication Style
- Thai casual สำหรับ discussion / English สำหรับ code, variable, comment
- Direct fix > lengthy explanation
- Flag risk **ก่อน** implement
- Token ยาว → suggest splitting

## When in Doubt
1. อ่าน `BUILDER_CODEX.md` Pattern Library ที่ตรง issue
2. อ่าน `MEMORY.md` มี case นี้แล้วไหม
3. อ่าน `CAPTURE_LOG.md` Win/Loss ที่ relevant
4. ถาม human ก่อน assume

## Forbidden
- ❌ Refactor ที่ไม่ได้ขอ
- ❌ Silent error catch (ต้อง report/log เสมอ)
- ❌ Hide secret ใน client code (P-11)
- ❌ Revoke credential เก่าก่อนทดสอบใหม่ (P-07)
- ❌ Patch ด้วย redesign (P-21)
- ❌ R0 action โดยไม่ถาม (P-31)

---

**Pattern reference:** ดู `BUILDER_CODEX.md` § Pattern Library (P-01 → P-31)
**Skill reference:** ดู `skills/*/SKILL.md`
**Version:** AGENTS.md v3.1.0 sync with Builder Codex 3.1.0 (2026-06-22)
