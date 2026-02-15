/**
 * Centralized environment variable access.
 *
 * Reads at runtime (never at import-time) so tests can override values
 * and the module stays free of top-level side effects.
 *
 * Add new env vars here as the project grows. Each variable should have
 * a corresponding entry in `.env.example`.
 */

export type EnvConfig = {
  /** Node environment (development, production, test). */
  readonly nodeEnv: string | undefined;
};

/** Read all known env vars. */
export function loadEnv(): EnvConfig {
  return {
    nodeEnv: process.env.NODE_ENV,
  };
}

/**
 * Read an environment variable, logging a warning when it is missing.
 *
 * Returns the value or `undefined` — never throws.
 */
export function getEnv(name: string, warnMessage?: string): string | undefined {
  const value = process.env[name];
  if (!value && warnMessage) {
    console.log(warnMessage);
  }
  return value || undefined;
}
