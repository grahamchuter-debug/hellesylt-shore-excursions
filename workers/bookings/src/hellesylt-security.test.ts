/**
 * Hellesylt booking security / commercial gate tests (Phase H-1).
 * No live Stripe calls in unit tests. Uses Worker preview mode + shared pricing authority.
 * LIVE_PAYMENTS_CODE_ENABLED is false; other live gates still apply when the flag is later enabled.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import worker from "./index";
import { LIVE_PAYMENTS_CODE_ENABLED, LIVE_UNLOCK_PHRASE, liveCheckoutBlock, bookingsAreEnabled } from "./live-gate";
import { assertStripeTestSecret, StripeModeError } from "./stripe-guard";
import {
  findHellesyltBookingProduct,
  HELLESYLT_BOOKING_PRODUCTS,
} from "../../../shared/destinations/hellesylt-products";
import { findOldenBookingProduct } from "../../../shared/destinations/olden-products";
import {
  assertClientTotalMatches,
  calculateBookingQuote,
  requestedCustomerEmail,
  destinationBrandFromCore,
  statusAfterPaymentSuccess,
  validateCruise,
  validateCustomer,
} from "../../../shared/world-booking";
import { hellesyltBookingCore } from "../../../shared/destinations/hellesylt";

const PRODUCT_ID = "briksdal-glacier-discovery";

const previewEnv = {
  PAYMENTS_MODE: "preview",
  BOOKINGS_ENABLED: "true",
  CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  SITE_BASE_URL: "http://localhost:3000",
} as unknown as Env;

function payload(
  sessionId: string,
  guests = { adults: 2, children: 0, infants: 0 },
  overrides: Record<string, unknown> = {},
  productId = PRODUCT_ID,
) {
  const product = findHellesyltBookingProduct(productId)!;
  const quote = calculateBookingQuote(product, guests);
  return {
    productId,
    bookingSessionId: sessionId,
    guests,
    customer: { name: "Alex Traveller", email: "alex@example.com", phone: "+447700900123" },
    cruise: {
      date: "2027-06-10",
      shipName: "Regal Princess",
      shipSlug: "regal-princess",
      cruiseLine: "Princess Cruises",
      isCustomShip: true,
      scheduleMatched: false,
    },
    confirmationAcknowledged: true,
    eligibilityAcknowledged: true,
    clientDisplayedTotalCents: quote.amountCents,
    ...overrides,
  };
}

function jsonReq(url: string, body: unknown) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("LIVE_PAYMENTS_CODE_ENABLED is false for Hellesylt H-1", () => {
  assert.equal(LIVE_PAYMENTS_CODE_ENABLED, false);
  assert.equal(LIVE_UNLOCK_PHRASE, "HELLESYLT_LIVE_UNLOCK");
});

test("liveCheckoutBlock blocks on live code flag before other gates", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  const blocked = liveCheckoutBlock(
    {
      PAYMENTS_MODE: "live",
      LIVE_PAYMENTS_UNLOCK: "HELLESYLT_LIVE_UNLOCK",
      BOOKINGS_ENABLED: "true",
      STRIPE_SECRET_KEY: "sk_live_fake",
      STRIPE_WEBHOOK_SECRET: "whsec_fake",
      SITE_BASE_URL: "https://hellesyltshoreexcursions.com",
      DB: {} as D1Database,
    },
    product,
  );
  assert.ok(blocked);
  assert.equal(blocked!.code, "LIVE_PAYMENTS_BLOCKED");
});

test("BOOKINGS_ENABLED=false kill switch", () => {
  assert.equal(bookingsAreEnabled({ BOOKINGS_ENABLED: "false" }), false);
});

test("Briksdal Discovery request mode with EUR 169/109/0", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  assert.equal(product.availability, "live");
  assert.equal(product.bookingMode, "request");
  assert.equal(product.pricing.currency, "EUR");
  assert.equal(product.pricing.adultAmount, 169);
  assert.equal(product.pricing.childAmount, 109);
  assert.equal(product.pricing.infantAmount, 0);
  assert.equal(product.capacity.maxGuestsPerBooking, 99);
  assert.equal(product.capacity.maxGuestsPerBookingSource, "preview_unapproved");
  assert.equal(HELLESYLT_BOOKING_PRODUCTS.length, 1);
});

test("EUR pricing cents: adult 16900, adult+child 27800, adult+infant 16900", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  assert.equal(calculateBookingQuote(product, { adults: 1, children: 0, infants: 0 }).amountCents, 16900);
  assert.equal(calculateBookingQuote(product, { adults: 1, children: 1, infants: 0 }).amountCents, 27800);
  assert.equal(calculateBookingQuote(product, { adults: 1, children: 0, infants: 1 }).amountCents, 16900);
});

test("zero-adult booking rejected", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  assert.throws(() => calculateBookingQuote(product, { adults: 0, children: 1, infants: 0 }));
});

test("technical max 99 guests ok; 100 guests rejected", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  assert.doesNotThrow(() => calculateBookingQuote(product, { adults: 99, children: 0, infants: 0 }));
  assert.throws(() => calculateBookingQuote(product, { adults: 100, children: 0, infants: 0 }));
});

test("preview Worker records requested booking with W2HSY- prefix", async () => {
  const sessionId = `hsy-sess-${Date.now()}`;
  const first = await worker.fetch(
    jsonReq("http://bookings.test/api/bookings/request", payload(sessionId, { adults: 2, children: 0, infants: 0 })),
    previewEnv,
  );
  const firstJson = (await first.json()) as { ok: boolean; status: string; reference: string };
  assert.equal(firstJson.ok, true);
  assert.equal(firstJson.status, "requested");
  assert.equal(statusAfterPaymentSuccess("request"), "requested");
  assert.match(firstJson.reference, /^W2HSY-/);
});

test("client price tampering rejected", async () => {
  const tampered = payload(`tamper-${Date.now()}`, { adults: 2, children: 0, infants: 0 }, { clientDisplayedTotalCents: 1 });
  const response = await worker.fetch(jsonReq("http://bookings.test/api/bookings/request", tampered), previewEnv);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "PRICE");
});

test("unknown product rejected", async () => {
  const bad = payload(`unk-${Date.now()}`, { adults: 1, children: 0, infants: 0 }, { productId: "not-a-hellesylt-product" });
  const response = await worker.fetch(jsonReq("http://bookings.test/api/bookings/request", bad), previewEnv);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "UNKNOWN_PRODUCT");
});

test("Olden product IDs rejected by Hellesylt Worker", async () => {
  const oldenId = "briksdal-glacier-olden-lake";
  assert.ok(findOldenBookingProduct(oldenId));
  assert.equal(findHellesyltBookingProduct(oldenId), undefined);
  const response = await worker.fetch(
    jsonReq(
      "http://bookings.test/api/bookings/request",
      payload(`olden-reject-${Date.now()}`, { adults: 1, children: 0, infants: 0 }, { productId: oldenId, clientDisplayedTotalCents: 9600 }),
    ),
    previewEnv,
  );
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "UNKNOWN_PRODUCT");
});

test("missing consent rejected", async () => {
  const body = payload(`consent-${Date.now()}`, { adults: 1, children: 0, infants: 0 }, { confirmationAcknowledged: false });
  const response = await worker.fetch(jsonReq("http://bookings.test/api/bookings/request", body), previewEnv);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "CONSENT");
});

test("missing eligibility ack rejected", async () => {
  const body = payload(`elig-${Date.now()}`, { adults: 1, children: 0, infants: 0 }, { eligibilityAcknowledged: false });
  const response = await worker.fetch(jsonReq("http://bookings.test/api/bookings/request", body), previewEnv);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "ELIGIBILITY");
});

test("past date rejection", () => {
  assert.ok(
    validateCruise({
      date: "2020-01-01",
      shipName: "Ship",
      shipSlug: "s",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    }),
  );
});

test("invalid email / zero party / missing fields", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  assert.throws(() => calculateBookingQuote(product, { adults: 0, children: 0, infants: 0 }));
  assert.ok(validateCruise({ date: "nope", shipName: "Ship", shipSlug: "s", cruiseLine: "", isCustomShip: true, scheduleMatched: false }));
  assert.ok(validateCustomer({ name: "Alex Traveller", email: "bad", phone: "+447700900123" }));
  assert.equal(validateCustomer({ name: "Alex Traveller", email: "alex@example.com", phone: "+447700900123" }), null);
});

test("ops request heading is Hellesylt", () => {
  const src = readFileSync(new URL("./notify.ts", import.meta.url), "utf8");
  assert.match(src, /NEW HELLESYLT BOOKING REQUEST/);
  assert.doesNotMatch(src, /NEW OLDEN BOOKING REQUEST|NEW BELIZE BOOKING REQUEST|NEW ST LUCIA BOOKING REQUEST/);
});

test("missing customer fields rejected by preview Worker", async () => {
  const body = payload(`miss-${Date.now()}`, { adults: 1, children: 0, infants: 0 }, {
    customer: { name: "", email: "alex@example.com", phone: "+447700900123" },
  });
  const response = await worker.fetch(jsonReq("http://bookings.test/api/bookings/request", body), previewEnv);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "CUSTOMER");
});

test("assertClientTotalMatches rejects mismatch", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  const quote = calculateBookingQuote(product, { adults: 2, children: 0, infants: 0 });
  assert.throws(() => assertClientTotalMatches(quote, quote.amountCents - 100));
});

test("assertStripeTestSecret rejects live keys", () => {
  assert.equal(assertStripeTestSecret("sk_test_abc123"), "sk_test_abc123");
  assert.throws(
    () => assertStripeTestSecret("sk_live_abc123"),
    (error: unknown) => error instanceof StripeModeError && error.code === "LIVE_KEY_REJECTED",
  );
});

test("checkout kill switch returns BOOKINGS_DISABLED", async () => {
  const env = { ...previewEnv, PAYMENTS_MODE: "test", BOOKINGS_ENABLED: "false", STRIPE_SECRET_KEY: "sk_test_x" } as unknown as Env;
  const response = await worker.fetch(jsonReq("http://bookings.test/api/bookings/checkout", payload(`kill-${Date.now()}`)), env);
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(data.ok, false);
  assert.equal(data.code, "BOOKINGS_DISABLED");
});

test("bad webhook signature rejected (missing header)", async () => {
  const env = {
    PAYMENTS_MODE: "test",
    STRIPE_SECRET_KEY: "sk_test_abc",
    STRIPE_WEBHOOK_SECRET: "whsec_test",
    BOOKINGS_ENABLED: "true",
  } as unknown as Env;
  const response = await worker.fetch(
    new Request("http://bookings.test/api/stripe/webhook", { method: "POST", body: "{}" }),
    env,
  );
  const data = (await response.json()) as { ok: boolean; code: string };
  assert.equal(response.status, 400);
  assert.equal(data.code, "SIGNATURE");
});

test("TEST_ONLY_EMAIL_OVERRIDE applies only in PAYMENTS_MODE=test", async () => {
  const { resolveOutboundRecipient } = await import("./email");
  const intended = "synthetic.customer@example.com";
  const override = "hello@hellesyltshoreexcursions.com";

  const inTest = resolveOutboundRecipient(
    { PAYMENTS_MODE: "test", TEST_ONLY_EMAIL_OVERRIDE: override },
    intended,
  );
  assert.equal(inTest.to, override);
  assert.equal(inTest.overridden, true);

  const inLive = resolveOutboundRecipient(
    { PAYMENTS_MODE: "live", TEST_ONLY_EMAIL_OVERRIDE: override },
    intended,
  );
  assert.equal(inLive.to, intended);
  assert.equal(inLive.overridden, false);
});

test("Stripe Link disabled at Hellesylt session level (checkout source)", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(join(here, "routes/checkout.ts"), "utf8");
  assert.match(src, /payment_method_types:\s*\[\s*["']card["']\s*\]/);
  assert.match(src, /wallet_options:\s*\{[\s\S]*link:\s*\{\s*display:\s*["']never["']/);
});

test("no public cost leak in customer-facing email copy", () => {
  const product = findHellesyltBookingProduct(PRODUCT_ID)!;
  const brand = destinationBrandFromCore(hellesyltBookingCore);
  const email = requestedCustomerEmail({
    reference: "W2HSY-SECURE1",
    product,
    cruise: {
      date: "2027-06-10",
      shipName: "Regal Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 1, children: 0, infants: 0 },
    amountLabel: "EUR €169",
    customerName: "Alex",
    brand,
  });
  const blob = [email.subject, ...email.bodyLines, email.customerHeading ?? ""].join("\n");
  assert.doesNotMatch(blob, /\bSEG\b|Shore Excursions Group|adult_cost|child_cost|margin|GP\b/i);
});

test("internal product notes keep costs unknown; no invented supplier nets", () => {
  for (const product of HELLESYLT_BOOKING_PRODUCTS) {
    const notes = (product.supplierReferenceNotes || []).join("\n");
    assert.match(notes, /supplier_costs=UNKNOWN/i);
    assert.doesNotMatch(notes, /adult_cost=\d+/);
    assert.doesNotMatch(product.productPath, /cost|\d{2,}/i);
    assert.doesNotMatch(product.bookingPath, /cost/i);
  }
});

test("production live code flag disabled in live-gate source", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(join(here, "live-gate.ts"), "utf8");
  assert.match(src, /LIVE_PAYMENTS_CODE_ENABLED\s*=\s*false/);
  assert.match(src, /CAPACITY_UNAPPROVED/);
  assert.match(src, /HELLESYLT_LIVE_UNLOCK/);
});

test("service name is hellesylt-bookings", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(join(here, "index.ts"), "utf8");
  assert.match(src, /service:\s*["']hellesylt-bookings["']/);
});

test("TEST Worker SITE_BASE_URL is local-safe; prod wrangler stays locked", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const testCfg = readFileSync(join(here, "../wrangler.jsonc"), "utf8");
  const prodCfg = readFileSync(join(here, "../wrangler.prod.jsonc"), "utf8");
  assert.match(testCfg, /"name":\s*"hellesylt-bookings-test"/);
  assert.match(testCfg, /"SITE_BASE_URL":\s*"http:\/\/localhost:3000"/);
  assert.match(testCfg, /"EMAIL_SENDING_ENABLED":\s*"false"/);
  assert.match(testCfg, /"EMAIL_REPLY_TO":\s*"hello@hellesyltshoreexcursions\.com"/);
  assert.match(testCfg, /"BOOKINGS_ENABLED":\s*"true"/);
  assert.match(prodCfg, /"name":\s*"hellesylt-bookings-prod"/);
  assert.match(prodCfg, /"SITE_BASE_URL":\s*"https:\/\/hellesyltshoreexcursions\.com"/);
  assert.match(prodCfg, /"BOOKINGS_ENABLED":\s*"false"/);
  assert.match(prodCfg, /"EMAIL_SENDING_ENABLED":\s*"false"/);
  assert.match(prodCfg, /"EMAIL_REPLY_TO":\s*"hello@hellesyltshoreexcursions\.com"/);
  assert.doesNotMatch(prodCfg, /oldenshoreexcursions|olden-bookings/);
  assert.doesNotMatch(testCfg, /oldenshoreexcursions|olden-bookings/);
  assert.doesNotMatch(prodCfg, /localhost:3000/);
});
