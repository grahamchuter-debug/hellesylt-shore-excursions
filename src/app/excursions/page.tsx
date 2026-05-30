import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { JsonLd } from "@/components/json-ld";
import { TourCard } from "@/components/tour-card";
import {
  hellesyltTourCards,
  hellesyltTourListItems,
} from "@/lib/hellesylt-tours";
import { buildPageMetadata } from "@/lib/site-metadata";
import { buildItemListSchema } from "@/lib/site-schema";
import { imageAlts, siteImages } from "@/lib/site-images";

const pageMeta = {
  title: "Hellesylt Excursions, All Shore Tours for Cruise Passengers",
  description:
    "Browse all Hellesylt shore excursions for cruise passengers: Mount Stranda panoramic tours, Briksdal Glacier discovery, private Geiranger routes, and fjord gateway sightseeing.",
  path: "/excursions",
  ogImage: siteImages.sunnylvsfjord,
  ogImageAlt: imageAlts.sunnylvsfjord,
} as const;

export const metadata: Metadata = buildPageMetadata(pageMeta);

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Excursions" },
] as const;

const relatedLinks = [
  { label: "Hellesylt port guide", href: "/hellesylt-port-guide" },
  { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
  {
    label: "Is Hellesylt worth visiting?",
    href: "/is-hellesylt-worth-visiting",
  },
] as const;

const faqs = [
  {
    question:
      "What is the best Hellesylt excursion for first-time cruise visitors?",
    answer:
      "Journey to Mount Stranda and Panoramic Views is the headline choice when you have three to four hours in port. For glacier lovers with six or more hours, Briksdal Glacier Discovery is the major full-day option.",
  },
  {
    question: "How do I choose between Hellesylt shore excursions?",
    answer:
      "Match the tour to your hours ashore: village and waterfall time suits under three hours; Mount Stranda tours suit 3 to 6 hours; Briksdal Glacier needs 6 to 8 hours; private full-day and Geiranger routes need 8+ hours. Use the Cruise Smart Planner on the homepage.",
  },
  {
    question: "Do all Hellesylt excursions depart near the cruise port?",
    answer:
      "Yes. Featured tours meet in Hellesylt village near the pier or tender landing, typically within a few minutes of where you come ashore.",
  },
] as const;

export default function ExcursionsIndexPage() {
  return (
    <>
      <JsonLd data={[buildItemListSchema(hellesyltTourListItems)]} />
      <ContentPage
        title="Hellesylt Excursions"
        lead="Every cruise-friendly shore excursion in Hellesylt, Mount Stranda gondola views, Briksdal Glacier, private Geiranger routes, and fjord gateway touring with return-to-ship timing in mind."
        heroImage={pageMeta.ogImage}
        heroImageAlt={pageMeta.ogImageAlt}
        pagePath={pageMeta.path}
        pageDescription={pageMeta.description}
        breadcrumbs={breadcrumbs}
        relatedLinks={relatedLinks}
        faqs={faqs}
        ctaTitle="Need help choosing a Hellesylt tour?"
        ctaText="Use the Cruise Smart Planner on the homepage to match tours to your ship's timetable."
        ctaHref="/#planner"
        ctaButtonLabel="Open Cruise Smart Planner"
        belowHero={
          <section className="border-b bg-surface-muted">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {hellesyltTourCards.map((tour) => (
                  <TourCard
                    key={tour.href}
                    href={tour.href}
                    image={tour.image}
                    imageAlt={tour.imageAlt}
                    title={tour.title}
                    description={tour.description}
                    badge={tour.badge}
                  />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <section>
          <h2>Compare Hellesylt shore excursions</h2>
          <p>
            Each tour below is designed for cruise passengers calling at
            Hellesylt. Mount Stranda tours fit shorter port windows; Briksdal
            Glacier and Geiranger panorama routes need the longest schedules.
            Private tours suit full-day port calls with flexible pacing.
          </p>
          <p>
            For port-day planning tools and tier-based recommendations, use the{" "}
            <Link href="/#planner">Cruise Smart Planner</Link> on the homepage.
          </p>
        </section>
      </ContentPage>
    </>
  );
}
