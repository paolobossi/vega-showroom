# Vega · status map

The states each object can be in, as the showroom app shows them today. The label in the app is in brackets.

## Client visit (appointment)

| Status | Meaning |
|---|---|
| Scheduled (no tag) | The appointment is on the calendar and the client hasn't arrived yet. Only Check in is offered. |
| Ongoing (`Ongoing`) | The seller checked the client in. That client is in session: the black pill sits above the nav, the Collection shows what they can buy and Orders shows only their order. Only one client per seller can be ongoing. |
| Checked out (order status, e.g. `Sent`) | The visit ended. The row on Home shows where that client's order stands; the seller can view it or check the client in again. |
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
| Available (`+` button) | The client can buy it; tapping + adds it to the order. |
| In order (`In order`) | Already in the client's selection; × takes it out. |
| Not available (`Not available`) | Not open to this client's level (set in the back office). Hidden from the Collection during a visit. |
| Division not bought (`No men’s` / `No women’s`) | The client doesn't buy that division. |
| Division sent (`Women sent` / `Men sent`) | That part of the order is sent, so nothing more can be added to it. |

## Guideline checks (Budgets & KPIs, Home guidelines)

| Status | Meaning |
|---|---|
| Within budget (green) | Spend is at or under the budget set in the back office. |
| Slightly over (amber) | Up to 10% over budget. |
| Over (red) | More than 10% over, or spending where no budget is set. |
| Mix rule OK (green) | A family's share is inside its limit (e.g. Puzzle ≤ 30%, accessories ≥ 5%). |
| Mix rule over a max (red) | A family is above its maximum share. |
| Mix rule under a min (amber) | A family is below its minimum share. |
| Required look done (`Done`) | Every piece of a required look is in the order with quantities. |
| Required look open (`Open`) | Some pieces of a required look are still missing. |

Guideline issues never block sending: they are listed under "Outside the guidelines" before the order goes out.
