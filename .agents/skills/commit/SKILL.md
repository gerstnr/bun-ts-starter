---
name: commit
description: Git commit message conventions and pre-commit guidance. Use when committing code.
---

# Commit

This skill covers commit message conventions and pre-commit checks.
A diff shows what changed, but only the commit message can explain why.
Well-crafted commit messages communicate context to fellow developers and your future self.

## Before committing

### Branch sanity check

Before staging, verify the current branch is appropriate for this change:

1. Run `git status` and `git log --oneline -5`.
2. **If the branch tracks a remote and is up-to-date** (i.e., "up to date with 'origin/...'"), prior work has been pushed. Ask the user whether this is a continuation or whether a new branch is needed.
3. **If the branch name doesn't relate to the commit subject**, flag the mismatch. Example: branch `fix-auth-flow`, commit about adding a new feature.
4. **If on `main`/`master` and the change is non-trivial**, suggest creating a feature branch first.

If any check flags, present the concern and offer to create a new branch. Do not refuse to commit — the user may have a valid reason to stay on the current branch.

### Review

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
