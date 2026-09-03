import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardTimingAdvice,
} from "@/lib/excursion-shared";
import { imageAlts, siteImages } from "@/lib/site-images";

const title =
  "Private Panoramic Journey to Geiranger from Hellesylt with Lunch";

export const privatePanoramicGeirangerLunchExcursion: ExcursionData = {
  slug: "private-panoramic-geiranger-lunch",
  path: "/excursions/private-panoramic-geiranger-lunch",
  title,
  headline: `${title} for Cruise Passengers`,
  lead: "Premium Geiranger panorama route from Hellesylt via the waterfall, Hornindal Lake, Stryn, Oppstrynsvatnet Lake, Hjelle valley, Øvstefossen waterfall, Mount Dalsnibba Sky Walk, Geiranger descent, and lunch included.",
  metaTitle: title,
  metaDescription:
    "Private panoramic Geiranger journey from Hellesylt with Mount Dalsnibba Sky Walk, Hornindal Lake, Øvstefossen waterfall, Geiranger descent, and lunch. Premium full-day cruise excursion planning notes.",
  heroImage: siteImages.privateGeirangerTour,
  heroImageAlt: imageAlts.privateGeirangerTourCard,
  heroBadge: "Geiranger panorama route with lunch",
  summary: {
    duration: "Approx. 8+ hours",
    meetingPoint: "Hellesylt village, private pickup near cruise pier",
    returnReassurance:
      "Full-day private route that needs careful return planning to your embarkation point",
    bestFor:
      "Premium travellers with eight or more hours who want a Hellesylt-based Geiranger panorama day with careful logistics planning",
  },
  snapshotCards: [
    { label: "Route", value: "Hellesylt-based Geiranger panorama day" },
    { label: "Highlight", value: "Mount Dalsnibba Sky Walk" },
    { label: "Meals", value: "Lunch included" },
    { label: "Port call fit", value: "Requires 8+ hours ashore" },
  ],
  gallery: [
    { src: siteImages.geirangerViewpoint, alt: imageAlts.geirangerViewpoint },
    { src: siteImages.hellesyltWaterfall, alt: imageAlts.hellesyltWaterfall },
    { src: siteImages.hornindalLake, alt: imageAlts.hornindalLake },
    { src: siteImages.sunnylvsfjord, alt: imageAlts.sunnylvsfjord },
  ],
  highlights: [
    "Hellesylt waterfall and village departure",
    "Hornindal Lake and Stryn mountain scenery",
    "Oppstrynsvatnet Lake and Hjelle valley",
    "Øvstefossen waterfall photo stop",
    "Mount Dalsnibba Sky Walk panoramic platform",
    "Geiranger descent with lunch included",
  ],
  description: [
    "This private product starts from Hellesylt and explores Geiranger-area viewpoints through Hornindal and Stryn country before reaching Mount Dalsnibba Sky Walk, one of the most dramatic elevated viewpoints above the fjord.",
    "En route you pass Oppstrynsvatnet Lake, Hjelle valley, and Øvstefossen waterfall, each offering distinct mountain-and-water compositions. Lunch is included before the Geiranger descent, when the fjord walls and serpentine roads reveal why this itinerary needs a long, carefully planned day.",
    "Consider this outing only when your ship grants eight or more hours ashore. Plan return carefully to your embarkation point. Check your itinerary with the cruise line; this site does not invent reposition logistics between Hellesylt and Geiranger.",
  ],
  included: [
    "Private full-day panoramic tour from Hellesylt",
    "Private vehicle with flexible photo stops",
    "Mount Dalsnibba Sky Walk visit",
    "Scenic routing via Hornindal Lake, Stryn, and Hjelle valley",
    "Lunch included",
  ],
  notIncluded: [
    "Additional drinks and personal purchases",
    "Optional gratuities",
    "Independent time beyond the agreed itinerary",
  ],
  timingAdvice: [
    ...standardTimingAdvice,
    "Requires eight or more hours ashore. Short Hellesylt calls are usually not suitable.",
    "Check your itinerary with the cruise line; this site does not invent reposition logistics between Hellesylt and Geiranger.",
  ],
  faqs: [
    {
      question: "Does this tour go to Geiranger village?",
      answer:
        "The route includes Geiranger-area descent and panoramic viewpoints above the fjord. Confirm exact stops and return arrangements with your operator based on your ship schedule.",
    },
    {
      question: "Can I start in Hellesylt and rejoin the ship in Geiranger?",
      answer:
        "This site does not invent reposition logistics. Check your itinerary with the cruise line and confirm return arrangements with the operator before assuming a different pier.",
    },
    {
      question: "Is lunch included?",
      answer:
        "Yes. Lunch is included on the private panoramic Geiranger journey from Hellesylt.",
    },
    {
      question: "What is Mount Dalsnibba Sky Walk?",
      answer:
        "Mount Dalsnibba Sky Walk is an elevated viewpoint platform above Geirangerfjord, offering wide-angle fjord and mountain panoramas on clear days.",
    },
  ],
  breadcrumbs: hellesyltExcursionBreadcrumbs(title),
  relatedLinks: [
    ...hellesyltExcursionRelatedLinks,
    {
      label: "Private full day Hellesylt highlights",
      href: "/excursions/private-full-day-hellesylt-highlights",
    },
  ],
  bookingHref: "/excursions",
  bookingLabel: "Explore this excursion",
  ctaTitle: "Review this Geiranger-area private day?",
  ctaText:
    "Read the logistics notes carefully, then compare other Hellesylt options if your hours ashore are shorter.",
};
