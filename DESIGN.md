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
- **Structural:** `--bg` (white canvas), `--surface` (light grey cards and groups, with squircle corners and no outline), `--surface-2` (pressed and secondary fills), `--card` (white: Collection cards and the selected segment), `--line` (dividers inside a box). Home appointments sit on the white page split by a light 1px rule (55% of `--line`) from the page margin to the right edge, like order lines, with no box or shadow; the ongoing one under Now too, marked only by its green Ongoing tag. The Profile rows, the product details and the Choose a client list are separate grey rows with a 2px gap instead of a divider (the budget and Guidelines rows are the exception: white boxes with a grey outline, see below; names and amounts 14px regular, with a bold Total row last; 14px is a third exception to the four sizes).
- **Text greys:** `--ink` for text, `--muted` for secondary text that must be read (4.5:1 on the canvas), `--faint` only for large text, placeholders and non-text marks (3:1).
- **Primary action:** black (`--ink` with `--bg` text). One per screen: Add to order, Finalize order, Send to commercial team, Continue. Checking a client in is green instead (`--good`), always with the same check icon (18px, 2.2 stroke), 46px, 15px semibold: Check in, Check in again, Start session. Choose a client stays black with no icon (it opens the list, it doesn't check anyone in).
- **Toasts** never repeat the client's name: "Session ended", "Checked out", "Women sent · Checked out".
- **Interactive (`--accent`, blue):** links only (and the blue status pills and info callouts). Every active or selected state is black (`--ink`): the active tab, the selected day, active filters, selected options, sizes with a quantity, focus rings (a text field in focus gets a 2px black inner outline, no halo). Text fields type at the placeholder size (the Notes box 14px, like the Budget and Guidelines rows); the viewport has maximum-scale=1 so iOS does not zoom into fields under 16px. Never a filled primary button.
- **Status:** green `--good`, amber `--warn`, red `--bad`, each with its `-bg` tint. Always with a word or icon too (Within, Over, ⚠), never colour alone. Budget spend is red under half of the budget, yellow from half, and green once it is reached or passed. The budget bars use bright tints of these (green #2BBF6A, yellow #F2B705, red #F2553F) mixed with the white page, not with grey; the figures in them are 17px bold and the category name above them is the same colour; the bars are 52px tall and the icon tile on the left is upright, 34×40 with a 17px squircle; the name sits 6px tighter to the figures, the pair centred in the bar. "In the order" is always a green round ✓: on the Collection card (about as tall as the priority tag) and on each colour chip.
- **Black marks:** `--band`, black in light and dark mode (Must have tag, status bar strip). There is no client band: the client in session shows as a badge on the Order tab (16px tall, its number 11px regular).
- **Tab bar:** a floating white pill near the bottom (see below), the page scrolling under it; Home, Looks, Scan (middle), Collection, Order; active item black and bold on a grey capsule, others grey.

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
- Tab bar: a floating pill (`.tabbar`, `--card` at 78% with a 20px blur, radius 999px, shadow 0 1px 2px / 0 6px 24px), 18px from the sides, in line with the page content, and max(10px, safe area) from the bottom, over a fade to white; the active tab sits on a capsule (`.tab-ind`, ink at 7%, radius 999px) that slides to the tapped tab (transform, 0.34s ease-out; none under prefers-reduced-motion); the active label is 600.
- Money: `fmt` / `fmtK` print euros with a dot for thousands and a comma for decimals (de-DE grouping, since it-IT leaves 4-digit numbers ungrouped), € in front: €18.000, €18,5K.
- Segmented controls with equal segments (`Seg full`) draw the selected pill as one `.seg-ind` indicator that slides to the chosen segment (transform, 0.32s ease-out; none under prefers-reduced-motion).
- Budget and Guidelines lists sit in a `.g-box`: a grey (`--line`) squircle with 1px padding around a white squircle list, no rules between rows (Budget rows 10px apart, Guidelines rows 16px). `.g-box` and the Order tile use a 22px squircle (`--r-xl`).
- The Order tile in the client sheet is white with a 1px grey (`--line`) outline, drawn as a grey squircle around a white one so it follows the squircle in every browser. It is the one outlined box; other content boxes are grey with no outline.
- Profile circles are a soft grey gradient, lighter at the top (`--avatar-top`) and darker at the bottom (`--avatar`), with white initials (darker greys and light initials in dark mode), never flat black or white.
- Destructive actions are red outline or red text and ask first (native confirm). Leave (end the client session) is red text on a white pill with a grey outline at the top right of the order, and asks with an in-app alert (Cancel / Yes, leave). In the ongoing client's sheet on Home, Leave is the white half-width button with a grey outline and red text, next to Add products, and asks the same.
- A look's pieces use the order-line layout: no box, light 1px rule edge to edge, 72px squircle photo, wholesale price only.
- Sheet titles on the left have about 20px under the title block, matching the room above.
- Order page (trial): the budget card sits on white with no box; the order's lines are one list under the Order heading (no category headings), each line with no box, split by a light 1px grey line running edge to edge, its squircle photo 72px and flush with the heading; Edit sizes there is a white pill with a grey outline, the stepper is a grey outline pill with no fill, and units / value are 12px; figures on the lines are proportional (Inter's tabular 1 has a foot).
- Sheet titles: the close × is centred on the title's line.
- Collection cards: white, no shadow, no box of their own: the photo carries the 24px squircle (all four corners) and the details sit flush with its edges (no side padding), lines 4px apart, prices right after their labels (not right-aligned); the grid has 28px between rows (8px between columns), family headings 10px above their cards; earlier notes on the card mask follow: shaped only by the mask (border-radius 0: Safari has no corner-shape and would draw round bottom corners); photo full-bleed to the card's top and sides, soft drop shadow (on a wrapper, since the squircle mask clips a shadow on the card itself).
- Squircle corners (superellipse, the `--squircle` mask) come from the mask alone: masked boxes have border-radius 0 wherever the mask is supported (a radius as well would clip the corners again, round in Safari, and eat into outlines). Squircle radii: budget bars 32px (icon tiles in them 17px), look cards 20px, Home day tiles, Home appointment list and Collection cards 24px.
- Priority tags (Must have, Essential) are small pills in regular weight: 11px on the Collection card, 12px on the product page. Tab bar labels are 10px regular. These two are the exceptions to the four text sizes.
- Segmented controls are pills: container and selected segment fully round on the sides (999px).
- Icons are Lucide (ISC) everywhere, drawn as lines (1.8px stroke, heavier for small marks like ✓, + and −). Two exceptions from Phosphor (MIT): Shoes is the high heel in its regular line weight (Lucide has none), thickened with a stroke so its line matches the Lucide icons beside it, and the city pin on Home is Phosphor's filled map pin (a line icon is too thin at 12px).
- Icons for + and −, never text glyphs, so they line up the same in every stepper. Steppers are a white pill with a grey outline and no fill behind − and + (order lines; the one-size quantity on the product page, a size larger).
