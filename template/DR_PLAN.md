# Disaster Recovery Plan — [Project Name]

> **Codex reference:** P-24 (Backup Discipline)
> **Skill reference:** `skills/backing-up-solo-projects/SKILL.md`
> **Last reviewed:** YYYY-MM-DD
> **Next review due:** YYYY-MM-DD (3 เดือนถัดไป)
> **RTO target:** [Recovery Time Objective — กลับมา online ภายในกี่ ชม.]
> **RPO target:** [Recovery Point Objective — ยอมเสีย data กี่ ชม./วัน]

---

## Critical Assets Inventory

ตอบคำถาม: ถ้าทุกอย่างหายตอนนี้ ต้องการอะไรเพื่อ rebuild?

| Asset | Location (primary) | Backup #1 | Backup #2 | Recovery contact |
|---|---|---|---|---|
| Source code | GitHub `owner/repo` | GitLab mirror | External SSD | github.com support |
| Database (live) | Firebase `project-id` | Weekly JSON export → cloud drive | Monthly snapshot → SSD | Firebase support |
| Signing key (Android) | Play App Signing (Google manages) | .p12 backup ใน 1Password | Encrypted backup ใน external SSD | Play Console support |
| Signing key (iOS) | App Store Connect | .p12 backup ใน 1Password | Encrypted backup ใน external SSD | Apple Developer support |
| Domain | Registrar A | (น่าจะมี alternate registrar account) | Domain transfer auth code ใน 1Password | Registrar support |
| `.env` / Secrets | 1Password vault `[Project] Prod` | Encrypted file ใน cloud drive | Printed paper ใน safe | n/a |
| 2FA backup codes | 1Password | Printed paper ใน safe | n/a | Each service individually |
| Analytics / Telemetry | Firebase Analytics + custom DB | Weekly export | Monthly aggregate | n/a |
| User uploads (storage) | Firebase Storage | Quarterly bulk download | n/a | Firebase support |

---

## Disaster Scenarios

### Scenario 1: Local development machine destroyed

**Trigger:** SSD พัง / ขโมย / น้ำท่วม / ไฟไหม้

**Recovery steps:**
1. หา device ใหม่ (เครื่องสำรอง / ซื้อ / ยืม)
2. Install development environment:
   ```
   - Git
   - Node.js v20+ (หรือ version ที่ project ใช้)
   - Firebase CLI: `npm i -g firebase-tools`
   - Code editor (VS Code / Cursor)
   - AI agent CLI: claude-code, cursor, codex
   ```
3. Restore credentials:
   - Login 1Password → ดึง `.env` + 2FA codes
   - Login GitHub → restore SSH key (จาก 1Password)
4. Clone repo: `git clone git@github.com:owner/repo.git`
5. Setup: `npm install && cp .env.example .env` → fill จาก 1Password
6. Test connection: `npm run dev` → verify Firebase + APIs
7. Verify last commit ตรงกับที่จำได้

**RTO:** 4 ชม. (ถ้ามีเครื่องสำรอง) / 1-2 วัน (ถ้าต้องซื้อใหม่)
**RPO:** 0 (ถ้า push ทุก commit) / สูงสุด 1 วัน (worst case)

---

### Scenario 2: GitHub account banned / suspended

**Trigger:** Account ถูก flag → suspend → ไม่มี backup remote

**Mitigation (เตรียมก่อน):**
- Setup GitLab mirror remote: `git remote add gitlab git@gitlab.com:owner/repo.git`
- Push ทุก main branch ไปทั้งสอง: `git push origin main && git push gitlab main`
- หรือ cron weekly: mirror sync GitHub → GitLab

**Recovery steps:**
1. ยืนยันว่าเป็น GitHub suspension จริง (ไม่ใช่ outage):
   - https://www.githubstatus.com
   - ลอง login ใน incognito
2. ติดต่อ GitHub support พร้อม account info — มักได้รับการพิจารณาภายใน 24-72 ชม.
3. ระหว่างรอ — switch primary remote ไป GitLab:
   ```bash
   git remote set-url origin git@gitlab.com:owner/repo.git
   git push origin main
   ```
4. Update CI/CD pipeline ที่ผูกกับ GitHub:
   - Cloudflare Pages → connect repo จาก GitLab
   - GitHub Actions → migrate ไป GitLab CI
5. Update collaborators (ถ้ามี) ให้รู้ remote ใหม่

**RTO:** 4-8 ชม. (ถ้าเตรียม mirror ไว้แล้ว) / 2-3 วัน (ถ้าไม่ได้เตรียม + ต้อง wait support)
**RPO:** 0 (mirror sync ทุก push)

---

### Scenario 3: Firebase project deleted / corrupted

**Trigger:** Accident delete / billing issue / region outage ยาว

**Recovery steps:**
1. ตรวจสาเหตุ — billing ก่อน, ดู Firebase status
2. ถ้า project หายจริง:
   - สร้าง Firebase project ใหม่ ใน region เดิม (`asia-southeast1` สำคัญถ้ามี PDPA constraint)
   - Restore database จาก backup ล่าสุด:
     ```bash
     firebase database:set / weekly-backup-YYYYMMDD.json --project NEW_PROJECT
     ```
   - Restore Storage (ถ้าทำ bulk download ไว้):
     ```bash
     gsutil -m cp -r ./storage-backup/ gs://NEW_PROJECT.appspot.com/
     ```
   - Re-apply security rules: `firebase deploy --only database,storage`
3. Update `.env` ใน production:
   - `FIREBASE_PROJECT_ID=new-project-id`
   - `FIREBASE_API_KEY=...`
4. Deploy app: `npm run build && firebase deploy --only hosting`
5. แจ้ง user ถ้ามี data loss (ตาม PDPA breach notification — ดู skill `complying-with-thai-pdpa`)

**RTO:** 6-12 ชม.
**RPO:** สูงสุด 7 วัน (depends on backup frequency)

**Mitigation ที่ลด RPO:**
- เพิ่มความถี่ backup (daily → hourly สำหรับ critical data)
- ใช้ Firestore (มี point-in-time recovery built-in) สำหรับ data สำคัญ

---

### Scenario 4: Android signing key lost — CANNOT FULLY RECOVER

**Trigger:** Keystore file หาย + ไม่ได้เปิด Play App Signing

**Impact:** **ไม่สามารถ update app เดิมตลอดชีวิต** ต้องสร้าง app ใหม่ใน Play Console = เสีย:
- User ทั้งหมด (ต้อง install ใหม่)
- Rating + review (เริ่มจาก 0)
- Search ranking
- Install base history

**Recovery steps:**
1. ยอมรับว่า app เดิมตายแล้ว
2. สร้าง app ใหม่ใน Play Console (package name ใหม่หรือเดิม)
3. **เปิด Play App Signing เลยรอบนี้** (Google จัดการ key ให้)
4. แจ้ง user ผ่าน:
   - Email marketing list
   - Notification ใน app เก่า (ถ้ายัง deploy ได้)
   - Social media
5. Migration plan สำหรับ user data:
   - Export account → import ใน app ใหม่
   - หรือ sign-in ด้วย email/Google เหมือนเดิม → data follow

**Lesson:** **ใช้ Play App Signing เสมอ** สำหรับ app ใหม่ ไม่มีข้อยกเว้น

**Prevention:**
- Backup keystore ใน 3 ที่ทันทีหลังสร้าง (P-24)
- Document keystore password ใน 1Password (อย่าจำในหัว)
- ทดสอบ restore keystore quarterly

---

### Scenario 5: Domain registrar locked / lost

**Trigger:** Account suspend / payment issue / registrar bankrupt

**Mitigation (เตรียมก่อน):**
- Auto-renew enabled + payment card not expired
- Domain transfer auth code (EPP code) เก็บใน 1Password
- Contact info อัพเดท
- Registrar lock disabled (ระวังการขโมย แต่ก็ไม่ block legitimate transfer)
- รู้ว่าจะย้ายไปที่ไหน (alternate registrar account พร้อม)

**Recovery steps:**
1. ติดต่อ registrar support พร้อม proof of ownership
2. ถ้า resolve ไม่ได้ใน 48 ชม. → initiate domain transfer:
   - Unlock domain
   - Get EPP code
   - Initiate transfer ที่ registrar ใหม่
   - Approve email verification
   - Transfer ใช้เวลา 5-7 วัน
3. ระหว่างรอ — temporary domain หรือ subdomain ของ hosting:
   - `myapp.firebaseapp.com` หรือ `myapp.pages.dev`
   - แจ้ง user ผ่านช่องทางอื่น

**RTO:** 5-7 วัน (transfer takes time)
**Mitigation:** **Domain + hosting ห้ามใช้ vendor เดียวกัน** — ถ้า vendor นั้นมีปัญหา = หายทั้งคู่

---

### Scenario 6: AI provider account suspended (Claude/OpenAI/Cursor)

**Trigger:** Billing issue / policy violation flag / account compromise

**Impact:** AI workflow หยุด — แต่ deployed app ยัง run ปกติ

**Mitigation (เตรียมก่อน):**
- Active account ใน AI provider อย่างน้อย 2 ตัว (Claude + Gemini หรือ Claude + GPT)
- Backup payment method
- Codex + skills ทั้งหมด commit ใน Git (ไม่ใช่อยู่ใน AI provider memory เท่านั้น)

**Recovery steps:**
1. ติดต่อ provider support
2. Switch ไป provider สำรองสำหรับ active work:
   - Cursor → Windsurf
   - Claude Code → Codex CLI / Gemini CLI
   - Copilot → Continue.dev
3. Resume work ผ่าน AGENTS.md + skills (ที่ portable ข้าม tool — นี่คือเหตุผลที่ใช้ AGENTS.md spec)

**RTO:** 1-2 ชม. (switch tool) — workflow ไม่หยุด
**Lesson:** เหตุผลที่ต้อง portable standards (AGENTS.md, SKILL.md) — vendor lock-in คือ risk จริง

---

### Scenario 7: PDPA breach detected

**Trigger:** ข้อมูล user รั่ว / unauthorized access / leak ผ่าน log

**Recovery steps (ตาม PDPA มาตรา 37):**
1. **ภายใน 1 ชม.** — Contain:
   - Identify breach vector
   - Rotate credentials ที่เกี่ยวข้อง (P-07)
   - Disable affected endpoints/features
2. **ภายใน 24 ชม.** — Assess:
   - ข้อมูลอะไรรั่ว
   - User กี่คน affected
   - Risk level (high/medium/low)
3. **ภายใน 72 ชม.** — Notify (mandatory):
   - แจ้ง PDPC ผ่าน online form
   - แจ้ง affected user (ถ้า risk สูง)
   - เปิดเผยใน Privacy Center ของ app
4. **ภายใน 30 วัน** — Remediate:
   - Forensic report
   - Process improvement
   - Public disclosure (ถ้ากระทบกว้าง)

**Resources:**
- Skill: `complying-with-thai-pdpa`
- PDPC form: https://www.pdpc.or.th
- DPO contact: [your DPO email]

---

## Recovery Drills (Quarterly — ทำจริง ไม่ใช่อ่านอย่างเดียว)

ทุก 3 เดือน — เลือก 1 scenario มาทดลอง:

```
Q1: Scenario 1 (machine destroyed) — simulate ด้วย เครื่องที่ 2 / VM
Q2: Scenario 3 (Firebase restore) — restore ลง test project + verify
Q3: Scenario 4 keystore — verify keystore ใน 3 ที่ + password ใช้ได้
Q4: Scenario 5 (domain transfer) — ทดสอบ EPP code + alternate registrar login
```

**ผลลัพธ์:** จด finding ลง CAPTURE_LOG + update plan นี้ที่ส่วนที่ไม่ work

---

## Plan Hygiene

- [ ] Review ทุก 3 เดือน (เปลี่ยน "Next review due" ด้านบน)
- [ ] Update Inventory ทุกครั้งที่เพิ่ม service ใหม่
- [ ] Test scenario อย่างน้อย 1 ตัว/quarter
- [ ] Backup contact list (registrar, hosting, provider support emails)
- [ ] Print plan นี้เก็บ offline 1 copy (ป้องกัน case ทุกอย่าง digital หาย)

> **Reality check:** Plan ที่ไม่เคย test = ไม่ใช่ plan แค่เป็น wishful thinking
