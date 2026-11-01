# Vega · status map

The states each object can be in, as the showroom app shows them today. The label in the app is in brackets.

## Client tier (set in the back office when the client is added)

Every client gets one tier. It is back-office logic only: the seller never sees it in the app, only its effects. Each tier sees everything the tiers below it see, plus its own styles.

| Tier | Styles open to the client | Default budget split, Women (Bags / RTW / Shoes / Acc.) | Default budget split, Men (Bags / RTW / Shoes / Acc.) |
|---|---|---|---|
| Silver | The core collection: 27 styles. | 50 / 20 / 15 / 15 % | 25 / 45 / 20 / 10 % |
| Gold | Silver + 9 styles: Mini Featherlight Puzzle, Small Puzzle Edge, Large Featherlight Puzzle, Squad backpack, the puffer jackets, the short coat, Dive mule, Grip sneaker. | 45 / 25 / 15 / 15 % | 25 / 45 / 20 / 10 % |
| Platinum | Gold + 2 styles: Medium Bilbao bucket, Small Whisker bag. | 40 / 30 / 15 / 15 % | 30 / 40 / 20 / 10 % |
| Diamond | Everything, including styles set as Diamond only (none in this demo). | 35 / 35 / 15 / 15 % | 30 / 40 / 20 / 10 % |

- **What the tier drives:** which styles the client can buy (a style set for a higher tier shows as Not available and is hidden during a visit), and how the division budget is split by category until the back office sets a budget per category for that client (±5 points tolerance).
- **On each style** the back office sets the lowest tier that can buy it.
- **A client added in the showroom** (New session, no back-office profile yet) starts as Silver until the back office assigns a tier.

## Client visit (appointment)

| Status | Meaning |
|---|---|
| Scheduled (no tag) | The appointment is on the calendar and the client hasn't arrived yet. Only Check in is offered. |
| Ongoing (`Ongoing`) | The seller checked the client in. That client is in session: the black pill (first two pieces added, client name, View order) sits above the nav, the Collection shows what they can buy and tapping the pill opens their order full screen, without the tab bar. Only one client per seller can be ongoing. |
| Checked out (order status, e.g. `Sent`) | The visit ended: Save draft in the order (it stays a draft), the client signing (all or part of the order), or Check out on the client's row on Home. The row on Home shows where that client's order stands; the seller can view it or check the client in again. |
| Checked in again (`Ongoing`) | Same as Ongoing, but the visit keeps its first start time. |

Checking in a new client automatically checks out the client the seller was with.

## Order (whole order, as listed in Orders)

| Status | Meaning |
|---|---|
| Not started (`Not started`) | The client has an appointment but no products have been selected yet. |
| Draft (`Draft`, grey) | Products are being selected and quantities entered. Everything can still change. |
| With client (`With client`, amber) | A review link was sent; the client has 48 hours to check and sign it. |
| Partly sent (`Partly sent`, blue) | One division (Women or Men) is sent, the other is still open. |
| Sent (`Sent`, blue) | Every division has been sent, signed by the client on the phone or through the link. Read-only for the seller. |
| Confirmed (`Confirmed`, solid green) | The commercial team confirmed it for production in the back office. |

## Order part (Women / Men, each on its own)

| Status | Meaning |
|---|---|
| Draft | This division can still be edited. |
| With client | The link for this division is with the client, waiting for their signature. |
| Sent | Signed and sent. Its lines are locked; the other division can still be edited. |
| Confirmed | Confirmed for production by the back office. |

The whole order's status is worked out from its parts: all the same → that status; at least one sent → Partly sent; otherwise With client or Draft.

## Product, for the client in session

| Status | Meaning |
|---|---|
| Available (`Add`, black) | The client can buy it. Add sits at the bottom of the card, under the prices; tapping it puts the style in the order at zero units and slides its product page up over the Collection to enter sizes. |
| In order (`Edit · N units`, outlined, at the bottom of the card) | Already in the client's selection. Add turns into Edit, in the same place and at the same height, with the units of that style across all its colours (0 until quantities are set). Edit opens the product page again, where colours and quantities are set. |
| Not available (`Not available`) | Not open to this client's tier (see Client tier). Hidden from the Collection during a visit. |
| Division not bought (`No men’s` / `No women’s`) | The client doesn't buy that division. |
| Division sent (`Women sent` / `Men sent`) | That part of the order is sent, so nothing more can be added to it. |

## Product tag (set in the back office, shown on the photo)

| Tag | Meaning |
|---|---|
| Must have (`Must have`, black) | One of the season's hero pieces. |
| Essential (`Essential`, white) | A core style. |
| None | No tag on the photo. |

A style that can't be bought shows why instead of its tag.

## Guideline checks (Budgets & KPIs, Home guidelines)

| Status | Meaning |
|---|---|
| Within budget (green) | Spend is at or under the budget set in the back office. |
| Slightly over (amber) | Up to 10% over budget. |
| Over (red) | More than 10% over, or spending where no budget is set. |
| Mix rule within (`Within`, green) | A family is inside its limit, shown in euros (e.g. Puzzle max €7,089, from the 30% rule set in the back office). |
| Mix rule over a max (`Over`, red) | A family is above its maximum share. |
| Mix rule under a min (`Under`, amber) | A family is below its minimum share. |
| Required look done (`Done`) | Every piece of a required look is in the order with quantities. |
| Required look open (`Open`) | Some pieces of a required look are still missing. |

Guideline issues never block sending: they are listed under "Outside the guidelines" before the order goes out.

## QA scenarios

Run on an iPhone in portrait unless a step says otherwise. Start each run from fresh demo data: **Reset demo** in the side panel (desktop view), or clear the site data on the phone. Demo data: the seller is Roberto D.; Maison Dubois (Paris, Platinum, Women + Men) is ongoing; Linea Concept (Gold, Women only), Harbour & Co. (Silver, Men only) and Kanda Select (Diamond, Women + Men) are later today. Each line is: what to do → what should happen.

### 1. Sign in, sign out, passcode
- [ ] 1.1 Profile → Sign out → the full-screen "Who's selling?" list of sellers shows.
- [ ] 1.2 Pick Roberto D. with no passcode set → any 4 digits sign in; toast "Signed in as Roberto D.".
- [ ] 1.3 Profile → Set passcode → enter 4 digits, then the same 4 again → toast "Passcode set"; the row now reads Change passcode.
- [ ] 1.4 Set passcode with a different second entry → "The codes don't match. Try again."; nothing is saved until both match.
- [ ] 1.5 Sign out, pick Roberto D., enter a wrong code → "Wrong code. Try again." and the dots clear; the right code signs in.
- [ ] 1.6 Cancel on the PIN pad → back to the list of sellers.
- [ ] 1.7 Sign out while Maison Dubois is ongoing, sign back in as Roberto D. → the visit and its pill are still there.
- [ ] 1.8 Sign in as Sofia L. → Home shows only Sofia's clients (Atelier Nove, Casa Prisma…); Profile → Orders shows only hers.

### 2. Home and appointments
- [ ] 2.1 Home opens on today, with one past day visible to the left of today in the day strip.
- [ ] 2.2 Tap other days → each shows its appointments, or "No appointments on this day."
- [ ] 2.3 The ongoing client sits under **Now** with a green Ongoing tag; the others under **Today** (both headings in sentence case, black, slightly larger than the text), each with time, city and what they buy per division.
- [ ] 2.4 Tap a client not yet checked in → sheet with Budget and Notes, and only **Check in** at the bottom.
- [ ] 2.5 Type in Notes, close and reopen → the note is kept ("Saved automatically").
- [ ] 2.6 Tap the ongoing client → "Ongoing since …", with Check out and Add products.
- [ ] 2.7 Tap the Home title → the app reloads; data and the visit are kept.

### 3. Check in, client pill, check out
- [ ] 3.1 Check in Linea Concept → toast "Checked in · Linea Concept"; the Collection opens; Maison Dubois is checked out automatically (only one client ongoing at a time).
- [ ] 3.2 The black pill sits above the tab bar on every tab: client name in bold, "View order" underneath.
- [ ] 3.3 With no products yet the pill shows the orders icon; after the first and second pieces it shows their photos; adding more pieces does not change the two photos.
- [ ] 3.4 The right photo is on top, with a black ring cutting into the left one.
- [ ] 3.5 Tap the pill → the order opens full screen; the tab bar is hidden; only the floating buttons show at the bottom.
- [ ] 3.6 On Home, tap the ongoing client → Check out → toast "Checked out · …"; the pill disappears; the row shows the order status (e.g. Draft).
- [ ] 3.7 Check the same client in again → Ongoing again; the sheet said "Checking in again keeps this start time".
- [ ] 3.8 Check in from a sent order (Check in to add products) → the button is disabled when every part is sent.

### 4. Collection
- [ ] 4.1 With a client in session, the title shows only the divisions they buy (Linea: Women only; Harbour: Men only; Dubois: Women and Men).
- [ ] 4.2 Category tabs (Ready-to-wear, Bags, Shoes, Accessories) stick to the top; tapping one scrolls to it; scrolling highlights the current one.
- [ ] 4.3 Search by name, code or family (e.g. "Puzzle", "A510") → only matching styles; a search with no match shows "No styles match …".
- [ ] 4.4 Filters → Collection (Spring Summer 2027, Pre-Spring 2027, Permanent collection: titles only), Drop (All drops; Drop 1 "Delivers 15 January 2027"; Drop 2 "Delivers 20 February 2027") and Tag (All styles, Must have, Essential, Other styles) → the grid updates; the filter button shows as on; a chip under the search for the drop and one for the tag, each clears its filter.
- [ ] 4.4b Tag filter with a client in session: Must have shows only black-tagged styles, Essential only white-tagged ones, Other styles only untagged ones; the three together add up to All styles.
- [ ] 4.5 Product tags on the photos: Must have in black (e.g. Small Amazona 180), Essential in white (e.g. Medium Puzzle Fold tote), none on the others.
- [ ] 4.6 With nobody in session, the Collection shows Women and Men and every style.

### 5. Client tiers (what each client can see)
- [ ] 5.1 Check in Harbour & Co. (Silver) → Large Featherlight Puzzle, Squad backpack, the puffer jacket and Grip sneaker are not in the Collection.
- [ ] 5.2 Check in Linea Concept (Gold) → Mini Featherlight Puzzle and Small Puzzle Edge show; Medium Bilbao bucket and Small Whisker bag don't.
- [ ] 5.3 Check in Maison Dubois (Platinum) → Medium Bilbao bucket and Small Whisker bag show.
- [ ] 5.4 Check in Kanda Select (Diamond) → every style shows.
- [ ] 5.5 New session (Profile → Orders → +) → the new client sees only the Silver styles.

### 6. Adding a style and entering quantities
- [ ] 6.1 Each card shows photo, name, code, wholesale and retail price, colour dots and a black **Add** button at the bottom.
- [ ] 6.2 Tap Add → the product page slides up as a bottom sheet over the Collection; it says "In order · no quantity yet"; toast "Added to order".
- [ ] 6.3 Tap Add, set quantities (or nothing) in the sheet and close it → the card shows **Edit · N units** outlined, in the same place and at the same height as Add (Edit · 0 units if nothing was set).
- [ ] 6.4 Tap Edit → the product page opens again on the colour in the order, with the quantities entered; another colour can be added from there.
- [ ] 6.5 Remove from order on the product page → the card goes back to Add.
- [ ] 6.6 Add is black, Edit outlined; with two colours in the order (e.g. Small Amazona 180 in Mocha ×3 and Black ×2) Edit shows the total across colours: Edit · 5 units.
- [ ] 6.7 Product page: size curves (Core, Full), "+1 each" and Clear work on sized styles; one-size styles have only − / +, with no preset numbers.
- [ ] 6.7b Product page of a style already in the order: change a quantity → the white "In order · N units" message turns into a black **Update quantity** button; tap it → a spinner turns in the middle of the button, then the white message comes back with the new units, above Remove from order.
- [ ] 6.7c Change a quantity and close the sheet without tapping Update quantity → the change is kept; toast "Quantity updated"; Edit on the card shows the new total.
- [ ] 6.8 Product page, another colour not in the order: set quantities, then **Add to order · N units** → that colour joins the order; colours in the order carry a flag.
- [ ] 6.9 Product page: Remove from order takes that colour out.
- [ ] 6.10 Tap the photo or name of a card → the same product sheet opens without adding anything.
- [ ] 6.11 Photos: swipe the carousel; tap a photo → full-screen zoom; close it.
- [ ] 6.12 With nobody in session, tap Add → "Add to an order" lists your appointments; pick one → that client is checked in and the style is added.

### 7. Looks
- [ ] 7.1 Looks tab → the lookbook per division (only the divisions of the client in session) and the Buying guidelines row.
- [ ] 7.2 Buying guidelines → mix rules per division, required looks, drops with their style counts.
- [ ] 7.3 Open a look → photos, VM intent, its pieces with prices; pieces in the order show "Added"; pieces the client can't buy show why.
- [ ] 7.4 Tap one piece → it is added to the order of the client in session.
- [ ] 7.5 **Add the whole look · N pieces** → every missing piece the client can buy is added; the button then reads "Whole look is in the order".

### 8. Camera (photo match)
- [ ] 8.1 Collection, camera button (only with a client in session) → viewfinder with "Frame the sample".
- [ ] 8.2 Shutter → "Finding the style…" → the match (Mini Amazona 180, Sunrise Orange) with Add to order and alternatives.
- [ ] 8.3 Add to order, or pick an alternative → the camera closes and the style is in the order.
- [ ] 8.4 Retake photo → back to the viewfinder; × closes the camera.

### 9. Order page
- [ ] 9.1 The header shows only the client name (no order code) and a back button.
- [ ] 9.2 Status, City and Saved time; Women / Men switch for clients who buy both.
- [ ] 9.3 Budget card: spend of budget, bar coloured green / amber / red, and "Within the guidelines" or "N outside the guidelines"; tap → Budgets & KPIs (budget per category, mix rules, required looks).
- [ ] 9.4 Lines grouped by category; the category headings (Ready-to-wear, Bags…) show only the name, no total, in sentence case and black, like Now / Today on Home. Each line: name, item code in regular black with a white Drop 1 / Drop 2 tag next to it, then the colour; no wholesale or retail price, only the line total and units. One-size lines have a − / + stepper; sized lines show the sizes as "36 x1" and a full-width Enter sizes / Edit sizes button (like Edit on the Collection cards); lines without quantity say "No quantity yet".
- [ ] 9.5 × on a line → the native iOS alert "Delete [style] in [colour] from the order?"; Cancel keeps it, OK removes it.
- [ ] 9.6 A division with no products shows "No … products yet. Tap Add on any style in the Collection".
- [ ] 9.7 During the visit the bottom buttons are **Save draft** and **Review and sign**; outside a visit, a round sign button and Check in to add products.
- [ ] 9.8 Save draft → the client is checked out; back to Home; toast "Draft saved · … checked out"; the row shows Draft.

### 10. Review and sign
- [ ] 10.1 Review and sign → the sheet lists Women's and Men's with status, units and value; parts with units are ticked; a part with no units can't be picked.
- [ ] 10.2 Styles without quantity → warning "N selected styles have no quantity and won't be produced".
- [ ] 10.3 Over budget or outside a mix rule → "Outside the guidelines" lists each issue; sending is still allowed.
- [ ] 10.4 Sign and send → full-screen "Sign the order": client, parts, units and value; Confirm stays disabled until a name is typed and a signature drawn.
- [ ] 10.5 Confirm and send (all parts) → checked out, back to Home; toast "Women + Men sent · … checked out"; the row shows Sent.
- [ ] 10.6 Sign only Women for a Women + Men client → also checked out and back to Home; the row shows Partly sent.
- [ ] 10.7 Open that order → banner "Partly sent" with one line "Women signed · Men still a draft"; the tick is centred in its circle; Women lines are read-only, with the note that the women's order has been sent.
- [ ] 10.8 Check the client in again → in the Collection, women's styles show "Women sent" and can't be added; Men can still be completed and signed.
- [ ] 10.9 Fully sent order → banner "Sent" with one line "Signed by [name] · [date, time]". A confirmed order → "Confirmed" with "Ready for production". The line under a banner title never repeats the title and never wraps.

### 11. Review link (client signs later)
- [ ] 11.1 Review and sign → **Send the link to the client** → toast "Link sent · closes in 48h"; the link box with Copy appears; the order shows With client and the banner line "Link sent · 48h left to sign".
- [ ] 11.2 Copy → toast "Copied".
- [ ] 11.3 Open as the client (demo) → "Your SS27 order" with "Closes in 48h", budgets and mix checks, the lines, Add a style, and Review and sign.
- [ ] 11.4 As the client, change a quantity or add a style → the change shows on the seller's order; in the client view the line is marked as the client's.
- [ ] 11.5 As the client, Review and sign → the order is sent; the client sees the thank-you note; Back to salesperson returns to the seller app.

### 12. Profile, orders, feedback
- [ ] 12.1 Profile shows the seller's name, then Orders and Set passcode (Change passcode once set) with no grey line under them, App feedback with one line "Tell us what works and what doesn't", and Sign out in red.
- [ ] 12.2 Orders → tiles (total value, sent, in draft), filters All / Draft / Sent, one row per order with status, value and units; With client rows show hours left.
- [ ] 12.3 Tap an order → it opens full screen; back returns to the list.
- [ ] 12.4 + in Orders → New session: Shop, City, Buying for, budgets; Start session is disabled until a shop name is typed; starting checks the new client in.
- [ ] 12.5 App feedback → type a note, attach a screenshot (thumbnail with ×), remove it, send → toast "Thanks · feedback sent".

### 13. General
- [ ] 13.1 Close and reopen the app (home-screen icon): orders, notes, the client in session and the passcode are kept.
- [ ] 13.2 Every bottom sheet closes with × and by tapping the dimmed page behind it.
- [ ] 13.3 Landscape (iPad or the side panel's Landscape switch): layouts hold, nothing overlaps the pill or the floating buttons.
- [ ] 13.4 Dark mode on the phone: text stays readable; the pill and the Must have tag stay black.
- [ ] 13.5 Nothing sits under the notch or the home indicator; the last card in the Collection scrolls clear of the pill and tab bar.
- [ ] 13.6 Every message (toast) slides up from the bottom edge of the screen and sits just above it, the same on every screen: over the tab bar and the client pill, over a product page and over the order buttons.
- [ ] 13.7 Close buttons are easy to hit: the × on the product page (a 44px circle, and a near miss just outside it still closes), on the full-screen photos and on the full-screen pages (Set passcode, Sign the order, sign-in).
