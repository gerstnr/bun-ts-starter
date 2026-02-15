# Project Context

## What this project does

Bun + TypeScript starter template for agentic coding projects. Provides strict TypeScript, linting, testing, and agent-aware conventions out of the box.

## Key abstractions

- **Env helpers** (`src/env.ts`): Centralized, runtime-only access to environment variables. Generic `loadEnv()` and `getEnv(name)`. No top-level side effects.

## File organization

```
src/
  main.ts              — entry point
  env.ts               — centralized env-var validation
__tests__/
  unit/                — unit tests (Vitest)
  vitest.config.ts     — Vitest configuration
.env.example           — committed template for env vars
.env.local             — local env vars (gitignored; actual values)
.agents/
  context.md           — this file; project overview for agents
  memory/              — persistent corrections and decisions
  .tmp/                — scratchpads, throwaway scripts, screenshots (not committed)
  skills/              — agent skills (shared via .cursor/skills symlink)
    docs-context7/     — Context7 documentation lookup (includes scripts/ with TS reference code)
```

## External dependencies worth knowing about

- **[mcporter](https://github.com/steipete/mcporter)** (v0.7.3, devDependency) — TypeScript runtime and CLI for calling MCP servers. Used by the `docs-context7` skill scripts to connect to Context7's HTTP MCP endpoint.

## Conventions

- Runtime and package manager: Bun (pinned in `package.json` via `packageManager`).
- All source is strict TypeScript (`strict: true` in tsconfig).
- ESLint flat config with Prettier integration.
- Tests via Vitest; coverage via `@vitest/coverage-v8`.
- Agent instructions live in `AGENTS.md` (root); skills in `.agents/skills/`.
- Skills may include a `scripts/` subfolder with runnable reference code (see `docs-context7` for the pattern).
