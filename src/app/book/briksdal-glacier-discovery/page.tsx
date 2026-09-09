import type { Metadata } from "next";
import Link from "next/link";

import { BriksdalDiscoveryBookingForm } from "@/components/booking/briksdal-discovery-booking-form";
import { ContentPage } from "@/components/content-page";
import { isHellesyltBookingTestUiEnabled } from "@/lib/booking/commercial-config";
import { imageAlts, siteImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Request Briksdal Glacier Discovery",
    description:
      "Request the Briksdal Glacier Discovery shore excursion from Hellesylt. Adult €169, child €109, infant free.",
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
      title="Request Briksdal Glacier Discovery"
      lead="Guided glacier discovery from Hellesylt. Adult €169 · Child €109 · Infant FREE. Payment takes your request. Confirmation follows separately."
      heroImage={siteImages.briksdalTour}
      heroImageAlt={imageAlts.briksdalTourCard}
      pagePath="/book/briksdal-glacier-discovery"
      pageDescription="Request Briksdal Glacier Discovery from Hellesylt cruise port."
      breadcrumbs={[
        { label: "Home", href: "/" },
        {
          label: "Briksdal Glacier Discovery",
          href: "/excursions/briksdal-glacier-discovery",
        },
        { label: "Request" },
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
      <section className="space-y-4">
        {testUi ? (
          <p className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
            <strong>TEST booking journey.</strong> Checkout uses the isolated TEST
            Worker only. Normal production builds stay locked.
          </p>
        ) : null}
        <p>
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
