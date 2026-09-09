import type { Metadata } from "next";
import Link from "next/link";

import { BookingReferenceBanner } from "@/components/booking/booking-reference-banner";
import { ContentPage } from "@/components/content-page";
import { imageAlts, siteImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Booking request received, Briksdal Glacier Discovery",
    description:
      "We've received your payment and booking request for Briksdal Glacier Discovery. Confirmation follows separately by email.",
    path: "/book/briksdal-glacier-discovery/received",
    ogImage: siteImages.briksdalTour,
    ogImageAlt: imageAlts.briksdalTourCard,
  }),
  robots: { index: false, follow: false },
};

export default function BriksdalDiscoveryReceivedPage() {
  return (
    <ContentPage
      title="Booking request received"
      lead="Thank you. We've received your payment and booking request."
      heroImage={siteImages.briksdalTour}
      heroImageAlt={imageAlts.briksdalTourCard}
      pagePath="/book/briksdal-glacier-discovery/received"
      pageDescription="Briksdal Glacier Discovery booking request received."
      breadcrumbs={[
        { label: "Home", href: "/" },
        {
          label: "Briksdal Glacier Discovery",
          href: "/excursions/briksdal-glacier-discovery",
        },
        { label: "Booking request received" },
      ]}
      showShipReassurance={false}
      relatedLinks={[
        {
          label: "Excursion notes",
          href: "/excursions/briksdal-glacier-discovery",
        },
        { label: "Contact", href: "/contact" },
      ]}
    >
      <section className="space-y-5 leading-7">
        <BookingReferenceBanner />

        <div className="rounded-xl border border-slate-200 border-t-2 border-t-[var(--norway-blue)] bg-white px-5 py-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            What happens next?
          </h2>
          <p className="mt-2 text-slate-700">
            We&apos;ll now confirm your excursion. As soon as it&apos;s confirmed,
            we&apos;ll email you with the next steps.
          </p>
          <p className="mt-2 text-slate-700">
            If we&apos;re unable to confirm your excursion, you&apos;ll receive a
            full refund.
          </p>
        </div>

        <p className="text-sm text-slate-600">
          Your tour ticket, including your meeting instructions, will be sent
          separately once your excursion is confirmed.
        </p>

        <p>
          <Link href="/excursions/briksdal-glacier-discovery" className="content-link">
            Return to excursion notes
          </Link>
        </p>
      </section>
    </ContentPage>
  );
}
