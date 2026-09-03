import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const planLinks = [
  { label: "Excursions", href: "/excursions" },
  { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
  { label: "Port guide", href: "/hellesylt-port-guide" },
  { label: "Ship schedule", href: "/ship-schedule" },
  {
    label: "Mount Stranda panoramic views",
    href: "/excursions/mount-stranda-panoramic-views",
  },
  {
    label: "Briksdal Glacier Discovery",
    href: "/excursions/briksdal-glacier-discovery",
  },
  {
    label: "Private Hellesylt highlights",
    href: "/excursions/private-full-day-hellesylt-highlights",
  },
  { label: "Best time to visit", href: "/best-time-to-visit-hellesylt" },
] as const;

const guideLinks = [
  { label: "Is Hellesylt worth visiting?", href: "/is-hellesylt-worth-visiting" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <section className="border-t border-white/10 bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <h2 className="font-display text-xl font-semibold sm:text-2xl">
            Village, Mount Stranda, or Briksdal
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Check your ship times, then pick one main direction. Hours ashore do
            not prove that a long private Geiranger-area outing will fit on your
            call.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={siteConfig.shoreExcursionsPath} className="btn-primary">
              Explore Hellesylt excursions
            </Link>
            <Link href={siteConfig.schedulePath} className="btn-secondary">
              Check ship schedule
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 bg-navy-deep text-slate-300">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-white transition hover:text-white/90"
              >
                {siteConfig.name}
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                Independent Hellesylt cruise-port planning for the waterfall
                village, Mount Stranda and Briksdal Glacier outings. Not
                affiliated with any cruise line, attraction or port authority.
              </p>
              {siteConfig.contactEmailVerified ? (
                <p className="mt-3 text-sm text-white/65">
                  Planning questions:{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-white/85 underline-offset-2 hover:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </p>
              ) : null}
              <p className="mt-4 text-sm text-white/55">
                Cruising elsewhere in Norway?{" "}
                <a
                  href={siteConfig.nationalAuthorityUrl}
                  className="text-white/80 underline-offset-2 hover:underline"
                >
                  Norway Shore Excursions
                </a>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:col-span-1 sm:grid-cols-2 lg:col-span-8">
              <FooterColumn title="Plan Hellesylt">
                <ul className="space-y-2">
                  {planLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>

              <FooterColumn title="Guides & legal">
                <ul className="space-y-2">
                  {guideLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>

          <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-5 text-white/45">
            © {new Date().getFullYear()} {siteConfig.copyrightEntity}. Independent
            cruise-port planning for Hellesylt.
          </p>
        </div>
      </div>
    </footer>
  );
}
