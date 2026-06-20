# Builder Codex
## Global Standard for AI-Native Solo / Small-Team Development

> **เอกสารหลัก** สำหรับทุกคนที่ build ด้วย AI 100% (vibe coding / agentic coding) — ข้าม project, ข้าม tech stack, ข้าม AI tool
>
> **เวอร์ชัน:** 3.0 (Solo-Survival Edition)
> **อัพเดทล่าสุด:** 2026-06-20
> **ที่มา:** สังเคราะห์จากบทเรียนจริงของ solo builder หลาย sprint + เทียบกับ 2026 standards (AGENTS.md Linux Foundation, Anthropic SKILL spec, Spec-Driven Development, Claude Code memory hierarchy) — ดู §10
> **Applies to:** ทุก project ที่ใช้ AI agent เขียนโค้ดเป็นหลัก — ไม่ว่าจะเป็น single-file app, multi-file repo, mobile app, หรือ cross-platform
> **เพิ่มใน v3.0:** Pattern P-23 → P-30 สำหรับ Solo Builder (hallucination, backup, cost, context, mobile, PDPA, spec workflow, AI reviewer) + Three-tier file architecture (AGENTS.md / SKILL.md / Codex master)

---

## 📖 วิธีใช้ Codex นี้

### Three-Tier File Architecture (สำคัญที่สุดใน v3.0)

ปี 2026 มาตรฐานวงการแยกหน้าที่ออกเป็น 3 ชั้น **ห้ามรวมเป็นไฟล์เดียว** เพราะ AI agent มี budget instruction ~150-200 ต่อ session ถ้าเกิน adherence จะตก:

| Tier | File | ขนาด | หน้าที่ | โหลดเมื่อไหร่ |
|---|---|---|---|---|
| **1** | `AGENTS.md` (หรือ `CLAUDE.md`) | <150 บรรทัด | Project context: build commands, conventions, ห้ามทำอะไร | Agent โหลด auto ตอนเปิด session |
| **2** | `SKILL.md` (per skill) | <500 บรรทัด/ไฟล์ | Portable capability ที่ใช้ซ้ำข้าม project (มี YAML frontmatter) | Agent โหลด on-demand เมื่อ task ตรง description |
| **3** | `BUILDER_CODEX.md` (ไฟล์นี้) | ~500 บรรทัด | Pattern library + checklist ระดับ global | Human อ่าน + Tier 1/2 อ้างกลับมา |

> **กฎเหล็ก v3.0:** Tier 1 ห้ามใหญ่ เพราะใหญ่ = agent ลืมกฎ Codex master (Tier 3) เป็น "หนังสือคู่มือเล่มหนา" ที่ Tier 1 ลิงก์มาเท่านั้น

### Storage Locations
- **Master copy:** GitHub repo "standards" central ที่ทุก project ลิงก์มา
- **Working copy:** วาง `AGENTS.md` ที่ root ของแต่ละ project — เครื่องมือ AI ส่วนใหญ่ (Claude Code, Cursor, Codex CLI, Gemini CLI, Windsurf, Aider, Devin, Jules) อ่านไฟล์นี้อัตโนมัติ
- **Skills folder:** `.skills/` หรือ `skills/` ใต้ root — แต่ละ skill เป็น 1 directory พร้อม SKILL.md

### When to Reference
- 🎯 **ก่อนสร้าง project ใหม่:** apply Three-Tier ตั้งแต่ day 1
- 🐛 **ตอนแก้ bug:** เปิด Pattern Library หา pattern ที่ match
- 🤖 **ตอนใช้ AI agent:** AGENTS.md โหลด auto + อ้าง "ตาม P-XX" ใน prompt
- 📋 **ก่อน deploy:** วิ่งผ่าน Pre-Deployment Checklist

### ⚠️ กฎสำคัญที่สุดของการเขียน Codex เอง

งานวิจัย 2026 ที่ทดสอบกับ repo จริง 138 โปรเจกต์: **context file ที่ AI generate เองทำให้ agent ทำงานแย่ลงและ token cost สูงขึ้น 20%** เพราะ agent จะทำตามคำสั่ง generic อย่างเคร่งครัด ทำให้ explore เกินจำเป็น

**กฎ:** Codex ทุก section ต้องเขียน/แก้โดยคนที่เจอ bug จริง ไม่ใช่ให้ AI generate "best practices" ทั่วไป ถ้า draft โดย AI → ต้อง edit เข้มงวด ตัดทุกอย่างที่ไม่ specific กับบทเรียนของตัวเองออก

---

## 🎯 Executive Summary

**ปัญหาที่ Codex แก้:**
> "AI agent ทุก session เริ่มจากศูนย์ — บทเรียนที่จ่ายแพงไปแล้วหายไปกับ session ก่อน"

**สำหรับ solo builder ที่ไม่ได้มาจาก programming:**
> "AI สร้างโค้ดที่ดูทำงานได้ — แต่หลังบ้านมี hallucination, ไม่มี backup, ไม่ผ่าน privacy law, ไม่รอด app store review, และเจ้าของไม่รู้ตัวจนกว่าจะ deploy"

Codex นี้คือชุด patterns ที่ทำให้:
1. ✅ ทุก silent failure ดังขึ้น — เจ้าของระบบเห็นก่อน user ร้อง (P-01, P-14)
2. ✅ บทเรียน 1 bug ไม่เกิดซ้ำข้าม project (Compounding Loop)
3. ✅ Credential/config rotation = แก้ที่เดียวไม่กระทบของเดิม (P-07)
4. ✅ Defense in depth — operation สำคัญมี backup layer เสมอ (P-22)
5. ✅ AI agent ตัวใหม่เข้าใจ context ได้ทันทีโดยไม่ต้องอธิบายซ้ำ (Three-Tier)
6. 🆕 **AI hallucination ถูกจับก่อน merge** (P-23)
7. 🆕 **Solo = single point of failure → backup เป็น default** (P-24)
8. 🆕 **Token cost ไม่บานปลายเงียบๆ** (P-25)
9. 🆕 **ผ่าน app store review + PDPA โดย design** (P-27, P-28)

---

## 🔄 The Compounding Loop — Core Operating Principle

> **กฎเหล็ก:** ทุก project, ทุก work cycle, ทุก agent session ต้องวิ่งผ่าน loop นี้

### โครงสร้าง 4 ขั้น: Plan → Work → Review → Compound

| ขั้น | สิ่งที่ทำ | กฎ |
|---|---|---|
| **1. Plan** | ก่อนเขียนโค้ด: agent สำรวจ codebase เดิม, เช็ค pattern ที่มีอยู่, อ่าน Capture Log, เขียน plan ว่าจะแก้ตรงไหน กระทบอะไร | **ไม่มี plan = ไม่เขียนโค้ด** ถ้า requirement ไม่ชัด ให้ถามก่อน ไม่ใช่เดาแล้วเขียน |
| **2. Work** | เขียนโค้ดตาม plan + เขียน test คู่ | Scope ตรงกับ plan เท่านั้น — เจอ scope เพิ่มกลางทาง pause + update plan ก่อน |
| **3. Review** | ทบทวนผลลัพธ์ + บทเรียน ไม่ใช่แค่เช็คว่า "รันได้" | **80% ของเวลาทั้ง loop = Plan + Review รวมกัน** Work เป็น 20% เพราะ AI เขียนโค้ดเร็วอยู่แล้ว |
| **4. Compound** | บันทึก Capture เข้า `CAPTURE_LOG.md` ที่ agent ครั้งหน้าอ่านได้จริง | ถ้าไม่บันทึก = ไม่ compound แค่ทำเร็วขึ้นแต่ไม่ฉลาดขึ้น |

> **"In compounding engineering, each feature should make the next easier — because the AI's knowledge of your codebase grows alongside its complexity."**
> **"Without Capture + Upgrade, no amount of AI makes you smarter — it just makes you repeat faster."**

### Capture Log Format

ไฟล์: `CAPTURE_LOG.md` ใน root ของแต่ละ project

```markdown
## YYYY-MM-DD — [หัวข้อ session]
- **Plan:** สิ่งที่ตั้งใจทำ (1 บรรทัด)
- **Win:** อะไรได้ผลดี / pattern ไหนใช้ซ้ำได้
- **Loss:** อะไรเสียเวลา / สมมติฐานไหนผิด
- **Question → Decision:** สงสัยอะไร → ตัดสินใจยังไง → เพิ่มเป็น pattern ใหม่ไหม
```

### Connecting Captures across Projects

```
Project Capture Logs ──→ Pattern recurs ≥2 ครั้ง ──→ Promote เข้า Builder Codex
        ↑                                                    │
        └──────────── Apply Codex กลับไปทุก project ─────────┘
```

---

## 🧠 Pattern Library

### Foundation Patterns (P-01 → P-08) — Network, Sync, Update

#### P-01: เช็ค response status ทุก network call ที่เขียนข้อมูล
อย่า catch แค่ network error — ต้องเช็ค HTTP status code ด้วย ไม่งั้น 401/403/500 จะเงียบ
```js
return fetch(url, {method:'PUT', body: data})
  .then(function(r){
    if (r.ok) return {ok:true};
    markFailedForRetry(id, 'http-'+r.status);
    return {ok:false, reason:'http-'+r.status};
  })
  .catch(function(e){ markFailedForRetry(id, 'network'); return {ok:false}; });
```

#### P-02: Mark & Retry pattern
ทุก sync data ต้องมี 3 functions: `markUnsynced`, `clearUnsynced`, `retryUnsynced` (เรียกตอน app start)

#### P-03: Visible state — every async needs UI feedback (3 state: info/success/danger)

#### P-04: Timestamp dual — `createdAt` + `syncedAt` (null จนกว่า push สำเร็จ)

#### P-05: Local timestamp sync after push — บันทึก `_configTs` กลับ local หลัง PUT สำเร็จ

#### P-06: Reload to sync — หลังเปลี่ยน config สำคัญ → แจ้ง user/admin ว่าเครื่องอื่นต้อง reload

#### P-07: Credential rotation procedure
1. สร้างของใหม่ที่ provider → 2. Test คู่กับของเก่า → 3. Update + push → 4. รอ sync → 5. Revoke ของเก่า
❌ **ห้าม:** Revoke ของเก่าก่อนทดสอบของใหม่

#### P-08: Auto-update mechanism (3 layers)
- `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`
- `APP_VERSION` + `APP_BUILD` constants
- `checkVersionFromCloud()` → `showUpdateBanner()` ถ้า version ใหม่กว่า

---

### Architecture & Sync Patterns (P-09 → P-14)

#### P-09: Background sync limitations
**ทำได้:** Retry on next app open, Service Worker + Background Sync API
**ทำไม่ได้:** Force pull จาก client ที่ปิดอยู่, Push notification ปลุก app โดยไม่มี server
→ ทางออก: Server-side dispatcher (ดู P-22)

#### P-10: Database rules — Whitelist approach
```json
{
  "rules": {
    "app_a": { ".read": true, ".write": true },
    "$other": { ".read": false, ".write": false }
  }
}
```

#### P-11: Don't hide secrets in client code
Client-side code ดูได้เสมอผ่าน DevTools — Security จริงมาจาก rules / server proxy / env var ฝั่ง server ไม่ใช่ซ่อน URL

#### P-12: Single source of truth = Git
1. Git repo = SOT ทุก project
2. ก่อนส่งงานให้ agent → pull จาก remote
3. หลัง agent เสร็จ → push ทันที
4. ห้าม 2 agent แก้ไฟล์เดียวกันพร้อมกัน

#### P-13: Hybrid/Layered Notification
Client-side ลองส่งทันที (instant) + Server-side cron worker หา `notified=false` ส่งซ้ำ (failsafe)

#### P-14: Telemetry First
3 ช่องทาง telemetry ขั้นต่ำ:
1. **Health ping** (interval ขณะ app เปิด) — ts, deviceId, appVersion, storageSize, unsyncedCount
2. **Error reporter** — `window.onerror` + unhandledrejection → POST stack trace
3. **Storage failure reporter** — เมื่อ localStorage quota exceeded

Admin view ต้องเห็น: Online/Idle/Offline per device, recent errors with stack, storage usage

---

### Robustness Patterns (P-15 → P-18)

#### P-15: Storage Budget Management
- `estimateStorageSize()` → คำนวณ KB ใช้อยู่
- `attemptStorageCleanup()` → keep newest N records
- Cap localStorage ทั่วไป 5-10 MB → keep margin ปลอดภัย < 4 MB

#### P-16: Verified Writes — fail loudly
`lsSet()` ต้อง return boolean — call site เช็คผลลัพธ์จริง ถ้า quota exceeded → cleanup แล้ว retry → ถ้ายังไม่ได้ → alert user

#### P-17: Element/Reference Cleanup Discipline
```bash
grep -rn "getElementById('elementId')" .   # ก่อนลบ element ใดๆ
```
ทุก `getElementById` → null-safe เสมอ:
```js
var btn = document.getElementById('btn');
if (btn) btn.style.display = 'none';
```

#### P-18: Active Polling — Admin/monitoring auto-refresh ทุก 30s, no-cache

---

### Process Patterns (P-19 → P-22)

#### P-19: Optional Actions = After confirmation, never before
ปุ่ม share/export/print ต้องอยู่ **หลัง** save ที่เป็น SOT เสมอ ไม่งั้นกดแล้ว main action หาย

#### P-20: Multi-AI / Multi-Agent Lockfile
`AI_LOCK.md` ใน repo — เช็คก่อนแก้ไฟล์, เพิ่ม entry พร้อม deadline, ลบเมื่อเสร็จ
**ส่วนขยาย:** feature-branch แยกต่อ feature + merge ผ่าน PR เท่านั้น

#### P-21: Don't over-architect — restore working systems first ⚠️
- **บางส่วนเสีย** → fix แค่ส่วนนั้น (ห้าม redesign ทั้งระบบ)
- **Architecture ไม่ดีจริงๆ** → re-design ตั้งใจ แยก sprint
- ❌ ไม่ใช่: patch ด้วย redesign แบบไม่ตั้งใจ

#### P-22: Defense in Depth — Multiple paths for critical operations
```
[Critical action]
├── Primary: Client-side (instant, fragile)
├── Secondary: Server cron (1 min, reliable)
└── Tertiary: Admin "ส่งซ้ำ" button
```
Coordination: single flag `notified: true/false` + atomic claim ก่อนส่ง

---

### 🆕 Solo Builder Survival Patterns (P-23 → P-30)

> Section ใหม่ใน v3.0 — เกิดจากบทเรียนของกลุ่ม vibe coder ที่ ship code โดย AI สร้าง 100% แล้วเจอปัญหาที่ผู้พัฒนาสาย programming ไม่ค่อยเจอเพราะมี discipline อยู่แล้ว

#### P-23: AI Hallucination Guardrails

**The bug pattern:** AI generate import ที่ไม่มีจริง / API method ที่ deprecated / library version ที่ไม่ตรงกับ docs จริง → โค้ดดู "เหมือนทำงาน" จนกว่าจะ run จริง

**Mandatory checklist ก่อน accept โค้ดจาก AI:**

```
[ ] ทุก import / require ตรวจมีอยู่จริงใน package registry (npm/pip)
[ ] ทุก API method ตรวจกับ docs ของ provider (ไม่ใช่ AI tell-me)
[ ] Run โค้ดอย่างน้อย 1 รอบใน sandbox ก่อน commit
[ ] Schema (Firebase rules, DB column, API response) ตรวจกับ source จริง
[ ] ถ้า AI อ้าง library ไม่คุ้น → search GitHub stars/last commit ก่อนใช้
```

**Automation pattern:**
```js
// CI step / pre-commit hook
// 1. npm ls --depth=0 → ตรวจ unused/missing dependencies
// 2. eslint no-undef → catch undefined functions
// 3. tsc --noEmit → catch type errors ที่ AI ละเลย
```

**กฎทอง:** ถ้า AI ตอบ "ตามปกติ library นี้จะ..." โดยไม่อ้าง docs URL จริง → **เป็นสัญญาณ hallucination 80%** ให้ถามต่อ "อ้างจาก docs ตรงไหน?"

#### P-24: Backup Discipline (Solo = Single Point of Failure)

**The bug pattern:** solo builder = ไม่มีทีม, ไม่มี company backup, เครื่องเดียวเสีย / SSD พัง / account ถูก ban → ทุก project หายพร้อมกัน

**3-2-1 rule สำหรับ solo builder:**
- **3** copies ของทุก project
- **2** ที่อยู่ต่างกัน (เครื่องตัวเอง + cloud git)
- **1** offline / off-region (external SSD / different cloud region)

**Mandatory weekly ritual:**
```bash
# ทุกศุกร์เย็น (cron หรือ calendar reminder)
# 1. Push ทุก local branch ที่ยัง dirty ขึ้น Git remote
git status --porcelain | wc -l   # ต้องเป็น 0 ทุก repo

# 2. Export Firebase/database snapshot
firebase database:get / > backup-$(date +%Y%m%d).json

# 3. Sync ไป external drive / different cloud
rsync -av ~/projects/ /Volumes/Backup/

# 4. Verify restore-ability: เปิด backup file สุ่มตรวจ
```

**Vendor lock-in risk:**
- ห้าม project ที่ critical ผูกกับ tool ที่ไม่มี export (Lovable, Bolt บางตัว, no-code ที่ไม่ export source)
- ทุก credential สำคัญต้องมีบันทึก recovery (2FA backup codes)
- Domain registrar คนละที่กับ hosting

#### P-25: Token/Cost Budget Monitoring

**The bug pattern:** vibe coder ไม่มี finance/ops คอยเตือน → ใช้ Claude/GPT/Cursor หนัก → เงินหมดเร็วกว่าที่คาด → middle-of-sprint ต้องหยุด

**Mandatory tracking:**
```
[ ] ดู cost dashboard ของทุก AI provider อย่างน้อย 1 ครั้ง/สัปดาห์
[ ] ตั้ง hard limit (budget alert ที่ provider) — 70% / 90% / 100%
[ ] บันทึก "cost per shipped feature" ลง Capture Log → หาแนวโน้ม
[ ] เมื่อ context > 60% → /compact (รายละเอียด P-26) อย่ารอเต็ม
[ ] Auto memory feature (Claude Code MEMORY.md) → ใช้แทนการอธิบายซ้ำ
```

**Cost discipline:**
- Spec-driven (P-29) ลด rework ลด token waste
- Skill loading on-demand (Tier 2) แทนยัด context ทั้งก้อน
- Model selection: ใช้ Haiku/Sonnet สำหรับงานเล็ก, Opus สำหรับ planning/review เท่านั้น

#### P-26: Context Management (Compact / Clear / Checkpoint)

**The bug pattern:** session ยาว → AI เริ่มลืมกฎ → start hallucinate / ทำผิด pattern เดิม / repeat คำถามที่ตอบแล้ว

**Threshold rules:**
- Token usage > **60%** → `/compact` ทันที (ไม่ใช่รอ 90%)
- เปลี่ยน major topic → `/clear`
- ก่อน destructive operation → save checkpoint (Claude Code auto, ที่อื่นใช้ Git commit)

**Recovery from clean context:**
- AGENTS.md ต้องครบพอที่ agent หลัง compact "เข้าใจทันที"
- ใช้ `@imports` ใน CLAUDE.md (Claude Code) — `@docs/architecture.md`, `@CAPTURE_LOG.md` — โหลด on-demand
- หลัง compact → agent อ่าน root file อีกครั้งเอง (Claude Code feature) → AGENTS.md ต้อง survive compaction

**Session structure ที่ได้ผล:**
```
1. เปิด session → agent อ่าน AGENTS.md + CAPTURE_LOG (3-5 entries ล่าสุด)
2. งาน 30-45 min → /cost ตรวจ → > 50k tokens → /compact
3. เปลี่ยน task → /clear
4. ปิด session → เขียน CAPTURE entry → commit
```

#### P-27: Mobile Store Submission Checklist (Play Store / App Store)

**The bug pattern:** vibe coder build app ลง store → reject ครั้งแรกเพราะลืม policy ที่ไม่เกี่ยวกับโค้ด → resubmit cycle 2-4 สัปดาห์

**Pre-submission gate:**
```
[ ] Privacy Policy URL พร้อม (public, ครอบคลุม data ที่ใช้จริง — ดู P-28)
[ ] Age rating ทำแบบ questionnaire ตรงตามเนื้อหา app
[ ] App icon ทุก size ครบ (Play: 512, App Store: 1024 + adaptive)
[ ] Screenshots ทุก device class ที่ support (phone, 7", 10" tablet)
[ ] Permission ทุกตัวมี justification ใน manifest description
[ ] In-app purchase test ผ่าน sandbox account ครบทุก SKU
[ ] Crash reporting active (Crashlytics/Sentry) ก่อน upload
[ ] Version code / build number monotonic increasing
[ ] Signing key backup เก็บที่ปลอดภัย (P-24) — หายแล้ว update ไม่ได้ตลอดชีวิต
[ ] Staged rollout: 10% → 50% → 100% (อย่า 100% รอบแรก)
```

**Content rules ที่ vibe coder มักลืม:**
- Apple: no AI-generated content ที่เป็น misleading/medical advice without disclaimer
- Google: data safety form ต้องตรงกับสิ่งที่ collect จริง (audit ได้)
- ทั้งสอง: ห้าม fingerprinting อุปกรณ์โดยไม่ disclose

**Update strategy:**
- Staged rollout เป็น default
- Force update mechanism (P-08) สำหรับ critical security fix
- Backward compat อย่างน้อย 1 version เก่า (user ที่ไม่อัพเดท)

#### P-28: PDPA / Data Minimization (Thai Market + Cross-border)

**The bug pattern:** vibe coder ใช้ Firebase region อะไรก็ได้, collect ข้อมูลทุกอย่างที่ AI generate, ไม่มี consent flow → ผิด PDPA → ปรับ 5M THB/ครั้ง + customer trust ตก

**Mandatory baseline:**
```
[ ] Data minimization: collect เฉพาะที่จำเป็นจริง (ไม่ใช่ "อาจใช้ในอนาคต")
[ ] Consent flow ก่อน collect — บันทึก timestamp + version ของ policy ที่ user accept
[ ] Right to access: user ขอ export data ของตัวเองได้ภายใน 30 วัน
[ ] Right to deletion: user request ลบ → ลบทั้ง active + backup ภายใน 30 วัน
[ ] Data residency: ข้อมูล sensitive (health, child, biometric) ใช้ region ที่ตรง PDPA (asia-southeast1 = Singapore เป็นที่ยอมรับ; us-central1 ต้อง DPA)
[ ] DPO (Data Protection Officer) ติดต่อช่องทางใน Privacy Policy
[ ] Breach notification: รั่ว → แจ้ง PDPC ภายใน 72 ชม.
```

**Special categories (PDPA มาตรา 26) — ต้อง explicit consent:**
- Health data (Pippa, Da'Neng Care = อยู่กลุ่มนี้)
- Biometric
- Genetic
- Children under 10 (parental consent)

**Consent log schema:**
```json
{
  "userId": "u123",
  "policyVersion": "2026.06.01",
  "consentItems": ["analytics", "marketing", "health_processing"],
  "timestamp": 1718888888,
  "ipAddress": "hashed",
  "withdrawnAt": null
}
```

**Cross-border (Firebase asia-southeast1 = Singapore):**
- Singapore ถือว่าเป็น "adequate" PDPA ภายใต้ PDPC interpretation → ใช้ได้แต่ต้อง disclose ใน privacy policy
- US region ต้องมี Standard Contractual Clauses (SCC) หรือ binding corporate rules

#### P-29: Spec → Plan → Tasks Artifacts (Spec-Driven Workflow)

**The bug pattern:** AI ทำตาม prompt แต่ drift ออกจาก intent — "ดูเหมือนถูก" แต่แก้คนละปัญหา ไม่มี artifact ที่จับต้องได้ระหว่างทาง → ไม่มีอะไรเทียบ

**2026 standard workflow** (GitHub Spec Kit, AWS Kiro, OpenSpec ใช้ pattern เดียวกัน):

```
/constitution  → กฎประจำ project (= AGENTS.md ของพี่)
/specify       → SPEC.md: requirement + acceptance criteria (GIVEN/WHEN/THEN)
/clarify       → ถามจน ambiguity หมด ก่อนเขียน plan
/plan          → PLAN.md: architecture decision + file ที่จะแก้
/tasks         → TASKS.md: atomic checklist
/analyze       → conflict / gap check
/implement     → เขียนโค้ด
/checklist     → review against spec
```

**Artifact files per feature:**
```
features/
  feature-XYZ/
    SPEC.md       ← what + why + acceptance
    PLAN.md       ← how + which files + side effects
    TASKS.md      ← atomic checkboxes
    REVIEW.md     ← post-implementation check
```

**OpenSpec 3-phase (ลด AI drift):**
- **Proposal** → SPEC + PLAN, ยังไม่เขียนโค้ด, human review ก่อน
- **Apply** → implement ตาม proposal
- **Archive** → merge แล้ว spec กลายเป็น part of canon

**สำหรับ solo builder:** ไม่ต้องครบทุก slash command — เริ่มจาก SPEC.md + TASKS.md ก็พอ แต่ต้องมี artifact ให้ AI อ้างกลับ ไม่ใช่ prompt-only

#### P-30: AI as Second Reviewer (แทน peer review)

**The bug pattern:** solo = ไม่มีคน review → bug ที่เกิดจาก blind spot ของตัวเองหลุดเข้า production

**Two-pass review pattern:**
```
Pass 1: AI agent #1 เขียนโค้ด
Pass 2: AI agent #2 (instance ใหม่, ไม่เห็น context การเขียน) review โดย:
  - อ่าน SPEC.md + Codex
  - diff โค้ดที่เพิ่ม/แก้
  - ตอบ 5 คำถามมาตรฐาน:
    1. Single source of truth ถูกรักษาไหม?
    2. มี duplicate logic กับที่มีอยู่แล้วไหม?
    3. Known bug pattern ใน Codex ถูก trigger ไหม? (P-XX)
    4. Edge case อะไรที่ spec ไม่ครอบแต่ควรครอบ?
    5. ถ้าให้ rate 1-10 ความเสี่ยง production = เท่าไหร่ + เพราะอะไร?
```

**Practical setup:**
- ใช้ Cursor + Claude Code (คนละ tool) → review ข้าม tool ลด blind spot ร่วม
- หรือ 2 instance ของตัวเดียวกัน ที่ instance #2 ไม่เห็น chat history ของ instance #1
- หรือ agent ที่ดูแลเฉพาะ review (BB-Skills `/bb-review`, Augment Code Review agent)

**กฎ:** Reviewer ห้ามเป็น AI ตัวเดียวกับที่เขียน + ห้าม share context window — ไม่งั้นมัน rationalize ของตัวเอง

---

## 📦 Standard Files for Every Project

```
{project_name}/
├── (source files ตาม stack)
├── README.md                 ← project นี้ทำอะไร / วิธี run / deploy
├── AGENTS.md                 ← Tier 1: agent entry point (<150 lines) — link มา Codex
├── CAPTURE_LOG.md            ← compounding loop captures
├── AI_LOCK.md                ← multi-agent coordination (P-20) — ถ้าใช้ agent หลายตัว
├── DEPLOY_CHECKLIST.md       ← pre-deploy (อ้างจาก Codex)
├── PRIVACY_POLICY.md         ← P-28 source of truth (ถ้ามี user data)
├── skills/                   ← Tier 2: portable skills (per project ที่ specific)
│   └── {skill-name}/SKILL.md
└── features/
    └── {feature-XYZ}/
        ├── SPEC.md           ← P-29
        ├── PLAN.md
        └── TASKS.md
```

> ไม่จำเป็นต้องมีทุกไฟล์ — เลือกตามความซับซ้อน project เล็กข้าม `AI_LOCK.md`, `skills/`, `features/` ได้

---

## ✅ Pre-Deployment Checklist

### Code Layer
- [ ] Response status check ทุก write (P-01)
- [ ] Mark & Retry ครบ (P-02)
- [ ] UI feedback ทุก async (P-03)
- [ ] Version + no-cache + auto-update (P-08)
- [ ] DB rules whitelist (P-10)
- [ ] Element refs null-safe (P-17)
- [ ] Health ping + error reporter (P-14)
- [ ] Defense in depth สำหรับ critical ops (P-22)

### 🆕 AI Output Quality (P-23)
- [ ] Imports ทุกตัวตรวจมีจริงใน registry
- [ ] API methods ตรวจกับ provider docs (ไม่ใช่ AI tell-me)
- [ ] Run + verify ใน sandbox อย่างน้อย 1 รอบ
- [ ] Lint + type check pass

### 🆕 Solo Survival (P-24, P-25)
- [ ] Git clean, push ทุก branch
- [ ] DB snapshot backup ล่าสุด < 7 วัน
- [ ] External backup verified restorable
- [ ] Cost dashboard checked สัปดาห์นี้

### 🆕 Mobile (P-27) — ถ้า submit store
- [ ] Privacy Policy URL live
- [ ] Permissions มี justification
- [ ] IAP sandbox tested
- [ ] Crash reporting active
- [ ] Signing key backup

### 🆕 Privacy (P-28) — ถ้ามี user data
- [ ] Data minimization audited
- [ ] Consent flow + log working
- [ ] Right to access/deletion implemented
- [ ] Data residency ตรง law

### Process
- [ ] Spec → Plan → Tasks artifacts ครบ (P-29)
- [ ] Second-pass AI review ทำแล้ว (P-30)
- [ ] CAPTURE_LOG updated

---

## 🧰 Debugging Toolkit

1. **Endpoint/connection config:** helper function build URL → คืนค่าจริง ไม่ใช่ null
2. **DB rules:** เปิด endpoint ตรงๆ → 401/403 = rules block (P-10)
3. **HTTP response จริง:** DevTools Network tab → request → response code
4. **Local storage:** `unsynced_*` keys ค้างไหม
5. **Console:** filter prefix `[Sync]` `[Notify]` `[Cleanup]` `[GlobalError]`
6. **Device/branch health card:** admin ดู ping + version + storage + errors
7. **Server worker logs:** provider dashboard ดู cron execution
8. 🆕 **AI hallucination check:** `npm ls` + `tsc --noEmit` + diff vs docs

---

## 🎓 Mantras

> **"Trust the data, not the silence."** Make the invisible visible — to the system owner first.

> **"Restore before redesign."** Don't rebuild what's working. Fix what's broken.

> **"Defense in depth — primary fast, secondary reliable."**

> **"Plan → Work → Review → Compound."** 80% of value is in Plan + Review. Work is fast because AI is fast.

> **"Without Capture + Upgrade, no amount of AI makes you smarter — it just makes you repeat faster."**

> **"Same interface, always."** Whatever changes underneath, consumers use the same entry point forever.

> 🆕 **"Solo = single point of failure by default. Backup is not optional — it's the job."**

> 🆕 **"If AI can't cite the docs URL, it's hallucinating 80% of the time."**

> 🆕 **"Specs are the new code. The code is just the output."**

---

## 📚 §10 — Acknowledgements & Source Synthesis

Codex v3.0 สังเคราะห์จาก:

1. **บทเรียนจริง** จาก production system ของ solo builder ที่ผ่าน deploy หลาย sprint — เป็นที่มาของ P-01 → P-22 และ Capture/Compound discipline ทั้งหมด

2. **2026 Industry Standards:**
   - **AGENTS.md** — Linux Foundation Agentic AI Foundation, MIT license, 60,000+ repos, 28+ tools รองรับ (Codex CLI, Cursor, Windsurf, Amp, Devin, Aider, Zed, Jules, VS Code, JetBrains Junie, Claude Code) — เป็นที่มาของ Tier 1 entry-point file
   - **SKILL.md (Anthropic Skills)** — open standard ปลายปี 2025, YAML frontmatter (name + description), body <500 lines, partners launch: Atlassian, Figma, Stripe, Notion — เป็นที่มาของ Tier 2 portable capability
   - **Claude Code Memory Hierarchy** — root + nested + `@imports` + auto memory + `/compact` `/clear` — เป็นที่มาของ P-26
   - **Spec-Driven Development** — GitHub Spec Kit (`/constitution`, `/specify`, `/plan`, `/tasks`, `/analyze`, `/implement`, `/checklist`), AWS Kiro, OpenSpec (52,100 stars, 3-phase state machine), BMAD, Tessl, BuildBetter BB-Skills — เป็นที่มาของ P-29
   - **Effective Harnesses for Long-Running Agents (Anthropic)** — initializer pattern, multi-session recovery — เป็นที่มาของ P-26 recovery section
   - **Compound Engineering methodology** — เป็นที่มาของ Plan → Work → Review → Compound 4-step

3. **Vibe Coding 2026 ecosystem research:**
   - Lovable, Bolt, Base44, FlutterFlow, Taskade Genesis — เป็นที่มาของ P-23 (hallucination), P-24 (vendor lock-in / backup), P-27 (mobile store)
   - 63% ของ vibe coding market ปี 2026 = non-developer — เป็นเหตุผลของ Solo Survival section ทั้งหมด

4. **Research insight (138 repos study, 2026):** AI-generated context files ทำให้ agent ทำงานแย่ลง + token cost สูงขึ้น 20% → เป็นที่มาของกฎ "Codex ต้องเขียนจากบทเรียนจริง"

5. **PDPA Thailand:** พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล 2562 + PDPC interpretation 2024-2026 + TPQI/DEPA DPO standards — เป็นที่มาของ P-28

Codex นี้เป็น **living document** — ต้องผ่าน Compounding Loop ของตัวเองเพื่อให้คุ้มค่าใช้งานในระยะยาว

---

## 📝 Changelog

| Version | Date | Highlights |
|---|---|---|
| **v3.0 (Solo-Survival Edition)** | 2026-06-20 | + Three-Tier file architecture (AGENTS/SKILL/Codex); + P-23 Hallucination Guardrails; + P-24 Backup Discipline; + P-25 Cost/Token Budget; + P-26 Context Management; + P-27 Mobile Store; + P-28 PDPA; + P-29 Spec-Driven Artifacts; + P-30 AI Second Reviewer; condensed P-01..P-22 to make room; expanded §10 with 2026 standards landscape |
| v2.0 (Global Edition) | 2026-06-19 | ตัดชื่อ app/ธุรกิจเฉพาะออก; 4-step Plan→Work→Review→Compound; §10 Acknowledgements ครั้งแรก |
| v1.0 | 2026-06-18 | รวม Compounding Loop 3-step; CAPTURE_LOG.md standard |
| Sync Codex 3.0 | 2026-06-18 | + P-21 + P-22 |
| Sync Codex 2.0 | 2026-06-18 | + P-13..P-20 |
| Sync Codex 1.0 | 2026-06-14 | Original P-01..P-12 |

---

🛠️ Stay safe, ship reliable, let nothing fail silently. Compound, don't repeat.
