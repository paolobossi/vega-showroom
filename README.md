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

- Photo recognition is simulated. The catalogue is 38 Loewe styles taken from loewe.com (names, style and colour codes, product photos); wholesale prices are indicative, derived from retail.
- Look photos are the real looks from the LOEWE Spring Summer 2027 show (loewe.com), but the pieces listed under each look are catalogue styles chosen for the demo, not the exact runway garments.
- Orders are saved in each device's browser, not a shared database.

## Structure

The whole app is `docs/index.html` (Preact + htm from a CDN, no build step), with product photos in `docs/img/` and runway look photos in `docs/img/looks/`. GitHub Pages serves the `docs/` folder.
