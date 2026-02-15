---
name: remember
description: Capture corrections, decisions, or learnings to persistent agent memory files
---

# Remember

Use this skill when:
- The user corrects your behavior or output.
- An architectural or tooling decision is made.
- A non-obvious project convention is established.

## Steps

### 1. Identify the type

- **Correction** — the user told you something was wrong or should be done differently.
- **Decision** — a choice was made between alternatives (tooling, architecture, patterns).

### 2. Append to the appropriate file

- Corrections → `.agents/memory/corrections.md`
- Decisions → `.agents/memory/decisions.md`

### 3. Follow the entry format

Use the format documented at the top of each file. Include today's date, a short title, and enough context that a future agent (with no prior session history) can understand and apply it.

**Appending correctly:** Memory files are append-only. Before using `StrReplace`, read the end of the file to find the true last entry. Anchor your replacement on that entry's final line — don't assume from session memory which entry is last. Getting this wrong inserts entries mid-file.

### 4. Keep entries concise

Each entry should be 2–5 lines. Don't duplicate what's already in AGENTS.md — memory files capture project-specific learnings, not general coding rules.

### 5. Consider an AGENTS.md amendment

If the correction or decision reflects a general rule that should apply to all future work (not just a one-off), propose an amendment to AGENTS.md per the "Proposing amendments" section.
