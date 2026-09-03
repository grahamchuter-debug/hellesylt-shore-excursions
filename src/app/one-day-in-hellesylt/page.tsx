import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { imageAlts, siteImages } from "@/lib/site-images";

const pageMeta = {
  title: "One Day in Hellesylt for Cruise Passengers",
  description:
    "Sample one-day Hellesylt itineraries for cruise guests: short village calls, Mount Stranda half-day, Briksdal Glacier full port day, and private full-day scenery routes with return-to-ship timing.",
  path: "/one-day-in-hellesylt",
  ogImage: siteImages.oneDay,
  ogImageAlt: imageAlts.oneDay,
} as const;

export const metadata: Metadata = buildPageMetadata(pageMeta);

const relatedLinks = [
  { label: "Shore excursions", href: "/excursions" },
  { label: "Hellesylt port guide", href: "/hellesylt-port-guide" },
  {
    label: "Is Hellesylt worth visiting?",
    href: "/is-hellesylt-worth-visiting",
  },
] as const;

const faqs = [
  {
    question: "What can cruise passengers do in Hellesylt on a very short call?",
    answer:
      "Focus on Hellesylt village and waterfall time only. Avoid longer countryside tours unless your ship schedule clearly allows more than three hours ashore.",
  },
  {
    question: "Can I visit Briksdal Glacier and Mount Stranda in one Hellesylt day?",
    answer:
      "Only if your ship stays at least eight hours and you choose a carefully planned private itinerary. Most passengers pick one major experience per port day.",
  },
  {
    question: "Should I book Hellesylt excursions before my cruise arrives?",
    answer:
      "On peak summer days, arrange popular Mount Stranda and glacier tours early through your usual channel. This site does not invent sold-out status.",
  },
  {
    question: "How much buffer time should I leave before all aboard?",
    answer:
      "Aim to be at the pier or tender point 30 to 45 minutes before the published all-aboard time.",
  },
] as const;

export default function OneDayInHellesyltPage() {
  return (
    <ContentPage
      title="One Day in Hellesylt"
      lead="Practical sample itineraries for cruise passengers with short village calls, half-day Mount Stranda touring, full-day Briksdal Glacier experiences, and private full-day scenery routes with realistic return-to-ship timing."
      heroImage={pageMeta.ogImage}
      heroImageAlt={pageMeta.ogImageAlt}
      pagePath={pageMeta.path}
      pageDescription={pageMeta.description}
      relatedLinks={relatedLinks}
      faqs={faqs}
    >
      <section>
        <h2>Start with your ship&apos;s Hellesylt schedule</h2>
        <p>
          Every good Hellesylt day begins with your cruise line&apos;s arrival,
          departure, and all-aboard times. Subtract at least 45 minutes from
          your last possible departure to set a hard deadline. Check your
          itinerary with the cruise line for any later calls nearby; this site
          does not invent reposition logistics.
        </p>
      </section>

      <section>
        <h2>Very short call: village and waterfall</h2>
        <p>
          With under three hours ashore, stay in Hellesylt village. Walk to the
          waterfall, explore the harbour, and enjoy a coffee by the waterfront.
          Skip Mount Stranda, Briksdal Glacier, and Geiranger panorama routes.
        </p>
        <ul>
          <li>Disembark promptly and walk to the waterfall</li>
          <li>Short village loop and harbour photo stops</li>
          <li>Optional café stop near the waterfront</li>
          <li>Return to pier or tender 30 minutes before all aboard</li>
        </ul>
      </section>

      <section>
        <h2>Mount Stranda half-day</h2>
        <p>
          Three to four hours unlocks the headline panoramic experience. Choose
          the{" "}
          <Link href="/excursions/mount-stranda-panoramic-views">
            Journey to Mount Stranda and Panoramic Views
          </Link>{" "}
          or the{" "}
          <Link href="/excursions/private-mount-stranda-panoramic-views">
            Private Mount Stranda tour
          </Link>{" "}
          for flexible pacing with Ljøen viewpoint, Sunnylvsfjord drive, and
          gondola time.
        </p>
        <ul>
          <li>Disembark early and head to your excursion meeting point</li>
          <li>Morning or early afternoon: Mount Stranda scenic tour</li>
          <li>Coffee and waffle stop on the group tour if time allows</li>
          <li>Be at the pier 45 minutes before departure</li>
        </ul>
      </section>

      <section>
        <h2>Briksdal Glacier full port day</h2>
        <p>
          Six to eight hours ashore suits the major glacier experience. Book{" "}
          <Link href="/excursions/briksdal-glacier-discovery">
            Briksdal Glacier Discovery
          </Link>{" "}
          or{" "}
          <Link href="/excursions/private-briksdal-glacier-discovery">
            Private Briksdal Glacier Discovery
          </Link>{" "}
          for Hornindal Lake scenery, Nordfjord driving, and glacier hiking.
        </p>
        <ul>
          <li>Disembark early for long-day tour departures</li>
          <li>Full morning to afternoon: glacier hike and lake viewpoints</li>
          <li>Pack waterproof layers for mountain roads and trail conditions</li>
          <li>Allow 45 minutes before all aboard at Hellesylt pier</li>
        </ul>
      </section>

      <section>
        <h2>Private full-day scenery route</h2>
        <p>
          Eight or more hours opens premium private touring. Options include{" "}
          <Link href="/excursions/private-full-day-hellesylt-highlights">
            Private Full Day Hellesylt Highlights
          </Link>{" "}
          with Briksdal Glacier, lake scenery, and lunch, or the optional{" "}
          <Link href="/excursions/private-panoramic-geiranger-lunch">
            Private Panoramic Journey to Geiranger with Lunch
          </Link>
          . For the Geiranger-area product, plan return carefully and check your
          itinerary with the cruise line.
        </p>
        <ul>
          <li>Morning: private departure with flexible photo stops</li>
          <li>Midday: included lunch on premium full-day routes</li>
          <li>Afternoon: additional viewpoints with private pacing</li>
          <li>Final hour free near the cruise port for a calm return</li>
        </ul>
      </section>

      <section>
        <h2>Return to ship</h2>
        <p>
          Head back to the cruise pier or tender point at least 30 to 45 minutes
          before all aboard. Use the{" "}
          <Link href="/#planner">Hellesylt cruise day planner</Link> to validate your
          itinerary against your actual port window before you sail.
        </p>
      </section>
    </ContentPage>
  );
}
