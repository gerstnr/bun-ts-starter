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
