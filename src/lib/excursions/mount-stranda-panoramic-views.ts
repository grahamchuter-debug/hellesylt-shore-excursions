import type { ExcursionData } from "@/lib/excursion-types";
import {
  hellesyltExcursionBreadcrumbs,
  hellesyltExcursionRelatedLinks,
  standardNotIncluded,
  standardTimingAdvice,
} from "@/lib/excursion-shared";
import { imageAlts, siteImages } from "@/lib/site-images";

const title = "Journey to Mount Stranda and Panoramic Views from Hellesylt";

export const mountStrandaPanoramicViewsExcursion: ExcursionData = {
  slug: "mount-stranda-panoramic-views",
  path: "/excursions/mount-stranda-panoramic-views",
  title,
  headline: `${title} for Cruise Passengers`,
  lead: "The headline Hellesylt shore excursion with Sunnylvsfjord scenic drive, Ljøen viewpoint, Strandadalen valley, Mount Stranda gondola, Sunnmøre Alps and Storfjord views, plus coffee and waffles.",
  metaTitle: title,
  metaDescription:
    "Headline Hellesylt shore excursion to Mount Stranda with Ljøen viewpoint, Sunnylvsfjord drive, gondola panoramas, coffee and waffles. Approx. 3 hours 30 minutes, easy activity level.",
  heroImage: siteImages.mountStrandaTour,
  heroImageAlt: imageAlts.mountStrandaTourCard,
  heroBadge: "Headline Hellesylt shore excursion",
  summary: {
    duration: "Approx. 3 hours 30 minutes",
    meetingPoint: "Hellesylt village near cruise pier or tender landing",
    returnReassurance:
      "Tour timings designed for typical Hellesylt port schedules",
    bestFor:
      "First-time visitors who want dramatic fjord and mountain panoramas without a full glacier day",
  },
  snapshotCards: [
    {
      label: "Activity level",
      value: "Easy, short walks at viewpoints and gondola",
    },
    { label: "Highlights", value: "Ljøen, Strandadalen, Mount Stranda gondola" },
    { label: "Refreshments", value: "Coffee and waffles included" },
    { label: "Port call fit", value: "Ideal for 3 to 6 hour visits" },
  ],
  gallery: [
    { src: siteImages.mountStranda, alt: imageAlts.mountStranda },
    { src: siteImages.ljoeenViewpoint, alt: imageAlts.ljoeenViewpoint },
    { src: siteImages.sunnylvsfjord, alt: imageAlts.sunnylvsfjord },
    { src: siteImages.strandadalen, alt: imageAlts.strandadalen },
  ],
  highlights: [
    "Sunnylvsfjord scenic drive from Hellesylt",
    "Ljøen viewpoint over the fjord and mountains",
    "Strandadalen valley with alpine scenery",
    "Mount Stranda gondola with Sunnmøre Alps views",
    "Storfjord panoramas from elevated viewpoints",
    "Coffee and waffles at a scenic stop",
  ],
  description: [
    "Mount Stranda and the surrounding Sunnmøre Alps deliver some of the most dramatic viewpoints reachable on a half-day shore excursion from Hellesylt. This tour combines fjord-level driving with a gondola ascent for layered mountain and water perspectives.",
    "The route follows Sunnylvsfjord before climbing to Ljøen and Strandadalen, where waterfalls and steep valley walls frame every photo stop. At Mount Stranda, the gondola lifts you above the treeline for wide-angle views across Storfjord and the alpine ridges that define this gateway port.",
    "Designed for cruise passengers, the excursion runs approximately three and a half hours with an easy activity level, making it the signature choice when your ship allows three to four hours ashore before continuing toward Geirangerfjord.",
  ],
  included: [
    "Guided Mount Stranda panoramic tour from Hellesylt",
    "Sunnylvsfjord and Ljøen viewpoint scenic drive",
    "Mount Stranda gondola ride",
    "Coffee and waffles",
    "Route paced for typical cruise port timings",
  ],
  notIncluded: standardNotIncluded,
  timingAdvice: standardTimingAdvice,
  faqs: [
    {
      question: "How long is the Mount Stranda tour from Hellesylt?",
      answer:
        "Most departures run approximately three hours and thirty minutes, including scenic driving, gondola time, and a coffee and waffle stop.",
    },
    {
      question: "Is this tour suitable for short Hellesylt port calls?",
      answer:
        "Yes, when you have at least three hours ashore. It is the best fit for technical stops and half-day schedules before Geiranger.",
    },
    {
      question: "What is the activity level?",
      answer:
        "Easy. Expect short walks at viewpoints and a gondola ride rather than extended hiking.",
    },
  ],
  breadcrumbs: hellesyltExcursionBreadcrumbs(title),
  relatedLinks: [
    ...hellesyltExcursionRelatedLinks,
    {
      label: "Private Mount Stranda tour",
      href: "/excursions/private-mount-stranda-panoramic-views",
    },
  ],
  bookingHref: "/excursions",
  bookingLabel: "Book this excursion",
};
