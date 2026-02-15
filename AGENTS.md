# AGENTS.md

## Before you start

1. Read `.agents/context.md` for project overview and file organization. (`context.md` = architecture, file layout, abstractions. `AGENTS.md` = behavioral rules and conventions.)
2. Read all files in `.agents/memory/` (corrections and decisions) for project-specific learnings.
3. Use `.agents/.tmp/scratchpad-<task>.md` for plans and working notes during multi-step tasks (e.g., `scratchpad-auth-flow.md`). Name it after the task or change you're working on so parallel agents don't collide.

## Ground rules (always)
- Be conservative, explicit, and boring.
- When unsure, ask; don't guess. Present structured options (A, B, C…) with pros and cons for each, then let the user choose.
- Make minimal, targeted changes; avoid refactors unless requested/necessary.
- Preserve existing structure, conventions, and tooling.
- Don't add dependencies without strong justification: state the need, name at least one alternative, and note maintenance/license/size impact.
- Prefer editing existing files over creating new ones. Don't create new files without explaining why an existing file isn't suitable.
- All non-trivial code changes must include tests. Don't wait to be asked.
- Throwaway scripts (verification, debugging, one-off testing) go in `.agents/.tmp/`. Before generating a new script, check that folder — if you've generated essentially the same script twice, extract it into a reusable skill instead.
- If a command fails or you're stuck after 2 attempts, stop and explain the problem to the user instead of retrying.

## Runtime and tooling
- Runtime: **Bun** (see `packageManager` in `package.json` for the pinned version).
- Package manager: **Bun** (`bun install`). Do not use npm/yarn/pnpm.
- Run the app: `bun run start`
- Lint: `bun run lint` (ESLint flat config)
- Format: `bun run prettier` (write) / `bun run prettier:check` (verify)
- Test: `bun run test` (Vitest, unit tests)
- Test (watch): `bun run test:watch`
- Test (coverage): `bun run test:coverage`

## TypeScript
- Write strict, idiomatic TS; follow the repo's tsconfig and lint rules.
- No `any` (use `unknown`, generics, or proper types).
- Prefer `type` over `interface` (avoids declaration merging surprises); use `interface` only when extending or implementing is needed.
- Prefer immutability (`readonly`, `ReadonlyArray`) where practical.
- Narrow with type guards; avoid assertions and `!` except as a last resort.
- Prefer exhaustive handling (`never` checks) for unions.
- Treat caught errors as `unknown` and narrow before use.

## Node.js / Bun
- Prefer `async/await`; never swallow rejections.
- Avoid module top-level side effects (I/O, network, reading env, global mutations) unless explicitly intended.
- Env vars: validate centrally; read at runtime (not import-time); don't mutate in app code (tests only with scoped setup/teardown).
- Error handling: rethrow with context; preserve `cause` when available; don't throw strings.
- Library code should not log; CLIs may log intentionally with consistent exit codes.
- Guard CLI entry points that also export functions for testing: wrap the top-level `main()` call with `if (import.meta.main)` so Vitest doesn't execute it on import.

## Testing (Vitest)
- New logic requires tests unless truly trivial (types-only, re-exports, comments/formatting).
- Tests must be deterministic and isolated; avoid shared mutable state.
- Prefer behavioral tests; mock sparingly.
- No committed `.only`/`.skip` (unless explicitly justified).
- Bug fixes must include a regression test.
- Avoid snapshots unless they add clear value and are stable.

## Style, docs, and security
- Follow existing formatting/lint; keep functions small and readable.
- Prefer named exports.
- Update docs/comments when behavior changes (comments explain "why", not "what").
- Never log secrets; validate/sanitize external inputs (paths/URLs/user data).

## Versioning
- While `package.json` version is below `0.5`, changes are **not required to be backwards compatible**. Breaking changes expected — no migration paths or deprecation periods needed.

## MUST NOT
- Change public APIs or introduce breaking changes without explicit instruction.
- Perform stylistic rewrites or micro-optimizations.
- Modify this file without explicit user confirmation (see "Proposing amendments" below).

## Proposing amendments

When you notice a recurring pattern, convention, or correction that is not captured in this file or in `.agents/memory/`, propose an amendment:

1. State what you observed and why it should be codified.
2. Show the exact diff you would apply to this file.
3. Wait for explicit user approval before applying.

Never self-modify AGENTS.md without confirmation. For one-off learnings, use `.agents/memory/` instead.

## Agent Skills & Tools

Agent skills live in `.agents/skills/` (canonical location, shared by all agents via symlinks). Use a skill when the task matches its scope — read the SKILL.md and follow its steps.

| Skill | When to use |
|-------|-------------|
| **[commit](.agents/skills/commit/SKILL.md)** | Committing code; writing commit messages; pre-commit guidance |
| **[evaluate-learnings](.agents/skills/evaluate-learnings/SKILL.md)** | Reviewing memory files for generally applicable learnings; promoting to AGENTS.md or skills |
| **[micromanage](.agents/skills/micromanage/SKILL.md)** | Reporting autonomous decisions made during the session; decision audit; trade-offs |
| **[playwright-cli](.agents/skills/playwright-cli/SKILL.md)** | Browser debugging; taking screenshots; verifying localhost web apps |
| **[remember](.agents/skills/remember/SKILL.md)** | Recording corrections, decisions, or learnings to persistent memory |
| **[review](.agents/skills/review/SKILL.md)** | Pre-commit review checklist to verify code quality |
| **[openspec-apply-change](.agents/skills/openspec-apply-change/SKILL.md)** | Implementing tasks from an OpenSpec change |
| **[openspec-archive-change](.agents/skills/openspec-archive-change/SKILL.md)** | Archiving a completed OpenSpec change |
| **[openspec-bulk-archive-change](.agents/skills/openspec-bulk-archive-change/SKILL.md)** | Archiving multiple completed changes at once |
| **[openspec-continue-change](.agents/skills/openspec-continue-change/SKILL.md)** | Continuing an OpenSpec change; creating the next artifact |
| **[openspec-explore](.agents/skills/openspec-explore/SKILL.md)** | Exploring ideas; investigating problems; clarifying requirements |
| **[openspec-ff-change](.agents/skills/openspec-ff-change/SKILL.md)** | Fast-forwarding through OpenSpec artifact creation |
| **[openspec-new-change](.agents/skills/openspec-new-change/SKILL.md)** | Starting a new OpenSpec change (feature, fix, modification) |
| **[openspec-onboard](.agents/skills/openspec-onboard/SKILL.md)** | Guided onboarding for OpenSpec workflow |
| **[openspec-sync-specs](.agents/skills/openspec-sync-specs/SKILL.md)** | Syncing delta specs to main specs |
| **[openspec-verify-change](.agents/skills/openspec-verify-change/SKILL.md)** | Verifying implementation matches change artifacts |
| **[docs-context7](.agents/skills/docs-context7/SKILL.md)** | Querying up-to-date library documentation via Context7 MCP |
| **[vercel-react-best-practices](.agents/skills/vercel-react-best-practices/SKILL.md)** | Writing/reviewing React/Next.js code for performance |

**Adding a new skill**: Create `.agents/skills/<name>/SKILL.md` with YAML frontmatter containing `name` and `description`. The description states when to use the skill, so it must be keyword dense. Nevertheless keep description and skill names brief. Then add one row to the table above. Do **not** create files in `.cursor/skills/` — it is symlinked to `.agents/skills/` and stays in sync automatically.

## Verify before committing
- Run the [review](.agents/skills/review/SKILL.md) skill checklist.
- Lint + tests pass (`bun run lint && bun run test`).
- New behavior has coverage (including failure paths); no unintended snapshot changes.
- No unnecessary diff churn; no accidental top-level side effects; env usage is validated and intentional.
- Capture any corrections or decisions from this session (see [remember](.agents/skills/remember/SKILL.md)).
