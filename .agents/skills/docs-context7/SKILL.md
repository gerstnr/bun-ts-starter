---
name: docs-context7
description: Query up-to-date library documentation via Context7 MCP. Use when needing current docs, code examples, or API references for any library or framework.
---

# Documentation Lookup via Context7

[Context7](https://context7.com/) provides up-to-date documentation and code examples for libraries and frameworks. When working with fast changing libraries *always* use this skill instead of relying on potentially stale training data.

## When to use

- You need current documentation for a library (React, Zod, Express, Next.js, etc.)
- You want code examples from official docs
- A specific library version requires up-to-date API references
- Your knowledge of a library's API might be outdated

## Prerequisites

- **mcporter** installed as a devDependency (`bun add -d mcporter`) or available via `npx`
- **CONTEXT7_API_KEY** (optional) — set in `.env.local` for higher rate limits. Without a key, calls are rate-limited.

## CLI quick reference

### Step 1: Resolve a library name to a Context7 ID

```bash
npx mcporter call 'context7.resolve-library-id(query: "react useEffect cleanup", libraryName: "react")'
```

Both parameters are required:
- **`libraryName`** — the package/library name to search for
- **`query`** — your actual question or task; Context7 uses this to rank results by relevance

Use specific, descriptive queries for better ranking. `query: "react"` returns generic results; `query: "react useEffect cleanup"` returns results weighted toward that topic.

The response lists matching libraries with their Context7-compatible IDs (format: `/org/project`). Pick the best match.

### Step 2: Query documentation

```bash
npx mcporter call 'context7.query-docs(libraryId: "/websites/react_dev", query: "react useEffect cleanup")'
```

Both parameters are required:
- **`libraryId`** — the ID from step 1 (e.g., `/websites/react_dev`)
- **`query`** — a specific question; be detailed for better results

Returns documentation snippets with code examples and source links.

### One-liner example

```bash
# Resolve + query in sequence (same query threads through both steps)
npx mcporter call 'context7.resolve-library-id(query: "zod parse vs safeParse", libraryName: "zod")' && \
npx mcporter call 'context7.query-docs(libraryId: "/colinhacks/zod", query: "zod parse vs safeParse")'
```

## API notes

- The MCP tool names are `resolve-library-id` and `query-docs` (not `get-library-docs`)
- Both tools require a `query` parameter alongside the primary identifier
- The MCP server returns human-readable text (not JSON) — this is intentional, as MCP is designed for LLM consumption
- For programmatic JSON access, Context7 also offers a REST API: `GET /api/v2/libs/search` and `GET /api/v2/context` — see [context7.com/docs/api-guide](https://context7.com/docs/api-guide)

## TypeScript usage

The `scripts/` subfolder contains reference TypeScript code using mcporter's programmatic API:

- **`scripts/context7-client.ts`** — Reusable client: resolve libraries, query docs, extract headlines
- **`scripts/context7-docs.ts`** — CLI demo: `bun .agents/skills/docs-context7/scripts/context7-docs.ts [library] [query]`

These scripts require `mcporter` to be installed (`bun add -d mcporter`).
