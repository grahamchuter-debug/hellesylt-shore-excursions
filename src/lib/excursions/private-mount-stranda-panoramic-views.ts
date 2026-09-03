import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardNotIncluded,
  standardTimingAdvice,
} from "@/lib/excursion-shared";
import { imageAlts, siteImages } from "@/lib/site-images";

const title = "Private Journey to Mount Stranda and Panoramic Views";

export const privateMountStrandaPanoramicViewsExcursion: ExcursionData = {
  slug: "private-mount-stranda-panoramic-views",
  path: "/excursions/private-mount-stranda-panoramic-views",
  title,
  headline: `${title} from Hellesylt for Cruise Passengers`,
  lead: "Private short scenic option with Ljøen viewpoint, Sunnylvsfjord, Strandadalen, Mount Stranda gondola, Sunnmøre Alps, and Storfjord views at a flexible private pace.",
  metaTitle: `${title} from Hellesylt`,
  metaDescription:
    "Private Mount Stranda panoramic tour from Hellesylt with Ljøen viewpoint, Sunnylvsfjord, gondola views, and flexible private pacing for cruise passengers.",
  heroImage: siteImages.privateMountStrandaTour,
  heroImageAlt: imageAlts.privateMountStrandaTourCard,
  heroBadge: "Private short scenic option",
  summary: {
    duration: "Approx. 3 to 4 hours",
    meetingPoint: "Hellesylt village, private pickup near cruise pier",
    returnReassurance:
      "Private timings tailored to short and half-day port calls",
    bestFor:
      "Couples and small groups who want Mount Stranda views with private transport and flexible pacing",
  },
  snapshotCards: [
    { label: "Transport", value: "Private vehicle from Hellesylt" },
    { label: "Views", value: "Ljøen, Sunnylvsfjord, Mount Stranda gondola" },
    { label: "Pace", value: "Flexible private itinerary" },
    { label: "Port call fit", value: "Ideal for 3 to 6 hour visits" },
  ],
  gallery: [
    { src: siteImages.ljoeenViewpoint, alt: imageAlts.ljoeenViewpoint },
    { src: siteImages.sunnylvsfjord, alt: imageAlts.sunnylvsfjord },
    { src: siteImages.hellesyltWaterfall, alt: imageAlts.hellesyltWaterfall },
    { src: siteImages.hellesyltVillage, alt: imageAlts.hellesyltVillage },
  ],
  highlights: [
    "Private transport from Hellesylt cruise port",
    "Ljøen viewpoint over Sunnylvsfjord",
    "Strandadalen valley scenery",
    "Mount Stranda gondola ascent",
    "Sunnmøre Alps and Storfjord panoramas",
    "Flexible private pace for photo stops",
  ],
  description: [
    "This private Mount Stranda tour delivers the same dramatic fjord-and-mountain story as the group excursion, but with a personal vehicle and adjustable timing. You can linger at Ljøen, add extra photo stops along Sunnylvsfjord, and ride the gondola without coach-group schedules.",
    "Strandadalen valley and Storfjord viewpoints provide layered alpine scenery that makes Hellesylt feel like a true gateway port rather than a brief waterfall stop. Private pacing suits couples, families, and photographers on three-to-six-hour port calls.",
    "Choose this option when you want panoramic mountain touring with privacy and flexibility, especially on days when your ship stops briefly before continuing into Geirangerfjord.",
  ],
  included: [
    "Private guided Mount Stranda tour from Hellesylt",
    "Private vehicle with flexible stops",
    "Ljøen viewpoint and Sunnylvsfjord scenic drive",
    "Mount Stranda gondola ride",
    "Return timings aligned to your ship schedule",
  ],
  notIncluded: standardNotIncluded,
  timingAdvice: standardTimingAdvice,
  faqs: [
    {
      question: "How is the private Mount Stranda tour different from the group tour?",
      answer:
        "You travel privately with flexible pacing and personal guide attention rather than fixed coach departure times.",
    },
    {
      question: "Does the private tour include the gondola?",
      answer:
        "Yes. Mount Stranda gondola with Sunnmøre Alps and Storfjord views is included.",
    },
    {
      question: "Is this suitable for a short Hellesylt call?",
      answer:
        "Yes, when you have at least three hours ashore. It is one of the best private options for short and half-day schedules.",
    },
  ],
  breadcrumbs: hellesyltExcursionBreadcrumbs(title),
  relatedLinks: [
    ...hellesyltExcursionRelatedLinks,
    {
      label: "Group Mount Stranda tour",
      href: "/excursions/mount-stranda-panoramic-views",
    },
  ],
  bookingHref: "/excursions",
  bookingLabel: "Explore this excursion",
};
