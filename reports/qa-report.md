# QA Report

## Local Server

- URL: `http://127.0.0.1:4173`
- Server command: `python -m http.server 4173 --bind 127.0.0.1`
- HTTP status: `200`

## Automated Check

Command:

```powershell
node scripts/check-site.mjs
```

Result:

```text
Site check passed.
```

## Browser Flow

Verified in the in-app browser:

1. Opened the website.
2. Confirmed page title: `눈비티아이 | 눈으로 보는 나의 성향`.
3. Confirmed hero, navigation, test section, and type cards render.
4. Completed all six test questions.
5. Confirmed result renders as `스파크큐리어스 아이` for a texture/glow-heavy answer set.

## Mobile Check

Viewport:

- Width: `390`
- Height: `844`

Observed:

- Body width stays within viewport.
- Navigation does not overflow.
- Hero heading renders.

## Remaining Manual Checks

- Real YouTube links are placeholders and should be connected when the channel URLs are ready.
- Submit flow currently uses a placeholder email address.
- No production analytics are wired yet.
