import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { imageAlts, siteImages } from "@/lib/site-images";

const pageMeta = {
  title: "Is Hellesylt Worth Visiting for Cruise Passengers?",
  description:
    "Honest guide for cruise guests: is Hellesylt worth visiting? Gateway to Geirangerfjord, waterfall village setting, Mount Stranda, Briksdal Glacier access, private scenic touring, and short-call booking advice.",
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
      "Yes for most Geirangerfjord itineraries. Hellesylt combines a famous waterfall, compact village charm, and access to Mount Stranda, Briksdal Glacier, and Geiranger panorama routes when your port time allows.",
  },
  {
    question: "Should I book a tour if my cruise only stops briefly in Hellesylt?",
    answer:
      "If your call is under three hours, focus on village and waterfall time rather than countryside tours. Book Mount Stranda or glacier excursions only when your schedule clearly supports the driving time required.",
  },
  {
    question: "How is Hellesylt different from Geiranger?",
    answer:
      "Hellesylt is the gateway village at the entrance to Geirangerfjord, known for its waterfall and ferry-road setting. Geiranger sits deeper in the fjord with iconic serpentine viewpoints. Many cruises call at both.",
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
      lead="An honest look at whether Hellesylt deserves your hours ashore, gateway to Geirangerfjord scenery, waterfall village setting, Mount Stranda viewpoints, Briksdal Glacier access, and private scenic touring options."
      heroImage={pageMeta.ogImage}
      heroImageAlt={pageMeta.ogImageAlt}
      pagePath={pageMeta.path}
      pageDescription={pageMeta.description}
      relatedLinks={relatedLinks}
      faqs={faqs}
    >
      <section>
        <h2>Short answer: yes, especially as a fjord gateway port</h2>
        <p>
          Hellesylt rewards cruise passengers who understand its role on
          Geirangerfjord itineraries. Even a short stop delivers one of
          Norway&apos;s most photographed waterfalls flowing through a village
          centre, while longer calls unlock Mount Stranda gondola views,
          Briksdal Glacier, and private Geiranger panorama routes.
        </p>
      </section>

      <section>
        <h2>Gateway to Geirangerfjord</h2>
        <p>
          Hellesylt sits where Sunnylvsfjord meets the route into
          Geirangerfjord. Many ships pause here before continuing deeper into
          the fjord, which makes Hellesylt a natural starting point for{" "}
          <Link href="/excursions/private-panoramic-geiranger-lunch">
            private Geiranger panorama touring
          </Link>{" "}
          on full-day port calls.
        </p>
      </section>

      <section>
        <h2>Waterfall and village setting</h2>
        <p>
          The Hellesylt waterfall runs through the heart of the village, giving
          even short technical calls a memorable reason to go ashore. Shops,
          cafés, and harbour viewpoints are minutes from pier or tender
          landings without needing a coach transfer.
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
