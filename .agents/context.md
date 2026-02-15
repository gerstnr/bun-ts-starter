# Project Context

## What this project does

Bun + TypeScript starter template for agentic coding projects. Provides strict TypeScript, linting, testing, and agent-aware conventions out of the box.

## Key abstractions

_None yet — this is a clean starter. Update this section as the project grows._

## File organization

```
src/
  main.ts              — entry point
__tests__/
  unit/                — unit tests (Vitest)
  vitest.config.ts     — Vitest configuration
.agents/
  context.md           — this file; project overview for agents
  memory/              — persistent corrections and decisions
  .tmp/                — scratchpads, throwaway scripts, screenshots (not committed)
  skills/              — agent skills (shared via .cursor/skills symlink)
```

## External dependencies worth knowing about

_None yet — update as dependencies are added._

## Conventions

- Runtime and package manager: Bun (pinned in `package.json` via `packageManager`).
- All source is strict TypeScript (`strict: true` in tsconfig).
- ESLint flat config with Prettier integration.
- Tests via Vitest; coverage via `@vitest/coverage-v8`.
- Agent instructions live in `AGENTS.md` (root); skills in `.agents/skills/`.
