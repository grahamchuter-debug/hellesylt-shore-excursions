import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { ShipScheduleMonthCards } from "@/components/ship-schedule-month-cards";
import {
  hellesyltScheduleIntegrity,
  formatScheduleDate,
  getHellesyltMonthSummaries,
  scheduleDisclaimer,
  shipScheduleHubPath,
} from "@/lib/hellesylt-schedules";
import { imageAlts, siteImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hellesylt Cruise Ship Schedule",
  description:
    "Browse Hellesylt cruise ship schedules by month. View arrival times, departure times, and cruise lines visiting Hellesylt, Norway to plan your shore day.",
  path: shipScheduleHubPath,
});

export default function ShipScheduleHubPage() {
  const months = getHellesyltMonthSummaries();
  const firstLabel = hellesyltScheduleIntegrity.firstDate
    ? formatScheduleDate(hellesyltScheduleIntegrity.firstDate)
    : "";
  const lastLabel = hellesyltScheduleIntegrity.lastDate
    ? formatScheduleDate(hellesyltScheduleIntegrity.lastDate)
    : "";

  return (
    <ContentPage
      title="Hellesylt cruise ship schedule"
      lead={`Published calls for Hellesylt from ${firstLabel} to ${lastLabel}. Find your month, check arrival and departure times, then decide whether village time, Mount Stranda or Briksdal fits.`}
      heroImage={siteImages.hero}
      heroImageAlt={imageAlts.hero}
      pagePath={shipScheduleHubPath}
      pageDescription={metadata.description as string}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Ship schedule" },
      ]}
      ctaTitle="Plan your Hellesylt port day"
      ctaText="Once you know your hours ashore, compare village, Mount Stranda and Briksdal options with a clear return buffer."
      ctaHref="/one-day-in-hellesylt"
      ctaButtonLabel="Plan your Hellesylt day"
      relatedLinks={[
        { label: "Hellesylt shore excursions", href: "/excursions" },
        { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
        { label: "Port guide", href: "/hellesylt-port-guide" },
        { label: "Is Hellesylt worth visiting?", href: "/is-hellesylt-worth-visiting" },
      ]}
    >
      <section>
        <p className="rounded border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          {scheduleDisclaimer}
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700">
          This local timetable is filtered from the Norway Shore Excursions master
          schedule: {hellesyltScheduleIntegrity.total} Hellesylt calls,{" "}
          {hellesyltScheduleIntegrity.byYear["2026"] ?? 0} in 2026 and{" "}
          {hellesyltScheduleIntegrity.byYear["2027"] ?? 0} in 2027, across{" "}
          {hellesyltScheduleIntegrity.uniqueShips} ships.
        </p>
      </section>

      <section>
        <h2>Browse by month</h2>
        <ShipScheduleMonthCards months={months} />
      </section>

      <section>
        <h2>Why ship times matter in Hellesylt</h2>
        <p>
          A short call usually suits the village and waterfall. Mount Stranda
          needs more hours. Briksdal and longer private routes need a confirmed
          full day. Always leave a clear buffer before all aboard.
        </p>
        <p>
          Continue to{" "}
          <Link href="/one-day-in-hellesylt">one day in Hellesylt</Link>,{" "}
          <Link href="/excursions">excursion options</Link>, the{" "}
          <Link href="/hellesylt-port-guide">port guide</Link>, or{" "}
          <Link href="/is-hellesylt-worth-visiting">is Hellesylt worth visiting?</Link>.
        </p>
      </section>
    </ContentPage>
  );
}
