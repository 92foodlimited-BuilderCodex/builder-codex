---
name: preparing-mobile-store-submission
description: Prepare an app for submission to Google Play Store or Apple App Store, covering policy compliance, asset requirements, signing, permissions justification, in-app purchase testing, and staged rollout planning. Use this skill before any first submission, before each major version submission, when adding new permissions, or when integrating in-app purchases. Reduces rejection cycles which typically cost 2-4 weeks each.
---

# Preparing Mobile Store Submission

> **Codex reference:** P-27 (Mobile Store Submission Checklist)
> **When to load:** ก่อน first submission, ก่อน major version, ก่อนเพิ่ม permission ใหม่, ก่อนเพิ่ม IAP
> **Cost of failure:** rejection = 2-4 สัปดาห์ต่อรอบ

## หลักการ

App Store review **ไม่ใช่ technical review** — เป็น **policy compliance check**

vibe coder ส่วนใหญ่ reject ครั้งแรกเพราะ:
- ลืม Privacy Policy URL
- Permission ไม่มี justification
- Data Safety form ไม่ตรงกับสิ่งที่ collect จริง
- Screenshots ไม่ตรงกับ feature จริง
- IAP test ไม่ครบ

**Reject cycle 1 ครั้ง = 2-4 สัปดาห์ + เสีย momentum**

## Pre-Submission Gate (ผ่านครบทุกข้อก่อน submit)

### A. Legal & Policy

```
[ ] Privacy Policy URL พร้อม + publicly accessible
[ ] Privacy Policy ครอบคลุม data ที่ collect จริง (ห้ามคัดลอกของคนอื่น)
[ ] Terms of Service URL (ถ้ามี payment / user-generated content)
[ ] Age rating ทำ questionnaire ตรงตามเนื้อหา
[ ] Disclosures ครบ: third-party SDK, ads, analytics
[ ] ถ้ามี user content → moderation plan + report button
```

**Pippa/Da'Neng Care specific** (health data + children):
- ต้องมี medical disclaimer ("ไม่ใช่ medical advice")
- ระบุชัดว่า data ของเด็กถูกจัดการยังไง (PDPA มาตรา 26)
- DPO contact ใน Privacy Policy

### B. Assets

| Asset | Play Store | App Store |
|---|---|---|
| App icon | 512x512 PNG + adaptive | 1024x1024 PNG (no alpha) |
| Feature graphic | 1024x500 PNG/JPG | - |
| Screenshots phone | min 2, max 8 (16:9 or 9:16) | 6.5" + 5.5" device sets |
| Screenshots tablet | 7" + 10" sets | 12.9" iPad set |
| Promo video | YouTube URL (optional) | App Preview (optional) |
| Short description | 80 chars | Subtitle 30 chars |
| Full description | 4,000 chars | Description 4,000 chars |

**Screenshot rules ที่ vibe coder ลืม:**
- ต้องตรงกับ feature ใน app จริง (ห้ามใส่ feature ที่ยังไม่ทำ)
- ห้ามใส่ price / promotion / "Editor's choice" badge
- ภาษาตรงกับ locale ที่ submit
- ห้ามใส่ device frame ที่เป็น competitor brand

### C. Permissions

ทุก permission ต้องมี:
1. **Justification ใน manifest description** (Android) / **NSUsageDescription** (iOS)
2. **In-app explanation** ก่อนขอครั้งแรก
3. **Graceful degradation** ถ้า user deny

```xml
<!-- Android — AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<!-- → ต้องอธิบายใน Data Safety form: "Take photos of baby for growth tracking" -->
```

```xml
<!-- iOS — Info.plist -->
<key>NSCameraUsageDescription</key>
<string>Take photos of baby for growth milestones — never shared without your permission</string>
```

**Common reject reasons:**
- Permission ที่ไม่ใช้จริงในโค้ด (ลบออก)
- Justification generic เกินไป ("for app features")
- ขอ permission ตอน app start (Android 13+ ต้องขอตอนใช้จริง)

### D. In-App Purchases

ก่อน submit:

```
[ ] ทุก SKU configure ใน console (Play Console / App Store Connect)
[ ] Tested ใน sandbox environment ด้วย test account
[ ] Test ทุก flow:
    [ ] Purchase สำเร็จ
    [ ] Purchase fail (network error)
    [ ] Purchase cancel
    [ ] Restore purchase (สำคัญสำหรับ Apple review)
    [ ] Refund handling
[ ] Receipt validation ที่ server (ไม่ใช่ client-only)
[ ] Subscription: trial → paid → cancel → restore flow ทดสอบครบ
```

**Apple specific:**
- ต้องมีปุ่ม "Restore Purchases" ที่เข้าถึงได้ง่าย — Apple จะ test ข้อนี้แน่นอน
- Subscription ต้องแสดง terms ก่อน purchase: price, period, auto-renewal
- ถ้ามี "consumable" → ต้อง support restore on new device

**Google specific:**
- ต้อง integrate Google Play Billing Library (ไม่ใช่ custom payment)
- Test license = NLP / Always approve in sandbox

### E. Crash Reporting & Telemetry

```
[ ] Crash reporting integrated (Crashlytics, Sentry, Bugsnag)
[ ] Test crash: trigger manual crash → verify report arrives
[ ] Error reporter for non-fatal exceptions
[ ] Performance monitoring (ANR detection สำหรับ Android)
[ ] Analytics ไม่ leak PII (no email/phone in event params)
```

### F. Signing & Versioning

```bash
# Android
[ ] Keystore backup ใน 3 ที่ (P-24)
[ ] Play App Signing enabled (Google manage key — recommended)
[ ] versionCode > previous build (monotonic)
[ ] versionName follows semver (1.2.3)

# iOS
[ ] Certificate not expired
[ ] Provisioning profile current
[ ] Build number > previous (monotonic)
[ ] Marketing version follows semver
```

### G. Data Safety / Privacy Form

**Play Console:**
```
Data Safety form ต้องตรงกับสิ่งที่ collect จริง
Google audit ได้ — ถ้าจับโกหก → ban
```

ตอบทุกข้อ:
- ข้อมูลอะไรที่ collect (personal info, financial, health, location, photos, etc.)
- เพื่ออะไร (app functionality, analytics, ads, fraud prevention)
- Share กับใคร (third-party SDK)
- Encrypted in transit? At rest?
- User ลบได้ไหม?

**App Store Privacy Nutrition Label:**
- Categories: Contact Info, Health & Fitness, Identifiers, Usage Data, etc.
- Linked to identity (yes/no)
- Used for tracking (yes/no)

### H. Content Rules ที่ AI-generated content ต้องระวัง

**Apple (เน้นแล้วใน 2025-2026):**
- AI-generated content ต้อง disclose
- ห้าม misleading medical advice / health claim
- AI chatbot ต้องระบุชัดเจนว่าเป็น AI
- ห้าม "image generation" feature ที่ไม่มี content filter

**Google:**
- AI-generated content ต้อง support reporting
- ห้าม fingerprinting อุปกรณ์โดยไม่ disclose
- Ads SDK ต้องประกาศใน Data Safety

## Submission Flow

```
1. Pre-submission gate (ครบทุกข้อด้านบน)
   ↓
2. Internal testing track (Play Console) / TestFlight (App Store)
   ↓ test 1 สัปดาห์ขึ้นไป
3. Closed testing (20+ testers สำหรับ Play)
   ↓
4. Production submission
   ↓
5. Staged rollout: 10% → 50% → 100%
   ↓ ดู crash rate + ratings ที่แต่ละ stage
6. Full rollout
```

**Staged rollout rules:**
- 10% → ดู 24-48 ชม. → ถ้า crash rate < 1% → next stage
- 50% → ดู 3-5 วัน → ถ้า rating > 4.0 → next stage
- 100% → monitor 1 สัปดาห์

ถ้า crash rate spike → halt rollout ทันที + fix + resubmit

## Update Strategy

```
[ ] Force update mechanism สำหรับ critical security fix (P-08)
[ ] Backward compat อย่างน้อย 1 version เก่า
[ ] Soft update prompt (ไม่บังคับ) สำหรับ minor version
[ ] Changelog ใน "What's new" — เขียนให้ user เข้าใจ ไม่ใช่ "bug fixes"
```

## Common Rejection Reasons + Fixes

| Reason | Fix |
|---|---|
| "Privacy Policy not accessible" | Host on stable URL (not Google Doc), test ใน incognito |
| "Permission not justified" | เพิ่ม in-app explanation ก่อนขอ + clearer manifest description |
| "Cannot restore purchases" (Apple) | เพิ่มปุ่ม Restore ใน Settings + test sandbox |
| "Misleading screenshots" | Match screenshots กับ feature จริง 100% |
| "Crashes on launch" | Test ใน lowest-spec device + slow network |
| "Data Safety mismatch" | Audit code + form ให้ตรง, update form ถ้าจำเป็น |
| "Age rating incorrect" | Redo questionnaire ตรงเนื้อหา app จริง |

## Pre-Submission Final Checklist

```
[ ] Test on 3 device classes: low-end Android, mid-range, latest
[ ] Test on slow network (throttle to 3G)
[ ] Test fresh install + update flow
[ ] Test all permission flows + denial paths
[ ] Test all IAP flows + restore
[ ] Privacy Policy URL live and accessible
[ ] Data Safety form audited vs code
[ ] Crash reporting verified working
[ ] Signing keys backed up (P-24)
[ ] versionCode/buildNumber incremented
[ ] Screenshots match real app feature
[ ] All review notes for reviewer (test account, etc.) prepared
```

## Reviewer Notes Template

Apple App Store + Play Console ให้ใส่ note สำหรับ reviewer — **ใส่ทุกครั้ง:**

```
Test account:
  email: reviewer@yourapp.com
  password: ReviewTest123!

How to test premium features:
1. Login with test account above
2. Premium SKUs are auto-granted in sandbox
3. Test IAP flow: Settings > Subscription

Special notes:
- This app handles health data for newborns (PDPA-compliant)
- All AI-generated content has medical disclaimer
- DPO contact: dpo@yourcompany.com

If any issue, please contact: dev@yourcompany.com
```

## Post-Submission Monitoring

Day 1-7:
- Crash rate (Firebase Crashlytics dashboard)
- ANR rate (Android only)
- 1-star reviews (respond ทุก review)
- Rating trend

If crash rate > 2% in 24 hours → **halt rollout** → hotfix → re-submit
