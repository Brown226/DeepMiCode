# dsnix

Short alias for [`deepmicode`](https://www.npmjs.com/package/deepmicode) — the DeepSeek-native coding agent.

This package is a thin shim. Installing or running `dsnix` resolves to the same `deepmicode` CLI, just under a shorter command name.

## Use

```bash
# Global install
npm install -g dsnix
dsnix code my-project

# One-shot via npx
npx dsnix@latest code my-project
```

Equivalent to:

```bash
npx deepmicode@latest code my-project
```

## Why a separate package?

`deepmicode` is the canonical package; `dsnix` exists purely so users can type a shorter command and run `npx dsnix@latest` without typing nine letters. Version numbers track `deepmicode` 1-to-1.

For docs, config, slash commands, and everything else, see the [main deepmicode README](https://github.com/esengine/DeepSeek-deepmicode#readme).
