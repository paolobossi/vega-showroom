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
| Available (`Add` button) | The client can buy it. Add sits at the bottom of the card, under the prices; tapping it puts the style in the order at zero units and slides its product page up over the Collection to enter sizes. |
| In order (`− units +` at the bottom of the card) | Already in the client's selection. Add turns into this, in the same place and at the same height. + and − change one unit (one per size on sized styles); at the last step − is a bin that takes it out; the number opens the product page for the sizes. |
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
