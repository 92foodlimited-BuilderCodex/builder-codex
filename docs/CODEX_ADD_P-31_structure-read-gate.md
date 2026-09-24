# Codex addition — P-31 + P-32 + Captures (DRAFT, human-edit before commit)

> **📍 Placement — this file splits into TWO destinations:**
> - **Part 1 (P-31 pattern) → the OTHER chat session that authors/maintains the BUILDER_CODEX skill** (the central `standards` repo). Hand it that markdown first; that session edits P-31 hard (per Codex rule: AI-drafted sections must be human-edited, cut anything not specific to the real lesson), then owns committing it to the standards repo + updating any AGENTS.md references. **Do NOT paste P-31 straight into the pippa repo.**
> - **Part 2 (Capture entry) → the pippa repo now.** Append it to `CAPTURE_LOG.md` at the pippa repo root. This one is project-local; Tony commits it with the B-1 work.

> Per BUILDER_CODEX §"กฎสำคัญที่สุด": this is AI-drafted from a real bug we just hit — the builder-codex session edits before it becomes canon.

---

## Insert into BUILDER_CODEX.md (after P-30)

#### P-31: Read the component before you move it (Structure-Read Gate)

**The bug pattern:** agent characterizes / relocates an existing component (tab, panel, function) from a *remembered label* — handoff summary, memory, stale doc — instead of reading its actual body. The label is wrong, and the component gets briefed into the wrong home.

**Real case (Pippa, 2026-07-20):** the "Safety" tab was labeled a *low-priority checklist* in the handoff. A brief was written to fold it into the Settings modal. Reading `renderSafetyTab()` showed it is a **live danger-sign triage screen** — fever / dehydration / GERD / abnormal-breathing checkers bound to real log data, with ER / 1669 escalation. Burying it two taps deep in Settings would have been a safety-relevant mistake. A 30-second read of the function surfaced it; the remembered label hid it.

**Rule:**
1. No spec/brief may **define, move, merge, or delete** an existing component until its **source body has been read this session**. Handoff / memory / doc labels are *pointers to read*, never substitutes for the read.
2. Every brief carries a **`Structure verified:`** header listing the functions / DOM read, with line numbers. A component the brief relocates that is **absent from that list = red flag** — reject the brief.
3. B-class briefs (those directing production structural change) are **"Costly to reverse"** → the source-read is mandatory, not optional.
4. **Temporal re-verify (drift over time, not just at authoring):** a brief written *before* a dependency brief merges must **re-read the affected structure AFTER the dependency lands** — behavior and line numbers drift. *Real case (Pippa, 2026-07-21):* B-2's radial shortcuts were specced to route through `activateLogChip('feed')`, valid on the clean base; but B-1 (merged first) added a `switchTab` guard that bounced `log`→home, so `activateLogChip` (which relies on a prior `switchTab('log')`) silently stopped showing the form. Only re-verifying B-2 against the post-B-1 file caught it. The `Structure verified:` header must state which commit/brief-state it was verified against.

**Ties back to:** Compounding Loop *Plan* step ("agent สำรวจ codebase เดิม... ไม่มี plan = ไม่เขียนโค้ด") and hard-task-protocol *"Read before write"* + anti-pattern *"Stale-context writes."* P-31 is the enforceable, auditable form of those.

**Cheap to run:** one `view`/`grep` per component before briefing. Skipping it costs a wrong-premise brief + a rebuild.

---

## Insert into BUILDER_CODEX.md (after P-31)

#### P-32: No-Regenerate / Encoding-Safe Edit Gate

**The bug pattern:** the agent regenerates (rewrites) a whole file instead of editing targeted regions. On a large UTF-8 file this corrupts everything at once — mojibake (Thai re-encoded to `α╕…`), dropped panels, wrong content — because the agent reconstructs from an incomplete/re-encoded memory of the file instead of surgically editing what is on disk.

**Tell (diagnostic):** multiple *unrelated* regions break at the same time in a UTF-8 file (e.g. a greeting **and** a triage card both turn to `α╕ü…`). Simultaneous multi-region breakage = regeneration/encoding, almost never a logic bug. A surgical change shows a small `git diff --stat`; a huge diff on a "small" task = a rewrite.

**Real case (Pippa, 2026-07-21):** an Antigravity "walkthrough" reported `index.html` with file-wide mojibake, a dropped `vaccine` tab, a deleted `#tab-health` panel, and a duplicate `</button>` — all four the signature of a full-file rewrite. Verifying `git status` + the real file showed the corruption **never landed on disk** (the report itself was unreliable). The clean re-run used **targeted `str_replace` edits only**: `git diff --stat` = 38 insertions / 28 deletions, mojibake = 0, all panels intact, 3 nav ids correct.

**Rule:**
1. **Targeted edits only — never regenerate a whole file.** Everything outside the edited regions must be byte-identical.
2. **Never change file encoding.** Text outside edited regions must not change at all.
3. **Mandatory evidence in the commit footer (raw output, not a summary):** `git diff --stat <file>` proportional to the change · a mojibake scan returning 0 (`[\u00e0-\u00ff]{3,}` outside Thai ranges) · a known non-ASCII string still readable · **HTML tag balance (`<div>`/`<section>` open-vs-close diff = 0)**.
   - **Toolchain gap found 2026-07-21:** `node --check` validates JS only — it cannot see a missing `</div>`. B-1b shipped with one unclosed `<div>`, which silently nested `#dashboard-modal` and `#settings-modal` *inside* `#emergency-modal`; browsers auto-corrected it, so nothing looked broken, but it is a latent z-index/backdrop/scroll-lock bug. **Any brief that moves HTML blocks must include a div/section balance check** (strip scripts/styles/comments first, then count).
4. **Never trust the agent's prose summary** — verify against `git status` / the real file. Reports can describe diffs that never hit disk.

**Ties back to:** Tony's standing rule *"อย่า regenerate ไฟล์ ใช้ str_replace แก้ทีละจุด"* and the Antigravity verification toolchain (extract JS → `node --check` → brace balance → byte diff). P-32 makes it an enforceable gate with mandatory raw-output evidence.

---

## Append to CAPTURE_LOG.md

## 2026-07-20 — Home Radial: nav restructure + Safety mischaracterized
- **Plan:** confirm Pump placement in migration map, write B-1 nav brief (8→3 tabs).
- **Win:** caught the Pump gap (was silently folded under Nutrition, now explicit radial + dashboard section). Verified Settings is a top-bar modal (not a tab) against real code before writing §1. TH emergency numbers verified via search, conflicting ones (poison 1367/1554, EMS 1646) flagged for pediatric gate instead of guessed.
- **Loss:** wrote B-1 folding "Safety" into Settings from a remembered handoff label ("C3 low-priority checklist") **without reading `renderSafetyTab()`** — it is actually a live triage screen with ER escalation. Violated hard-task-protocol "Read before write." Tony caught it, not verification.
- **Question → Decision:** how to stop label-driven briefs? → **New pattern P-31 (Structure-Read Gate):** read the component body before any brief that moves it; every brief carries a `Structure verified:` header with line numbers; absence of a relocated component from that list = reject. Safety re-scoped from "Settings group" → 🚨 **Emergency Hub** (triage + user-editable child contacts incl. blood type/allergies/backup relative + verified TH directory + non-Thai fallback), spec §5.1; hub full build = brief B-1b.

## 2026-07-21 — B-1 execute: regenerate scare + clean re-run
- **Plan:** run B-1 (nav 8→3 + 🚨 Emergency Hub shell) via Antigravity, verify, commit.
- **Win:** two Antigravity reports CONTRADICTED (one claimed `index.html` mojibake corruption; `git status` showed it untouched). Verified the real file + git → clean baseline, no corruption on disk. Re-run with a "targeted-edits-only" guardrail passed: surgical diff (38+/28−), mojibake=0, all panels intact, hub works via a runtime-move (`while(s.firstChild) appendChild` + `children.length===0` guard) + `renderSafetyTab()`. Independent verification also caught a latent **cross-brief** bug for B-1b: its static hub content would trip B-1's `children.length===0` guard and orphan the triage → B-1b must remove the runtime move and relocate statically.
- **Loss:** nearly acted on the first (false) corruption report and told Tony to `git restore` content that was never modified — averted only by verifying the real file/git first.
- **Question → Decision:** how to stop regenerate/encoding corruption + false self-reports? → **New pattern P-32 (No-Regenerate / Encoding-Safe Edit Gate):** targeted edits only; mandatory raw evidence (`git diff --stat` small + mojibake=0 + non-ASCII string intact); never trust prose summaries — verify against `git status`/the real file. Simultaneous multi-region breakage in a UTF-8 file = regeneration signature, not a logic bug.
