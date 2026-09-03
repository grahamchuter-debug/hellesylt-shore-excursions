import { imageAlts, siteImages } from "@/lib/site-images";

export const siteConfig = {
  name: "Hellesylt Shore Excursions",
  url: "https://hellesyltshoreexcursions.com",
  locale: "en_GB",
  tagline: "Village, Mount Stranda, Briksdal, or a carefully planned longer day",
  defaultDescription:
    "Independent Hellesylt cruise-port planning: village and waterfall time, Mount Stranda panoramas, Briksdal Glacier outings, optional Geiranger-area private touring, and published ship schedules for your day ashore.",
  defaultOgImage: siteImages.hero,
  defaultOgImageAlt: imageAlts.hero,
  copyrightEntity: "Hellesylt Shore Excursions",
  shoreExcursionsPath: "/excursions",
  plannerPath: "/one-day-in-hellesylt",
  schedulePath: "/ship-schedule",
  nationalAuthorityUrl: "https://norwayshoreexcursions.com",
  contactEmail: "hello@hellesyltshoreexcursions.com",
  contactEmailVerified: true,
} as const;
