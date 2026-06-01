import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  collectMemoryEntriesForWorkspace,
  readMemoryEntryDetail,
} from "../src/desktop/memory-browser.js";
import { MemoryStore } from "../src/memory/user.js";

describe("desktop memory browser", () => {
  let root: string;
  let deepmicodeHome: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "deepmicode-memory-project-"));
    deepmicodeHome = join(mkdtempSync(join(tmpdir(), "deepmicode-memory-home-")), ".deepmicode");
    mkdirSync(deepmicodeHome, { recursive: true });
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
    rmSync(deepmicodeHome, { recursive: true, force: true });
  });

  it("lists project deepmicode.md, global deepmicode.md, and structured memory entries", () => {
    writeFileSync(join(root, "deepmicode.md"), "project note", "utf8");
    writeFileSync(join(deepmicodeHome, "deepmicode.md"), "global note", "utf8");
    const store = new MemoryStore({ homeDir: deepmicodeHome, projectRoot: root });
    store.write({
      name: "cli_pref",
      scope: "global",
      type: "user",
      description: "Use concise CLI output",
      body: "Keep command output short.",
    });
    store.write({
      name: "build_cmd",
      scope: "project",
      type: "project",
      description: "Use npm run verify",
      body: "Run npm run verify before release.",
    });

    const entries = collectMemoryEntriesForWorkspace(root, { deepmicodeHome });

    expect(entries.map((e) => `${e.kind}:${e.scope}:${e.name}`)).toEqual([
      "project_file:project:deepmicode.md",
      "global_file:global:deepmicode.md",
      "structured:global:cli_pref",
      "structured:project:build_cmd",
    ]);
    expect(entries.every((e) => existsSync(e.path))).toBe(true);
    expect(entries.find((e) => e.name === "cli_pref")!.type).toBe("user");
  });

  it("reads details only for listed memory files", () => {
    writeFileSync(join(root, "deepmicode.md"), "project note", "utf8");
    const entries = collectMemoryEntriesForWorkspace(root, { deepmicodeHome });

    const detail = readMemoryEntryDetail({ path: entries[0]!.path }, root, { deepmicodeHome });

    expect(detail).toMatchObject({
      kind: "project_file",
      scope: "project",
      name: "deepmicode.md",
      body: "project note",
    });
    expect(() =>
      readMemoryEntryDetail({ path: join(deepmicodeHome, "not-listed.md") }, root, {
        deepmicodeHome,
      }),
    ).toThrow(/not available/);
  });
});
