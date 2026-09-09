/**
 * Public commercial config for Hellesylt Shore Excursions.
 * INTERNAL supplier costs / fulfilment notes must never be rendered here.
 *
 * Gate values:
 * - PRODUCTION_READY_LOCKED — journey visible; checkout disabled (default for
 *   production `npm run build`)
 * - BOOKING_ENABLED — checkout allowed in the UI only when an explicit UI mode
 *   AND a matching API target are both valid
 *
 * TEST unlock (explicit, build-time):
 *   NEXT_PUBLIC_HELLESYLT_BOOKING_UI=test
 *   NEXT_PUBLIC_HELLESYLT_TEST_BOOKINGS_API_URL=<isolated TEST Worker origin>
 *   → targets only the injected TEST Worker URL (see package.json *:booking-test)
 *
 * Production unlock (explicit; persist on Cloudflare Pages Production):
 *   NEXT_PUBLIC_HELLESYLT_BOOKING_UI=live
 *   NEXT_PUBLIC_HELLESYLT_BOOKINGS_API_URL=<production Worker origin>
 *   → fails closed if the production URL is missing or points at TEST
 *
 * Without those envs, status stays locked and getHellesyltBookingsApiUrl()
 * returns null (never a TEST Worker).
 * The TEST Worker origin is never hardcoded in this module so default/live
 * client bundles cannot embed it.
 */

import { HELLESYLT_CANCELLATION_COPY } from "../../../shared/destinations/hellesylt-products";

export type HellesyltPublicBookingStatus =
  | "PRODUCTION_READY_LOCKED"
  | "BOOKING_ENABLED";

/** Hard default — production static builds bake this in when env is unset. */
export const HELLESYLT_PUBLIC_BOOKING_STATUS_DEFAULT =
  "PRODUCTION_READY_LOCKED" as const satisfies HellesyltPublicBookingStatus;

/**
 * Isolated Cloudflare TEST booking Worker (H-2).
 * URL comes only from NEXT_PUBLIC_HELLESYLT_TEST_BOOKINGS_API_URL when UI=test.
 * Default/live builds omit that env so this constant stays empty and no TEST
 * origin string is present in the client source graph.
 */
export const HELLESYLT_TEST_BOOKINGS_API_URL =
  process.env.NEXT_PUBLIC_HELLESYLT_BOOKING_UI === "test"
    ? (process.env.NEXT_PUBLIC_HELLESYLT_TEST_BOOKINGS_API_URL ?? "")
        .trim()
        .replace(/\/$/, "")
    : "";

export type HellesyltBookingsApiTarget =
  | { mode: "test"; url: string }
  | { mode: "production"; url: string }
  | { mode: "locked"; url: null; reason: string };

type EnvLike = Record<string, string | undefined>;

function readEnv(env: EnvLike | undefined): EnvLike {
  if (env) return env;
  // NEXT_PUBLIC_* must be referenced as static process.env.KEY members so Next can
  // inline them into the client bundle. Casting process.env and reading dynamically
  // leaves the browser without values → PRODUCTION_READY_LOCKED after hydration.
  return {
    NEXT_PUBLIC_HELLESYLT_BOOKING_UI: process.env.NEXT_PUBLIC_HELLESYLT_BOOKING_UI,
    NEXT_PUBLIC_HELLESYLT_BOOKINGS_API_URL:
      process.env.NEXT_PUBLIC_HELLESYLT_BOOKINGS_API_URL,
    NEXT_PUBLIC_HELLESYLT_TEST_BOOKINGS_API_URL:
      process.env.NEXT_PUBLIC_HELLESYLT_TEST_BOOKINGS_API_URL,
  };
}

function isTestWorkerUrl(url: string): boolean {
  const normalized = url.trim().replace(/\/$/, "");
  if (HELLESYLT_TEST_BOOKINGS_API_URL && normalized === HELLESYLT_TEST_BOOKINGS_API_URL) {
    return true;
  }
  return /hellesylt-bookings-test/i.test(normalized);
}

/**
 * Explicit API target selection. Never falls back from production/live to TEST.
 */
export function resolveHellesyltBookingsApiTarget(env?: EnvLike): HellesyltBookingsApiTarget {
  const e = readEnv(env);
  const uiMode = (e.NEXT_PUBLIC_HELLESYLT_BOOKING_UI ?? "").trim();
  const prodUrl = (e.NEXT_PUBLIC_HELLESYLT_BOOKINGS_API_URL ?? "").trim().replace(/\/$/, "");

  if (uiMode === "test") {
    if (!HELLESYLT_TEST_BOOKINGS_API_URL) {
      return { mode: "locked", url: null, reason: "missing_test_api_url" };
    }
    return { mode: "test", url: HELLESYLT_TEST_BOOKINGS_API_URL };
  }

  if (uiMode === "live") {
    if (!prodUrl) {
      return { mode: "locked", url: null, reason: "missing_prod_api_url" };
    }
    if (isTestWorkerUrl(prodUrl)) {
      return { mode: "locked", url: null, reason: "test_url_not_allowed_for_live" };
    }
    return { mode: "production", url: prodUrl };
  }

  return { mode: "locked", url: null, reason: "production_ready_locked" };
}

export function isHellesyltBookingTestUiEnabled(env?: EnvLike): boolean {
  return (readEnv(env).NEXT_PUBLIC_HELLESYLT_BOOKING_UI ?? "").trim() === "test";
}

export function resolveHellesyltPublicBookingStatus(env?: EnvLike): HellesyltPublicBookingStatus {
  const target = resolveHellesyltBookingsApiTarget(env);
  return target.mode === "locked" ? HELLESYLT_PUBLIC_BOOKING_STATUS_DEFAULT : "BOOKING_ENABLED";
}

export function getHellesyltBookingsApiUrl(env?: EnvLike): string | null {
  return resolveHellesyltBookingsApiTarget(env).url;
}

export const hellesyltCommercialConfig = {
  get bookingsApiUrl(): string | null {
    return getHellesyltBookingsApiUrl();
  },
  email: "hello@hellesyltshoreexcursions.com",
  siteName: "Hellesylt Shore Excursions",
  get defaultPublicBookingStatus(): HellesyltPublicBookingStatus {
    return resolveHellesyltPublicBookingStatus();
  },
  /** Public cancellation: free up to 7 days before excursion. */
  cancellation: HELLESYLT_CANCELLATION_COPY.customerCancellation,
  paymentNotConfirmation: HELLESYLT_CANCELLATION_COPY.paymentNotConfirmation,
  unableToConfirm: HELLESYLT_CANCELLATION_COPY.unableToConfirm,
  meetingInstructions: HELLESYLT_CANCELLATION_COPY.meetingInstructions,
  overMaxGuidance: HELLESYLT_CANCELLATION_COPY.overMaxGuidance,
  products: {
    "briksdal-glacier-discovery": {
      productId: "briksdal-glacier-discovery",
      slug: "briksdal-glacier-discovery",
      name: "Briksdal Glacier Discovery",
      productPath: "/excursions/briksdal-glacier-discovery",
      bookingPath: "/book/briksdal-glacier-discovery",
      receivedPath: "/book/briksdal-glacier-discovery/received",
      adultEur: 169,
      childEur: 109,
      infantEur: 0,
      durationLabel: "Approx. 6 hours 30 minutes",
      maxGuests: 45,
      maxGuestsStatus: "approved" as const,
      requiresHikingAck: true,
      get publicBookingStatus(): HellesyltPublicBookingStatus {
        return resolveHellesyltPublicBookingStatus();
      },
      displayPrice: "Adult 12+ €169 · Child 3 to 11 €109 · Infant 0 to 2 FREE",
    },
  },
} as const;

export function isPublicBookingEnabled(
  status: HellesyltPublicBookingStatus = resolveHellesyltPublicBookingStatus(),
): boolean {
  return status === "BOOKING_ENABLED";
}
