---
name: commit
description: Git commit message conventions and pre-commit guidance. Use when committing code.
---

# Commit

This skill covers commit message conventions and pre-commit checks.
A diff shows what changed, but only the commit message can explain why.
Well-crafted commit messages communicate context to fellow developers and your future self.

## Before committing

For non-trivial changes (multiple files, new features, refactors), run the [review](.agents/skills/review/SKILL.md) skill first. For small, obvious changes (typos, single-line fixes), use your judgment — a full review pass may be overkill.

## When to Use

Use this skill when:
- Committing code changes
- Writing commit messages
- Reviewing commits for style compliance

## Style

We follow the [Imperative Commit Style](https://cbea.ms/git-commit/) inspired by Git/Linux kernels, **NOT standard Conventional Commits**.

## Granularity & Atomicity

- Keep commits brief and atomic (e.g., don't mix refactors with new features)
- Commit early and often. Multiple smaller commits help with reviews and rebasing
- Don't split a single logical change into several commits (e.g., feature implementation and tests should be in the same commit)

## Commit Message Format

### Subject Line

- **Capitalize** the subject line
- Start with an **active verb in the imperative present tense** (e.g., `Add`, `Change`, `Fix`, `Remove`)
- **Do not use type prefixes** (e.g., `feat:`, `fix:`, `chore:`)
- Do not end the subject line with punctuation
- Keep lines under 50 characters, if possible

### Body

- Adding further description is encouraged, but should be avoided when trivial
- Use the body to explain **what** and **why**, not how
  - Focus on the reasons for the change
  - Explain the problem being solved
  - Note any side effects or unintuitive consequences
  - The code itself explains how

### Examples

**Good:**
```
Add user authentication to the portal

This implements JWT-based authentication with refresh tokens.
The session timeout is set to 24 hours.
```

**Good (simple change):**
```
Fix typo in login error message
```

**Bad (uses type prefix):**
```
feat: add user authentication
```

**Bad (not imperative):**
```
Added user authentication
```

## Quality Standards

- Each commit merged to `master`/`main` must pass the testing suite
- Never push dead code. If you need it later, you can use git to bring it back.

## Squashing & Fixups

If a commit is going to be squashed to another commit, use the `--squash` and `--fixup` flags respectively to make the intention clear.
