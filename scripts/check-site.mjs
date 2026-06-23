import { readFileSync, existsSync } from "node:fs";

if (!existsSync("index.html")) {
  console.error("Missing file: index.html");
  process.exit(1);
}

const html = readFileSync("index.html", "utf8");

for (const needle of [
  "눈으로 보는 MBTI",
  "필수 가이드",
  "동공의 크기",
  "자율신경선의 굵기",
  "동공 바깥쪽 마감 형태",
  "과녁 모양 나이테 주름",
  "E형 선택",
  "I형 선택",
  "S형 선택",
  "N형 선택",
  "T형 선택",
  "F형 선택",
  "J형 선택",
  "P형 선택"
]) {
  if (!html.includes(needle)) {
    console.error(`index.html missing required content: ${needle}`);
    process.exit(1);
  }
}

for (const removed of [
  "page-intro",
  "page-q1",
  "page-q2",
  "page-q3",
  "page-q4",
  "page-result",
  "nextPage",
  "selectOption",
  "showResult",
  "restartTest",
  "mbti-text",
  "Rayid Method",
  "styles.css",
  "script.js"
]) {
  if (html.includes(removed)) {
    console.error(`Old homepage content is still present: ${removed}`);
    process.exit(1);
  }
}

console.log("Site check passed.");
