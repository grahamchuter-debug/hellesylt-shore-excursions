import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/site-metadata";
import { imageAlts, siteImages } from "@/lib/site-images";

const pageMeta = {
  title: "Best Time to Visit Hellesylt for Cruise Passengers",
  description:
    "When to visit Hellesylt on a cruise: peak season, Mount Stranda gondola availability, glacier route access, short-call patterns before Geiranger, weather, and return-to-ship planning by month.",
  path: "/best-time-to-visit-hellesylt",
  ogImage: siteImages.bestTime,
  ogImageAlt: imageAlts.bestTime,
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
    question: "What is the best month for Hellesylt cruise shore excursions?",
    answer:
      "May through September offers the most reliable Mount Stranda gondola operation, glacier route access, and walkable village weather. June and July are often the busiest published months here.",
  },
  {
    question: "Is Hellesylt crowded in summer?",
    answer:
      "It can be busy on peak cruise days. Disembark early, arrange popular Mount Stranda and glacier tours through your usual channel when capacity looks tight, and allow extra return margin on mountain road days. This site does not invent sold-out status.",
  },
  {
    question: "Can I visit Hellesylt on a winter cruise?",
    answer:
      "Winter calls are possible with fewer crowds and dramatic light, but daylight is short and some gondola or glacier routes may have reduced access. Pack warm layers and confirm excursion times in advance.",
  },
  {
    question: "Does weather affect Mount Stranda and glacier tours?",
    answer:
      "Mountain cloud can reduce distant views from gondola and sky-walk platforms while valley rain enhances waterfall scenery. Pack waterproof layers regardless of season.",
  },
] as const;

export default function BestTimeToVisitHellesyltPage() {
  return (
    <ContentPage
      title="Best Time to Visit Hellesylt"
      lead="Season-by-season advice for cruise passengers choosing when to book Mount Stranda tours, Briksdal Glacier routes, private Geiranger panoramas, and village time in Hellesylt."
      heroImage={pageMeta.ogImage}
      heroImageAlt={pageMeta.ogImageAlt}
      pagePath={pageMeta.path}
      pageDescription={pageMeta.description}
      relatedLinks={relatedLinks}
      faqs={faqs}
    >
      <section>
        <h2>Peak cruise season: May to September</h2>
        <p>
          Most Hellesylt cruise calls arrive between late spring and early
          autumn. Longer daylight, operating gondola services, and active
          glacier excursion operators make this the best window for shore
          excursions. June through August sees the highest Geirangerfjord ship
          volumes.
        </p>
      </section>

      <section>
        <h2>June and July: best mountain views, busiest ports</h2>
        <p>
          Mid-summer delivers the classic Norway fjord experience cruise guests
          expect, green valley walls, reliable Mount Stranda gondola operation,
          and full excursion timetables. On multi-ship days, arrange popular
          Mount Stranda and glacier tours early through your usual channel.
        </p>
      </section>

      <section>
        <h2>May and September: balance of light and crowds</h2>
        <p>
          Shoulder months often mean slightly fewer passengers ashore while
          operators still run regular panoramic and glacier tours. September can
          bring crisp air and golden light for photography along Sunnylvsfjord
          and at the Hellesylt waterfall.
        </p>
      </section>

      <section>
        <h2>Short calls and nearby Geiranger context</h2>
        <p>
          Some summer itineraries schedule a brief Hellesylt stop, sometimes with
          another fjord call later. That is optional context only. Check your
          cruise timetable carefully: short calls suit waterfall and village
          time, not full glacier or Geiranger panorama days. This site does not
          invent reposition logistics.
        </p>
      </section>

      <section>
        <h2>Winter and off-season calls</h2>
        <p>
          Winter cruises offer atmospheric fjord light and shorter queues, but
          cold weather and limited daylight change the pace. Village walks remain
          viable with proper clothing; always confirm whether Mount Stranda
          gondola and glacier routes operate on your exact date.
        </p>
      </section>

      <section>
        <h2>Planning tips whatever month you visit</h2>
        <ul>
          <li>
            Arrange popular Mount Stranda and glacier excursions early on peak
            summer itineraries through your usual channel
          </li>
          <li>Pack a waterproof layer, mountain weather shifts quickly</li>
          <li>
            Build 30 to 45 minutes buffer before all aboard every season
          </li>
          <li>
            Read the{" "}
            <Link href="/hellesylt-port-guide">port guide</Link> for pier,
            tender, and short-call notes
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
