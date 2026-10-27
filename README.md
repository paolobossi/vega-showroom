# Vega

Showroom order capture for fashion wholesale. This repo holds the first web prototype of the iOS app.

**Live prototype:** https://paolobossi.github.io/vega-showroom/

On iPhone, open the link in Safari, tap Share, then **Add to Home Screen** to use it full screen like an app.

## What the prototype shows

- Photo capture of a showroom sample with an AI match to the catalogue and a confirmation step
- Fast size entry with size curves, colour switching and same-family / same-look suggestions
- Live guideline check per client cluster (Silver, Gold, Platinum, Diamond), with women's and men's budgets kept separate
- Shareable basket the buyer completes within 48 hours, and a record of who submitted each order
- Factory export as Excel-ready rows or XML

## Limits

- Photo recognition is simulated against a fictional catalogue (Maison Aurore).
- Orders are saved in each device's browser, not a shared database.

## Structure

The whole app is `docs/index.html` (Preact + htm from a CDN, no build step). GitHub Pages serves the `docs/` folder.
