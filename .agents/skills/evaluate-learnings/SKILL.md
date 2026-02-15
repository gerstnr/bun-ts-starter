---
name: evaluate-learnings
description: Analyze memory files for generally applicable learnings and extract them to AGENTS.md, skills, or other permanent locations. Use when reviewing accumulated corrections and decisions for broader applicability.
---

# Evaluate Learnings

Use this skill to review accumulated memory entries (corrections and decisions) and determine which are project-specific and which represent general patterns that should be promoted to permanent, structural locations.

## When to use

- After a project has accumulated several memory entries.
- Before backporting improvements to a boilerplate or starter template.
- Periodically, to keep memory files lean and ensure valuable patterns aren't buried.

## Steps

### 1. Read all memory files

Read every file in `.agents/memory/`. For each entry, note whether it describes:

- **Project-specific knowledge** — tied to a particular library, API, or architectural choice unique to this project.
- **Generic agent behavior** — a pattern any agent in any project would benefit from.
- **Generic tooling/convention** — a pattern tied to the tech stack (e.g., Bun, Vitest, React) but not to this specific project.

### 2. Classify each entry

For each entry, assign one of these dispositions:

| Disposition | Meaning | Action |
|-------------|---------|--------|
| **Stay** | Project-specific; belongs in memory | No action |
| **Promote to AGENTS.md** | Generic behavioral rule | Add/refine a rule in `AGENTS.md` |
| **Promote to skill** | Generic pattern best expressed as skill guidance | Update the relevant skill's `SKILL.md` |
| **Promote to context.md** | Architectural insight that applies project-wide | Add to `.agents/context.md` |

### 3. Present the classification

Show the user a table with:

| # | Entry title | Source file | Disposition | Target location | Rationale |
|---|------------|-------------|-------------|-----------------|-----------|

Wait for the user to confirm or adjust before making changes.

### 4. Apply approved promotions

For each approved promotion:

1. **Add the learning to its target location.** Follow existing formatting and conventions in that file.
2. **Delete the original memory entry.** Active memory files should only contain entries not yet captured elsewhere. After promoting a learning, remove it from the source file (`corrections.md` or `decisions.md`). This keeps active memory lean and avoids stale duplicates competing with the promoted version. Git history preserves the full timeline if needed.

### 5. Verify coherence

After all promotions:

- Re-read `AGENTS.md` to confirm new rules don't contradict existing ones.
- Re-read any updated skills to confirm additions fit the skill's scope.
- Check that no learning was promoted to multiple overlapping locations.

## Classification guidelines

### Goes in AGENTS.md when…

- It's a behavioral rule that constrains how agents should act (e.g., "ask before guessing", "guard CLI entry points").
- It refines or strengthens an existing rule that proved too vague.
- It clarifies the boundary between agent files (e.g., what goes in `context.md` vs `AGENTS.md`).

### Goes in a skill when…

- It's a procedural best practice within a specific workflow (e.g., "read the file tail before appending" fits the `remember` skill).
- It's a technique or recipe for a specific tool (e.g., "check DOM errors, not just console" fits `review` or `playwright-cli`).

### Stays in memory when…

- It's about a specific library, API, or framework behavior unique to this project.
- It's a workaround for a project-specific integration issue.
- It would be meaningless without the project's specific context.

## Anti-patterns

- **Don't over-promote.** Not every learning is a rule. If a correction happened once and is unlikely to recur in other projects, leave it in memory.
- **Don't duplicate.** If `AGENTS.md` already says "prefer immutability", don't add a memory-derived rule that says the same thing differently.
- **Don't generalize prematurely.** A pattern observed once in one project is an anecdote, not a rule. Promote with confidence only when the learning clearly applies beyond this project's specific context.
