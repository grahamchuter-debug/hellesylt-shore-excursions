# Hellesylt operator runbook — fulfilment, SLA & emergency kill

## Production fulfilment workflow

Automated confirmation is **not** the customer’s tour ticket. The supplier-issued
ticket is the joining document (meeting instructions, pickup/meeting details,
and related operational information).

Required sequence after a successful payment:

1. **PAID / REQUESTED** — booking sits in World 2.0 as paid + requested  
2. Customer receives request-received email; ops receives booking notification  
3. Verify / secure supplier availability  
4. **CONFIRM** the booking in World 2.0 (or **DECLINE** + full refund if unavailable)  
5. Automated confirmation email is sent to the customer  
6. Obtain the **supplier-issued tour ticket**  
7. **SEND SUPPLIER TICKET MANUALLY** to the customer (required)  
8. Operational fulfilment complete  

### Do not CONFIRM early

`requested` / `paid` is **not** confirmed. Never click CONFIRM merely because
payment succeeded. First secure supplier availability, then CONFIRM.

If supplier cannot be secured:

- Do **not** CONFIRM  
- Use the existing decline / full-refund workflow  
- Customer receives a full refund  

### SEND SUPPLIER TICKET MANUALLY

This is a **required operator step after confirmation**.

- Do **not** treat the automated confirmation email as the tour ticket  
- Send the supplier ticket separately to the customer’s email  
- The ticket must include the applicable joining / meeting instructions  
- Do **not** invent meeting points, pickup times, emergency numbers, or voucher
  wording in World 2.0 automated mail  
- Do **not** send a supplier ticket before a supplier booking exists  

No supplier-ticket automation in World 2.0 for this phase.

## Branding

Customer brand: **Hellesylt Shore Excursions**  
Booking references: `W2HSY-…`  
Product: Briksdal Glacier Discovery  

Do not use Olden, Belize, or other destination branding in customer mail.

## SLA

| Window | Expectation |
|---|---|
| 0–24h after payment (`OPS_RESPONSE_SLA_HOURS`) | Ops confirms or declines the booking |
| 24–48h (`OPS_ESCALATION_HOURS`) | Escalate internally; chase unresolved list |
| 72h | Original review token expires |
| After CONFIRM | Obtain supplier ticket and **send it manually** to the customer |

Do **not** auto-confirm. Do **not** auto-refund unless an operator explicitly declines.

## Chase unresolved bookings

Authenticated production operator (header `X-Hellesylt-Operator-Token`):

```http
GET /api/bookings/operator/unresolved?olderThanHours=24
```

Returns paid/`requested` bookings older than the threshold.

## Reissue review token

When a link expired or was lost, and the booking is still `requested` + `paid`:

```http
POST /api/bookings/operator/reissue-review
X-Hellesylt-Operator-Token: <secret>
Content-Type: application/json

{ "reference": "W2HSY-…" }
```

Effects:
- invalidates prior **unconsumed** tokens for that booking
- issues a new 72h token + review URL
- writes `operator_audit_log` action `reissue`

Live `PAYMENTS_MODE=live` continues to block **header** confirm/decline
(those use the single-use review portal).

Recovery endpoints remain available in live mode with the production
`OPERATOR_TOKEN` header. They do not require creating payments and never
confirm or refund by themselves.

## Emergency kill switch

Primary immediate kill (stops new Checkout Sessions):

```bash
# Set BOOKINGS_ENABLED=false on hellesylt-bookings-prod and redeploy
```

Independent email kill:

```bash
# Set EMAIL_SENDING_ENABLED=false on hellesylt-bookings-prod and redeploy
```

Additional live-payment kill:

```bash
npx wrangler secret delete LIVE_PAYMENTS_UNLOCK --config workers/bookings/wrangler.prod.jsonc
```

Frontend rollback (if the public UI must go dark):

- Remove or clear Cloudflare Pages Production vars  
  `NEXT_PUBLIC_HELLESYLT_BOOKING_UI` / `NEXT_PUBLIC_HELLESYLT_BOOKINGS_API_URL`  
- Redeploy/rebuild so the booking journey returns to `PRODUCTION_READY_LOCKED`

Do not execute rollback unless launch verification fails or ops requires it.
