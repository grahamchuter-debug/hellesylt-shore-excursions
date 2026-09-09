import { hellesyltBookingCore } from "./hellesylt";
import type { AgeBand, BookableProductConfig, ProductCapacity, ProductPricing } from "../world-booking/types";

/**
 * Operational routing: Wow A Tour ops mailbox for Graham’s manual fulfilment.
 * Customer Reply-To stays hello@hellesyltshoreexcursions.com (EMAIL_REPLY_TO / bookingEmail).
 * routingStatus remains preview_placeholder until fulfilment partner is known (blocks live checkout).
 */
const OPERATIONS = {
  id: "hellesylt-shore-ops",
  displayName: "Hellesylt Shore Excursions Operations",
  notificationEmail: "info@wowatour.com",
  routingStatus: "preview_placeholder" as const,
};

const REQUEST_SETTLEMENT = "charge_refund" as const;

/**
 * TECHNICAL online cap only (preview_unapproved).
 * Commercial MAX_GUESTS_PER_BOOKING = UNKNOWN until Graham approval.
 * Never describe 99 as a published commercial limit.
 */
const HELLESYLT_CAPACITY: ProductCapacity = {
  minGuests: 1,
  maxGuestsPerBooking: 99,
  maxGuestsPerBookingSource: "preview_unapproved",
  supplierGroupSize: null,
  maxGuestsPerGuide: null,
};

/** Briksdal Glacier Discovery — Adult 12+, Child 3 to 11, Infant 0 to 2 (free). */
const BRIKSDAL_AGE_BANDS: readonly AgeBand[] = [
  { id: "adult", label: "Adults (12+)", minAge: 12, maxAge: null, pricingStatus: "priced" },
  { id: "child", label: "Children (3 to 11)", minAge: 3, maxAge: 11, pricingStatus: "priced" },
  { id: "infant", label: "Infants (0 to 2)", minAge: 0, maxAge: 2, pricingStatus: "priced" },
];

function adultChildEur(adultAmount: number, childAmount: number, infantAmount: number): ProductPricing {
  return {
    model: "adult_child",
    currency: "EUR",
    adultAmount,
    childAmount,
    childPricingStatus: "priced",
    infantAmount,
    infantPricingStatus: "priced",
    pricingNeedsConfirmation: false,
  };
}

const SHARED_PENDING = [
  "MAX_GUESTS_PER_BOOKING = UNKNOWN (commercial). Technical online cap 99 with maxGuestsPerBookingSource=preview_unapproved only.",
  "Customer cancellation terms: OPEN FACT pending Graham approval (do not publish a free-cancel deadline until approved).",
  "Unable to confirm after payment: full refund to original payment method.",
  "Meeting: Hellesylt village near cruise pier or tender landing; exact tour ticket / meeting instructions sent separately after confirmation.",
  "Payment received ≠ excursion confirmed.",
  "Supplier routingStatus=preview_placeholder until fulfilment is known (blocks live Checkout).",
  "Supplier costs, cancellation deadline, child-seat rules: UNKNOWN (do not invent).",
  "LIVE_PAYMENTS_CODE_ENABLED false until Graham unlock (HELLESYLT_LIVE_UNLOCK).",
] as const;

/**
 * Cancellation copy for Hellesylt H-1.
 * Do not invent a 48-hour customer cancellation deadline.
 */
export const HELLESYLT_CANCELLATION_COPY = {
  customerCancellation:
    "Customer cancellation terms are pending Graham approval and are not yet published. If we are unable to confirm your excursion after payment, you will receive a full refund to your original payment method.",
  unableToConfirm:
    "If we are unable to confirm your excursion after payment, you will receive a full refund to your original payment method.",
  paymentNotConfirmation:
    "After payment, we'll arrange your excursion and send your confirmation as soon as it is confirmed. Payment does not mean the excursion is confirmed yet.",
  /** Automated confirmation only — supplier tour ticket (joining document) is sent manually. */
  meetingInstructions:
    "Your tour ticket, including your meeting instructions, will be sent separately.",
} as const;

const BRIKSDAL: BookableProductConfig = {
  id: "briksdal-glacier-discovery",
  destinationId: hellesyltBookingCore.id,
  slug: "briksdal-glacier-discovery",
  name: "Briksdal Glacier Discovery",
  durationLabel: "Approx. 6 hours 30 minutes",
  bookingMode: "request",
  availability: "live",
  bookingPath: "/book/briksdal-glacier-discovery",
  receivedPath: "/book/briksdal-glacier-discovery/received",
  confirmedPath: "/book/briksdal-glacier-discovery/received",
  productPath: "/excursions/briksdal-glacier-discovery",
  pricing: adultChildEur(169, 109, 0),
  ageBands: BRIKSDAL_AGE_BANDS,
  capacity: HELLESYLT_CAPACITY,
  requiredCustomerFields: ["name", "email", "phone"],
  supplier: OPERATIONS,
  paymentSettlement: REQUEST_SETTLEMENT,
  schedulePortSlug: "hellesylt",
  pendingCommercialRules: [
    ...SHARED_PENDING,
    "Adult EUR 169 (12+) · Child EUR 109 (3 to 11) · Infant EUR 0 (0 to 2) · require ≥1 adult",
    "Shared excursion · Meeting: Hellesylt village near cruise pier or tender landing",
    "Duration: Approx. 6 hours 30 minutes",
  ],
  supplierReferenceNotes: [
    "INTERNAL ONLY — never publish to customers, emails, or public HTML",
    "fulfilment_mode=UNKNOWN pending Graham",
    "supplier_costs=UNKNOWN (do not invent adult_cost / child_cost / margins)",
    "routingStatus=preview_placeholder until fulfilment partner confirmed",
    "Selling: Adult EUR 169 · Child EUR 109 · Infant EUR 0",
    "Customer cancellation deadline: UNKNOWN pending Graham approval",
    "Unable to confirm after payment: full refund to original payment method",
    "MAX_GUESTS_PER_BOOKING commercial = UNKNOWN; technical maxGuestsPerBooking=99 preview_unapproved only",
  ],
};

export const HELLESYLT_BOOKING_PRODUCTS: readonly BookableProductConfig[] = [BRIKSDAL];

export function findHellesyltBookingProduct(productId: string): BookableProductConfig | undefined {
  return HELLESYLT_BOOKING_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
}
