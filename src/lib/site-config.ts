import { imageAlts, siteImages } from "@/lib/site-images";

export const siteConfig = {
  name: "Hellesylt Shore Excursions",
  url: "https://hellesyltshoreexcursions.com",
  locale: "en_GB",
  defaultDescription:
    "Independent Hellesylt cruise port guides and shore excursion planning for passengers visiting Mount Stranda, Briksdal Glacier, Geiranger viewpoints, waterfall scenery, and fjord gateway touring from Hellesylt, Norway.",
  defaultOgImage: siteImages.hero,
  defaultOgImageAlt: imageAlts.hero,
  copyrightEntity: "Hellesylt Shore Excursions",
  shoreExcursionsPath: "/excursions",
} as const;
