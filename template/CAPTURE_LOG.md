# Capture Log — [Project Name]

> Compounding Loop captures สำหรับ project นี้
> เขียนทุก session ที่จบ — Win, Loss, Question → Decision
> Pattern ที่ recur ≥ 2 ครั้งข้าม project → promote ขึ้น `BUILDER_CODEX.md`
>
> **Codex reference:** Compounding Loop § Capture Log Format
> **Created:** YYYY-MM-DD

---

## How to Write a Capture Entry

ทุก session ที่ทำงานจริง (ไม่ใช่ explore) — ก่อนปิด chat:

1. ตอบคำถาม Nova/agent: "session นี้ — อะไรที่ได้ผลดีที่สุด? อะไรที่ควรเพิ่มใน context ครั้งหน้า?"
2. เขียน entry ตาม template ด้านล่าง (2-3 บรรทัด/หัวข้อ พอ)
3. Commit ลง Git ทันที — ไม่ปล่อยทิ้ง

**กฎ:** ถ้าไม่บันทึก = ไม่ compound แค่ทำเร็วขึ้นแต่ไม่ฉลาดขึ้น

---

## Entry Template (copy ไปใช้ทุก session)

```markdown
## YYYY-MM-DD — [หัวข้อ session สั้นๆ]

- **Plan:** สิ่งที่ตั้งใจทำ (1 บรรทัด)
- **Win:** อะไรได้ผลดี / pattern ไหนใช้ซ้ำได้
- **Loss:** อะไรเสียเวลา / สมมติฐานไหนผิด
- **Question → Decision:** สงสัยอะไร → ตัดสินใจยังไง → เพิ่มเป็น pattern ใหม่ไหม
- **Codex pattern triggered:** P-XX (ถ้ามี)
- **Files touched:** path/to/file.html (สั้นๆ)
```

---

## Real Examples (เก็บไว้เป็น reference)

### Example 1: Foundation pattern caught

```markdown
## 2026-06-15 — Branch notification restoration

- **Plan:** Restore branch-side Telegram notification ที่หายหลัง credential rotation
- **Win:** Defense in depth (P-22) — เพิ่ม Cloudflare Worker cron เป็น secondary path ทำให้แม้ client-side fail ก็มี server failsafe ภายใน 1 นาที
- **Loss:** เสีย 2 ชม. ลอง redesign architecture ก่อน sudden realize ว่าควรแค่ restore ของเดิม (P-21 lesson — restore before redesign)
- **Question → Decision:** ควรเปลี่ยน push mechanism เป็น Firebase Cloud Messaging แทนไหม? → No, Telegram bot ทำงานได้ดี + cheaper + เคยทดสอบ scale แล้ว Pattern: "อย่า migrate technology เพราะ shiny — migrate เมื่อ current หมดทาง"
- **Codex pattern triggered:** P-21, P-22
- **Files touched:** order-app.html, worker/dispatcher.js
```

### Example 2: AI hallucination caught

```markdown
## 2026-06-18 — Firebase Storage upload feature

- **Plan:** เพิ่ม photo upload สำหรับ baby growth tracking
- **Win:** Apply skill `verifying-ai-output` — ตรวจ method ก่อน accept → จับได้ว่า AI generate `storage.ref().putAsync()` แต่ของจริงคือ `.put()` แล้ว await
- **Loss:** ไม่ได้ทำ SPEC.md ก่อน → เขียน upload flow แล้วต้องแก้รอบสองเพราะลืม consent check (PDPA)
- **Question → Decision:** จะ apply spec-driven (P-29) กับ task ขนาดไหน? → Decision: feature ที่ touch user data หรือมีหลายไฟล์ — ใส่ SPEC + TASKS เสมอ (rule update ใน personal workflow)
- **Codex pattern triggered:** P-23, P-28, P-29
- **Files touched:** features/photo-upload/, app.html, db/rules.json
```

### Example 3: Cross-project pattern promoted to Codex

```markdown
## 2026-06-19 — Localized number formatting bug (3rd occurrence)

- **Plan:** Fix display ราคา 1,234.56 ที่บางเครื่องแสดง 1.234,56 (de-DE locale)
- **Win:** เจอ root cause — `Intl.NumberFormat()` ใช้ browser locale แทน app locale → fix ด้วย explicit `'th-TH'` argument
- **Loss:** เคยเจอ pattern นี้แล้ว 2 ครั้งก่อนใน project อื่น แต่ไม่ได้ promote ขึ้น Codex — เสียเวลา debug ซ้ำ
- **Question → Decision:** Pattern นี้ recur 3 ครั้งข้าม project แล้ว → **PROMOTE TO CODEX** as P-31 "Always specify locale explicitly for Intl APIs" — commit ที่ standards repo ทันที
- **Codex pattern triggered:** (creating P-31)
- **Files touched:** utils/format.js
```

---

## Captures

<!-- เพิ่ม entry ใหม่ที่นี่ — ใหม่สุดบน -->

## YYYY-MM-DD — [First session]

- **Plan:** 
- **Win:** 
- **Loss:** 
- **Question → Decision:** 
- **Codex pattern triggered:** 
- **Files touched:** 

---

## Quarterly Review (ทุก 3 เดือน)

อ่าน captures 3 เดือนล่าสุด ตอบคำถาม:

```
1. Pattern อะไรที่ recur ≥ 2 ครั้ง → promote ขึ้น Codex หรือยัง?
2. Bug ประเภทไหนที่ยังเจอซ้ำ — แสดงว่ายังไม่มี pattern กัน
3. AI assumption ผิดประเภทไหนที่ recur — สัญญาณ AGENTS.md ต้องเพิ่มกฎ
4. Skill ไหนที่ใช้บ่อย — สัญญาณ skill ทำงานได้ดี
5. Skill ไหนที่ไม่เคยใช้ — สัญญาณ over-engineered หรือไม่ relevant
```

Output ของ quarterly review:
- Codex update (เพิ่ม pattern ใหม่)
- AGENTS.md tighten (เพิ่ม rule ที่เจอบ่อย)
- Skill cleanup (ลบที่ไม่ใช้ / merge ที่ overlap)

---

## Capture Hygiene Rules

- ✅ Entry ใหม่ → บนสุด (reverse chronological)
- ✅ ทุก entry มี date + topic
- ✅ ความยาว < 10 บรรทัด/entry — ถ้ายาวกว่านี้แสดงว่าเป็น SPEC.md ที่ผิดที่
- ✅ ใช้ภาษาที่ตัวเอง 6 เดือนข้างหน้าอ่านแล้วเข้าใจ
- ❌ ไม่ใช่ที่ระบาย — เก็บ technical signal เท่านั้น
- ❌ ไม่ใช่ project log/timeline — ใช้ Git history แทน
- ❌ ไม่ใช่ TODO list — ใช้ TASKS.md แทน
