# Vega back office: features and flows

First draft. It is reverse-engineered from the showroom app (`docs/index.html`): every piece of data the app reads but does not create has to come from the back office, and every piece of data the app creates has to reach it. Each section says what the app does today, then what the back office needs. **Proposal** marks something the app does not do yet; everything else is already in the app as demo data.

The new main requirement is in section 3: **every client has its own price list, assigned by the commercial team, with lists for USA, Europe, Asia and Middle East.**

## 1. Who uses it

| Role | In the app | In the back office |
|---|---|---|
| Seller (Roberto D., Sofia L., Marc D.) | Checks clients in, builds orders, sends them | Nothing, or read-only on their own clients |
| Commercial team | Receives sent orders (the "Send to commercial team" button) | Sets up clients, budgets and price lists; reviews and confirms orders |
| Merchandising / admin | — | Loads the collection, prices, looks and buying guidelines; manages sellers |
| Client (buyer) | Opens the 48-hour link, edits quantities, signs | Nothing |

## 2. What the app reads from the back office

### 2.1 Sellers
- Name, short name, initials (shown on the avatar).
- Their clients and appointments. A seller only sees their own clients; orders show "prepared with [seller]".
- The 4-digit passcode is set in the app (Profile → Set passcode). The back office needs a **reset passcode** action.

### 2.2 Clients
Fields the app uses today:
- Shop name, city, client code (e.g. DUB01).
- Assigned seller.
- **Cluster**: Silver, Gold, Platinum, Diamond. It decides which styles the client can buy and the default budget split. It is back-office only and never appears in the app.
- Divisions bought: Women, Men or both.
- Budget per division (e.g. Women €60,000, Men €30,000).
- Budget per category (Ready-to-wear, Bags, Shoes, Accessories), optional. If it is not set, the app splits the division budget by the cluster's guideline. A category at 0 means the client does not buy it, so it is hidden from Home and the budget bars.
- Email for the order copy and the "finish your order" link. The app pre-fills a placeholder today.
- **New: the price list** (section 3).

Walk-in clients are created in the app ("New session": shop, city, Buying for, budgets) and start on the base cluster (Silver). They need to land in the back office as new clients to complete: code, cluster, price list, email.

### 2.3 Showroom campaign and appointments
- Show days (Day 1 to Day 7 in the demo), one appointment per client: day, time, seller.
- The app stores check-in and check-out times, a "check in again" time, and the appointment notes. Only one client can be checked in per seller at a time.

### 2.4 Collections, drops and styles
- **Collections**: SS27 (main collection, ordering now) and SS27 Pre-collection (delivers in November, orders close Friday). Each has a name, a short name and a note.
- **Drops** with delivery dates: Drop 1 delivers 15 January 2027, Drop 2 delivers 20 February 2027.
- **Styles**, one per code (e.g. A039AS0X01 Small Amazona 180):
  - name, family (Amazona, Puzzle, Dresses…), division, category;
  - size range (women's RTW 34–42, men's RTW 46–54, women's shoes 36–41, men's shoes 40–45, one size);
  - colours, each with its Loewe colour code (e.g. Mocha 9579) and a swatch colour;
  - photos per colourway: a front shot plus extra views for the carousel;
  - **wholesale and retail price** (one value each today, in euros);
  - drop, collection, and the Permanent flag (the permanent styles sit in SS27 with a Permanent tag);
  - priority tag: Must have, Essential or none;
  - the lowest cluster that can buy it. Lower clusters don't see the style at all;
  - material / composition (shown on the product page, used by the Material filter) and search keywords (e.g. "crossbody", "short sleeve").

### 2.5 Looks (lookbook)
- Show (Spring Summer 2027 show), look number, division, photos (front, back, details).
- Pieces: style + colour.
- Required flag: a required look is part of the buying guidelines and the client buys every piece. Missing pieces show under "Currently missing" in the order.
- Visual merchandising note (e.g. "Window lead for the season. Mocha is the hero colour…").

### 2.6 Buying guidelines
- **Category mix** per cluster and division, as a share of the order value, with ±5 points tolerance (e.g. Platinum Women: Bags 40, RTW 30, Shoes 15, Accessories 15).
- **Mix rules** per division: a family's maximum share (Puzzle max 30%, Flamenco max 30%) or a category's minimum (Accessories min 5%, Small leather goods min 5%).
- Required looks (2.5).
- The guidelines PDF, which the seller can open from the app.
- Already noted in STATUSES.md: the manager uploads the PDF and AI fills in the rules table. The manager reviews the table, then publishes it. The table drives the guidelines page and every check in Budgets & KPIs.

## 3. Price lists per client (new requirement)

**Short answer: yes.** A price list is a set of wholesale and retail prices for one collection, in one currency. The commercial team assigns one to each client. We start with four: **USA, Europe, Asia, Middle East.**

### 3.1 What a price list holds
- Name, region, currency, collection (e.g. "SS27 · Europe · EUR").
- Status: draft or published. Only published lists can be assigned.
- Per style: wholesale price and retail price (RRP). Today's app has one price per style, the same for every colour, so a list holds one price per style code.
- **Proposal:** a style with no price in a list can't be ordered by the clients on that list. The app hides it, like a style above their cluster. That way nobody sees a style without a price.

### 3.2 The four starting lists

| List | Currency | Demo clients it would cover |
|---|---|---|
| Europe | EUR | Paris, Milan, Rome, Madrid, Lyon, Helsinki, Brussels, Athens, Copenhagen, Lisbon, Florence, Turin, Oslo, Marseille, Amsterdam, Bordeaux, Stockholm, Bologna, Seville, Naples, Venice, Nantes, Toulouse |
| USA | USD | New York (Wren), Los Angeles (The Edit Room) |
| Asia | to decide | Tokyo, Osaka, Kyoto, Seoul, Shanghai, Hong Kong, Mumbai |
| Middle East | to decide | Dubai (Sable) |

Demo clients that fit none of the four, or more than one, are listed in 3.7.

### 3.3 Flow: create a price list (merchandising / admin)
1. New price list → name, region, currency, collection.
2. Fill the prices. There are three ways:
   - **import** a spreadsheet (style code, wholesale, retail);
   - **copy from another list** and apply a coefficient or exchange rate plus a rounding rule (e.g. Europe × 1.12, rounded to the nearest 10);
   - **edit by hand**, style by style.
3. The back office flags styles with no price and retail prices below wholesale.
4. Publish. Once a list is published, every change is logged (who, when, old and new price).

### 3.4 Flow: assign a price list to a client (commercial team)
1. On the client, pick the price list. **Proposal:** suggest the list of the client's region from their country, so the team only confirms it.
2. The client's budgets are in the currency of their list. Setting a USD list means the budgets are entered in USD.
3. Changing the list:
   - While no order exists, it applies straight away.
   - While the order is a draft, the back office warns that the draft's prices and totals will change, and the seller sees the new prices at the next sync.
   - Parts already sent (Women or Men) keep the prices they were sent at (3.5).
4. A client created in the app (walk-in) gets the seller's default list until the commercial team sets theirs. **Proposal:** each seller has a default list for their region.

### 3.5 Prices on orders
- **Proposal:** when a division is sent (to the commercial team, or signed by the client from the link), its lines store the price list, currency and unit prices of that moment. Later changes to the list don't touch sent orders.
- The order copy emailed to the client, the signed order and the export to the ERP all use those stored prices.

### 3.6 What changes in the app
- Every price follows the checked-in client's list and currency: Collection cards, product page, order lines, totals, budget bars, Budgets & KPIs, Finish order, the client's link page. Today they are all € with the one price.
- Percentages don't change: category mix and mix rules are shares of the order value, so they work in any currency.
- With nobody checked in, the Collection shows the seller's default list. **Proposal:** a small line under the title names the list ("Prices: Europe · EUR").
- The cluster rule stays as it is; the price list is a second, separate filter on what a client can buy (3.1).

### 3.7 Open questions on price lists
- **Asia:** one list in one currency (USD?), or one per currency (JPY, CNY, HKD, KRW, INR)?
- **Middle East:** AED or USD?
- **Europe outside the euro:** London and Manchester (GBP), Geneva (CHF), Copenhagen (DKK), Stockholm (SEK), Oslo (NOK). Are they on the EUR list or do they get their own?
- **Istanbul:** Europe or Middle East?
- **Clients outside the four regions** in the demo: Sydney, Mexico City, Bogotá. A fifth list (e.g. "Rest of world, USD"), or one of the four?
- Can a single client have an exception (a special price on some styles), or always the plain list?
- Should retail prices also differ by list (local RRP), or only wholesale?
- Reporting across currencies: convert to EUR at a fixed season rate, or at the rate on the day the order is sent?
- Can the seller see which list a client is on? It is useful when a client asks why prices differ from another showroom.

## 4. What the app sends back

### 4.1 Orders
- One order per client per collection, split into **Women** and **Men** parts. Each part has its own status, so one can be sent while the other is still a draft.
- Lines: style, colour, quantity per size (or one-size quantity), how it was added (Collection, scan, look, suggestion). A line can be "selected" with no quantity yet.
- Statuses: Not started → Draft → With client (link sent, 48 hours to finish) → Sent → Confirmed. "Partly sent" means one division is sent and the other isn't.
- Sending: client name, email, signature, time, and who sent it (seller in the showroom, or the client from the link).
- Order log: every change with time and who made it (seller or client).

### 4.2 Visits and feedback
- Check-in / check-out times and appointment notes.
- App feedback: text plus screenshots, with the seller and the time.

## 5. Back-office flows

### F1 Collection setup (merchandising)
Load or import the styles (2.4), photos per colourway, drops, collections, priority tags, Permanent flags, minimum cluster, materials and keywords. Preview a style as the app shows it. Publish to the app.

### F2 Price lists (merchandising, commercial team)
Section 3.

### F3 Client setup (commercial team)
Create or edit a client:
- shop, city / country, code, email, assigned seller;
- cluster, divisions, budget per division, budget per category;
- price list.

Bulk import for a whole campaign. A queue of walk-in clients created in the app, to complete.

### F4 Showroom calendar (commercial team)
Show days, then appointments per seller per day (client, time). Move an appointment, reassign a client to another seller. Optionally sync with the sellers' calendars.

### F5 Buying guidelines (merchandising)
1. Upload the maison's PDF.
2. AI fills in the rules table: category mix per cluster and division, tolerance, mix rules, required looks, drops.
3. Review the table and correct it.
4. Publish. The app's guidelines page and every check update.

Keep the PDF attached so the seller can still open it.

### F6 Lookbook (merchandising)
Looks per division: number, photos, pieces (style + colour), required flag, visual merchandising note.

### F7 Order review and confirmation (commercial team)
1. Inbox of sent orders (Sent and Partly sent), newest first, filterable by seller, region, price list, client.
2. Open an order: lines, totals in the client's currency, the same budget and guideline checks the app shows ("2 outside the guidelines"), the signature, and the log.
3. Confirm for production → status Confirmed, shown in the app as "Ready for production".
4. **To decide:** can the commercial team send an order back to the seller or the client (reopen it), or edit quantities itself?
5. Export to the ERP / factory, using the stored prices (3.5).

### F8 Orders with the client
List of orders "With client", with the hours left on the 48-hour link. Resend the link, extend the deadline, or take the order back as a draft.

### F9 Sellers and access
Create sellers, assign clients, set a default price list (3.4), reset a passcode, deactivate a seller.

### F10 Feedback inbox
App feedback from the sellers with screenshots, marked as read or done.

### F11 Reporting
- Order value against budget per client, seller, region and price list, with currencies converted (3.7).
- Guideline compliance: orders outside the mix rules, required looks not complete.
- Campaign progress: appointments done, orders draft / with client / sent / confirmed.

## 6. Open questions (besides 3.7)
These come from STATUSES.md, "To define with the engineer and the back office":
- Search indexing and who enters the keywords.
- Mix rules by units as well as by value.
- The emails sent from Finish order: the copy of the order, and the link to finish it.
- Saved size scales: one per size range, per client, or named scales.
- Must have on looks.
- Whether mix rules differ by cluster (today only the budget split does).

Integrations to decide:
- the ERP / factory export format;
- the email provider;
- image storage for the collection photos;
- sign-in for the back office (single sign-on).
