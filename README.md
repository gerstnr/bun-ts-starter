# bun-ts-starter

Bun + TypeScript starter for agentic coding projects.

## Setup

Requires [Bun](https://bun.sh/) (see `packageManager` in `package.json` for the pinned version).

```sh
bun install
```

[direnv](https://direnv.net/) is used to automatically add `node_modules/.bin` to PATH:

```sh
direnv allow
```

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
- [AGENTS.md](AGENTS.md) guidelines for AI coding agents

## License

[MIT](LICENSE)
