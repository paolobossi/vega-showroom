# Screen flows

`shoot.mjs` opens the app in headless Chrome at iPhone size (390×844, light mode) and takes one screenshot per screen and state: 70 scenarios in 10 flows (A Sign in … J Client view). It loads `docs/index.html` with a small hook (`window.__v`) added in memory only, to drive the app's own actions; the file on disk is not changed.

The screenshots go on a review page in Claude (comments there reach Claude directly) and on the FigJam board **Vega · Screen flows**: https://www.figma.com/board/Ov9sjnHlEyzkQ2vK8c2jk6

## Refresh

1. Start the local server on port 4175 (preview "vega-main", or `python3 -m http.server 4175 --directory docs`).
2. In `tools/screens`: `npm install` once, then `node shoot.mjs`. One scenario: `node shoot.mjs order` (any id prefix).
3. The PNGs land in `tools/screens/out/` (not committed), with `manifest.json` (flow, id, title, note).
4. Review page: `node page.mjs` builds `out/review/` (index.html plus shots/*.webp, about 2 MB); ask Claude to publish that folder to the same Claude page.
5. FigJam: ask Claude to put them on the board: each screen is a rectangle named after its id, so new images replace the old ones in place.

A new screen or state: add a line with `add(flow, id, title, note, steps)` in `shoot.mjs`, then ask Claude to add its box and arrows on the board.
