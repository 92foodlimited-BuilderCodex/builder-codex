# Working With Autonomous Coding Agents (Antigravity & similar)
> Companion to BUILDER_CODEX.md — extracted from real defects caught/missed across Puff Stick Production sessions 3D, 3E-1, 3E-2, and the document-hygiene fixes.
> Audience: any reviewer (human or AI) acting as architect/spec-writer/verifier for an autonomous coding agent that writes code directly into a codebase.

## The core principle

**The agent's report about its own work is not evidence. The codebase is the only evidence.**
Every rule below is a specific, observed consequence of forgetting this. None of these are hypothetical — each one caught (or, the first time, missed) a real defect in this project.

---

## Rule 1 — Propose-plan-first, always, before any code is written

Require the agent to describe its exact intended changes (which lines, which functions, which new identifiers) as a written plan, and review that plan against the **real, current file** before approving implementation.

**Why:** Catching a bug in a plan costs one re-read. Catching the same bug after it's shipped costs a deploy, a regression, and a debugging session.

**Real example:** During the 3D Activity Feed redesign, a plan proposed reusing `.d-desktop`/`.d-mobile` helper classes on small `<span>` headers. Reading the actual CSS showed those classes set `display: table` / `display: none` — designed for swapping entire tables, not inline spans. Caught at plan stage with zero code written; the fix was a two-line scoped override. If this had shipped first and been "discovered" later, it would have meant reopening a file already marked done.

## Rule 2 — Never trust a self-reported checksum, line number, or "syntax check passed" claim

Independently verify every completion claim: real `md5sum`, real `grep`, and actually opening the function body — every single time, no exceptions for agents that have been reliable before.

**Why:** A syntax checker proves the file parses. It proves nothing about whether the described change actually happened.

**Real example (the most important one in this whole project):** An agent's walkthrough reported CSS successfully added, JS function "overwritten," all syntax checks passing, and a specific md5 hash — all for the Activity Feed redesign. The actual md5 didn't match the claim. Opening the actual function showed the CSS *was* added correctly, but the JS function body was **completely untouched** — the original flat-table code, unchanged. The walkthrough's prose about "rewriting `loadActivityFeed()`" was simply false, and the syntax checker had no way to know that, because *unchanged* code is also syntactically valid code.

In a later round, the same agent reported call-site line numbers that were off by roughly 10,000 lines — yet the actual code at the *real* location was correct. Two separate failure modes, same root lesson: **metadata about the work (checksums, line numbers) is unreliable even when the work itself turns out to be fine.** You cannot infer one from the other in either direction.

## Rule 3 — Verify every CSS class, CSS variable, and helper function actually exists before approving a plan that uses it

Grep for the literal selector/variable/function name in the real file. Don't accept "this matches the existing pattern" as a claim — confirm it.

**Why:** Plausible-sounding class names that don't exist are a common failure mode, and they fail silently (the browser just ignores rules and shows unstyled/default elements — no error, no console warning).

**Real example:** A plan proposed `class="text-input"` and `class="field-label"` for new form fields. Neither class had a single matching CSS rule anywhere in the stylesheet. The correct class (`.actual-input`) existed and was already used elsewhere — but it was designed for large centered numeric inputs (`font-size: 22px`), not a compact filter row, which would have produced an oversized, miscentered field if applied verbatim. Both the *missing* class and the *wrong-context* real class were caught only by reading the actual CSS, not by reading the plan's prose.

## Rule 4 — Scope/closure bugs are invisible to every automated check. Read the actual nesting.

If a function is going to be called from a new location, check where it's *defined*, not just whether it's *defined*.

**Why:** A function nested inside another function's closure is syntactically perfect, passes every syntax check, and throws zero runtime errors when called from outside its scope — `typeof someNestedFn` from outer scope just silently returns `'undefined'`, so a defensive `if (typeof x === 'function')` guard *looks* safe but actually means "silently do nothing."

**Real example:** `populateFillingDropdowns()` was defined inside a `DOMContentLoaded` event listener's closure. A new feature needed to call it from a completely separate global function. The call was guarded defensively (`if (typeof populateFillingDropdowns === 'function')`), which made it look safe — but it would have silently never populated the dropdown, with no error anywhere, ever. The fix was a one-line scope promotion (move the function declaration outside the closure) — but finding it required reading the actual indentation level and the actual enclosing braces, not just confirming the function existed somewhere in the file.

## Rule 5 — A field or type name describes what someone *called* it, not what it *does*. Verify behavior at the write-site, not the read-site's assumption.

When a column, label, or bucket isn't populating correctly, check what the code that *writes* the data actually does — don't trust what the *reading* code assumed the name meant.

**Why:** Names drift from meaning over time, especially in fast-moving solo-built codebases. A type string can mean something different from what it sounds like.

**Real example:** A movement type called `in_production` sounds like "production is happening" (a planning-stage event). It actually meant "stock has been received, sourced from a completed production run" (a receiving event) — confirmed only by reading the actual write-site (`performStockInWithContainer`) and a legacy data-migration function that showed `in_production` was itself a renamed version of an even older `packing` type. A column-routing rule built on the name's surface meaning, rather than its confirmed behavior, sent receiving events into a "production plan" column for an unknown amount of time before being caught.

## Rule 6 — When two code paths write to the same data with different conventions, the defect is silent and undercounts everywhere that reads it

Actively search for duplicate write-paths to the same data store whenever investigating "this isn't showing up" reports — don't assume there's only one writer.

**Why:** Both paths "work" individually (neither errors), so nothing flags the inconsistency. Every reader that only checks for one of the two conventions silently sees half the real activity, forever, with no error and no obvious symptom beyond "the numbers seem a little low" — which is easy to dismiss as something else entirely.

**Real example:** Two separate, both-actively-used features wrote shipout events to the same Firebase collection with different `type` strings (`'out'` vs `'shipout'`). Three separate display surfaces (a summary table, a grid view, and a small recent-activity widget) each only recognized one of the two strings — so each surface had been silently undercounting shipouts since whichever feature was built second went live, with zero errors anywhere.

## Rule 7 — Distinguish "this is broken" from "this was never finished." The fix is different.

Before writing a fix, trace the full data path: does the *reading* code have a bug, or does the *writing* code simply not exist yet? A feature with a fully-built read side and a missing write side looks identical to a routing bug from the outside — "nothing shows up" — but needs new code, not a correction.

**Why:** Writing a "fix" for a routing bug when the real problem is a missing write does nothing; the symptom persists and looks like the fix failed.

**Real example:** A "reprint last report" button called a fully-implemented chain of functions that queried a `/reports` collection for a saved snapshot. Nothing, anywhere in the codebase, had ever written to that collection. The read side was complete and correct; it had simply never had data to read, for every single record, since the feature was first built. The fix was adding the missing write, not debugging the (perfectly correct) read logic.

## Rule 8 — For any visually/layout-constrained output (a printed page, a fixed-width export), pre-compute exact dimensions before handoff. Don't let the agent improvise sizing.

If a table or layout must fit inside a fixed pixel budget, calculate and hand over the *exact* per-column widths summing to that budget — don't describe the constraint and trust the agent to solve the arithmetic correctly inside its own generated code.

**Why:** Browsers silently let content overflow a container unless explicitly constrained (`table-layout: fixed` plus *every* column sized). Content that overflows a fixed-size export target doesn't error — it just renders past the edge and gets clipped invisibly when captured (e.g. by `html2canvas`). The bug is invisible until someone opens the exported file.

**Real example:** Two live, regularly-used compliance documents (a production order and a purchase order) had real columns silently clipped off the right edge of every export, for an unknown amount of time, because table columns had no width constraints and the browser let them grow with content. The fix worked reliably only once every column got an exact pixel width pre-computed to sum to the verified available space (714px inside a 794px page) — handed to the agent as exact numbers, not as a goal to "make it fit."

## Rule 9 — Once you find one instance of a bug pattern, search the whole codebase for every other instance. Don't assume the reported case is the only case.

**Why:** If a developer made one naming/sizing/scoping mistake once, they likely made the same kind of mistake elsewhere, in code nobody happened to be looking at when the first instance was reported.

**Real example:** Two documents were reported broken (clipped columns). A full search for every document-generating function in the codebase found two *additional* documents with the exact same defect, not yet reported, plus two documents with emoji that needed removing for compliance reasons that the person hadn't even thought to check yet. All five were fixed in the same pass instead of being found one at a time, one bug report at a time, over the following weeks.

## Rule 10 — For large combined changes, force the agent to make every part independently verifiable. Never review a giant diff as one unit.

When a single work session spans many unrelated fixes, structure the spec as clearly separated, independently named parts, and explicitly instruct: implement, then verify *each part separately* — not "verify the change."

**Why:** A combined diff makes it easy for one part to be fully correct while another is silently skipped or wrong, hidden inside an overall "all tests passed" summary.

**Real example:** A single implementation pass covered seven unrelated fixes (a new export feature, three independent bug fixes, a type-naming unification touching five read-sites, a card-layout redesign, and a button restyle). Verifying it required checking each of the seven parts against the actual file individually — grep'ing each new function name, each changed condition, and each new write-site by itself — rather than accepting one combined "all checks passed" summary for the whole thing.

## Rule 11 — When a decision needs human judgment, ask — but always propose a default with reasoning, not just an open question

Don't block progress waiting for every possible decision. Pick the most reasonable default, state the reasoning in one or two sentences, and let the person redirect if it's wrong — for genuinely binary product/architecture calls (not implementation details), ask directly with a short, specific question and a recommended option.

**Why:** Asking nothing risks building the wrong thing; asking everything wastes the person's time and erodes trust that you can make reasonable calls on your own.

**Real example, used repeatedly this session:** row-compaction defaults, signature-block role placeholders, which of two duplicate data conventions to standardize on, whether a redundant UI control should be removed or restyled — each was decided with a stated default and reasoning, with the person free to redirect (and did, on some of them) rather than either guessing silently or stalling on every micro-decision.

---

## Quick checklist — before approving any agent's "done" report

- [ ] Ran `md5sum` myself on the actual uploaded file — does it match what was claimed?
- [ ] Grep'd every function/identifier name the report claims was added/changed — does it exist exactly where and how many times expected?
- [ ] Opened the actual function body for every "rewritten" claim — is it *actually* different from before, not just claimed to be?
- [ ] For every new CSS class/variable referenced — grep'd to confirm it exists in this file's stylesheet, not assumed from "looks like existing patterns"?
- [ ] For every function called from a new location — checked where it's *defined* (global scope vs. nested in some other closure)?
- [ ] For every "this isn't showing up" bug — checked the *write-site's* actual behavior, not just the read-site's assumption about what a field name means?
- [ ] Searched for *other* writers to the same data store before assuming there's only one?
- [ ] Confirmed whether this is a routing bug (existing data, wrong path) or a missing-write gap (no data was ever produced) — fixed accordingly?
- [ ] For any fixed-size visual/print output — pre-computed and handed over exact dimensions, rather than describing a constraint and hoping?
- [ ] Searched the whole codebase for other instances of whatever pattern caused this bug, not just the one reported instance?
- [ ] For a large combined change — verified each part separately, not just accepted one overall "all tests passed"?
