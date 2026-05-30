import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardNotIncluded,
  standardTimingAdvice,
} from "@/lib/excursion-shared";
import { imageAlts, siteImages } from "@/lib/site-images";

const title = "Private Full Day Hellesylt Highlights";

export const privateFullDayHellesyltHighlightsExcursion: ExcursionData = {
  slug: "private-full-day-hellesylt-highlights",
  path: "/excursions/private-full-day-hellesylt-highlights",
  title,
  headline: `${title} for Cruise Passengers`,
  lead: "Full-day private scenic photography tour through Oldedalen Valley, Briksdal Glacier, Loen Lake, historic farmhouses, dramatic valleys, and lunch included.",
  metaTitle: title,
  metaDescription:
    "Private full day Hellesylt highlights with Oldedalen Valley, Briksdal Glacier, Loen Lake, historic farmhouses, dramatic valleys, and lunch. Approx. 8 hours for cruise passengers.",
  heroImage: siteImages.privateFullDayTour,
  heroImageAlt: imageAlts.privateFullDayTourCard,
  heroBadge: "Full-day scenic photography tour",
  summary: {
    duration: "Approx. 8 hours",
    meetingPoint: "Hellesylt village, private pickup near cruise pier",
    returnReassurance:
      "Full-day private itinerary with return margin for all aboard",
    bestFor:
      "Photography-focused passengers and small groups with eight or more hours ashore",
  },
  snapshotCards: [
    { label: "Duration", value: "Approx. 8 hours full day" },
    { label: "Meals", value: "Lunch included" },
    { label: "Scenery", value: "Oldedalen, Briksdal, Loen Lake, farmhouses" },
    { label: "Port call fit", value: "Requires 8+ hours ashore" },
  ],
  gallery: [
    { src: siteImages.strandadalen, alt: imageAlts.strandadalen },
    { src: siteImages.briksdalGlacier, alt: imageAlts.briksdalGlacier },
    { src: siteImages.hornindalLake, alt: imageAlts.hornindalLake },
    { src: siteImages.sunnylvsfjord, alt: imageAlts.sunnylvsfjord },
  ],
  highlights: [
    "Oldedalen Valley with dramatic glacial scenery",
    "Briksdal Glacier viewpoints and lake scenery",
    "Loen Lake and Nordfjord landscapes",
    "Historic farmhouses and valley photo stops",
    "Lunch included at a scenic location",
    "Private pacing for photography and sightseeing",
  ],
  description: [
    "Private Full Day Hellesylt Highlights is built for cruise passengers who want the widest scenic canvas in a single port day. The route strings together Oldedalen Valley, Briksdal Glacier, Loen Lake, and historic farmsteads with unhurried private transport.",
    "Photography stops are woven through the day at waterfalls, lake reflections, and dramatic valley bends that define Nordfjord country. Lunch is included, giving you a proper break between morning glacier scenery and afternoon viewpoints.",
    "This premium full-day tour requires at least eight hours ashore and suits guests who would rather invest one long Hellesylt call in comprehensive scenery than split time between multiple shorter excursions.",
  ],
  included: [
    "Private full-day guided tour from Hellesylt",
    "Private vehicle with flexible photo stops",
    "Oldedalen Valley and Briksdal Glacier touring",
    "Loen Lake and historic farmhouse viewpoints",
    "Lunch included",
  ],
  notIncluded: [
    "Additional drinks and personal purchases",
    "Optional gratuities",
    "Independent time beyond the agreed itinerary",
  ],
  timingAdvice: [
    ...standardTimingAdvice,
    "Book only when your ship schedules eight or more hours in Hellesylt.",
  ],
  faqs: [
    {
      question: "Is lunch included on the full-day private tour?",
      answer:
        "Yes. Lunch at a scenic location is included in the full-day Hellesylt highlights itinerary.",
    },
    {
      question: "How many hours do I need in port?",
      answer:
        "Plan for at least eight hours ashore to comfortably complete this private full-day route with lunch and photo stops.",
    },
    {
      question: "Is this tour photography focused?",
      answer:
        "Yes. The private pacing and multiple valley, glacier, and lake stops suit photographers and scenic sightseeing groups.",
    },
  ],
  breadcrumbs: hellesyltExcursionBreadcrumbs(title),
  relatedLinks: [
    ...hellesyltExcursionRelatedLinks,
    {
      label: "Private Geiranger with lunch",
      href: "/excursions/private-panoramic-geiranger-lunch",
    },
  ],
  bookingHref: "/excursions",
  bookingLabel: "Book this excursion",
};
