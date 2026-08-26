import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const outDir = join(root, "out");
const requiredRoutes = [
  "index.html",
  "cases.html",
  "cases/autosalon.html",
  "cases/internet-shop.html",
  "cases/detailing.html",
  "pricing.html",
  "materials.html",
];

const failures = [];

function readRequired(path) {
  if (!existsSync(path)) {
    failures.push(`Missing generated file: ${path}`);
    return "";
  }

  return readFileSync(path, "utf8");
}

for (const route of requiredRoutes) {
  const html = readRequired(join(outDir, route));

  if (!html.includes('name="viewport"')) {
    failures.push(`${route}: missing viewport meta`);
  }

  if (!html.includes("<main")) {
    failures.push(`${route}: missing main landmark`);
  }

  if (!html.includes('aria-label="Основная навигация"')) {
    failures.push(`${route}: missing desktop navigation label`);
  }

  if (!html.includes('aria-label="Мобильная навигация"')) {
    failures.push(`${route}: missing mobile navigation label`);
  }
}

function collectCssFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? collectCssFiles(path) : path.endsWith(".css") ? [path] : [];
  });
}

const css = collectCssFiles(join(outDir, "_next")).map((path) => readFileSync(path, "utf8")).join("\n");
const sourceCss = readRequired(join(root, "app", "globals.css"));
const cssChecks = [
  ["visible focus", "focus-visible"],
  ["mobile nav styles", ".mobile-nav"],
  ["overflow guard", "overflow-x:hidden"],
];

for (const [label, needle] of cssChecks) {
  if (!css.includes(needle)) {
    failures.push(`CSS missing ${label}: ${needle}`);
  }
}

if (!sourceCss.includes("Stage 6: responsive and accessibility hardening")) {
  failures.push("Source CSS missing Stage 6 marker");
}

if (!sourceCss.includes("@media(max-width:390px)") && !css.includes("@media (max-width:390px")) {
  failures.push("CSS missing small viewport guard: max-width:390px");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Responsive/a11y static check passed for ${requiredRoutes.length} routes.`);
