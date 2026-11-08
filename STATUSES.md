# Vega · status map

The states each object can be in, as the showroom app shows them today. The label in the app is in brackets.

Every screen and state as a screenshot, mapped by flow: review page in Claude **Vega Screen Flows** (https://claude.ai/artifact/CyixHhDDNJ9xneisjEHeqK, comments there reach Claude) and FigJam board **Vega · Screen flows** (https://www.figma.com/board/Ov9sjnHlEyzkQ2vK8c2jk6), made with `tools/screens` (see its README to refresh it).

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
| Ongoing (`Ongoing`) | The seller checked the client in. That client is in session: the Order tab shows their order (with the number of items as a black badge on its icon), and the Collection shows what they can buy. Only one client per seller can be ongoing. |
| Checked out (order status, e.g. `Sent`) | The visit ended: Finalize order in the order (sent to the commercial team or to the client to finish), or Leave in the ongoing client's sheet on Home. The row on Home shows where that client's order stands; the seller can view it or check the client in again. |
| Checked in again (`Ongoing`) | Same as Ongoing, but the visit keeps its first start time. |

Checking in a new client automatically checks out the client the seller was with.

## Order (whole order, shown on its appointment on Home)

| Status | Meaning |
|---|---|
| Not started (`Not started`) | The client has an appointment but no products have been selected yet. |
| Draft (`Draft`, grey) | Products are being selected and quantities entered. Everything can still change. |
| With client (`With client`, amber) | The client signed in the showroom and the order was sent back to them to finish: they got an email link and have 48 hours to add or change quantities and send it. |
| Partly sent (`Partly sent`, blue) | One division (Women or Men) is sent, the other is still open. |
| Sent (`Sent`, blue) | Every division has been signed and sent to the commercial team (from the showroom or by the client through the link). Read-only for the seller. |
| Confirmed (`Confirmed`, solid green) | The commercial team confirmed it for production in the back office. |

## Order part (Women / Men, each on its own)

| Status | Meaning |
|---|---|
| Draft | This division can still be edited. |
| With client | The client has the link for this division, to finish it. |
| Sent | Signed and sent. Its lines are locked; the other division can still be edited. |
| Confirmed | Confirmed for production by the back office. |

The whole order's status is worked out from its parts: all the same → that status; at least one sent → Partly sent; otherwise With client or Draft.

## Product, for the client in session

| Status | Meaning |
|---|---|
| Available (no mark) | The client can buy it. Tapping anywhere on the card slides its product page up over the Collection; entering the first quantity on a colour puts that colour in the order. |
| In order (green ✓ in the photo's top-right corner, exactly as tall as the Must have / Essential / Permanent tag, 18px) | Already in the client's selection, in at least one colour. The card has no buttons; tapping it opens the product page on the colour in the order. |
| Not available (`Not available`) | Not open to this client's tier (see Client tier). Hidden from the Collection during a visit. |
| Division not bought (no mark) | The client doesn't buy that division, but it is still shown. Adding a style from it asks "[Client] doesn't buy Men. Add Men to this order?"; on OK that division opens on the order with no budget. |
| Division sent (`Women sent` / `Men sent`) | That part of the order is sent, so nothing more can be added to it. |

## Product priority (set in the back office, shown on the photo; the Priority filter)

| Tag | Meaning |
|---|---|
| Must have (`Must have`, black) | One of the season's hero pieces. |
| Essential (`Essential`, white) | A core style. |
| Standard (no tag) | No tag on the photo. |

A style that can't be bought shows why instead of its tag.

## Guideline checks (Budgets & KPIs, Home guidelines)

| Status | Meaning |
|---|---|
| Budget far off (red) | Spend is under half of the budget set in the back office: amount and bar in red. |
| Budget getting there (yellow) | Spend is at least half of the budget but has not reached it: amount and bar in yellow. |
| Budget reached (green) | Spend is at or above the budget (going over is fine): amount and bar in green. |
| Nothing spent (grey) | No quantity in that category yet: grey bar with nothing filled. |
| Mix rule within (`Within`, green tag) | A family is inside its limit. Each rule: name with its tag, under it "6% of the order · max 30%", its value on the right. Only rules that touch a category the client buys are listed. |
| Mix rule over a max (`Over`, red tag) | A family is above its maximum share; the line under adds "· €6,150 over". |
| Mix rule under a min (`Under`, amber tag) | A family is below its minimum share; the line under adds "· €2,400 to go". |
| Required look done (`Done`, green tag) | Every piece of a required look is in the order with quantities; "4 of 4" on the right. |
| Required look open (`Open`, amber tag) | Some pieces of a required look are still missing; "2 of 4" on the right. |

Guideline issues never block sending (styles without a quantity do block Send to commercial team, see 10.2). The order page shows the division's budget per category and the guideline status; the details are under Budgets & KPIs. Women's and men's budgets are always separate and never added into one total (each division has its own Total row).

## QA scenarios

Run on an iPhone in portrait unless a step says otherwise. Start each run from fresh demo data: **Reset demo** in the side panel (desktop view), or clear the site data on the phone. Demo data: the seller is Roberto D.; Maison Dubois (Paris, Platinum, Women + Men) has a draft order from this morning but is not checked in; Linea Concept (Gold, Women only), Harbour & Co. (Silver, Men only) and Kanda Select (Diamond, Women + Men) are later today. Each line is: what to do → what should happen.

### 1. Sign in, sign out, passcode
- [ ] 1.1b The Profile sheet has no "Profile" title and no "Seller · showroom" line: just the avatar and your name with the × on the same line, then Order history, Set passcode and App feedback (just the name, no line under it) as grey rows split by a 2px white gap (no grey lines), then Sign out.
- [ ] 1.1 Home → the round avatar with your initials (top right) → Profile sheet → Sign out → the full-screen "Who's selling?" list of sellers shows.
- [ ] 1.2 Pick Roberto D. with no passcode set → any 4 digits sign in; toast "Signed in as Roberto D.".
- [ ] 1.3 Avatar → Set passcode → enter 4 digits, then the same 4 again → toast "Passcode set"; the row now reads Change passcode.
- [ ] 1.4 Set passcode with a different second entry → "The codes don't match. Try again."; nothing is saved until both match.
- [ ] 1.5 Sign out, pick Roberto D., enter a wrong code → "Wrong code. Try again." and the dots clear; the right code signs in.
- [ ] 1.6 Cancel on the PIN pad → back to the list of sellers.
- [ ] 1.7 Open the app (or reload it) → nobody is checked in: no badge on the Order tab, nothing under Now, even if a client was checked in when the app was closed. That visit shows as checked out; its order is kept.
- [ ] 1.8 Sign in as Sofia L. → Home shows only Sofia's clients (Atelier Nove, Casa Prisma…) and her initials in the avatar.

### 2. Home and appointments
- [ ] 2.1 Home opens on today, with one past day visible to the left of today in the day strip.
- [ ] 2.1b Each day in the strip is a narrow tile with large Apple-style (squircle) corners, nearly a pill: "Sun" (only the first letter capital), the date, then "Day 4" the same size and grey as "Sun" but not bold. Nothing in the strip is in capitals. The appointment list's top and bottom corners are the same 24px squircle as the day tiles. There is a little more space between the day strip and the list (or the Now heading). Appointment times use the same figures as the dates (the 1 has no foot).
- [ ] 2.2 Tap other days → each shows its appointments, or "No appointments on this day."
- [ ] 2.2b The page is white everywhere. Each appointment is its own light grey row; rows are split by a 2px white gap, not by a line. Content boxes everywhere are light grey on the white page, with squircle corners and no outline; Collection cards stay white with a soft shadow.
- [ ] 2.3 After checking a client in, the ongoing client sits under **Now** on a light green row (no border) with a green Ongoing tag (just the word, no dot in front); the others under **Today** (both headings in sentence case, black, slightly larger than the text), each with time, city and what they buy per division. The city (with a filled pin) sits right under the client name, the same in every row (a status tag on the right doesn't push it down), with a little more space before the division lines. Each line is the division (Women or Men, left-aligned) followed straight away by its categories, with no fixed column: a Men-only client has no gap after Men.
- [ ] 2.3b Every appointment sheet is headed by the client name and, just under it, the day ("Today" or the full weekday, e.g. "Saturday 7"), centred, with the close × on the name's line; no time or city. Budget and Notes are headings in the same style (17px bold, sentence case), each 10px above what follows and 26px below what comes before; the Women | Men switch sits 14px above the budget card. There is no Order heading: right under the name, **Order** and **Guidelines** are two white tiles with a thin grey outline that stays whole at the squircle corners, side by side, each an icon (clipboard; a bar chart for Guidelines) above a title with a grey line under it ("12 styles · 44 units"; "Budget and mix rules", never the client's tier); without an order, Guidelines takes the full width. The budget under the switch looks like Buying guidelines: one grey row per category 1px apart (name and amount 14px regular), then Total in bold. The Notes box says just "Add a note", at body size like the budget rows. The bottom buttons are a little slimmer and float on a white gradient: what scrolls under them fades out instead of stopping at a hard white band.
- [ ] 2.3c On Home the status tags on the rows (Draft, Ongoing…) are the same height, size and weight as Must have / Essential in Collection (18px, 11px regular). No tag in the app has a border: grey tags are a light ink tint and Ongoing a green tint, both readable on white, on the grey and green rows, and in dark mode.
- [ ] 2.3d The profile circle at the top right of Home is grey with a soft gradient (lighter at the top, darker at the bottom) and white initials (darker greys with light initials in dark mode), not black or white.
- [ ] 2.4 Tap a client not yet checked in → sheet with Budget and Notes, and only **Check in** at the bottom: a green full pill (round at both ends) on the sheet's grey, with no white bar behind it. Every sheet's bottom buttons are pills the same way.
- [ ] 2.4b Budget in that sheet (Kanda Select): per division, Ready-to-wear, Bags, Shoes, Accessories, then a bold **Total** under a line (Women's €120,000, Men's €65,000) that adds up the four; every amount lines up on the same right edge. A category the client doesn't buy is left out (here and on the order).
- [ ] 2.4c In that sheet **Buying guidelines** comes first, above Budget.
- [ ] 2.5 Type in Notes, close and reopen → the note is kept ("Saved automatically").
- [ ] 2.6 Tap the ongoing client (check one in first) → no check-in time anywhere in the sheet; **Leave** (white, grey border, red text) and **Add products** (black, opens the Collection), each half the width, 46px like every other button.
- [ ] 2.6b Every appointment whose client has an order shows the order's status on its row (Draft, With client, Sent, Confirmed…), past days included; the ongoing one shows Ongoing.
- [ ] 2.6c Tap an appointment with an order → the **Order** tile: styles · units in grey, no status and no amount for now; tap it → the order opens full screen. There is no order history in the sheet. The status is not repeated at the top of the sheet.
- [ ] 2.7 Tap the Home title → the app reloads; data and the visit are kept.

### 3. Check in, Order tab, check out
- [ ] 3.1 Check in Maison Dubois, then Linea Concept → no toast; the Collection opens and the Order tab shows a green dot (Linea Concept's order is empty); Maison Dubois is checked out automatically (only one client ongoing at a time).
- [ ] 3.2 There is no black band at the top any more. While a client is checked in, the Order tab carries a black badge with the number of items in their order (a green dot while it is empty).
- [ ] 3.5 Tap Order → that client's order, with the tab bar still under it and **Finalize order** full width just above it; the page title is the client's name (no back arrow), with **Leave** at the top right. Under the title: the Women | Men switch (two-division clients only), the budget card, then the **Order** heading (10px above what follows: the products, or "No women's products yet"). The title scrolls away with the page; it is not fixed at the top. Opening the same order from Home or Order history also lands on the Order tab.
- [ ] 3.5b Nobody checked in, tap Order → "No client checked in", "Choose a client to open their order." and a black **Choose a client** button (no icon), centred vertically in the page; it opens the list of your appointments (and New session); tapping a client checks them in and shows their order on the Order tab.
- [ ] 3.6 On Home, tap the ongoing client → **Leave** → the same alert as Leave on the order ("Stop the session with [shop]?", Cancel / Yes, leave) → Yes, leave → toast "Session ended" (no client name); the Order tab badge disappears; the row shows the order status (e.g. Draft).
- [ ] 3.7 Check the same client in again → Ongoing again, with the original start time. The sheet after a check-out shows no "Checked out" tag and no start-time line: just **View order** (white, grey border) and **Check in again**, each half the width.
- [ ] 3.8 Open an order outside a visit (Home → client → Order tile) → the client's name at the top with a back arrow and no grey line under it; no Finalize order button, just a green **Check in again** (or **Check in** if they were never checked in) at the bottom, on white that fades in from a gradient, like a sheet's buttons. It works on a fully sent order too, like Check in again in the sheet.

### 4. Collection
- [ ] 4.1 The title always shows Women and Men. With a client in session it opens on the division they buy (Linea: Women; Harbour: Men).
- [ ] 4.2 Category pills (All, then the categories the division has in this collection: Ready-to-wear, Bags, Shoes, Accessories). Scrolling down, the pill bar slides away up out of sight; the moment you scroll back up (anywhere in the page) it slides in from the top and stays stuck there; at the top of the page it sits in its own place under the title. The bounce at the bottom of the page does not bring it back. All is on to start and shows every category under its heading. Tapping a pill filters the page to that category: the page goes back to the top, card-shaped grey placeholders shimmer for about half a second, then only that category shows. Switching Women / Men does the same; a category the other division lacks falls back to All. (SS27 Women's Accessories are the two Permanent styles, the strap and the sunglasses; the others are in the SS27 Pre-collection.)
- [ ] 4.3 There is no search field on the Collection: only a magnifying glass (no circle) sits at the top right, centred on the letters of Women / Men, with the Filters icon just left of it. The magnifier slides up a full **Search** page (over the tab bar) with the keyboard up and the field at the bottom, a round × beside it that closes the page.
- [ ] 4.3b Search page, empty field: **Recents** with Clear (blue) and photo cards, three across (swipe for more), each the photo of its first match with the search in quotes ("Amazona", "Puzzle", "Puffer jacket" to start); under them suggestion pills (Sunrise Orange, Leather bags, Sneakers, Cashmere). Tapping a recent or a suggestion fills the field. Clear empties Recents.
- [ ] 4.3c Typing shows "N styles" (with a client checked in: "N styles [shop] can buy") and a list across Women and Men (code · Women/Men · category). A colour in the search shows that colour ("orange" → the orange Mini Amazona and Flamenco). Tapping a style opens its product page on that colour, over the search; closing it goes back to the results. Search (return) or opening a result adds the search to the front of Recents.
- [ ] 4.3d Matching: every word on its own across name, code, family, category, material, colours and keywords: "black leather bag" → the leather bags that come in black; "leather" → every leather style; "short sleeve" → Relaxed fit T-shirt; a code → that style. No match → "No styles match …".
- [ ] 4.3b Above the category pills, collection tabs: **SS27** (default) and **SS27 Pre-collection**, Loewe's own name for its pre-collection ("Spring Summer 2027 pre-collection"); there is no Permanent or All tab; the current one in ink with a thick black underline, and no grey line under the tabs; a 20px space separates them from the category pills. Switching shows a short skeleton and that collection's styles, and the pills show only the categories it has (Women: SS27 17 styles, including the 2 Permanent ones; SS27 Pre-collection 5, no Bags). The tabs slide away and back with the pills while scrolling.
- [ ] 4.4 Filters → Drop (All drops; Drop 1 "Delivers 15 January 2027"; Drop 2 "Delivers 20 February 2027"), Priority (All, Must have, Essential, Standard) and Material (All materials, Leather, Cotton, Wool, Cashmere, Silk & viscose, Nylon) → the grid updates; a chip under the title for each filter, each clears its own. The Filters button sits at the top right beside the magnifying glass, not in the pill row (the pills start with All): just the icon while nothing is filtered, a black circle with a white icon while any filter is on (the collection tabs don't count). With filters that match nothing, the row stays so the filters can be changed.
- [ ] 4.4b Priority: Must have shows only black-tagged styles, Essential only white-tagged ones, Standard only untagged ones; the three together add up to All. Material: Leather shows bags, shoes and leather goods; Cashmere (SS27 Pre-collection) shows the beanie, scarf and short coat.
- [ ] 4.4c Collection cards: white, with 24px squircle corners (the photo's top corners round the same as the card's bottom ones, on iPhone too: only the squircle mask shapes the card, so Safari no longer draws the bottom corners rounder); the photo runs to the card's edges (top and sides, no white frame around it), name, code, prices and colour dots under it with their margin; a soft drop shadow lifts each card off the white page.
- [ ] 4.5 Product tags on the photos: small pills in regular weight (not bold), Must have in black (e.g. Small Amazona 180), Essential in white (e.g. Medium Puzzle Fold tote), and **Permanent** in white for the permanent styles (icons and leather goods reordered every season: strap, sunglasses, Puzzle bifold wallet, Puzzle cardholder, belt), which sit in SS27; a style can carry two tags (e.g. Essential and Permanent), the second under the first. None on the others.
- [ ] 4.6 With nobody in session, the Collection shows Women and Men and every style.

### 5. Client tiers (what each client can see)
- [ ] 5.1 Check in Harbour & Co. (Silver) → Large Featherlight Puzzle, Squad backpack, the puffer jacket and Grip sneaker are not in the Collection.
- [ ] 5.2 Check in Linea Concept (Gold) → Mini Featherlight Puzzle and Small Puzzle Edge show; Medium Bilbao bucket and Small Whisker bag don't.
- [ ] 5.3 Check in Maison Dubois (Platinum) → Medium Bilbao bucket and Small Whisker bag show.
- [ ] 5.4 Check in Kanda Select (Diamond) → every style shows.
- [ ] 5.5 New session (with nobody checked in: Collection → tap a card → Add to order → New session) → the new client sees only the Silver styles.

### 6. Adding a style and entering quantities
- [ ] 6.1 Each card shows photo, name, code, wholesale and retail price and colour dots, with no button. Tapping anywhere on it slides the product page up over the Collection.
- [ ] 6.2 Product page of a style not in the order: the photo is short (the name, prices and sizes show without scrolling) and there is no Add button and no hint line under the sizes. Tap + on a size → that colour is in the order: top toast "Added to order · 1 unit", the colour chip gets the green ✓ and **Remove from order** appears (no "In order" box: the ✓ and the toast already say it).
- [ ] 6.2b Each size cell is three grey blocks (size and +, the number, −) split by a 2px white gap, not by grey lines; a size with a quantity has a black outline.
- [ ] 6.3 Close the page → the card shows a green round ✓ in the photo's top-right corner, the same height as the Must have / Essential tag on the left.
- [ ] 6.4 Tap that card again → the product page opens on the colour in the order, with its quantities; another colour can be added from there.
- [ ] 6.5 Remove from order on the product page (the last colour) → the ✓ disappears from the card.
- [ ] 6.6 Every quantity change saves at once and shows a toast at the top of the screen, "Saved · N units"; quick taps update the same toast instead of stacking. The same toast shows for the stepper on the order page. Close and reopen → the quantities are there.
- [ ] 6.7 Tap a quantity → the number pad opens; type 100 → 100 is saved; the maximum is 999. One-size styles work the same on their big number.
- [ ] 6.7b Sizes sit side by side in a row; when a style has more sizes than fit, the row scrolls sideways (like the colours).
- [ ] 6.7c Copy scale: enter a scale on a dress (e.g. 36 ×2, 38 ×1) → **Copy scale** → toast "Scale copied". Open another style with the same sizes → **Paste scale** fills it (and adds that colour to the order). The copied scale is kept per size range (dresses, women's shoes, men's shoes…) until another one is copied, also across clients. Copy / Paste are greyed when they would change nothing. **Clear** empties all sizes. No Core / Full / +1 each buttons.
- [ ] 6.8 Product page, another colour not in the order: tap that colour, enter a quantity → that colour joins the order; colours in the order carry the same green ✓.
- [ ] 6.9 Product page: Remove from order takes that colour out.
- [ ] 6.10 Product page: the wholesale and retail prices sit on the page with no white box; the details table starts with **Material** (e.g. "100% cotton poplin"); each detail (Material, Division, Category, Appears in, Family, Sizes, Delivery) is its own grey row split by a 2px white gap, no grey lines.
- [ ] 6.11 Photos: swipe the carousel; tap a photo → full-screen zoom; close it.
- [ ] 6.13 Linea Concept (Women only) checked in → Men → open a men's style → Add to order → native alert "Linea Concept doesn't buy Men. Add Men to this order?"; Cancel adds nothing; OK adds it and the order gets a Men tab with no budget.
- [ ] 6.12 With nobody in session, tap a card → Add to order → "Add to an order" lists your appointments; pick one → that client is checked in and the style is added.

### 7. Looks
- [ ] 7.1 Looks tab → the lookbook for Women and Men, Women always first (also when a men's client is checked in), headed "SS27 Women's Lookbook" / "SS27 Men's Lookbook" in black, not all capitals, in the same style as the category headings on the Collection (Ready-to-wear, Bags). Each lookbook is one horizontal row you swipe, edge to edge; on an iPhone one card shows in full and half of the next one at the right edge, so you can see there is more. Each card is just the photo with soft squircle corners (no white frame, no grey border), "Look 01" in white on a dark fade at the bottom. There is no Buying guidelines row here: guidelines live on each client's appointment (7.2).
- [ ] 7.2 Home → tap a client → above Budget, the **Guidelines** tile ("Budget and mix rules") → the sheet "Buying guidelines", sub "[shop] · [cluster] · Spring Summer 2027": at the top a small card with a drawn document (red PDF label), "Buying guidelines SS27 · Maison PDF · Sample" and **Open** (tap → the PDF full screen, tap the page to zoom, **Close**); then for each division the client buys, "[Division]'s budget" with one row per main category (Ready-to-wear, Bags, Shoes, Accessories): the name on the left, the amount on the right; each category is its own grey row split from the next by a 1px white gap, no grey line, then a bold **Total** row (the division's whole budget). Categories they don't buy are left out. No mix, required looks or drops on this page. Closing the sheet goes back to the appointment. Linea Concept (Gold, Women only) shows no Men and no Ready-to-wear; Kanda Select (Diamond) shows Women and Men.
- [ ] 7.3 Open a look → photos, under them "Women's · Spring Summer 2027 show · required look" in normal case (not all capitals), the heading **In this look** (black, sentence case, like Budget and Notes), its pieces with prices (no VM intent box) and no hint line. Every piece can be tapped, in the order or not: it opens that piece's product page on the look's colour; closing it comes back to the look. Pieces in the order show "Added"; pieces the client can't buy show why. At the bottom a black **Add look to order** button. With a client checked in it adds every piece they can buy that is not in the order yet, with no quantities; once all are in it reads "Look is in the order" (off). With nobody checked in it opens "Add to an order" (sub "Look 01 · 4 pieces"): picking a client checks them in and adds the look. The Looks page itself has no button on the cards, and no "Loewe showroom · powered by Vega" line at the bottom. The pieces are separate light grey rows split by a 2px white gap, not by grey lines.
- [ ] 7.4 Tap one piece → it is added to the order of the client in session.
- [ ] 7.5 **Add the whole look · N pieces** → every missing piece the client can buy is added; the button then reads "Whole look is in the order".

### 8. Scan (photo match)
- [ ] 8.1 **Scan** is the middle item of the tab bar, with the four-corner scan icon; it opens the viewfinder on every tab. On the phone the camera picture runs up to the top edge, behind the notch and the status bar: no white strip above it, and Safari's bar turns black while it is open. The Collection has no camera button.
- [ ] 8.2 Scan → viewfinder with "Frame the sample"; the title is the client and division when one is checked in, "Scan a sample" when nobody is. Shutter → "Finding the style…" → the match (Mini Amazona 180, Sunrise Orange) and alternatives.
- [ ] 8.3 Under the match, two buttons side by side: **View item** on the left (white) and **Add to order** on the right (black). View item closes the camera and opens the style's product page on the matched colour. With a client checked in, Add to order, or an alternative, closes the camera and the style is in the order.
- [ ] 8.3b With nobody checked in: Add to order, or an alternative, closes the camera and opens "Add to an order" to pick the client; picking one checks them in and adds the style.
- [ ] 8.4 Retake photo → back to the viewfinder; × closes the camera.

### 9. Order page
- [ ] 9.1 The header shows only the client name (no order code) and a back button.
- [ ] 9.2 No Status / City / Saved bar at the top: the page opens on **Order** in black and under it a Women | Men segmented control (Women left, Men right) for clients who buy both; one division at a time, no tabs.
- [ ] 9.2b The same split everywhere Women and Men are split: a black heading and a Women | Men segmented control, one division at a time, never both in one scroll. Order page (**Order**), Budgets & KPIs (**Budget**), the appointment sheet (**Budget**), Buying guidelines (**Budget**) and the client's view from the shared link (**Budget**). The choice is shared: switching to Men on the order opens Budgets & KPIs on Men too. A client who buys one division gets the heading only, and the card keeps its "Women's" / "Men's" label.
- [ ] 9.3 Under the Women | Men switch, a card "Women's budget" laid out like a bill: one row per category the client buys (Ready-to-wear, Bags, Shoes, Accessories; none for a category they don't buy) shown as a bar with squircle corners (smooth like an iOS app icon, not round ends): the category name small at the top left, under it the spend big with "of €18K" beside it, the same size and colour (the target rounded to thousands); no percentage. The bar's pale colour fills with a deeper shade up to the share spent (full once the budget is reached). It is red while spend is under half of the budget, yellow from half, and green once the budget is reached or passed (Maison Dubois: Ready-to-wear goes yellow from €9,000 and green from €18,000). A category with nothing spent yet is a grey bar with nothing filled. Then **Total** as the same kind of bar, spaced like the categories, with a wallet icon: "€23,630 of €60K", filled and coloured the same way. At the bottom "✓ Within the guidelines" or "⚠ N outside the guidelines", which counts only mix rules and required looks, never the budget and Budgets & KPIs. Tapping the card opens Budgets & KPIs: one card for Women (the same bill with its Total, then Guidelines: mix rules and required looks with a Within / Over / Under / Done / Open tag next to the name and one right-aligned number, then the drops that have units), then one for Men. Women's and men's are never added together.
- [ ] 9.3c The budget bars are bright, not greyish (clear green, yellow and red tints on white); the figures in them ("€9,570 of €24K") are a little smaller (17px); the Shoes high heel has the same line weight as the other category icons. Each bar's category name is the same colour as its figures (no black label over red figures). The bars have a strong 32px squircle; their icon tiles are upright (taller than wide) with a squircle as round as they allow (19px). The category name sits tight on the figures under it, the two centred together in the bar.
- [ ] 9.3b (trial) The budget card on the order has no grey box: title, bars and the guidelines line run the full width on white, all still there. Each category of the order is its own grey box with a strong 24px squircle and its heading (Ready-to-wear, Bags…) inside; each line is its own white 16px squircle card, 2px apart, with a squircle photo exactly as far from the card's top as from its left (14px), and Edit sizes / Enter sizes is white with a thin grey outline.
- [ ] 9.4 Lines grouped by category; each line is its own grey row, split from the next by a 2px white gap, not a grey line; the category headings (Ready-to-wear, Bags…) show only the name, no total, in sentence case and black, like Now / Today on Home. Each line: name, item code in regular black with a grey Drop 1 / Drop 2 tag (no border) next to it, then the colour; no wholesale or retail price; on the right "12 units" with the line value under it. One-size lines have a − / + stepper; sized lines show the sizes as "36 x1" on their own line, then an Enter sizes / Edit sizes button where the stepper would be, so units and value stay on the right in both cases; lines without quantity say "No quantity yet".
- [ ] 9.5 × on a line → the native iOS alert "Delete [style] in [colour] from the order?"; Cancel keeps it, OK removes it.
- [ ] 9.6 A division with no products shows "No … products yet. Tap any style in the Collection and add it from its page".
- [ ] 9.6b There is no **Currently missing** list in the order any more: required looks that are still open still show in Budgets & KPIs, under Guidelines (Look 01 · Open · 2 of 4).
- [ ] 9.7 During the visit the bottom has only **Finalize order** (black, full width, text only with no icon, 46px tall like Check in and View order) on white that fades in from a gradient above it (like the buttons at the bottom of a sheet), just above the tab bar, no shadow. **Leave** (like an iOS bar button: red text on a light grey pill, no icon, no red fill) sits at the top right, opposite the client's name. Tap it → an alert "Stop the session with [shop]?" / "The order will be saved as a draft." ("The order is already sent." once everything is sent) with **Cancel** and **Yes, leave** (red). Yes, leave ends the visit: back to Home, toast "Session ended", the Order tab badge is gone, the row shows the order status. It works after the order is sent too. There is no Save draft. Outside a visit: only Check in again (3.8).
- [ ] 9.7b Check in again on a client whose order is all sent (e.g. Arkade, yesterday) → Order → Finalize order: "Everything is sent…" and a black **Check out** button that ends the visit (back to Home, toast "Checked out"). Opened from Home without a visit, the same page has **Close**.
- [ ] 9.8 Lines that say 12 units read the same in the client view (units first, value under).

### 10. Finalize order
- [ ] 10.1 Finalize order → full-screen "Finalize order" with the client's shop. For a Women + Men client: What to send, with each part's status, units and value; parts with units are ticked; a part with no units can't be picked.
- [ ] 10.2 Fields: Client name, Email (filled in with the client's office email, editable) and Signature. There is no budget recap. If any style in what is being sent has no quantity → warning "N styles have no quantity. Add quantities or remove them from the order to send it to the commercial team. You can still send it to the client to finish." and **Send to commercial team** stays disabled; untick that division (or fix the styles) and it works.
- [ ] 10.3 At the bottom: **Send to commercial team** (black) with "The order is closed. The commercial team confirms it for production; the client gets a copy by email.", and **Send to client to finish** (white) with "It stays a draft. The client gets an email link to add or change quantities." Both stay disabled until a name, a valid email and a signature are in.
- [ ] 10.4 Send to commercial team → a screen with a big green check, "Sent to the commercial team", "[Client] is checked out. A copy is on its way to [email]." and **Continue**. The order history says "… sent · copy to [email]".
- [ ] 10.5 Continue → checked out, back to Home, no toast; the row shows Sent.
- [ ] 10.6 Send only Women for a Women + Men client to the commercial team → also checked out and back to Home; the row shows Partly sent.
- [ ] 10.7 Open that order → banner "Partly sent" with one line "Women signed · Men still a draft"; the tick is centred in its circle; Women lines are read-only, with the note that the women's order has been sent.
- [ ] 10.8 Check the client in again → in the Collection, women's styles show "Women sent" and can't be added; Men can still be completed and signed.
- [ ] 10.9 Fully sent order → banner "Sent" with one line "Signed by [name] · [date, time]". A confirmed order → "Confirmed" with "Ready for production". The line under a banner title never repeats the title and never wraps.

### 11. Sent to the client to finish
- [ ] 11.1 Finalize order → sign → **Send to client to finish** → green check, "Sent to [client]", "The link is on its way to [email].", Continue and Open as the client (demo). Continue → checked out, back to Home; the row shows With client; the order's banner says "Link sent · 48h left to finish".
- [ ] 11.2 Open that order → Finalize order → Open as the client (demo) is at the top.
- [ ] 11.3 Open as the client (demo) → "Your SS27 order" with "Closes in 48h", budgets and mix checks, the lines, Add a style, and Review and sign.
- [ ] 11.4 As the client, change a quantity or add a style → the change shows on the seller's order; in the client view the line is marked as the client's.
- [ ] 11.5 As the client, Review and sign → the order is sent; the client sees the thank-you note; Back to salesperson returns to the seller app.

### 12. Profile and feedback
- [ ] 12.1 The tab bar runs edge to edge at the bottom (slightly see-through white with a blur, so the page shows faintly as it scrolls under it; no line on top; not floating) with five items: Home (calendar icon), Looks, Scan in the middle (8.1), Collection, Order. The labels are small (10px) and regular weight, never bold. The active item is black, the others grey; no blue and no tinted background. In landscape icon and label sit side by side. Profile is the round black avatar with the seller's initials at the top right of Home; tapping it opens a sheet with the seller's name, Order history, Set passcode (Change passcode once set), App feedback with one line "Tell us what works and what doesn't", and Sign out in red. Orders are also reached from their appointments on Home (2.6c) or the Order tab.
- [ ] 12.1b Profile → Order history opens a tall sheet with every order of the signed-in seller: three tiles (total value and number of orders, sent, in draft), filters All / Draft / Sent with counts, and one row per order (shop · city, status pill, hours left when it's with the client, value, units). Tapping a row closes the sheet and opens that order.
- [ ] 12.2 The Order tab (while a client is checked in) shows that client's current order.
- [ ] 12.3 Open an order from its appointment → back returns to Home.
- [ ] 12.4 Orders start when a client is checked in. With nobody checked in, Collection → tap a card → Add to order → Add to an order → New session: Shop, City, Buying for, budgets; Start session is disabled until a shop name is typed; starting checks the new client in.
- [ ] 12.5 App feedback → "App feedback" with its line under it, then "Your feedback on the app" and the box (same type as the client's Notes: 17px text, 15px placeholder); no screenshot attachment for now. Type a note, send → toast "Thanks · feedback sent".

### 13. General
- [ ] 13.1 Close and reopen the app (home-screen icon): orders, notes, the client in session and the passcode are kept.
- [ ] 13.2 Every bottom sheet closes with × and by tapping the dimmed page behind it.
- [ ] 13.3 Landscape (iPad or the side panel's Landscape switch): layouts hold, nothing overlaps the tab bar or the floating buttons.
- [ ] 13.4 Dark mode on the phone: text stays readable; the status bar strip and the Must have tag stay black.
- [ ] 13.5 Nothing sits under the notch or the home indicator; the last card in the Collection scrolls clear of the tab bar.
- [ ] 13.6 Messages (toasts) slide up from the bottom edge and sit just above it, the same on every screen: just above the tab bar, over a product page and over the order buttons. The one exception is a quantity change ("Saved · N units", "Added to order · N units"), which drops in at the top so it is seen while the thumb is on the sizes.
- [ ] 13.7 Close buttons are easy to hit: the × on the product page (a 44px circle, and a near miss just outside it still closes), on the full-screen photos and on the full-screen pages (Set passcode, Sign the order, sign-in).
- [ ] 13.8 UI system (see DESIGN.md): text comes in four sizes only (12 labels and meta, 15 body, 17 headings, 28 titles); every filled primary button is black (Add to order, Finalize order, Send to commercial team, Continue), and every check-in button is green with the same check icon, 46px and 15px semibold (Check in, Check in again, Start session; Choose a client stays black, it only opens the list); blue only marks links; every active state is black (active tab, selected day, active filters, selected options, sizes with a quantity, focused field); icons are Lucide line icons everywhere (tab bar, Scan with its four corners, rows, budget categories (Shoes is a high heel, the one Phosphor icon in line weight: Lucide has no high heel), guideline status: ⚠ "N outside the guidelines" or ✓ "Within the guidelines"); the active tab is black, the others grey; + and − are the same icons in every stepper; segmented controls (Women | Men and the others) are pill-shaped, fully round on the sides; no text is cut off on a 375px-wide screen (e.g. "2 outside the guidelines" on the order page).

## To define with the engineer and the back office

- Quantities save on every change. The real app needs a save queue that survives a weak showroom connection: if a save fails, the quantity shows **Not saved** with a tap to retry; if it takes more than about a second, a small **Saving…**. When everything works, nothing extra shows.
- Search: how styles are indexed (name, code, material, colours, keywords), typo tolerance, and who enters the keywords.
- Buying guidelines: the manager uploads the maison's PDF in the back office and AI fills in the rules table (mix rules, required looks, drops, budget split per tier). That table drives the guidelines page and every check in Budgets & KPIs; the seller can also open the PDF itself.
- Mix rules by units as well as by value (some brands set limits as a share of units).
- The emails sent from Finalize order: the copy of the order to the client when it goes to the commercial team, and the link to finish the order.
- Copy scale: how the partner wants to use saved scales (one per size range for now, kept across clients until replaced; maybe named scales per client or per store size).
- Must have on looks (ask Roberto): should looks carry the Must have tag too, set from the guidelines (e.g. the required looks)?
- Mix rules to review with the maison: the men's Puzzle cap counts the Puzzle wallet and cardholder as well as the bags; and the mix rules are the same for every cluster (only the budget split changes by cluster).
- Home layout: whether the calendar also gets a timeline view (all days in one scrolling list) instead of, or as a switch next to, the day-by-day view.
