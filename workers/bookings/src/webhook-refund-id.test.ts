/**
 * H-3 — charge.refunded refund-id persistence via webhook path.
 * Covers payload id, Stripe retrieve/expand, preserve existing id, duplicate, retrieve error.
 */
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import type { BookingRow } from "./db";
import { getBookingByReference, insertBooking } from "./db";
import { createMemoryD1 } from "./memory-d1";
import { handleStripeWebhook } from "./routes/webhook";
import { setStripeFactoryForTests } from "./stripe";

afterEach(() => {
  setStripeFactoryForTests(null);
});

function paidBooking(reference: string, overrides: Partial<BookingRow> = {}): BookingRow {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    booking_reference: reference,
    booking_session_id: `sess-${reference}`,
    destination_id: "hellesylt",
    product_id: "briksdal-glacier-discovery",
    product_name: "Briksdal Glacier Discovery",
    cruise_date: "2027-05-04",
    ship_name: "MSC Euribia",
    ship_slug: "msc-euribia",
    guest_count: 1,
    adults: 1,
    children: 0,
    infants: 0,
    unit_amount_cents: 16900,
    amount_total_cents: 16900,
    currency: "eur",
    customer_name: "H3 Refund Test",
    customer_email: "h3.refund@example.com",
    customer_phone: "+447700900999",
    operational_notes: null,
    status: "confirmed",
    payment_status: "paid",
    stripe_checkout_session_id: `cs_test_${reference}`,
    stripe_payment_intent_id: `pi_test_${reference}`,
    stripe_refund_id: null,
    idempotency_key: `idem-${reference}`,
    payload_json: "{}",
    created_at: now,
    updated_at: now,
    ...overrides,
  };
}

function baseEnv(db: D1Database): Env {
  return {
    PAYMENTS_MODE: "test",
    BOOKINGS_ENABLED: "true",
    STRIPE_SECRET_KEY: "sk_test_refund_webhook_mock",
    STRIPE_WEBHOOK_SECRET: "whsec_test_refund_webhook",
    EMAIL_SENDING_ENABLED: "false",
    EMAIL_FROM: "bookings@notifications.wowatour.com",
    EMAIL_FROM_NAME: "Hellesylt Shore Excursions",
    EMAIL_REPLY_TO: "hello@hellesyltshoreexcursions.com",
    SITE_BASE_URL: "http://localhost:3000",
    CORS_ALLOWED_ORIGINS: "http://localhost:3000",
    DB: db,
  } as unknown as Env;
}

function chargePayload(args: {
  id: string;
  pi: string;
  refunds?: Array<{ id: string }> | null;
  amount?: number;
  amount_refunded?: number;
  refunded?: boolean;
}) {
  const amount = args.amount ?? 16900;
  const amount_refunded = args.amount_refunded ?? amount;
  return {
    id: args.id,
    object: "charge",
    amount,
    amount_refunded,
    refunded: args.refunded ?? true,
    payment_intent: args.pi,
    refunds:
      args.refunds === null
        ? undefined
        : {
            object: "list",
            data: args.refunds ?? [],
            has_more: false,
            url: `/v1/charges/${args.id}/refunds`,
          },
  };
}

function installWebhookStripe(args: {
  event: { id: string; type: string; data: { object: unknown } };
  retrieveCharge?: (id: string) => Promise<unknown> | unknown;
  retrieveShouldFail?: boolean;
}) {
  let retrieveCalls = 0;
  setStripeFactoryForTests(() => {
    return {
      webhooks: {
        constructEventAsync: async () => args.event,
      },
      charges: {
        retrieve: async (id: string) => {
          retrieveCalls += 1;
          if (args.retrieveShouldFail) throw new Error("stripe_charge_retrieve_mock_failed");
          if (!args.retrieveCharge) throw new Error("retrieveCharge not configured");
          return args.retrieveCharge(id);
        },
      },
    } as never;
  });
  return {
    getRetrieveCalls: () => retrieveCalls,
  };
}

async function postWebhook(env: Env): Promise<Response> {
  return handleStripeWebhook(
    new Request("http://bookings.test/api/stripe/webhook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Stripe-Signature": "t=1,v1=test",
      },
      body: "{}",
    }),
    env,
  );
}

test("H-3 A: charge.refunded webhook persists re_ id from payload", async () => {
  const db = createMemoryD1();
  const env = baseEnv(db);
  const reference = "W2HSY-WH-A";
  const pi = `pi_test_${reference}`;
  await insertBooking(env, paidBooking(reference, { stripe_payment_intent_id: pi }));
  installWebhookStripe({
    event: {
      id: "evt_h3_a",
      type: "charge.refunded",
      data: {
        object: chargePayload({
          id: "ch_h3_a",
          pi,
          refunds: [{ id: "re_from_payload" }],
        }),
      },
    },
  });
  const response = await postWebhook(env);
  assert.equal(response.status, 200);
  const booking = await getBookingByReference(env, reference);
  assert.equal(booking?.payment_status, "refunded");
  assert.equal(booking?.status, "confirmed");
  assert.equal(booking?.stripe_refund_id, "re_from_payload");
});

test("H-3 B: charge.refunded without refunds.data retrieves expanded charge for re_ id", async () => {
  const db = createMemoryD1();
  const env = baseEnv(db);
  const reference = "W2HSY-WH-B";
  const pi = `pi_test_${reference}`;
  await insertBooking(env, paidBooking(reference, { stripe_payment_intent_id: pi }));
  const stripe = installWebhookStripe({
    event: {
      id: "evt_h3_b",
      type: "charge.refunded",
      data: {
        object: chargePayload({
          id: "ch_h3_b",
          pi,
          refunds: null,
        }),
      },
    },
    retrieveCharge: (id) =>
      chargePayload({
        id,
        pi,
        refunds: [{ id: "re_from_retrieve" }, { id: "re_older" }],
      }),
  });
  const response = await postWebhook(env);
  assert.equal(response.status, 200);
  assert.equal(stripe.getRetrieveCalls(), 1);
  const booking = await getBookingByReference(env, reference);
  assert.equal(booking?.stripe_refund_id, "re_from_retrieve");
  assert.equal(booking?.payment_status, "refunded");
});

test("H-3 C: existing D1 stripe_refund_id is preserved when payload omits refunds", async () => {
  const db = createMemoryD1();
  const env = baseEnv(db);
  const reference = "W2HSY-WH-C";
  const pi = `pi_test_${reference}`;
  await insertBooking(
    env,
    paidBooking(reference, {
      stripe_payment_intent_id: pi,
      payment_status: "refunded",
      stripe_refund_id: "re_already_saved",
    }),
  );
  const stripe = installWebhookStripe({
    event: {
      id: "evt_h3_c",
      type: "charge.refunded",
      data: {
        object: chargePayload({
          id: "ch_h3_c",
          pi,
          refunds: null,
        }),
      },
    },
    retrieveCharge: () => {
      throw new Error("retrieve must not run when D1 already has re_ id");
    },
  });
  const response = await postWebhook(env);
  assert.equal(response.status, 200);
  assert.equal(stripe.getRetrieveCalls(), 0);
  const booking = await getBookingByReference(env, reference);
  assert.equal(booking?.stripe_refund_id, "re_already_saved");
  assert.equal(booking?.payment_status, "refunded");
});

test("H-3 D: duplicate charge.refunded webhook remains idempotent", async () => {
  const db = createMemoryD1();
  const env = baseEnv(db);
  const reference = "W2HSY-WH-D";
  const pi = `pi_test_${reference}`;
  await insertBooking(env, paidBooking(reference, { stripe_payment_intent_id: pi }));
  const event = {
    id: "evt_h3_d_dup",
    type: "charge.refunded",
    data: {
      object: chargePayload({
        id: "ch_h3_d",
        pi,
        refunds: [{ id: "re_dup" }],
      }),
    },
  };
  installWebhookStripe({ event });
  const first = await postWebhook(env);
  assert.equal(first.status, 200);
  const firstBody = (await first.json()) as { duplicate?: boolean };
  assert.equal(firstBody.duplicate, undefined);

  installWebhookStripe({ event });
  const second = await postWebhook(env);
  assert.equal(second.status, 200);
  const secondBody = (await second.json()) as { duplicate?: boolean; ok?: boolean };
  assert.equal(secondBody.ok, true);
  assert.equal(secondBody.duplicate, true);
  const booking = await getBookingByReference(env, reference);
  assert.equal(booking?.stripe_refund_id, "re_dup");
  assert.equal(booking?.payment_status, "refunded");
});

test("H-3 E: Stripe charge retrieve failure fails closed without claiming event", async () => {
  const db = createMemoryD1();
  const env = baseEnv(db);
  const reference = "W2HSY-WH-E";
  const pi = `pi_test_${reference}`;
  await insertBooking(env, paidBooking(reference, { stripe_payment_intent_id: pi }));
  installWebhookStripe({
    event: {
      id: "evt_h3_e",
      type: "charge.refunded",
      data: {
        object: chargePayload({
          id: "ch_h3_e",
          pi,
          refunds: null,
        }),
      },
    },
    retrieveShouldFail: true,
  });
  const response = await postWebhook(env);
  assert.equal(response.status, 500);
  const booking = await getBookingByReference(env, reference);
  assert.equal(booking?.payment_status, "paid");
  assert.equal(booking?.stripe_refund_id, null);
  // Event must remain unclaimed so Stripe can retry.
  const claimed = await env.DB.prepare(`SELECT event_id FROM processed_events WHERE event_id = ?`)
    .bind("evt_h3_e")
    .first<{ event_id: string }>();
  assert.equal(claimed, null);

  // Recoverable: a later successful delivery can still persist the id.
  installWebhookStripe({
    event: {
      id: "evt_h3_e",
      type: "charge.refunded",
      data: {
        object: chargePayload({
          id: "ch_h3_e",
          pi,
          refunds: null,
        }),
      },
    },
    retrieveCharge: (id) =>
      chargePayload({
        id,
        pi,
        refunds: [{ id: "re_after_retry" }],
      }),
  });
  const retry = await postWebhook(env);
  assert.equal(retry.status, 200);
  const recovered = await getBookingByReference(env, reference);
  assert.equal(recovered?.stripe_refund_id, "re_after_retry");
  assert.equal(recovered?.payment_status, "refunded");
});

test("H-3 refund.updated backfills missing stripe_refund_id without second refund", async () => {
  const db = createMemoryD1();
  const env = baseEnv(db);
  const reference = "W2HSY-WH-RU";
  const pi = `pi_test_${reference}`;
  await insertBooking(
    env,
    paidBooking(reference, {
      stripe_payment_intent_id: pi,
      payment_status: "refunded",
      stripe_refund_id: null,
    }),
  );
  installWebhookStripe({
    event: {
      id: "evt_h3_ru",
      type: "refund.updated",
      data: {
        object: {
          id: "re_from_refund_updated",
          object: "refund",
          status: "succeeded",
          payment_intent: pi,
        },
      },
    },
  });
  const response = await postWebhook(env);
  assert.equal(response.status, 200);
  const booking = await getBookingByReference(env, reference);
  assert.equal(booking?.stripe_refund_id, "re_from_refund_updated");
  assert.equal(booking?.payment_status, "refunded");
  assert.equal(booking?.status, "confirmed");
});
