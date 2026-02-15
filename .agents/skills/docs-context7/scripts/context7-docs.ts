/**
 * CLI demo — resolve a library and query its documentation via Context7.
 *
 * Usage:
 *   bun .agents/skills/docs-context7/scripts/context7-docs.ts
 *   bun .agents/skills/docs-context7/scripts/context7-docs.ts react "hooks tutorial"
 *   bun .agents/skills/docs-context7/scripts/context7-docs.ts zod "validation examples"
 *   bun .agents/skills/docs-context7/scripts/context7-docs.ts --headlines react "hooks"
 *
 * Requires: mcporter (bun add -d mcporter)
 * Optional: CONTEXT7_API_KEY in .env.local for higher rate limits
 */

import { createContext7Client } from './context7-client.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  const headlinesOnly = args.includes('--headlines');
  const positional = args.filter((a) => a !== '--headlines');

  const libraryName = positional[0] ?? 'react';
  const query =
    positional[1] ?? `${libraryName} overview and getting started`;

  const apiKey = process.env.CONTEXT7_API_KEY;
  if (!apiKey) {
    console.log(
      'No CONTEXT7_API_KEY set — requests will be rate-limited. ' +
        'See .env.example for setup.',
    );
  }
  const client = await createContext7Client(apiKey);

  try {
    console.log(`Resolving "${libraryName}" via Context7…`);
    const { libraryId, candidates } = await client.resolveLibrary(
      libraryName,
      query,
    );
    console.log(`  Resolved to: ${libraryId}`);
    if (candidates.length > 1) {
      console.log(
        `  (${String(candidates.length)} candidates; using the first match)`,
      );
    }

    if (headlinesOnly) {
      console.log(`\nFetching headlines for "${query}"…\n`);
      const headlines = await client.queryHeadlines(libraryId, query);
      console.log(headlines || '(no headlines found)');
    } else {
      console.log(`\nQuerying docs: "${query}"…\n`);
      const docs = await client.queryDocs(libraryId, query);
      console.log(docs || '(no documentation returned)');
    }
  } finally {
    await client.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
