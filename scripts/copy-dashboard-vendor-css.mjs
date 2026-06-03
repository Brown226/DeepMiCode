import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Marks dist/cli/ as ESM so Node skips the CJS-then-ESM reparse warning when
// the bundle is loaded outside its own npm install (e.g. desktop sidecar).
const cliMarker = resolve("dist/cli/package.json");
mkdirSync(dirname(cliMarker), { recursive: true });
writeFileSync(cliMarker, `${JSON.stringify({ type: "module" }, null, 2)}\n`);
console.log(`wrote ${cliMarker}`);
