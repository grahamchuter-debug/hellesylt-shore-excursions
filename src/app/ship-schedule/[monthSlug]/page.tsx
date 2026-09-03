import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentPage } from "@/components/content-page";
import { ShipScheduleTable } from "@/components/ship-schedule-table";
import {
  formatMonthLabel,
  getHellesyltEntriesForMonthKey,
  getHellesyltMonthKeysWithCalls,
  getHellesyltMonthSummaries,
  monthKeyToSlug,
  monthSlugToKey,
  scheduleDisclaimer,
  shipScheduleHubPath,
  shipScheduleMonthPath,
} from "@/lib/hellesylt-schedules";
import { imageAlts, siteImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/site-metadata";

type MonthPageProps = {
  params: Promise<{ monthSlug: string }>;
};

export function generateStaticParams() {
  return getHellesyltMonthKeysWithCalls().map((monthKey) => ({
    monthSlug: monthKeyToSlug(monthKey),
  }));
}

export async function generateMetadata({
  params,
}: MonthPageProps): Promise<Metadata> {
  const { monthSlug } = await params;
  const monthKey = monthSlugToKey(monthSlug);
  if (!monthKey) return {};
  const label = formatMonthLabel(monthKey);
  return buildPageMetadata({
    title: `Hellesylt Cruise Ship Schedule ${label}`,
    description: `View the Hellesylt cruise ship schedule for ${label} including arrival times, departure times, and cruise lines visiting Hellesylt, Norway.`,
    path: shipScheduleMonthPath(monthSlug),
  });
}

export default async function HellesyltShipScheduleMonthPage({
  params,
}: MonthPageProps) {
  const { monthSlug } = await params;
  const monthKey = monthSlugToKey(monthSlug);
  if (!monthKey) notFound();

  const entries = getHellesyltEntriesForMonthKey(monthKey);
  if (entries.length === 0) notFound();

  const label = formatMonthLabel(monthKey);
  const otherMonths = getHellesyltMonthSummaries().filter(
    (m) => m.slug !== monthSlug,
  );

  return (
    <ContentPage
      title={`Hellesylt cruise schedule: ${label}`}
      lead={`${entries.length} published ship call${entries.length === 1 ? "" : "s"} for ${label}. Find your vessel, note arrival and departure, then choose a realistic Hellesylt plan.`}
      heroImage={siteImages.hero}
      heroImageAlt={imageAlts.hero}
      pagePath={shipScheduleMonthPath(monthSlug)}
      pageDescription={`Hellesylt cruise ship schedule for ${label}.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Ship schedule", href: shipScheduleHubPath },
        { label },
      ]}
      ctaTitle="Plan your Hellesylt port day"
      ctaText="Use your hours ashore to choose between village time, Mount Stranda or Briksdal, with a clear return buffer."
      ctaHref="/one-day-in-hellesylt"
      ctaButtonLabel="Plan your Hellesylt day"
      relatedLinks={[
        { label: "All months", href: shipScheduleHubPath },
        { label: "Explore excursions", href: "/excursions" },
        { label: "Port guide", href: "/hellesylt-port-guide" },
        { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
      ]}
    >
      <section>
        <p className="rounded border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          {scheduleDisclaimer}
        </p>
      </section>

      <section>
        <h2>{label} ship calls</h2>
        <ShipScheduleTable entries={entries} />
      </section>

      <section>
        <h2>Next: turn your date into a plan</h2>
        <p>
          Once you know roughly how long you have ashore, choose one main
          experience that fits. Ship times alone cannot prove that a long private
          Geiranger-area outing will work on your call. Check your itinerary with
          the cruise line; this site does not invent reposition logistics.
        </p>
        <ul>
          <li>
            <Link href="/one-day-in-hellesylt">One day in Hellesylt</Link>
          </li>
          <li>
            <Link href="/excursions">Hellesylt shore excursions</Link>
          </li>
          <li>
            <Link href="/hellesylt-port-guide">Hellesylt cruise port guide</Link>
          </li>
          <li>
            <Link href="/is-hellesylt-worth-visiting">
              Is Hellesylt worth visiting?
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>Other Hellesylt months</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {otherMonths.map((month) => (
            <li key={month.slug}>
              <Link href={shipScheduleMonthPath(month.slug)}>
                {month.label} · {month.callCount} calls
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </ContentPage>
  );
}
