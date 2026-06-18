import { readFileSync, existsSync } from "node:fs";

const required = ["index.html"];

const missing = required.filter(path => !existsSync(path));
if (missing.length) {
  console.error(`Missing files: ${missing.join(", ")}`);
  process.exit(1);
}

const html = readFileSync("index.html", "utf8");

for (const needle of [
  "눈BTI (NoonBTI)",
  "page-intro",
  "page-q1",
  "page-q2",
  "page-q3",
  "page-q4",
  "page-result",
  "내 눈BTI 확인하기",
  "nextPage",
  "selectOption",
  "showResult",
  "restartTest",
  "mbti-text"
]) {
  if (!html.includes(needle)) {
    console.error(`index.html missing required content: ${needle}`);
    process.exit(1);
  }
}

for (const removed of [
  '<link rel="stylesheet" href="./styles.css">',
  '<script src="./script.js"',
  "Rayid Method",
  "유형 아카이브",
  "콘텐츠 허브",
  "분석 신청"
]) {
  if (html.includes(removed)) {
    console.error(`Removed homepage content is still present: ${removed}`);
    process.exit(1);
  }
}

console.log("Site check passed.");
