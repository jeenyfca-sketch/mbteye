import { readFileSync, existsSync } from "node:fs";

const required = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/brand/nunbti-symbol-minimal.svg"
];

const missing = required.filter(path => !existsSync(path));
if (missing.length) {
  console.error(`Missing files: ${missing.join(", ")}`);
  process.exit(1);
}

const html = readFileSync("index.html", "utf8");
const script = readFileSync("script.js", "utf8");

for (const needle of ["눈비티아이", "눈BTI 16유형 테스트", "홍채 관찰 4단계로 시작합니다", "시작하기", "의학적 진단", "성격의 절대 판정"]) {
  if (!html.includes(needle)) {
    console.error(`index.html missing required text: ${needle}`);
    process.exit(1);
  }
}

if (!html.includes('id="formula"') || !html.includes("nbti-wizard")) {
  console.error("index.html missing NunBTI wizard section.");
  process.exit(1);
}

for (const removed of ["id=\"types\"", "id=\"rayid\"", "id=\"content\"", "id=\"submit\"", "id=\"ethics\"", "유형 아카이브", "Rayid Method", "콘텐츠 허브", "분석 신청"]) {
  if (html.includes(removed)) {
    console.error(`Removed homepage content is still present: ${removed}`);
    process.exit(1);
  }
}

if (!script.includes("calculateNunBTI") || !script.includes("showWizardPage")) {
  console.error("NunBTI wizard logic is missing from script.js.");
  process.exit(1);
}

console.log("Site check passed.");
