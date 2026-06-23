import { readFileSync, existsSync } from "node:fs";

if (!existsSync("index.html")) {
  console.error("Missing file: index.html");
  process.exit(1);
}

const html = readFileSync("index.html", "utf8");

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
    console.error(`Homepage content is still present: ${removed}`);
    process.exit(1);
  }
}

if (!html.includes("<body>") || !html.includes("</body>")) {
  console.error("index.html must keep a valid empty body.");
  process.exit(1);
}

console.log("Site check passed.");
