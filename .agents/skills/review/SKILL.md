---
name: review
description: Pre-commit review checklist to verify code quality before committing
---

# Pre-commit Review

Use this skill before committing or when asked to review your own changes.

## Checklist

Run through each item. If any check fails, fix it before proceeding.

### 1. Lint passes

```sh
bun run lint
```

### 2. Tests pass

```sh
bun run test
```

### 3. No `any` types

Search your changed files for `any`. If found, replace with `unknown`, generics, or proper types.

### 4. No debug artifacts

Check for and remove:
- `console.log` / `console.debug` (unless intentional CLI output)
- Commented-out code blocks
- `TODO` / `FIXME` / `HACK` comments added during this session (resolve or convert to tracked issues)
- `.only` / `.skip` on tests

### 5. No secrets or credentials

Verify that no API keys, tokens, passwords, or `.env` values appear in the diff.

### 6. New exports are intentional

If you added or changed an export, confirm it's meant to be part of the public surface. Prefer named exports.

### 7. Test coverage for new code paths

New logic should have tests. New branches (if/else, switch cases, error paths) should be covered. Run coverage if in doubt:

```sh
bun run test:coverage
```

### 8. No browser errors (if UI changes)

If the diff touches browser-rendered code (React components, web UI), verify there are no errors — both in the console **and** in the DOM. Frameworks often render error messages into the page (banners, toasts, modals) that never appear in `console.error`.

Use the [playwright-cli](../playwright-cli/SKILL.md) skill. At minimum:

1. **Console errors**: Attach a `console` listener and `pageerror` handler before navigating.
2. **DOM-rendered errors**: After the page loads, inspect `document.body.innerText` for error/warning keywords (e.g., "error", "failed", "cannot"). Check framework-specific error UI locations if known.

See the "Capturing browser console output" and "Collecting logs and screenshot together" sections in the playwright-cli skill for ready-made scripts.

Skip this check if the diff has no browser-rendered code changes.

### 9. Diff is minimal

Review the full diff. Remove:
- Unrelated formatting changes
- Whitespace-only changes in files you didn't modify
- Unintended file additions

### 10. Memory capture

If the session involved corrections or decisions, use the [remember](../remember/SKILL.md) skill to record them before committing.

## Session feedback

After completing the checklist, provide brief feedback to the user on the session itself. Be honest and constructive — the goal is to help the user give better prompts and context in future sessions.

Cover any of the following that apply (skip those that don't):

- **Ambiguous prompts** — point out where you had to guess intent and what would have made it clearer. Example: *"When you said 'fix the auth', I wasn't sure if you meant the login flow or the token refresh. Specifying the component or file helps."*
- **Missing context** — note where additional context would have saved time or avoided mistakes. Example: *"I didn't know this endpoint is called by a cron job, which affected error handling choices. Mentioning callers/consumers up front helps."*
- **Scope creep or underspecification** — flag if the task turned out much larger or different than the prompt implied. Example: *"'Add validation' ended up touching 6 files across 3 layers. Breaking it into smaller asks (schema validation, API validation, UI validation) would give you more control."*
- **Contradictions** — if instructions conflicted with AGENTS.md, existing code, or earlier instructions in the session, note it.
- **What went well** — briefly note what made the session productive (good context, clear constraints, useful examples, etc.) so the user knows what to repeat.

Keep feedback concise (3–5 bullet points max). Frame it as collaboration, not criticism.
