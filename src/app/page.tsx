import type { Metadata } from "next";
import Link from "next/link";

import { CruisePortDayPlanner } from "@/components/cruise-port-day-planner";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { TourCard } from "@/components/tour-card";
import {
  hellesyltScheduleIntegrity,
  formatScheduleDate,
} from "@/lib/hellesylt-schedules";
import { hellesyltTourCards, hellesyltTourListItems } from "@/lib/hellesylt-tours";
import { siteConfig } from "@/lib/site-config";
import { imageAlts, siteImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  buildFaqSchema,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/lib/site-schema";

const pageMeta = {
  title:
    "Hellesylt Shore Excursions | Village, Mount Stranda & Cruise Port Guides",
  description:
    "Plan your Hellesylt cruise port day with village and waterfall time, Mount Stranda panoramas, Briksdal Glacier outings, port guides, and return-to-ship friendly shore excursion advice.",
  path: "/",
} as const;

export const metadata: Metadata = buildPageMetadata({
  ...pageMeta,
  ogImage: siteImages.hero,
  ogImageAlt: imageAlts.hero,
  absoluteTitle: true,
});

const homeFaqs = [
  {
    question: "Is this site for cruise passengers calling at Hellesylt?",
    answer:
      "Yes. This is an independent Hellesylt cruise-port planning site. It helps you choose between village and waterfall time, Mount Stranda, Briksdal Glacier, or a longer private day already listed here, check published ship calls, and leave a return buffer. Confirm final timings with your cruise line.",
  },
  {
    question: "Should I stay in the village, go to Mount Stranda, or head to Briksdal?",
    answer:
      "Stay in the village on a short call. Mount Stranda suits a few hours when gondola and viewpoints are your priority. Briksdal needs a longer confirmed window from Hellesylt. Pick one main outing unless tickets and timing are already confirmed.",
  },
  {
    question: "Can I do a Geiranger-area private day from Hellesylt?",
    answer:
      "A private panoramic Geiranger product is listed on this site for long days. Check your itinerary with the cruise line; this site does not invent reposition logistics between Hellesylt and Geiranger. Plan return to your embarkation point carefully.",
  },
  {
    question: "Can I book shore excursions on this site?",
    answer:
      "This site is for planning and discovery. There is no live booking checkout here. Use the excursion pages and guides to understand options, then arrange tours through operators or your usual booking channel.",
  },
] as const;

export default function Home() {
  const firstLabel = hellesyltScheduleIntegrity.firstDate
    ? formatScheduleDate(hellesyltScheduleIntegrity.firstDate)
    : "";
  const lastLabel = hellesyltScheduleIntegrity.lastDate
    ? formatScheduleDate(hellesyltScheduleIntegrity.lastDate)
    : "";
  const featured = hellesyltTourCards.slice(0, 3);
  const remaining = hellesyltTourCards.slice(3);

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
      <main>
        <PageHero
          image={siteImages.hero}
          imageAlt={imageAlts.hero}
          className="min-h-[28rem] md:min-h-[32rem]"
        >
          <p className="hero-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.2em]">
            {siteConfig.name}
          </p>
          <h1 className="font-display mb-5 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Your ship is in Hellesylt. Village, Mount Stranda, or Briksdal?
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            Waterfall slate, fjord walls and mountain light. Choose one main
            direction, then keep time to get back to the pier.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/excursions"
              className="btn-primary w-full justify-center sm:w-auto"
            >
              Explore Hellesylt excursions
            </Link>
            <Link
              href="/ship-schedule"
              className="btn-secondary w-full justify-center sm:w-auto"
            >
              Check your ship schedule
            </Link>
          </div>
        </PageHero>

        <section className="border-b border-[var(--border-light)] bg-[var(--surface)] py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">Three Hellesylt days</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Village focus, Mount Stranda, or Briksdal
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              The inventory on this site already splits that way, with private
              options when you want more pace control. No extra decision URL. Use
              the one-day guide for hours, not as proof that every stop will
              combine.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Village and waterfall
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Compact harbour walks and Hellesyltfossen when hours ashore are
                  short. Stay close to the pier and keep your return buffer.
                </p>
                <Link
                  href="/hellesylt-port-guide"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
                >
                  Hellesylt port guide
                </Link>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Mount Stranda
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Gondola and panoramic viewpoints when a few hours are confirmed.
                  Still one main outing, not a guarantee that every stop will fit.
                </p>
                <Link
                  href="/excursions/mount-stranda-panoramic-views"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
                >
                  Mount Stranda panoramic views
                </Link>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Briksdal Glacier
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Longer day from Hellesylt when mountain roads and glacier walking
                  are the priority. Confirm the day&apos;s operation with the
                  operator.
                </p>
                <Link
                  href="/excursions/briksdal-glacier-discovery"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
                >
                  Briksdal Glacier Discovery
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--border-light)] bg-surface-muted py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">Find your ship</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Check when your ship is in Hellesylt
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              {hellesyltScheduleIntegrity.total} published Hellesylt calls from{" "}
              {firstLabel} to {lastLabel}. Arrival and departure times shape
              what is realistic ashore. Always confirm with your cruise line.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ship-schedule" className="btn-outline-dark">
                Open Hellesylt ship schedule
              </Link>
              <Link
                href="/one-day-in-hellesylt"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
              >
                Then plan your hours
              </Link>
            </div>
          </div>
        </section>

        <section id="tours" className="scroll-mt-24 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">Excursion options</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Experiences already on this site
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              No invented products or prices. Durations are approximate. Keep a
              return buffer. This site does not sell tickets.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featured.map((tour) => (
                <TourCard key={tour.href} {...tour} />
              ))}
            </div>
            {remaining.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remaining.map((tour) => (
                  <TourCard key={tour.href} {...tour} />
                ))}
              </div>
            ) : null}
            <p className="mt-8">
              <Link
                href="/excursions"
                className="text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
              >
                Compare all Hellesylt excursions
              </Link>
            </p>
          </div>
        </section>

        <section className="border-y border-[var(--border-light)] bg-[var(--surface)] py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">Optional longer private day</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Geiranger-area outing needs careful planning
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              A private panoramic Geiranger product exists in the inventory for
              long days. Check your itinerary with the cruise line; this site does
              not invent reposition logistics. Treat return to your embarkation
              point as part of the plan, not an assumption.
            </p>
            <Link
              href="/excursions/private-panoramic-geiranger-lunch"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
            >
              Private panoramic Geiranger notes
            </Link>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">First time in Hellesylt</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Useful planning guides
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/hellesylt-port-guide",
                  title: "Cruise port guide",
                  text: "Village layout from the pier toward Mount Stranda and Briksdal outings.",
                },
                {
                  href: "/one-day-in-hellesylt",
                  title: "One day in Hellesylt",
                  text: "Sample shapes for short, classic and longer port calls.",
                },
                {
                  href: "/is-hellesylt-worth-visiting",
                  title: "Is Hellesylt worth visiting?",
                  text: "Honest context if you are deciding how to spend hours ashore.",
                },
                {
                  href: "/best-time-to-visit-hellesylt",
                  title: "Best time to visit",
                  text: "Seasonal context for cruise months already published here.",
                },
              ].map((item) => (
                <li
                  key={item.href}
                  className="border-t border-[var(--border-light)] pt-5"
                >
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    <Link
                      href={item.href}
                      className="underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="planner"
          className="scroll-mt-24 border-y border-[var(--border-light)] bg-surface-muted py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">Port-day planning</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Think in hours, spray and return buffer
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Use published times as a planning start. This planner helps you
              think through the day. It does not invent gondola hours or glacier
              path conditions.
            </p>
            <div className="mt-8">
              <CruisePortDayPlanner />
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="section-eyebrow">Norway beyond Hellesylt</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Planning other Norwegian ports?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              For multi-port itineraries, the national planning site covers the
              wider Norway cruise picture.
            </p>
            <a
              href={siteConfig.nationalAuthorityUrl}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--fjord)] underline-offset-4 hover:underline"
            >
              Norway Shore Excursions
            </a>
          </div>
        </section>

        <section className="border-y border-[var(--border-light)] bg-[var(--surface)] py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="section-eyebrow">FAQ</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Hellesylt cruise questions
            </h2>
            <dl className="mt-8 space-y-6">
              {homeFaqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-navy py-14 text-white sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Hellesylt planning concierge
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              {siteConfig.contactEmailVerified
                ? `Questions about shaping a Hellesylt port day? Email ${siteConfig.contactEmail}.`
                : "A destination email is being prepared. Until then, use the schedule, one-day guide and excursion pages on this site."}
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Contact
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
