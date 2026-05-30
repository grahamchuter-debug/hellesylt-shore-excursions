/** Verified Wikimedia Commons URLs (resolved via Commons API). */

const hellesyltWaterfall =
  "https://upload.wikimedia.org/wikipedia/commons/c/c0/Hellesyltfossen_%282%29.jpg";
const hellesyltVillage =
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/2010-08-05_-_Hellesylt_und_die_F%C3%A4hre_nach_Geiranger.jpg";
const sunnylvsfjord =
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Wide_view_over_Sunnylvsfjorden_and_Geirangerfjorden_from_Lj%C3%B8en%2C_Stranda%2C_M%C3%B8re_og_Romsdal%2C_Norway%2C_2025_June.jpg";
const ljoeenViewpoint =
  "https://upload.wikimedia.org/wikipedia/commons/3/3c/Ljoen_viewpoint2013-1.jpg";
const mountStranda =
  "https://upload.wikimedia.org/wikipedia/commons/a/a8/Hoven_Loen.jpg";
const briksdalGlacier =
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Briksdalsbreen_Glacier_-Norway.jpg";
const hornindalLake =
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/Hornindalsvatnet.jpg";
const geirangerViewpoint =
  "https://upload.wikimedia.org/wikipedia/commons/1/10/Flydalsjuvet_Geiranger_Geirangerfjorden.jpg";
const strandadalen =
  "https://upload.wikimedia.org/wikipedia/commons/f/ff/Oldedalen.jpg";
const briksdalWaterfall =
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/Briksdal_Glacier_Norway_%28213014897%29.jpeg";

export const siteImages = {
  hero: hellesyltWaterfall,
  hellesyltWaterfall,
  hellesyltVillage,
  sunnylvsfjord,
  ljoeenViewpoint,
  mountStranda,
  briksdalGlacier,
  hornindalLake,
  geirangerViewpoint,
  strandadalen,
  briksdalWaterfall,
  portGuide: hellesyltVillage,
  worthVisiting: hellesyltWaterfall,
  oneDay: sunnylvsfjord,
  bestTime: geirangerViewpoint,
  mountStrandaTour: mountStranda,
  briksdalTour: briksdalGlacier,
  privateBriksdalTour: briksdalWaterfall,
  privateFullDayTour: strandadalen,
  privateMountStrandaTour: ljoeenViewpoint,
  privateGeirangerTour: geirangerViewpoint,
  flamPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/5/56/Fl%C3%A5m_fr%C3%A5_cruiseskip_ved_kai.jpg",
  bergenPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Harbour_Bergen_Norway_2009_5.jpg",
  stavangerPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Stavanger_havn.jpg",
  alesundPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/%C3%85lesund_Hafen_lub_2025-07-28_img04.jpg",
  geirangerPortCard: geirangerViewpoint,
  oldenPortCard: briksdalGlacier,
  eidfjordPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Voringsfossen_waterfall_at_Eidfjord%2C_Norway.jpg",
  moldePortCard:
    "https://upload.wikimedia.org/wikipedia/commons/b/b5/Molde_Hafen.jpg",
  honningsvagPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Globe_Monument_at_Nordkapp.jpg",
  kristiansandPortCard:
    "https://upload.wikimedia.org/wikipedia/commons/0/0a/Kristiansand_harbour_2015.jpg",
} as const;

export const imageAlts = {
  hero: "Hellesyltfossen waterfall in Hellesylt village, Hellesylt Shore Excursions homepage",
  hellesyltWaterfall:
    "Hellesyltfossen waterfall cascading through Hellesylt village near the cruise port",
  hellesyltVillage:
    "Hellesylt village and ferry on Sunnylvsfjord, gateway to Geirangerfjord cruise port",
  sunnylvsfjord:
    "Wide view over Sunnylvsfjord and Geirangerfjord from Ljøen near Hellesylt",
  ljoeenViewpoint:
    "Ljøen viewpoint overlooking Sunnylvsfjord and mountain valleys near Hellesylt",
  mountStranda:
    "Panoramic mountain and fjord views from elevated viewpoints in the Sunnmøre Alps region",
  briksdalGlacier:
    "Briksdal Glacier arm of Jostedalsbreen reached on shore excursions from Hellesylt",
  hornindalLake:
    "Hornindalsvatnet deep blue lake surrounded by mountains on routes from Hellesylt",
  geirangerViewpoint:
    "Flydalsjuvet Geirangerfjord viewpoint on panoramic tours from Hellesylt",
  strandadalen:
    "Oldedalen valley with waterfalls and alpine scenery on Hellesylt full-day tours",
  briksdalWaterfall:
    "Waterfall and glacial lake scenery at Briksdal Glacier on Hellesylt glacier tours",
  portGuide:
    "Hellesylt village and Sunnylvsfjord waterfront, port guide for shore excursion passengers",
  worthVisiting:
    "Hellesyltfossen waterfall in the village centre, is Hellesylt worth visiting on a cruise",
  oneDay:
    "Sunnylvsfjord and Geirangerfjord view from Ljøen on a one day in Hellesylt itinerary",
  bestTime:
    "Geirangerfjord viewpoint in summer light, best time to visit Hellesylt on a cruise",
  mountStrandaTourCard:
    "Mountain and fjord panoramas on the headline Mount Stranda Hellesylt shore excursion",
  briksdalTourCard:
    "Briksdal Glacier discovery tour from Hellesylt with Nordfjord valley scenery",
  privateBriksdalTourCard:
    "Private Briksdal Glacier hike with flexible pace from Hellesylt cruise port",
  privateFullDayTourCard:
    "Private full day Hellesylt highlights with Oldedalen Valley and glacier scenery",
  privateMountStrandaTourCard:
    "Private Mount Stranda panoramic tour with Ljøen viewpoint from Hellesylt",
  privateGeirangerTourCard:
    "Private panoramic journey to Geiranger with lunch from Hellesylt gateway port",
  flamPortCard:
    "Flam harbour with cruise ship at the pier, Flam Shore Excursions",
  bergenPortCard:
    "Bergen harbour and waterfront, Bergen Shore Excursions",
  stavangerPortCard:
    "Stavanger harbour with cruise-friendly waterfront, Stavanger Shore Excursions",
  alesundPortCard:
    "Alesund harbour with cruise-friendly waterfront, Alesund Shore Excursions",
  geirangerPortCard:
    "Geirangerfjord viewpoint with cruise ship, Geiranger Shore Excursions",
  oldenPortCard:
    "Briksdal Glacier and Nordfjord scenery, Olden Shore Excursions",
  eidfjordPortCard:
    "Vøringsfossen waterfall and Hardanger scenery, Eidfjord Shore Excursions",
  moldePortCard:
    "Molde harbour and Atlantic coast, Molde Shore Excursions",
  honningsvagPortCard:
    "North Cape Globe Monument, Honningsvag Shore Excursions",
  kristiansandPortCard:
    "Kristiansand harbour waterfront in 2015, Kristiansand Shore Excursions",
} as const;
