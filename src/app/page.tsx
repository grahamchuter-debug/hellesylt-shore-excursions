import type { Metadata } from "next";
import Link from "next/link";

import { CruisePortDayPlanner } from "@/components/cruise-port-day-planner";
import {
  ExploreNorwegianPorts,
  explorePortsFromHellesylt,
} from "@/components/explore-norwegian-ports";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PlannerInterestGroups } from "@/components/planner-interest-groups";
import { TourCard } from "@/components/tour-card";
import {
  hellesyltTourCards,
  hellesyltTourListItems,
} from "@/lib/hellesylt-tours";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  buildFaqSchema,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/lib/site-schema";
import { imageAlts, siteImages } from "@/lib/site-images";
import { siteConfig } from "@/lib/site-config";

const pageMeta = {
  title:
    "Hellesylt Shore Excursions | Fjord Gateway Tours & Cruise Port Guides",
  description:
    "Plan your Hellesylt cruise port day with Mount Stranda tours, Briksdal Glacier excursions, Geiranger viewpoints, port guides, and return-to-ship friendly shore excursion advice.",
  path: "/",
} as const;

export const metadata: Metadata = buildPageMetadata({
  ...pageMeta,
  ogImage: siteImages.hero,
  ogImageAlt: imageAlts.hero,
  absoluteTitle: true,
});

const trustBadges = [
  { label: "Return to ship on time", accent: true },
  { label: "Gateway to Geiranger", accent: false },
  { label: "Fjord and glacier scenery", accent: false },
] as const;

const homeFaqs = [
  {
    question: "Is Hellesylt worth visiting from a cruise ship?",
    answer:
      "Yes, Hellesylt is a scenic fjord gateway with a famous waterfall, compact village charm, and access to Mount Stranda, Briksdal Glacier, and Geiranger viewpoints. Many cruises stop briefly here before continuing to Geirangerfjord.",
  },
  {
    question: "How long should I spend in Hellesylt?",
    answer:
      "Under three hours suits village and waterfall time only. Three to four hours fits Mount Stranda panoramic tours. Six to eight hours unlocks Briksdal Glacier. Eight or more hours enables private full-day scenery and Geiranger panorama routes.",
  },
  {
    question: "Can I visit Briksdal Glacier from Hellesylt cruise port?",
    answer:
      "Yes. Briksdal Glacier Discovery tours depart from Hellesylt and include Hornindal Lake, Nordfjord scenery, and glacier hiking. Allow at least six hours ashore for this experience.",
  },
  {
    question: "What is the best Hellesylt shore excursion?",
    answer:
      "Journey to Mount Stranda and Panoramic Views is the headline choice for first-time visitors with three to four hours. For glacier lovers with six or more hours, Briksdal Glacier Discovery is the major full-day option.",
  },
  {
    question: "Is Hellesylt walkable from the cruise port?",
    answer:
      "Yes. Hellesylt village is compact and the waterfall is within walking distance of most piers and tender landings. Excursion meeting points are typically minutes from where you come ashore.",
  },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            path: pageMeta.path,
            title: pageMeta.title,
            description: pageMeta.description,
          }),
          buildItemListSchema(hellesyltTourListItems),
          buildFaqSchema(homeFaqs),
        ]}
      />
      <main className="min-h-screen bg-white text-slate-900">
        <PageHero
          image={siteImages.hero}
          imageAlt={imageAlts.hero}
          centered
          compact
          overlay="light"
          className="min-h-[25rem] md:min-h-[31rem] lg:min-h-[34rem]"
        >
          <h1 className="mb-3 text-2xl font-bold text-white sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl">
            Hellesylt Shore Excursions
          </h1>

          <p className="mx-auto mb-5 max-w-3xl text-sm text-white/95 sm:mb-7 sm:text-lg md:text-xl">
            Explore Mount Stranda, Briksdal Glacier, Geiranger viewpoints,
            mountain valleys and waterfall scenery with cruise-friendly shore
            excursions from Hellesylt.
          </p>

          <a
            href="#tours"
            className="btn-primary px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base"
          >
            View Excursions
          </a>

          <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3">
            {trustBadges.map((badge) => (
              <li
                key={badge.label}
                className={`rounded-full px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm sm:px-4 sm:text-sm ${
                  badge.accent
                    ? "badge-accent-red"
                    : "border border-white/25 bg-white/10"
                }`}
              >
                {badge.label}
              </li>
            ))}
          </ul>
        </PageHero>

        <section id="tours" className="border-t bg-surface-muted">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="mb-2 text-3xl font-bold sm:mb-3 sm:text-4xl">
              Popular Hellesylt Tours
            </h2>
            <p className="mb-4 max-w-2xl text-slate-600">
              Cruise-friendly excursions that depart near Hellesylt village and
              fit typical port-day schedules, from short waterfall calls to
              full-day glacier and Geiranger routes.
            </p>
            <p className="mb-8 max-w-2xl rounded-lg border border-slate-200 border-l-[3px] border-l-[var(--norway-red)] bg-white px-4 py-3 text-sm leading-6 text-slate-700">
              Every excursion featured is selected to fit comfortably within a
              typical Hellesylt cruise port call, including short technical
              stops before Geiranger.
            </p>

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
            <p className="mt-8">
              <Link
                href="/excursions"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-[var(--norway-blue)] hover:text-[var(--norway-blue)]"
              >
                View all Hellesylt excursions
              </Link>
            </p>
          </div>
        </section>

        <section id="why-hellesylt" className="border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Why Hellesylt Is Ideal for Cruise Shore Excursions
            </h2>
            <p className="text-base leading-8 text-slate-700 sm:text-lg">
              Hellesylt sits at the head of Sunnylvsfjord, the gateway to
              Geirangerfjord. Cruise passengers arrive at a waterfall-led
              village, then reach Mount Stranda gondola viewpoints, Briksdal
              Glacier, and Geiranger panorama routes on shore excursions timed
              for return-to-ship schedules.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-base leading-8 text-slate-700">
              <li>
                Famous Hellesylt waterfall and compact village within walking
                distance of the port
              </li>
              <li>
                Mount Stranda gondola with Sunnmøre Alps and Storfjord panoramas
              </li>
              <li>
                Briksdal Glacier access via Hornindal Lake and Nordfjord scenery
              </li>
              <li>
                Private Geiranger panorama routes with Mount Dalsnibba Sky Walk
              </li>
              <li>
                Cruise-friendly excursion meeting points minutes from pier or
                tender landing
              </li>
              <li>
                Match excursions to your actual hours ashore with our Cruise
                Smart Planner
              </li>
            </ul>
          </div>
        </section>

        <section id="planner" className="border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <CruisePortDayPlanner />
            <PlannerInterestGroups />
          </div>
        </section>

        <ExploreNorwegianPorts
          config={explorePortsFromHellesylt}
          variant="compact"
        />

        <section id="faqs" className="border-t bg-surface-muted">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
              Hellesylt cruise passenger FAQs
            </h2>
            <dl className="space-y-6">
              {homeFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-slate-200 border-l-[3px] border-l-[var(--norway-blue)] bg-white p-5 shadow-sm"
                >
                  <dt className="font-semibold text-slate-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 leading-7 text-slate-700">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t bg-navy text-white">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Plan your Hellesylt port day with confidence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Browse shore excursions, read the port guide, and use the Cruise
              Smart Planner, everything built for cruise passengers who need to
              return on time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={siteConfig.shoreExcursionsPath}
                className="btn-primary sm:text-base"
              >
                Book a Tour
              </Link>
              <Link
                href="/hellesylt-port-guide"
                className="btn-secondary sm:text-base"
              >
                Hellesylt Port Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
