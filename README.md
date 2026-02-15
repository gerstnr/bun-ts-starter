# bun-ts-starter

Bun + TypeScript starter for agentic coding projects.

## Who This Is For (and Who It Isn't)

This boilerplate is a learning tool for working with AI coding agents. It's a distilled version of my personal playground for new agentic projects — opinionated, practical, and rough around the edges. Which may change at any time. Or not.

Some parts translate well to bigger teams and production projects. Others absolutely don't. For example:

- **No backwards compatibility below v0.5.** Agents are told breaking changes are fine — no migration paths, no deprecation periods. Great for moving fast on a solo project, terrible for a shared library.
- **No main branch protection.** The `commit` skill pushes straight to main. This is fine when you're the only one working and want zero ceremony. In a team? You'd want PRs, branch protection, and review gates.

Take what's useful, ignore what doesn't fit your context.

## How the Agentic Infrastructure Works

AI coding agents start every session with zero memory of your project, your conventions, or past mistakes. Without structure, they reinvent rejected solutions, guess when they should ask, make autonomous decisions you never learn about, and repeat the same mistakes across sessions.

This setup gives agents and humans persistent, structured context that compounds over time.

### Architecture

```
AGENTS.md                  ← Behavioral rules (the "constitution")
.agents/
  context.md               ← Project architecture & file layout
  memory/
    corrections.md         ← "You got this wrong" (append-only log)
    decisions.md           ← "We chose X over Y because Z" (append-only log)
  .tmp/                    ← Ephemeral: scratchpads, scripts, screenshots
  skills/                  ← Reusable procedural skills (canonical)
```

### AGENTS.md — The Constitution

The single highest-authority document agents read first. It contains ground rules, coding conventions, runtime/tooling instructions, testing expectations, and a skill registry — all in one file so there are no contradictory instructions scattered across configs.

Rules are terse and actionable (e.g. "Guard CLI entry points with `if (import.meta.main)`"), not aspirational ("Write good code"). The "ask, don't guess" rule requires agents to present structured options with pros/cons, because without that specificity they still guess — just less confidently.

Agents can propose amendments but can't self-modify without human approval. Humans stay in control of the rules while still benefiting from agent observations.

### context.md — Project Knowledge

Architecture overview, file layout, key abstractions. Separated from AGENTS.md because behavioral rules ("how to act") and project facts ("what this project is") serve different purposes and evolve independently.

### Memory & Learning — Corrections and Decisions

Two append-only markdown files. Corrections are "don't do X" (preventive). Decisions are "we chose X over Y because Z" (contextual, so agents can make analogous choices in new situations).

This is the highest-leverage piece. A correction in session 5 prevents the same mistake in sessions 6 through infinity. The `evaluate-learnings` skill periodically promotes generic entries to AGENTS.md or skills and deletes the originals, keeping active memory lean. The `review` skill also gives specific feedback on the human's prompts and agent usage, so the learning goes both ways.

### .agents/.tmp/ — Ephemeral Workspace

Gitignored directory for scratchpads, throwaway scripts, and screenshots. Task-specific naming prevents parallel agents from colliding. Agents are told to check here before generating new scripts — if the same script appears twice, it should become a skill.

## Skills

Skills are self-contained procedures in `.agents/skills/<name>/SKILL.md`. Unlike AGENTS.md rules (constraints: do/don't), skills are how-to guides loaded on demand when the task matches. This keeps the base context lean — an agent renaming a variable doesn't need the browser debugging cookbook.

Skills are composable (`review` references `playwright-cli`, `commit` references `review`) and portable across projects via the `.cursor/skills` symlink.

A general design principle here: **prefer CLIs and scripts over MCP integrations** for agent tooling. Every MCP server connected to the IDE adds its full tool listing to the agent's context window — even when the current task has nothing to do with it. That's context wasted on irrelevant capabilities. Skills that wrap CLI tools or run scripts avoid this entirely: the agent loads the skill on demand, runs the command, and gets back only the relevant output. This is why `playwright-cli` is a (maybe too?) comprehensive cookbook of shell commands and CLI parameters rather than a Playwright MCP integration, and why `docs-context7` calls the [Context7](https://context7.com/) MCP server via [mcporter](https://github.com/steipete/mcporter) instead of connecting it as an IDE MCP server.

### Core Skills

| Skill | What it does | Why it matters |
|---|---|---|
| [commit](.agents/skills/commit/SKILL.md) | Commit conventions (imperative style, no conventional-commits prefixes) | Consistent history without ceremony. Pushes to main — fine solo, add PR gates for teams. |
| [review](.agents/skills/review/SKILL.md) | Pre-commit checklist: lint, tests, no debug artifacts, no secrets, minimal diff | The last line of defense before code lands. Not a guarantee — agents follow rules probabilistically. |
| [remember](.agents/skills/remember/SKILL.md) | Append corrections and decisions to memory files | Turns one-off corrections into permanent knowledge. |
| [evaluate-learnings](.agents/skills/evaluate-learnings/SKILL.md) | Review memory entries, promote generic ones to AGENTS.md/skills, prune | The meta-skill — how the system improves itself. Lessons from one project flow back into the boilerplate for all future ones. |
| [micromanage](.agents/skills/micromanage/SKILL.md) | On-demand audit of autonomous decisions the agent made | Transparency mechanism. Ask "what did you decide without asking me?" and get a structured report with alternatives and trade-offs. |
| [playwright-cli](.agents/skills/playwright-cli/SKILL.md) | Browser debugging: screenshots, console capture, mobile emulation | CLI-over-MCP in practice — comprehensive shell recipes instead of a Playwright MCP server. |
| [docs-context7](.agents/skills/docs-context7/SKILL.md) | Query up-to-date library docs via [Context7](https://context7.com/) MCP | CLI-over-MCP in practice — calls MCP from scripts via [mcporter](https://github.com/steipete/mcporter) instead of connecting it to the IDE. |
| [vercel-react-best-practices](.agents/skills/vercel-react-best-practices/SKILL.md) | React/Next.js performance patterns from Vercel Engineering | Loaded only for React work — rules cover rendering, re-renders, bundles, async patterns, and more. |

### OpenSpec Skills

[OpenSpec](https://github.com/Fission-AI/OpenSpec) is a structured change workflow — proposal, design, implementation, verification, archival. These skills guide agents through each step and create living docs as side-effect:

| Skill | Step |
|---|---|
| [openspec-new-change](.agents/skills/openspec-new-change/SKILL.md) | Start a new change (feature, fix, modification) |
| [openspec-continue-change](.agents/skills/openspec-continue-change/SKILL.md) | Create the next artifact in the workflow |
| [openspec-ff-change](.agents/skills/openspec-ff-change/SKILL.md) | Fast-forward through artifact creation |
| [openspec-explore](.agents/skills/openspec-explore/SKILL.md) | Think through ideas before or during a change |
| [openspec-apply-change](.agents/skills/openspec-apply-change/SKILL.md) | Implement tasks from a change |
| [openspec-verify-change](.agents/skills/openspec-verify-change/SKILL.md) | Verify implementation matches artifacts |
| [openspec-sync-specs](.agents/skills/openspec-sync-specs/SKILL.md) | Sync delta specs to main specs |
| [openspec-archive-change](.agents/skills/openspec-archive-change/SKILL.md) | Archive a completed change |
| [openspec-bulk-archive-change](.agents/skills/openspec-bulk-archive-change/SKILL.md) | Archive multiple changes at once |
| [openspec-onboard](.agents/skills/openspec-onboard/SKILL.md) | Guided onboarding walkthrough |

## How It Compounds

1. **Agent works** — makes decisions, encounters issues
2. **`remember`** — captures corrections and decisions to memory
3. **`evaluate-learnings`** — promotes generic patterns to AGENTS.md or skills
4. **Better rules** — next session's agent starts from a higher baseline
5. **Backport to boilerplate** — improvements flow to all future projects

Each project makes the boilerplate better. Each boilerplate improvement raises the floor for everything that comes after.

## What This Doesn't Do

- **Replace code review.** Agents follow rules probabilistically, not deterministically.
- **Enforce rules mechanically.** There's no linter for "did the agent ask before guessing."
- **Scale infinitely.** Memory needs pruning, AGENTS.md needs to stay concise — every rule competes for context window space.

The structure is largely vendor-neutral. The `.cursor/skills` symlink is Cursor-specific, but the canonical location (`.agents/skills/`) works with any agent that reads markdown.

## Setup

Requires [Bun](https://bun.sh/) (see `packageManager` in `package.json` for the pinned version).

```sh
bun install
```

[direnv](https://direnv.net/) is used to automatically add `node_modules/.bin` to PATH and load `.env.local`:

```sh
direnv allow
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in values. `.env.local` is gitignored and auto-loaded by direnv.

## Scripts

| Script | Description |
|---|---|
| `bun run start` | Run the app |
| `bun run lint` | Lint with ESLint |
| `bun run test` | Run tests (Vitest) |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage |
| `bun run prettier` | Format source files |
| `bun run prettier:check` | Check formatting |
| `bun run clean` | Remove coverage and temp files |

## Stack

- [TypeScript](https://www.typescriptlang.org/) 5.9 (strict mode)
- [Bun](https://bun.sh/) runtime and package manager
- [ESLint](https://eslint.org/) flat config with [Prettier](https://prettier.io/) integration
- [Vitest](https://vitest.dev/) for testing and coverage
- [EditorConfig](https://editorconfig.org/) for consistent editor settings

## License

[MIT](LICENSE)
