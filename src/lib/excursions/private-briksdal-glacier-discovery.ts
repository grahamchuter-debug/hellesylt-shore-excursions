import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardNotIncluded,
  standardTimingAdvice,
} from "@/lib/excursion-shared";
import { imageAlts, siteImages } from "@/lib/site-images";

const title = "Private Briksdal Glacier Discovery from Hellesylt";

export const privateBriksdalGlacierDiscoveryExcursion: ExcursionData = {
  slug: "private-briksdal-glacier-discovery",
  path: "/excursions/private-briksdal-glacier-discovery",
  title,
  headline: `${title} for Cruise Passengers`,
  lead: "Premium private glacier touring from Hellesylt with flexible pace, Hornindal Lake scenery, Briksdal Glacier hike, Briksdalsbre Mountain Lodge, and glacier lake viewpoints.",
  metaTitle: title,
  metaDescription:
    "Private Briksdal Glacier discovery from Hellesylt with flexible pace, Hornindal Lake, glacier hike, and mountain lodge stop. Approx. 6 hours 30 minutes for active cruise passengers.",
  heroImage: siteImages.privateBriksdalTour,
  heroImageAlt: imageAlts.privateBriksdalTourCard,
  heroBadge: "Premium private glacier option",
  summary: {
    duration: "Approx. 6 hours 30 minutes",
    meetingPoint: "Hellesylt village, private pickup near cruise pier",
    returnReassurance:
      "Private vehicle timings tailored to your ship's schedule",
    bestFor:
      "Couples, families, and small groups who want flexible glacier hiking with private transport",
  },
  snapshotCards: [
    { label: "Transport", value: "Private vehicle from Hellesylt" },
    { label: "Pace", value: "Flexible with personal guide" },
    { label: "Stops", value: "Hornindal Lake, Briksdalsbre Mountain Lodge" },
    { label: "Activity", value: "Glacier hike, moderate to difficult" },
  ],
  gallery: [
    { src: siteImages.briksdalWaterfall, alt: imageAlts.briksdalWaterfall },
    { src: siteImages.hornindalLake, alt: imageAlts.hornindalLake },
    { src: siteImages.briksdalGlacier, alt: imageAlts.briksdalGlacier },
    { src: siteImages.hellesyltVillage, alt: imageAlts.hellesyltVillage },
  ],
  highlights: [
    "Private transport from Hellesylt cruise port",
    "Flexible pace with personal guide",
    "Hornindal Lake scenic drive",
    "Briksdal Glacier hike to glacier viewpoints",
    "Briksdalsbre Mountain Lodge stop",
    "Glacier lake viewpoint and waterfall scenery",
  ],
  description: [
    "Private Briksdal Glacier Discovery replaces coach schedules with a flexible glacier day built around your group. You travel in a private vehicle from Hellesylt through Hornindal Lake country to Briksdalsbreen with time to adjust photo stops and walking pace.",
    "The tour includes the Briksdal Glacier hike and a stop at Briksdalsbre Mountain Lodge, where mountain hospitality breaks up the active sections of the day. Glacier lake viewpoints and waterfall scenery frame the return journey.",
    "This premium option suits cruise passengers with six or more hours ashore who want glacier hiking without sharing a large coach group, ideal for photographers, families, and couples who value private pacing.",
  ],
  included: [
    "Private guided Briksdal Glacier tour from Hellesylt",
    "Private vehicle and flexible itinerary",
    "Glacier hike with personal guide",
    "Briksdalsbre Mountain Lodge stop",
    "Return timings aligned to your ship schedule",
  ],
  notIncluded: standardNotIncluded,
  timingAdvice: standardTimingAdvice,
  faqs: [
    {
      question: "How is the private tour different from the group glacier discovery?",
      answer:
        "You travel in a private vehicle with flexible pacing, personal guide attention, and adjustable photo stops rather than fixed coach timings.",
    },
    {
      question: "How many people can join a private tour?",
      answer:
        "Private tours typically suit couples, families, and small groups. Confirm vehicle size when booking for larger parties.",
    },
    {
      question: "Does the private tour include the glacier hike?",
      answer:
        "Yes. The Briksdal Glacier hike and glacier lake viewpoint are central to the experience.",
    },
  ],
  breadcrumbs: hellesyltExcursionBreadcrumbs(title),
  relatedLinks: [
    ...hellesyltExcursionRelatedLinks,
    {
      label: "Group Briksdal Glacier Discovery",
      href: "/excursions/briksdal-glacier-discovery",
    },
  ],
  bookingHref: "/excursions",
  bookingLabel: "Book this excursion",
};
