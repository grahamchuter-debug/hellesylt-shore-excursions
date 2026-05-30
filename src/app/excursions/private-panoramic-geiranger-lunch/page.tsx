import { ExcursionDetailPage } from "@/components/excursion-detail-page";
import { privatePanoramicGeirangerLunchExcursion } from "@/lib/excursions/private-panoramic-geiranger-lunch";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: privatePanoramicGeirangerLunchExcursion.metaTitle,
  description: privatePanoramicGeirangerLunchExcursion.metaDescription,
  path: privatePanoramicGeirangerLunchExcursion.path,
  ogImage: privatePanoramicGeirangerLunchExcursion.heroImage,
  ogImageAlt: privatePanoramicGeirangerLunchExcursion.heroImageAlt,
});

export default function Page() {
  return (
    <ExcursionDetailPage excursion={privatePanoramicGeirangerLunchExcursion} />
  );
}
