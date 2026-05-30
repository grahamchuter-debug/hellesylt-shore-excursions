import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardNotIncluded,
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
    "Private panoramic Geiranger journey from Hellesylt with Mount Dalsnibba Sky Walk, Hornindal Lake, Øvstefossen waterfall, Geiranger descent, and lunch. Premium full-day cruise excursion.",
  heroImage: siteImages.privateGeirangerTour,
  heroImageAlt: imageAlts.privateGeirangerTourCard,
  heroBadge: "Geiranger panorama route with lunch",
  summary: {
    duration: "Approx. 8+ hours",
    meetingPoint: "Hellesylt village, private pickup near cruise pier",
    returnReassurance:
      "Full-day private route with return margin for all aboard",
    bestFor:
      "Premium travellers with eight or more hours who want Hellesylt-to-Geiranger panoramas in one private day",
  },
  snapshotCards: [
    { label: "Route", value: "Hellesylt to Geiranger panorama descent" },
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
    "Hellesylt is the natural starting point for a private Geiranger panorama day because the village sits at the gateway to Geirangerfjord. This route climbs through Hornindal and Stryn country before reaching Mount Dalsnibba Sky Walk, one of the most dramatic elevated viewpoints above the fjord.",
    "En route you pass Oppstrynsvatnet Lake, Hjelle valley, and Øvstefossen waterfall, each offering distinct mountain-and-water compositions. Lunch is included before the Geiranger descent, when the fjord walls and serpentine roads reveal why this itinerary is a premium cruise-day investment.",
    "Book this tour only when your ship grants eight or more hours ashore. It is the definitive private option for passengers who want to transform a Hellesylt call into a full Geiranger panorama experience without rejoining the ship at a separate Geiranger pier.",
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
    "Requires eight or more hours ashore. Not suitable for brief technical Hellesylt stops before Geiranger.",
    "Confirm whether your cruise repositions to Geiranger after Hellesylt when planning return logistics.",
  ],
  faqs: [
    {
      question: "Does this tour go to Geiranger village?",
      answer:
        "Yes. The route includes the Geiranger descent with panoramic viewpoints above the fjord. Confirm exact stops with your operator based on your ship schedule.",
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
  bookingLabel: "Book this excursion",
};
