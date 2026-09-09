/**
 * Belize destination fixtures — REGRESSION REFERENCE ONLY.
 *
 * Copied from Belize-Shore-Excursion for cross-destination isolation tests.
 * MUST NOT be imported by Olden Worker routes (checkout / notify / operator).
 * Hellesylt Worker product authority remains findHellesyltBookingProduct only.
 */
export { belizeBookingCore } from "./belize";
export {
  BELIZE_BOOKING_PRODUCTS,
  BELIZE_CANCELLATION_COPY,
  findBelizeBookingProduct,
} from "./belize-products";
