import { ExcursionDetailPage } from "@/components/excursion-detail-page";
import { privateBriksdalGlacierDiscoveryExcursion } from "@/lib/excursions/private-briksdal-glacier-discovery";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: privateBriksdalGlacierDiscoveryExcursion.metaTitle,
  description: privateBriksdalGlacierDiscoveryExcursion.metaDescription,
  path: privateBriksdalGlacierDiscoveryExcursion.path,
  ogImage: privateBriksdalGlacierDiscoveryExcursion.heroImage,
  ogImageAlt: privateBriksdalGlacierDiscoveryExcursion.heroImageAlt,
});

export default function Page() {
  return (
    <ExcursionDetailPage
      excursion={privateBriksdalGlacierDiscoveryExcursion}
    />
  );
}
