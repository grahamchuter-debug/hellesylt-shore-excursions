import type { BookingMode } from "./types";

/** Destination-neutral request-to-book copy. Do not name suppliers publicly. */
export const REQUEST_COPY = {
  primaryCta: "Book this excursion",
  bookingEngineHeading: "Book your excursion",
  supporting:
    "Choose your cruise date and complete payment to send your booking request. We'll confirm your excursion separately by email.",
  reviewHeading: "Review your booking",
  payCtaPrefix: "Pay",
  payCtaSuffix: "& request booking",
  guestsHeading: "How many people are travelling?",
  flatGuestNote: "Same price per guest for this excursion.",
  groupOverMaxTitle: (maxGuests: number) => `Travelling with more than ${maxGuests} guests?`,
  groupOverMaxBody: "Ask us about a larger group and we'll help arrange the best option.",
  groupOverMaxCta: "Ask us about this excursion",
  subjectToConfirmationTitle: "Book with confidence",
  subjectToConfirmationParagraphs: [
    "Secure your booking request with payment today. We'll confirm your excursion separately by email.",
    "Your booking is only confirmed when you receive our confirmation email.",
    "If we're unable to confirm your excursion, you'll receive a full refund.",
  ],
  consentLabel:
    "I understand that payment secures my booking request and does not confirm the excursion. Confirmation will be emailed separately when my places are confirmed. If the excursion cannot be confirmed, the amount paid will be refunded in full to my original payment method.",
  receivedHeadline: "Booking request received",
  receivedBody:
    "Thank you. We've received your payment and booking request. We'll confirm your excursion separately by email.",
  paymentSuccessfulLabel: "Payment successful",
  awaitingConfirmationLabel: "Awaiting confirmation",
  preparingHeadline: "Payment received, preparing your booking request",
  preparingBody:
    "We're confirming your payment with our payment provider. This page will update when your booking request is ready. Your excursion is not confirmed yet.",
  nextSteps:
    "We'll confirm your excursion and email you with the next steps. Keep your booking reference if you need to get in touch.",
  childPricingNote:
    "Child and infant prices are not confirmed for this excursion yet. You can include them in your booking request; they are not charged at the adult rate. We'll confirm any child or infant rate before taking extra payment.",
} as const;

export const INSTANT_COPY = {
  primaryCta: "Book now",
  supporting: "Choose your cruise date and complete booking.",
  receivedHeadline: "Booking confirmed",
} as const;

export const ENQUIRE_COPY = {
  primaryCta: "Ask us about this excursion",
  supporting: "Tell us your cruise date and we'll help you plan.",
} as const;

export function primaryCtaLabel(mode: BookingMode): string {
  if (mode === "instant") return INSTANT_COPY.primaryCta;
  if (mode === "request") return REQUEST_COPY.primaryCta;
  return ENQUIRE_COPY.primaryCta;
}

export function payAndRequestCtaLabel(amountLabel: string): string {
  return `${REQUEST_COPY.payCtaPrefix} ${amountLabel} ${REQUEST_COPY.payCtaSuffix}`;
}

export const CUSTOMER_EMAIL = {
  requestedSubject: "We've received your excursion request",
  confirmedSubject: "Your excursion is confirmed",
  declinedSubject: "Update on your excursion request",
} as const;
