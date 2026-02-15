---
name: micromanage
description: Report autonomous decisions made during the current session. Use when the user asks what decisions were made, wants a decision audit, asks about choices, trade-offs, or alternatives the agent picked without asking.
---

# Explain Decisions

Use this skill when the user asks which decisions you made autonomously during the current session — choices you resolved on your own without consulting the user.

## What counts as an autonomous decision

Any choice you made that had a meaningful alternative. Examples:

- Picking one implementation approach over another.
- Selecting a library, API, pattern, or convention.
- Interpreting an ambiguous requirement in a specific way.
- Choosing test strategy, error handling approach, or data format.

Do **not** include:

- Trivial or mechanical steps (e.g., importing a module you just used).
- Choices dictated by AGENTS.md, linter rules, or explicit user instructions — those are not autonomous.
- Choosing a file location, name, or structure.
- Deciding what to include or exclude from a change.
- Tool usage decisions (e.g., which search tool to call).

## Steps

### 1. Reflect on the session

Review everything you did in this session. Identify every point where you chose between two or more viable options without asking the user.

Be thorough — users invoke this skill precisely because they want visibility into choices they didn't get to weigh in on.

### 2. Present each decision

For each autonomous decision, provide all of the following:

#### Format

```markdown
### Decision N: <short title>

**Question resolved:** <the question you implicitly answered>

**Choice made:** <what you chose>

**Reason:** <why you chose it — be specific, not generic>

**Chosen option — pros:**
- ...

**Chosen option — cons:**
- ...

**Alternative(s) considered:**

_Alternative A: <name>_
- Pros: ...
- Cons: ...

_Alternative B: <name>_ (if applicable)
- Pros: ...
- Cons: ...
```

### 3. Highlight reversible vs. costly decisions

After listing all decisions, add a brief summary that flags:

- **Easily reversible** — decisions that can be changed later with low effort.
- **Worth discussing** — decisions where the alternative had strong merits and the user may prefer a different choice.

### 4. Offer to change

End with an explicit offer: *"Let me know if you'd like me to revise any of these choices."*

## Guidelines

- Be honest. If you made a choice because it was faster or simpler for you, say so.
- Don't inflate the list — only include decisions with genuine alternatives.
- Don't be defensive about your choices. Present trade-offs neutrally.
- If the session involved no autonomous decisions (e.g., you only followed explicit instructions), say so clearly.

## Example output

> ### Decision 1: Schema field naming — `startAt` vs `offset`
>
> **Question resolved:** What should the field that controls when an element appears be called?
>
> **Choice made:** `startAt`
>
> **Reason:** Aligns with Remotion's `from` prop semantics and reads naturally in YAML (`startAt: "0:02"`). The existing codebase uses time-oriented naming.
>
> **Chosen option — pros:**
> - Intuitive for timeline-based authoring
> - Consistent with existing field names (`duration`, `endAt`)
>
> **Chosen option — cons:**
> - Slightly ambiguous (start of what? animation? visibility?)
>
> **Alternative(s) considered:**
>
> _Alternative A: `offset`_
> - Pros: Common in animation libraries; unambiguous relative meaning
> - Cons: Less intuitive for non-developers; breaks naming consistency with other time fields
>
> ---
>
> **Summary:** This decision is easily reversible (rename + find-replace). No decisions in this session require further discussion.
>
> Let me know if you'd like me to revise any of these choices.
