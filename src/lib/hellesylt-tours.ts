import { imageAlts, siteImages } from "@/lib/site-images";

export type HellesyltTourCard = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  badge: string;
};

export const hellesyltTourCards: readonly HellesyltTourCard[] = [
  {
    href: "/excursions/mount-stranda-panoramic-views",
    image: siteImages.mountStrandaTour,
    imageAlt: imageAlts.mountStrandaTourCard,
    title: "Journey to Mount Stranda and Panoramic Views from Hellesylt",
    description:
      "Headline Hellesylt shore excursion with Sunnylvsfjord scenic drive, Ljøen viewpoint, Strandadalen valley, Mount Stranda gondola, Sunnmøre Alps views, coffee and waffles, approx. 3 hours 30 minutes, easy activity level.",
    badge: "Headline Tour",
  },
  {
    href: "/excursions/briksdal-glacier-discovery",
    image: siteImages.briksdalTour,
    imageAlt: imageAlts.briksdalTourCard,
    title: "Briksdal Glacier Discovery from Hellesylt",
    description:
      "Major glacier tour via Hornindal Lake, Nordfjord, Stryn, Loen and Olden scenery to Briksdal Glacier, glacier lake viewpoint and waterfalls, approx. 6 hours 30 minutes, difficult activity level with hiking required.",
    badge: "Glacier Tour",
  },
  {
    href: "/excursions/private-briksdal-glacier-discovery",
    image: siteImages.privateBriksdalTour,
    imageAlt: imageAlts.privateBriksdalTourCard,
    title: "Private Briksdal Glacier Discovery from Hellesylt",
    description:
      "Premium private glacier option with flexible pace, Hornindal Lake, Briksdal Glacier hike, Briksdalsbre Mountain Lodge and glacier lake viewpoint, approx. 6 hours 30 minutes.",
    badge: "Private Option",
  },
  {
    href: "/excursions/private-full-day-hellesylt-highlights",
    image: siteImages.privateFullDayTour,
    imageAlt: imageAlts.privateFullDayTourCard,
    title: "Private Full Day Hellesylt Highlights",
    description:
      "Full-day scenic photography tour through Oldedalen Valley, Briksdal Glacier, Loen Lake, historic farmhouses, dramatic valleys and lunch included, approx. 8 hours.",
    badge: "Full Day",
  },
  {
    href: "/excursions/private-mount-stranda-panoramic-views",
    image: siteImages.privateMountStrandaTour,
    imageAlt: imageAlts.privateMountStrandaTourCard,
    title: "Private Journey to Mount Stranda and Panoramic Views",
    description:
      "Private short scenic option with Ljøen viewpoint, Sunnylvsfjord, Strandadalen, Mount Stranda gondola, Sunnmøre Alps and Storfjord views at a flexible private pace.",
    badge: "Private Scenic",
  },
  {
    href: "/excursions/private-panoramic-geiranger-lunch",
    image: siteImages.privateGeirangerTour,
    imageAlt: imageAlts.privateGeirangerTourCard,
    title: "Private Panoramic Journey to Geiranger from Hellesylt with Lunch",
    description:
      "Geiranger panorama route via Hellesylt waterfall, Hornindal Lake, Stryn, Oppstrynsvatnet Lake, Hjelle valley, Øvstefossen waterfall, Mount Dalsnibba Sky Walk and Geiranger descent with lunch included.",
    badge: "Geiranger Route",
  },
] as const;

export const hellesyltTourListItems = hellesyltTourCards.map((tour) => ({
  name: tour.title,
  description: tour.description,
}));
