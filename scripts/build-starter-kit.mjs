import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const outputZip = path.join(publicDir, "starter-kit.zip");

const excludedPatterns = [
  "node_modules/*",
  ".next/*",
  ".git/*",
  ".env.local",
  "*.log",
  "npm-debug.log*",
  "yarn-debug.log*",
  "yarn-error.log*",
  "pnpm-debug.log*",
  "public/starter-kit.zip",
  ".agents/*",
  "skills-lock.json",
  "./skills-lock.json",
  ".tmp/*",
  "dist/*",
  ".DS_Store",
];

mkdirSync(publicDir, { recursive: true });

if (existsSync(outputZip)) {
  rmSync(outputZip);
}

execFileSync(
  "zip",
  [
    "-qr",
    outputZip,
    ".",
    "-x",
    ...excludedPatterns,
  ],
  {
    cwd: projectRoot,
    stdio: "inherit",
  },
);

const stats = statSync(outputZip);
console.log(`Created ${path.relative(projectRoot, outputZip)} (${stats.size} bytes)`);
