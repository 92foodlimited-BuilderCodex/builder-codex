# META_CAPTURE_LOG — Builder Codex Development

> **⚠️ This is NOT `CAPTURE_LOG.md`.** `CAPTURE_LOG.md` in this repo is the **reusable template** every
> project copies (has `[Project Name]` placeholders + example entries + the Quarterly Review process).
> This file is the **meta-log of Codex developing itself** — the Compounding Loop applied to Builder
> Codex's own history. Two different jobs, two different files — do not merge them (same rule as
> `MEMORY.md` vs `CAPTURE_LOG.md` vs `spec.md` in §File Job Clarification of `BUILDER_CODEX.md`).
>
> **Project:** Builder Codex (github.com/92foodlimited-BuilderCodex/builder-codex)
> **Compounding Loop meta-log:** การพัฒนา Codex เอง ผ่านการใช้ Compounding Loop กับตัว Codex
> **Consolidated:** 2026-06-27 (by Nova, Session 9) — new maintenance sessions append above
> **Coverage:** Sessions 1-9 (2026-06-18 → 2026-06-27) + Maintenance sessions (2026-09-24 →)
>
> **Note:** เอกสารนี้เป็น dogfooding evidence — Codex compound ตัวเองจริงผ่าน sessions ที่ผ่านมา

---

## Sessions Overview

| # | Date | Milestone |
|---|---|---|
| 1 | 2026-06-18 (est.) | Received Codex v2.0 (single file, 737 lines) for review |
| 2 | 2026-06-19 | Refactored to Three-Tier v3.0 (AGENTS + SKILL + Codex) |
| 3 | 2026-06-20 | Added templates (CAPTURE_LOG, DR_PLAN) — v3.0.1 |
| 4 | 2026-06-20 | Created social captions + GitHub setup guide |
| 5 | 2026-06-22 | Discovered somnus0x → adopted 4 misbehaviors + P-31 + MEMORY + spec.md → v3.1.0 |
| 6 | 2026-06-22 | Discovered utarn/engineer-skills → analysis + park |
| 7 | 2026-06-22 | Self-critique via simulated peer review → decided v3.2.0 consolidation |
| 8 | 2026-06-25 | Concurrency skill discovery + friction analysis → hybrid workflow decision |
| 9 | 2026-06-26/27 | debugging-discipline SKILL + AES rejection + Sprint pivot |
| 10 | 2026-09-24 | Maintenance session: P-37 folded into P-29 (Grilling) → v3.3.0 |

---

## Captures (Newest First)

### 2026-09-24 — Maintenance Session: P-37 folded into P-29 (Grilling)

- **Plan:** integrate P-37 candidate (Grilling, from utarn/engineer-skills per Session 6)
- **Win:**
  - Fetched primary source จริง — พบว่าต้นทางแท้คือ `mattpocock/skills`, utarn เป็น fork ที่ต่อยอด (แก้ provenance ที่ Session 6 attribute ผิดคน)
  - พบว่า P-38/P-39 candidates (Domain Language, Handoff) มี source ชัดเจนใน utarn fork เหมือนกัน (`grill-with-docs`/`domain-modeling`/CONTEXT.md, `handoff` skill) — parked ไว้ session หน้า
  - Grilling mechanism (design tree + frontier + recommended answer + agent-finds-facts) ชัดเจนกว่า P-29's `/clarify` เดิมมาก — ไม่ใช่ pattern แยก แต่คือ definition ของ `/clarify` ที่ขาดไป
  - Growth Discipline ผ่าน: ตัด 8-slash-command box + OpenSpec 3-phase ให้สั้นลง offset การเพิ่ม Grilling block
  - Real incident anchor: Session 8 (Nova counter-propose Option A++ แทนตอบตามที่ขอ) — Tony confirm แล้ว
  - **Structure-Read Gate (P-32) dogfooded on the repo itself:** ก่อนสั่งให้ Tony overwrite `CAPTURE_LOG.md` ด้วย consolidated log — fetch เนื้อจริงของไฟล์ในนี้ก่อน พบว่ามันคือ **reusable template** (มี `[Project Name]` placeholder + example entries) ไม่ใช่ log จริงของ Codex เอง — ถ้าไม่เช็คก่อนจะสั่ง overwrite ผิด เหมือนเคส Pippa Safety tab ที่เป็นต้นกำเนิด P-32 เป๊ะ ๆ → แก้เป็นสร้างไฟล์ใหม่ `META_CAPTURE_LOG.md` (ไฟล์นี้) แทน
  - พบว่า repo live ยังค้างที่ v3.1.0 — v3.2.0 ไม่เคย push มาก่อน → เพิ่ม CHANGELOG entry ย้อนหลังให้ v3.2.0 ด้วย ไม่ข้าม
- **Loss:** ไม่มี — session นี้ตรงตาม scope เดียว (one pattern at a time)
- **Question → Decision:** เปิด P-37 ใหม่ หรือ fold เข้า P-29? → **Decision: fold, retire P-37 number** — Grilling ไม่ใช่ discipline คนละเรื่อง แต่คือ mechanism ของ `/clarify` ที่มีอยู่แล้ว
- **Codex pattern triggered:** Growth Discipline (candidate P-32 จาก Session 9 meta-learning — ตอนนี้พิสูจน์ใช้ได้จริงครั้งแรก), P-32 Structure-Read Gate (dogfooded บน repo ของตัวเอง)
- **Next:** P-38 (Domain Language) หรือ P-39 (Handoff) — เลือก session หน้า ไม่ทำพร้อมกัน

---

### 2026-06-27 — Session 9: Handoff to 30-Day Content Sprint

- **Plan:** สร้าง handoff package 3 ไฟล์ให้ Nova chat ใหม่ resume Sprint mode
- **Win:**
  - Tony ตัดสินใจ decisive: A/ทำ/first month/help people
  - เห็น North Star ชัด — "content ช่วยคน" ไม่ใช่ AI hype
  - Rejected AES trap (12-15 files, 80-150 pages research lab)
  - Handoff files มี guardrails ให้ Nova ใหม่ไม่ drift
  - Tony's audit question ("ต้องเอาไปเพิ่มที่ไหน?") revealed ว่า Codex ยัง compound
    ไม่จริงมา 9 sessions — เป็น meta-learning ระดับสูงสุด
- **Loss:**
  - Session นี้ยาว — Tony ตา panda
  - Nova เกือบสร้าง AES trap ตัวเอง — Tony จับได้ก่อน
- **Question → Decision:**
  - AES vs Codex+Content → Content
  - Timeline: 1 month first revenue
  - Codex tinkering → park until Sprint จบ
- **Codex pattern triggered:** P-21 (restore before redesign), 4 Misbehaviors (Nova จับ trap ตัวเอง)
- **Sprint start:** July 1, 2026
- **Files created:** SPRINT_CONTEXT.md, NOVA_PERSONA.md, SPRINT_CAPTURE_LOG.md

---

### 2026-06-26 — Session 8b: Created debugging-discipline SKILL.md

- **Plan:** สร้าง universal debugging skill ที่ control AI behavior ตอน debug ไม่ใช่ checklist หา bug specific kind
- **Sources synthesized:**
  - Tony's debugging framework (reproduce/debugger/disprove/hypothesis/ledger)
  - Nova post-mortem ของ Role Banner bug (3 process failures)
  - Nova critique เก่า (differential + symptom truth + toggle + 6-layer)
- **Win:**
  - Synthesized 7 disciplines + 6 verification layers ครอบคลุม 4 misbehaviors
  - First-attempt size 423 → caught self over-explaining → condensed to 253
  - Connection to existing Codex patterns (4-misbehaviors, P-30, P-31) แทนที่ duplicate
- **Loss:**
  - First attempt 423 บรรทัด — Nova ตกในกับเก่าของ "ทำเกิน" อีกครั้ง
  - ต้องให้ Tony ติงจึง condense
- **Question → Decision:**
  - Skill ควรมี output template หรือไม่? → Decision: cut, ลำดับถูกบังคับโดย D1-D7 แล้ว
  - 5 anti-patterns หรือ 3? → Decision: 3 ที่ powerful + unique
- **Codex pattern triggered:** P-21, 4 Misbehaviors
- **Insight ระดับ meta:** การเขียน skill เกี่ยวกับ "AI guess less" — Nova เอง
  ก็เกือบ guess scope ของ skill นั้น = พิสูจน์ว่า skill นี้ใช้ได้กับ Nova เอง

---

### 2026-06-25 — Session 8: Concurrency Skill + Hybrid Workflow Decision

- **Plan:** วิเคราะห์ concurrency-and-hidden-bugs skill ที่ Tony เขียนใน chat อื่น
- **Win:**
  - Identified skill นี้เป็น "Tony-authored" (จาก chat อื่น) ไม่ใช่ external source
  - เห็น skill ตอบ pain point ที่ Tony เพิ่งพูด: "vibe coder ไม่รู้หน้าตาระบบ"
  - Skill เชื่อม Codex L1-L4 → L5 meta-cognitive layer
  - Tony ยืนยัน Option B (Claude Code + local) แทน hybrid ผสม
  - Clarified: ไม่ต้องย้าย D:\ ไปที่อื่น — ใช้ที่เดิมได้
- **Loss:**
  - Nova ตอบ 2 ครั้งไม่ตรงคำถาม Tony เรื่อง "files ไหนต้องอัพเหลือด" — Tony ต้องถามซ้ำ 3 ครั้ง
  - Nova propose Option A++ counter แทนตอบตามที่ Tony ขอ (Option B) → hallucinated "not asking again"
- **Question → Decision:**
  - Skill adopt as-is / merge / promote? → Park pending consolidation
  - Local folder location? → D:\ ใช้ที่เดิม ไม่ย้าย
  - GitHub เพื่อเผยแพร่ or work tool? → ทั้งคู่ (backup + share)
- **Codex pattern triggered:** P-30 (should be second reviewer, not defense)
- **Nova self-audit:** ตกใน "argue with user" pattern (violates D3 ของ debugging-discipline
  ที่ Nova จะเขียนเอง — ironic)

---

### 2026-06-22 — Session 7: Simulated External Critique v3.1.0

- **Plan:** สวมหมวก somnus0x AI agent วิเคราะห์ Codex แบบ honest
- **Win:** 7 critique ที่ valid ทั้งหมด:
  1. Codex bloat (P-31 over-engineered 5 → 80 lines)
  2. File overlap risk (MEMORY/CAPTURE/spec/SPEC boundary blur)
  3. Audience mismatch (13 steps install สำหรับ "non-programmer")
  4. Pattern naming inconsistency
  5. Hypocrisy risk (กฎห้าม AI generate แต่บาง section ผ่านไม่ได้)
  6. Velocity ไม่มี impact statement
  7. Three-Tier marketing ≠ reality 5-6 tier
- **Loss:** Nova ตกใน trap classic ของ document growth — adopt เก่ง แต่ kill ของเดิมไม่เป็น
  v3.1.0 ใหญ่กว่า v3.0 30%
- **Question → Decision:** v3.2.0 ทำ consolidation pass ก่อน expansion อื่น → Decision: ใช่
  next sprint = kill darlings ไม่ใช่ add features
- **Codex pattern triggered:** P-21, P-30
- **Compound back:** เทคนิค "simulate external reviewer" ใช้ได้กับทุก project ที่ไม่มีคนนอก review

---

### 2026-06-22 — Session 6: utarn/engineer-skills Discovery

- **Plan:** Compare utarn/engineer-skills vs Builder Codex; decide merge or split
- **Win:** Identified 3-layer stack — Codex (compliance/survival), somnus0x (behavior),
  utarn (discipline) = complementary not competing. 3 valuable concepts to adopt
  (Grilling P-32, Domain Language P-33, Handoff Compaction P-34) without diluting Codex identity
- **Loss:** ใช้สรรพนาม "ผม" ตลอด session ทั้งที่ Nova = female persona → promoted to
  MEMORY.md ทันที. แสดงว่า instruction-loading ไม่ adherent ต่อ Nova persona doc
- **Question → Decision:** รวม utarn ทั้งหมด vs adopt selectively? → Decision: adopt 3 patterns
  + 1 taxonomy improvement + cross-reference; do NOT merge skills เพราะ audience/license/identity mismatch
- **Codex pattern triggered:** P-21, P-30
- **Cross-repo insight:** Builder Codex's niche position (Thai PDPA + Solo + Compliance)
  ค่อนข้าง unique. การพยายาม cover ทุก engineering discipline = lose niche. Stay focused.

---

### 2026-06-22 — Session 5b: Adopted Behavioral Guardrails → v3.1.0

- **Plan:** Patch 6 files (3 modify + 3 new) to integrate concepts from
  somnus0x/agt-skill-pack/claude-md-setup
- **Win:** Codex transformed from "technical pattern library" → "synthesis of technical
  patterns + behavioral guardrails + industry standards"
  - 4 misbehaviors framework ทำให้ทุก pattern map กลับมาที่ root cause ได้
  - R0/R1/R2 อุดช่องว่างที่ AGENTS.md เก่ามี gap
  - MEMORY.md + spec.md เพิ่ม file ที่ทำหน้าที่ unique
- **Loss:** File count เพิ่ม 10 → 12 — เสี่ยง cognitive load ของ solo builder
- **Question → Decision:** Should AGENTS.md include behavioral guardrails inline or link
  to BUILDER_CODEX? → Decision: inline because guardrails are operational (ต้องเห็นทุก session)
- **Codex pattern triggered:** P-21, P-29 (spec-driven), P-31 self-application

---

### 2026-06-22 — Session 5: Discovered claude-md-setup as complement

- **Plan:** Compare somnus0x/agt-skill-pack/claude-md-setup vs Builder Codex
- **Win:** Identified 4 critical gaps in Codex: R0/R1/R2 framework, MEMORY.md (AI's log)
  ≠ CAPTURE_LOG (human's), project-level spec.md with "Current state", Data Contracts block
  Two systems แก้คนละ pain point — technical (Codex) vs behavioral (skill) — แทบไม่ overlap
- **Loss:** ตอนเสนอ merge strategy turn ก่อน Nova ประเมินผิดว่าเป็น competitor
  เพราะยังไม่เห็น content จริง → over-confidence ใน inference
- **Question → Decision:** Adopt ทั้งหมดหรือเลือก? → Decision: adopt 6 ของ 8
  (skip flat-file approach, skip generic Claude Code focus) + credit ใน Acknowledgements
- **Codex pattern triggered:** P-21, P-29

---

### 2026-06-20 — Session 4: Social Captions + GitHub Setup

- **Plan:** เขียน captions + สอน Tony setup GitHub repo
- **Win:**
  - 3 caption versions (long / punchy / visual)
  - 9-step GitHub setup ใช้ GUI (GitHub Desktop, no CLI)
  - Repo published: github.com/92foodlimited-BuilderCodex/builder-codex
- **Loss:**
  - เขียน CLI command แบบ Linux/Mac ก่อนถามว่า OS → Tony (Windows) ติด 30 นาที
  - ทำให้ต้องเสีย session สอน GUI alternative
- **Question → Decision:** เมื่อสอน CLI ควร default OS ไหน? → Decision: ถามก่อนหรือให้ทั้ง
  Windows + POSIX versions หรือ default GUI สำหรับ non-programmer
- **Pattern to promote:** "GUI-first instruction default" for non-programmer audience
- **Compound insight:** พี่ Tony ทำ end-to-end setup ผ่าน GUI ได้ใน 1 บ่าย —
  proves GUI approach viable for designer-builder audience

---

### 2026-06-20 — Session 3: Added Templates → v3.0.1

- **Plan:** เพิ่ม CAPTURE_LOG + DR_PLAN templates + คู่มือใช้งาน
- **Win:**
  - CAPTURE_LOG ใส่ 3 real examples → user เห็นรูปแบบจริง
  - DR_PLAN ครอบ 7 scenarios (machine destroyed → PDPA breach)
  - Bundle ครบพร้อม publish
- **Loss:** เริ่มทำ caption ก่อนถาม Tony ว่าจะ host bundle ที่ไหน — link ใน caption ยังเป็น [link]
- **Question → Decision:** Caption 3 versions พอไหม? → Decision: ส่งครบ 3 tone
  ให้ Tony เลือกใช้ตาม audience ของแต่ละ platform

---

### 2026-06-19 → 2026-06-20 — Session 2: Three-Tier Refactor → v3.0

- **Plan:** Refactor BUILDER_CODEX จาก 737-line single file → Three-Tier bundle +
  ship เป็น public repo สำหรับ vibe coder community
- **Win:**
  - Three-Tier architecture (AGENTS 87 / SKILL 5x / Codex 597) — match 2026 standards
  - 8 patterns ใหม่ (P-23..P-30) อุดทุก gap solo + non-programmer
  - 5 portable SKILL.md ที่ load on-demand
  - Integration กับ Linux Foundation AGENTS spec + Anthropic SKILL spec + GitHub Spec Kit
- **Loss:**
  - ส่ง CLI command แบบ Linux/Mac ก่อนถาม OS → Windows user ติด 30 นาที
  - First batch ของ skills/ ขาด verifying-ai-output ตอน download all → ต้อง re-send
- **Question → Decision:** Default audience of Codex อนาคต = Windows non-programmer หรือ
  POSIX dev? → Decision: dual examples เสมอ + ถาม OS ก่อน terminal command
- **Codex pattern triggered:** P-26 (context management ดี, แตก 3 session ไม่หลุด),
  P-29 (spec-driven workflow ทั้ง session — plan ก่อนเขียน)

---

### 2026-06-18 (est.) — Session 1: Reviewing Codex v2.0

- **Plan:** Review BUILDER_CODEX.md v2.0 (737 lines single file) ที่ Tony upload มา
- **Win:**
  - เห็น Codex v2.0 มี foundation แข็ง (P-01..P-22 from real incidents)
  - Identified gaps: file architecture, install friction, solo-specific patterns
  - เสนอ Three-Tier architecture ที่ match 2026 standards
- **Loss:** Nova ประเมิน scope initial ไม่ครบ — คิดว่าเป็น review เล็ก แต่กลายเป็น
  refactor ใหญ่ที่ต้อง multi-session
- **Question → Decision:** Refactor ทั้งหมดหรือแค่ patch? → Decision: refactor ทั้งหมด
  เพราะ single-file 737-line ไม่ scalable
- **Codex pattern nascent:** Compounding Loop concept ยัง germinate ใน session นี้

---

## Meta-Learnings Across Sessions (Compound Loop ระดับ meta)

### Patterns that recur ≥3 times across sessions (should promote to hard rules)

**1. Nova's "expand instinct" — ตัวปัญหาที่จับได้ 4-5 ครั้ง**
- Session 5b: File count 10 → 12
- Session 7: v3.1.0 30% larger than v3.0
- Session 8b: debugging-discipline first attempt 423 lines → had to condense
- Session 9: almost created AES (12-15 files, 80-150 pages)

**Pattern:** Nova ตกใน "adopt/expand instinct" ทุกครั้งที่เจอ material ใหม่
**Promoted to rule:** ก่อน adopt content จาก source ใหม่ — บังคับถามตัวเอง
"อันนี้ทำให้ Codex เล็กลงหรือใหญ่ขึ้น? ถ้าใหญ่ขึ้น → reject default"

---

**2. Tony's "let's-adopt-one-more" pattern**
- Session 3: v3.0 → v3.0.1 (add templates)
- Session 5: adopt somnus0x
- Session 6: consider adopt utarn
- Session 7: self-critique validates over-adoption
- Session 8: consider adopt concurrency
- Session 9: consider adopt AES

**Pattern:** Tony ชอบ import material ใหม่ = procrastination ที่รู้สึก productive
**Nova's job:** flag pattern นี้ทันที + redirect to execution

---

**3. Persona drift (Nova → "ผม")**
- Session 6: Tony flagged first time
- Session 8: recurred
- Session 9: no drift caught (self-fixed)

**Pattern:** Claude default → male voice ใน Thai casual → override Nova persona
**Correction:** ตรวจสรรพนามทุก turn — "เค้า/หนู" only

---

**4. Compounding Loop wasn't actually compounding**
- Sessions 1-9: Nova drafted captures every session
- Session 9: Tony asked "ต้องเอาไปเพิ่มที่ไหน?" → revealed no entries ever committed

**Pattern:** Codex talked about Compounding Loop but didn't dogfood it
**Correction:** THIS FILE = first real compound
**Lesson:** Documentation without persistence mechanism = performance not practice

---

**5. 🆕 Repo structure mischaracterized without reading it first**
- Maintenance session (2026-09-24): almost instructed Tony to overwrite the repo's
  `CAPTURE_LOG.md` (the reusable per-project template) with this file's content,
  based on a remembered label ("capture log") instead of reading the actual file

**Pattern:** even Nova, maintaining the Codex that OWNS P-32 (Structure-Read Gate),
nearly violated it on the Codex's own repo
**Correction:** fetched the real file before instructing any overwrite — caught the
mismatch, created this separate file instead
**Lesson:** P-32 applies recursively — "read the source before you move/replace it"
includes Codex's own meta-files, not just project code

---

## Recommendations for Nova (New Chat)

### Rules extracted from 9 sessions (for Nova ใน Sprint chat)

1. **Adopt-instinct check:** ก่อน adopt ใดๆ ถาม "อันนี้ ship revenue เร็วขึ้นหรือช้าลง?"
2. **Expansion audit:** ถ้า Codex/deliverable ใหญ่ขึ้นทุก session → red flag
3. **Persona check:** ตรวจสรรพนามทุก turn ทันที
4. **Dogfood check:** ถ้าเสนอ pattern → ต้อง apply กับตัวเองด้วย
5. **Panda check:** end of session ทุกครั้ง
6. **Real-world check:** Tony has toddler + businesses → time = family/kids first

### Patterns worth promoting to Builder Codex Pattern Library

Based on 4 recurring learnings above (P-32/33/34 in the list below were later reassigned
to Structure-Read/Encoding-Safe/Byte-Diff in v3.2.0 — these candidate labels are historical):

- **Growth Discipline (candidate, now proven):** "every addition to Codex must reduce
  something else" — validated for the first time in the 2026-09-24 maintenance session
- **Persistence Verification (candidate):** documentation ที่ไม่มี write mechanism
  = performance not practice
- **Persona Drift Detection (candidate):** for any AI collaborator persona,
  monitor default drift signals every turn

---

## Sprint Impact Statement (Session 9, historical)

**Before this consolidation:**
- Compounding Loop = concept in Codex docs
- Real evidence of loop working = zero (no entries committed anywhere)

**After this consolidation:**
- 10 captures committed to real file (this document)
- Meta-patterns emerged from analysis of captures
- Codex now has dogfooding evidence for community

---

*This log continues across Sprint work (see `SPRINT_CAPTURE_LOG.md` for the July 2026 content
sprint specifically) and Maintenance sessions (this Claude Project). New entries go directly
below "## Captures (Newest First)" — newest on top.*
