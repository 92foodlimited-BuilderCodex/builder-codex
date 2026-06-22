# [Project Name] — [one-line goal]

> **File job:** Project-level save point — survives `/clear`, `/compact`, crash, new session
> **Loaded:** AI agent reads at session start, updates after every task
> **Different from `features/XYZ/SPEC.md`:** spec.md = project-level state / SPEC.md = per-feature requirement
> **Adopted from:** `somnus0x/agt-skill-pack/claude-md-setup` — Layer 3

---

## Architecture

> What components exist, how they connect, what tech each uses
> **Actual current shape of the system, not a wishlist**

```
[Component A] ─── [Component B] ─── [Component C]
   ↓                  ↓                  ↓
[Tech stack]      [Tech stack]      [Tech stack]
```

Example:
- **Frontend:** Single-file HTML/JS (vanilla, no build)
- **Database:** Firebase Realtime Database (asia-southeast1)
- **Notification:** Telegram Bot API via Cloudflare Workers
- **Auth:** Firebase Auth (email + Google sign-in)
- **Hosting:** Cloudflare Pages (auto-deploy from main branch)
- **Analytics:** Firebase Analytics + custom event log

---

## Done

> What's built — **and the decisions behind it**
> Not "added auth" but "added auth via X because Y, rejected Z"
> The *why* is the part the next session can't reconstruct from code alone

### YYYY-MM-DD: [Feature/decision name]
- **What:** [what was built/decided in 1 sentence]
- **Why:** [reasoning + alternatives considered]
- **Rejected:** [option not taken + why]

### Example entries:

#### 2026-06-22: Telegram-only notification (rejected FCM)
- **What:** ใช้ Telegram Bot สำหรับ branch notification ทั้งหมด
- **Why:** Branch staff ใช้ Telegram อยู่แล้ว, no install friction, cheap ($0/month for current scale), reliable
- **Rejected:** Firebase Cloud Messaging — ต้อง install app + handle notification permission flow ที่ user มักปฏิเสธ; ROI ไม่คุ้ม

#### 2026-06-20: Single-file HTML architecture
- **What:** ทุก feature อยู่ใน 1 HTML file
- **Why:** Solo maintenance cost ต่ำสุด, no build step, deploy = git push, AI agent อ่านไฟล์เดียวเห็นทุก context
- **Rejected:** React + Vite — overhead เกิน scale ปัจจุบัน + AI ต้อง track หลายไฟล์ = context cost สูง

---

## Todo / Out of Scope

> Backlog updated every task
> **Include what's deliberately NOT being built** — so AI ไม่ "helpfully" สร้างเพิ่ม

### In progress
- [ ] [current active task]

### Next up (priority order)
- [ ] [task 1]
- [ ] [task 2]
- [ ] [task 3]

### Backlog (no priority yet)
- [ ] [idea 1]
- [ ] [idea 2]

### 🚫 Out of Scope (do NOT build)
- ❌ [feature X] — เหตุผล: complexity ไม่คุ้ม current scale
- ❌ [feature Y] — เหตุผล: ต้องรอ data ก่อนตัดสินใจ
- ❌ Multi-language UI (อังกฤษ + ไทย) — เหตุผล: target audience Thai only

---

## Current State

> **🎯 SAVE POINT — section ที่สำคัญที่สุด**
> "ตอนนี้ทำอะไรอยู่ / ติดตรงไหน / step ต่อไปคืออะไร"
> AI agent ใหม่ที่อ่าน section นี้ ต้อง resume งานได้ทันที

### What I'm doing right now
[1-2 sentences about current task in concrete terms]

### Where I'm stuck (if applicable)
[specific blocker, last thing tried, hypothesis about cause]

### Next concrete step
[the EXACT next action to take — not "improve X" but "edit file Y line Z to do A"]

### Context AI needs to know
- [relevant decision made in current session]
- [assumption being tested]
- [files currently being modified]

### Example:

```
What I'm doing right now:
  Refactoring PuffStick FC order submission to handle VAT field that
  POS v9 sends but FC v3.3.2 doesn't expect.

Where I'm stuck:
  Schema mismatch — POS sends `{vat: number}` but FC expects
  `{tax: number}`. Both teams ตัดสินใจไม่ได้ว่าจะ unify ฝั่งไหน.

Next concrete step:
  Wait for Tony decision (ฝั่ง FC update หรือ ฝั่ง POS update).
  Meanwhile: write adapter function in `submitOrder()` ที่ accept ทั้ง 2 fields,
  log warning when both present.

Context AI needs to know:
  - VAT structure decided 2026-06-15 ใน Capture Log entry
  - submitOrder() function อยู่ที่ line 1247 ของ index.html
  - Adapter approach = temporary, ไม่ใช่ permanent fix
```

---

## Data Contracts

> Interfaces between components — AI **must not change** without flagging
> Update เมื่อ interface เปลี่ยน + log MEMORY.md

```
- API response:        { id: string, status: "ok" | "error", data: T }
- Frontend → backend:  { userId: string, action: string, payload: object }
- DB write:            { ts: number, deviceId: string, data: object }
- External webhook:    { event: string, data: object, signature: string }
```

> ดู AGENTS.md § Data Contracts สำหรับ project-specific contracts

---

## Maintenance Rules

### AI Updates Required After:
1. ✅ Completing any task → update Done + Current state + Todo
2. ✅ Making architectural decision → update Architecture + Done (with why)
3. ✅ Discovering a constraint → update Out of Scope
4. ✅ Changing interface → update Data Contracts

### Human Updates Recommended:
- Weekly review: clean up Current State, archive completed Done entries older than 1 month
- Monthly: verify Architecture section matches reality (drift happens)
- Quarterly: review Out of Scope — anything graduate to in-scope?

---

## Anti-patterns (ห้าม)

- ❌ ใช้ spec.md เป็น diary / changelog → use Git history แทน
- ❌ ใส่ feature requirement ละเอียด → ใช้ features/XYZ/SPEC.md แทน
- ❌ ใส่ technical pattern / debugging tip → ใช้ BUILDER_CODEX.md
- ❌ ใส่ AI operational mistake → ใช้ MEMORY.md
- ❌ Current State ที่เป็น "improve UX" หรือ "make better" — ต้อง concrete file/line/action
- ❌ Done section ที่ไม่มี "why" — เก็บ what โดยไม่มี reasoning = next session reconstruct ไม่ได้

---

> **Mental model:** spec.md = "save game ก่อน quit"
> ก่อนปิด session ต้อง update Current State + Done
> เปิด session ใหม่ อ่าน spec.md → continue ทันทีโดยไม่ต้อง re-explain
