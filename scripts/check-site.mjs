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

for (const broken of [
  "style.style",
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
