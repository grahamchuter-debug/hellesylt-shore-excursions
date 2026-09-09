/**
 * Cross-destination isolation + Hellesylt live-gate hardness (Phase H-1).
 * Proves client-supplied destination/product IDs cannot cross price authority.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import worker from "./index";
import {
  LIVE_PAYMENTS_CODE_ENABLED,
  LIVE_UNLOCK_PHRASE,
  liveCheckoutBlock,
  bookingsAreEnabled,
} from "./live-gate";
import { findHellesyltBookingProduct, HELLESYLT_CANCELLATION_COPY } from "../../../shared/destinations/hellesylt-products";
import { findOldenBookingProduct, OLDEN_CANCELLATION_COPY } from "../../../shared/destinations/olden-products";
import { findBelizeBookingProduct } from "../../../shared/destinations/belize-regression";
import { calculateBookingQuote, assertClientTotalMatches } from "../../../shared/world-booking";

const previewEnv = {
  PAYMENTS_MODE: "preview",
  BOOKINGS_ENABLED: "true",
  CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  SITE_BASE_URL: "http://localhost:3000",
} as unknown as Env;

function hellesyltPayload(overrides: Record<string, unknown> = {}) {
  const product = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  const guests = (overrides.guests as { adults: number; children: number; infants: number } | undefined) ?? {
    adults: 2,
    children: 0,
    infants: 0,
  };
  const quote = calculateBookingQuote(product, guests);
  return {
    productId: "briksdal-glacier-discovery",
    bookingSessionId: `iso-${Date.now()}-${Math.random()}`,
    guests,
    customer: {
      name: "Alex Traveller",
      email: "alex@example.com",
      phone: "+447700900123",
    },
    cruise: {
      date: "2027-06-10",
      shipName: "Regal Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    confirmationAcknowledged: true,
    eligibilityAcknowledged: true,
    clientDisplayedTotalCents: quote.amountCents,
    ...overrides,
  };
}

function jsonReq(path: string, body: unknown) {
  return new Request(`http://bookings.test${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("LIVE_PAYMENTS_CODE_ENABLED is false on Hellesylt Worker for H-1", () => {
  assert.equal(LIVE_PAYMENTS_CODE_ENABLED, false);
  assert.equal(LIVE_UNLOCK_PHRASE, "HELLESYLT_LIVE_UNLOCK");
});

test("live Checkout blocked when live code flag is off", () => {
  const product = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  const block = liveCheckoutBlock(
    {
      PAYMENTS_MODE: "live",
      LIVE_PAYMENTS_UNLOCK: "HELLESYLT_LIVE_UNLOCK",
      BOOKINGS_ENABLED: "true",
      STRIPE_SECRET_KEY: "sk_live_FAKE_NOT_A_REAL_SECRET",
      STRIPE_WEBHOOK_SECRET: "whsec_FAKE",
      SITE_BASE_URL: "https://hellesyltshoreexcursions.com",
      DB: {} as D1Database,
    },
    product,
  );
  assert.ok(block);
  assert.equal(block!.code, "LIVE_PAYMENTS_BLOCKED");
});

test("live Checkout Worker path rejects when LIVE_PAYMENTS_CODE_ENABLED is false", async () => {
  const env = {
    ...previewEnv,
    PAYMENTS_MODE: "live",
    BOOKINGS_ENABLED: "true",
    LIVE_PAYMENTS_UNLOCK: "HELLESYLT_LIVE_UNLOCK",
    STRIPE_SECRET_KEY: "sk_live_FAKE_NOT_A_REAL_SECRET",
    STRIPE_WEBHOOK_SECRET: "whsec_FAKE",
    SITE_BASE_URL: "https://hellesyltshoreexcursions.com",
  } as unknown as Env;
  const response = await worker.fetch(jsonReq("/api/bookings/checkout", hellesyltPayload()), env);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "LIVE_PAYMENTS_BLOCKED");
});

test("BOOKINGS_ENABLED=false still kills checkout even in test mode", async () => {
  assert.equal(bookingsAreEnabled({ BOOKINGS_ENABLED: "false" }), false);
  const env = {
    ...previewEnv,
    PAYMENTS_MODE: "test",
    BOOKINGS_ENABLED: "false",
    STRIPE_SECRET_KEY: "sk_test_x",
  } as unknown as Env;
  const response = await worker.fetch(jsonReq("/api/bookings/checkout", hellesyltPayload()), env);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "BOOKINGS_DISABLED");
});

test("Hellesylt Worker rejects Olden and Belize product IDs", async () => {
  const foreignIds = [
    "briksdal-glacier-olden-lake",
    "belize-cave-tubing",
    "turtle-snorkel-and-island-time",
    "altun-ha-and-belize-city-overview",
  ];
  for (const productId of foreignIds) {
    const response = await worker.fetch(
      jsonReq(
        "/api/bookings/request",
        hellesyltPayload({
          productId,
          clientDisplayedTotalCents: 9600,
          eligibilityAcknowledged: true,
        }),
      ),
      previewEnv,
    );
    const data = (await response.json()) as { ok: boolean; code: string };
    assert.equal(data.ok, false, `expected reject for ${productId}`);
    assert.equal(data.code, "UNKNOWN_PRODUCT");
  }
});

test("Hellesylt prices are 16900/10900; Olden stub remains 9600/5600", () => {
  const hellesylt = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  const olden = findOldenBookingProduct("briksdal-glacier-olden-lake")!;
  assert.equal(calculateBookingQuote(hellesylt, { adults: 1, children: 0, infants: 0 }).amountCents, 16900);
  assert.equal(calculateBookingQuote(hellesylt, { adults: 1, children: 1, infants: 0 }).amountCents, 27800);
  assert.equal(calculateBookingQuote(olden, { adults: 1, children: 0, infants: 0 }).amountCents, 9600);
  assert.equal(calculateBookingQuote(olden, { adults: 1, children: 1, infants: 0 }).amountCents, 15200);
  assert.equal(hellesylt.pricing.adultAmount, 169);
  assert.equal(hellesylt.pricing.childAmount, 109);
  assert.equal(olden.pricing.adultAmount, 96);
  assert.equal(olden.pricing.childAmount, 56);
});

test("cancellation policy does not leak across destinations", () => {
  assert.match(HELLESYLT_CANCELLATION_COPY.customerCancellation, /7 days/i);
  assert.doesNotMatch(HELLESYLT_CANCELLATION_COPY.customerCancellation, /48 hours/i);
  assert.match(OLDEN_CANCELLATION_COPY.customerCancellation, /48 hours/i);
  assert.doesNotMatch(OLDEN_CANCELLATION_COPY.customerCancellation, /7 days/i);
});

test("client cannot force Olden EUR amount onto Hellesylt quote", () => {
  const hellesylt = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  const quote = calculateBookingQuote(hellesylt, { adults: 1, children: 0, infants: 0 });
  assert.equal(quote.currency, "EUR");
  assert.equal(quote.amountCents, 16900);
  assert.throws(() => assertClientTotalMatches(quote, 9600));
  assert.doesNotThrow(() => assertClientTotalMatches(quote, 16900));
});

test("client cannot force Hellesylt EUR amount onto Olden stub quote", () => {
  const olden = findOldenBookingProduct("briksdal-glacier-olden-lake")!;
  const quote = calculateBookingQuote(olden, { adults: 1, children: 0, infants: 0 });
  assert.equal(quote.amountCents, 9600);
  assert.throws(() => assertClientTotalMatches(quote, 16900));
  assert.doesNotThrow(() => assertClientTotalMatches(quote, 9600));
});

test("client cannot force Belize USD amount onto Hellesylt Briksdal quote", () => {
  const hellesylt = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  const quote = calculateBookingQuote(hellesylt, { adults: 1, children: 0, infants: 0 });
  assert.equal(quote.currency, "EUR");
  assert.equal(quote.amountCents, 16900);
  assert.throws(() => assertClientTotalMatches(quote, 8600));
});

test("client currency/amount fields ignored; server EUR pricing wins", async () => {
  const response = await worker.fetch(
    jsonReq(
      "/api/bookings/request",
      hellesyltPayload({
        currency: "USD",
        amountCents: 8600,
        unitPrice: 86,
        successUrl: "https://evil.example/success",
        cancelUrl: "https://evil.example/cancel",
      }),
    ),
    previewEnv,
  );
  const data = (await response.json()) as {
    ok: boolean;
    reference?: string;
    status?: string;
    code?: string;
  };
  assert.equal(data.ok, true);
  assert.match(data.reference ?? "", /^W2HSY-/);
  assert.equal(data.status, "requested");
});

test("tampered client total rejected even with Olden cents", async () => {
  const response = await worker.fetch(
    jsonReq("/api/bookings/request", hellesyltPayload({ clientDisplayedTotalCents: 9600 })),
    previewEnv,
  );
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "PRICE");
});

test("Hellesylt requires eligibilityAcknowledged — cannot skip", async () => {
  const response = await worker.fetch(
    jsonReq("/api/bookings/request", hellesyltPayload({ eligibilityAcknowledged: false })),
    previewEnv,
  );
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "ELIGIBILITY");
});

test("Hellesylt infant 0 to 2 remains free and does not inherit Belize infant bans", () => {
  const hellesylt = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  assert.equal(hellesylt.pricing.infantAmount, 0);
  assert.equal(hellesylt.pricing.infantPricingStatus, "priced");
  assert.equal(
    calculateBookingQuote(hellesylt, { adults: 1, children: 0, infants: 2 }).amountCents,
    16900,
  );

  const turtle = findBelizeBookingProduct("turtle-snorkel-and-island-time")!;
  assert.equal(turtle.pricing.infantPricingStatus, "not_sold");
  assert.throws(() => calculateBookingQuote(turtle, { adults: 1, children: 0, infants: 1 }));
});

test("Belize and Olden cannot resolve Hellesylt product via their finders", () => {
  const product = findHellesyltBookingProduct("briksdal-glacier-discovery")!;
  assert.ok(product);
  assert.equal(findOldenBookingProduct(product.id), undefined);
  assert.equal(findBelizeBookingProduct(product.id), undefined);
  assert.equal(findHellesyltBookingProduct("briksdal-glacier-olden-lake"), undefined);
});
