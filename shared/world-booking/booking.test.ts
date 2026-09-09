/**
 * Shared booking engine tests — Hellesylt Phase H-1 (Briksdal Glacier Discovery).
 * Olden stub catalogue remains for regression isolation only.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  findHellesyltBookingProduct,
  HELLESYLT_BOOKING_PRODUCTS,
  HELLESYLT_CANCELLATION_COPY,
} from "../destinations/hellesylt-products";
import { hellesyltBookingCore } from "../destinations/hellesylt";
import {
  findOldenBookingProduct,
  OLDEN_BOOKING_PRODUCTS,
  OLDEN_CANCELLATION_COPY,
} from "../destinations/olden-products";
import { oldenBookingCore } from "../destinations/olden";
import {
  assertClientTotalMatches,
  calculateBookingQuote,
  confirmedCustomerEmail,
  createBookingReference,
  declinedCustomerEmail,
  destinationBrandFromCore,
  renderCustomerBookingEmailText,
  requestedCustomerEmail,
  statusAfterPaymentSuccess,
  supplierRequestEmail,
  validateCruise,
  validateCustomer,
} from "./index";

const brand = destinationBrandFromCore(hellesyltBookingCore);
const briksdal = findHellesyltBookingProduct("briksdal-glacier-discovery");
assert.ok(briksdal);

test("one Hellesylt product ID present", () => {
  assert.equal(HELLESYLT_BOOKING_PRODUCTS.length, 1);
  assert.equal(HELLESYLT_BOOKING_PRODUCTS[0]!.id, "briksdal-glacier-discovery");
});

test("Briksdal Discovery EUR adult 169 child 109 infant 0", () => {
  assert.equal(briksdal!.pricing.model, "adult_child");
  assert.equal(briksdal!.pricing.currency, "EUR");
  assert.equal(briksdal!.pricing.adultAmount, 169);
  assert.equal(briksdal!.pricing.childAmount, 109);
  assert.equal(briksdal!.pricing.infantAmount, 0);
  assert.equal(briksdal!.pricing.infantPricingStatus, "priced");
  assert.equal(calculateBookingQuote(briksdal!, { adults: 1, children: 0, infants: 0 }).amountCents, 16900);
  assert.equal(briksdal!.pricing.childAmount * 100, 10900);
  assert.equal(briksdal!.pricing.infantAmount * 100, 0);
  assert.equal(calculateBookingQuote(briksdal!, { adults: 2, children: 0, infants: 0 }).amountCents, 33800);
  assert.equal(calculateBookingQuote(briksdal!, { adults: 2, children: 1, infants: 0 }).amountCents, 44700);
  assert.equal(calculateBookingQuote(briksdal!, { adults: 1, children: 1, infants: 1 }).amountCents, 27800);
  assert.equal(calculateBookingQuote(briksdal!, { adults: 1, children: 0, infants: 1 }).amountCents, 16900);
});

test("adult required; infant free still requires adult", () => {
  assert.throws(() => calculateBookingQuote(briksdal!, { adults: 0, children: 1, infants: 0 }));
  assert.throws(() => calculateBookingQuote(briksdal!, { adults: 0, children: 0, infants: 1 }));
});

test("approved max 45 guests; 46 and zero adults rejected", () => {
  assert.equal(briksdal!.capacity.maxGuestsPerBooking, 45);
  assert.equal(briksdal!.capacity.maxGuestsPerBookingSource, "approved");
  assert.doesNotThrow(() => calculateBookingQuote(briksdal!, { adults: 45, children: 0, infants: 0 }));
  assert.throws(() => calculateBookingQuote(briksdal!, { adults: 46, children: 0, infants: 0 }));
  assert.throws(() => calculateBookingQuote(briksdal!, { adults: 0, children: 0, infants: 0 }));
});

test("Olden stub remains EUR 96/56/0 and 48-hour cancellation (anti-leakage)", () => {
  const olden = findOldenBookingProduct("briksdal-glacier-olden-lake");
  assert.ok(olden);
  assert.equal(OLDEN_BOOKING_PRODUCTS.length, 1);
  assert.equal(olden!.pricing.adultAmount, 96);
  assert.equal(olden!.pricing.childAmount, 56);
  assert.equal(olden!.pricing.infantAmount, 0);
  assert.equal(calculateBookingQuote(olden!, { adults: 1, children: 0, infants: 0 }).amountCents, 9600);
  assert.equal(calculateBookingQuote(olden!, { adults: 1, children: 1, infants: 0 }).amountCents, 15200);
  assert.equal(oldenBookingCore.bookingRefPrefix, "W2ODE");
  assert.match(OLDEN_CANCELLATION_COPY.customerCancellation, /48 hours/i);
  assert.doesNotMatch(OLDEN_CANCELLATION_COPY.customerCancellation, /7 days/i);
  assert.doesNotMatch(HELLESYLT_CANCELLATION_COPY.customerCancellation, /48 hours/i);
});

test("client total must match server quote", () => {
  const quote = calculateBookingQuote(briksdal!, { adults: 2, children: 0, infants: 0 });
  assert.doesNotThrow(() => assertClientTotalMatches(quote, 33800));
  assert.throws(() => assertClientTotalMatches(quote, 1));
});

test("payment success status is requested not confirmed", () => {
  assert.equal(statusAfterPaymentSuccess("request"), "requested");
});

test("booking references use Hellesylt W2HSY prefix", () => {
  assert.match(createBookingReference(hellesyltBookingCore), /^W2HSY-/);
  assert.equal(hellesyltBookingCore.bookingRefPrefix, "W2HSY");
});

test("customer and cruise validation", () => {
  assert.equal(
    validateCustomer({ name: "Alex Traveller", email: "alex@example.com", phone: "+447700900123" }),
    null,
  );
  assert.ok(validateCustomer({ name: "A", email: "x", phone: "1" }));
  assert.ok(validateCustomer({ name: "Alex Traveller", email: "bad", phone: "+447700900123" }));
  assert.ok(
    validateCruise({
      date: "nope",
      shipName: "Ship",
      shipSlug: "s",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    }),
  );
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
  assert.equal(
    validateCruise({
      date: "2027-06-10",
      shipName: "Regal Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    }),
    null,
  );
});

test("cancellation copy is free up to 7 days plus unable-to-confirm refund", () => {
  assert.match(HELLESYLT_CANCELLATION_COPY.customerCancellation, /7 days/i);
  assert.doesNotMatch(HELLESYLT_CANCELLATION_COPY.customerCancellation, /48 hours/);
  assert.match(HELLESYLT_CANCELLATION_COPY.freeWindow, /7 days/i);
  assert.match(HELLESYLT_CANCELLATION_COPY.unableToConfirm, /full refund/i);
  assert.match(HELLESYLT_CANCELLATION_COPY.paymentNotConfirmation, /not.*confirmed/i);
  assert.match(HELLESYLT_CANCELLATION_COPY.meetingInstructions, /tour ticket/i);
});

test("customer requested email is not confirmation and leaks no costs", () => {
  const email = requestedCustomerEmail({
    reference: "W2HSY-TESTREF1",
    product: briksdal!,
    cruise: {
      date: "2027-06-10",
      shipName: "Regal Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 2, children: 0, infants: 0 },
    amountLabel: "EUR €338",
    customerName: "Alex",
    brand,
  });
  assert.match(email.subject, /request/i);
  assert.doesNotMatch(email.subject, /confirmed/i);
  const body = email.bodyLines.join("\n");
  assert.match(body, /not confirmed/i);
  assert.doesNotMatch(body, /\bSEG\b|Shore Excursions Group|adult_cost|child_cost/i);
});

test("ops request email includes product and contact", () => {
  const email = supplierRequestEmail({
    reference: "W2HSY-TESTREF1",
    product: briksdal!,
    cruise: {
      date: "2027-06-10",
      shipName: "Regal Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 2, children: 0, infants: 0 },
    customer: { name: "Alex Traveller", email: "alex@example.com", phone: "+447700900123" },
    amountLabel: "EUR €338",
    operationalNotes: "Eligibility acknowledged: yes",
    destinationLabel: "Hellesylt Shore Excursions, new booking request",
    stripeCheckoutSessionId: "cs_test_example",
    stripePaymentIntentId: "pi_test_example",
  });
  assert.match(email.subject, /W2HSY-TESTREF1/);
  assert.match(email.shell.destinationLabel, /Hellesylt/i);
  assert.match(email.body, /Eligibility acknowledged/);
  assert.match(email.body, /cs_test_example/);
  assert.doesNotMatch(email.body, /Belize|W2BZE/i);
});

test("request mode live catalogue for Briksdal Discovery", () => {
  assert.equal(briksdal!.bookingMode, "request");
  assert.equal(briksdal!.availability, "live");
  assert.equal(briksdal!.pricing.currency, "EUR");
  assert.equal(briksdal!.paymentSettlement, "charge_refund");
  assert.equal(briksdal!.supplier.routingStatus, "production_ready");
  assert.equal(briksdal!.durationLabel, "Approx. 6 hours 30 minutes");
  const notes = (briksdal!.supplierReferenceNotes || []).join("\n");
  assert.match(notes, /DIRECT_SUPPLIER_MANUAL/);
  assert.match(notes, /routingStatus=production_ready/);
});

test("requested email avoids brand-name greeting and remains not confirmed", () => {
  const email = requestedCustomerEmail({
    reference: "W2HSY-H1PREV1",
    product: briksdal!,
    cruise: {
      date: "2027-07-15",
      shipName: "Sky Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 1, children: 1, infants: 0 },
    amountLabel: "EUR €278",
    customerName: "Hellesylt Frontend Test",
    brand,
  });
  const body = email.bodyLines.join("\n");
  assert.doesNotMatch(body, /Thanks Hellesylt/i);
  assert.match(body, /not confirmed/i);
  assert.match(email.shell.statusLabel, /Awaiting confirmation/i);
  assert.doesNotMatch(email.shell.statusLabel, /^Confirmed$/i);
  assert.match(body, /W2HSY-H1PREV1/);
  assert.match(body, /EUR €278|€278/);
  assert.doesNotMatch(body, /Belize|W2BZE|SEG/i);
  assert.equal(email.shell.eyebrow, "Hellesylt Shore Excursions");
});

test("confirmed email uses confirmed language only for confirmed template", () => {
  const email = confirmedCustomerEmail({
    reference: "W2HSY-H1CONF1",
    product: briksdal!,
    cruise: {
      date: "2027-07-15",
      shipName: "Sky Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 1, children: 0, infants: 0 },
    amountLabel: "EUR €169",
    customerName: "Alex Traveller",
    meetingInstructions: HELLESYLT_CANCELLATION_COPY.meetingInstructions,
    brand,
  });
  const body = email.bodyLines.join("\n");
  assert.match(email.subject, /confirmed/i);
  assert.equal(email.shell.headline, "Your excursion is confirmed");
  assert.equal(email.shell.statusTone, "confirmed");
  assert.match(email.shell.statusLabel, /^Confirmed$/i);
  assert.match(body, /places are confirmed/i);
  assert.match(body, /tour ticket/i);
  assert.match(body, /meeting instructions.*sent separately|sent separately/i);
  assert.doesNotMatch(body, /Belize|SEG|voucher|emergency|pickup time|meeting point:/i);
  assert.equal(email.shell.eyebrow, "Hellesylt Shore Excursions");
});

test("confirmed email does not invent joining details or supplier internals", () => {
  const email = confirmedCustomerEmail({
    reference: "W2HSY-H1CONF2",
    product: briksdal!,
    cruise: {
      date: "2027-07-15",
      shipName: "Sky Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 2, children: 0, infants: 0 },
    amountLabel: "EUR €338",
    customerName: "Alex Traveller",
    meetingInstructions: HELLESYLT_CANCELLATION_COPY.meetingInstructions,
    brand,
  });
  const rendered = renderCustomerBookingEmailText(email.shell);
  assert.match(rendered, /Your excursion is confirmed/);
  assert.match(rendered, /Your tour ticket, including your meeting instructions, will be sent separately/);
  assert.doesNotMatch(rendered, /SEG|adult_cost|info@wowatour\.com|fulfilment_mode/i);
  assert.doesNotMatch(rendered, /emergency (number|phone)|what to bring|voucher code|pickup at/i);
});

test("unable-to-confirm email apologises and refunds without customer-cancel blame", () => {
  const email = declinedCustomerEmail({
    reference: "W2HSY-H1DECL1",
    product: briksdal!,
    cruise: {
      date: "2027-07-15",
      shipName: "Sky Princess",
      shipSlug: "not-listed",
      cruiseLine: "",
      isCustomShip: true,
      scheduleMatched: false,
    },
    guests: { adults: 1, children: 0, infants: 0 },
    amountLabel: "EUR €169",
    customerName: "Alex Traveller",
    refundState: "refund_pending",
    brand,
  });
  const body = email.bodyLines.join("\n");
  assert.match(email.subject, /request/i);
  assert.doesNotMatch(email.subject, /confirmed/i);
  assert.match(body, /could not confirm|couldn't confirm/i);
  assert.match(body, /full refund|refunded|initiated a full refund/i);
  assert.doesNotMatch(body, /you cancelled|your cancellation|SEG|Belize/i);
  const text = renderCustomerBookingEmailText(email.shell);
  assert.match(text, /^Need help\?$/m);
  assert.doesNotMatch(text, /Need help with your request\?/i);
  assert.match(text, /hello@hellesyltshoreexcursions\.com/);
  assert.doesNotMatch(text, /info@wowatour\.com|adult_cost/i);
});

test("ops notify mailbox may be info@wowatour.com; customer Reply-To stays hello@", () => {
  assert.equal(briksdal!.supplier.notificationEmail, "info@wowatour.com");
  assert.equal(briksdal!.supplier.routingStatus, "production_ready");
  assert.equal(hellesyltBookingCore.bookingEmail, "hello@hellesyltshoreexcursions.com");

  const cruise = {
    date: "2027-07-15",
    shipName: "Sky Princess",
    shipSlug: "not-listed",
    cruiseLine: "",
    isCustomShip: true,
    scheduleMatched: false,
  } as const;
  const guests = { adults: 1, children: 0, infants: 0 };

  for (const email of [
    requestedCustomerEmail({
      reference: "W2HSY-H1-RT",
      product: briksdal!,
      cruise,
      guests,
      amountLabel: "EUR €169",
      customerName: "Alex Traveller",
      brand,
    }),
    confirmedCustomerEmail({
      reference: "W2HSY-H1-RT",
      product: briksdal!,
      cruise,
      guests,
      amountLabel: "EUR €169",
      customerName: "Alex Traveller",
      brand,
    }),
    declinedCustomerEmail({
      reference: "W2HSY-H1-RT",
      product: briksdal!,
      cruise,
      guests,
      amountLabel: "EUR €169",
      customerName: "Alex Traveller",
      refundState: "refunded",
      brand,
    }),
  ]) {
    const rendered = renderCustomerBookingEmailText(email.shell);
    assert.match(rendered, /hello@hellesyltshoreexcursions\.com/);
    assert.doesNotMatch(rendered, /info@wowatour\.com/);
    assert.doesNotMatch(rendered, /adult_cost|child_cost|fulfilment_mode/i);
  }

  const ops = supplierRequestEmail({
    reference: "W2HSY-H1-RT",
    product: briksdal!,
    cruise,
    guests,
    customer: { name: "Alex Traveller", email: "alex@example.com", phone: "+447700900123" },
    amountLabel: "EUR €169",
    destinationLabel: "Hellesylt Shore Excursions, new booking request",
  });
  assert.match(ops.shell.destinationLabel, /Hellesylt/i);
  assert.match(ops.body, /Fulfilment mode\nDIRECT_SUPPLIER_MANUAL|Fulfilment mode.*DIRECT_SUPPLIER_MANUAL/i);
  assert.doesNotMatch(ops.body, /SEG affiliate/i);
});
