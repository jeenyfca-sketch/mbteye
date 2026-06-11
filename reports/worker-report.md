# Worker Report

## Scope

Build a first-pass NunBTI website MVP in the Codex coding workspace:

- Home
- Self-report eyeBTI test
- Result rendering
- Type archive
- Content section
- Submit guide
- Ethics guidance

## Workspace Boundary

- Planning and architecture documents remain in the Google Drive workspace.
- Code lives in `C:\Users\tesla\codex\nunbti-website`.

## Implementation Checklist

- Home introduces the NunBTI brand and core CTA.
- Test flow lets users answer self-report eye-impression questions.
- Result logic is deterministic and visible in `script.js`.
- Eight eyeBTI types are stored in `data/eye-types.json`.
- Test questions are stored in `data/test-questions.json`.
- Ethics wording appears in the notice and ethics section.
- Submit section avoids direct image upload in the MVP.
- Brand assets are copied locally into `assets/brand`.

## Risks

- Eye and iris content can be mistaken for face reading, health diagnosis, or fixed personality judgment.
- Image upload should remain out of scope until consent, storage, and deletion flows are designed.
- Result language must stay suggestive rather than deterministic.
- If the project grows, migrate from static files to Next.js or Astro with a typed content model.

## Acceptance Criteria

- The site opens locally.
- The user can go from home to test to result without reload.
- All type cards render.
- Mobile layout remains readable.
- Required safety wording is visible.
