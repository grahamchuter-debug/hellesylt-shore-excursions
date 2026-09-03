/**
 * Image provenance registry for Hellesylt Shore Excursions.
 * NEW IMAGE SOURCING IS NOT AUTHORISED without verified rights.
 */

export type ImageProvenance = {
  key: string;
  urlOrPath: string;
  status:
    | "KEEP"
    | "REPLACE"
    | "WRONG_LOCATION"
    | "DUPLICATE"
    | "PROVENANCE_UNKNOWN"
    | "BROKEN";
  notes: string;
};

export const hellesyltImageProvenance: readonly ImageProvenance[] = [
  {
    key: "hero",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/c/c0/Hellesyltfossen_%282%29.jpg",
    status: "KEEP",
    notes: "Wikimedia Commons. Hellesyltfossen in Hellesylt. Rights later-hardening.",
  },
  {
    key: "hellesyltVillage",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/2010-08-05_-_Hellesylt_und_die_F%C3%A4hre_nach_Geiranger.jpg",
    status: "KEEP",
    notes: "Wikimedia Commons. Hellesylt village and ferry. Rights later-hardening.",
  },
  {
    key: "sunnylvsfjord",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Wide_view_over_Sunnylvsfjorden_and_Geirangerfjorden_from_Lj%C3%B8en%2C_Stranda%2C_M%C3%B8re_og_Romsdal%2C_Norway%2C_2025_June.jpg",
    status: "KEEP",
    notes:
      "Wikimedia Commons. Ljøen / Sunnylvsfjord. Used for Mount Stranda tour card/hero (corridor-accurate).",
  },
  {
    key: "ljoeenViewpoint",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/Ljoen_viewpoint2013-1.jpg",
    status: "KEEP",
    notes:
      "Wikimedia Commons. Ljøen viewpoint. Used for Mount Stranda gallery and private Mount Stranda hero.",
  },
  {
    key: "hovenLoenUnused",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Hoven_Loen.jpg",
    status: "WRONG_LOCATION",
    notes:
      "REMOVED FROM RENDER: Hoven_Loen.jpg is Loen / Hoven, not Mount Stranda or Hellesylt. Catalogued in provenance only; not mapped into any rendered Mount Stranda or Hellesylt-local slot.",
  },
  {
    key: "briksdalGlacier",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/Briksdalsbreen_Glacier_-Norway.jpg",
    status: "KEEP",
    notes: "Wikimedia Commons. Briksdal Glacier. Valid destination asset from Hellesylt tours.",
  },
  {
    key: "hornindalLake",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Hornindalsvatnet.jpg",
    status: "KEEP",
    notes: "Wikimedia Commons. Hornindalsvatnet on Briksdal routes. Rights later-hardening.",
  },
  {
    key: "geirangerViewpoint",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Flydalsjuvet_Geiranger_Geirangerfjorden.jpg",
    status: "KEEP",
    notes:
      "Wikimedia Commons. Geiranger viewpoint used for optional private Geiranger-area product. Not a Hellesylt village local.",
  },
  {
    key: "oldedalen",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oldedalen.jpg",
    status: "KEEP",
    notes:
      "Wikimedia Commons. Oldedalen valley. Rendered ONLY on Briksdal and private full-day itineraries that explicitly include Oldedalen — not as Mount Stranda or Hellesylt-village local imagery. Previously misused as Hellesylt-local / Stranda stand-in (WRONG_LOCATION context); remapped.",
  },
  {
    key: "briksdalWaterfall",
    urlOrPath:
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Briksdal_Glacier_Norway_%28213014897%29.jpeg",
    status: "KEEP",
    notes: "Wikimedia Commons. Briksdal scenery. Rights later-hardening.",
  },
  {
    key: "sisterPortCards",
    urlOrPath:
      "src/lib/site-images.ts flam/bergen/stavanger/alesund/geiranger/olden cards",
    status: "KEEP",
    notes:
      "Unused related-port assets in explore-norwegian-ports.tsx. Not labelled as Hellesylt local. Component is not on the homepage.",
  },
] as const;
