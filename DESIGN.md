# Vega · UI system

The rules the app's stylesheet follows (`docs/index.html`, tokens at the top of `<style>`). Change a value here and in `:root`, never in a single rule.

## Type
Four sizes, each with one job. Hierarchy beyond these comes from weight, colour, case and space, not new sizes.

| Token | Size | Used for |
|---|---|---|
| `--fs-caption` | 12px | Labels (uppercase), tags and pills, meta lines, helper text, chips, tab bar labels |
| `--fs-body` | 15px | Everything you read or tap: rows, buttons, values, callouts, card names |
| `--fs-heading` | 17px | Section headings (Now, Today, Ready-to-wear), sheet and nav titles, client names, form inputs (17px also stops iOS zooming into a field) |
| `--fs-title` | 28px | Page titles, the product name, big numbers (quantities, PIN keys, KPI totals) |

- Weights: 400 regular, 600 semibold (labels, values, buttons), 700 bold (titles and primary buttons). Nothing in between.
- Line height: `--lh-tight` 1.2 for headings and titles, `--lh-body` 1.4 for text.

## Colour
- **Structural:** `--bg` (canvas), `--surface` (white cards and groups, pulled forward), `--surface-2` (pressed and secondary fills), `--line` (borders and dividers).
- **Text greys:** `--ink` for text, `--muted` for secondary text that must be read (4.5:1 on the canvas), `--faint` only for large text, placeholders and non-text marks (3:1).
- **Primary action:** black (`--ink` with `--bg` text). One per screen: Add to order, Finish order, Send to commercial team, Continue, Check in.
- **Interactive (`--accent`, blue):** links, the active tab, the selected day, active filters, focus rings and selection checks. Never a filled primary button.
- **Status:** green `--good`, amber `--warn`, red `--bad`, each with its `-bg` tint. Always with a word or icon too (Within, Over, ⚠), never colour alone. Budget spend is red under half of the budget, yellow from half, and green once it is reached or passed. "In the order" is always a green round ✓: on the Collection card (about as tall as the priority tag) and on each colour chip.
- **Client band:** `--band`, black in light and dark mode (client band at the top, Must have tag, status bar strip).

## Shape and depth
- Radius: `--r-xs` 4 (chips, bars), `--r-s` 8 (photos), `--r-m` 12 (controls, inputs, size cells), `--r-l` 16 (cards, list groups, panels), `--r-xl` 22 (sheet tops). Anything as tall as it is round (pills, round buttons) uses 999px.
- Shadows, light from above: `--shadow-raised` (selected segment), `--shadow-float` (floating buttons, pill, tab bar, toast), `--shadow-sheet` (bottom sheets). Cards use a white surface and a hairline border, not shadows.

## Space
- 2px micro grid: every padding, margin and gap is an even number of pixels.
- Page gutter 18px. Inside components: 4–8px between a label and its value, 10–14px inside cards, 16–24px between sections.

## Actions
- One primary (black, filled), secondary (white with a border), tertiary (blue text link).
- Destructive actions are red outline or red text and ask first (native confirm).
- Squircle corners (superellipse, the `--squircle` mask): budget bars 18px, look cards 10px.
- Priority tags (Must have, Essential) are small pills in regular weight: 11px on the Collection card (the one exception to the four text sizes), 12px on the product page.
- Icons are Phosphor (MIT), fill weight everywhere. Pure line marks (×, ✓, +, −, chevrons, filter) stay as lines (regular, or bold for a heavier stroke), since their fill version is a filled box or triangle.
- Icons for + and −, never text glyphs, so they line up the same in every stepper.
