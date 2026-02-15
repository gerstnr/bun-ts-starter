# Decisions

Append entries when an architectural or tooling decision is made. Each entry captures the choice, alternatives considered, and rationale.

Format:

```
### YYYY-MM-DD — <short title>
**Decision:** <what was chosen>
**Alternatives:** <what was considered>
**Rationale:** <why>
```

---

### 2026-02-14 — Runtime: Bun over Node.js
**Decision:** Use Bun as the runtime and package manager.
**Alternatives:** Node.js + npm/yarn/pnpm.
**Rationale:** Bun runs TypeScript natively (no build step), faster installs, built-in test runner available as fallback. Simplifies the toolchain.

### 2026-02-14 — Testing: Vitest over bun:test
**Decision:** Use Vitest for testing instead of Bun's built-in test runner.
**Alternatives:** `bun:test`.
**Rationale:** Vitest has broader ecosystem support, better coverage tooling (`@vitest/coverage-v8`), superior IDE integration, and keeps tests portable across runtimes.

### 2026-02-14 — TypeScript: strict mode enabled
**Decision:** Enable `strict: true` in tsconfig.json.
**Alternatives:** Granular strict flags.
**Rationale:** Aligns with AGENTS.md coding standards (no `any`, unknown catch variables, etc.). Catches more bugs at compile time.

### 2026-02-15 — Skills with scripts: docs-context7 as first example
**Decision:** Encapsulate Context7 integration as an agent skill (`docs-context7`) with a `scripts/` subfolder containing runnable TypeScript reference code. Keep `src/` as a clean boilerplate starter.
**Alternatives:** (A) Context7 code in `src/` (couples boilerplate to a specific MCP), (B) separate `examples/` directory (needs tsconfig adjustments, less self-contained), (C) skill with CLI instructions only, no TypeScript code (loses the programmatic reference).
**Rationale:** A self-contained skill folder is portable (copy to any project), keeps `src/` clean, and provides both CLI instructions (SKILL.md for agents) and TypeScript examples (scripts/ for humans). Skills with scripts/ is a new convention for this project — documented in context.md.

### 2026-02-15 — mcporter as devDependency
**Decision:** Install mcporter as a devDependency, not a regular dependency.
**Alternatives:** Regular dependency.
**Rationale:** After the skill refactor, nothing in `src/` imports mcporter. It's only used by skill scripts (developer/agent tooling), same category as eslint or vitest. devDependencies are excluded only in production installs, which is correct — skill scripts don't run in production.
