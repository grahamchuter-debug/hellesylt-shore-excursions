import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { imageAlts, siteImages } from "@/lib/site-images";

const pageMeta = {
  title: "Hellesylt Cruise Port Guide",
  description:
    "Hellesylt cruise port guide for passengers: pier and tender notes, walking distance to the waterfall and village, short-call warnings, return-to-ship buffer advice, weather, and gondola timing.",
  path: "/hellesylt-port-guide",
  ogImage: siteImages.portGuide,
  ogImageAlt: imageAlts.portGuide,
} as const;

export const metadata: Metadata = buildPageMetadata(pageMeta);

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Hellesylt Port Guide" },
] as const;

const relatedLinks = [
  { label: "Shore excursions", href: "/excursions" },
  { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
  {
    label: "Is Hellesylt worth visiting?",
    href: "/is-hellesylt-worth-visiting",
  },
  { label: "Best time to visit", href: "/best-time-to-visit-hellesylt" },
] as const;

const faqs = [
  {
    question: "Does Hellesylt have a cruise pier or is it a tender port?",
    answer:
      "Hellesylt can be either a pier port or a tender port depending on ship size and daily scheduling. Some vessels dock at the village pier; others anchor and transfer passengers by tender. Confirm your arrangement on the cruise app the night before arrival.",
  },
  {
    question: "How far is the Hellesylt waterfall from the cruise port?",
    answer:
      "The famous Hellesylt waterfall flows through the village centre and is typically within a few minutes on foot from pier or tender landing points.",
  },
  {
    question: "Why do some cruises only stop briefly in Hellesylt?",
    answer:
      "Many itineraries treat Hellesylt as a gateway stop before sailing into Geirangerfjord. Short technical calls may allow village and waterfall time only, not longer countryside tours.",
  },
  {
    question: "How early should cruise passengers return to the ship in Hellesylt?",
    answer:
      "Plan to be back at the pier or tender point at least 30 to 45 minutes before all aboard. Queues can compress that buffer on peak summer days.",
  },
] as const;

export default function HellesyltPortGuidePage() {
  return (
    <ContentPage
      title="Hellesylt Port Guide for Cruise Passengers"
      lead="Everything you need to navigate Hellesylt cruise port, pier and tender access, walking distances to the waterfall and village, short-call warnings, return-to-ship buffer guidance, weather advice, and mountain road timing."
      heroImage={pageMeta.ogImage}
      heroImageAlt={pageMeta.ogImageAlt}
      pagePath={pageMeta.path}
      pageDescription={pageMeta.description}
      breadcrumbs={breadcrumbs}
      relatedLinks={relatedLinks}
      faqs={faqs}
    >
      <section>
        <h2>Hellesylt cruise port location</h2>
        <p>
          Hellesylt sits at the head of Sunnylvsfjord at the entrance to
          Geirangerfjord. Most cruise passengers arrive at a compact village
          waterfront where excursion coaches, cafés, and the famous waterfall
          are within easy walking distance of pier or tender landings.
        </p>
        <p>
          Because Hellesylt is a gateway port on many Geirangerfjord
          itineraries, your ship may stop here briefly before continuing into
          the fjord. Always confirm your exact hours ashore before booking
          longer countryside tours.
        </p>
      </section>

      <section>
        <h2>Pier, tender, and short-call notes</h2>
        <p>
          Smaller and mid-size ships often dock at the village pier. Larger
          vessels may anchor offshore and use tender boats. Either way, you
          typically land close to the village centre rather than at a remote
          industrial terminal.
        </p>
        <ul>
          <li>
            <strong>Pier docking:</strong> gangway to village and waterfall
            within minutes
          </li>
          <li>
            <strong>Tender landing:</strong> confirm tender point on your cruise
            app, usually near the harbour
          </li>
          <li>
            <strong>Short technical calls:</strong> focus on waterfall and village
            time; avoid Mount Stranda or glacier routes unless your schedule
            clearly allows
          </li>
        </ul>
      </section>

      <section>
        <h2>Walking distances from the cruise port</h2>
        <ul>
          <li>
            <strong>Hellesylt waterfall:</strong> a few minutes on foot through
            the village
          </li>
          <li>
            <strong>Village shops and cafés:</strong> compact harbour area,
            walkable from pier or tender
          </li>
          <li>
            <strong>Excursion meeting points:</strong> typically signed near the
            harbour within minutes of landing
          </li>
          <li>
            <strong>Mount Stranda and Briksdal Glacier:</strong> road excursions
            only, not walkable from port
          </li>
        </ul>
      </section>

      <section>
        <h2>Return-to-ship buffer advice</h2>
        <p>
          Aim to be at the pier or tender point 30 to 45 minutes before all
          aboard. Mountain road tours and gondola excursions need extra margin
          because weather, road traffic, and gondola queues can delay returns on
          busy cruise days.
        </p>
        <p>
          Use the{" "}
          <Link href="/#planner">Cruise Smart Planner</Link> to match tours to
          your actual port window before you sail.
        </p>
      </section>

      <section>
        <h2>Weather and clothing advice</h2>
        <p>
          Hellesylt weather can shift quickly between fjord-level sunshine and
          mountain cloud. Pack a waterproof layer even on clear mornings,
          especially for Mount Stranda gondola and Briksdal Glacier routes.
        </p>
        <p>
          Sturdy walking shoes help for waterfall viewpoints, glacier hikes, and
          uneven paths at elevated lookout stops.
        </p>
      </section>

      <section>
        <h2>Mountain road and gondola timing</h2>
        <p>
          Mount Stranda tours include scenic driving and gondola operations that
          depend on weather and queue length. Briksdal Glacier routes cross
          Hornindal Lake and Nordfjord valleys with long road times each way.
        </p>
        <p>
          Book longer tours only when your ship schedule supports them. For
          three-to-four-hour calls, choose{" "}
          <Link href="/excursions/mount-stranda-panoramic-views">
            Mount Stranda panoramic touring
          </Link>{" "}
          rather than glacier or Geiranger full-day routes.
        </p>
      </section>
    </ContentPage>
  );
}
