import { ExcursionDetailPage } from "@/components/excursion-detail-page";
import { privateFullDayHellesyltHighlightsExcursion } from "@/lib/excursions/private-full-day-hellesylt-highlights";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: privateFullDayHellesyltHighlightsExcursion.metaTitle,
  description: privateFullDayHellesyltHighlightsExcursion.metaDescription,
  path: privateFullDayHellesyltHighlightsExcursion.path,
  ogImage: privateFullDayHellesyltHighlightsExcursion.heroImage,
  ogImageAlt: privateFullDayHellesyltHighlightsExcursion.heroImageAlt,
});

export default function Page() {
  return (
    <ExcursionDetailPage
      excursion={privateFullDayHellesyltHighlightsExcursion}
    />
  );
}
