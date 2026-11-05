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
| Ongoing (`Ongoing`) | The seller checked the client in. That client is in session: the black client band (client name, View order ›) sits at the top of every tab, the Collection shows what they can buy and tapping the band opens their order full screen, without the tab bar. Only one client per seller can be ongoing. |
| Checked out (order status, e.g. `Sent`) | The visit ended: Finish order in the order (sent to the commercial team or to the client to finish), or Check out on the client's row on Home. The row on Home shows where that client's order stands; the seller can view it or check the client in again. |
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
| In order (green ✓ in the photo's top-right corner, as tall as the Must have / Essential tag) | Already in the client's selection, in at least one colour. The card has no buttons; tapping it opens the product page on the colour in the order. |
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
| Budget not reached (red) | Spend is below the budget set in the back office: amount and bar in red. |
| Budget reached (green) | Spend is at or above the budget (going over is fine): amount and bar in green. |
| Nothing spent (grey) | No quantity in that category yet: amount in black, empty bar. |
| Mix rule within (`Within`, green tag) | A family is inside its limit. Each rule: name with its tag, under it "6% of the order · max 30%", its value on the right. Only rules that touch a category the client buys are listed. |
| Mix rule over a max (`Over`, red tag) | A family is above its maximum share; the line under adds "· €6,150 over". |
| Mix rule under a min (`Under`, amber tag) | A family is below its minimum share; the line under adds "· €2,400 to go". |
| Required look done (`Done`, green tag) | Every piece of a required look is in the order with quantities; "4 of 4" on the right. |
| Required look open (`Open`, amber tag) | Some pieces of a required look are still missing; "2 of 4" on the right. |

Guideline issues never block sending (styles without a quantity do block Send to commercial team, see 10.2). The order page shows the division's budget per category and the guideline status; the details are under Budgets & KPIs. Women's and men's budgets are always separate and never added into one total (each division has its own Total row).

## QA scenarios

Run on an iPhone in portrait unless a step says otherwise. Start each run from fresh demo data: **Reset demo** in the side panel (desktop view), or clear the site data on the phone. Demo data: the seller is Roberto D.; Maison Dubois (Paris, Platinum, Women + Men) has a draft order from this morning but is not checked in; Linea Concept (Gold, Women only), Harbour & Co. (Silver, Men only) and Kanda Select (Diamond, Women + Men) are later today. Each line is: what to do → what should happen.

### 1. Sign in, sign out, passcode
- [ ] 1.1 Home → the round avatar with your initials (top right) → Profile sheet → Sign out → the full-screen "Who's selling?" list of sellers shows.
- [ ] 1.2 Pick Roberto D. with no passcode set → any 4 digits sign in; toast "Signed in as Roberto D.".
- [ ] 1.3 Avatar → Set passcode → enter 4 digits, then the same 4 again → toast "Passcode set"; the row now reads Change passcode.
- [ ] 1.4 Set passcode with a different second entry → "The codes don't match. Try again."; nothing is saved until both match.
- [ ] 1.5 Sign out, pick Roberto D., enter a wrong code → "Wrong code. Try again." and the dots clear; the right code signs in.
- [ ] 1.6 Cancel on the PIN pad → back to the list of sellers.
- [ ] 1.7 Open the app (or reload it) → nobody is checked in: no client band, nothing under Now, even if a client was checked in when the app was closed. That visit shows as checked out; its order is kept.
- [ ] 1.8 Sign in as Sofia L. → Home shows only Sofia's clients (Atelier Nove, Casa Prisma…) and her initials in the avatar.

### 2. Home and appointments
- [ ] 2.1 Home opens on today, with one past day visible to the left of today in the day strip.
- [ ] 2.2 Tap other days → each shows its appointments, or "No appointments on this day."
- [ ] 2.3 After checking a client in, the ongoing client sits under **Now** with a green Ongoing tag; the others under **Today** (both headings in sentence case, black, slightly larger than the text), each with time, city and what they buy per division.
- [ ] 2.4 Tap a client not yet checked in → sheet with Budget and Notes, and only **Check in** at the bottom: a green full pill (round at both ends) on the sheet's grey, with no white bar behind it. Every sheet's bottom buttons are pills the same way.
- [ ] 2.4b Budget in that sheet (Kanda Select): per division, Ready-to-wear, Bags, Shoes, Accessories, then a bold **Total** under a line (Women's €120,000, Men's €65,000) that adds up the four; every amount lines up on the same right edge. A category the client doesn't buy is left out (here and on the order).
- [ ] 2.4c In that sheet **Buying guidelines** comes first, above Budget.
- [ ] 2.5 Type in Notes, close and reopen → the note is kept ("Saved automatically").
- [ ] 2.6 Tap the ongoing client (check one in first) → "Ongoing since …", with Check out and Add products.
- [ ] 2.6b Every appointment whose client has an order shows the order's status on its row (Draft, With client, Sent, Confirmed…), past days included; the ongoing one shows Ongoing.
- [ ] 2.6c Tap an appointment with an order → **Order**: styles · units, the status and the value; tap it → the order opens full screen. There is no order history in the sheet. The status is not repeated at the top of the sheet.
- [ ] 2.7 Tap the Home title → the app reloads; data and the visit are kept.

### 3. Check in, client band, check out
- [ ] 3.1 Check in Maison Dubois, then Linea Concept → no toast; the Collection opens with the Linea Concept band at the top; Maison Dubois is checked out automatically (only one client ongoing at a time).
- [ ] 3.2 A black band runs edge to edge at the top of every tab: a pulsing green dot, the client name in bold, a white badge with the number of items in the order (none while it is empty), then "View order ›" in grey, centred; the page below rounds its top corners into it. There is no pill above the tab bar.
- [ ] 3.2b While the band shows, the area above it turns black too: the status bar strip on the home-screen app and the browser bar colour in Safari. It goes back to the page colour after check out, on the Search page and with the order open.
- [ ] 3.5 Tap the band → the order opens full screen; the band and the tab bar are hidden; only the floating buttons show at the bottom.
- [ ] 3.6 On Home, tap the ongoing client → Check out → toast "Checked out · …"; the band disappears; the row shows the order status (e.g. Draft).
- [ ] 3.7 Check the same client in again → Ongoing again; the sheet said "Checking in again keeps this start time".
- [ ] 3.8 Check in from a sent order (Check in to add products) → the button is disabled when every part is sent.

### 4. Collection
- [ ] 4.1 The title always shows Women and Men. With a client in session it opens on the division they buy (Linea: Women; Harbour: Men).
- [ ] 4.2 Category pills (All, then the categories the division has in this collection: Ready-to-wear, Bags, Shoes, Accessories). Scrolling down, the pill bar slides away up out of sight; the moment you scroll back up (anywhere in the page) it slides in from the top and stays stuck there; at the top of the page it sits in its own place under the title. The bounce at the bottom of the page does not bring it back. All is on to start and shows every category under its heading. Tapping a pill filters the page to that category: the page goes back to the top, card-shaped grey placeholders shimmer for about half a second, then only that category shows. Switching Women / Men does the same; a category the other division lacks falls back to All. (SS27 Women has no Accessories: they are in Pre-Spring and Permanent.)
- [ ] 4.3 There is no search field on the Collection: only a magnifying glass (no circle) sits at the top right, centred on the letters of Women / Men, with the Filters icon just left of it. The magnifier slides up a full **Search** page (over the tab bar) with the keyboard up and the field at the bottom, a round × beside it that closes the page.
- [ ] 4.3b Search page, empty field: **Recents** with Clear (blue) and photo cards, three across (swipe for more), each the photo of its first match with the search in quotes ("Amazona", "Puzzle", "Puffer jacket" to start); under them suggestion pills (Sunrise Orange, Leather bags, Sneakers, Cashmere). Tapping a recent or a suggestion fills the field. Clear empties Recents.
- [ ] 4.3c Typing shows "N styles" (with a client checked in: "N styles [shop] can buy") and a list across Women and Men (code · Women/Men · category). A colour in the search shows that colour ("orange" → the orange Mini Amazona and Flamenco). Tapping a style opens its product page on that colour, over the search; closing it goes back to the results. Search (return) or opening a result adds the search to the front of Recents.
- [ ] 4.3d Matching: every word on its own across name, code, family, category, material, colours and keywords: "black leather bag" → the leather bags that come in black; "leather" → every leather style; "short sleeve" → Relaxed fit T-shirt; a code → that style. No match → "No styles match …".
- [ ] 4.4 Filters → Collection (All collections first, then the collections by title: All collections shows every collection's styles the client can buy, e.g. Women 22 styles instead of 15 for SS27), Drop (All drops; Drop 1 "Delivers 15 January 2027"; Drop 2 "Delivers 20 February 2027"), Priority (All, Must have, Essential, Standard) and Material (All materials, Leather, Cotton, Wool, Cashmere, Silk & viscose, Nylon) → the grid updates; a chip under the title for each filter, each clears its own. The Filters button sits at the top right beside the magnifying glass, not in the pill row (the pills start with All): just the icon while nothing is filtered, a black circle with a white icon while any filter (or a collection other than SS27) is on. With filters that match nothing, the row stays so the filters can be changed.
- [ ] 4.4b Priority: Must have shows only black-tagged styles, Essential only white-tagged ones, Standard only untagged ones; the three together add up to All. Material: Leather shows bags, shoes and leather goods; Cashmere (Pre-Spring) shows the beanie, scarf and short coat.
- [ ] 4.5 Product tags on the photos: Must have in black (e.g. Small Amazona 180), Essential in white (e.g. Medium Puzzle Fold tote), none on the others.
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
- [ ] 6.3 Close the page → the card shows a green round ✓ in the photo's top-right corner, the same height as the Must have / Essential tag on the left.
- [ ] 6.4 Tap that card again → the product page opens on the colour in the order, with its quantities; another colour can be added from there.
- [ ] 6.5 Remove from order on the product page (the last colour) → the ✓ disappears from the card.
- [ ] 6.6 Every quantity change saves at once and shows a toast at the top of the screen, "Saved · N units"; quick taps update the same toast instead of stacking. The same toast shows for the stepper on the order page. Close and reopen → the quantities are there.
- [ ] 6.7 Tap a quantity → the number pad opens; type 100 → 100 is saved; the maximum is 999. One-size styles work the same on their big number.
- [ ] 6.7b Sizes sit side by side in a row; when a style has more sizes than fit, the row scrolls sideways (like the colours).
- [ ] 6.7c Copy scale: enter a scale on a dress (e.g. 36 ×2, 38 ×1) → **Copy scale** → toast "Scale copied". Open another style with the same sizes → **Paste scale** fills it (and adds that colour to the order). The copied scale is kept per size range (dresses, women's shoes, men's shoes…) until another one is copied, also across clients. Copy / Paste are greyed when they would change nothing. **Clear** empties all sizes. No Core / Full / +1 each buttons.
- [ ] 6.8 Product page, another colour not in the order: tap that colour, enter a quantity → that colour joins the order; colours in the order carry the same green ✓.
- [ ] 6.9 Product page: Remove from order takes that colour out.
- [ ] 6.10 Product page: the wholesale and retail prices sit on the page with no white box; the details table starts with **Material** (e.g. "100% cotton poplin").
- [ ] 6.11 Photos: swipe the carousel; tap a photo → full-screen zoom; close it.
- [ ] 6.13 Linea Concept (Women only) checked in → Men → open a men's style → Add to order → native alert "Linea Concept doesn't buy Men. Add Men to this order?"; Cancel adds nothing; OK adds it and the order gets a Men tab with no budget.
- [ ] 6.12 With nobody in session, tap a card → Add to order → "Add to an order" lists your appointments; pick one → that client is checked in and the style is added.

### 7. Looks
- [ ] 7.1 Looks tab → the lookbook for Women and Men, Women always first (also when a men's client is checked in), headed "Women's lookbook" / "Men's lookbook". Each lookbook is one horizontal row you swipe, edge to edge; on an iPhone one card shows in full and half of the next one at the right edge, so you can see there is more. There is no Buying guidelines row here: guidelines live on each client's appointment (7.2).
- [ ] 7.2 Home → tap a client → above Budget, **Buying guidelines** ("Platinum client · budget per category") → the sheet "Buying guidelines", sub "[shop] · [cluster] · Spring Summer 2027": at the top a small card with a drawn document (red PDF label), "Buying guidelines SS27 · Maison PDF · Sample" and **Open** (tap → the PDF full screen, tap the page to zoom, **Close**); then for each division the client buys, "[Division]'s budget" with one row per main category (Ready-to-wear, Bags, Shoes, Accessories): the name on the left, the amount on the right, no line underneath. Categories they don't buy are left out. No mix, required looks or drops on this page. Closing the sheet goes back to the appointment. Linea Concept (Gold, Women only) shows no Men and no Ready-to-wear; Kanda Select (Diamond) shows Women and Men.
- [ ] 7.3 Open a look → photos, its pieces with prices (no VM intent box) and no hint line. Every piece can be tapped, in the order or not: it opens that piece's product page on the look's colour; closing it comes back to the look. Pieces in the order show "Added"; pieces the client can't buy show why. With a client checked in the button at the bottom reads **Add look to basket** (adds every piece not in the order yet); once all are in, "Look is in the basket" (off).
- [ ] 7.4 Tap one piece → it is added to the order of the client in session.
- [ ] 7.5 **Add the whole look · N pieces** → every missing piece the client can buy is added; the button then reads "Whole look is in the order".

### 8. Scan (photo match)
- [ ] 8.1 A round **Scan** button (camera icon, "Scan" under it) sits right of the tab bar on every tab, as tall as it and in the same glass; in landscape it is a pill with the icon and "Scan" side by side. The Collection has no camera button.
- [ ] 8.2 Scan → viewfinder with "Frame the sample"; the title is the client and division when one is checked in, "Scan a sample" when nobody is. Shutter → "Finding the style…" → the match (Mini Amazona 180, Sunrise Orange) and alternatives.
- [ ] 8.3 Under the match, two buttons side by side: **View item** on the left (white) and **Add to order** on the right (black). View item closes the camera and opens the style's product page on the matched colour. With a client checked in, Add to order, or an alternative, closes the camera and the style is in the order.
- [ ] 8.3b With nobody checked in: Add to order, or an alternative, closes the camera and opens "Add to an order" to pick the client; picking one checks them in and adds the style.
- [ ] 8.4 Retake photo → back to the viewfinder; × closes the camera.

### 9. Order page
- [ ] 9.1 The header shows only the client name (no order code) and a back button.
- [ ] 9.2 Status, City and Saved time; Women / Men switch for clients who buy both.
- [ ] 9.3 Under the Women / Men switch, a card "Women's budget" laid out like a bill: one row per category the client buys (Ready-to-wear, Bags, Shoes, Accessories; none for a category they don't buy) with "€10,340 of €18,000" on the right and a bar under it, then **Total** "€23,630 of €60,000" under a line. Every number is the same size (spend in semibold, "of …" in grey). Amount and bar are red while spend is below the budget and turn green once it is reached or passed (Maison Dubois: Ready-to-wear goes green from €18,000). At the bottom "✓ Within the guidelines" or "⚠ N outside the guidelines", which counts only mix rules and required looks, never the budget and Budgets & KPIs. Tapping the card opens Budgets & KPIs: one card for Women (the same bill with its Total, then Guidelines: mix rules and required looks with a Within / Over / Under / Done / Open tag next to the name and one right-aligned number, then the drops that have units), then one for Men. Women's and men's are never added together.
- [ ] 9.4 Lines grouped by category; the category headings (Ready-to-wear, Bags…) show only the name, no total, in sentence case and black, like Now / Today on Home. Each line: name, item code in regular black with a white Drop 1 / Drop 2 tag next to it, then the colour; no wholesale or retail price; on the right "12 units" with the line value under it. One-size lines have a − / + stepper; sized lines show the sizes as "36 x1" and a full-width Enter sizes / Edit sizes button (like Edit on the Collection cards); lines without quantity say "No quantity yet".
- [ ] 9.5 × on a line → the native iOS alert "Delete [style] in [colour] from the order?"; Cancel keeps it, OK removes it.
- [ ] 9.6 A division with no products shows "No … products yet. Tap any style in the Collection and add it from its page".
- [ ] 9.6b **Currently missing**, under the lines (not on a sent part): "To meet the guidelines: required look pieces not in the order yet", then each missing piece with its colour and an amber tag naming its look (Look 01…), and **Add** → its product page on that colour. Must have styles are never listed: Must have means a highly important piece, not one the buyer has to buy. Maison Dubois Women: Balloon skirt and Oval Double L loafer (Look 01), Shirt dress in Red (Look 02). A piece that is in the order without quantities is not listed (its line already says No quantity yet).
- [ ] 9.7 During the visit the bottom has **Check out** (white) and **Finish order** (black, no second line). Check out ends the visit: back to Home, toast "Checked out · [shop]", the client band is gone, the row shows the order status. It works after the order is sent too. There is no Save draft. Outside a visit: a round sign button and Check in to add products.
- [ ] 9.8 Lines that say 12 units read the same in the client view (units first, value under).

### 10. Finish order
- [ ] 10.1 Finish order → full-screen "Finish order" with the client's shop. For a Women + Men client: What to send, with each part's status, units and value; parts with units are ticked; a part with no units can't be picked.
- [ ] 10.2 Fields: Client name, Email (filled in with the client's office email, editable) and Signature. There is no budget recap. If any style in what is being sent has no quantity → warning "N styles have no quantity. Add quantities or remove them from the order to send it to the commercial team. You can still send it to the client to finish." and **Send to commercial team** stays disabled; untick that division (or fix the styles) and it works.
- [ ] 10.3 At the bottom: **Send to commercial team** (black) with "The order is closed. The commercial team confirms it for production; the client gets a copy by email.", and **Send to client to finish** (white) with "It stays a draft. The client gets an email link to add or change quantities." Both stay disabled until a name, a valid email and a signature are in.
- [ ] 10.4 Send to commercial team → a screen with a big green check, "Sent to the commercial team", "[Client] is checked out. A copy is on its way to [email]." and **Continue**. The order history says "… sent · copy to [email]".
- [ ] 10.5 Continue → checked out, back to Home, no toast; the row shows Sent.
- [ ] 10.6 Send only Women for a Women + Men client to the commercial team → also checked out and back to Home; the row shows Partly sent.
- [ ] 10.7 Open that order → banner "Partly sent" with one line "Women signed · Men still a draft"; the tick is centred in its circle; Women lines are read-only, with the note that the women's order has been sent.
- [ ] 10.8 Check the client in again → in the Collection, women's styles show "Women sent" and can't be added; Men can still be completed and signed.
- [ ] 10.9 Fully sent order → banner "Sent" with one line "Signed by [name] · [date, time]". A confirmed order → "Confirmed" with "Ready for production". The line under a banner title never repeats the title and never wraps.

### 11. Sent to the client to finish
- [ ] 11.1 Finish order → sign → **Send to client to finish** → green check, "Sent to [client]", "The link is on its way to [email].", Continue and Open as the client (demo). Continue → checked out, back to Home; the row shows With client; the order's banner says "Link sent · 48h left to finish".
- [ ] 11.2 Open that order → Finish order → Open as the client (demo) is at the top.
- [ ] 11.3 Open as the client (demo) → "Your SS27 order" with "Closes in 48h", budgets and mix checks, the lines, Add a style, and Review and sign.
- [ ] 11.4 As the client, change a quantity or add a style → the change shows on the seller's order; in the client view the line is marked as the client's.
- [ ] 11.5 As the client, Review and sign → the order is sent; the client sees the thank-you note; Back to salesperson returns to the seller app.

### 12. Profile and feedback
- [ ] 12.1 The tab bar has three tabs: Home, Looks, Collection, with the round Scan button beside it (8.1). Profile is the round black avatar with the seller's initials at the top right of Home; tapping it opens a sheet with the seller's name, Order history, Set passcode (Change passcode once set), App feedback with one line "Tell us what works and what doesn't", and Sign out in red. Orders are also reached from their appointments on Home (2.6c) or the client band.
- [ ] 12.1b Profile → Order history opens a tall sheet with every order of the signed-in seller: three tiles (total value and number of orders, sent, in draft), filters All / Draft / Sent with counts, and one row per order (shop · city, status pill, hours left when it's with the client, value, units). Tapping a row closes the sheet and opens that order.
- [ ] 12.2 The client band (at the top while a client is checked in) opens that client's current order.
- [ ] 12.3 Open an order from its appointment → back returns to Home.
- [ ] 12.4 Orders start when a client is checked in. With nobody checked in, Collection → tap a card → Add to order → Add to an order → New session: Shop, City, Buying for, budgets; Start session is disabled until a shop name is typed; starting checks the new client in.
- [ ] 12.5 App feedback → type a note, attach a screenshot (thumbnail with ×), remove it, send → toast "Thanks · feedback sent".

### 13. General
- [ ] 13.1 Close and reopen the app (home-screen icon): orders, notes, the client in session and the passcode are kept.
- [ ] 13.2 Every bottom sheet closes with × and by tapping the dimmed page behind it.
- [ ] 13.3 Landscape (iPad or the side panel's Landscape switch): layouts hold, nothing overlaps the client band or the floating buttons.
- [ ] 13.4 Dark mode on the phone: text stays readable; the client band and the Must have tag stay black.
- [ ] 13.5 Nothing sits under the notch or the home indicator; the last card in the Collection scrolls clear of the tab bar.
- [ ] 13.6 Messages (toasts) slide up from the bottom edge and sit just above it, the same on every screen: over the tab bar, over a product page and over the order buttons. The one exception is a quantity change ("Saved · N units", "Added to order · N units"), which drops in at the top so it is seen while the thumb is on the sizes.
- [ ] 13.7 Close buttons are easy to hit: the × on the product page (a 44px circle, and a near miss just outside it still closes), on the full-screen photos and on the full-screen pages (Set passcode, Sign the order, sign-in).
- [ ] 13.8 UI system (see DESIGN.md): text comes in four sizes only (12 labels and meta, 15 body, 17 headings, 28 titles); every filled primary button is black (Add to order, Finish order, Send to commercial team, Continue, Check in to add products); blue only marks links, the active tab, the selected day and active filters; + and − are the same icons in every stepper; no text is cut off on a 375px-wide screen (e.g. "2 outside the guidelines" on the order page).

## To define with the engineer and the back office

- Quantities save on every change. The real app needs a save queue that survives a weak showroom connection: if a save fails, the quantity shows **Not saved** with a tap to retry; if it takes more than about a second, a small **Saving…**. When everything works, nothing extra shows.
- Search: how styles are indexed (name, code, material, colours, keywords), typo tolerance, and who enters the keywords.
- Buying guidelines: the manager uploads the maison's PDF in the back office and AI fills in the rules table (mix rules, required looks, drops, budget split per tier). That table drives the guidelines page and every check in Budgets & KPIs; the seller can also open the PDF itself.
- Mix rules by units as well as by value (some brands set limits as a share of units).
- The emails sent from Finish order: the copy of the order to the client when it goes to the commercial team, and the link to finish the order.
- Copy scale: how the partner wants to use saved scales (one per size range for now, kept across clients until replaced; maybe named scales per client or per store size).
- Must have on looks (ask Roberto): should looks carry the Must have tag too, set from the guidelines (e.g. the required looks)?
- Mix rules to review with the maison: the men's Puzzle cap counts the Puzzle wallet and cardholder as well as the bags; and the mix rules are the same for every cluster (only the budget split changes by cluster).
- Home layout: whether the calendar also gets a timeline view (all days in one scrolling list) instead of, or as a switch next to, the day-by-day view.
