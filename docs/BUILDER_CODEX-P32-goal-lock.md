# BUILDER_CODEX — P-32 Insertion Pack

> Apply these edits to `BUILDER_CODEX.md` (currently v3.1.0). Three small edits, all additive.
> Pattern number P-32 = next real slot (file currently ends at P-31). The parked
> "Structure-Read Gate" and "No-Regenerate" ideas can become P-33/P-34 when actually written.

---

## EDIT 1 — Add the pattern (in the Pattern Library, after P-31)

```markdown
#### P-32: Goal-Lock & Minimal Footprint (ALWAYS ON)
> กัน 2 อาการของ **ทำเกิน**: (A) perfect ผิดจุด — ขัดเงาส่วนย่อยจนหลุดเป้าหลัก
> (B) scope creep — ลากของเกินที่งานต้องใช้ (dep/domain/account/infra) เข้ามา

**กฎ — วิ่งก่อนเสนอ architecture / plan / phase / auth / hosting / dependency ทุกครั้ง:**

1. **Goal-lock** — ก่อนเสนอ ทวนเป้าหมายต้นทาง 1 บรรทัด *จากคำของ user เอง* แล้วเช็ค
   ข้อเสนอกับมัน ถ้า step ไหน optimize สิ่งที่ไม่ใช่เป้าหมายต้นทาง → หยุด บอกออกมา
2. **ห้าม defer แกนเงียบๆ** — ถ้าเป้าหมายต้นทางระบุ capability ไว้ (เช่น "automation",
   "ข้ามค่าย") = แกน เลื่อนได้เฉพาะเป็น phase ที่ตั้งชื่อ+จัดคิวชัด ตัดสินใจแล้ว
   ห้ามแอบ downgrade เป็น "Tier 2 / ไว้ทีหลัง" แล้วสร้างเวอร์ชันด้อยกว่าเป็นตัวจริงแทน
3. **Simplest-correct ยืนพื้น** — เลือกกลไกที่ง่ายสุดที่ *ผ่านเกณฑ์* ปฏิเสธตัวที่ง่ายกว่าได้
   เฉพาะเมื่อ **ชี้รูจริงเป็นรูปธรรมได้** การปัดด้วยคำลอยๆ ("ไม่ใช่ auth จริง",
   "ไม่รัดกุมพอ") โดยไม่ชี้รู = ตัวมันเองคือ error → ตัวง่ายชนะ
4. **Footprint declaration** — ก่อนเสนอ infra/dep/hosting/auth/domain ระบุ: (a) เพิ่มอะไร
   (b) primitive เดิมครอบได้ไหม (c) ผูกกับอะไรอีก ถ้าผูกกับ project อื่นที่ไม่เกี่ยว →
   หยุด ออกแบบใหม่ blast radius ของแต่ละ project จำกัดในตัวมันเอง การแชร์ข้าม project =
   decision ที่ตั้งใจ ไม่ใช่ default ที่หยิบมาเพราะสะดวก
5. **Cost-lock** (เมื่อ user ตั้งเพดาน cost) — verify pricing/free-tier จริงจาก doc ปัจจุบัน
   (ไม่ใช่ความจำ) ก่อน commit และบอกว่าเพดานถูกการันตียังไง (เช่น "free plan บล็อก ไม่บิล")
   ไม่ใช่แค่ "น่าจะถูก"

**Maps to:** ทำเกิน (Overreach) เป็นหลัก + เดา (เดาเป้าหมายแทนที่จะยึดของต้นทาง)

**ที่มา:** session ที่ drift ไปสร้าง manual note store ทั้งที่เป้าคือ automation + ปัด
bearer-token ว่า "ไม่ใช่ auth จริง" จนลาม Cloudflare Access → custom domain → เกือบผูก
repo เดี่ยวเข้ากับ domain ของ product อื่น (pippafamily.com) — root เดียวกันคือไม่ทวนแต่ละ
step กับเป้าต้นทาง และไม่ประกาศ footprint ก่อนหยิบ infra ใหม่
```

---

## EDIT 2 — Update the 4 Misbehaviors table (Executive Summary)

Find the **ทำเกิน (Overreach)** row and add P-32 to its "Pattern ที่กัน" column:

```markdown
| **ทำเกิน** (Overreach) | Scope creep, refactor ที่ไม่ได้ขอ, perfect ผิดจุด, ลากของไม่เกี่ยวเข้ามา | P-21, SCOPE DRIFT rule, P-31, **P-32** |
```

---

## EDIT 3 — Changelog line (top of the changelog table)

> Suggested version: **v3.1.1** (additive pattern) — keeps **v3.2.0** free for your planned
> consolidation pass. Change if you prefer.

```markdown
| **v3.1.1 (Goal-Lock)** | 2026-08-29 | + P-32 Goal-Lock & Minimal Footprint (ALWAYS ON) — goal-lock, no-silent-defer, simplest-correct-stands, footprint declaration, cost-lock; mapped to ทำเกิน; incident-derived (manual-first drift + Access/domain scope creep) |
```

---

## EDIT 4 — AGENTS.md pin (in EACH project's AGENTS.md, near the top)

```markdown
> BEFORE ANY PROPOSAL: run P-32 (goal-lock + minimal footprint). Restate the origin goal
> in one line, check the proposal against it, and name a concrete hole before rejecting the
> simpler option. Declare footprint before adding any infra/dep/domain.
```
