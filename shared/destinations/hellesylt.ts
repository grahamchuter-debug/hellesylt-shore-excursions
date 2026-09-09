/**
 * Hellesylt destination booking core.
 * Product catalogue: shared/destinations/hellesylt-products.ts
 * Public editorial tours: Next.js excursion pages under /excursions/*
 * Internal supply mapping: product.supplierReferenceNotes (never public)
 */
import type { DestinationBookingCore } from "../world-booking/types";

export const hellesyltBookingCore = {
  id: "hellesylt",
  siteName: "Hellesylt Shore Excursions",
  siteHostname: "hellesyltshoreexcursions.com",
  siteUrl: "https://hellesyltshoreexcursions.com",
  bookingEmail: "hello@hellesyltshoreexcursions.com",
  originatingSite: "hellesyltshoreexcursions.com",
  originatingPort: "Hellesylt, Norway",
  bookingRefPrefix: "W2HSY",
  sessionKeyPrefix: "w2-hsy-booking",
  sessionKeyVersion: 1,
  currencyCode: "EUR",
  bookableWindow: {
    start: "2026-04-01",
    end: "2028-09-30",
  },
  /** Cruise schedules available via Hellesylt port slug; date/ship still customer-entered at checkout. */
  schedulePortSlug: "hellesylt",
  customShipSlug: "not-listed",
  contactPath: "/contact",
  termsPath: "/terms",
  privacyPath: "/privacy",
} as const satisfies DestinationBookingCore;
