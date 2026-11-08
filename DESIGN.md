# Vega · UI system

The rules the app's stylesheet follows (`docs/index.html`, tokens at the top of `<style>`). Change a value here and in `:root`, never in a single rule.

## Type
Four sizes, each with one job. Hierarchy beyond these comes from weight, colour, case and space, not new sizes.

| Token | Size | Used for |
|---|---|---|
| `--fs-caption` | 12px | Labels (uppercase), tags and pills, meta lines, helper text, chips |
| `--fs-body` | 15px | Everything you read or tap: rows, buttons, values, callouts, card names |
| `--fs-heading` | 17px | Section headings (Now, Today, Ready-to-wear), sheet and nav titles, client names, form inputs (17px also stops iOS zooming into a field) |
| `--fs-title` | 28px | Page titles, the product name, big numbers (quantities, PIN keys, KPI totals) |

- Weights: 400 regular, 600 semibold (labels, values, buttons), 700 bold (titles and primary buttons). Nothing in between.
- Line height: `--lh-tight` 1.2 for headings and titles, `--lh-body` 1.4 for text.

## Colour
- **Structural:** `--bg` (white canvas), `--surface` (light grey cards and groups, with squircle corners and no outline), `--surface-2` (pressed and secondary fills), `--card` (white: Collection cards and the selected segment), `--line` (dividers inside a box). Home appointments, the order's lines, a look's pieces, the Profile rows are separate grey rows with a 2px gap instead of a divider (the budget rows in Buying guidelines and in the client sheet use 1px, names and amounts 14px regular, with a bold Total row last; 14px is a third exception to the four sizes).
- **Text greys:** `--ink` for text, `--muted` for secondary text that must be read (4.5:1 on the canvas), `--faint` only for large text, placeholders and non-text marks (3:1).
- **Primary action:** black (`--ink` with `--bg` text). One per screen: Add to order, Finalize order, Send to commercial team, Continue. Checking a client in is green instead (`--good`), always with the same check icon (18px, 2.2 stroke), 46px, 15px semibold: Check in, Check in again, Start session. Choose a client stays black with no icon (it opens the list, it doesn't check anyone in).
- **Toasts** never repeat the client's name: "Session ended", "Checked out", "Women sent · Checked out".
- **Interactive (`--accent`, blue):** links only (and the blue status pills and info callouts). Every active or selected state is black (`--ink`): the active tab, the selected day, active filters, selected options, sizes with a quantity, focus rings. Never a filled primary button.
- **Status:** green `--good`, amber `--warn`, red `--bad`, each with its `-bg` tint. Always with a word or icon too (Within, Over, ⚠), never colour alone. Budget spend is red under half of the budget, yellow from half, and green once it is reached or passed. "In the order" is always a green round ✓: on the Collection card (about as tall as the priority tag) and on each colour chip.
- **Black marks:** `--band`, black in light and dark mode (Must have tag, status bar strip). There is no client band: the client in session shows as a badge on the Order tab.
- **Tab bar:** edge to edge at the bottom, 80% white with a blur (the page scrolls under it), no line on top, 14px in from each side so Home and Order don't sit on the screen edge; Home, Looks, Scan (middle), Collection, Order; active item black, others grey.

## Shape and depth
- Radius: `--r-xs` 4 (chips, bars), `--r-s` 8 (photos), `--r-m` 12 (controls, inputs, size cells), `--r-l` 16 (cards, list groups, panels), `--r-xl` 22 (sheet tops). Anything as tall as it is round (pills, round buttons) uses 999px.
- Shadows, light from above: `--shadow-raised` (selected segment), `--shadow-float` (floating buttons, toast), `--shadow-sheet` (bottom sheets). Cards use a white surface and a hairline border, not shadows.

## Space
- 2px micro grid: every padding, margin and gap is an even number of pixels.
- Page gutter 18px. Inside components: 4–8px between a label and its value, 10–14px inside cards, 16–24px between sections.

## Actions
- One primary (black, filled), secondary (white with a border), tertiary (blue text link). Two buttons side by side at the bottom of a sheet are each half the width. Finalize order is text only.
- Status tags are just the word (Ongoing has no dot in front) and no tag has a border: grey tags are `--ink` at 9% over whatever is behind, Ongoing is `--good` at 18%, so they read on white, on grey and green rows, and in dark mode. Essential and Permanent stay white on the photo.
- Every button is 46px tall and semibold (600), sheet, page and alert alike.
- The Order and Guidelines tiles in the client sheet are white with a 1px grey (`--line`) outline, drawn as a grey squircle around a white one so it follows the squircle in every browser. They are the one outlined box; other content boxes are grey with no outline.
- Profile circles are a soft grey gradient, lighter at the top (`--avatar-top`) and darker at the bottom (`--avatar`), with white initials (darker greys and light initials in dark mode), never flat black or white.
- Destructive actions are red outline or red text and ask first (native confirm). Leave (end the client session) is red text on a light grey pill, like an iOS bar button, at the top right of the order, and asks with an in-app alert (Cancel / Yes, leave).
- Collection cards: white, 24px squircle, shaped only by the mask (border-radius 0: Safari has no corner-shape and would draw round bottom corners); photo full-bleed to the card's top and sides, soft drop shadow (on a wrapper, since the squircle mask clips a shadow on the card itself).
- Squircle corners (superellipse, the `--squircle` mask) come from the mask alone: masked boxes have border-radius 0 wherever the mask is supported (a radius as well would clip the corners again, round in Safari, and eat into outlines). Squircle radii: budget bars 18px, look cards 20px, Home day tiles, Home appointment list and Collection cards 24px.
- Priority tags (Must have, Essential) are small pills in regular weight: 11px on the Collection card, 12px on the product page. Tab bar labels are 10px regular. These two are the exceptions to the four text sizes.
- Segmented controls are pills: container and selected segment fully round on the sides (999px).
- Icons are Lucide (ISC) everywhere, drawn as lines (1.8px stroke, heavier for small marks like ✓, + and −). Two exceptions from Phosphor (MIT): Shoes is the high heel in its regular line weight (Lucide has none), and the city pin on Home is Phosphor's filled map pin (a line icon is too thin at 12px).
- Icons for + and −, never text glyphs, so they line up the same in every stepper.
