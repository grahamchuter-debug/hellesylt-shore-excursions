import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardNotIncluded,
  standardTimingAdvice,
} from "@/lib/excursion-shared";
import { imageAlts, siteImages } from "@/lib/site-images";

const title = "Briksdal Glacier Discovery from Hellesylt";

export const briksdalGlacierDiscoveryExcursion: ExcursionData = {
  slug: "briksdal-glacier-discovery",
  path: "/excursions/briksdal-glacier-discovery",
  title,
  headline: `${title} for Cruise Passengers`,
  lead: "The major glacier tour from Hellesylt with scenic journey through Hornindal Lake, Nordfjord, Stryn, Loen and Olden scenery to Briksdal Glacier, glacier lake viewpoints, and waterfalls.",
  metaTitle: title,
  metaDescription:
    "Major Hellesylt glacier shore excursion to Briksdal Glacier via Hornindal Lake and Nordfjord scenery. Approx. 6 hours 30 minutes, difficult activity level with hiking required.",
  heroImage: siteImages.briksdalTour,
  heroImageAlt: imageAlts.briksdalTourCard,
  heroBadge: "Major glacier tour from Hellesylt",
  summary: {
    duration: "Approx. 6 hours 30 minutes",
    meetingPoint: "Hellesylt village near cruise pier or tender landing",
    returnReassurance:
      "Long-day timings built around typical six-to-eight-hour port calls",
    bestFor:
      "Active cruise passengers who want the definitive Briksdal Glacier hike experience",
  },
  snapshotCards: [
    { label: "Activity level", value: "Difficult, hiking required at glacier" },
    {
      label: "Scenery",
      value: "Hornindal Lake, Nordfjord, Briksdal Glacier, waterfalls",
    },
    { label: "Port call fit", value: "Requires 6 to 8 hours ashore" },
    { label: "Experience", value: "Glacier lake viewpoint and valley drive" },
  ],
  gallery: [
    { src: siteImages.briksdalGlacier, alt: imageAlts.briksdalGlacier },
    { src: siteImages.hornindalLake, alt: imageAlts.hornindalLake },
    { src: siteImages.briksdalWaterfall, alt: imageAlts.briksdalWaterfall },
    { src: siteImages.oldedalen, alt: imageAlts.oldedalen },
  ],
  highlights: [
    "Scenic journey from Hellesylt through mountain roads",
    "Hornindal Lake, one of Europe's deepest lakes",
    "Nordfjord, Stryn, Loen and Olden scenery en route",
    "Briksdal Glacier arm of Jostedalsbreen",
    "Glacier lake viewpoint and waterfall stops",
    "Cruise-friendly long-day departure and return timings",
  ],
  description: [
    "Briksdal Glacier is one of Norway's most celebrated glacier experiences, and this discovery tour from Hellesylt puts you on the trail with enough time for the scenic drive, the hike, and the glacier lake viewpoints that define the day.",
    "The journey crosses Hornindal Lake and follows Nordfjord country through Stryn, Loen, and Olden scenery before reaching Briksdalsbreen. Waterfalls, farmhouses, and dramatic valley walls accompany every stage of the route.",
    "This is an active shore excursion with difficult activity level and hiking required at the glacier. It suits cruise passengers with at least six hours ashore who want a full glacier day rather than a short village stop at Hellesylt waterfall.",
  ],
  included: [
    "Guided Briksdal Glacier discovery tour from Hellesylt",
    "Scenic drive via Hornindal Lake and Nordfjord valleys",
    "Glacier hike with expert commentary",
    "Route paced for six-to-eight-hour port calls",
  ],
  notIncluded: standardNotIncluded,
  timingAdvice: [
    ...standardTimingAdvice,
    "Do not choose this tour if your Hellesylt call is under six hours. Short village-only calls are not suitable for Briksdal.",
  ],
  faqs: [
    {
      question: "How far is Briksdal Glacier from Hellesylt?",
      answer:
        "The glacier is reached by a long scenic drive through Nordfjord country. The full tour including travel and hiking runs approximately six and a half hours.",
    },
    {
      question: "Is hiking required?",
      answer:
        "Yes. This is a difficult activity level tour with hiking required to reach glacier viewpoints and the glacier lake.",
    },
    {
      question: "Can I do this on a short Hellesylt port call?",
      answer:
        "No. You need at least six hours ashore. Very short stops before Geiranger should focus on village and waterfall time only.",
    },
  ],
  breadcrumbs: hellesyltExcursionBreadcrumbs(title),
  relatedLinks: [
    ...hellesyltExcursionRelatedLinks,
    {
      label: "Private Briksdal Glacier",
      href: "/excursions/private-briksdal-glacier-discovery",
    },
  ],
  bookingHref: "/excursions",
  bookingLabel: "Explore this excursion",
};
