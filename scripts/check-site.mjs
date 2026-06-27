import { readFileSync, existsSync } from "node:fs";

if (!existsSync("index.html")) {
  console.error("Missing file: index.html");
  process.exit(1);
}

const html = readFileSync("index.html", "utf8");

for (const needle of [
  "눈으로 보는 MBTI",
  "필수 가이드",
  "eye-step1",
  "eye-step2",
  "eye-step3",
  "eye-step4",
  "goNext",
  "resetEyeTest",
  "eye-result-screen",
  "eye-mbti-text",
  "eye-graphic",
  "동공이 크다",
  "동공이 작다",
  "밧줄처럼 두꺼운 링 선",
  "실낱처럼 가느다란 실선",
  "매끄러운 원형 테두리",
  "전체 요철형 테두리",
  "일부분 요철형 테두리",
  "나이테 주름이 있음",
  "나이테 주름이 없음",
  "처음으로 되돌아가기",
  "compatibility",
  "compat-my-type",
  "compat-partner-type",
  "compatibility-button",
  "makeCompatibilityReport",
  "renderCompatibility",
  "compatibility-tabs",
  "compatibility-reader",
  "openCompatibilityReader"
]) {
  if (!html.includes(needle)) {
    console.error(`index.html missing required content: ${needle}`);
    process.exit(1);
  }
}

for (const broken of [
  "style.style",
  "<img",
  "data-fallback",
  "images.unsplash.com",
  "upload.wikimedia.org",
  "?뉰",
  "?덈룞",
  "page-intro",
  'id="mbti-text"',
  "script.js",
  "styles.css"
]) {
  if (html.includes(broken)) {
    console.error(`Broken or old homepage content is still present: ${broken}`);
    process.exit(1);
  }
}

console.log("Site check passed.");
