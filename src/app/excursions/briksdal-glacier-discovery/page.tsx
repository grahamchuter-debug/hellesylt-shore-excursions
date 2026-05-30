import { ExcursionDetailPage } from "@/components/excursion-detail-page";
import { briksdalGlacierDiscoveryExcursion } from "@/lib/excursions/briksdal-glacier-discovery";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: briksdalGlacierDiscoveryExcursion.metaTitle,
  description: briksdalGlacierDiscoveryExcursion.metaDescription,
  path: briksdalGlacierDiscoveryExcursion.path,
  ogImage: briksdalGlacierDiscoveryExcursion.heroImage,
  ogImageAlt: briksdalGlacierDiscoveryExcursion.heroImageAlt,
});

export default function Page() {
  return (
    <ExcursionDetailPage excursion={briksdalGlacierDiscoveryExcursion} />
  );
}
