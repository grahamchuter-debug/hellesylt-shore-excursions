import type { Metadata } from "next";
import Link from "next/link";

import { BriksdalDiscoveryBookingForm } from "@/components/booking/briksdal-discovery-booking-form";
import { ContentPage } from "@/components/content-page";
import { isHellesyltBookingTestUiEnabled } from "@/lib/booking/commercial-config";
import { imageAlts, siteImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Book Briksdal Glacier Discovery",
    description:
      "Book the Briksdal Glacier Discovery shore excursion from Hellesylt. Adult €169, child €109, infant free.",
    path: "/book/briksdal-glacier-discovery",
    ogImage: siteImages.briksdalTour,
    ogImageAlt: imageAlts.briksdalTourCard,
  }),
  robots: { index: false, follow: true },
};

export default function BriksdalDiscoveryBookPage() {
  const testUi = isHellesyltBookingTestUiEnabled();

  return (
    <ContentPage
      title="Book Briksdal Glacier Discovery"
      lead="Experience one of Norway's most spectacular natural sights on a memorable journey from Hellesylt."
      heroImage={siteImages.briksdalTour}
      heroImageAlt={imageAlts.briksdalTourCard}
      pagePath="/book/briksdal-glacier-discovery"
      pageDescription="Book Briksdal Glacier Discovery from Hellesylt cruise port."
      breadcrumbs={[
        { label: "Home", href: "/" },
        {
          label: "Briksdal Glacier Discovery",
          href: "/excursions/briksdal-glacier-discovery",
        },
        { label: "Book" },
      ]}
      showShipReassurance={false}
      relatedLinks={[
        {
          label: "Excursion notes",
          href: "/excursions/briksdal-glacier-discovery",
        },
        { label: "Contact", href: "/contact" },
        { label: "Terms", href: "/terms" },
      ]}
    >
      <section className="space-y-5">
        <p className="text-lg font-semibold text-slate-900 sm:text-xl">
          Adult €169 · Child €109 · Infant FREE
        </p>

        <aside
          aria-labelledby="book-with-confidence-heading"
          className="rounded-xl border border-slate-200 border-t-2 border-t-[var(--norway-blue)] bg-white px-5 py-5 shadow-sm"
        >
          <h2
            id="book-with-confidence-heading"
            className="text-lg font-bold text-slate-900 sm:text-xl"
          >
            Book with confidence
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Secure your booking request with payment today. We&apos;ll confirm your
            excursion separately, and if we&apos;re unable to confirm it, you&apos;ll
            receive a full refund.
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Free cancellation up to 7 days before your excursion.
          </p>
        </aside>

        {testUi ? (
          <p className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
            <strong>TEST booking journey.</strong> Checkout uses the isolated TEST
            Worker only. Normal production builds stay locked.
          </p>
        ) : null}

        <p className="text-sm leading-7 text-slate-600">
          Before you continue, please read the activity notes on the{" "}
          <Link
            href="/excursions/briksdal-glacier-discovery"
            className="content-link"
          >
            excursion page
          </Link>
          : difficult activity level with hiking required at the glacier.
        </p>
      </section>
      <BriksdalDiscoveryBookingForm />
    </ContentPage>
  );
}
