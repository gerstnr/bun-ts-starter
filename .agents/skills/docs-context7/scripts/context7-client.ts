/**
 * Context7 MCP client — resolve libraries and fetch documentation
 * via the Context7 MCP server using mcporter.
 *
 * This is reference code for the docs-context7 skill.
 * Run directly: bun .agents/skills/docs-context7/scripts/context7-client.ts
 * Or import from context7-docs.ts for a CLI demo.
 */

import {
  createRuntime,
  createServerProxy,
  type CallResult,
  type Runtime,
  type ServerDefinition,
} from 'mcporter';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LibraryCandidate = {
  readonly context7CompatibleLibraryID: string;
  readonly title?: string;
  readonly description?: string;
};

export type LibraryResolution = {
  readonly libraryId: string;
  readonly candidates: readonly LibraryCandidate[];
};

export type Context7Client = {
  /** Resolve a library name (e.g. "react") to a Context7 library ID. */
  resolveLibrary(name: string, query?: string): Promise<LibraryResolution>;
  /** Query documentation for a resolved library. */
  queryDocs(libraryId: string, query: string): Promise<string>;
  /** Query docs and return only markdown headlines. */
  queryHeadlines(libraryId: string, query: string): Promise<string>;
  /** Shut down the MCP transport. */
  close(): Promise<void>;
};

// ---------------------------------------------------------------------------
// Pure helpers (no I/O — safe to test without mocks)
// ---------------------------------------------------------------------------

/** Extract the first Context7-compatible library ID from a resolve result. */
export function extractLibraryId(result: CallResult): string | null {
  const json = result.json<{
    candidates?: LibraryCandidate[];
  }>();
  if (json?.candidates) {
    for (const candidate of json.candidates) {
      if (candidate?.context7CompatibleLibraryID) {
        return candidate.context7CompatibleLibraryID;
      }
    }
  }
  // Fallback: parse from text output (MCP returns human-readable text, not JSON)
  const textMatch = result
    .text()
    ?.match(/Context7-compatible library ID:\s*(\S+)/);
  return textMatch?.[1] ?? null;
}

/** Extract markdown headlines (lines starting with `#`) from a doc string. */
export function extractHeadlines(markdown: string): string {
  return markdown
    .split('\n')
    .filter((line) => /^#+\s/.test(line))
    .join('\n');
}

// ---------------------------------------------------------------------------
// Server definition
// ---------------------------------------------------------------------------

/** Build a Context7 `ServerDefinition` for mcporter. */
export function createContext7Definition(apiKey?: string): ServerDefinition {
  return {
    name: 'context7',
    description: 'Context7 documentation MCP',
    command: {
      kind: 'http' as const,
      url: new URL('https://mcp.context7.com/mcp'),
      ...(apiKey ? { headers: { Authorization: `Bearer ${apiKey}` } } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Client factory
// ---------------------------------------------------------------------------

/**
 * Create a Context7 client that wraps the mcporter runtime.
 *
 * @param apiKey Optional API key. When omitted the server is called
 *   unauthenticated (rate-limited).
 */
export async function createContext7Client(
  apiKey?: string,
): Promise<Context7Client> {
  const definition = createContext7Definition(apiKey);
  const runtime: Runtime = await createRuntime({ servers: [definition] });
  const proxy = createServerProxy(runtime, 'context7');

  return {
    async resolveLibrary(
      name: string,
      query?: string,
    ): Promise<LibraryResolution> {
      const result = await proxy.call('resolve-library-id', {
        args: {
          libraryName: name,
          query: query ?? `${name} documentation`,
        },
      });
      const libraryId = extractLibraryId(result);
      if (!libraryId) {
        throw new Error(`Unable to resolve library "${name}" via Context7.`);
      }
      const json = result.json<{ candidates?: LibraryCandidate[] }>();
      return {
        libraryId,
        candidates: json?.candidates ?? [],
      };
    },

    async queryDocs(libraryId: string, query: string): Promise<string> {
      const result = await proxy.call('query-docs', {
        args: { libraryId, query },
      });
      return result.markdown() ?? result.text() ?? '';
    },

    async queryHeadlines(libraryId: string, query: string): Promise<string> {
      const docs = await this.queryDocs(libraryId, query);
      return extractHeadlines(docs);
    },

    async close(): Promise<void> {
      await runtime.close();
    },
  };
}
