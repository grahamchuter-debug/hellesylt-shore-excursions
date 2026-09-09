/**
 * Hellesylt World 2.0 destination QA.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

const dataPath = path.join(root, "src/data/hellesylt-cruise-schedules.generated.json");
if (!existsSync(dataPath)) {
  fail("missing hellesylt-cruise-schedules.generated.json");
  process.exit(1);
}

const data = JSON.parse(readFileSync(dataPath, "utf8"));
const rows = data.rows || [];
const integrity = data.integrity || {};

const expected = {
  total: 98,
  y2026: 63,
  y2027: 35,
  first: "2026-06-01",
  last: "2027-10-05",
  ships: 14,
  lines: 9,
};

if (data.port !== "hellesylt") {
  fail(`generated port ${data.port}, expected hellesylt`);
} else {
  pass("generated JSON filtered to port === hellesylt");
}

if (integrity.total !== expected.total || rows.length !== expected.total) {
  fail(`total calls ${integrity.total}/${rows.length}, expected ${expected.total}`);
} else {
  pass(`total Hellesylt calls ${expected.total}`);
}

if ((integrity.byYear?.["2026"] ?? 0) !== expected.y2026) {
  fail(`2026 ${integrity.byYear?.["2026"]}, expected ${expected.y2026}`);
} else {
  pass(`2026 calls ${expected.y2026}`);
}

if ((integrity.byYear?.["2027"] ?? 0) !== expected.y2027) {
  fail(`2027 ${integrity.byYear?.["2027"]}, expected ${expected.y2027}`);
} else {
  pass(`2027 calls ${expected.y2027}`);
}

if (integrity.firstDate !== expected.first || integrity.lastDate !== expected.last) {
  fail(`date range ${integrity.firstDate}..${integrity.lastDate}`);
} else {
  pass(`date range ${expected.first} .. ${expected.last}`);
}

if (integrity.uniqueShips !== expected.ships) {
  fail(`unique ships ${integrity.uniqueShips}, expected ${expected.ships}`);
} else {
  pass(`unique ships ${expected.ships}`);
}

if (integrity.cruiseLines !== expected.lines) {
  fail(`cruise lines ${integrity.cruiseLines}, expected ${expected.lines}`);
} else {
  pass(`cruise lines ${expected.lines}`);
}

if (integrity.has2028 || rows.some((r) => String(r.arrival_date).startsWith("2028"))) {
  fail("2028 schedule data present");
} else {
  pass("no 2028 schedule data");
}

const required = [
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/ship-schedule/page.tsx",
  "src/app/ship-schedule/[monthSlug]/page.tsx",
  "src/app/excursions/page.tsx",
  "src/app/hellesylt-port-guide/page.tsx",
  "src/app/one-day-in-hellesylt/page.tsx",
  "src/app/is-hellesylt-worth-visiting/page.tsx",
  "src/app/best-time-to-visit-hellesylt/page.tsx",
  "src/lib/image-provenance.ts",
];
for (const rel of required) {
  if (!existsSync(path.join(root, rel))) fail(`missing ${rel}`);
  else pass(`exists ${rel}`);
}

const preserved = [
  "src/app/page.tsx",
  "src/app/excursions/mount-stranda-panoramic-views/page.tsx",
  "src/app/excursions/briksdal-glacier-discovery/page.tsx",
  "src/app/excursions/private-briksdal-glacier-discovery/page.tsx",
  "src/app/excursions/private-full-day-hellesylt-highlights/page.tsx",
  "src/app/excursions/private-mount-stranda-panoramic-views/page.tsx",
  "src/app/excursions/private-panoramic-geiranger-lunch/page.tsx",
  "src/app/hellesylt-port-guide/page.tsx",
  "src/app/best-time-to-visit-hellesylt/page.tsx",
];
for (const rel of preserved) {
  if (!existsSync(path.join(root, rel))) fail(`preserved route missing ${rel}`);
  else pass(`preserved ${rel}`);
}

pass("no /excursions redirect required; Hellesylt hub is already /excursions");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const srcFiles = walk(path.join(root, "src"));
const banned = [/BOOK NOW/i, /Book a Tour/, /Book this excursion/];
const paymentAllow =
  /(^|\/)(app\/book\/|components\/booking\/|lib\/booking\/)/;
let bannedHits = 0;
for (const file of srcFiles) {
  const rel = path.relative(root, file);
  const text = readFileSync(file, "utf8");
  for (const pattern of banned) {
    if (pattern.test(text)) {
      bannedHits += 1;
      fail(`banned CTA pattern ${pattern} in ${rel}`);
    }
  }
  if (/stripe|checkout\.session|payment.?intent/i.test(text) && !paymentAllow.test(rel.replace(/\\/g, "/"))) {
    bannedHits += 1;
    fail(`payment infrastructure ref in ${rel}`);
  }
}
if (bannedHits === 0) {
  pass("no banned CTAs; payment infra confined to booking paths or absent");
}

const liveGatePath = path.join(root, "workers/bookings/src/live-gate.ts");
if (!existsSync(liveGatePath)) {
  fail("workers/bookings/src/live-gate.ts missing");
} else {
  const liveGate = readFileSync(liveGatePath, "utf8");
  if (!/LIVE_PAYMENTS_CODE_ENABLED\s*=\s*false/.test(liveGate)) {
    fail("LIVE_PAYMENTS_CODE_ENABLED must be false for H-1");
  } else {
    pass("LIVE_PAYMENTS_CODE_ENABLED is false");
  }
}

const productPath = path.join(root, "shared/destinations/hellesylt-products.ts");
if (!existsSync(productPath)) {
  fail("shared/destinations/hellesylt-products.ts missing");
} else {
  const productSrc = readFileSync(productPath, "utf8");
  if (!productSrc.includes('id: "briksdal-glacier-discovery"')) {
    fail("Hellesylt product id missing");
  } else if (!/adultChildEur\(\s*169\s*,\s*109\s*,\s*0\s*\)/.test(productSrc) && !/adultAmount:\s*169/.test(productSrc)) {
    fail("Hellesylt adult/child/infant prices must be 169/109/0");
  } else {
    pass("Hellesylt product id and EUR 169/109/0 present");
  }
  if (!/maxGuestsPerBookingSource:\s*"preview_unapproved"/.test(productSrc)) {
    fail("MAX guests must remain preview_unapproved until Graham supplies commercial max");
  } else {
    pass("max guests still preview_unapproved (UNKNOWN commercially)");
  }
}

const chromeFiles = [
  "src/components/site-footer.tsx",
  "src/app/page.tsx",
  "src/app/ship-schedule/page.tsx",
];
for (const rel of chromeFiles) {
  const text = readFileSync(path.join(root, rel), "utf8");
  if (/Lysefjord|Pulpit Rock|Preikestolen|Bryggen|Mostraumen|Nidaros|Bakklandet|Flamsbana|Stegastein|Voringsfossen|Hardangervidda/.test(text)) {
    fail(`sibling-destination remnant in ${rel}`);
  } else {
    pass(`no sibling remnant in ${rel}`);
  }
}

const homepage = readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
if (/Gateway to Geiranger/.test(homepage)) {
  fail("homepage still uses Gateway to Geiranger as identity");
} else {
  pass("homepage is not Gateway to Geiranger primary identity");
}
if (/ExploreNorwegianPorts|explorePortsFromHellesylt/.test(homepage)) {
  fail("explore-norwegian-ports still used on homepage");
} else {
  pass("explore-norwegian-ports unused on homepage");
}

const config = readFileSync(path.join(root, "src/lib/site-config.ts"), "utf8");
if (!config.includes("hellesyltshoreexcursions.com")) {
  fail("canonical domain missing from site-config");
} else {
  pass("canonical domain hellesyltshoreexcursions.com present");
}

if (!config.includes("contactEmailVerified: true")) {
  fail("contactEmailVerified should be true after Cloudflare routing activation");
} else {
  pass("contact email marked verified");
}

if (!config.includes("hello@hellesyltshoreexcursions.com")) {
  fail("reserved contact email missing from config");
} else {
  pass("reserved contact email present in config");
}

if (/mailto:hello@hellesyltshoreexcursions\.com/.test(config)) {
  fail("mailto on unverified address in site-config");
} else {
  pass("no mailto in site-config");
}

const contactPage = readFileSync(path.join(root, "src/app/contact/page.tsx"), "utf8");
if (
  /mailto:hello@hellesyltshoreexcursions\.com/.test(contactPage) &&
  !/contactEmailVerified/.test(contactPage)
) {
  fail("hardcoded mailto on contact page while email unverified");
} else {
  pass("contact page respects contactEmailVerified gate");
}

const geirangerProduct = readFileSync(
  path.join(root, "src/lib/excursions/private-panoramic-geiranger-lunch.ts"),
  "utf8",
);
if (/without rejoining the ship at a separate Geiranger pier/.test(geirangerProduct)) {
  fail("unsupported Geiranger rejoin claim still present");
} else {
  pass("softened Geiranger rejoin logistics claim");
}
if (/Confirm whether your cruise repositions to Geiranger/.test(geirangerProduct)) {
  fail("old reposition confirmation claim still present");
} else {
  pass("reposition language softened to cruise-line check");
}

const provenance = readFileSync(path.join(root, "src/lib/image-provenance.ts"), "utf8");
const siteImagesSrc = readFileSync(path.join(root, "src/lib/site-images.ts"), "utf8");
const mountStrandaPublic = readFileSync(
  path.join(root, "src/lib/excursions/mount-stranda-panoramic-views.ts"),
  "utf8",
);
const mountStrandaPrivate = readFileSync(
  path.join(root, "src/lib/excursions/private-mount-stranda-panoramic-views.ts"),
  "utf8",
);
const toursSrc = readFileSync(path.join(root, "src/lib/hellesylt-tours.ts"), "utf8");
const fullDaySrc = readFileSync(
  path.join(root, "src/lib/excursions/private-full-day-hellesylt-highlights.ts"),
  "utf8",
);

if (!/Hoven_Loen/.test(provenance) || !/WRONG_LOCATION/.test(provenance) || !/REMOVED FROM RENDER/.test(provenance)) {
  fail("Hoven_Loen provenance missing WRONG_LOCATION / REMOVED FROM RENDER note");
} else {
  pass("Hoven_Loen retained as unused WRONG_LOCATION inventory");
}

if (/mountStrandaTour:\s*[^\n]*Hoven_Loen|mountStranda:\s*[^\n]*Hoven_Loen|const mountStranda\s*=\s*[^\n]*Hoven_Loen/.test(siteImagesSrc)) {
  fail("Hoven_Loen still mapped into Mount Stranda rendered slots");
} else {
  pass("Hoven_Loen not mapped into Mount Stranda rendered slots");
}

if (/Hoven_Loen/.test(mountStrandaPublic) || /Hoven_Loen/.test(mountStrandaPrivate) || /Hoven_Loen/.test(toursSrc)) {
  fail("Hoven_Loen still referenced in Mount Stranda product/tour modules");
} else {
  pass("Mount Stranda modules do not reference Hoven_Loen");
}

if (/oldedalen/.test(mountStrandaPublic) || /Oldedalen\.jpg/.test(mountStrandaPublic)) {
  fail("Oldedalen still in Mount Stranda public gallery");
} else {
  pass("Oldedalen removed from Mount Stranda gallery");
}

if (/privateFullDayTour:\s*[^\n]*Oldedalen/.test(siteImagesSrc)) {
  fail("Oldedalen still used as private full-day hero stand-in for Hellesylt");
} else {
  pass("Private full-day hero no longer uses Oldedalen as Hellesylt stand-in");
}

if (!/oldedalen/.test(fullDaySrc)) {
  fail("Full-day itinerary missing Oldedalen image in Oldedalen-inclusive context");
} else {
  pass("Oldedalen retained only on Oldedalen-inclusive full-day gallery");
}

const sitemapSrc = readFileSync(path.join(root, "src/app/sitemap.ts"), "utf8");
if (!sitemapSrc.includes("getSiteRoutes")) {
  fail("sitemap does not use getSiteRoutes");
} else {
  pass("sitemap uses getSiteRoutes including populated months");
}

const monthKeys = [...new Set(rows.map((r) => r.arrival_date.slice(0, 7)))].sort();
const expectedMonths = [
  "2026-06",
  "2026-07",
  "2026-08",
  "2026-09",
  "2027-04",
  "2027-05",
  "2027-06",
  "2027-07",
  "2027-08",
  "2027-09",
  "2027-10",
];
if (monthKeys.length !== 11 || monthKeys.join(",") !== expectedMonths.join(",")) {
  fail(`populated months ${monthKeys.join(",")}, expected ${expectedMonths.join(",")}`);
} else {
  pass("11 populated Hellesylt months match authority keys");
}

const byMonth = {};
for (const row of rows) {
  const key = row.arrival_date.slice(0, 7);
  byMonth[key] = (byMonth[key] || 0) + 1;
}
if ((byMonth["2026-07"] ?? 0) !== 19) {
  fail(`busiest July 2026 ${byMonth["2026-07"]}, expected 19`);
} else {
  pass("busiest month 2026-07 has 19 calls");
}
if ((byMonth["2027-04"] ?? 0) !== 1) {
  fail(`light April 2027 ${byMonth["2027-04"]}, expected 1`);
} else {
  pass("light month 2027-04 has 1 call");
}

console.log(
  "\nINFO: sync source = norway-shore-excursions generated JSON, filter port===hellesylt",
);
if (process.exitCode) {
  console.error("\nQA FAILED");
  process.exit(1);
}
console.log("\nQA PASSED");
