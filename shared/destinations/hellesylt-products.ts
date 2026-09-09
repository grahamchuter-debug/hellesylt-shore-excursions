import { hellesyltBookingCore } from "./hellesylt";
import type { AgeBand, BookableProductConfig, ProductCapacity, ProductPricing } from "../world-booking/types";

/**
 * Operational routing: Wow A Tour ops mailbox for Graham’s manual fulfilment.
 * Customer Reply-To stays hello@hellesyltshoreexcursions.com (EMAIL_REPLY_TO / bookingEmail).
 * Public customers never see supplier costs or margins.
 * Fulfilment: DIRECT_SUPPLIER_MANUAL (same operational model as Olden).
 */
const OPERATIONS = {
  id: "hellesylt-shore-ops",
  displayName: "Hellesylt Shore Excursions Operations",
  notificationEmail: "info@wowatour.com",
  routingStatus: "production_ready" as const,
};

const REQUEST_SETTLEMENT = "charge_refund" as const;

/** Graham online max — never describe as supplier / vehicle / coach capacity. */
const HELLESYLT_CAPACITY: ProductCapacity = {
  minGuests: 1,
  maxGuestsPerBooking: 45,
  maxGuestsPerBookingSource: "approved",
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
  "Customer cancellation APPROVED: free up to 7 days before excursion. Inside-7-day customer cancel semantics not authored beyond that (do not invent).",
  "Unable to confirm after payment: full refund to original payment method.",
  "Meeting: Hellesylt village near cruise pier or tender landing; exact tour ticket / meeting instructions sent separately after confirmation.",
  "Fulfilment: DIRECT_SUPPLIER_MANUAL — ops manually checks/secures supplier; operator CONFIRM; customer confirmation email; supplier ticket sent manually.",
  "Payment received ≠ excursion confirmed.",
  "Online max 45 guests per booking (Graham online limit — not supplier capacity).",
  "LIVE_PAYMENTS_CODE_ENABLED false until Graham unlock (HELLESYLT_LIVE_UNLOCK).",
] as const;

/**
 * Cancellation copy for Hellesylt.
 * Authoritative free window: 7 days. Do not invent inside-window non-refund rules.
 * Do not copy Olden 48-hour terms.
 */
export const HELLESYLT_CANCELLATION_COPY = {
  customerCancellation:
    "Free cancellation up to 7 days before your excursion. If we are unable to confirm your excursion after payment, you will receive a full refund to your original payment method.",
  freeWindow: "Free cancellation up to 7 days before your excursion.",
  unableToConfirm:
    "If we are unable to confirm your excursion after payment, you will receive a full refund to your original payment method.",
  paymentNotConfirmation:
    "After payment, we'll arrange your excursion and send your confirmation as soon as it is confirmed. Payment does not mean the excursion is confirmed yet.",
  /** Automated confirmation only — supplier tour ticket (joining document) is sent manually. */
  meetingInstructions:
    "Your tour ticket, including your meeting instructions, will be sent separately.",
  overMaxGuidance: "For groups larger than 45, email hello@hellesyltshoreexcursions.com before requesting.",
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
    "fulfilment_mode=DIRECT_SUPPLIER_MANUAL",
    "supplier_costs=UNKNOWN (do not invent adult_cost / child_cost / margins)",
    "routingStatus=production_ready · ops mailbox info@wowatour.com",
    "Selling: Adult EUR 169 · Child EUR 109 · Infant EUR 0",
    "Customer cancellation: Free cancellation up to 7 days before your excursion.",
    "Unable to confirm after payment: full refund to original payment method",
    "MAX_GUESTS_PER_BOOKING=45 (Graham online limit — not supplier capacity)",
  ],
};

export const HELLESYLT_BOOKING_PRODUCTS: readonly BookableProductConfig[] = [BRIKSDAL];

export function findHellesyltBookingProduct(productId: string): BookableProductConfig | undefined {
  return HELLESYLT_BOOKING_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
}
