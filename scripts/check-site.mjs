import { readFileSync, existsSync } from "node:fs";

const required = [
  "index.html",
  "styles.css",
  "script.js",
  "data/eye-types.json",
  "assets/brand/nunbti-symbol-primary.svg",
  "assets/brand/nunbti-symbol-minimal.svg"
];

const missing = required.filter(path => !existsSync(path));
if (missing.length) {
  console.error(`Missing files: ${missing.join(", ")}`);
  process.exit(1);
}

const types = JSON.parse(readFileSync("data/eye-types.json", "utf8"));
const html = readFileSync("index.html", "utf8");
const script = readFileSync("script.js", "utf8");

if (types.length < 8) {
  console.error("Expected at least 8 eye types.");
  process.exit(1);
}

for (const type of types) {
  for (const key of ["slug", "name", "summary", "description", "keywords", "axes"]) {
    if (!type[key]) {
      console.error(`Type ${type.slug || "(unknown)"} missing ${key}`);
      process.exit(1);
    }
  }
}

for (const needle of ["눈비티아이", "16유형 기준 보기", "홍채 관찰 4단계", "의학적 진단", "분석 신청"]) {
  if (!html.includes(needle)) {
    console.error(`index.html missing required text: ${needle}`);
    process.exit(1);
  }
}

for (const id of ["home", "formula", "types", "content", "submit", "ethics"]) {
  if (!html.includes(`id="${id}"`)) {
    console.error(`index.html missing required section id: ${id}`);
    process.exit(1);
  }
}

if (html.includes(".example")) {
  console.error("Placeholder .example contact URL found.");
  process.exit(1);
}

if (html.includes("자가 관찰로 찾는 눈BTI") || html.includes("내 눈BTI 테스트하기")) {
  console.error("Removed self-observation test copy is still present.");
  process.exit(1);
}

const typeAxes = new Set(types.map(type => [...type.axes].sort().join("+")));
const requiredPairs = [
  "depth+edge",
  "edge+texture",
  "edge+glow",
  "depth+texture",
  "glow+texture",
  "glow+soft",
  "depth+soft",
  "soft+texture"
];

for (const pair of requiredPairs) {
  if (!typeAxes.has(pair)) {
    console.error(`Missing result type for axis pair: ${pair}`);
    process.exit(1);
  }
}

console.log("Site check passed.");
