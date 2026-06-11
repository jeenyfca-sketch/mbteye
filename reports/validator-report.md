# Validator Report

## Result

No P0 or P1 blocking issues remain.

## External Validator Findings Addressed

### P2: Placeholder submit email

Status: fixed.

Change:

- Replaced the placeholder `mailto:hello@nunbti.example` CTA with an internal safety/ethics CTA.

File:

- `index.html`

### P2: Long-term planning document in code workspace

Status: fixed.

Change:

- Moved canonical long-term planning to the Google Drive architecture folder.
- Kept only an implementation-facing project goal report in the code workspace.

Files:

- `G:\내 드라이브\눈비티아이\웹사이트\아키텍춰\11_장기_목표와_개발_로드맵.md`
- `reports/project-goal-report.md`

### P2: Result-level safety wording

Status: fixed.

Change:

- Added a result card disclaimer explaining that the result is self-report based, for entertainment/personality-style exploration, and not a medical diagnosis or absolute personality judgment.

File:

- `script.js`

### P3: QA script coverage

Status: fixed.

Change:

- Added section ID checks.
- Added placeholder `.example` URL guard.
- Added result safety wording check.
- Added known axis validation.
- Added required axis-pair coverage checks.

File:

- `scripts/check-site.mjs`

## Verification

Automated check:

```text
Site check passed.
```

Browser check:

- Website opens at `http://127.0.0.1:4173`.
- Six-question test flow completes.
- Result card renders.
- Result card includes safety wording.
- Browser console shows no errors or warnings.

## Remaining Non-Blocking Items

- Replace placeholder content cards with real YouTube videos when channel URLs are ready.
- Add a real submission form only after consent, storage, and deletion policies are finalized.
- Consider migration to Next.js or Astro for SEO and route-level result pages.
