import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { imageAlts, siteImages } from "@/lib/site-images";

const pageMeta = {
  title: "Is Hellesylt Worth Visiting for Cruise Passengers?",
  description:
    "Honest guide for cruise guests: is Hellesylt worth visiting? Waterfall village setting, Mount Stranda, Briksdal Glacier access, optional Geiranger-area private touring, and short-call planning advice.",
  path: "/is-hellesylt-worth-visiting",
  ogImage: siteImages.worthVisiting,
  ogImageAlt: imageAlts.worthVisiting,
} as const;

export const metadata: Metadata = buildPageMetadata(pageMeta);

const relatedLinks = [
  { label: "Shore excursions", href: "/excursions" },
  { label: "Hellesylt port guide", href: "/hellesylt-port-guide" },
  { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
  { label: "Best time to visit", href: "/best-time-to-visit-hellesylt" },
] as const;

const faqs = [
  {
    question: "Is Hellesylt worth visiting from a cruise ship?",
    answer:
      "Yes for many passengers. Hellesylt combines a famous waterfall, compact village charm, and access to Mount Stranda and Briksdal Glacier when your port time allows. An optional Geiranger-area private product is also listed for longer days.",
  },
  {
    question: "Should I arrange a tour if my cruise only stops briefly in Hellesylt?",
    answer:
      "If your call is under three hours, focus on village and waterfall time rather than countryside tours. Consider Mount Stranda or glacier excursions only when your schedule clearly supports the driving time required.",
  },
  {
    question: "How is Hellesylt different from Geiranger?",
    answer:
      "Hellesylt is a waterfall village on Sunnylvsfjord with its own pier experience. Geiranger sits deeper in the fjord with iconic serpentine viewpoints. Some cruises call at both; check your itinerary with the cruise line rather than assuming a shared day.",
  },
  {
    question: "Can I reach Briksdal Glacier from Hellesylt?",
    answer:
      "Yes via full-day shore excursions through Hornindal Lake and Nordfjord country. Allow at least six hours ashore for glacier hiking tours.",
  },
  {
    question: "What is the best Hellesylt shore excursion?",
    answer:
      "Journey to Mount Stranda and Panoramic Views is the headline choice for three-to-four-hour calls. Briksdal Glacier Discovery suits active passengers with six or more hours.",
  },
  {
    question: "Is Hellesylt walkable from the cruise port?",
    answer:
      "Yes. The waterfall and village centre are within walking distance of most pier and tender landings.",
  },
] as const;

export default function IsHellesyltWorthVisitingPage() {
  return (
    <ContentPage
      title="Is Hellesylt Worth Visiting?"
      lead="An honest look at whether Hellesylt deserves your hours ashore: waterfall village setting, Mount Stranda viewpoints, Briksdal Glacier access, and optional private scenic touring."
      heroImage={pageMeta.ogImage}
      heroImageAlt={pageMeta.ogImageAlt}
      pagePath={pageMeta.path}
      pageDescription={pageMeta.description}
      relatedLinks={relatedLinks}
      faqs={faqs}
    >
      <section>
        <h2>Short answer: yes, especially for the village itself</h2>
        <p>
          Hellesylt rewards cruise passengers who treat it as its own stop, not
          only as context for somewhere else. Even a short call delivers one of
          Norway&apos;s most photographed waterfalls flowing through a village
          centre, while longer calls unlock Mount Stranda gondola views and
          Briksdal Glacier. An optional{" "}
          <Link href="/excursions/private-panoramic-geiranger-lunch">
            Geiranger-area private product
          </Link>{" "}
          exists for carefully planned full days.
        </p>
      </section>

      <section>
        <h2>Optional Geiranger-area context</h2>
        <p>
          Some itineraries also visit Geiranger later or on another day. That is
          useful background, not the purpose of this site. Check your itinerary
          with the cruise line; this site does not invent reposition logistics.
          On a long Hellesylt day, the private Geiranger panorama product can be
          one option among others already listed here.
        </p>
      </section>

      <section>
        <h2>Waterfall and village setting</h2>
        <p>
          The Hellesylt waterfall runs through the heart of the village, giving
          even short calls a memorable reason to go ashore. Shops, cafés, and
          harbour viewpoints are minutes from pier or tender landings without
          needing a coach transfer.
        </p>
      </section>

      <section>
        <h2>Mount Stranda panoramic touring</h2>
        <p>
          When you have three to four hours ashore,{" "}
          <Link href="/excursions/mount-stranda-panoramic-views">
            Journey to Mount Stranda and Panoramic Views
          </Link>{" "}
          is the headline excursion. Ljøen viewpoint, Sunnylvsfjord driving,
          and the Mount Stranda gondola deliver Sunnmøre Alps scenery on an easy
          activity level.
        </p>
      </section>

      <section>
        <h2>Briksdal Glacier access</h2>
        <p>
          Active passengers with six or more hours can reach Briksdal Glacier
          on{" "}
          <Link href="/excursions/briksdal-glacier-discovery">
            Briksdal Glacier Discovery
          </Link>{" "}
          or a{" "}
          <Link href="/excursions/private-briksdal-glacier-discovery">
            private glacier tour
          </Link>
          . Hornindal Lake and Nordfjord valley scenery make the journey part
          of the experience.
        </p>
      </section>

      <section>
        <h2>Private scenic touring</h2>
        <p>
          Premium private options include{" "}
          <Link href="/excursions/private-full-day-hellesylt-highlights">
            Private Full Day Hellesylt Highlights
          </Link>{" "}
          and the{" "}
          <Link href="/excursions/private-panoramic-geiranger-lunch">
            Private Panoramic Journey to Geiranger with Lunch
          </Link>
          . These suit eight-hour port days when you want flexible pacing and
          included lunch.
        </p>
      </section>

      <section>
        <h2>When Hellesylt might not be worth leaving the ship</h2>
        <p>
          If your call is under two hours, severe weather limits mountain
          visibility, or you have mobility limits without a suitable tour,
          staying aboard may be safer. Very tight schedules rarely fit glacier
          or Geiranger routes, though even a brief waterfall walk delivers
          authentic fjord gateway atmosphere.
        </p>
      </section>

      <section>
        <h2>Plan your Hellesylt port day</h2>
        <p>
          Browse our{" "}
          <Link href="/excursions">shore excursions</Link>, read the{" "}
          <Link href="/hellesylt-port-guide">port guide</Link>, and use the{" "}
          <Link href="/#planner">Cruise Smart Planner</Link> to match activities
          to your ship&apos;s timetable before you sail.
        </p>
      </section>
    </ContentPage>
  );
}
