# MEMORY — AI Operational Failure Log

> **File job:** AI agent เขียนลงไฟล์นี้เองทุกครั้งที่ทำผิด เพื่อกัน mistake ซ้ำ
> **Loaded automatically:** AGENTS.md มี `@MEMORY.md` import → load ทุก session
> **Different from `CAPTURE_LOG.md`:** MEMORY = AI's operational mistakes / CAPTURE = human's strategic learnings
> **Adopted from:** `somnus0x/agt-skill-pack/claude-md-setup` — Layer 2

---

## How AI Should Write Entries

ทุก entry ต้องมี **3 fields:**

```markdown
[short title] ([date]):
- what: สิ่งที่ AI ทำผิด (specific, single sentence)
- root cause: เหตุผลที่ทำผิด (habit / assumption / missing context)
- correct: command ที่ AI ต้องทำต่อไป (actionable, not "feeling")
```

**กฎสำคัญ:**
- `correct` ต้องเป็น **command ที่ทำตามได้** ไม่ใช่ "feeling" หรือ "general guidance"
- ❌ Bad: `correct: be more careful with database operations`
- ✅ Good: `correct: classify DB write as R0 first, then ask before proceeding`

---

## Failure Entries

<!-- AI ใส่ entry ใหม่บนสุด (newest first) -->

### Example entries (เก็บไว้เป็น reference — ลบทิ้งได้หลัง entry จริง ≥ 3)

```
R2 permission-asking (2026-06-22):
- what: asked "should I proceed?" for renaming a local variable
- root cause: habit of asking confirm for any edit, didn't classify reversibility
- correct: classify as R2 first — rename in single scope = easily reversed → just do it, brief report

Hallucinated Firebase method (2026-06-22):
- what: generated `db.refOnce()` which doesn't exist
- root cause: mixed Firebase v8 and v9 syntax from training data
- correct: before using any Firebase method, grep existing codebase for similar pattern OR check firebase.google.com docs URL — never trust memory

Forgot consent check before user data write (2026-06-22):
- what: implemented photo upload without checking PDPA consent flow
- root cause: focused on technical feature, didn't read AGENTS.md "before writing code" checklist
- correct: every user data write → check withConsent(userId, type, fn) wrapper FIRST, see P-28

Half-wired pipeline (2026-06-22):
- what: built scheduled notification dispatcher, never wired the read/acknowledge side
- root cause: implemented producer without checking consumer
- correct: any pipeline → verify BOTH sides (write + read) before claiming done, see P-22 defense in depth

Claimed done without verify (2026-06-22):
- what: said "feature works" without running npm test or opening browser
- root cause: skipped VERIFY BEFORE DONE guardrail
- correct: never claim done without: 1) lint pass 2) sandbox run 3) actual output pasted
```

---

## Quarterly Review (Human runs this)

ทุก 3 เดือน — human อ่าน MEMORY.md ตอบคำถาม:

1. Failure ประเภทไหน recur ≥ 3 ครั้ง? → promote เป็น **hard rule** ใน AGENTS.md หรือ pattern ใน BUILDER_CODEX
2. Failure ประเภทไหนหายไป (ไม่มี entry ใหม่ ≥ 1 เดือน)? → AI เรียนแล้ว → archive entry นั้น
3. Pattern recur ข้าม project? → promote เข้า Builder Codex master + share community

---

## Cleanup Rules

- **อย่าลบ entry** ที่ AI เพิ่งเขียนภายใน 30 วัน — ต้องให้ load ซ้ำพอที่ behavior จะเปลี่ยน
- **Archive entry เก่าเกิน 90 วัน** ที่ไม่ recur → ย้ายไป `MEMORY_ARCHIVE.md`
- **Promote pattern** ที่ recur ≥ 3 entries → เพิ่มเป็น rule ใน AGENTS.md, ลบ entries เก่าออก

---

## Anti-patterns (สิ่งที่ MEMORY.md ห้ามเป็น)

- ❌ Strategic learnings → ใช้ CAPTURE_LOG.md
- ❌ Feature ideas / TODO → ใช้ spec.md "Todo" section
- ❌ Project state / progress → ใช้ spec.md "Current state"
- ❌ Architecture decisions → ใช้ spec.md "Done" section with why
- ❌ Pattern library → ใช้ BUILDER_CODEX.md
- ❌ Long narrative → ทุก entry ≤ 5 lines, 3 fields เท่านั้น

---

> **Mental model:** MEMORY.md = "AI ผิดอะไรห้ามผิดซ้ำ"
> ถ้าเขียน entry แล้วไม่ใช่ operational mistake ของ AI → ผิดไฟล์ ย้ายไป CAPTURE_LOG / spec.md / Codex
